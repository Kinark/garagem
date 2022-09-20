import { Routes as CoreRoutes, Route } from 'react-router-dom';

import Home from '~/pages/Home';
import Edit from '~/pages/Edit';

const Routes = () => (
   <CoreRoutes>
      <Route path="/" element={<Home />}>
         <Route path="car">
            <Route path=":id" element={<Edit />} />
         </Route>
      </Route>
   </CoreRoutes>
);

export default Routes;
