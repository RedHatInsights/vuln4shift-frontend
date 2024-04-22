import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import propTypes from 'prop-types';
import { Bullseye, Spinner } from '@patternfly/react-core';
import { CLUSTER_DETAIL_TABS, CVE_DETAIL_TABS } from './Helpers/constants';

const CveListPage = lazy(() =>
  import(
    /* webpackChunkName: "CveListPage" */ './Components/SmartComponents/CveList/CveListPage'
  )
);

const ClusterListPage = lazy(() =>
  import(
    /* webpackChunkName: "ClusterListPage" */ './Components/SmartComponents/ClusterList/ClusterListPage'
  )
);

const CveDetailPage = lazy(() =>
  import(
    /* webpackChunkName: "CveDetailPage" */ './Components/SmartComponents/CveDetail/CveDetailPage'
  )
);

const ClusterDetailPage = lazy(() =>
  import(
    /* webpackChunkName: "ClusterDetailPage" */ './Components/SmartComponents/ClusterDetail/ClusterDetailPage'
  )
);

const InsightsElement = ({ element: Element }) => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    {Element}
  </Suspense>
);

InsightsElement.propTypes = {
  element: propTypes.element.isRequired,
};

export const Router = () => (
  <Routes>
    <Route
      path="/cves/:cveId/clusters"
      element={
        <InsightsElement
          element={<CveDetailPage activeTab={CVE_DETAIL_TABS.clusters} />}
        />
      }
    />
    <Route
      path="/cves/:cveId/images"
      element={
        <InsightsElement
          element={<CveDetailPage activeTab={CVE_DETAIL_TABS.images} />}
        />
      }
    />
    <Route
      path="/clusters/:clusterId/cves"
      element={
        <InsightsElement
          element={<ClusterDetailPage activeTab={CLUSTER_DETAIL_TABS.cves} />}
        />
      }
    />
    <Route
      path="/clusters/:clusterId/images"
      element={
        <InsightsElement
          element={<ClusterDetailPage activeTab={CLUSTER_DETAIL_TABS.images} />}
        />
      }
    />
    <Route
      path="/cves"
      element={<InsightsElement element={<CveListPage />} />}
    />
    <Route
      path="/clusters"
      element={<InsightsElement element={<ClusterListPage />} />}
    />
    <Route path="*" element={<Navigate to="cves" replace />} />
  </Routes>
);
