import React from 'react';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { motion } from 'framer-motion';

const Layout = ({ children }) => (
  <motion.div
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
  </motion.div>
);

Layout.propTypes = { children: childrenPreset.isRequired };
Layout.defaultProps = {};

export default Layout;
