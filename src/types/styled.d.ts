// styled.d.ts
import 'styled-components';

import { Theme } from '~/constants/colors';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
