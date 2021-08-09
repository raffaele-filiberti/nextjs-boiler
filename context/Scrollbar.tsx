import { clamp } from '@flbrt/utils/math';
import { isNumber, isString } from '@flbrt/utils/type';
import anime from 'animejs';
import { MotionValue, useMotionValue } from 'framer-motion';
import React, { useContext, useEffect, useRef } from 'react';
import ResponsiveContext from './Responsive';

interface ScrollbarContextInterface {
  limit: number;
  target: number;
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  mobileScrollY: MotionValue<number>;
  forceScroll: boolean;
  isRunning: boolean;
  setIsRunning: (value: boolean) => void;
  scrollTo: (to: number | string, options?: {
    duration: number;
    ease: string;
  }) => void;
  isNative: boolean;
  el: HTMLElement | null,
}

const ScrollbarContext = React.createContext<ScrollbarContextInterface | Record<string, never>>({});

type Props = {
  children: React.ReactNode
};

export const ScrollbarProvider = ({ children }: Props): JSX.Element => {
  const { isTouch, isAtLeast } = useContext(ResponsiveContext);

  const isAtLeastSm = isAtLeast('sm');

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
    isRunning: true,
    setIsRunning: (value) => {
      document.body.style.overflow = value ? 'inherit' : 'hidden';
      contextRef.current.isRunning = value;
    },
    isNative: isTouch || !isAtLeastSm,
    el: null,
    scrollTo: (to, {
      duration = 1000,
      ease = 'easeOutExpo',
    } = {
      duration: 1000,
      ease: 'easeOutExpo',
    }) => {
      const { limit, isNative, el } = contextRef.current;

      let targetY = 0;

      if (isNumber(to)) {
        targetY = to;
      }

      if (isString(to)) {
        const node = document.querySelector<HTMLElement>(to);
        if (node) {
          targetY = clamp(node.offsetTop, 0, limit);
        } else {
          return;
        }
      }

      if (isNative) {
        const scrollElement = window.document.scrollingElement
          || window.document.body
          || window.document.documentElement;

        anime({
          targets: scrollElement,
          scrollTop: targetY,
          easing: ease,
          duration,
        });
      } else {
        const targets = { value: scrollY.get() };
        anime({
          targets,
          value: targetY,
          easing: ease,
          duration,
          begin: () => {
            contextRef.current.isRunning = false;
          },
          update: () => {
            scrollY.set(targets.value);
            scrollYProgress.set(targets.value / limit);
            anime.set(el, { translateY: !isNative ? targets.value * -1 : null });
          },
          complete: () => {
            contextRef.current.target = targetY;
            contextRef.current.isRunning = true;
          },
        });
      }
    },
  });

  useEffect(() => {
    contextRef.current.isNative = isTouch || !isAtLeastSm;
  }, [isTouch, isAtLeastSm]);

  return (
    <ScrollbarContext.Provider value={contextRef.current}>
      {children}
    </ScrollbarContext.Provider>
  );
};

export default ScrollbarContext;
