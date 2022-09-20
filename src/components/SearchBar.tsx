import styled, { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';
import { InputHTMLAttributes } from 'react';

interface SearchBar extends InputHTMLAttributes<HTMLInputElement> {}

const SearchBar = ({ placeholder, ...rest }: SearchBar) => {
   const theme = useTheme();
   return (
      <Wrapper>
         <Icon color={theme.colors.accent} size={24} />
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
   background: ${({ theme }) => theme.colors.card};
   width: 95%;
   max-width: 500px;
   border-radius: 100px;
   &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
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
   font-size: ${({ theme }) => theme.font.sizes.body};
   font-family: ${({ theme }) => theme.font.families.serif};
   font-size: 1.2rem;
   font-weight: 500;
   color: ${({ theme }) => theme.colors.body};
   margin-left: 1rem;
   display: inline-block;
   width: 100%;
   &:focus {
      /* width: 800px; */
   }
   &::placeholder {
      color: ${({ theme }) => theme.colors.placeholder};
      opacity: 0.5;
   }
`;
