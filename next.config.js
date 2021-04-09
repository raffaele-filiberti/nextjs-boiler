const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
const transpileModules = require('next-transpile-modules')(['@flbrt/styled', '@flbrt/utils']);

module.exports = withPlugins(
  [
    bundleAnalyzer,
    transpileModules,
  ],
  { future: { webpack5: true } },
);
