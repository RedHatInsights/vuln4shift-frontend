import React, { createContext, useState } from 'react';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';
import { Router } from './Router';
import './App.scss';

export const PersistenceContext = createContext({});

const App = (props) => {
  const [persistentState, setPersistentState] = useState({});

  return (
    <NotificationsProvider>
      <PersistenceContext.Provider
        value={{ persistentState, setPersistentState }}
      >
        <Router childProps={props} />
      </PersistenceContext.Provider>
    </NotificationsProvider>
  );
};

export default App;
