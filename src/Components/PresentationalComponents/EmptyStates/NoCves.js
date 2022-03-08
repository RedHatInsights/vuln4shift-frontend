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

const NoCves = () => (
  <Bullseye>
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={CheckCircleIcon} size="sm" />
      <Title headingLevel="h5" size="lg">
        No CVEs
      </Title>
      <EmptyStateBody>
        Your clusters are not affected by any CVEs.
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

export default NoCves;
