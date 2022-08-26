import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CveDetailPage from './CveDetailPage';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import clusters from '../../../../cypress/fixtures/cvedetaillist.json';
import cveDetail from '../../../../cypress/fixtures/cvedetail.json';
import { initialState } from '../../../Store/Reducers/CveDetailStore';

// TODO: Mock URL cveId param
const mountComponent = () => {
  mount(
    <Router>
      <Provider store={init().getStore()}>
        <CveDetailPage />
      </Provider>
    </Router>
  );
};

describe('CveDetailPage', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves/undefined**', {
      data: {
        ...cveDetail.data,
        description: 'unknown',
      },
      meta: cveDetail.meta,
    });

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

  it('should show missing metadata empty state when CVE description is "unknown"', () => {
    cy.contains('No description available');

    cy.get('[ouiaid="cve-detail-severity"]').contains('Unknown');
    cy.get('[ouiaid="cve-detail-cvss-score"]').contains('Unknown');
  });
});
