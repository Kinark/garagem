import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { darken, opacify } from 'polished';

const transition = {
   type: 'spring',
   stiffness: 200,
   damping: 30,
};

interface ConfirmDeleteProps {
   onDelete: () => void;
   color?: string;
   className?: string;
}

const ConfirmDelete = ({ onDelete, color, className }: ConfirmDeleteProps) => {
   const [areYouSure, setAreYouSure] = useState(false);
   const theme = useTheme();

   const areYouSureHandler: React.MouseEventHandler<HTMLButtonElement> = (
      e,
   ) => {
      e.preventDefault();
      e.stopPropagation();
      if (areYouSure) {
         disableAreYouSure();
         onDelete();
         return;
      }
      setAreYouSure(true);
   };

   const disableAreYouSure = () => {
      setAreYouSure(false);
   };

   return (
      <Wrapper
        onMouseLeave={disableAreYouSure}
         onClick={areYouSureHandler}
         whileHover={{
            scale: 1.05,
            backgroundColor: areYouSure
               ? darken(0.05, theme.red)
               : opacify(-0.9, 'black'),
         }}
         animate={{
            width: areYouSure ? '78px' : '24px',
            backgroundColor: areYouSure ? theme.red : 'transparent',
            color: areYouSure ? theme.white : color || theme.accent,
         }}
         transition={transition}
         className={className}
      >
         <HiOutlineTrash size={16} color="inherit" />
         {areYouSure && <div>Delete?</div>}
      </Wrapper>
   );
};

export default ConfirmDelete;

const Wrapper = styled(motion.button)`
   display: flex;
   align-items: center;
   transition: none;
   height: 24px;
   padding: 0;
   font-family: ApercuPro, sans-serif;
   font-size: 12px;
   border-radius: 100px;
   text-transform: uppercase;
   gap: 4px;
   padding-left: 4px;
   border: none;
   overflow: hidden;
   cursor: pointer;
   svg {
    display: inline-block;
    /* margin: auto; */
      flex-shrink: 0;
   }
`;
