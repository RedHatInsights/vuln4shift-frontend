import React, { Fragment } from 'react';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import './App.scss';
import { Router } from './Router';

const App = (props) => {
  return (
    <Fragment>
      <NotificationsPortal />
      <Router childProps={props} />
    </Fragment>
  );
};

export default App;
