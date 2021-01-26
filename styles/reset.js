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
  min-height: 100%;
  overscroll-behavior: none;
  --webkit-overflow-scrolling: 'touch';
}

/* Hide scrollbar for Chrome, Safari and Opera */
body::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
body {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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
