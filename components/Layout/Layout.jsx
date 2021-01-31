import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { motion } from 'framer-motion';
import { Spacer } from '@flbrt/styled';
import Scrollbar from '../Scrollbar/Scrollbar';

const Layout = ({ seo: { title, description, share }, children }) => (
  <Scrollbar>
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
      />
      <title>{title}</title>
      <meta
        name="title"
        content={title}
      />
      <meta
        name="description"
        content={description}
      />

      <meta
        property="og:type"
        content="website"
      />
      <meta
        property="og:url"
        content="https://metatags.io/"
      />
      <meta
        property="og:title"
        content={title}
      />
      <meta
        property="og:description"
        content={description}
      />
      <meta
        property="og:image"
        content={share}
      />

      <meta
        property="twitter:card"
        content="summary_large_image"
      />
      <meta
        property="twitter:url"
        content="https://metatags.io/"
      />
      <meta
        property="twitter:title"
        content={title}
      />
      <meta
        property="twitter:description"
        content={description}
      />
      <meta
        property="twitter:image"
        content={share}
      />
    </Head>
    <Spacer
      as={motion.div}
      root={['n', 'containerX', 'containerY', 'containerX']}
      exit="exit"
      animate="animate"
      initial="initial"
      variants={{
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
        exit: {
          opacity: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
    >
      {children}
    </Spacer>
  </Scrollbar>
);

Layout.propTypes = {
  children: childrenPreset.isRequired,
  seo: PropTypes.objectOf(PropTypes.string),
};
Layout.defaultProps = {
  seo: {
    title: 'FLBRT | Boilerplate',
    description: null,
    share: null,
  },
};

export default Layout;
