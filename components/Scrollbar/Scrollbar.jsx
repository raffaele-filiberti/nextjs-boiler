import React, { useCallback, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { animate, motion, useTransform } from 'framer-motion';
import useResizeObserver from 'use-resize-observer';
import { clamp, lerp } from '@flbrt/utils/math';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { useRaf, useWheel } from '@flbrt/utils/react/hooks';
import { isNumber, isString } from '@flbrt/utils/type';
import { debounce } from '@flbrt/utils/time';
import ScrollbarContext from '../../context/Scrollbar';
import useWillMount from '../../hooks/useWillMount';

const Scrollbar = ({
  as: As,
  children,
}) => {
  const Component = As || motion.div;

  const context = useContext(ScrollbarContext);
  const contextRef = useRef();
  const { scrollY, scrollYProgress } = context;

  const y = useTransform(scrollY, (value) => value * -1);

  const target = useRef(0);

  const isRunning = useRef(true);

  const ref = useRef();

  const { ref: resizeRef } = useResizeObserver({
    onResize: debounce(({ height }) => {
      context.limit = height - window.innerHeight;
      target.current = clamp(target.current, 0, context.limit);
    }, 100),
  });

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      resizeRef(node);
    },
    [resizeRef],
  );

  const onRaf = useCallback(() => {
    if (isRunning.current) {
      let newY;
      if (context.forceScroll) {
        context.forceScroll = false;
        newY = 0;
      } else {
        const last = scrollY.get();
        newY = lerp(last, target.current, 0.1);
        if (newY < 0.01) newY = 0;
      }
      scrollY.set(newY);
      scrollYProgress.set(newY / context.limit);
    }
  }, [scrollY, scrollYProgress]);

  const onWheel = useCallback(({ deltaY }) => {
    target.current += deltaY * -1;
    target.current = clamp(target.current, 0, context.limit);
  }, []);

  const scrollTo = useCallback((to) => {
    let targetY;

    if (isNumber(to)) {
      targetY = to;
    }

    if (isString(to)) {
      const node = document.querySelector(to);
      if (node) {
        targetY = clamp(node.offsetTop, 0, context.limit);
      } else {
        return;
      }
    }

    animate(scrollY, targetY, {
      type: 'tween',
      ease: [0.33, 1, 0.68, 1],
      duration: 1,
      onPlay: () => {
        isRunning.current = false;
      },
      onUpdate: (value) => {
        scrollYProgress.set(value / context.limit);
      },
      onComplete: () => {
        target.current = targetY;
        isRunning.current = true;
      },
    });
  }, [scrollY, scrollYProgress]);

  useRaf(onRaf);
  useWheel(onWheel);

  useWillMount(() => {
    contextRef.current = {
      scrollTo,
      ...context,
    };
  });

  useEffect(() => () => {
    context.forceScroll = true;
  });

  return (
    <ScrollbarContext.Provider value={contextRef.current}>
      <Component
        as={As && motion.div}
        ref={setRefs}
        style={{ y }}
      >
        {children}
      </Component>
    </ScrollbarContext.Provider>
  );
};

Scrollbar.propTypes = {
  as: PropTypes.element,
  children: childrenPreset.isRequired,
};
Scrollbar.defaultProps = { as: null };

export default Scrollbar;
