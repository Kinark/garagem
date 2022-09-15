import styled from 'styled-components';

const Divider = () => {
   return (
      <Wrapper>
         <Line />
         <Circle />
         <Line />
      </Wrapper>
   );
};

export default Divider;

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   Width: 70%;
`;

const Line = styled.div`
   height: 1px;
   width: 100%;
   background: ${({ theme }) => theme.body};
`;

const Circle = styled.div`
   height: 5px;
   width: 5px;
   border-radius: 50%;
   flex-shrink: 0;
   background: ${({ theme }) => theme.body};
   margin: 0 5px;
`;
