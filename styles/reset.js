import { css } from 'styled-components';

export default css/* css */`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  user-select: none;
}

html,
body,
#__next {
  height: 100%;
  -webkit-overflow-scrolling: touch;
}

button {
  border: none;
  appearance: none;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}

a {
  text-decoration: none;
  color: inherit;
}

button:focus,
a:focus {
  outline: none;
}
`;
