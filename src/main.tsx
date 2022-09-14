import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as JotaiProvider } from 'jotai';

import App from '~/App';
import ThemeProvider from '~/components/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <JotaiProvider>
         <ThemeProvider>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ThemeProvider>
      </JotaiProvider>
   </React.StrictMode>,
);
