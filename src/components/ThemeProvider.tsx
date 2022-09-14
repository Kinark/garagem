import { useAtom } from 'jotai';
import { useEffect, ReactNode } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { darkModeAtom } from '~/atoms/darkMode';
import { theme } from '~/constants/colors';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
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
      <SCThemeProvider theme={theme[darkMode ? 'dark' : 'light']}>
         {children}
      </SCThemeProvider>
   );
};

export default ThemeProvider;
