import { useRouter } from 'next/router';
import React, { useCallback, useReducer, useEffect } from 'react';

interface NavContextInterface {
  isLoading: boolean;
  isFirstAnimation: boolean;
  prevRoute: string;
  setLoaded?: () => void;
  setFirstAnimation?: () => void;
}

const NavContext = React.createContext<NavContextInterface>({
  isLoading: true,
  isFirstAnimation: true,
  prevRoute: null,
});

const { Provider } = NavContext;

const initialState = {
  isLoading: true,
  isFirstAnimation: true,
  prevRoute: null,
};

type ACTIONTYPE =
  | { type: 'loaded' }
  | { type: 'set-first-animation' }
  | { type: 'set-prev-route', payload: string }
  | { type: 'set-work-grid', payload: number };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case 'loaded':
      return { ...state, isLoading: false };
    case 'set-first-animation':
      return { ...state, isFirstAnimation: false };
    case 'set-prev-route':
      return { ...state, prevRoute: action.payload };
    default:
      throw new Error();
  }
}

export const NavProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const router = useRouter();

  const setLoaded = useCallback(() => dispatch({ type: 'loaded' }), []);
  const setFirstAnimation = useCallback(() => dispatch({ type: 'set-first-animation' }), []);
  const setPrevRoute = useCallback((payload) => dispatch({ type: 'set-prev-route', payload }), []);

  useEffect(() => {
    setTimeout(setLoaded, 2000);
  }, [setLoaded]);

  useEffect(() => {
    const handleRouteComplete = () => {
      setPrevRoute(router.route);
    };

    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, [router, setPrevRoute]);

  return (
    <Provider value={{
      ...state,
      setLoaded,
      setFirstAnimation,
    }}
    >
      {children}
    </Provider>
  );
};

export default NavContext;
