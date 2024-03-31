import { uniqBy } from 'lodash';
import strictUriEncode from 'strict-uri-encode';

export const itIsSortedBy = (param) => {
  it(`is sorted by ${param}`, () => {
    cy.get('.pf-m-selected > .pf-v5-c-table__button').should(
      'have.text',
      param
    );
  });
};

export const itIsNotSorted = () => {
  it('does not show sorting indicator', () => {
    cy.get('.pf-m-selected > .pf-v5-c-table__button').should('have.length', 0);
  });
};

export const itHasTableFunctionsDisabled = () => {
  it('has export buttons and paginations disabled and has no bulk expand', () => {
    cy.get('button[aria-label=Export]').click();
    cy.get('[aria-label=Export]')
      .parent()
      .get('.pf-v5-c-menu__item')
      .should('be.disabled');

    cy.get('[data-ouia-component-id=pagination-top] button').should(
      'be.disabled'
    );

    cy.get('[data-ouia-component-id=pagination-bottom] button').should(
      'be.disabled'
    );

    cy.get('thead [id^=expand-toggle]').should('have.length', 0);
  });
};

export const itHasActiveFilter = (filterName, filterValue) => {
  it(`has ${filterName}: ${filterValue} filter active by default`, () => {
    cy.get('.pf-v5-c-chip-group__label').should('have.text', filterName);
    cy.get('.pf-v5-c-chip-group__main ul').should('have.text', filterValue);
  });
};

export const itHasNoActiveFilter = () => {
  it('does not have any filter active by default', () => {
    cy.get('.pf-v5-c-chip-group__label').should('have.length', 0);
  });
};

export const itExportsDataToFile = (jsonData, filenamePrefix) => {
  it('exports data to JSON and CSV files', () => {
    cy.clock(Date.now());

    cy.get('button[aria-label=Export]').click();
    cy.get('[aria-label=Export]')
      .parent()
      .get('.pf-v5-c-menu__item')
      .should('have.length', 2);
    cy.get('[aria-label=Export]')
      .parent()
      .get('.pf-v5-c-menu__item')
      .contains('Export to JSON')
      .click();

    cy.get('button[aria-label=Export]').click();

    cy.get('[aria-label=Export]')
      .parent()
      .get('.pf-v5-c-menu__item')
      .contains('Export to CSV')
      .click();

    const formattedDate =
      new Date().toISOString().replace(/[T:]/g, '-').split('.')[0] + '-utc';

    cy.readFile(`cypress/downloads/${filenamePrefix + formattedDate}.json`)
      .should('exist')
      .should('deep.equal', jsonData);

    // CSV data is not mocked so it's filled with JSON in the test, we just test
    // its existence, not its contents
    cy.readFile(
      `cypress/downloads/${filenamePrefix + formattedDate}.csv`
    ).should('exist');
  });
};

export const itIsExpandable = (rowCount) => {
  it('has all items collapsed by default', () => {
    cy.get('.pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
  });

  it('has expandable and collapsable items', () => {
    cy.get('tbody [id^=expand-toggle]').each((item) => cy.wrap(item).click());
    cy.get('tbody .pf-v5-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      rowCount
    );
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    cy.get('tbody [id^=expand-toggle]').each((item) => cy.wrap(item).click());
    cy.get('tbody .pf-v5-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'false'
    );
  });

  it('bulk expands and collapses all items', () => {
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'false'
    );
    cy.get('thead [id^=expand-toggle]').click();
    cy.get('tbody .pf-v5-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      rowCount
    );
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'true'
    );
    cy.get('thead [id^=expand-toggle]').click();
    cy.get('tbody .pf-v5-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      0
    );
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'false'
    );
  });
};

export const itIsNotExpandable = () => {
  it('does not have expandable items', () => {
    cy.get('.pf-c-table__expandable-row').should('have.length', 0);
  });

  it('does not have expand all buttons', () => {
    cy.get('thead [id^=expand-toggle]').should('not.exist');
  });
};

export const removeFilter = (chipText) => {
  cy.get(`.pf-v5-c-chip-group__main:contains(${chipText}) button`).click();
};

export const testSorting = (
  columns,
  isTableExpandable = false,
  defaultSort = undefined
) => {
  let isFirstSortableColumnProcessed = false;

  columns.forEach(
    (column, index) =>
      column.sortParam &&
      it(`is sorted by ${column.title}`, () => {
        const tableHeaders = 'thead tr';

        // handle first column already sorted by default
        if (defaultSort == column.title && !isFirstSortableColumnProcessed) {
          cy.get(tableHeaders)
            .children()
            .eq(index + (isTableExpandable ? 1 : 0))
            .click();
        }

        isFirstSortableColumnProcessed = true;

        cy.get(tableHeaders)
          .children()
          .eq(index + (isTableExpandable ? 1 : 0))
          .click();

        column.sortDefaultDirection === 'asc'
          ? cy.url().should('include', `sort=${column.sortParam}`)
          : cy.url().should('include', `sort=-${column.sortParam}`);

        cy.get(tableHeaders)
          .children()
          .eq(index + (isTableExpandable ? 1 : 0))
          .click();

        column.sortDefaultDirection === 'asc'
          ? cy.url().should('include', `sort=-${column.sortParam}`)
          : cy.url().should('include', `sort=${column.sortParam}`);
      })
  );
};

export const testFilters = (filters) => {
  filters.forEach((filter, index) => {
    it(`filters by ${filter.urlParam}`, () => {
      if (filters.length > 1) {
        cy.get('button[aria-label="Conditional filter toggle"]').click();
        cy.get('.pf-v5-c-menu__list-item button').eq(index).click();
      }

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

          cy.get('.pf-v5-c-menu__list-item')
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
            cy.get('.pf-v5-c-menu__list-item input[type="checkbox"]').uncheck({
              multiple: true,
            });
          }

          let selectedValues = [];

          cy.get('.pf-v5-c-menu__list-item')
            .children()
            .each((child, index) => {
              const allItems = uniqBy(
                filter.items.concat(
                  (filter.dynamicItems ?? []).map((item) => ({
                    label: item,
                    value: item,
                  }))
                ),
                'value'
              );

              const option = allItems[index];

              cy.get(child).click();

              selectedValues.push(option.value);

              cy.url().should(
                'include',
                `${filter.urlParam}=${strictUriEncode(
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
            `${filter.urlParam}=${strictUriEncode('1,9.5')}`
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

          // close the dropdown so it does not obstruct remove chip button
          cy.get(filter.selector).eq(0).click();
          cy.contains('Reset filter').click();

          break;
        }
      }
    });
  });
};

export const testPagination = () => {
  const navigationButtons =
    '#options-menu-top-pagination > .pf-v5-c-pagination__nav button';

  it('should change page size', () => {
    cy.get(navigationButtons).eq(0).should('be.disabled');
    cy.get(navigationButtons).eq(1).should('be.disabled');

    cy.get('#options-menu-top-pagination .pf-v5-c-menu-toggle').click();
    cy.get('.pf-v5-c-menu__content button').eq(0).click();

    cy.url().should('include', `limit=10`);
    cy.get(navigationButtons).eq(1).should('be.enabled');
  });

  it('should navigate to next page', () => {
    cy.get(navigationButtons).eq(1).click();
    cy.url().should('include', `offset=10`);
  });
};
