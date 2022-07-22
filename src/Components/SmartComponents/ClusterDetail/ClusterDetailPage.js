import React, { Fragment } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import ClusterDetailTable from './ClusterDetailTable';
import ClusterDetailPageHeader from './ClusterDetailPageHeader';

const ClusterDetailPage = () => {
  return (
    <Fragment>
      <ClusterDetailPageHeader />
      <Main>
        <TextContent>
          <Text component={TextVariants.h2} className="pf-u-mb-md">
            CVEs
          </Text>
        </TextContent>
        <ClusterDetailTable />
      </Main>
    </Fragment>
  );
};

export default ClusterDetailPage;
