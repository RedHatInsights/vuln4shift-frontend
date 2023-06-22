const webpack = require('webpack');
const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
});

webpackConfig.module.rules.push({
  resolve: {
    alias: {
      '@redhat-cloud-services/frontend-components/useChrome': resolve(
        __dirname,
        './overrideChrome.js'
      ),
      '../useChrome': resolve(__dirname, './overrideChrome.js'),
    },
  },
});

plugins.push(
  new webpack.DefinePlugin({ insights: { chrome: { isProd: false } } })
);

module.exports = {
  ...webpackConfig,
  plugins,
};
