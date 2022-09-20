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
import DisguisedInput from '~/components/DisguisedInput';

const Edit = () => {
   const [edit, setEdit] = useState(false);
   const { id } = useParams();
   const [_, setDimUrl] = useAtom(dimUrlAtom);
   // Narrowing for TS to understand that `id` does exists
   // otherwise this route wouldn't match
   if (!id) throw new Error('Car id not provided');
   const [car, setCar] = useCarAtom(id);

   if (!car) return <Navigate to="/" />;

   const animationIds = useAnimationIds(car.id, id);

   useEffect(() => {
      setDimUrl('/');
      return () => {
         setDimUrl(null);
      };
   }, []);

   return (
      <Modal {...animationIds.card}>
         <EditCarWrapper>
            <EditCar animationData={editCar} loop={true} />
         </EditCarWrapper>
         <Content {...animationIds.content}>
            <YellowTree src={yellowTree} />
            <LightTree id="tree" src={lightTree} />
            <TitleWrapper>
               <HiStar />
               <Title
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                  value={car.model}
                  edit={edit}
                  tag="h2"
                  previewProps={animationIds.model}
               />
               <HiStar />
            </TitleWrapper>
            <Divider />
            <Brand
               edit={edit}
               value={car.brand}
               onChange={(e) => setCar({ ...car, brand: e.target.value })}
               previewProps={animationIds.brand}
            />
            <PowerWrapper>
               <motion.div animate={{ rotate: edit ? 180 : 0 }}>
                  <FaHorse />
               </motion.div>
               <Power
                  edit={edit}
                  type="number"
                  value={car.power}
                  onChange={(e) =>
                     setCar({ ...car, power: Number(e.target.value) })
                  }
               />
            </PowerWrapper>
            <EditButton onClick={() => setEdit((x) => !x)}>
               {edit ? 'Done' : 'Edit'}
            </EditButton>
         </Content>
      </Modal>
   );
};

export default Edit;

const EditButton = styled(motion.button)`
   position: absolute;
   bottom: -12px;
   border: none;
   width: min-content;
   right: 0;
   left: 0;
   margin: 0 auto;
   background-color: ${({ theme }) => theme.colors.body};
   color: ${({ theme }) => theme.colors.bg};
   padding: 8px 24px;
   border-radius: 100px;
   font-size: ${({ theme }) => theme.font.sizes.small};
   font-weight: 500;
   text-transform: uppercase;
   z-index: 4;
   font-family: ${({ theme }) => theme.font.families.serif};
   cursor: pointer;
`;

const EditCarWrapper = styled.div`
   height: 100%;
   border-radius: 32px 0 0 32px;
   overflow: hidden;
`;

const EditCar = styled(Lottie)`
   height: 100%;
   margin-left: -15px;
   margin-right: -20px;
`;

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
   background: ${({ theme }) => theme.colors.card};
   color: ${({ theme }) => theme.colors.body};
   box-shadow: rgba(0, 0, 0, 0.15) 0px 48px 50px 0px;
   display: flex;
   *::selection {
      background-color: ${({ theme }) => opacify(-0.5, theme.colors.white)};
   }
`;

const YellowTree = styled.img`
   position: absolute;
   left: -57px;
   bottom: -24px;
   height: 150px;
   user-select: none;
   -webkit-user-drag: none;
   pointer-events: none;
`;

const LightTree = styled.img`
   position: absolute;
   left: -25px;
   bottom: -38px;
   height: 250px;
   pointer-events: none;
   user-select: none;
   -webkit-user-drag: none;
   transition: opacity 0.15s ease-out;
`;

export const Content = styled(motion.div)`
   position: relative;
   z-index: 2;
   flex: 1;
   padding: 0px 4px;
   margin: 16px;
   border-radius: 24px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 8px;
   background: ${({ theme }) => opacify(-0.9, theme.colors.accent)};
   background-image: url(${noise});
`;

const TitleWrapper = styled(motion.div)`
   display: flex;
   align-items: center;
   gap: 4px;
   color: ${({ theme }) => theme.colors.body};
`;

const Power = styled(DisguisedInput)`
   font-family: ${({ theme }) => theme.font.families.sans};
   font-weight: 500;
   font-size: ${({ theme }) => theme.font.sizes.body};
   line-height: 19px;
`;

const Title = styled(DisguisedInput)`
   margin: 0;
   line-height: 32px;
   font-size: ${({ theme }) => theme.font.sizes.title};
   font-family: ${({ theme }) => theme.font.families.serif};
   font-weight: 700;
`;

const Brand = styled(DisguisedInput)`
   font-family: ${({ theme }) => theme.font.families.sans};
   font-weight: 500;
   font-size: ${({ theme }) => theme.font.sizes.smallTitle};
   line-height: 24px;
   color: ${({ theme }) => theme.colors.body};
`;

const PowerWrapper = styled.div`
   color: ${({ theme }) => theme.colors.bg};
   background: ${({ theme }) => theme.colors.body};
   padding: 4px 8px;
   border-radius: 8px;
   display: flex;
   align-items: center;
   gap: 4px;
   & > div {
      display: flex;
   }
`;
