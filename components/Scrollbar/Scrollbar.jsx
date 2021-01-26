import React, { useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import styled from 'styled-components';
import useResizeObserver from 'use-resize-observer';
import { clamp, lerp } from '@flbrt/utils/math';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { useRaf, useWheel } from '@flbrt/utils/react/hooks';
import { ScrollbarProvider } from '../../context/Scrollbar';

const Progress = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;

  & > div {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: top;
    background-color:#fff;
  }
`;

const Scrollbar = ({ children }) => {
  const ref = useRef();
  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const y = useTransform(scrollY, (value) => value * -1);
  const { ref: resizeRef, height = 1 } = useResizeObserver();

  const target = useRef(0);
  const bounds = useRef(0);

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      resizeRef(node);
    },
    [resizeRef],
  );

  useEffect(() => {
    bounds.current = height - window.innerHeight;
  }, [height]);

  const onRaf = useCallback(() => {
    const last = scrollY.get();
    const newY = lerp(last, target.current, 0.1);
    scrollY.set(newY);
    scrollYProgress.set(newY / bounds.current);
  }, []);

  const onWheel = useCallback(({ deltaY }) => {
    target.current += deltaY * -1;
    target.current = clamp(target.current, 0, bounds.current);
  }, []);

  useRaf(onRaf);
  useWheel(onWheel);

  return (
    <ScrollbarProvider value={{ scrollY, scrollYProgress }}>
      <Progress>
        <motion.div style={{ scaleY: scrollYProgress }} />
      </Progress>
      <motion.div
        ref={setRefs}
        style={{ y }}
      >
        {children}
      </motion.div>
    </ScrollbarProvider>
  );
};

Scrollbar.propTypes = { children: childrenPreset.isRequired };

export default Scrollbar;
