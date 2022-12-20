import { Badge, Box, Button, Container, GridItem, HStack, Image, Progress, Radio, RadioGroup, Stack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Chart from '../components/Chart'
import Loaders from '../components/Loaders'
import { server } from '../index'


const singleCoin = async (id) => {

  return await axios.get(`${server}/coins/${id}`)
}
const forChart = async (id, currency, days) => {
  console.log(currency);
  return await axios.get(`${server}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
}

const CoinDetails = () => {
  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [currency, setCurrency] = useState("inr")
  const [days, setDays] = useState("7d")
  const [chartArray, setChartArray] = useState([])
  const params = useParams()

  const currencySymbol = currency == "inr" ? "₹" : currency == "eur" ? "€" : "$"


  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"]
  const switchChart = (key) => {
    console.log(key);

    switch (key) {
      case "24h":
        setDays("24h")
        break;
      case "24h":
        setDays("24h")
        break;

      case "7d":
        setDays("7d")
        break;

      case "14d":
        setDays("14d")
        break;

      case "30d":
        setDays("30d")
        break;

      case "60d":
        setDays("60d")
        break;

      case "200d":
        setDays("200d")
        break;

      case "1y":
        setDays("1y")
        break;

      case "max":
        setDays("max")
        break;

      default:
        break;
    }

  }
  useEffect(() => {
    singleCoin(params.id).then((res) => {
      setCoin(res.data)
      setLoading(false)
    }).catch((err) => {
      console.log(err);
      setLoading(true)
    })

    forChart(params.id, currency, days).then((res) => {
      setChartArray(res.data.prices)
    }).catch((err) => {
      console.log(err);
      setLoading(true)
    })



  }, [params.id, currency, days])


  
  return (
    <Container maxWidth={"container.xl"}>

      {
        loading ? <Loaders /> : (

          <>
            <Box width={"full"} borderWidth={1}>
              <Chart arr={chartArray} currency={currencySymbol} />


            </Box>

            <HStack padding={"4"} wrap={"wrap"}>
              {
                btns.map((i) => {
                  return (
                    <Button key={i} onClick={() => switchChart(i)}>{i}</Button>
                  )
                })
              }

            </HStack>
            <RadioGroup value={currency} onChange={setCurrency}>
              <HStack spacing={"4"}>
                <Radio value='inr'>INR</Radio>
                <Radio value='usd'>USD</Radio>
                <Radio value='eur'>EUR</Radio>
              </HStack>

            </RadioGroup>

            <VStack padding={"16"} spacing={"4"} alignItems={"flex-start"}>
              <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
                Last updated on {Date(coin.market_data.last_updated).split("G")[0]}
              </Text>

              <Image src={coin.image.large} width={"16"} height={"16"} />
              <Stat>
                <StatLabel>
                  {coin.name}
                </StatLabel>

                <StatNumber>{currencySymbol} {coin.market_data.current_price["inr"]}</StatNumber>

                <StatHelpText>
                  <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                  {coin.market_data.price_change_percentage_24h}%
                </StatHelpText>
              </Stat>
              <Badge fontSize={"2xl"} bgColor={"blackAlpha.900"} color={"white"}  >
                {`#${coin.market_cap_rank}`}
              </Badge>
              <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

              <Box width={"full"} p={"4"}>
                <Item title={"Max supply"} value={coin.market_data.max_supply} />
                <Item title={"Circulating supply"} value={coin.market_data.circulating_supply} />

                <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
                <Item title={"All time low "} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />

                <Item title={"All time high "} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
              </Box>
            </VStack>

          </>
        )}
    </Container>
  )
}


const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} width={"full"} my={"4"} >
      <Text fontFamily={"Bebsas Neue"} letterSpacing={"wide"}>{title}</Text>
      <Text fontFamily={"Bebsas Neue"} letterSpacing={"wide"}>{value}</Text>

    </HStack>
  )

}


const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} width={"full"} >
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24 hr</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  )
}

export default CoinDetails