export * from './values/colors';

import { useAtom } from 'jotai';
import { useEffect, ReactElement } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { darkModeAtom } from '~/atoms/darkMode';
import { palletes } from './values/palletes';
import { font } from './values/font';
import { animation } from './values/animation';

export const theme = (colorTheme: keyof typeof palletes = 'light') => {
   return {
      font,
      animation,
      colors: palletes[colorTheme],
   };
};

export type Theme = ReturnType<typeof theme>;

const ThemeProvider = ({ children }: { children: ReactElement }) => {
   const [darkMode, toggleDarkMode] = useAtom(darkModeAtom);

   const resetPrefersDark = (e: any) => {
      toggleDarkMode(!!e.matches);
   };

   useEffect(() => {
      window
         .matchMedia('(prefers-color-scheme: dark)')
         .addEventListener('change', resetPrefersDark);
      toggleDarkMode(
         window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches,
      );
      return () => {
         window
            .matchMedia('(prefers-color-scheme: dark)')
            .removeEventListener('change', resetPrefersDark);
      };
   }, []);

   return (
      <SCThemeProvider theme={theme(darkMode ? 'dark' : 'light')}>
         {children}
      </SCThemeProvider>
   );
};

export default ThemeProvider;
