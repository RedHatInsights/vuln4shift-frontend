import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

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

export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Switch>
      <Route path="/cves/:cveId" component={CveDetailPage} />
      <Route path="/clusters/:clusterId" component={ClusterDetailPage} />
      <Route path="/cves" component={CveListPage} />
      <Route path="/clusters" component={ClusterListPage} />
      <Route>
        <Redirect to="/cves" />
      </Route>
    </Switch>
  </Suspense>
);
