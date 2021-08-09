import React, {
  useRef, useEffect, useState, useCallback,
} from 'react';
import { useInView } from 'react-intersection-observer';
import { usePresence } from 'framer-motion';
import { useIsomorphicLayoutEffect } from '@flbrt/utils/react/hooks';
import { CustomAnimeParams } from '~/animations';

type AnimateProps = {
  component?: React.FunctionComponent<any> | string;
  initial?: boolean;
  enter?: boolean;
  exit?: boolean;
  triggerInView?: boolean;
  enterParams?: CustomAnimeParams;
  exitParams?: CustomAnimeParams;
  variants?: {
    initial?: (targets: any) => void;
    enter?: (targets: any) => Promise<void>;
    exit?: (targets: any) => Promise<void>;
  }
};

const Animate: React.FC<AnimateProps> = ({
  children,
  component: Component,
  initial,
  enter,
  exit,
  enterParams,
  exitParams,
  variants,
  triggerInView,
  ...props
}) => {
  const [isEntered, setEntered] = useState(false);
  const [isPresent, safeToRemove] = usePresence();
  const ref = useRef<HTMLElement>();
  const [inViewRef, inView] = useInView({
    skip: !triggerInView,
    initialInView: !triggerInView,
  });

  const setRefs = useCallback(
    (node) => {
      ref.current = node;
      inViewRef(node);
    },
    [inViewRef],
  );

  useIsomorphicLayoutEffect(() => {
    if (!isEntered && isPresent) {
      if (initial && variants.initial) {
        variants.initial({ targets: ref.current });
      }

      if (enter && variants.enter && inView) {
        variants.enter({
          targets: ref.current,
          ...enterParams,
        });
        setEntered(true);
      }
    }
  }, [initial, enter, inView]);

  useEffect(() => {
    if (!isPresent) {
      if (exit && variants.exit) {
        variants
          .exit({
            targets: ref.current,
            ...exitParams,
          })
          .then(safeToRemove);
      } else {
        safeToRemove();
      }
    }
  }, [isPresent, exit, inView]);

  if (typeof Component === 'string') {
    return React.createElement(
      Component, {
        ...props,
        ref: setRefs,
      },
      children,
    );
  }

  return (
    <Component
      ref={setRefs}
      {...props}
    >
      {children}
    </Component>
  );
};

Animate.defaultProps = {
  component: 'div',
  initial: true,
  enter: true,
  exit: true,
  triggerInView: false,
  enterParams: null,
  exitParams: null,
};

export default Animate;
