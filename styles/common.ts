import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Scrollable = styled.div`
  height: calc(100 * var(--vh));
  overflow: hidden scroll;
  pointer-events: auto;
`;
