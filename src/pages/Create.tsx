import { motion } from "framer-motion"
import styled from 'styled-components'


const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Home</h1>
    </motion.div>
  )
}

export default Home
