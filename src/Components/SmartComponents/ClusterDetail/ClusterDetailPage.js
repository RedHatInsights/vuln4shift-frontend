import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { Tab, TabTitleText, Tabs } from '@patternfly/react-core';
import ClusterCveTable from './ClusterCveTable';
import ClusterDetailPageHeader from './ClusterDetailPageHeader';
import { useSelector } from 'react-redux';
import ErrorHandler from '../../PresentationalComponents/ErrorHandler';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import ClusterImagesTable from './ClusterImagesTable';
import { Link, useLocation } from 'react-router-dom';
import { urlChangeTab } from '../../../Helpers/miscHelper';
import { CLUSTER_DETAIL_TABS } from '../../../Helpers/constants';

const ClusterDetailPage = ({ activeTab }) => {
  const chrome = useChrome();
  const location = useLocation();

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
      <Main>
        {activeTab == CLUSTER_DETAIL_TABS.cves ? (
          <Tabs className="pf-m-light pf-v5-c-table" activeKey={0}>
            <Tab eventKey={0} title={<TabTitleText>CVEs</TabTitleText>}>
              <ClusterCveTable />
            </Tab>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={urlChangeTab(location.pathname, CLUSTER_DETAIL_TABS.images)}
            >
              <Tab
                eventKey={1}
                title={<TabTitleText>Exposed images</TabTitleText>}
              />
            </Link>
          </Tabs>
        ) : (
          <Tabs className="pf-m-light pf-v5-c-table" activeKey={1}>
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={urlChangeTab(location.pathname, CLUSTER_DETAIL_TABS.cves)}
            >
              <Tab eventKey={0} title={<TabTitleText>CVEs</TabTitleText>} />
            </Link>
            <Tab
              eventKey={1}
              title={<TabTitleText>Exposed images</TabTitleText>}
            >
              <ClusterImagesTable />
            </Tab>
          </Tabs>
        )}
      </Main>
    </ErrorHandler>
  );
};

ClusterDetailPage.propTypes = {
  activeTab: propTypes.oneOf(Object.values(CLUSTER_DETAIL_TABS)),
};

export default ClusterDetailPage;
