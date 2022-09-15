import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';
import { InputHTMLAttributes } from 'react';

// import { spring } from '~/constants/spring';

interface SearchBar extends InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = ({ placeholder, ...rest }: SearchBar) => {
   const theme = useTheme();
   return (
      <Wrapper>
         <Icon color={theme.accent} size={24} />
         <Input placeholder={placeholder} {...rest} />
      </Wrapper>
   );
};

export default SearchBar;

const Icon = styled(HiSearch)`
   position: absolute;
   left: 10px;
   top: 0;
   bottom: 0;
   margin: auto;
`;

export const Wrapper = styled(motion.div)`
   position: relative;
   background: ${({ theme }) => theme.card};
   width: 95%;
   max-width: 500px;
   border-radius: 100px;
   &::placeholder {
      color: ${({ theme }) => theme.placeholder};
      opacity: 0.5;
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
   width: 100%;
   &:focus {
      /* width: 800px; */
   }
   &::placeholder {
      color: ${({ theme }) => theme.placeholder};
      opacity: 0.5;
   }
`;
