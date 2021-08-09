import React from 'react';
import { NextSeo } from 'next-seo';

type Props = {
  metadata: {
    title: string,
    description: string,
  } | null
  path?: string,
};

const defaultProps = { path: '/' };

const Seo = ({ metadata, path }: Props): JSX.Element => {
  // Prevent errors if no metadata was set
  if (!metadata) return null;

  return (
    <NextSeo
      title={metadata.title}
      description={metadata.description}
      canonical={process.env.NEXT_PUBLIC_URL + path}
      openGraph={{
        title: metadata.title,
        description: metadata.description,
        url: process.env.NEXT_PUBLIC_URL,
        type: 'website',
        images: [{
          url: `${process.env.NEXT_PUBLIC_URL}/social-image.jpg`,
          width: 1200,
          height: 630,
        }],
      }}
      twitter={{
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />
  );
};

Seo.defaultProps = defaultProps;

export default Seo;
