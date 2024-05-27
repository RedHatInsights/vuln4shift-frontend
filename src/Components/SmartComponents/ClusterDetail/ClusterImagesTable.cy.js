import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ClusterImagesTable from './ClusterImagesTable';
import images from '../../../../cypress/fixtures/clusterimageslist.json';
import { initialState } from '../../../Store/Reducers/ClusterImagesStore';
import {
  CLUSTER_IMAGES_EXPORT_PREFIX,
  CLUSTER_IMAGES_TABLE_COLUMNS,
} from '../../../Helpers/constants';
import {
  itExportsDataToFile,
  itHasNoActiveFilter,
  itHasTableFunctionsDisabled,
  itIsNotSorted,
  itIsSortedBy,
  testFilters,
  testPagination,
  testSorting,
} from '../../../../cypress/utils/table';

const mountComponent = () => {
  cy.mountWithProviders(
    <MemoryRouter
      initialEntries={['/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd/images']}
    >
      <Routes>
        <Route
          path="/clusters/:clusterId/images"
          element={<ClusterImagesTable />}
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('ClusterImagesTable with items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd/exposed_images**',
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
    cy.get('[data-label="Name"]').should('have.length', images.data.length);
  });

  it('has "Reset filter" button hidden by default', () => {
    cy.contains('Reset filter').should('not.exist');
  });

  itIsSortedBy('Name');
  itHasNoActiveFilter();
  itExportsDataToFile(images.data, CLUSTER_IMAGES_EXPORT_PREFIX);

  describe('Sorting', () => {
    testSorting(CLUSTER_IMAGES_TABLE_COLUMNS, false, 'Name');
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
        '**/api/ocp-vulnerability/v1/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd/exposed_images**',
        {
          ...initialState,
          ...images,
          meta: {
            ...initialState.meta,
            ...images.meta,
            total_items: 15, // faking total items to enable next page button
          },
        }
      );

      mountComponent();
    });

    testPagination();
  });
});

describe('ClusterImagesTable without items', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/api/ocp-vulnerability/v1/clusters/e45c0b54-3083-4ae0-9cbc-f7d7a302e7dd/exposed_images**',
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
