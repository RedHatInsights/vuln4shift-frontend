import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  Bullseye,
  EmptyStateHeader,
} from '@patternfly/react-core';

const NoMatchingClusters = () => (
  <Bullseye>
    <EmptyState variant="lg">
      <EmptyStateHeader
        titleText="No matching clusters found"
        headingLevel="h5"
      />
      <EmptyStateBody>
        To continue, edit your filter settings and search again.
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

export default NoMatchingClusters;
