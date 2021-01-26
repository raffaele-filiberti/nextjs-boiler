import { createListener } from '@flbrt/utils/factory';
import { useEffect, useRef } from 'react';

const rafMap = new Map();

export const getRaf = () => {
  const raf = rafMap.get('main');

  if (!raf) {
    const rafInstance = createListener();
    rafMap.set('main', rafInstance);

    return rafInstance;
  }

  return raf;
};

export default function useRaf(fn) {
  const rafId = useRef();

  useEffect(() => {
    const raf = getRaf();
    return raf.add(fn);
  }, [fn]);

  useEffect(() => {
    const raf = getRaf();

    const onRaf = () => {
      raf.call();
      rafId.current = global.requestAnimationFrame(onRaf);
    };

    onRaf();

    return () => global.cancelAnimationFrame(rafId.current);
  }, []);
}

