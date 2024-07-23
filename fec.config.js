module.exports = {
  appUrl: '/openshift/insights/vulnerability',
  debug: true,
  useProxy: process.env.PROXY === 'true',
  proxyVerbose: true,
  sassPrefix: '.ocp-vulnerability, .ocpVulnerability',
  interceptChromeConfig: false,
  plugins: [],
  hotReload: process.env.HOT === 'true',
  moduleFederation: {
    exclude: ['react-router-dom'],
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          import: false,
          version: '^6.3.0',
          requiredVersion: '^6.3.0',
        },
      },
    ],
  },
};
