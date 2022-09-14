import { useRef, useEffect } from 'react';
import styled, { css, useTheme } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { motion, LayoutProps } from 'framer-motion';
import { HiOutlineTrash } from 'react-icons/hi';
import { PrimitiveAtom, useAtom } from 'jotai';
import Lottie from 'lottie-react';
import { opacify } from 'polished';

import keyLottie from '~/assets/key-lottie.json';
import { Car } from '~/atoms/garagem';
import GoodLink from '~/components/GoodLink';

interface CarCardProps {
   carAtom: PrimitiveAtom<Car>;
   removeCar: () => void;
}

export const CARDS_RADIUS = 38;
export const CARDS_BASE_HEIGHT = 72;
export const TITLE_LINE_HEIGHT = 32;
export const BRAND_LINE_HEIGHT = 19;

const cardBasePaddingAmount =
   (CARDS_BASE_HEIGHT - TITLE_LINE_HEIGHT - BRAND_LINE_HEIGHT) / 2;

// Fake 🥸 custom hook to get animation ids
export const useAnimationIds = (id: string) => {
   const transition = {
      type: 'spring',
      stiffness: 200,
      damping: 30,
   };
   const propsBuilder = (
      layoutId: string,
      layout: LayoutProps['layout'] = true,
   ) => ({
      layout,
      layoutId,
      transition,
   });
   return {
      card: propsBuilder(`carCard-${id}`),
      model: propsBuilder(`carName-${id}`, 'position'),
      content: propsBuilder(`carContent-${id}`),
      brand: propsBuilder(`carBrand-${id}`, 'position'),
      power: propsBuilder(`carPower-${id}`, 'position'),
   };
};

const CarCard = ({ carAtom, removeCar }: CarCardProps) => {
   const location = useLocation();
   const [car] = useAtom(carAtom);
   const theme = useTheme();
   const width = useRef(0);
   const cardRef = useRef<HTMLDivElement>(null);
   const animationIds = useAnimationIds(car.id);

   const updateWidth = () => {
      if (!cardRef.current) return;
      width.current = cardRef.current.offsetWidth;
   };

   useEffect(() => {
      window.addEventListener('resize', updateWidth);
      return () => {
         window.removeEventListener('resize', updateWidth);
      };
   }, []);

   const hide = location.pathname.endsWith(car.id);

   useEffect(() => {
      if (cardRef.current && !width.current) updateWidth();
   }, [hide]);

   return (
      <PlaceHolder style={{ width: hide ? width.current : 'auto' }}>
         {!hide && (
            <GoodLink to={`/car/${car.id}`}>
               <Wrapper
                  whileHover={{
                     paddingTop: '48px',
                     paddingBottom: '40px',
                     scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                     paddingTop: `${cardBasePaddingAmount}px`,
                     paddingBottom: `${cardBasePaddingAmount}px`,
                  }}
                  ref={cardRef}
                  {...animationIds.card}
               >
                  <KeyWrapper>
                     <KeyIcon animationData={keyLottie} loop={true} />
                  </KeyWrapper>
                  <Content {...animationIds.content}>
                     <motion.h2 {...animationIds.model}>{car.model}</motion.h2>
                     <motion.span {...animationIds.brand}>
                        {car.brand}
                     </motion.span>
                  </Content>
                  <TrashIcon onClick={removeCar} color={theme.accent} />
               </Wrapper>
            </GoodLink>
         )}
      </PlaceHolder>
   );
};

export default CarCard;

const PlaceHolder = styled.div`
   position: relative;
   height: ${CARDS_BASE_HEIGHT}px;
   display: flex;
   align-items: center;
   justify-content: center;
`;

const iconBase = css`
   position: absolute;
   right: 0;
   left: 0;
   margin: auto;
   opacity: 0;
   transition-property: opacity, transform;
   transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
   transition-duration: 0.2s, 0.5s;
   transition-delay: 0;
`;

const TrashIcon = styled(HiOutlineTrash)`
   ${iconBase};
   bottom: 17px;
   transform: translateY(-13px);
`;

const KeyWrapper = styled.div`
   ${iconBase};
   top: 4px;
   transform: translateY(20px);
   width: min-content;
   &::after {
      z-index: 0;
      height: 55%;
      width: 55%;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 50%;
      transform: scale(0);
      opacity: 0.5;
      background: ${({ theme }) => theme.bg};
      transition-property: transform;
      transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
      transition-duration: 0.2s;
      transition-delay: 0;
   }
`;

const KeyIcon = styled(Lottie)`
   height: 50px;
   width: 50px;
   position: relative;
   z-index: 1;
`;

export const Content = styled(motion.div)`
   position: relative;
   z-index: 2;
   border-radius: 24px;
   h2 {
      margin: 0;
      color: ${({ theme }) => theme.body};
      font-size: 24px;
      line-height: ${TITLE_LINE_HEIGHT}px;
      font-family: Recoleta;
   }
   span {
      display: block;
      font-family: ApercuPro, sans-serif;
      font-weight: 500;
      line-height: ${BRAND_LINE_HEIGHT}px;
      color: ${({ theme }) => theme.secondary};
   }
`;

export const Wrapper = styled(motion.div)`
   &,
   * {
      user-select: none;
      -webkit-user-drag: none;
   }
   border-radius: ${CARDS_RADIUS}px;
   background: ${({ theme }) => theme.card};
   padding-left: 48px;
   padding-right: 48px;
   box-shadow: rgba(17, 12, 46, 0) 0px 0px 0px 0px;
   text-align: center;
   position: relative;
   transition: box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
   overflow: hidden;
   border: solid 1.5px ${({ theme }) => opacify(-1, theme.white)};
   &::before {
      background: linear-gradient(
         0deg,
         rgba(237, 203, 119, 1) 0%,
         rgba(255, 255, 255, 1) 100%
      );
      transition-property: opacity;
      opacity: 0;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
      transition-duration: 0.2s;
      transition-delay: 0;
   }
   &:hover {
      border: solid 1.5px ${({ theme }) => opacify(-0.7, theme.white)};
      box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
      ${TrashIcon}, ${KeyWrapper} {
         transform: translateY(0);
         opacity: 1;
         transition-delay: 0.2s;
      }
      ${TrashIcon} {
         transition-duration: 0.2s 0.5s;
      }
      ${KeyWrapper} {
         &::after {
            transform: scale(1);
            transition-delay: 0.4s;
            transition-duration: 0.6s;
         }
      }
      &::before {
         opacity: 0.3;
      }
   }
`;

export const Input = styled.input`
   border: none;
   text-align: center;
   outline: none;
   background: none;
   margin: 0 1rem;
   padding: 10px 0;
   font-size: 16px;
   font-family: Recoleta;
   font-size: 1.2rem;
   font-weight: 500;
   color: ${({ theme }) => theme.body};
   margin-left: 1rem;
   display: inline-block;
   width: 500px;
   &:focus {
      /* width: 800px; */
   }
   &::placeholder {
      color: ${({ theme }) => theme.placeholder};
      opacity: 0.5;
   }
`;
