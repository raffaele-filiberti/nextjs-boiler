import 'styled-components';
import type { StyledTheme } from '@flbrt/styled';

export type ColorsKeys = 'primary' | 'secondary' | 'base';

export type BreakpointKeys = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

declare module 'styled-components' {
  export interface DefaultTheme extends StyledTheme {
    colors: Record<ColorsKeys, string>;
    mediaqueries: Record<BreakpointKeys, string>;
  }
}
