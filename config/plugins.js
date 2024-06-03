const { resolve } = require('path');
const fedModulePlugin = require('@redhat-cloud-services/frontend-components-config/federated-modules');

const plugins = [
  fedModulePlugin({
    root: resolve(__dirname, '../'),
    shared: [
      {
        'react-router-dom': { singleton: true, requiredVersion: '*' },
      },
    ],
  }),
];

module.exports = plugins;
