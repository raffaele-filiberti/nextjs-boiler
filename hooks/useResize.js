import { addEvent } from '@flbrt/utils/dom';
import { createListener } from '@flbrt/utils/factory';
import { useEffect } from 'react';

const resizeMap = new Map();

export const getResize = () => {
  const resize = resizeMap.get('main');

  if (!resize) {
    const resizeInstance = createListener(true);
    resizeMap.set('main', resizeInstance);

    return resizeInstance;
  }

  return resize;
};

export default function useResize(fn) {
  useEffect(() => {
    const resize = getResize();
    return resize.add(fn);
  }, [fn]);

  useEffect(() => {
    const resize = getResize();
    return addEvent(window, 'resize', resize.call);
  }, []);
}

