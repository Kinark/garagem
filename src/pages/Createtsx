import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Lottie from 'lottie-react';
import { opacify } from 'polished';
import { HiStar } from 'react-icons/hi';
import { FaHorse } from 'react-icons/fa';
import { useAtom } from 'jotai';

import noise from '~/assets/noise';
import editCar from '~/assets/lottie/edit-car.json';
import yellowTree from '~/assets/yellowTree.svg';
import lightTree from '~/assets/lightTree.svg';
import { useCarAtom } from '~/atoms/garagem';
import { dimUrlAtom } from '~/atoms/dimUrlAtom';
import { useAnimationIds } from '~/components/CarCard';
import Divider from '~/components/Divider';

const Edit = () => {
   const [edit, setEdit] = useState(false);
   const { id } = useParams();
   const [_, setDimUrl] = useAtom(dimUrlAtom);
   // Narrowing for TS to understand that `id` does exists
   // otherwise this route wouldn't match
   if (!id) throw new Error('Car id not provided');
   const [car, setCar] = useCarAtom(id);

   if (!car) return <Navigate to="/" />;

   const animationIds = useAnimationIds(car.id);

   useEffect(() => {
      setDimUrl('/');
   }, []);

   const inputBgAnimate = {
      paddingTop: edit ? '4px' : '0px',
      paddingLeft: edit ? '8px' : '0px',
      paddingRight: edit ? '8px' : '0px',
      paddingBottom: edit ? '4px' : '0px',
      marginTop: edit ? '-4px' : '0px',
      marginLeft: edit ? '-8px' : '0px',
      marginRight: edit ? '-8px' : '0px',
      marginBottom: edit ? '-4px' : '0px',
      background: edit ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)',
   };

   return (
      <Modal {...animationIds.card}>
         <EditCarWrapper>
            <EditCar animationData={editCar} loop={true} />
         </EditCarWrapper>
         <Content {...animationIds.content}>
            <YellowTree src={yellowTree} />
            <TitleWrapper>
               <HiStar />
               <InputBg animate={inputBgAnimate}>
                  {edit ? (
                     <InputTitle
                        extraWidth={0}
                        minWidth={15}
                        value={car.model}
                        onChange={(e) =>
                           setCar({ ...car, model: e.target.value })
                        }
                        wrapperStyle={{
                           fontSize: 0,
                        }}
                        {...animationIds.model}
                     />
                  ) : (
                     <Title {...animationIds.model}>{car.model}</Title>
                  )}
               </InputBg>

               <LightTree id="tree" src={lightTree} />
               <HiStar />
            </TitleWrapper>
            <Divider />
            <InputBg animate={inputBgAnimate}>
               {edit ? (
                  <InputBrand
                     extraWidth={0}
                     minWidth={15}
                     value={car.brand}
                     onChange={(e) => setCar({ ...car, brand: e.target.value })}
                     wrapperStyle={{
                        fontSize: 0,
                     }}
                  />
               ) : (
                  <Brand {...animationIds.brand}>{car.brand}</Brand>
               )}
            </InputBg>
            <Power>
               <motion.div animate={{ rotate: edit ? 180 : 0 }}>
                  <FaHorse />
               </motion.div>
               {edit ? (
                  <InputPower
                     extraWidth={0}
                     minWidth={15}
                     type="number"
                     value={car.power}
                     onChange={(e) =>
                        setCar({ ...car, power: Number(e.target.value) })
                     }
                     wrapperStyle={{
                        fontSize: 0,
                        height: 19,
                     }}
                  />
               ) : (
                  car.power
               )}
            </Power>
            <EditButton onClick={() => setEdit((x) => !x)}>
               {edit ? 'Done' : 'Edit'}
            </EditButton>
         </Content>
      </Modal>
   );
};

export default Edit;

const Modal = styled(motion.div)`
   position: fixed;
   z-index: 4;
   height: 300px;
   width: 365px;
   top: 0;
   border-radius: 32px;
   left: 0;
   right: 0;
   bottom: 0;
   margin: auto;
   overflow: hidden;
   background: ${({ theme }) => theme.colors.white};
   background-image: url(${noise});
   color: ${({ theme }) => theme.colors.body};
   box-shadow: rgba(0, 0, 0, 0.15) 0px 48px 50px 0px;
   display: flex;
   *::selection {
      background-color: ${({ theme }) => opacify(-0.5, theme.colors.white)};
   }
`;

const TitleWrapper = styled(motion.div)`
   display: flex;
   align-items: center;
   gap: 4px;
   color: ${({ theme }) => theme.colors.accent};
`;
