const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
const transpileModules = require('next-transpile-modules')(['@flbrt/styled', '@flbrt/utils']);

module.exports = withPlugins(
  [
    bundleAnalyzer,
    transpileModules,
  ],
  {
    webpack(config, { isServer, dev }) {
      if (!isServer && !dev) {
        Object.assign(config.resolve.alias, {
          react: 'preact/compat',
          'react-dom/test-utils': 'preact/test-utils',
          'react-dom': 'preact/compat',
        });
      }

      return config;
    },
  },
);
