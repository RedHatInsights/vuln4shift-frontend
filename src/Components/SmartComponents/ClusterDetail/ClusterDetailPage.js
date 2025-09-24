import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import ClusterCvesTable from './ClusterCvesTable';
import ClusterDetailPageHeader from './ClusterDetailPageHeader';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import ClusterImagesTable from './ClusterImagesTable';
import { CLUSTER_DETAIL_TABS } from '../../../Helpers/constants';
import TableTabs from '../../PresentationalComponents/TableTabs';

const ClusterDetailPage = ({ activeTab }) => {
  const chrome = useChrome();

  const { error, cluster } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  useEffect(() => {
    cluster.display_name &&
      chrome.updateDocumentTitle(
        `${cluster.display_name} - Clusters - Vulnerability Dashboard | OpenShift`
      );
  }, [cluster.display_name]);

  return (
    <ErrorHandler error={error}>
      <ClusterDetailPageHeader />
      <section className="pf-v6-l-page__main-section pf-v6-c-page__main-section">
        <TableTabs
          activeTab={activeTab}
          tabs={[
            {
              title: 'CVEs',
              path: CLUSTER_DETAIL_TABS.cves,
              Component: ClusterCvesTable,
            },
            {
              title: 'Exposed images',
              path: CLUSTER_DETAIL_TABS.images,
              Component: ClusterImagesTable,
            },
          ]}
        />
      </section>
    </ErrorHandler>
  );
};

ClusterDetailPage.propTypes = {
  activeTab: propTypes.oneOf(Object.values(CLUSTER_DETAIL_TABS)).isRequired,
};

export default ClusterDetailPage;
