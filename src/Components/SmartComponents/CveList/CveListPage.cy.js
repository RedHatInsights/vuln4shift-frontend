import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CveListPage from './CveListPage';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';

beforeEach(() => {
  mount(
    <Router>
      <Provider store={init().getStore()}>
        <CveListPage />
      </Provider>
    </Router>
  );
});

// temporary hardcoded data and elements

describe('CveListTable', () => {
  it('exists', () => {
    cy.get('table');
  });
  it('has data', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 20);
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
    cy.get('[id^=expand-toggle]').each((item, index) => {
      if (index < 5) cy.wrap(item).click();
    });
    cy.get('.pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      5
    );
    cy.get('[id^=expand-toggle]').each((item, index) => {
      if (index < 5) cy.wrap(item).click();
    });
    cy.get('.pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
  });
});

describe('Navigation', () => {
  it('to last page and back works', () => {
    cy.get('[data-label="CVE ID"] > a')
      .first()
      .should('have.text', 'CVE-2022-0001');
    cy.get('[aria-label="Go to last page"]').click();
    cy.get('[data-label="CVE ID"] > a')
      .first()
      .should('have.text', 'CVE-2022-0027');
    cy.get('[aria-label="Go to first page"]').click();
    cy.get('[data-label="CVE ID"] > a')
      .first()
      .should('have.text', 'CVE-2022-0001');
  });
  it('per page works', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 20);
    cy.get('[aria-label="Items per page"]').first().click();
    cy.get('[data-action="per-page-10"]').click();
    cy.get('[data-label="CVE ID"]').should('have.length', 10);
  });
  it('works after limiting per page', () => {
    cy.get('[data-label="CVE ID"] > a')
      .first()
      .should('have.text', 'CVE-2022-0001');
    cy.get('[aria-label="Go to next page"]').first().click();
    cy.get('[data-label="CVE ID"] > a')
      .first()
      .should('have.text', 'CVE-2022-0012');
    cy.get('[aria-label="Go to previous page"]').first().click();
    cy.get('[data-label="CVE ID"] > a')
      .first()
      .should('have.text', 'CVE-2022-0001');
  });
});
