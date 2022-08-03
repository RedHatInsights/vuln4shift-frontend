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
import propTypes from 'prop-types';

const NoCves = ({ multipleClusters = false }) => (
  <Bullseye>
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={CheckCircleIcon} size="sm" />
      <Title headingLevel="h5" size="lg">
        No CVEs
      </Title>
      <EmptyStateBody>
        {multipleClusters
          ? 'Your clusters are not affected by any CVEs.'
          : 'Your cluster is not affected by any CVEs.'}
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

NoCves.propTypes = {
  multipleClusters: propTypes.bool,
};

export default NoCves;
