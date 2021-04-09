import { useRef } from 'react';

export default function useWillMount(cb: () => void): void {
  const isMounted = useRef(false);
  if (!isMounted.current) {
    isMounted.current = true;
    cb();
  }
}
