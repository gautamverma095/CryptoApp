import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btImage from "../assets/btc.png"

const Home = () => {
  return (

    <Box bg={"blackAlpha.900"} width={"full"} height ={"85vh"}>
    
      <Image w={"full"} h={"full"} objectFit={"contain"} src={btImage}
      filter={"grayScale(1)"}
      />
      
      <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} marginTop={"-20"}>Xcrypto</Text>
    </Box>
  )
}

export default Home