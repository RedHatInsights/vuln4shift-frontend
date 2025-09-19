import React from 'react';
import { EmptyState, EmptyStateBody, Bullseye } from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';
import propTypes from 'prop-types';

const NoCves = ({ multipleClusters = false }) => (
  <Bullseye>
    <EmptyState
      headingLevel="h5"
      icon={CheckCircleIcon}
      titleText="No CVEs"
      variant="lg"
    >
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
