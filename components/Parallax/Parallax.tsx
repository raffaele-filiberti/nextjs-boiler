import React, { useCallback, useContext, useRef } from 'react';
import { m as motion, useTransform } from 'framer-motion';
import { getTranslate } from '@flbrt/utils/dom';
import useResizeObserver from 'use-resize-observer';
import { debounce } from '@flbrt/utils/time';
import styled, { CSSProperties } from 'styled-components';
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
  '--delay': string;
}

interface Props {
  as?: string | React.ComponentType<any>;
  tag?: string;
  target?: string;
  children?: React.ReactNode;
  position?: string;
  speed?: number;
  offset?: number;
  direction?: string;
  style?: CSSCustomProperties;
  [key: string]: unknown;
}

const Wrapper = styled.div`
  will-change: transfrom;
`;

const Parallax = ({
  as: As,
  tag,
  target,
  children,
  position,
  speed,
  offset,
  direction,
  style,
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

  const { scrollY, limit } = useContext(ScrollbarContext);

  const y = useTransform(
    scrollY,
    (scrollTop: number) => {
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

      return prev.current;
    },
  );

  const onResize = debounce(() => {
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
  }, 100);

  const { ref: resizeRef } = useResizeObserver({ onResize });

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      resizeRef(node);
    },
    [resizeRef],
  );

  return (
    <Wrapper
      as={As || motion[tag]}
      forwardedAs={As ? motion[tag] : null}
      ref={setRefs}
      style={{
        x: direction === 'horizontal' ? y : 0,
        y: direction === 'vertical' ? y : 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

Parallax.defaultProps = {
  as: null,
  tag: 'div',
  target: null,
  children: null,
  position: 'normal',
  direction: 'vertical',
  speed: 0.1,
  offset: 0,
  style: null,
};

export default Parallax;
