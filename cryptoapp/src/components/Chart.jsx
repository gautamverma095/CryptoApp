import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);




const Chart = ({ arr = [], currency, days }) => {
    const prices = []
    const date = []

    for (let i = 0; i < arr.length; i++) {

        // if (days == "24hr") {
        //     date.push(new Date(arr[i][0]).toLocaleTimeString())

        // }
     
        date.push(arr[i][0])
        //  date.push(new Date(arr[i][0].toLocaleDateString()))
        prices.push(arr[i][1])

    }

    const data = {
        labels: date,
        datasets: [{
            label: `Price in ${currency}`,
            data: prices, borderColor: "rgb(255,99,132)",
            backgroundColor: "rgb(255,99,132,0.5)"
        }]
    }

    return (
        <Line options={{
            responsive: true,
        }}
            data={data}
        />
    )
}

export default Chart