import styled from 'styled-components';

const variants = {
  custom: { background: 'red' },
  base: { background: 'red' },
};

type Props = {
  readonly variant: 'base' | 'custom';
  [key: string]: unknown,
}

const defaultProps = { variant: 'base' };

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  height: calc(100 * var(--vh));
  width: 100%;
  pointer-events: auto;
  z-index: 1001;

  ${({ variant }) => variants[variant]}
`;

Wrapper.defaultProps = defaultProps;
