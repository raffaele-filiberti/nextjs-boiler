import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  height: 5040px; // card-width * card-num * 4
  overflow: hidden;
  margin: 0px calc(-1 * var(--container-x)) var(--container-y) calc(-1 * var(--container-x));
`;

export const Target = styled.div`
  position: absolute;
  top: -100vh;
  bottom: -100vh;
  right: 0;
  left: 0;
`;

export const Content = styled.div`
  height: 100%;
  right: 0;
  left: 0;
`;

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
`;

export const Card = styled.div`
  width: 240px;
  height: 360px;
  border: 1px solid #000;
  border-radius: 8px;
  padding: 1em 2em;
`;

export const Mask = styled.div`
  overflow:hidden;
  width: 100%;
`;
