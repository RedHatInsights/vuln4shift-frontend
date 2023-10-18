import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Bullseye,
  EmptyStateHeader,
} from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';

const NoExposedClusters = () => (
  <Bullseye>
    <EmptyState variant="lg">
      <EmptyStateHeader
        titleText="No clusters found"
        icon={
          <EmptyStateIcon
            icon={CheckCircleIcon}
            color="var(--pf-global--success-color--100)"
            size="sm"
          />
        }
        headingLevel="h5"
      />
      <EmptyStateBody>This CVE doesn&apos;t affect any cluster.</EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

export default NoExposedClusters;
