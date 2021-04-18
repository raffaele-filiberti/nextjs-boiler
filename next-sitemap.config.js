const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://example.com';
module.exports = {
  siteUrl,
  generateRobotsTxt: process.env.GO_LIVE === 'true',
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
};
