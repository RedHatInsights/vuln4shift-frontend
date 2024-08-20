import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Button,
  Bullseye,
  EmptyStateHeader,
  EmptyStateFooter,
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';

const NoClusters = () => (
  <Bullseye>
    <EmptyState variant="lg">
      <EmptyStateHeader
        titleText="No clusters yet"
        icon={<EmptyStateIcon icon={PlusCircleIcon} size="sm" />}
        headingLevel="h5"
      />
      <EmptyStateBody>
        To get started, create or register your cluster to get information from
        Insights Vulnerability.
      </EmptyStateBody>
      <EmptyStateFooter>
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
          className="pf-v5-u-mt-md"
        >
          Register Cluster
        </Button>
      </EmptyStateFooter>
    </EmptyState>
  </Bullseye>
);

export default NoClusters;
