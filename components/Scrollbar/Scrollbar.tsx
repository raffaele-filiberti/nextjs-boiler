import React, {
  useCallback, useContext, useEffect, useRef,
  CSSProperties,
} from 'react';
import { clamp, lerp } from '@flbrt/utils/math';
import { useRaf, useResize, useWheel } from '@flbrt/utils/react/hooks';
import { debounce } from '@flbrt/utils/time';
import anime from 'animejs';
import ScrollbarContext from '~/context/Scrollbar';

type Props = {
  children: React.ReactNode;
  className?:string;
  style?: CSSProperties;
};

const defaultProps = {
  className: null,
  style: null,
};

const Scrollbar = ({ children, className, style }: Props): JSX.Element => {
  const context = useContext(ScrollbarContext);

  const { scrollY, scrollYProgress, isNative } = context;

  const ref = useRef<HTMLDivElement>();

  useResize(debounce(() => {
    const { offsetTop } = ref.current.parentElement!;
    context.limit = ref.current.clientHeight - window.innerHeight + offsetTop;
    context.target = clamp(context.target, 0, context.limit);
  }, 100));

  const onRaf = useCallback(() => {
    if (context.isRunning) {
      let newY = 0;
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

      anime.set(ref.current, { translateY: !isNative ? newY * -1 : null });
    }
  }, [scrollY, scrollYProgress, context]);

  const onWheel = useCallback(({ deltaY }) => {
    if (context.isRunning) {
      context.target += deltaY * -1;
      context.target = clamp(context.target, 0, context.limit);
    }
  }, [context]);

  useEffect(() => {
    context.el = ref.current;

    return () => {
      context.forceScroll = true;
    };
  }, [context]);

  useRaf(onRaf);
  useWheel(onWheel);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
};

Scrollbar.defaultProps = defaultProps;

export default Scrollbar;
