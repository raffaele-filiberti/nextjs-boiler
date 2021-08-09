import React, {
  CSSProperties, useCallback, useContext, useRef,
} from 'react';
import { getTranslate } from '@flbrt/utils/dom';
import useResizeObserver from 'use-resize-observer';
import { debounce } from '@flbrt/utils/time';
import anime from 'animejs';
import ScrollbarContext from '~/context/Scrollbar';

const parallaxByPosition = {
  top: ({ scrollTop, speed }) => scrollTop * -speed,
  elementTop: ({ scrollBottom, speed, bounds }) => (scrollBottom - bounds.top) * -speed,
  bottom: ({ scrollBottom, speed, limit }) => (limit - scrollBottom + global.innerHeight) * -speed,
  sticky: ({
    scrollTop,
    bounds,
    inView,
    prev,
  }) => {
    if (inView) {
      return scrollTop - bounds.top + global.innerHeight;
    }
    if (
      scrollTop < bounds.top - global.innerHeight
      && scrollTop < bounds.top - global.innerHeight / 2
    ) {
      return 0;
    }
    if (
      scrollTop > bounds.bottom
      && scrollTop > bounds.bottom + 100
    ) {
      return bounds.bottom - bounds.top + global.innerHeight;
    }

    return prev;
  },
  normal: ({ scrollMiddle, speed, bounds }) => (scrollMiddle - bounds.middle) * -speed,
};

export interface CSSCustomProperties extends CSSProperties {
  '--delay'?: string;
}

interface Props {
  target?: string;
  children?: React.ReactNode;
  position?: string;
  speed?: number;
  offset?: number;
  direction?: string;
  className?: string;
  style?: CSSCustomProperties;
  [key: string]: unknown;
}

const Parallax = ({
  target,
  children,
  position,
  speed,
  offset,
  direction,
  style,
  className,
  ...props
}: Props): JSX.Element => {
  const inView = useRef<boolean>(false);
  const prev = useRef<number>(0);
  const ref = useRef<HTMLDivElement>();

  const bounds = useRef({
    height: 0,
    top: 0,
    bottom: 0,
    middle: 0,
  });

  const { scrollY, limit, isNative } = useContext(ScrollbarContext);

  const onScrollYChange = useCallback((scrollTop = 0) => {
    const scrollBottom = scrollTop + global.innerHeight;
    const scrollMiddle = scrollTop + global.innerHeight / 2;

    const { current: { top, bottom } } = bounds;

    if (!inView.current) {
      if (scrollBottom >= top && scrollTop < bottom) {
        inView.current = true;
      }
    } else if (scrollBottom < top || scrollTop > bottom) {
      inView.current = false;
    }

    if (position === 'sticky' || inView.current) {
      prev.current = parallaxByPosition[position]({
        scrollBottom,
        scrollMiddle,
        scrollTop,
        speed,
        bounds: bounds.current,
        limit,
        inView: inView.current,
        prev: prev.current,
      });
    }

    anime.set(ref.current, {
      translateX: direction === 'horizontal' ? prev.current : 0,
      translateY: direction === 'vertical' ? prev.current : 0,
    });
  }, []);

  const onResize = debounce(() => {
    if (isNative) return;
    const targetEl = target ? document.querySelector<HTMLElement>(target) : ref.current;
    const targetElBCR = targetEl.getBoundingClientRect();

    const currentY = scrollY.get();

    const { y: targetTranslateY } = getTranslate(targetEl);

    const relativeOffset = (offset * global.innerHeight) / 100;

    const top = targetElBCR.top + currentY - targetTranslateY + relativeOffset;
    const bottom = top + targetElBCR.height - relativeOffset;

    bounds.current.top = top;
    bounds.current.bottom = bottom;

    if (position === 'sticky') {
      const { top: elTop, height: elHeight } = ref.current.getBoundingClientRect();
      const elDistance = elTop - top;

      bounds.current.top += window.innerHeight;
      bounds.current.bottom = elTop + targetElBCR.height - elHeight - elDistance;
    }

    const {
      top: $top,
      bottom: $bottom,
    } = bounds.current;

    bounds.current.middle = ($bottom - $top) / 2 + $top;

    onScrollYChange(scrollY.get());
  }, 100);

  const { ref: resizeRef } = useResizeObserver({ onResize });

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      resizeRef(node);
    },
    [resizeRef],
  );

  if (isNative) {
    return (
      <div
        style={style}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }

  scrollY.onChange(onScrollYChange);

  return (
    <div
      ref={setRefs}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

Parallax.defaultProps = {
  target: null,
  children: null,
  className: null,
  position: 'normal',
  direction: 'vertical',
  speed: 0.1,
  offset: 0,
  style: null,
};

export default Parallax;
