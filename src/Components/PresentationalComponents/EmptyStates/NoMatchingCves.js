import React from 'react';
import { EmptyState, EmptyStateBody, Bullseye } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { useFeatureFlag } from '../../../Helpers/hooks';

const NoMatchingCves = () => {
  const isLightspeedEnabled = useFeatureFlag('platform.lightspeed-rebrand');

  const CveDatabaseLink = (
    <a
      href="https://access.redhat.com/security/security-updates/#/cve"
      target="__blank"
      rel="noopener noreferrer"
      className="nowrap"
    >
      Red Hat CVE Database <ExternalLinkAltIcon />
    </a>
  );

  const ProdSecLink = (
    <a
      href="https://access.redhat.com/security/team/contact/"
      target="__blank"
      rel="noopener noreferrer"
      className="nowrap"
    >
      Red Hat Product Security <ExternalLinkAltIcon />
    </a>
  );

  return (
    <Bullseye>
      <EmptyState
        headingLevel="h5"
        titleText="No matching CVEs found"
        variant="lg"
      >
        <EmptyStateBody>
          To continue, edit your filter settings and search again.
          <br />
          <br />
          As of today, {isLightspeedEnabled ? 'Lightspeed' : 'Insights'}{' '}
          Vulnerability shows CVEs with Errata. It is possible the CVE you are
          searching for does not yet have an associated Errata. Please check the{' '}
          {CveDatabaseLink} or if you would like more information, contact{' '}
          {ProdSecLink}
        </EmptyStateBody>
      </EmptyState>
    </Bullseye>
  );
};

export default NoMatchingCves;
