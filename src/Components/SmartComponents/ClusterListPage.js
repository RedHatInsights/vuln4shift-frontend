import React, { Fragment } from 'react';
import { Alert, AlertVariant } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ClusterTable from './CveTable';

const ClusterListPage = () => {
  // TODO: The alert should be dismissable (actionClose prop)
  return (
    <Fragment>
      <PageHeader>
        <PageHeaderTitle title="Vulnerable clusters" />
        <Alert
          variant={AlertVariant.info}
          isInline
          className="pf-u-mt-md"
          title="Vulnerability information applies to OCP4.8+ version only"
        />
      </PageHeader>
      <Main>
        <ClusterTable />
      </Main>
    </Fragment>
  );
};

export default ClusterListPage;
