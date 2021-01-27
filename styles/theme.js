import breakpoints from './breakpoints';

const theme = {
  mediaquery: {
    xs: `@media screen and (min-width: ${breakpoints.xs}px)`,
    sm: `@media screen and (min-width: ${breakpoints.sm}px)`,
    md: `@media screen and (min-width: ${breakpoints.md}px)`,
    lg: `@media screen and (min-width: ${breakpoints.lg}px)`,
    xl: `@media screen and (min-width: ${breakpoints.xl}px)`,
  },
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    base: 'var(--color-base)',
  },
  gutter: { n: 0 },
  space: {
    n: 0,
    containerX: 'var(--container-x)',
    containerY: 'var(--container-y)',
    chapterY: 'var(--chapter-y)',
    spaceS: 'var(--space-s)',
    spaceM: 'var(--space-m)',
    spaceL: 'var(--space-l)',
    spaceXL: 'var(--space-xl)',
  },
  typography: {
    display: {
      fontFamily: 'var(--font-family-display)',
      fontSize: 'var(--font-size-display)',
      lineHeight: 0.8,
    },
    heading: {
      fontFamily: 'var(--font-family-heading)',
      fontSize: 'var(--font-size-heading)',
    },
    base: {
      fontFamily: 'var(--font-family-base)',
      fontSize: 'var(--font-size-base)',
    },
  },
};

export default theme;
