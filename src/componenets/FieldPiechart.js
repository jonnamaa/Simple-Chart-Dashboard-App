import React, { useEffect, useState } from "react";
import ReviewData from "../services/fetchData";
import { Chart } from "react-google-charts";
import { Link } from 'react-router-dom';
import '../styles/App.css'

const FieldPiechart = ({ fieldName, targetPage }) => {
    const [reviews, setReviews] = useState([]);
    const [fieldAverage, setFieldAverage] = useState('');

    useEffect(() => {
        // Call getAllReviews and provide a callback to handle real-time updates
        const unsubscribe = ReviewData.getAllReviews((updatedReviews) => {
            // Update the reviews whenever the reviews change
            setReviews(updatedReviews);
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array, useEffect runs once when the component mounts

    useEffect(() => {
        // Update data whenever reviews change
        updateData(reviews);
    }, [reviews]); // Run whenever reviews change

    // Function calculate averages for fields
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
        const dataAverage = getAverageForField(fieldName);
        setFieldAverage(dataAverage);
    };

    // Values for pie chart
    const maxAverage = 5;
    const averageSubstraction = maxAverage - parseFloat(fieldAverage);

    // Build piechart
    const pieData = [
        ['Arvio', 'Keskiarvo', { role: 'tooltip', p: { html: true } }],
        [`Kentän ${fieldName} keskiarvo`, parseFloat(fieldAverage), `Keskiarvo: <b>${parseFloat(fieldAverage).toFixed(2)}</b>`],
        [' ', parseFloat(averageSubstraction), 'Matka maksimiin'],
    ];

    // Piechart options
    const pieOptions = {
    title: `Kentän keskiarvo suhteessa maksimiin (Max=5)`,
    pieHole: 0.5,
    legend: 'none',
    pieSliceText: 'none', 
    colors: ['#6A2C70', '#B83B5E'],
    tooltip: { 
        isHtml: true,
        text: 'none' 
    }
    };

    return (
        <div>
            <div className='piechart'>
                <Link 
                    style={{
                        color: 'black', 
                        textDecoration: 'none',
                    }} 
                    to={`/${targetPage}`}>
                    <h1>Tyytyväisyystaso kentässä {fieldName}</h1>
                </Link>
                <Chart
                chartType='PieChart'
                data={pieData}
                options={pieOptions}
                />
                <div className="end-link">
                <Link 
                    style={{
                        color: 'black', 
                    
                    }} 
                    to={`/${targetPage}`}>
                    <p>Tarkastele kenttää {fieldName}<span>&raquo;</span></p>
                </Link>
                </div>
            </div>
        </div>
    )
}

export default FieldPiechart;