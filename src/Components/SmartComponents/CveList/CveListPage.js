import React, { Fragment } from 'react';
import { Alert, AlertVariant, Popover, Split, SplitItem } from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import CveListTable from './CveListTable';

const CveListPage = () => {
  // TODO: Add correct link
  const PRODUCT_DOC = 'https://access.redhat.com/';

  const HeaderTitle = (
    <Popover
      className="cve-list-page-header-popover"
      position="right"
      flipBehavior={[]}
      bodyContent={
        <Fragment>
          The Vulnerability service identifies CVEs with errata that may affect
          your Insights-connected OpenShift clusters. Vulnerability information
          applies for OCP4.8+ version only.
          <br />
          <br />
          To access comprehensive Kubernetes security solution, go to&nbsp;
          <a>Red Hat Advanced Cluster Security for Kubernetes</a>.
        </Fragment>
      }
      footerContent={
        <Split hasGutter>
          <SplitItem>
            <a href={PRODUCT_DOC} target="__blank" rel="noopener noreferrer">
              Learn more <ExternalLinkAltIcon />
            </a>
          </SplitItem>
          <SplitItem>
            <a href={PRODUCT_DOC} target="__blank" rel="noopener noreferrer">
              Learn about ACS <ExternalLinkAltIcon />
            </a>
          </SplitItem>
        </Split>
      }
      appendTo={document.querySelector('.ocpVulnerability')}
    >
      <span>
        CVEs
        <OutlinedQuestionCircleIcon
          color="var(--pf-global--secondary-color--100)"
          className="pf-u-ml-sm pointer cves-header-questionmark"
          style={{ verticalAlign: '0' }}
        />
      </span>
    </Popover>
  );

  // TODO: The alert should be dismissable (actionClose prop)
  return (
    <Fragment>
      <PageHeader>
        <PageHeaderTitle title={HeaderTitle} className="pf-u-mb-sm" />
        <Alert
          variant={AlertVariant.info}
          isInline
          className="pf-u-mt-md"
          title="Vulnerability information applies to OCP4.8+ version only"
        />
      </PageHeader>
      <Main>
        <CveListTable />
      </Main>
    </Fragment>
  );
};

export default CveListPage;
