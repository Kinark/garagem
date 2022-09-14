import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { carsAtoms, createCarObj } from '~/atoms/garagem';

import logo from '~/assets/GaragemLogo.svg';

import SearchBar from '~/components/SearchBar';
import CarCard, { CARDS_BASE_HEIGHT, CARDS_RADIUS } from '~/components/CarCard';

const Home = () => {
   const [cars, dispatch] = useAtom(carsAtoms);
   const [query, setQuery] = useState('');
   const navigate = useNavigate();

   const filteredCarsAtom = useMemo(
      () =>
         atom((get) => {
            if (!query) return get(carsAtoms);
            const filteredCars = cars.filter((car) => {
               const { brand, model, power } = get(car);
               const queryRegex = new RegExp(query.toLocaleLowerCase(), 'i');
               return (
                  queryRegex.test(brand.toLocaleLowerCase()) ||
                  queryRegex.test(model.toLocaleLowerCase()) ||
                  queryRegex.test(String(power))
               );
            });
            return filteredCars;
         }),
      [cars, query],
   );

   const [filteredCars] = useAtom(filteredCarsAtom);

   const newCar = () => {
      const newCar = createCarObj({
         brand: 'Fiat',
         model: 'Uno',
         power: 200,
      });
      dispatch({
         type: 'insert',
         value: newCar,
      });
      navigate(`/car/${newCar.id}`);
   };

   return (
      <>
         <Container>
            <Logo src={logo} />
            <SearchBar
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Which car do you wanna search for?"
            />
            <CarsContainer>
               {filteredCars?.map((carAtom) => (
                  <CarCard
                     key={`${carAtom}`}
                     carAtom={carAtom}
                     removeCar={() =>
                        dispatch({ type: 'remove', atom: carAtom })
                     }
                  />
               ))}
               <NewCarButton whileTap={{ scale: 0.95 }} onClick={newCar}>
                  Add
               </NewCarButton>
            </CarsContainer>
         </Container>
         <Outlet />
      </>
   );
};

export default Home;

const Logo = styled.img``;

const NewCarButton = styled(motion.button)`
   height: ${CARDS_BASE_HEIGHT}px;
   background: rgba(0, 0, 0, 0.1);
   border-radius: ${CARDS_RADIUS}px;
   width: 140px;
   display: flex;
   align-items: center;
   justify-content: center;
   font-family: Recoleta;
   font-size: 18px;
   font-weight: 500;
   cursor: pointer;
   border: none;
`;

const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 48px;
   padding-top: 10vh;
   width: 95%;
   max-width: 1024px;
   margin: auto;
`;

const CarsContainer = styled.div`
   display: flex;
   flex-direction: row;
   gap: 16px;
   flex-wrap: wrap;
`;
