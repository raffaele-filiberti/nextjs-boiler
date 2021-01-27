import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import useResizeObserver from 'use-resize-observer';
import { clamp, lerp } from '@flbrt/utils/math';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { useRaf, useWheel } from '@flbrt/utils/react/hooks';
import { isNumber, isString } from '@flbrt/utils/type';
import { ScrollbarProvider } from '../../context/Scrollbar';

const Scrollbar = ({
  as: As,
  children,
}) => {
  const ref = useRef();
  const { ref: resizeRef, height = 1 } = useResizeObserver();

  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  const y = useTransform(scrollY, (value) => value * -1);

  const isRunning = useRef(true);

  const target = useRef(0);
  const limit = useRef(0);

  const Component = As || motion.div;

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      resizeRef(node);
    },
    [resizeRef],
  );

  useEffect(() => {
    limit.current = height - window.innerHeight;
    target.current = clamp(target.current, 0, limit.current);
  }, [height]);

  const onRaf = useCallback(() => {
    if (isRunning.current) {
      const last = scrollY.get();
      const newY = lerp(last, target.current, 0.1);
      scrollY.set(newY);
      scrollYProgress.set(newY / limit.current);
    }
  }, []);

  const onWheel = useCallback(({ deltaY }) => {
    target.current += deltaY * -1;
    target.current = clamp(target.current, 0, limit.current);
  }, []);

  const scrollTo = useCallback((to) => {
    isRunning.current = false;

    let targetY;

    if (isNumber(to)) {
      targetY = to;
    }

    if (isString(to)) {
      const node = document.getElementById(to);
      targetY = node.offsetTop;
    }

    animate(scrollY, targetY, {
      type: 'tween',
      ease: [0.33, 1, 0.68, 1],
      duration: 1,
      onUpdate: (value) => {
        scrollYProgress.set(value / limit.current);
      },
      onComplete: () => {
        target.current = targetY;
        isRunning.current = true;
      },
    });
  }, []);

  useRaf(onRaf);
  useWheel(onWheel);

  return (
    <ScrollbarProvider value={{ limit, scrollY, scrollYProgress, scrollTo }}>
      <Component
        as={As && motion.div}
        ref={setRefs}
        style={{ y }}
      >
        {children}
      </Component>
    </ScrollbarProvider>
  );
};

Scrollbar.propTypes = {
  as: PropTypes.element,
  children: childrenPreset.isRequired,
};
Scrollbar.defaultProps = { as: null };

export default Scrollbar;
