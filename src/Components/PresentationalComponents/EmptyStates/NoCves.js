import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Bullseye,
  EmptyStateHeader,
} from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';
import propTypes from 'prop-types';

const NoCves = ({ multipleClusters = false }) => (
  <Bullseye>
    <EmptyState variant="lg">
      <EmptyStateHeader
        titleText="No CVEs"
        icon={
          <EmptyStateIcon
            icon={CheckCircleIcon}
            color="var(--pf-v5-global--success-color--100)"
            size="sm"
          />
        }
        headingLevel="h5"
      />
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
