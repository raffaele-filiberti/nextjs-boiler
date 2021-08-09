import styled from 'styled-components';

export const Scrollable = styled.div`
  height: calc(100 * var(--vh));
  overflow: hidden scroll;
  pointer-events: auto;
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: var(--container-y);
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

export const ImageCover = styled.img`
  max-height: 100%;
  height: 100%;
  max-width: 100%;
  width: 100%;
  object-fit: cover;
`;

export const FullHeight = styled.div`
  position: relative;
  min-height: calc(100 * var(--vh, 1vh));
  overflow: hidden;
`;

export const FitAbsolute = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;
