import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClusterListTable from './ClusterListTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import clusters from '../../../../cypress/fixtures/clusterlist.json';
import { initialState } from '../../../Store/Reducers/ClusterListStore';
import {
  CLUSTER_LIST_EXPORT_PREFIX,
  CLUSTER_LIST_TABLE_COLUMNS,
  CLUSTER_PROVIDER_OPTIONS,
  CLUSTER_SEVERITY_OPTIONS,
  CLUSTER_STATUS_OPTIONS,
  CLUSTER_VERSION_OPTIONS,
} from '../../../Helpers/constants';
import {
  itExportsDataToFile,
  itHasActiveFilter,
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
    <Provider store={init().getStore()}>
      <Router>
        <ClusterListTable />
      </Router>
    </Provider>
  );
};

describe('ClusterListTable with items', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/clusters**', {
      ...initialState,
      ...clusters,
      meta: {
        ...initialState.meta,
        ...clusters.meta,
      },
    });

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

  itHasActiveFilter('CVEs severity', 'All clusters');
  itIsSortedBy('Last seen');
  itExportsDataToFile(clusters.data, CLUSTER_LIST_EXPORT_PREFIX);
  itIsNotExpandable();

  describe('Sorting', () => {
    testSorting(CLUSTER_LIST_TABLE_COLUMNS);
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
        urlParam: 'cluster_severity',
        type: 'checkbox',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: CLUSTER_SEVERITY_OPTIONS,
        chipText: 'CVES severity',
        activeByDefault: true,
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
      cy.intercept('GET', '**/api/ocp-vulnerability/v1/clusters**', {
        ...initialState,
        ...clusters,
        meta: {
          ...initialState.meta,
          ...clusters.meta,
          total_items: 15,
        },
      });

      mountComponent();
    });

    testPagination();
  });
});

describe('ClusterListTable without items', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/clusters**', {
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
    cy.get('[data-label="Name"]').should('have.length', 0);
  });

  itIsNotSorted();
  itHasTableFunctionsDisabled();

  it('shows correct empty state depending on whether filters are applied or not', () => {
    cy.contains('No clusters yet').should('exist');

    cy.get('#text-filter-search').type('example search term');

    cy.contains('No matching clusters found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
