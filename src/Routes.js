import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Bullseye, Spinner } from '@patternfly/react-core';

const CveListPage = lazy(() =>
  import(
    /* webpackChunkName: "CveListPage" */ './Components/SmartComponents/CveListPage'
  )
);

const ClusterListPage = lazy(() =>
  import(
    /* webpackChunkName: "ClusterListPage" */ './Components/SmartComponents/ClusterListPage'
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
      <Route path="/cves" component={CveListPage} />
      <Route path="/clusters" component={ClusterListPage} />
      <Route>
        <Redirect to="/cves" />
      </Route>
    </Switch>
  </Suspense>
);
