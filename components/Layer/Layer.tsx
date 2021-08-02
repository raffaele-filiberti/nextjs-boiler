import React, { useContext, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { isFunction } from '@flbrt/utils/type';
import LayerContext, { LayerProps } from '~/context/Layers';
import { Wrapper } from './Layer.styled';

const defaultVariants = {
  initial: {
    opacity: 0,
    pointerEvents: 'none',
  },
  animate: {
    opacity: 1,
    pointerEvents: 'auto',
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    opacity: 0,
    pointerEvents: 'none',
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

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
            as={motion.div}
            variants={defaultVariants}
            initial="initial"
            animate="animate"
            exit="exit"
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
