import React, { Fragment } from 'react';
import { Alert, AlertVariant } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ClusterListTable from './ClusterListTable';

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
      </PageHeader>
      <Main>
        <ClusterListTable />
      </Main>
    </Fragment>
  );
};

export default ClusterListPage;
