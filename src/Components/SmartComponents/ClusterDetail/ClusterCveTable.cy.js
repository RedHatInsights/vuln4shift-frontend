import React from 'react';
import { mount } from '@cypress/react18';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ClusterCveTable from './ClusterCveTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cves from '../../../../cypress/fixtures/clustercveslist.json';
import { initialState } from '../../../Store/Reducers/ClusterCvesStore';
import {
  CLUSTER_CVES_EXPORT_PREFIX,
  CLUSTER_CVES_TABLE_COLUMNS,
  PUBLISHED_OPTIONS,
  SEVERITY_OPTIONS,
} from '../../../Helpers/constants';
import {
  itExportsDataToFile,
  itHasNoActiveFilter,
  itHasTableFunctionsDisabled,
  itIsExpandable,
  itIsNotSorted,
  itIsSortedBy,
  testFilters,
  testPagination,
  testSorting,
} from '../../../../cypress/utils/table';

const mountComponent = () => {
  mount(
    <Provider store={init().getStore()}>
      <MemoryRouter
        initialEntries={['/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd/cves']}
      >
        <Routes>
          <Route
            path="/clusters/:clusterId/cves"
            element={<ClusterCveTable />}
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('ClusterCveTable with items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd/cves**',
      {
        ...initialState,
        ...cves,
        meta: {
          ...initialState.meta,
          ...cves.meta,
        },
      }
    );

    mountComponent();
  });

  it('exists and matches screenshot', () => {
    cy.get('table');

    cy.get('body').matchImage();
  });

  it('has items', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', cves.data.length);
  });

  it('has "Reset filter" button hidden by default', () => {
    cy.contains('Reset filter').should('not.exist');
  });

  itIsSortedBy('Publish date');
  itHasNoActiveFilter();
  itExportsDataToFile(cves.data, CLUSTER_CVES_EXPORT_PREFIX);
  itIsExpandable(cves.data.length);

  it('shows missing metadata empty state when CVE description is "unknown"', () => {
    cy.get('tbody [id^=expand-toggle]').last().click();

    cy.contains('No description available');
  });

  describe('Sorting', () => {
    testSorting(CLUSTER_CVES_TABLE_COLUMNS, true);
  });

  describe('Filtering', () => {
    const filters = [
      {
        urlParam: 'search',
        type: 'text',
        selector: '.ins-c-conditional-filter input[type="text"]',
        chipText: 'Search term',
      },
      {
        urlParam: 'published',
        type: 'radio',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: PUBLISHED_OPTIONS,
        chipText: 'Publish date',
      },
      {
        urlParam: 'severity',
        type: 'checkbox',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: SEVERITY_OPTIONS,
        chipText: 'Severity',
      },
      {
        urlParam: 'cvss_score',
        type: 'range',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        chipText: 'CVSS base score',
      },
    ];

    testFilters(filters);
  });

  describe('Pagination', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        '**/api/ocp-vulnerability/v1/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd/cves**',
        {
          ...initialState,
          ...cves,
          meta: {
            ...initialState.meta,
            ...cves.meta,
            total_items: 15, // faking total items to enable next page button
          },
        }
      );

      mountComponent();
    });

    testPagination();
  });
});

describe('ClusterCveTable without items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd/cves**',
      {
        ...initialState,
        data: [],
        meta: {
          ...initialState.meta,
          total_items: 0,
        },
      }
    );

    mountComponent();
  });

  it('exists and matches screenshot', () => {
    cy.get('table');

    cy.get('body').matchImage();
  });

  it('has no items', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 0);
  });

  itIsNotSorted();
  itHasTableFunctionsDisabled();

  it('shows correct empty state depending on whether filters are applied or not', () => {
    cy.contains('No matching CVEs found').should('exist');

    cy.get('#text-filter-search').type('example search term');

    cy.contains('No matching CVEs found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
