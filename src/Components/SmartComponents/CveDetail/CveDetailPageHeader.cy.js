import React from 'react';
import { mount } from '@cypress/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CveDetailPageHeader from './CveDetailPageHeader';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cveDetail from '../../../../cypress/fixtures/cvedetail.json';

const mountComponent = () => {
  mount(
    <MemoryRouter initialEntries={['/cves/CVE-2022-12345']}>
      <Route path="/cves/:cveId">
        <Provider store={init().getStore()}>
          <CveDetailPageHeader />
        </Provider>
      </Route>
    </MemoryRouter>
  );
};

describe('CveDetailPageHeader', () => {
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

    cy.get('[ouiaid="cve-detail-severity"]').contains('Unknown');
    cy.get('[ouiaid="cve-detail-cvss-score"]').contains('Unknown');
  });
});
