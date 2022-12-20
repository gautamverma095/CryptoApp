import React, { useState } from 'react'
import { server } from '../index'
import { useEffect } from 'react'
import axios from 'axios';
import { Box, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import ExchangeCard from '../components/ExchangeCard';
import CoinCard from '../components/CoinCard';
import Pagination from '../components/Pagination';
import Loaders from '../components/Loaders';
import Chart from '../components/Chart';

const fetchCoins = async (currency,page) => {
  return await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}&per_page=10`)

}

const Coins = () => {

  
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("inr")
  const [totalPage,setTotalPage] = useState(10)

  const currencySymbol = currency == "inr" ? "₹" : currency == "eur" ? "€" : "$"
  


  useEffect(() => {
    fetchCoins(currency,page).then((res) => {
      // console.log(res.data);

      setCoins(res.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err);
      setLoading(true)
    })



  }, [currency, page])
  
  const handlePage = (page) => {
setPage(page)
  }

  return (


    <Container maxWidth={"container.xl"}>


      {loading ? <Loaders /> : <>
        
       

        <RadioGroup value= {currency} onChange = {setCurrency}>
          <HStack spacing={"4"}>
            <Radio value='inr'>INR</Radio>
            <Radio value='usd'>USD</Radio>
            <Radio value='eur'>EUR</Radio>
          </HStack>

        </RadioGroup>

        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {

            coins.map((el) => {
              return (
                <CoinCard
                  key={el.id}
                  id={el.id}
                  price={el.current_price}
                  name={el.name}
                  img={el.image}
                  rank={el.trust_score_rank}
                  url={el.url}
                  symbol={el.symbol}
                  currencySymbol={currencySymbol}
                />
              )
            })
          }

        </HStack>
        <HStack marginLeft={"30%"} width={"full"} overflowX ={"auto"} padding={"8"}>
          
          <Pagination 
            totalPage={totalPage}
            currentPage={page}
            handlePage={handlePage}
            
          />
        
        </HStack>

      </>}

    </Container>
  )
}

export default Coins