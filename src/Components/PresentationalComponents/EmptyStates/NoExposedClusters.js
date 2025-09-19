import React from 'react';
import { EmptyState, EmptyStateBody, Bullseye } from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';

const NoExposedClusters = () => (
  <Bullseye>
    <EmptyState
      headingLevel="h5"
      icon={CheckCircleIcon}
      titleText="No clusters found"
      variant="lg"
    >
      <EmptyStateBody>This CVE doesn&apos;t affect any cluster.</EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

export default NoExposedClusters;
