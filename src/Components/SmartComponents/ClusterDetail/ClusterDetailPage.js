import React, { useEffect } from 'react';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Text, TextContent, TextVariants } from '@patternfly/react-core';
import ClusterDetailTable from './ClusterDetailTable';
import ClusterDetailPageHeader from './ClusterDetailPageHeader';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const ClusterDetailPage = () => {
  const chrome = useChrome();

  const { error, cluster } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  useEffect(() => {
    cluster.display_name &&
      chrome.updateDocumentTitle(
        `${cluster.display_name} - Clusters - OCP Vulnerability | Red Hat Insights | console.redhat.com`
      );
  }, [cluster.display_name]);

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
