import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CveDetailPageHeader from './CveDetailPageHeader';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cveDetail from '../../../../cypress/fixtures/cvedetail.json';

// TODO: Mock URL cveId param
const mountComponent = () => {
  mount(
    <Router>
      <Provider store={init().getStore()}>
        <CveDetailPageHeader />
      </Provider>
    </Router>
  );
};

describe('CveDetailPageHeader', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves/undefined**', {
      data: {
        ...cveDetail.data,
        description: 'unknown',
      },
      meta: cveDetail.meta,
    });

    mountComponent();
  });

  it('shows missing metadata empty state when CVE description is "unknown"', () => {
    cy.contains('No description available');

    cy.get('[ouiaid="cve-detail-severity"]').contains('Unknown');
    cy.get('[ouiaid="cve-detail-cvss-score"]').contains('Unknown');
  });
});
