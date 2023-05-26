import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CveDetailTable from './CveDetailTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import clusters from '../../../../cypress/fixtures/cvedetaillist.json';
import { initialState } from '../../../Store/Reducers/CveDetailStore';
import {
  CLUSTER_PROVIDER_OPTIONS,
  CLUSTER_STATUS_OPTIONS,
  CLUSTER_VERSION_OPTIONS,
  CVE_DETAIL_EXPORT_PREFIX,
  CVE_DETAIL_TABLE_COLUMNS,
} from '../../../Helpers/constants';
import {
  itExportsDataToFile,
  itHasNoActiveFilter,
  itHasTableFunctionsDisabled,
  itIsNotExpandable,
  itIsNotSorted,
  itIsSortedBy,
  testFilters,
  testPagination,
  testSorting,
} from '../../../../cypress/utils/table';

const mountComponent = () => {
  mount(
    <MemoryRouter initialEntries={['/cves/CVE-2022-12345']}>
      <Route path="/cves/:cveId">
        <Provider store={init().getStore()}>
          <CveDetailTable />
        </Provider>
      </Route>
    </MemoryRouter>
  );
};

describe('CveDetailTable with items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/cves/CVE-2022-12345/exposed_clusters**',
      {
        ...initialState,
        ...clusters,
        meta: {
          ...initialState.meta,
          ...clusters.meta,
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
    cy.get('[data-label="Name"]').should('have.length', 5);
  });

  it('has "Reset filter" button hidden by default', () => {
    cy.contains('Reset filter').should('not.exist');
  });

  itIsSortedBy('Last seen');
  itHasNoActiveFilter();
  itExportsDataToFile(clusters.data, CVE_DETAIL_EXPORT_PREFIX);
  itIsNotExpandable();

  describe('Sorting', () => {
    testSorting(CVE_DETAIL_TABLE_COLUMNS);
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
        urlParam: 'status',
        type: 'checkbox',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: CLUSTER_STATUS_OPTIONS,
        dynamicItems: clusters.meta.cluster_statuses_all,
        chipText: 'Status',
      },
      {
        urlParam: 'version',
        type: 'checkbox',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: CLUSTER_VERSION_OPTIONS,
        dynamicItems: clusters.meta.cluster_versions_all,
        chipText: 'Version',
      },
      {
        urlParam: 'provider',
        type: 'checkbox',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: CLUSTER_PROVIDER_OPTIONS,
        dynamicItems: clusters.meta.cluster_providers_all,
        chipText: 'Provider',
      },
    ];

    testFilters(filters);
  });

  describe('Pagination', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        '**/api/ocp-vulnerability/v1/cves/CVE-2022-12345/exposed_clusters**',
        {
          ...initialState,
          ...clusters,
          meta: {
            ...initialState.meta,
            ...clusters.meta,
            total_items: 15,
          },
        }
      );

      mountComponent();
    });

    testPagination();
  });
});

describe('CveDetailTable without items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/cves/CVE-2022-12345/exposed_clusters**',
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
    cy.get('[data-label="Name"]').should('have.length', 0);
  });

  itIsNotSorted();
  itHasTableFunctionsDisabled();

  it('shows correct empty state depending on whether filters are applied or not', () => {
    cy.contains('No matching clusters found').should('exist');

    cy.get('#text-filter-search').type('example search term');

    cy.contains('No matching clusters found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
