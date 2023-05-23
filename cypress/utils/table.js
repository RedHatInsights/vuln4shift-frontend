export const itIsSortedBy = (param) => {
  it(`is be sorted by ${param}`, () => {
    cy.get('.pf-m-selected > .pf-c-table__button').should('have.text', param);
  });
};

export const itIsNotSorted = () => {
  it('does not show sorting indicator', () => {
    cy.get('.pf-m-selected > .pf-c-table__button').should('have.length', 0);
  });
};

export const itHasTableFunctionsDisabled = () => {
  it('has export button and paginations disabled and has no bulk expand', () => {
    cy.get('[data-ouia-component-id=Export] button').should('be.disabled');

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
    cy.get('.pf-c-chip-group__label').should('have.text', filterName);
    cy.get('.pf-c-chip-group__main ul').should('have.text', filterValue);
  });
};

export const itHasNoActiveFilter = () => {
  it('does not have any filter active by default', () => {
    cy.get('.pf-c-chip-group__label').should('have.length', 0);
  });
};

export const itExportsDataToFile = (jsonData, filenamePrefix) => {
  it('exports data to JSON and CSV files', () => {
    cy.clock(Date.now());

    cy.get('[data-ouia-component-id=Export] button').click();
    cy.get('[data-ouia-component-id=Export] .pf-c-dropdown__menu-item').should(
      'have.length',
      2
    );
    cy.get('[data-ouia-component-id=Export] .pf-c-dropdown__menu-item')
      .contains('Export to JSON')
      .click();

    cy.get('[data-ouia-component-id=Export] button').click();

    cy.get('[data-ouia-component-id=Export] .pf-c-dropdown__menu-item')
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
    cy.get('tbody .pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      rowCount
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

  it('bulk expands and collapses all items', () => {
    cy.get('thead [id^=expand-toggle]').should(
      'have.attr',
      'aria-expanded',
      'false'
    );
    cy.get('thead [id^=expand-toggle]').click();
    cy.get('tbody .pf-c-table__expandable-row.pf-m-expanded > td').should(
      'have.length',
      rowCount
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
  cy.get(`.pf-c-chip-group__main:contains(${chipText}) button`).click();
};
