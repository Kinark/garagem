import { motion } from 'framer-motion';
import { useRef, useState, useEffect, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { useTimeoutWhen } from "rooks";

interface DisguisedInputProps extends InputHTMLAttributes<HTMLInputElement> {
   edit: boolean;
   tag?: keyof JSX.IntrinsicElements;
   value: string | number | undefined;
   previewProps?: {
      [key: string]: any;
   };
}

const DisguisedInput = ({
   className,
   edit,
   tag = 'div',
   value,
   previewProps,
   ...rest
}: DisguisedInputProps) => {
   const [width, setWidth] = useState(0);
   const valueRef = useRef<HTMLDivElement>(null);
   const wrapperRef = useRef<HTMLDivElement>(null);

   const updateWidth = () => {
      if (!valueRef.current) return;
      setWidth(valueRef.current.getBoundingClientRect().width);
   };

   useEffect(updateWidth, [value]);

   useEffect(() => {
      window.addEventListener('load', updateWidth);
      return () => {
         window.removeEventListener('load', updateWidth);
      };
   }, []);

   useTimeoutWhen(updateWidth, 350, !!width);

   return (
      <Wrapper ref={wrapperRef} className={className}>
         <InputBg
            animate={{
               margin: edit ? '-4px -8px' : '0px 0px',
               padding: edit ? '4px 8px' : '0px 0px',
               backgroundColor: `rgba(0,0,0,0.${edit ? 1 : 0})`,
            }}
         />
         <InputWrapper edit={edit}>
            <Input
               {...rest}
               value={value}
               style={{ width: Math.max(width, 20) }}
            />
         </InputWrapper>
         <Value ref={valueRef} as={tag} edit={edit} {...previewProps}>
            {value}
         </Value>
      </Wrapper>
   );
};

export default DisguisedInput;

const toggle = (editCondition: boolean = false) => css<{ edit: boolean }>`
   position: ${({ edit }) =>
      edit === editCondition ? 'absolute' : 'relative'};
   opacity: ${({ edit }) => (edit === editCondition ? 0 : 1)};
   pointer-events: ${({ edit }) => (edit === editCondition ? 'none' : 'auto')};
`;

const aCenter = css`
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   margin: auto;
`;

const InputWrapper = styled.div`
   ${toggle()};
   ${aCenter};
   height: 1em;
`;

const Input = styled.input`
   width: min-content;
   height: 1em !important;
   outline: none;
   background: transparent;
   border: none;
   font: inherit !important;
   color: inherit !important;
   line-height: inherit !important;;
   padding: 0;
   margin: 0;
   box-sizing: border-box;
`;

const InputBg = styled(motion.div)`
   ${aCenter};
   position: absolute;
   border-radius: 8px;
   width: 100%;
   height: 100%;
   font-size: 0;
   box-sizing: content-box;
`;

const Wrapper = styled.div`
   position: relative;
`;

const Value = styled.div`
   ${toggle(true)};
   margin: 0;
   font: inherit;
   height: 1em;
`;
