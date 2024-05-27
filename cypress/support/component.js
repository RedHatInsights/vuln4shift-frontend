import './commands';
import '@cypress/code-coverage/support';

import React from 'react';
import '@patternfly/patternfly/patternfly.scss';
import { mount } from 'cypress/react';
import { ConfiguredFlagProvider } from '../utils/featureFlags';
import { Provider } from 'react-redux';
import { init } from '../../src/Store/ReducerRegistry';

const mountWithProviders = (component, options) =>
  mount(
    <ConfiguredFlagProvider>
      <Provider store={init().getStore()}>{component}</Provider>
    </ConfiguredFlagProvider>,
    options
  );

Cypress.Commands.add('mountWithProviders', mountWithProviders);
