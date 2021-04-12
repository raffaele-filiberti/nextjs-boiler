import React, { useState, useCallback, createContext } from 'react';
import { useResize } from '@flbrt/utils/react/hooks';

interface ResponsiveContextInterface {
  size: { [key: string]: boolean };
  orientation: string;
  isTouch: boolean;
  isMobileLandscape: boolean;
  isAtLeast(breakpoint: string, andOrientation?: string): boolean;
  isAtMost(breakpoint: string, andOrientation?: string): boolean;
}

const ResponsiveContext = createContext<ResponsiveContextInterface | Record<string, never>>({});

const { Provider } = ResponsiveContext;

const getScreen = (breakpoints: { [key: string]: number }) => {
  const sizes = Object.entries(breakpoints).sort(
    ([, aSize], [, bSize]) => bSize - aSize,
  );

  const { innerWidth: width = 1, innerHeight: height = 1 } = global;
  const isTouch = 'ontouchstart' in global;
  const s = sizes.find(([, size]) => size < width)[0];
  const orientation = width > height ? 'landscape' : 'portrait';
  return {
    size: Object.keys(breakpoints).reduce<{ [key: string]: boolean }>(
      (r, b) => ({ ...r, [b]: b === s }),
      {},
    ),
    orientation,
    isTouch,
    isMobileLandscape: orientation === 'landscape' && window.innerHeight <= 480,
    isAtLeast(breakpoint: string, andOrientation: string) {
      return (
        width >= breakpoints[breakpoint]
        && (!andOrientation || andOrientation === orientation)
      );
    },
    isAtMost(breakpoint: string, andOrientation: string) {
      return (
        width <= breakpoints[breakpoint]
        && (!andOrientation || andOrientation === orientation)
      );
    },
  };
};

type Props = {
  breakpoints: { [key: string]: number };
  children: React.ReactNode;
}

export const ResponsiveProvider = ({
  breakpoints,
  children,
}: Props): JSX.Element => {
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

export default ResponsiveContext;

