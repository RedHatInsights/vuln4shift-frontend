import React from 'react';
import propTypes from 'prop-types';
import {
  EmptyState,
  EmptyStateBody,
  Bullseye,
  EmptyStateHeader,
} from '@patternfly/react-core';

const NoMatchingItems = ({ items = 'items' }) => (
  <Bullseye>
    <EmptyState variant="lg">
      <EmptyStateHeader
        titleText={`No matching ${items} found`}
        headingLevel="h5"
      />
      <EmptyStateBody>
        To continue, edit your filter settings and search again.
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

NoMatchingItems.propTypes = {
  items: propTypes.string,
};

export default NoMatchingItems;
