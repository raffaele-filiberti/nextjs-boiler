import React, { useCallback, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { motion, useTransform } from 'framer-motion';
import { useResize } from '@flbrt/utils/react/hooks';
import { getTranslate } from '@flbrt/utils/dom';
import ScrollbarContext from '../../context/Scrollbar';

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

const Parallax = ({
  as: As,
  tag,
  target,
  children,
  className,
  position,
  speed,
  style,
  ...props
}) => {
  const inView = useRef(false);
  const prev = useRef(0);
  const ref = useRef();

  const bounds = useRef({
    height: 0,
    top: 0,
    bottom: 0,
    middle: 0,
  });

  const Component = As || motion[tag];

  const motionTag = As ? As.target : tag;

  const { scrollY, limit } = useContext(ScrollbarContext);

  const y = useTransform(
    scrollY,
    (scrollTop) => {
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
          limit: limit.current,
          inView: inView.current,
          prev: prev.current,
        });
      }

      return prev.current;
    },
  );

  const onResize = useCallback(() => {
    const targetEl = target ? document.querySelector(target) : ref.current;
    const targetElBCR = targetEl.getBoundingClientRect();

    const currentY = scrollY.get();

    const { y: targetTranslateY } = getTranslate(targetEl);

    const top = targetElBCR.top + currentY - targetTranslateY;
    const bottom = top + targetElBCR.height;

    bounds.current.top = top;
    bounds.current.bottom = bottom;

    if (position === 'sticky') {
      const { top: elTop, height: elHeight } = ref.current.getBoundingClientRect();
      const elDistance = elTop - top;

      bounds.current.top += window.innerHeight;
      bounds.current.bottom = elTop + targetElBCR.height - elHeight - elDistance;
    }

    bounds.current.middle = (bounds.current.bottom - bounds.current.top) / 2 + bounds.current.top;
  }, []);

  useResize(onResize);

  return (
    <Component
      as={As && motion[motionTag]}
      className={className}
      ref={ref}
      style={{ y, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
};

Parallax.propTypes = {
  as: PropTypes.element,
  tag: PropTypes.string,
  target: PropTypes.string,
  children: childrenPreset.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf([
    'bottom',
    'elementLeft',
    'elementTop',
    'left',
    'normal',
    'right',
    'top',
    'sticky',
  ]),
  speed: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string),
};

Parallax.defaultProps = {
  as: null,
  tag: 'div',
  target: null,
  className: null,
  position: 'normal',
  speed: 0.1,
  style: {},
};

export default Parallax;
