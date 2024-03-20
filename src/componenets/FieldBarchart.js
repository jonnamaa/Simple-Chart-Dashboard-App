import React, { useEffect, useState } from "react";
import ReviewData from "../services/fetchData";
import { Chart } from "react-google-charts";
import '../styles/App.css'

const FieldBarchart = ({ fieldName }) =>{
    const [fieldData, setFieldData] = useState([]);

    useEffect(() => {
        // Call getAllFieldData and provide a callback to handle real-time updates
        const unsubscribe = ReviewData.getAllReviews((reviews) => {
          const dataList = reviews.map((review) => review[fieldName]);
          // Update the fieldData state whenever the reviews change
          setFieldData(dataList);
        });
    
        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      }, [fieldName]); // Ensure useEffect runs when fieldName changes
  
    // Build columnchart
    const columnData = [
        ['Arvioitava osio', 'Arvioiden määrä'],
        ['1',fieldData.filter(value => value === 1).length],
        ['2',fieldData.filter(value => value === 2).length],
        ['3',fieldData.filter(value => value === 3).length],
        ['4',fieldData.filter(value => value === 4).length],
        ['5',fieldData.filter(value => value === 5).length]
    ]

    // Columnchart options
    const columnOptions = {
        title: `Arvioiden jakautuminen - ${fieldName}`,
        legend: { position: 'bottom' },
        colors: ["#B83B5E"],
    }

    return (
        <div>
            <div className='columnchart'>
                <h1>Arvioiden jakautuminen kentässä {fieldName}</h1>
                <Chart
                chartType='ColumnChart'
                data={columnData}
                options={columnOptions}
                />
            </div>
        </div>
    )
}

export default FieldBarchart;