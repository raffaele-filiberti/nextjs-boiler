import { createGlobalStyle } from 'styled-components';
import { supportsHover } from '@flbrt/styled';
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

  ${supportsHover/* css */`
    body {
      position: fixed;
      overflow: hidden;
    }
  `}

  body {
    background-color: var(--color-background);
    font-family: -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: var(--font-size-base);
    color: var(--color-base);
    line-height: 1.4;
  }
  
  .oh {
    overflow: hidden;
  }

  [data-anime] {
    display: block;
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
