import React, { Fragment } from 'react';
import { Alert, AlertVariant, Popover } from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import CveTable from './CveTable';
import { Link } from 'react-router-dom';

const CveListPage = () => {
  // TODO: Add correct link
  const PRODUCT_DOC = 'https://access.redhat.com/';

  const HeaderTitle = (
    <Popover
      enableFlip
      position="right"
      bodyContent={
        <Fragment>
          The Vulnerability service identifies CVEs with errata that may affect
          your Insights-connected OpenShift clusters.
          <br />
          <br />
          Vulnerability information applies for OCP4.8+ version only.
        </Fragment>
      }
      footerContent={
        <a href={PRODUCT_DOC} target="__blank" rel="noopener noreferrer">
          Learn more <ExternalLinkAltIcon />
        </a>
      }
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
        {/* Remove the following component after implementing table */}
        <Link to="/cves/CVE-2022-1234">Go to CVE detail page</Link>
      </PageHeader>
      <Main>
        <CveTable />
      </Main>
    </Fragment>
  );
};

export default CveListPage;
