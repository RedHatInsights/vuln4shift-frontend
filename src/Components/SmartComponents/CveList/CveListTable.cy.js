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
  EXPOSED_CLUSTERS_OPTIONS,
  PUBLISHED_OPTIONS,
  SEVERITY_OPTIONS,
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
        selector: '.ins-c-conditional-filter input[type="text"]',
        chipText: 'Search term',
      },
      {
        urlParam: 'published',
        type: 'radio',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: PUBLISHED_OPTIONS,
        chipText: 'Publish date',
      },
      {
        urlParam: 'severity',
        type: 'checkbox',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: SEVERITY_OPTIONS,
        chipText: 'Severity',
      },
      {
        urlParam: 'cvss_score',
        type: 'range',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        chipText: 'CVSS base score',
      },
      {
        urlParam: 'affected_clusters',
        type: 'checkbox',
        selector: '.ins-c-conditional-filter .pf-m-fill button',
        items: EXPOSED_CLUSTERS_OPTIONS,
        chipText: 'Exposed clusters',
        activeByDefault: true,
      },
    ];

    // TODO: Refactor this into a utility function
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
            cy.url().should('not.include', `${filter.urlParam}`);

            break;
          }

          case 'radio': {
            cy.get(filter.selector).click();

            cy.get('.pf-c-select__menu')
              .children()
              .each((child, index) => {
                if (index === 0) {
                  cy.contains('Reset filter').should('not.exist');
                } else {
                  const option = filter.items[index];

                  cy.get(child).click();

                  cy.url().should(
                    'include',
                    `${filter.urlParam}=${option.value}`
                  );

                  cy.contains('Reset filter');
                  itHasActiveFilter(filter.chipText, option.label);
                }
              });

            // close the dropdown so it does not obstruct remove chip button
            cy.get(filter.selector).eq(0).click();
            removeFilter(filter.chipText);
            cy.url().should('not.include', `${filter.urlParam}`);

            break;
          }

          case 'checkbox': {
            cy.get(filter.selector).click();

            // uncheck all possible values selected by default
            if (filter.activeByDefault) {
              cy.get('.pf-c-select__menu input[type="checkbox"]').uncheck({
                multiple: true,
              });
            }

            let selectedValues = [];

            cy.get('.pf-c-select__menu')
              .children()
              .each((child, index) => {
                const option = filter.items[index];

                cy.get(child).click();

                selectedValues.push(option.value);

                cy.url().should(
                  'include',
                  `${filter.urlParam}=${encodeURIComponent(
                    selectedValues.join(',')
                  )}`
                );

                if (!filter.activeByDefault) {
                  cy.contains('Reset filter');
                }
                itHasActiveFilter(filter.chipText, option.label);
              });

            // close the dropdown so it does not obstruct remove chip button
            cy.get(filter.selector).eq(0).click();
            cy.contains('Reset filter').click();

            if (!filter.activeByDefault) {
              cy.url().should('not.include', `${filter.urlParam}`);
            }

            break;
          }

          case 'range': {
            cy.get(filter.selector).click();

            cy.get('#range-filter-input-min').clear();
            cy.get('#range-filter-input-min').type('1');

            cy.get('#range-filter-input-max').clear();
            cy.get('#range-filter-input-max').type('9.555');

            cy.contains('Reset filter');
            itHasActiveFilter(filter.chipText, '1.0 - 9.5');
            cy.url().should(
              'include',
              `${filter.urlParam}=${encodeURIComponent('1,9.5')}`
            );

            // if value is out of range, the filter should not get applied
            cy.get('#range-filter-input-min').clear();
            cy.get('#range-filter-input-min').type('-1');

            cy.get('#range-filter-input-min[aria-invalid="true"]');

            itHasActiveFilter(filter.chipText, '1,9.5');

            // if min > max, the filter should not get applied
            cy.get('#range-filter-input-max').clear();
            cy.get('#range-filter-input-max').type('0.5');

            itHasActiveFilter(filter.chipText, '1,9.5');

            break;
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
