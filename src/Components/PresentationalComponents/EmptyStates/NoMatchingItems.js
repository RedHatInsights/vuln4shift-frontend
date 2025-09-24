import React from 'react';
import propTypes from 'prop-types';
import { EmptyState, EmptyStateBody, Bullseye } from '@patternfly/react-core';

const NoMatchingItems = ({ items = 'items' }) => (
  <Bullseye>
    <EmptyState
      headingLevel="h5"
      titleText={`No matching ${items} found`}
      variant="lg"
    >
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
