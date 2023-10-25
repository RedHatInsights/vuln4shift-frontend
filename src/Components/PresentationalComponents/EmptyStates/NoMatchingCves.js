import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  Bullseye,
  EmptyStateHeader,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';

const NoMatchingCves = () => {
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
      <EmptyState variant="lg">
        <EmptyStateHeader
          titleText="No matching CVEs found"
          headingLevel="h5"
        />
        <EmptyStateBody>
          To continue, edit your filter settings and search again.
          <br />
          <br />
          As of today, Insights Vulnerability shows CVEs with Errata. It is
          possible the CVE you are searching for does not yet have an associated
          Errata. Please check the {CveDatabaseLink} or if you would like more
          information, contact {ProdSecLink}
        </EmptyStateBody>
      </EmptyState>
    </Bullseye>
  );
};

export default NoMatchingCves;
