import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { atom, useAtom } from 'jotai';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useTimeoutWhen } from 'rooks';

import { carsAtoms, createCarObj } from '~/atoms/garagem';

import logo from '~/assets/GaragemLogo.svg';

import SearchBar from '~/components/SearchBar';
import CarCard, {
   useAnimationIds,
   CARDS_BASE_HEIGHT,
   CARDS_RADIUS,
} from '~/components/CarCard';

const Home = () => {
   const [cars, dispatch] = useAtom(carsAtoms);
   const location = useLocation();
   const [query, setQuery] = useState('');
   const [currentNewCar, setCurrentNewCar] = useState(createCarObj());
   const [hideAddBtn, setHideAddBtn] = useState(false);
   const navigate = useNavigate();

   const refreshCurrentNewCar = () => {
      setCurrentNewCar(createCarObj());
   };

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

   const shareIds = useMemo(
      () => useAnimationIds(currentNewCar.id),
      [currentNewCar],
   );

   useTimeoutWhen(
      () => setHideAddBtn(false),
      50,
      hideAddBtn && location.pathname === '/',
   );

   const newCar = () => {
      dispatch({
         type: 'insert',
         value: currentNewCar,
      });
      navigate(`/car/${currentNewCar.id}`);
      setHideAddBtn(true);
      refreshCurrentNewCar();
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
               <LayoutGroup>
                  <AnimatePresence>
                     {filteredCars?.map((carAtom) => (
                        <CarCard
                           key={`${carAtom}`}
                           carAtom={carAtom}
                           removeCar={() =>
                              dispatch({ type: 'remove', atom: carAtom })
                           }
                        />
                     ))}
                  </AnimatePresence>
                  {!hideAddBtn && (
                     <NewCarButton
                        {...shareIds.card}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 0.9 }}
                        whileTap={{ scale: 1.05 }}
                        whileHover={{ scale: 0.95 }}
                        onClick={newCar}
                     >
                        <motion.span {...shareIds.model}>New Car</motion.span>
                     </NewCarButton>
                  )}
               </LayoutGroup>
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
   font-family: ${({ theme }) => theme.font.families.serif};
   font-size: 18px;
   font-weight: 500;
   cursor: pointer;
   border: none;
   color: inherit;
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

const CarsContainer = styled(motion.div)`
   display: flex;
   flex-direction: row;
   gap: 16px;
   flex-wrap: wrap;
   justify-content: center;
`;
