import React, { useEffect, useState } from "react";
import ReviewData from "../services/fetchData";
import { Chart } from "react-google-charts";
import '../styles/App.css';

const Barchart = () => {
    const [reviews, setReviews] = useState([]);
    const [tunnelma, setTunnelma] = useState(0);
    const [palvelu, setPalvelu] = useState(0);
    const [ruoka, setRuoka] = useState(0);

    useEffect(() => {
        // Call getAllReviews and provide a callback to handle real-time updates
        const unsubscribe = ReviewData.getAllReviews((updatedReviews) => {
            // Update the reviews state whenever the reviews change
            setReviews(updatedReviews);
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array, useEffect runs once when the component mounts

    useEffect(() => {
        // Update data whenever reviews change
        updateData(reviews);
    }, [reviews]); // Run whenever reviews change

    // Function for calculating average for a field
    const getAverageForField = (field) => {
        try {
            const dataList = reviews.map((review) => review[field]);
            const sum = dataList.reduce((acc, val) => acc + val, 0);
            const average = sum / dataList.length;
            return average.toFixed(2);
        } catch (error) {
            console.error("Error calculating average:", error);
            return null;
        }
    };

    // UpdateData for setting useState
    const updateData = () => {
        const tunnelmaAverage = getAverageForField('tunnelma');
        setTunnelma(parseFloat(tunnelmaAverage));
        const palveluAverage = getAverageForField('palvelu');
        setPalvelu(parseFloat(palveluAverage));
        const ruokaAverage = getAverageForField('ruoka');
        setRuoka(parseFloat(ruokaAverage));
    };

    // Build barchart
    const barData = [
        ['Arvioitava osio', 'arviopisteiden keskiarvo'],
        ['Ruoka', ruoka],
        ['Tunnelma', tunnelma],
        ['palvelu', palvelu]
    ];

    // Barchart options
    const options = {
        title: 'Asiakasarviopisteiden keskiarvot',
        legend: { position: 'bottom' },
        hAxis: {
            viewWindowMode: 'explicit',
            viewWindow: {
                max: 5,
                min: 0,
            },
            ticks: [0, 1, 2, 3, 4, 5]
        },
        colors: ['#B83B5E'],
    };

    return (
        <div>
            <div className='barchart'>
                <h1>Asiakaspisteiden keskiarvot kaikissa kentissä</h1>
                <Chart
                    chartType='BarChart'
                    data={barData}
                    options={options}
                />
            </div>
        </div>
    );
}

export default Barchart;

