import React, { useCallback, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { motion, useTransform } from 'framer-motion';
import { useResize } from '@flbrt/utils/react/hooks';
import ScrollbarContext from '../../context/Scrollbar';

const parallaxByPosition = {
  top: (bounds, value, speed) => value * -speed,
  elementTop: ({ current: bounds }, value, speed) => {
    const scrollBottom = value + global.innerHeight;
    return (scrollBottom - bounds.top) * -speed;
  },
  bottom: (bounds, value, speed, { current: limit }) => {
    const scrollBottom = value + global.innerHeight;
    return (limit - scrollBottom + global.innerHeight) * -speed;
  },
  sticky: ({ current: bounds }, value) => {
    // value - bounds.top + global.innerHeight
    if (
      value < bounds.top - global.innerHeight
      && value < bounds.top - global.innerHeight / 2
    ) {
      return 0;
    } if (
      value > bounds.bottom
      && value > bounds.bottom + 100
    ) {
      return bounds.bottom - bounds.top + global.innerHeight;
    }

    return 0;
  },
  normal: ({ current: bounds }, value, speed) => {
    const scrollMiddle = value + global.innerHeight / 2;
    return (scrollMiddle - bounds.middle) * -speed;
  },
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
    (value) => parallaxByPosition[position](bounds, value, speed, limit),
  );

  const onResize = useCallback(() => {
    const targetEl = target ? document.querySelector(target) : ref.current;
    const targetElBCR = targetEl.getBoundingClientRect();

    const top = targetElBCR.top + scrollY.get() - y.get();
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
