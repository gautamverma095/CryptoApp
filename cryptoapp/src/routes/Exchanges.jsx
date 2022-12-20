import React, { useState } from 'react'
import { server } from '../index'
import { useEffect } from 'react'
import axios from 'axios';
import { Container, HStack } from '@chakra-ui/react';
import ExchangeCard from '../components/ExchangeCard';
import Loaders from '../components/Loaders';

const fetchExchanges = async () => {
  return await axios.get(`${server}/exchanges`)
  
}

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([])
  const [loading,setLoading] = useState(true)


  useEffect(() => {
    fetchExchanges().then((res) => {
      // console.log(res.data);
      
      setExchanges(res.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err);
      setLoading(true)
     })
    
    
  
  }, [])

  
  return (

    <Container maxWidth={"container.xl"}>
      
      
      {loading ? <Loaders /> : <>
      
        <HStack wrap={"wrap"}>
          {
            
            exchanges.map((el) => {
              return (
                <ExchangeCard
                  key={el.id}
                name={el.name}
                img={el.image}
                rank={el.trust_score_rank}
                url={el.url}
                />
              )
            })
}        
        
        </HStack>
      
      </>}
    
    </Container>
  )
}

export default Exchanges