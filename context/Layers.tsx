import { isObject } from '@flbrt/utils/type';
import React, { useCallback, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';

export type Layer = {
  id: string;
  isActive?: boolean;
  data?: {
    [key: string]: any
  }
}

interface LayerContextInterface {
  state: Array<Layer>;
  createLayer: (payload: Layer | string) => void,
  activeLayer: (payload: Layer | string) => void,
  toggleLayer: (payload: Layer | string) => void,
  disactiveLayer: (id: string) => void,
  resetDataLayer: (id: string) => void,
  removeLayer: (id: string) => void,
  disactiveAllLayer: () => void,
}

const LayerContext = React.createContext<LayerContextInterface | Record<string, never>>({});

const { Provider } = LayerContext;

const initialState: Array<Layer> = [];
const CREATE_LAYER = 'CREATE_LAYER';
const ACTIVE_LAYER = 'ACTIVE_LAYER';
const TOGGLE_LAYER = 'TOGGLE_LAYER';
const DISACTIVE_LAYER = 'DISACTIVE_LAYER';
const RESET_DATA_LAYER = 'RESET_DATA_LAYER';
const REMOVE_LAYER = 'REMOVE_LAYER';
const DISACTIVE_ALL_LAYER = 'DISACTIVE_ALL_LAYER';

type ActionType =
  | { type: 'CREATE_LAYER'; payload: Layer | string }
  | { type: 'ACTIVE_LAYER'; payload: Layer | string }
  | { type: 'TOGGLE_LAYER'; payload: Layer | string }
  | { type: 'DISACTIVE_LAYER'; payload: string }
  | { type: 'RESET_DATA_LAYER'; payload: string }
  | { type: 'REMOVE_LAYER'; payload: string }
  | { type: 'DISACTIVE_ALL_LAYER'; payload?: string };

function reducer(state: typeof initialState, action: ActionType, exclusive = true) {
  if (typeof action === 'undefined') return state;
  const payload = isObject(action.payload)
    ? action.payload as Layer
    : { id: action.payload as string };
  switch (action.type) {
    case CREATE_LAYER: {
      if (state.find((layer) => layer.id === payload.id)) {
        return state;
      }
      return [...state, { isActive: false, ...payload }];
    }
    case ACTIVE_LAYER: {
      return state
        .slice(0)
        .map(
          (layer) => (
            layer.id === payload.id
              ? Object.assign(
                layer,
                payload,
                { isActive: true },
              )
              : Object.assign(
                layer,
                exclusive ? { isActive: false } : {},
              )
          ),
        );
    }
    case TOGGLE_LAYER: {
      return state
        .slice(0)
        .map(
          (layer) => (
            layer.id === payload.id
              ? Object.assign(
                layer,
                payload,
                { isActive: !layer.isActive },
              )
              : Object.assign(layer, exclusive ? { isActive: false } : {})
          ),
        );
    }
    case DISACTIVE_LAYER: {
      return state
        .slice(0)
        .map((layer) => (layer.id === payload.id
          ? Object.assign(layer, { isActive: false })
          : layer));
    }
    case RESET_DATA_LAYER: {
      return state
        .slice(0)
        .map(({ data: _, ...layer }, i, arr) => (layer.id === payload.id ? layer : arr[i]));
    }
    case REMOVE_LAYER: {
      return state.filter((layer) => layer.id !== payload.id);
    }
    case DISACTIVE_ALL_LAYER: {
      return state
        .slice(0)
        .map((layer) => Object.assign(layer, { isActive: false }));
    }
    default:
      return state;
  }
}

export const LayerProvider = ({ children }: { children: React.ReactElement }): JSX.Element => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  const createLayer = useCallback((payload) => {
    dispatch({ type: CREATE_LAYER, payload });
  }, []);

  const activeLayer = useCallback((payload) => {
    dispatch({ type: ACTIVE_LAYER, payload });
  }, []);

  const toggleLayer = useCallback((payload) => {
    dispatch({ type: TOGGLE_LAYER, payload });
  }, []);

  const disactiveLayer = useCallback((payload) => {
    dispatch({ type: DISACTIVE_LAYER, payload });
  }, []);

  const resetDataLayer = useCallback((payload) => {
    dispatch({ type: RESET_DATA_LAYER, payload });
  }, []);

  const removeLayer = useCallback((payload) => {
    dispatch({ type: REMOVE_LAYER, payload });
  }, []);

  const disactiveAllLayer = useCallback(() => {
    dispatch({ type: DISACTIVE_ALL_LAYER });
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', disactiveAllLayer);

    return () => router.events.off('routeChangeComplete', disactiveAllLayer);
  }, [router, disactiveAllLayer]);

  return (
    <Provider value={{
      state,
      createLayer,
      activeLayer,
      toggleLayer,
      disactiveLayer,
      resetDataLayer,
      removeLayer,
      disactiveAllLayer,
    }}
    >
      {children}
    </Provider>
  );
};

export default LayerContext;

