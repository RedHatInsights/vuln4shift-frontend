import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import ClusterCvesTable from './ClusterCvesTable';
import ClusterDetailPageHeader from './ClusterDetailPageHeader';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import ClusterImagesTable from './ClusterImagesTable';
import {
  CLUSTER_DETAIL_TABS,
  EXPOSED_IMAGES_FEATURE_FLAG,
} from '../../../Helpers/constants';
import TableTabs from '../../PresentationalComponents/TableTabs';
import { useFeatureFlag } from '../../../Helpers/hooks';

const ClusterDetailPage = ({ activeTab }) => {
  const chrome = useChrome();

  const areExposedImagesEnabled = useFeatureFlag(EXPOSED_IMAGES_FEATURE_FLAG);

  const { error, cluster } = useSelector(
    ({ ClusterDetailStore }) => ClusterDetailStore
  );

  useEffect(() => {
    cluster.display_name &&
      chrome.updateDocumentTitle(
        `${cluster.display_name} - Clusters - Vulnerability Dashboard | Red Hat Insights | console.redhat.com`
      );
  }, [cluster.display_name]);

  return (
    <ErrorHandler error={error}>
      <ClusterDetailPageHeader />
      <section className="pf-v5-l-page__main-section pf-v5-c-page__main-section">
        <TableTabs
          activeTab={activeTab}
          tabs={[
            {
              title: 'CVEs',
              path: CLUSTER_DETAIL_TABS.cves,
              Component: ClusterCvesTable,
            },
            ...(areExposedImagesEnabled
              ? [
                  {
                    title: 'Exposed images',
                    path: CLUSTER_DETAIL_TABS.images,
                    Component: ClusterImagesTable,
                  },
                ]
              : []),
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
