import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { childrenPreset } from '@flbrt/utils/react/prop-types';
import { useResize } from '@flbrt/utils/react/hooks';

const ResponsiveContext = React.createContext({});

const { Provider } = ResponsiveContext;

const getScreen = (breakpoints) => {
  const sizes = Object.entries(breakpoints).sort(
    ([, aSize], [, bSize]) => bSize - aSize,
  );

  const { innerWidth: width = 1, innerHeight: height = 1 } = global;
  const isTouch = 'ontouchstart' in global;
  const s = sizes.find(([, size]) => size < width)[0];
  const orientation = width > height ? 'landscape' : 'portrait';
  return {
    size: Object.keys(breakpoints).reduce(
      (r, b) => ({ ...r, [b]: b === s }),
      {},
    ),
    orientation,
    isTouch,
    isMobileLandscape: orientation === 'landscape' && window.innerHeight <= 480,
    isAtLeast(breakpoint, andOrientation) {
      return (
        width >= breakpoints[breakpoint]
        && (!andOrientation || andOrientation === orientation)
      );
    },
    isAtMost(breakpoint, andOrientation) {
      return (
        width <= breakpoints[breakpoint]
        && (!andOrientation || andOrientation === orientation)
      );
    },
  };
};

export const ResponsiveProvider = ({
  breakpoints,
  children,
}) => {
  const [screen, setScreen] = useState(getScreen(breakpoints));

  const onResize = useCallback(() => {
    const current = getScreen(breakpoints);

    if (
      JSON.stringify(current.size) !== JSON.stringify(screen.size)
      || current.orientation !== screen.orientation
    ) {
      setScreen(current);
    }
  }, [breakpoints, screen]);

  useResize(onResize);

  return <Provider value={screen}>{children}</Provider>;
};

ResponsiveProvider.propTypes = {
  children: childrenPreset.isRequired,
  breakpoints: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default ResponsiveContext;

