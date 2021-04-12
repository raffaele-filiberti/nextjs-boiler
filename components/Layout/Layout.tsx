import React from 'react';
import { m as motion } from 'framer-motion';
import { Spacer } from '@flbrt/styled';
import Scrollbar from '~/components/Scrollbar';

const variants = {
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
};

type Props = {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => (
  <Scrollbar>
    <Spacer
      as={motion.div}
      root={['containerY', 'containerX']}
      exit="exit"
      animate="animate"
      initial="initial"
      variants={variants}
    >
      {children}
    </Spacer>
  </Scrollbar>
);

export default Layout;
