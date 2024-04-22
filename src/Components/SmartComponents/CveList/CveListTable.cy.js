import React from 'react';
import { mount } from '@cypress/react18';
import { BrowserRouter as Router } from 'react-router-dom';
import CveListTable from './CveListTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cves from '../../../../cypress/fixtures/cvelist.json';
import { initialState } from '../../../Store/Reducers/CveListStore';
import {
  CVE_LIST_EXPORT_PREFIX,
  EXPOSED_CLUSTERS_OPTIONS,
  EXPOSED_IMAGES_FEATURE_FLAG,
  PUBLISHED_OPTIONS,
  SEVERITY_OPTIONS,
} from '../../../Helpers/constants';
import {
  itIsExpandable,
  itIsSortedBy,
  itExportsDataToFile,
  itHasActiveFilter,
  itIsNotSorted,
  itHasTableFunctionsDisabled,
  testFilters,
  testPagination,
  testSorting,
} from '../../../../cypress/utils/table';
import { CVE_LIST_TABLE_COLUMNS } from '../../../Helpers/constants';
import FlagProvider from '@unleash/proxy-client-react';

const mountComponent = () => {
  mount(
    <FlagProvider
      config={{
        url: 'http://localhost:8002/feature_flags',
        clientKey: 'abc',
        appName: 'abc',
      }}
    >
      <Provider store={init().getStore()}>
        <Router>
          <CveListTable />
        </Router>
      </Provider>
    </FlagProvider>
  );
};

describe('CveListTable with items', () => {
  beforeEach(() => {
    cy.intercept('GET', '/feature_flags*', {
      statusCode: 200,
      body: {
        toggles: [
          {
            name: EXPOSED_IMAGES_FEATURE_FLAG,
            enabled: true,
          },
        ],
      },
    });

    cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves**', {
      ...initialState,
      ...cves,
      meta: {
        ...initialState.meta,
        ...cves.meta,
      },
    });

    mountComponent();
  });

  it('exists and matches screenshot', () => {
    cy.get('table');

    cy.get('body').matchImage();
  });

  it('has items', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 5);
  });

  it('has "Reset filter" button hidden by default', () => {
    cy.contains('Reset filter').should('not.exist');
  });

  itHasActiveFilter('Exposed clusters', '1 or more');
  itIsSortedBy('Publish date');
  itExportsDataToFile(cves.data, CVE_LIST_EXPORT_PREFIX);
  itIsExpandable(cves.data.length);

  it('shows missing metadata empty state when CVE description is "unknown"', () => {
    cy.get('tbody [id^=expand-toggle]').last().click();

    cy.contains('No description available');
  });

  describe('Sorting', () => {
    testSorting(CVE_LIST_TABLE_COLUMNS, true);
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
      {
        urlParam: 'affected_clusters',
        type: 'checkbox',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: EXPOSED_CLUSTERS_OPTIONS,
        chipText: 'Exposed clusters',
        activeByDefault: true,
      },
    ];

    testFilters(filters);
  });

  describe('Pagination', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves**', {
        ...initialState,
        ...cves,
        meta: {
          ...initialState.meta,
          ...cves.meta,
          total_items: 15, // faking total items to enable next page button
        },
      });

      mountComponent();
    });

    testPagination();
  });
});

describe('CveListTable without items', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves**', {
      ...initialState,
      data: [],
      meta: {
        ...initialState.meta,
        total_items: 0,
      },
    });

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

    cy.get('.ins-c-chip-filters .pf-v5-c-chip button').click();

    cy.contains('No matching CVEs found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
