import { theme as styledTheme } from '@flbrt/styled';
import { DefaultTheme } from 'styled-components';
import breakpoints from './breakpoints';

export const colors = {
  white: 'white',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  base: 'var(--color-base)',
};

export const spacers = {
  xs: 'var(--xs)',
  s: 'var(--s)',
  m: 'var(--m)',
  l: 'var(--l)',
  xl: 'var(--xl)',
  containerX: 'var(--container-x)',
  containerY: 'var(--container-y)',
};

export const typography = {
  display: {
    fontFamily: 'var(--font-family-display)',
    fontSize: 'var(--font-size-display)',
    lineHeight: 0.8,
    fontWeight: 400,
  },
  heading: {
    fontFamily: 'var(--font-family-display)',
    fontSize: 'var(--font-size-heading)',
    lineHeight: 0.8,
  },
  base: {
    fontFamily: 'var(--font-family-base)',
    fontSize: 'var(--font-size-base)',
  },
};

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
  colors,
  spacers,
  typography,
};

export default theme;
