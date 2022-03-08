import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Bullseye,
  Title,
  EmptyStateVariant,
} from '@patternfly/react-core';
import { CogIcon } from '@patternfly/react-icons';

const IncompatibleCluster = () => (
  <Bullseye>
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={CogIcon} size="sm" />
      <Title headingLevel="h5" size="lg">
        Insights Vulnerability
      </Title>
      <EmptyStateBody>
        The Vulnerability service identifies CVEs with errata that may affect
        your Insights-connected OpenShift clusters.
        <br />
        <br />
        Vulnerability information applies for
        <strong> OCP4.8+ version</strong> only.
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

export default IncompatibleCluster;
