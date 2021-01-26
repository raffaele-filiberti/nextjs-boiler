import { css } from 'styled-components';
import { fluidRange } from 'polished';

const XD_MIN = '375px';

const XD_MAX = '1920px';

const fontSizeDisplay = {
  prop: '--font-size-display',
  fromSize: '42px',
  toSize: '150px',
};

const fontSizeHeading = {
  prop: '--font-size-heading',
  fromSize: '16px',
  toSize: '18px',
};

const fontSizeBase = {
  prop: '--font-size-base',
  fromSize: '16px',
  toSize: '20px',
};

export default css/* css */`
  :root {
    --color-primary: #34ecd5;
    --color-secondary: #2c3b90;
    --color-base: #fff;

    --font-family-base: 'Space Mono', monospace;

    ${fluidRange(fontSizeDisplay, XD_MIN, XD_MAX)}
    ${fluidRange(fontSizeHeading, XD_MIN, XD_MAX)}
    ${fluidRange(fontSizeBase, XD_MIN, XD_MAX)}

    --container-x: 5.208vw;
    --container-y: 2.083vw;
    --chapter-y: 1.5625vw;
  }
`;
