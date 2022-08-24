import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CveDetailTable from './CveDetailTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import clusters from '../../../../cypress/fixtures/cvedetaillist.json';
import { initialState } from '../../../Store/Reducers/CveDetailStore';
import { CVE_DETAIL_EXPORT_PREFIX } from '../../../Helpers/constants';

// TODO: Mock URL cveId param
const mountComponent = () => {
  mount(
    <Router>
      <Provider store={init().getStore()}>
        <CveDetailTable />
      </Provider>
    </Router>
  );
};

describe('CveDetailTable with items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/cves/undefined/exposed_clusters**',
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

  it('exists', () => {
    cy.get('table');
  });

  it('has items', () => {
    cy.get('[data-label="Name"]').should('have.length', 5);
  });

  it('should be sorted by Last seen', () => {
    cy.get('.pf-m-selected > .pf-c-table__button').should(
      'have.text',
      'Last seen'
    );
  });

  it('should not have any filter active by default', () => {
    cy.get('.pf-c-chip-group__label').should('have.length', 0);
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
      `cypress/downloads/${CVE_DETAIL_EXPORT_PREFIX + formattedDate}.json`
    )
      .should('exist')
      .should('deep.equal', clusters.data);
  });

  it('should have have expandable items', () => {
    cy.get('.pf-c-table__expandable-row').should('have.length', 0);
  });
});

describe('CveDetailTable without items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/cves/undefined/exposed_clusters**',
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
    cy.get('[data-label="Name"]').should('have.length', 0);
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
    cy.contains('No clusters found').should('exist');

    cy.get('#text-filter-search').type('example search term');

    cy.contains('No matching clusters found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
