import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CveListTable from './CveListTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cves from '../../../../cypress/fixtures/cvelist.json';
import { initialState } from '../../../Store/Reducers/CveListStore';

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
});

describe('CveList Items', () => {
  it('are collapsed', () => {
    cy.get('.pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
  });
  it('are expandable and collapsable', () => {
    cy.get('[id^=expand-toggle]').each((item) => cy.wrap(item).click());
    cy.get('.pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      5
    );
    cy.get('[id^=expand-toggle]').each((item) => cy.wrap(item).click());
    cy.get('.pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
  });
});
