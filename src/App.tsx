import { createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import Dim from '~/components/Dim';

import Home from '~/pages/Home';
import Edit from '~/pages/Edit';

function App() {
   return (
      <>
         <GlobalStyle />
         <Routes>
            <Route path="/" element={<Home />}>
               <Route path="car">
                  <Route path=":id" element={<Edit />} />
               </Route>
            </Route>
         </Routes>
         <Dim />
      </>
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
    @font-face {
        font-family: Recoleta;
        src: url('/fonts/Recoleta/Recoleta-Regular.ttf') format('truetype');
        font-weight: 400;
    }
    @font-face {
      font-family: Recoleta;
        src: url('/fonts/Recoleta/Recoleta-Medium.ttf') format('truetype');
        font-weight: 500;
    }
    @font-face {
        font-family: ApercuPro;
        src: url('/fonts/Apercu-Pro/Apercu-Pro-Regular.otf') format('opentype');
        font-weight: 400;
    }
    @font-face {
        font-family: ApercuPro;
        src: url('/fonts/Apercu-Pro/Apercu-Pro-Medium.otf') format('opentype');
        font-weight: 500;
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
      font-family: ApercuPro, Arial, Helvetica, sans-serif;
      margin: 0;
      background: ${({ theme }) => theme.bg};
      color: ${({ theme }) => theme.body};
    }
`;
