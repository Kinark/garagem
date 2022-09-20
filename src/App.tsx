import { createGlobalStyle, useTheme } from 'styled-components';
import Dim from '~/components/Dim';
import Routes from '~/Routes';
import { BrowserRouter } from 'react-router-dom';
import { Provider as JotaiProvider } from 'jotai';
import { MotionConfig } from 'framer-motion';

import ThemeProvider from '~/components/ThemeProvider';
import '~/components/fontsLoader.css';
import React from 'react';

const MotionConfigProxy = ({ children }: { children: React.ReactElement }) => {
   const theme = useTheme();
   return (
      <MotionConfig transition={theme.animation.springs.default}>
         {children}
      </MotionConfig>
   );
};

function App() {
   return (
      <JotaiProvider>
         <ThemeProvider>
            <MotionConfigProxy>
               <BrowserRouter>
                  <GlobalStyle />
                  <Routes />
                  <Dim />
               </BrowserRouter>
            </MotionConfigProxy>
         </ThemeProvider>
      </JotaiProvider>
   );
}

export default App;

const GlobalStyle = createGlobalStyle`
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type=number] {
    -moz-appearance:textfield; /* Firefox */
}
    a {
      text-decoration: none;
      color: inherit;
      outline: none;
    }
    *, *::before, *::after {
      box-sizing: border-box;
   }
    body {
      font-family: ${({ theme }) => theme.font.families.sans};
      margin: 0;
      background: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.body};
    }
`;
