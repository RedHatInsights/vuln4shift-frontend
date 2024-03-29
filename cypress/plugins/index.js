/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const {
  initPlugin,
} = require('@frsource/cypress-plugin-visual-regression-diff/plugins');

module.exports = (on, config) => {
  initPlugin(on, config);

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  if (config.testingType === 'component') {
    const { startDevServer } = require('@cypress/webpack-dev-server');

    // Your project's Webpack configuration
    const webpackConfig = require('../../config/cypress.webpack.config');

    on('dev-server:start', (options) =>
      startDevServer({ options, webpackConfig })
    );
  }
  require('@cypress/code-coverage/task')(on, config);
  on(
    'file:preprocessor',
    require('@cypress/code-coverage/use-browserify-istanbul')
  );
  return config;
};
