const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = {
  appUrl: '/openshift/insights/vulnerability',
  debug: true,
  useProxy: process.env.PROXY === 'true',
  proxyVerbose: true,
  sassPrefix: '.ocp-vulnerability, .ocpVulnerability',
  interceptChromeConfig: false,
  devtool: 'hidden-source-map',
  plugins: [
    // Put the Sentry Webpack plugin after all other plugins
    ...(process.env.ENABLE_SENTRY
      ? [
          sentryWebpackPlugin({
            ...(process.env.SENTRY_AUTH_TOKEN && {
              authToken: process.env.SENTRY_AUTH_TOKEN,
            }),
            org: 'red-hat-it',
            project: 'ocp-vulnerability',
            moduleMetadata: ({ release }) => ({
              dsn: `https://e88ee1ea3dcfd65015894853d75edf1c@o490301.ingest.us.sentry.io/4508683273830400`,
              org: 'red-hat-it',
              project: 'ocp-vulnerability',
              release,
            }),
          }),
        ]
      : []),
  ],
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
