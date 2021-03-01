import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { useMotionValue } from 'framer-motion';
import React, { useRef } from 'react';

const ScrollbarContext = React.createContext({});

export const ScrollbarProvider = ({ children }) => {
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  const contextRef = useRef({
    limit: 0,
    scrollY,
    scrollYProgress,
    forceScroll: false,
  });

  return (
    <ScrollbarContext.Provider value={contextRef.current}>
      {children}
    </ScrollbarContext.Provider>
  );
};

ScrollbarProvider.propTypes = { children: childrenPreset.isRequired };

export default ScrollbarContext;
