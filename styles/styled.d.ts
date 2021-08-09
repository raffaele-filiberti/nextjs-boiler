import 'styled-components';
import type { StyledTheme } from '@flbrt/styled';
import breakpoints from './breakpoints';
import { colors, spacers, typography } from './theme';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { _, ...breakpointsKeys } = breakpoints;

export type ColorsKeys = keyof(typeof colors);
export type SpacersKeys = keyof(typeof spacers);
export type TypographyKeys = keyof(typeof typography);
export type BreakpointKeys = keyof(typeof breakpointsKeys);

declare module 'styled-components' {
  export interface DefaultTheme extends StyledTheme {
    colors: Record<ColorsKeys, string>;
    spacers: Record<SpacersKeys, string | number>;
    mediaqueries: Record<BreakpointKeys, string>;
    typography: Record<TypographyKeys, CSSProperties>
  }
}
