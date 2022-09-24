import { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';
import { motion, LayoutProps, Variants, useMotionValue } from 'framer-motion';
import { PrimitiveAtom, useAtom } from 'jotai';
import Lottie from 'lottie-react';
import { opacify } from 'polished';

import keyLottie from '~/assets/lottie/key-lottie.json';
import { Car } from '~/atoms/garagem';
import GoodLink from '~/components/GoodLink';
import ConfirmDelete from '~/components/ConfirmDelete';

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

const cardVariants: Variants = {
   collapsed: {
      paddingTop: `${cardBasePaddingAmount}px`,
      paddingBottom: `${cardBasePaddingAmount}px`,
   },
   expanded: {
      paddingTop: '48px',
      paddingBottom: '40px',
      scale: 1.05,
   },
   shrunk: {
      scale: 0.8,
   },
   hidden: {
      opacity: 0,
      scale: 0.8,
   },
};

const iconVariants: Variants = {
   collapsed: (side: 'top' | 'bottom') => ({
      opacity: 0,
      y: side === 'top' ? 20 : -13,
      // transition: {
      //    when: 'beforeChildren',
      // },
   }),
   expanded: {
      opacity: 1,
      y: 0,
   },
};

const iconBgCircleVariants: Variants = {
   collapsed: {
      scale: 0,
   },
   expanded: {
      scale: 1,
   },
};

// Fake 🥸 custom hook to get animation ids
export const useAnimationIds = (id: string, layoutDependency?: any) => {
   // const theme = useTheme();
   const propsBuilder = (
      layoutId: string,
      layout: LayoutProps['layout'] = true,
   ) => ({
      layout,
      layoutId: `${layoutId}-${id}`,
      layoutDependency,
   });
   return {
      card: propsBuilder(`carCard`),
      model: propsBuilder(`carName`, 'position'),
      content: propsBuilder(`carContent`),
      brand: propsBuilder(`carBrand`, 'position'),
      power: propsBuilder(`carPower`, 'position'),
   };
};

const CarCard = ({ carAtom, removeCar }: CarCardProps) => {
   const location = useLocation();
   const [car] = useAtom(carAtom);
   const width = useRef(0);
   const cardRef = useRef<HTMLDivElement>(null);
   const animationIds = useAnimationIds(car.id);
   const [floating, setFloating] = useState(false)

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
      <PlaceHolder
         key={car.id}
         style={{ width: hide ? width.current : 'auto' }}
      >
         {!hide && (
            <GoodLink to={`/car/${car.id}`}>
               <Wrapper
                  initial="collapsed"
                  whileHover="expanded"
                  whileTap="shrunk"
                  exit="hidden"
                  style={{ zIndex: floating ? 4 : 0 }}
                  variants={cardVariants}
                  ref={cardRef}
                  {...animationIds.card}
               >
                  <KeyWrapper custom="top" variants={iconVariants}>
                     <BackCircle variants={iconBgCircleVariants} />
                     <KeyIcon animationData={keyLottie} loop={true} />
                  </KeyWrapper>
                  <Content {...animationIds.content}>
                     <motion.h2 {...animationIds.model}>{car.model}</motion.h2>
                     <motion.span {...animationIds.brand}>
                        {car.brand}
                     </motion.span>
                  </Content>
                  <TrashWrapper custom="bottom" variants={iconVariants}>
                     <ConfirmDelete onDelete={removeCar} />
                  </TrashWrapper>
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
`;

const TrashWrapper = styled(motion.div)`
   ${iconBase};
   width: min-content;
   bottom: 12px;
`;

const KeyWrapper = styled(motion.div)`
   ${iconBase};
   top: 4px;
   width: min-content;
`;

const BackCircle = styled(motion.div)`
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
   background: ${({ theme }) => theme.colors.bg};
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
      color: ${({ theme }) => theme.colors.body};
      font-size: ${({ theme }) => theme.font.sizes.smallTitle};
      line-height: ${TITLE_LINE_HEIGHT}px;
      font-family: ${({ theme }) => theme.font.families.serif};
   }
   span {
      display: block;
      font-family: ${({ theme }) => theme.font.families.sans};
      font-weight: 500;
      line-height: ${BRAND_LINE_HEIGHT}px;
      color: ${({ theme }) => theme.colors.secondary};
   }
`;

export const Wrapper = styled(motion.div)`
   &,
   * {
      user-select: none;
      -webkit-user-drag: none;
   }
   border-radius: ${CARDS_RADIUS}px;
   background: ${({ theme }) => theme.colors.card};
   padding-left: 48px;
   padding-right: 48px;
   box-shadow: rgba(17, 12, 46, 0) 0px 0px 0px 0px;
   text-align: center;
   position: relative;
   transition-property: box-shadow, z-index;
   transition-duration: 0.5s, 0s;
   transition-delay: 0s, 0.3s;
   transition-timing-function: ${({ theme }) =>
      theme.animation.easings.default};
   z-index: 0;
   overflow: hidden;
   border: solid 1.5px ${({ theme }) => opacify(-1, theme.colors.white)};
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
      transition-timing-function: ${({ theme }) =>
         theme.animation.easings.default};
      transition-duration: 0.2s;
      transition-delay: 0;
   }
   &:hover {
      transition-delay: 0s;
      z-index: 1 !important;
      border: solid 1.5px ${({ theme }) => opacify(-0.7, theme.colors.white)};
      box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
      /* ${TrashWrapper}, ${KeyWrapper} {
         transform: translateY(0);
         opacity: 1;
         transition-delay: 0.2s;
      }
      ${TrashWrapper} {
         transition-duration: 0.2s 0.5s;
      }
      ${KeyWrapper} {
         &::after {
            transform: scale(1);
            transition-delay: 0.4s;
            transition-duration: 0.6s;
         }
      } */
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
   font-size: ${({ theme }) => theme.font.sizes.body};
   font-family: ${({ theme }) => theme.font.families.serif};
   font-size: 1.2rem;
   font-weight: 500;
   color: ${({ theme }) => theme.colors.body};
   margin-left: 1rem;
   display: inline-block;
   width: 500px;
   &:focus {
      /* width: 800px; */
   }
   &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
      opacity: 0.5;
   }
`;
