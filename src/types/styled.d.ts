// styled.d.ts
import 'styled-components';
import {} from 'styled-components/cssprop'

import { Theme } from '~/components/ThemeProvider';

declare module 'styled-components' {
   export interface DefaultTheme extends Theme {}
}
