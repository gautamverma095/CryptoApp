import React from 'react'
import { Route, Routes } from "react-router-dom"
import CoinDetails from './CoinDetails'
import Coins from './Coins'
import Exchanges from './Exchanges'
import Home from './Home'


const AllRoutes = () => {
    return (
        <div>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/coins" element={<Coins />} />
                <Route path= "/exchanges" element={<Exchanges />} />
                <Route path= "/coins/:id" element={<CoinDetails />} />




            </Routes>



        </div>
    )
}

export default AllRoutes