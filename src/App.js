import React, { createContext, useState } from 'react';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { Router } from './Router';
import './App.scss';

export const PersistenceContext = createContext({});

const App = (props) => {
  const [persistentState, setPersistentState] = useState({});

  return (
    <PersistenceContext.Provider
      value={{ persistentState, setPersistentState }}
    >
      <NotificationsPortal />
      <Router childProps={props} />
    </PersistenceContext.Provider>
  );
};

export default App;
