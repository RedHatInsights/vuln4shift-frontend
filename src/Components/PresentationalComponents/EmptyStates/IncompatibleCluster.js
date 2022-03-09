import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Bullseye,
  Title,
  EmptyStateVariant,
  Button,
} from '@patternfly/react-core';
import { CogIcon } from '@patternfly/react-icons';

// TODO: Update button link
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
      <Button
        variant="primary"
        component="a"
        href="https://console.redhat.com/"
        target="_blank"
      >
        Learn more
      </Button>
    </EmptyState>
  </Bullseye>
);

export default IncompatibleCluster;
