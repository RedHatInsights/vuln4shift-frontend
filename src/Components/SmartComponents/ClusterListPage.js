import React, { Fragment } from 'react';
import { Alert, AlertVariant } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ClusterTable from './CveTable';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ClusterListPage = () => {
  // TODO: The alert should be dismissable (actionClose prop)
  return (
    <Fragment>
      <PageHeader>
        <PageHeaderTitle title="Vulnerable clusters" className="pf-u-mb-sm" />
        <Alert
          variant={AlertVariant.info}
          isInline
          className="pf-u-mt-md"
          title="Vulnerability information applies to OCP4.8+ version only"
        />
        {/* Remove the following component after implementing table */}
        <Link to="/clusters/ce7e3b0d-216e-410d-9111-3e1a06ff409e">
          Go to cluster detail page
        </Link>
      </PageHeader>
      <Main>
        <ClusterTable />
      </Main>
    </Fragment>
  );
};

export default ClusterListPage;
