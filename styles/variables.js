import { css } from 'styled-components';
import { fluidRange } from 'polished';

const XD_MIN = '375px';

const XD_MAX = '1920px';

const fontSizeDisplay = {
  prop: '--font-size-display',
  fromSize: '42px',
  toSize: '300px',
};

const fontSizeHeading = {
  prop: '--font-size-heading',
  fromSize: '24px',
  toSize: '32px',
};

const fontSizeBase = {
  prop: '--font-size-base',
  fromSize: '14px',
  toSize: '18px',
};

export default css/* css */`
  :root {
    --color-primary: #4d4d4d;
    --color-secondary: #2d2d2d;
    --color-background: #fff;
    --color-base: #000;

    --font-family-base: 'Space Mono', monospace;

    ${fluidRange(fontSizeDisplay, XD_MIN, XD_MAX)}
    ${fluidRange(fontSizeHeading, XD_MIN, XD_MAX)}
    ${fluidRange(fontSizeBase, XD_MIN, XD_MAX)}

    --container-x: 5.208vw;
    --container-y: 2.083vw;

    --s: 8px;
    --m: 16px;
    --l: 24px;
    --xl: 32px;
    --xxl: 40px;
    --xxxl: 56px;
  }
`;
