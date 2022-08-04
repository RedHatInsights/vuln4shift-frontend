import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Bullseye,
  Title,
  EmptyStateVariant,
} from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';

const NoExposedClusters = () => (
  <Bullseye>
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon
        icon={CheckCircleIcon}
        color="var(--pf-global--success-color--100)"
        size="sm"
      />
      <Title headingLevel="h5" size="lg">
        No clusters found
      </Title>
      <EmptyStateBody>This CVE doesn&apos;t affect any cluster.</EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

export default NoExposedClusters;
