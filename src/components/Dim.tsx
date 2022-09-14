import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';

import { dimUrlAtom } from '~/atoms/dimUrlAtom';
import GoodLink from '~/components/GoodLink';

const Dim = () => {
   const [dimUrl, setDimUrl] = useAtom(dimUrlAtom);
   return (
      <AnimatePresence>
         {dimUrl && (
            <GoodLink to={dimUrl}>
               <DimDiv
                  onClick={() => setDimUrl(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               />
            </GoodLink>
         )}
      </AnimatePresence>
   );
};

export default Dim;

const DimDiv = styled(motion.div)`
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   border: none;
   cursor: default;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   z-index: 3;
`;
