import React from 'react'
import { VStack, Image, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => {
    return (
        <Link to={`/coins/${id}`}>
            <VStack width={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"}
                transition={"all 0.3s"} margin={"4"}

                css={{

                    "&:hover": {
                        transform: "scale(1.1)"
                    }
                }}
            >
                <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"} />
                <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
                <Heading size={"md"} noOfLines={1}>{name}</Heading>

                <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
            </VStack>

        </Link>
    )
}

export default CoinCard