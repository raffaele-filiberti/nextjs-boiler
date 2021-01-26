import { useEffect } from 'react';
import { createWheel } from '@flbrt/utils/events';

const wheelMap = new Map();

export const getWheel = (opts) => {
  const wheel = wheelMap.get('main');

  if (!wheel) {
    const wheelInstance = createWheel(opts);
    wheelMap.set('main', wheelInstance);

    return wheelInstance;
  }

  return wheel;
};
// TODO: check change options
export default function useWheel(fn, opts) {
  useEffect(() => {
    const resize = getWheel(opts);
    return resize.add(fn);
  }, [fn]);
}
