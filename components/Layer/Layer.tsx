import React, { useContext, useEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { isFunction } from '@flbrt/utils/type';
import LayerContext, { LayerProps } from '~/context/Layers';
import { Wrapper } from './Layer.styled';
import Animate from '~/components/Animate';
import animations from '~/animations';

type Props = {
  id: string;
  children: React.ReactNode | ((layer: LayerProps) => React.ReactNode);
  variant: 'base' | 'custom';
};

const Layer = ({ id, children, variant }: Props): JSX.Element => {
  const { state, createLayer, removeLayer } = useContext(LayerContext);

  const layer = useMemo(() => state.find((l) => l.id === id), [state, id]);

  useEffect(() => {
    createLayer({ id });
    return () => removeLayer(id);
  }, [createLayer, id, removeLayer]);

  return (
    <AnimatePresence>
      {layer
        && layer.isActive
        && (
          <Wrapper
            key={id}
            as={Animate}
            variants={animations.fade}
            variant={variant}
          >
            {
              isFunction(children)
                ? (children as ((value: LayerProps) => React.ReactNode))(layer)
                : children
            }
          </Wrapper>
        )}
    </AnimatePresence>
  );
};

export default Layer;
