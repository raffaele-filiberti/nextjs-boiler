const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });
const transpileModules = require('next-transpile-modules')(['@flbrt/styled', '@flbrt/utils']);

module.exports = withPlugins(
  [
    bundleAnalyzer,
    transpileModules,
  ],
  {
    eslint: {
      // Warning: Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
  },
);
