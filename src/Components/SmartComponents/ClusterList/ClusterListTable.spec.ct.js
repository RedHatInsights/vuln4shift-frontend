import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClusterListTable from './ClusterListTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import clusters from '../../../../cypress/fixtures/clusterlist.json';
import { initialState } from '../../../Store/Reducers/ClusterListStore';
import { CLUSTER_LIST_EXPORT_PREFIX } from '../../../Helpers/constants';
import {
  itExportsDataToFile,
  itHasActiveFilter,
  itHasTableFunctionsDisabled,
  itIsNotExpandable,
  itIsNotSorted,
  itIsSortedBy,
} from '../../../../cypress/utils/table';

const mountComponent = () => {
  mount(
    <Router>
      <Provider store={init().getStore()}>
        <ClusterListTable />
      </Provider>
    </Router>
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

  it('exists', () => {
    cy.get('table');
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

  it('exists', () => {
    cy.get('table');
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
