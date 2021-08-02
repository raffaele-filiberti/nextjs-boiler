import { GetServerSideProps } from 'next';
import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')

  const fields = [
    {
      loc: process.env.NEXT_PUBLIC_URL || 'https://example.com', // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
    {
      loc: `${process.env.NEXT_PUBLIC_URL || 'https://example.com'}/dynamic-path-2`, // Absolute url
      lastmod: new Date().toISOString(),
      // changefreq
      // priority
    },
  ];

  return getServerSideSitemap(ctx, fields);
};

export default () => {};
