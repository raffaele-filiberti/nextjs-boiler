import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { clamp, lerp } from '@flbrt/utils/math';
import { useRaf, useResize, useWheel } from '@flbrt/utils/react/hooks';
import { debounce } from '@flbrt/utils/time';
import { addEvent } from '@flbrt/utils/dom';
import ScrollbarContext from '~/context/Scrollbar';

type Props = {
  as?: string | React.ComponentType<any>;
  children: React.ReactNode;
}

const defaultProps = { as: motion.div };

const Scrollbar = ({ as: As, children }: Props): JSX.Element => {
  const context = useContext(ScrollbarContext);

  const { scrollY, scrollYProgress, isNative } = context;

  const y = useTransform(scrollY, (value) => value * -1);

  const ref = useRef<HTMLDivElement>();

  useResize(debounce(() => {
    const { offsetTop } = ref.current.parentElement;
    context.limit = ref.current.clientHeight - window.innerHeight + offsetTop;
    context.target = clamp(context.target, 0, context.limit);
  }, 100));

  const onRaf = useCallback(() => {
    if (context.isRunning) {
      let newY;
      if (context.forceScroll) {
        context.forceScroll = false;
        newY = 0;
        context.target = 0;
      } else {
        const last = scrollY.get();
        newY = lerp(last, context.target, 0.1);
        if (newY < 0.01) newY = 0;
      }
      scrollY.set(newY);
      scrollYProgress.set(newY / context.limit);
    }
  }, [scrollY, scrollYProgress, context]);

  const onWheel = useCallback(({ deltaY }) => {
    if (context.isRunning) {
      context.target += deltaY * -1;
      context.target = clamp(context.target, 0, context.limit);
    }
  }, [context]);

  useRaf(onRaf);
  useWheel(onWheel);

  useEffect(() => {
    context.el = ref.current;

    const off = addEvent(ref.current, 'scroll', () => {
      context.isRunning = false;
      scrollY.set(ref.current.scrollTop);
    });

    return off;
  }, [scrollY, context]);

  useEffect(() => () => {
    context.forceScroll = true;
  }, [context]);

  return (
    <As
      as={As ? motion.div : null}
      ref={ref}
      style={{ y: !isNative ? y : null }}
    >
      {children}
    </As>
  );
};

Scrollbar.defaultProps = defaultProps;

export default Scrollbar;
