import React from 'react';
import { mount } from '@cypress/react18';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CveImagesTable from './CveImagesTable';
import { Provider } from 'react-redux';
import { init } from '../../../Store/ReducerRegistry';
import images from '../../../../cypress/fixtures/cveimageslist.json';
import { initialState } from '../../../Store/Reducers/CveDetailStore';
import {
  CVE_IMAGES_EXPORT_PREFIX,
  CVE_IMAGES_TABLE_COLUMNS,
} from '../../../Helpers/constants';
import {
  itExportsDataToFile,
  itHasNoActiveFilter,
  itHasTableFunctionsDisabled,
  itIsNotExpandable,
  itIsNotSorted,
  itIsSortedBy,
  testFilters,
  testPagination,
  testSorting,
} from '../../../../cypress/utils/table';

const mountComponent = () => {
  mount(
    <Provider store={init().getStore()}>
      <MemoryRouter initialEntries={['/cves/CVE-2022-12345']}>
        <Routes>
          <Route path="/cves/:cveId" element={<CveImagesTable />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe('CveImagesTable with items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/cves/CVE-2022-12345/exposed_images**',
      {
        ...initialState,
        ...images,
        meta: {
          ...initialState.meta,
          ...images.meta,
        },
      }
    );

    mountComponent();
  });

  it('exists and matches screenshot', () => {
    cy.get('table');

    cy.get('body').matchImage();
  });

  it('has items', () => {
    cy.get('[data-label="Name"]').should('have.length', 5);
  });

  it('has "Reset filter" button hidden by default', () => {
    cy.contains('Reset filter').should('not.exist');
  });

  itIsSortedBy('Name');
  itHasNoActiveFilter();
  itExportsDataToFile(images.data, CVE_IMAGES_EXPORT_PREFIX);
  itIsNotExpandable();

  describe('Sorting', () => {
    testSorting(CVE_IMAGES_TABLE_COLUMNS);
  });

  describe('Filtering', () => {
    const filters = [
      {
        urlParam: 'search',
        type: 'text',
        selector: '.ins-c-conditional-filter input[type="text"]',
        chipText: 'Search term',
      },
    ];

    testFilters(filters);
  });

  describe('Pagination', () => {
    beforeEach(() => {
      cy.intercept(
        'GET',
        '**/api/ocp-vulnerability/v1/cves/CVE-2022-12345/exposed_images**',
        {
          ...initialState,
          ...images,
          meta: {
            ...initialState.meta,
            ...images.meta,
            total_items: 15,
          },
        }
      );

      mountComponent();
    });

    testPagination();
  });
});

describe('CveImagesTable without items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/cves/CVE-2022-12345/exposed_images**',
      {
        ...initialState,
        data: [],
        meta: {
          ...initialState.meta,
          total_items: 0,
        },
      }
    );

    mountComponent();
  });

  it('exists and matches screenshot', () => {
    cy.get('table');

    cy.get('body').matchImage();
  });

  it('has no items', () => {
    cy.get('[data-label="Name"]').should('have.length', 0);
  });

  itIsNotSorted();
  itHasTableFunctionsDisabled();

  it('shows correct empty state depending on whether filters are applied or not', () => {
    cy.contains('No matching images found').should('exist');

    cy.get('#text-filter-search').type('example search term');

    cy.contains('No matching images found').should('exist');
    cy.contains('Reset filter').should('exist');
  });
});
