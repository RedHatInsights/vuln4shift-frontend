import React from 'react';
import propTypes from 'prop-types';
import FlagProvider from '@unleash/proxy-client-react';

export const mockEnableFeatureFlags = (flags) =>
  cy.intercept('GET', '/feature_flags*', {
    statusCode: 200,
    body: {
      toggles: flags.map((flag) => ({
        name: flag,
        enabled: true,
      })),
    },
  });

export const ConfiguredFlagProvider = ({ children }) => (
  <FlagProvider
    config={{
      url: 'http://localhost:8002/feature_flags',
      clientKey: 'example',
      appName: 'example',
    }}
  >
    {children}
  </FlagProvider>
);

ConfiguredFlagProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]).isRequired,
};
