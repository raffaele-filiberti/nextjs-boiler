import { useRef } from 'react';

export default function useWillMount(cb) {
  const isMounted = useRef(false);
  if (!isMounted.current) {
    isMounted.current = true;
    cb();
  }
}
