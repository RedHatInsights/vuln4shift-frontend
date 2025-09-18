import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  Button,
  Bullseye,
  EmptyStateFooter,
} from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons';
import { useFeatureFlag } from '../../../Helpers/hooks';

const NoClusters = () => {
  const isLightspeedEnabled = useFeatureFlag('platform.lightspeed-rebrand');

  return (
    <Bullseye>
      <EmptyState
        headingLevel="h5"
        icon={PlusCircleIcon}
        titleText="No clusters yet"
        variant="lg"
      >
        <EmptyStateBody>
          To get started, create or register your cluster to get information
          from {isLightspeedEnabled ? 'Lightspeed' : 'Insights'} Vulnerability.
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
            className="pf-v6-u-mt-md"
          >
            Register Cluster
          </Button>
        </EmptyStateFooter>
      </EmptyState>
    </Bullseye>
  );
};

export default NoClusters;
