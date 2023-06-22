import React from 'react';
import { Provider } from 'react-redux';
import { init } from './Store/ReducerRegistry';
import App from './App';

const AppEntry = () => (
  <Provider store={init().getStore()}>
    <App />
  </Provider>
);

export default AppEntry;
