import React, { Fragment } from 'react';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { Router } from './Router';
import './App.scss';

const App = (props) => {
  return (
    <Fragment>
      <NotificationsPortal />
      <Router childProps={props} />
    </Fragment>
  );
};

export default App;
