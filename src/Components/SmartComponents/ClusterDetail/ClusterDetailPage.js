import React from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import ClusterDetailTable from './ClusterDetailTable';
import ClusterDetailPageHeader from './ClusterDetailPageHeader';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';

const ClusterDetailPage = () => {
  const { error, cluster } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  cluster.display_name &&
    insights.chrome.updateDocumentTitle(
      `${cluster.display_name} - Clusters - OCP Vulnerability | Red Hat Insights | console.redhat.com`
    );

  return (
    <ErrorHandler error={error}>
      <ClusterDetailPageHeader />
      <Main>
        <TextContent>
          <Text component={TextVariants.h2} className="pf-u-mb-md">
            CVEs
          </Text>
        </TextContent>
        <ClusterDetailTable />
      </Main>
    </ErrorHandler>
  );
};

export default ClusterDetailPage;
