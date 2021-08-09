import { Spacer, Text } from '@flbrt/styled';
import { AnimatePresence } from 'framer-motion';
import React, { useContext } from 'react';
import styled from 'styled-components';
import animations from '~/animations';
import NavContext from '~/context/Nav';
import Animate from '../Animate/Animate';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100  * var(--vh, 1vh));
  z-index: 999;
  background: #272727;
  display: flex;
  align-items: flex-end;
`;

const Loader = (): JSX.Element => {
  const { isLoading } = useContext(NavContext);

  return (
    <AnimatePresence initial={false}>
      {isLoading && (
      <Wrapper
        as={Spacer}
        root={['containerY', 'containerX']}
        forwardedAs={Animate}
        variants={animations.slideUp}
        initial={false}
        enter={false}
      >
        <Text
          variant="heading"
          tint="white"
        >
          Loading...
        </Text>
      </Wrapper>
      )}
    </AnimatePresence>
  );
};

Loader.propTypes = {};
Loader.defaultProps = {};

export default Loader;
