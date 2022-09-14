import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Lottie from 'lottie-react';
import { opacify } from 'polished';
import { HiStar } from 'react-icons/hi';
import { FaHorse } from 'react-icons/fa';
import { useAtom } from 'jotai';
import AutoWidthInput from 'react-autowidth-input';

import noise from '~/assets/noise';
import editCar from '~/assets/edit-car.json';
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

   const inputBgTransition = {
      type: 'spring',
      stiffness: 100,
      damping: 30,
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
               <InputBg animate={inputBgAnimate} transition={inputBgTransition}>
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
            <InputBg animate={inputBgAnimate} transition={inputBgTransition}>
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
               <motion.div
                  animate={{ rotate: edit ? 180 : 0 }}
                  transition={inputBgTransition}
               >
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

const EditButton = styled(motion.button)`
   position: absolute;
   bottom: -12px;
   border: none;
   width: min-content;
   right: 0;
   left: 0;
   margin: 0 auto;
   background-color: ${({ theme }) => theme.body};
   color: ${({ theme }) => theme.bg};
   padding: 8px 24px;
   border-radius: 100px;
   font-size: 14px;
   font-weight: 500;
   text-transform: uppercase;
   z-index: 4;
   font-family: Recoleta;
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
   background: ${({ theme }) => theme.card};
   color: ${({ theme }) => theme.body};
   box-shadow: rgba(0, 0, 0, 0.15) 0px 48px 50px 0px;
   display: flex;
   *::selection {
      background-color: ${({ theme }) => opacify(-0.5, theme.white)};
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
   padding: 24px 32px;
   margin: 16px;
   border-radius: 24px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   gap: 8px;
   background: ${({ theme }) => opacify(-0.9, theme.accent)};
   background-image: url(${noise});
`;

const TitleWrapper = styled(motion.div)`
   display: flex;
   align-items: center;
   gap: 4px;
   color: ${({ theme }) => theme.body};
`;

const titleStyles = css`
   line-height: 32px;
   font-size: 32px;
   font-family: Recoleta;
   font-weight: 700;
`;

const powerStyles = css`
   font-family: ApercuPro, sans-serif;
   font-weight: 500;
   font-size: 16px;
   line-height: 19px;
   color: ${({ theme }) => theme.bg};
`;

const brandStyles = css`
   font-family: ApercuPro, sans-serif;
   font-weight: 500;
   font-size: 24px;
   line-height: 24px;
   color: ${({ theme }) => theme.body};
`;

const autoInputStyles = css`
   width: min-content;
   outline: none;
   background: transparent;
   border: none;
   color: inherit;
   padding: 0;
   box-sizing: border-box;
`;

const InputBg = styled(motion.div)`
   border-radius: 8px;
   font-size: 0;
   &:hover ~ #tree {
      opacity: 0.5;
   }
`;

const InputTitle = styled(AutoWidthInput)`
   ${autoInputStyles};
   ${titleStyles};
   height: 32px;
`;

const InputBrand = styled(AutoWidthInput)`
   ${autoInputStyles};
   ${brandStyles};
   height: 24px !important;
`;

const InputPower = styled(AutoWidthInput)`
   ${autoInputStyles};
   ${powerStyles};
   height: 19px !important;
`;

const Title = styled(motion.h2)`
   margin: 0;
   ${titleStyles};
`;

const Brand = styled(motion.div)`
   ${brandStyles};
`;

const Power = styled.div`
   ${powerStyles};
   background: ${({ theme }) => theme.body};
   padding: 4px 8px;
   border-radius: 8px;
   display: flex;
   align-items: center;
   gap: 4px;
`;
