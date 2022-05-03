import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Routes } from './Routes';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import './App.scss';

const App = (props) => {
  const history = useHistory();

  useEffect(() => {
    insights.chrome.init();

    insights.chrome.identifyApp('ocp-vulnerability');

    const unregister = insights.chrome.on('APP_NAVIGATION', (event) =>
      history.push(`/${event.navId}`)
    );

    return () => {
      unregister();
    };
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <Routes childProps={props} />
    </Fragment>
  );
};

export default App;
