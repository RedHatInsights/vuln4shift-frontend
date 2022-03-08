import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Button,
  Bullseye,
  Title,
  EmptyStateVariant,
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

const NoClusters = () => (
  <Bullseye>
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={PlusCircleIcon} size="sm" />
      <Title headingLevel="h5" size="lg">
        No clusters yet
      </Title>
      <EmptyStateBody>
        To get started, create or register your cluster to get information from
        Insights Vulnerability.
      </EmptyStateBody>
      <Button
        variant="primary"
        component="a"
        href="https://console.redhat.com/openshift/create/"
        target="_blank"
      >
        Create Cluster
      </Button>
      <br />
      <Button
        variant="link"
        component="a"
        href="https://console.redhat.com/openshift/register/"
        target="_blank"
        className="pf-u-mt-md"
      >
        Register Cluster
      </Button>
    </EmptyState>
  </Bullseye>
);

export default NoClusters;
