import React from 'react';
import { mount } from '@cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CveListTable from './CveListTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import cves from '../../../../cypress/fixtures/cvelist.json';
import { initialState } from '../../../Store/Reducers/CveListStore';
import {
  CVE_LIST_EXPORT_PREFIX,
  PUBLISHED_OPTIONS,
} from '../../../Helpers/constants';
import {
  itIsExpandable,
  itIsSortedBy,
  itExportsDataToFile,
  itHasActiveFilter,
  itIsNotSorted,
  itHasTableFunctionsDisabled,
  removeFilter,
} from '../../../../cypress/utils/table';
import { CVE_LIST_TABLE_COLUMNS } from '../../../Helpers/constants';

const mountComponent = () => {
  mount(
    <Router>
      <Provider store={init().getStore()}>
        <CveListTable />
      </Provider>
    </Router>
  );
};

describe('CveListTable with items', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves**', {
      ...initialState,
      ...cves,
      meta: {
        ...initialState.meta,
        ...cves.meta,
      },
    });

    mountComponent();
  });

  it('exists and matches screenshot', () => {
    cy.get('table');

    cy.get('body').matchImage();
  });

  it('has items', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 5);
  });

  it('has "Reset filter" button hidden by default', () => {
    cy.contains('Reset filter').should('not.exist');
  });

  itHasActiveFilter('Exposed clusters', '1 or more');
  itIsSortedBy('Publish date');
  itExportsDataToFile(cves.data, CVE_LIST_EXPORT_PREFIX);
  itIsExpandable(cves.data.length);

  it('shows missing metadata empty state when CVE description is "unknown"', () => {
    cy.get('tbody [id^=expand-toggle]').last().click();

    cy.contains('No description available');
  });

  describe('Sorting', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves**', {
        ...initialState,
        ...cves,
        meta: {
          ...initialState.meta,
          ...cves.meta,
        },
      });

      mountComponent();
    });

    const checkSortingUrl = (sortingParameter, index) => {
      // get appropriate locators
      const tableHeaders = 'tr[data-ouia-component-type="PF4/TableRow"]';
      // sort by column and verify URL
      cy.get(tableHeaders).children().eq(index).click();
      cy.url().should('include', `sort=-${sortingParameter}`);
      cy.get(tableHeaders).children().eq(index).click();
      cy.url().should('include', `sort=${sortingParameter}`);
    };

    CVE_LIST_TABLE_COLUMNS.map((column) => [
      column.sortParam,
      column.title,
    ]).forEach(([category, label], index) => {
      let sortingParameter = category;
      it(`is sorted by ${label}`, () => {
        checkSortingUrl(sortingParameter, index + 1);
      });
    });
  });

  describe('Filtering', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves**', {
        ...initialState,
        ...cves,
        meta: {
          ...initialState.meta,
          ...cves.meta,
        },
      });

      mountComponent();
    });

    const filters = [
      {
        urlParam: 'search',
        type: 'text',
        selector: '#text-filter-search',
        chipText: 'Search term',
      },
      {
        urlParam: 'published',
        type: 'radio',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: PUBLISHED_OPTIONS,
      },
    ];

    filters.forEach((filter, index) => {
      it(`filters by ${filter.urlParam}`, () => {
        cy.get('button[data-ouia-component-id="ConditionalFilter"]').click();
        cy.get('.pf-c-dropdown__menu').children().eq(index).click();

        switch (filter.type) {
          case 'text': {
            cy.get(filter.selector).type('test');
            cy.url().should('include', `${filter.urlParam}=test`);
            cy.contains('Reset filter');
            itHasActiveFilter(filter.chipText, 'test');

            removeFilter(filter.chipText);
            cy.url().should('not.include', `${filter.urlParam}=test`);
          }
        }
      });
    });
  });
});

describe('CveListTable without items', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ocp-vulnerability/v1/cves**', {
      ...initialState,
      data: [],
      meta: {
        ...initialState.meta,
        total_items: 0,
      },
    });

    mountComponent();
  });

  it('exists and matches screenshot', () => {
    cy.get('table');

    cy.get('body').matchImage();
  });

  it('has no items', () => {
    cy.get('[data-label="CVE ID"]').should('have.length', 0);
  });

  itIsNotSorted();
  itHasTableFunctionsDisabled();

  it('shows correct empty state depending on whether filters are applied or not', () => {
    cy.contains('No matching CVEs found').should('exist');

    cy.get('.ins-c-chip-filters .pf-c-chip button').click();

    cy.contains('No matching CVEs found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
