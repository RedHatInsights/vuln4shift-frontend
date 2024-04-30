import React from 'react';
import { mount } from '@cypress/react18';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CveDetailPageHeader from './CveDetailPageHeader';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cveDetail from '../../../../cypress/fixtures/cvedetail.json';

const mountComponent = () => {
  mount(
    <Provider store={init().getStore()}>
      <MemoryRouter initialEntries={['/cves/CVE-2022-12345']}>
        <Routes>
          <Route path="/cves/:cveId" element={<CveDetailPageHeader />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('CveDetailPageHeader with metadata', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves/CVE-2022-12345**', {
      data: {
        ...cveDetail.data,
      },
      meta: cveDetail.meta,
    });

    mountComponent();
  });

  it('matches screenshot', () => {
    cy.get('body').matchImage();
  });

  describe('CVSS vector breakdown', () => {
    it('matches screenshot', () => {
      cy.get('h6 svg').click();
      cy.get('.pf-v5-c-popover').matchImage();
    });
  });
});

describe('CveDetailPageHeader without metadata', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves/CVE-2022-12345**', {
      data: {
        ...cveDetail.data,
        description: 'unknown',
      },
      meta: cveDetail.meta,
    });

    mountComponent();
  });

  it('matches screenshot', () => {
    cy.get('body').matchImage();
  });

  it('shows missing metadata empty state when CVE description is "unknown"', () => {
    cy.contains('No description available');

    cy.get('[data-ouia-component-id="cve-detail-severity"]').contains(
      'Unknown'
    );
    cy.get('[data-ouia-component-id="cve-detail-cvss-score"]').contains(
      'Unknown'
    );
  });
});
