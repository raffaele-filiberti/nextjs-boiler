import { createGlobalStyle } from 'styled-components';
import variables from './variables';
import reset from './reset';

const GlobalStyle = createGlobalStyle/* css */`
  ${variables}
  ${reset}

  html.is-animating,
  html.is-animating body,
  html.is-animating #__next {
    overflow: hidden;
  }

  body {
    background-color: var(--color-secondary);
    font-family: var(--font-family-base);
    font-size: var(--font-size-base);
    color: #fff;
  }


  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track { }
  
  ::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.4);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }
`;

export default GlobalStyle;
