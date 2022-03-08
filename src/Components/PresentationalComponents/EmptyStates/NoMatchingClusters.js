import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  Bullseye,
  EmptyStateVariant,
  Title,
} from '@patternfly/react-core';

const NoMatchingClusters = () => (
  <Bullseye>
    <EmptyState variant={EmptyStateVariant.large}>
      <Title headingLevel="h5" size="lg">
        No matching clusters found
      </Title>
      <EmptyStateBody>
        To continue, edit your filter settings and search again.
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

export default NoMatchingClusters;
