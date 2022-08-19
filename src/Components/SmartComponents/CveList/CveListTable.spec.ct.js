import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CveListTable from './CveListTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cves from '../../../../cypress/fixtures/cvelist.json';
import { initialState } from '../../../Store/Reducers/CveListStore';
import { CVE_LIST_EXPORT_PREFIX } from '../../../Helpers/constants';

beforeEach(() => {
  cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves**', {
    ...initialState,
    ...cves,
    meta: {
      ...initialState.meta,
      ...cves.meta,
    },
  });
  mount(
    <Router>
      <Provider store={init().getStore()}>
        <CveListTable />
      </Provider>
    </Router>
  );
});

describe('CveListTable', () => {
  it('exists', () => {
    cy.get('table');
  });

  it('has data', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 5);
  });

  it('should be sorted by Publish date', () => {
    cy.get('.pf-m-selected > .pf-c-table__button').should(
      'have.text',
      'Publish date'
    );
  });
});

describe('CveListTable toolbar', () => {
  it('should have Exposed Clusters filter active by default', () => {
    cy.get('.pf-c-chip-group__label').should('have.text', 'Exposed clusters');
    cy.get('.pf-c-chip-group__main ul').should('have.text', '1 or more');
  });

  it('should have "Reset filters" button hidden by default', () => {
    cy.get('.ins-c-chip-filters > .pf-c-button').should('not.exist');
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
      `cypress/downloads/${CVE_LIST_EXPORT_PREFIX + formattedDate}.json`
    )
      .should('exist')
      .should('deep.equal', cves.data);
  });
});

describe('CveListTable items', () => {
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
