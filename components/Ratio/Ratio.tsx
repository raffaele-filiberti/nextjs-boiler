import React from 'react';
import styled, { CSSProperties } from 'styled-components';

type WrapperProps = {
  w: number;
  h: number;
  $mask?: boolean;
};

const Wrapper = styled.div<WrapperProps>(({ h, w, $mask }) => ({
  position: 'relative',
  width: '100%',
  height: 0,
  paddingBottom: `${(h / w) * 100}%`,
  overflow: $mask ? 'hidden' : null,
}));

type Props = {
  children: React.ReactNode;
  ratio?: string;
  mask?: boolean;
  className?: string;
  style?: CSSProperties;
};

const Ratio = ({
  children, ratio, className, style, mask,
}: Props): JSX.Element => {
  const [widthRatio, heightRatio] = ratio.split(':').map((v) => Number(v));

  return (
    <Wrapper
      className={className}
      style={style}
      w={widthRatio}
      h={heightRatio}
      $mask={mask}
    >
      {children}
    </Wrapper>
  );
};

Ratio.defaultProps = {
  ratio: '1:1',
  className: null,
  style: null,
  mask: false,
};

export default Ratio;
