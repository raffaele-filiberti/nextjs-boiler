import { clamp } from '@flbrt/utils/math';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { isNumber, isString } from '@flbrt/utils/type';
import { animate, MotionValue, Tween, useMotionValue } from 'framer-motion';
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import ResponsiveContext from './Responsive';

interface ScrollbarContextInterface {
  limit: number;
  target: number;
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  mobileScrollY: MotionValue<number>;
  forceScroll: boolean;
  isScrollingTo: boolean;
  isRunning: boolean;
  setIsRunning: (value: boolean) => void;
  scrollTo?: (to: boolean | string, options: {
    duration: Pick<Tween, 'duration'>;
    ease: Pick<Tween, 'ease'>;
  }) => void;
  isNative: boolean;
  el: HTMLElement | null,
}

const ScrollbarContext = React.createContext<ScrollbarContextInterface | Record<string, never>>({});

type Props = {
  children: React.ReactNode
}

export const ScrollbarProvider = ({ children }: Props): JSX.Element => {
  const { isTouch, isAtLeast } = useContext(ResponsiveContext);

  const isAtLeastSm = useMemo(() => isAtLeast('sm'), [isAtLeast]);

  const scrollY = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const mobileScrollY = useMotionValue(0);

  const contextRef = useRef<ScrollbarContextInterface>({
    limit: 0,
    target: 0,
    scrollY,
    scrollYProgress,
    mobileScrollY,
    forceScroll: false,
    isScrollingTo: false,
    isRunning: true,
    setIsRunning: (value) => {
      document.body.style.overflow = value ? null : 'hidden';
      contextRef.current.isRunning = value;
    },
    isNative: isTouch || !isAtLeastSm,
    el: null,
  });

  const scrollTo = useCallback((to, {
    duration = 1,
    ease = [0.65, 0, 0.35, 1],
  } = {
    duration: 1,
    ease: [0.65, 0, 0.35, 1],
  }) => {
    let targetY;

    if (isNumber(to)) {
      targetY = to;
    }

    if (isString(to)) {
      const node = document.querySelector(to);
      if (node) {
        targetY = clamp(node.offsetTop, 0, contextRef.current.limit);
      } else {
        return;
      }
    }
    if (contextRef.current.isNative) {
      contextRef.current.el.scrollTo({ top: to, left: 0, behavior: 'smooth' });
    } else {
      animate(scrollY, targetY, {
        type: 'tween',
        ease,
        duration,
        onPlay: () => {
          contextRef.current.isRunning = false;
          contextRef.current.isScrollingTo = true;
        },
        onUpdate: (value) => {
          scrollYProgress.set(value / contextRef.current.limit);
        },
        onComplete: () => {
          contextRef.current.target = targetY;
          contextRef.current.isRunning = true;
          contextRef.current.isScrollingTo = false;
        },
      });
    }
  }, [scrollY, scrollYProgress]);

  useEffect(() => {
    contextRef.current.scrollTo = scrollTo;
  }, [scrollTo]);

  useEffect(() => {
    contextRef.current.isNative = isTouch || !isAtLeastSm;
  }, [isTouch, isAtLeastSm]);

  return (
    <ScrollbarContext.Provider value={contextRef.current}>
      {children}
    </ScrollbarContext.Provider>
  );
};

ScrollbarProvider.propTypes = { children: childrenPreset.isRequired };

export default ScrollbarContext;
