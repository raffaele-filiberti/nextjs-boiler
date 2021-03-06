/* eslint-disable no-template-curly-in-string */
module.exports = {
  branches: ['master', 'develop'],
  tagFormat: '${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/npm',
      { npmPublish: false },
    ],
    [
      '@semantic-release/github',
      {
        successComment: false,
        failComment: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]',
      },
    ],
  ],
};
