import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ClusterDetailTable from './ClusterDetailTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cves from '../../../../cypress/fixtures/clusterdetaillist.json';
import { initialState } from '../../../Store/Reducers/ClusterDetailStore';
import { CLUSTER_DETAIL_EXPORT_PREFIX } from '../../../Helpers/constants';
import {
  itExportsDataToFile,
  itHasNoActiveFilter,
  itHasTableFunctionsDisabled,
  itIsExpandable,
  itIsNotSorted,
  itIsSortedBy,
} from '../../../../cypress/utils/table';

const mountComponent = () => {
  mount(
    <MemoryRouter
      initialEntries={['/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd']}
    >
      <Route path="/clusters/:clusterId">
        <Provider store={init().getStore()}>
          <ClusterDetailTable />
        </Provider>
      </Route>
    </MemoryRouter>
  );
};

describe('ClusterDetailTable with items', () => {
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

  it('exists', () => {
    cy.get('table');
  });

  it('has items', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 5);
  });

  it('has "Reset filter" button hidden by default', () => {
    cy.contains('Reset filter').should('not.exist');
  });

  itIsSortedBy('Publish date');
  itHasNoActiveFilter();
  itExportsDataToFile(cves.data, CLUSTER_DETAIL_EXPORT_PREFIX);
  itIsExpandable(cves.data.length);

  it('shows missing metadata empty state when CVE description is "unknown"', () => {
    cy.get('tbody [id^=expand-toggle]').last().click();

    cy.contains('No description available');
  });
});

describe('CveListTable without items', () => {
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

  it('exists', () => {
    cy.get('table');
  });

  it('has no items', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 0);
  });

  itIsNotSorted();
  itHasTableFunctionsDisabled();

  it('shows correct empty state depending on whether filters are applied or not', () => {
    cy.contains('No CVEs').should('exist');

    cy.get('#text-filter-search').type('example search term');

    cy.contains('No matching CVEs found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
