import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClusterDetailTable from './ClusterDetailTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cves from '../../../../cypress/fixtures/clusterdetaillist.json';
import { initialState } from '../../../Store/Reducers/ClusterDetailStore';
import { CLUSTER_DETAIL_EXPORT_PREFIX } from '../../../Helpers/constants';

// TODO: Mock URL cveId param
const mountComponent = () => {
  mount(
    <Router>
      <Provider store={init().getStore()}>
        <ClusterDetailTable />
      </Provider>
    </Router>
  );
};

describe('ClusterDetailTable with items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/clusters/undefined/cves**',
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

  it('should be sorted by Publish date', () => {
    cy.get('.pf-m-selected > .pf-c-table__button').should(
      'have.text',
      'Publish date'
    );
  });

  it('should have "Reset filter" button hidden by default', () => {
    cy.contains('Reset filter').should('not.exist');
  });

  it('should export data to file', () => {
    cy.clock(Date.now());

    cy.get('[data-ouia-component-id=Export] button').click();
    cy.get('[data-ouia-component-id=Export] .pf-c-dropdown__menu-item').should(
      'have.length',
      2
    );
    cy.get('[data-ouia-component-id=Export] .pf-c-dropdown__menu-item')
      .contains('Export to JSON')
      .click();

    const formattedDate =
      new Date().toISOString().replace(/[T:]/g, '-').split('.')[0] + '-utc';

    cy.readFile(
      `cypress/downloads/${CLUSTER_DETAIL_EXPORT_PREFIX + formattedDate}.json`
    )
      .should('exist')
      .should('deep.equal', cves.data);
  });

  it('should have items collapsed by default', () => {
    cy.get('.pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
  });

  it('should have expandable and collapsable items', () => {
    cy.get('tbody [id^=expand-toggle]').each((item) => cy.wrap(item).click());
    cy.get('tbody .pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      5
    );
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    cy.get('tbody [id^=expand-toggle]').each((item) => cy.wrap(item).click());
    cy.get('tbody .pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'false'
    );
  });

  it('should bulk expand and collapse all items', () => {
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'false'
    );
    cy.get('thead [id^=expand-toggle]').click();
    cy.get('tbody .pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      5
    );
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    cy.get('thead [id^=expand-toggle]').click();
    cy.get('tbody .pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'false'
    );
  });
});

describe('CveListTable without items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/clusters/undefined/cves**',
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

  it('does not show sorting indicator', () => {
    cy.get('.pf-m-selected > .pf-c-table__button').should('have.length', 0);
  });

  it('has export button and paginations disabled and has no bulk expand', () => {
    cy.get('[data-ouia-component-id=Export] button').should('be.disabled');

    cy.get('[data-ouia-component-id=pagination-top] button').should(
      'be.disabled'
    );

    cy.get('[data-ouia-component-id=pagination-bottom] button').should(
      'be.disabled'
    );

    cy.get('thead [id^=expand-toggle]').should('have.length', 0);
  });

  it('shows correct empty state depending on whether filters are applied or not', () => {
    cy.contains('No CVEs').should('exist');

    cy.get('#text-filter-search').type('example search term');

    cy.contains('No matching CVEs found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
