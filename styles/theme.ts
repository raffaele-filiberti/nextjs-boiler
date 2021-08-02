import { theme as styledTheme } from '@flbrt/styled';
import { DefaultTheme } from 'styled-components';
import breakpoints from './breakpoints';

const theme: DefaultTheme = {
  ...styledTheme,
  mediaqueries: {
    xs: `@media screen and (min-width: ${breakpoints.xs}px)`,
    sm: `@media screen and (min-width: ${breakpoints.sm}px)`,
    md: `@media screen and (min-width: ${breakpoints.md}px)`,
    lg: `@media screen and (min-width: ${breakpoints.lg}px)`,
    xl: `@media screen and (min-width: ${breakpoints.xl}px)`,
    xxl: `@media screen and (min-width: ${breakpoints.xxl}px)`,
  },
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    base: 'var(--color-base)',
  },
  spacers: {
    xs: 'var(--xs)',
    s: 'var(--s)',
    m: 'var(--m)',
    l: 'var(--l)',
    xl: 'var(--xl)',
  },
  typography: {
    display: {
      fontFamily: 'var(--font-family-display)',
      fontSize: 'var(--font-size-display)',
      lineHeight: 0.8,
    },
    base: {
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-base)',
    },
  },
};

export default theme;
