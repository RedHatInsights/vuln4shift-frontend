const { defineConfig } = require('cypress');
const webpackConfig = require('./config/cypress.webpack.config.js');
const codeCoverageTask = require('@cypress/code-coverage/task');
const {
  initPlugin,
} = require('@frsource/cypress-plugin-visual-regression-diff/plugins');

module.exports = defineConfig({
  env: {
    pluginVisualRegressionUpdateImages: true,
    pluginVisualRegressionMaxDiffThreshold: 0.05,
  },
  viewportWidth: 1000,
  viewportHeight: 660,
  video: false,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    specPattern: 'src/**/*.cy.{js,ts,jsx,tsx}',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      initPlugin(on, config);
      return config;
    },
  },
});
