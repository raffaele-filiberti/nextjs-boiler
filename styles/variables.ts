import { breakpoints } from '@flbrt/styled';
import { css } from 'styled-components';

export default css/* css */`
  :root {
    --color-primary: #4d4d4d;
    --color-secondary: #2d2d2d;
    --color-background: #fff;
    --color-base: #000;

    --font-size-display: 30vw;
    --font-size-heading: 32px;
    --font-size-base: 16px;

    --container-x: 24px;
    --container-y: 40px;

    --s: 8px;
    --m: 16px;
    --l: 24px;
    --xl: 32px;
    --xxl: 40px;
    --xxxl: 56px;
  }

  ${breakpoints('sm')/* css */`
    :root {
      --font-size-display: 15.625vw;
      --font-size-heading: 32px;
      --font-size-base: 16px;

      --container-x: 10.4166666667vw;
      --container-y: 6.25vw;
    }
  `}
`;
