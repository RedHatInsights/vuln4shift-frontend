import React, { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import propTypes from 'prop-types';
import { Bullseye, Spinner } from '@patternfly/react-core';

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
      path="/cves/:cveId"
      element={<InsightsElement element={<CveDetailPage />} />}
    />
    <Route
      path="/clusters/:clusterId"
      element={<InsightsElement element={<ClusterDetailPage />} />}
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
