import React, { useEffect, useState } from "react";
import ReviewData from "../services/fetchData";
import { Chart } from "react-google-charts";
import '../styles/App.css'

const FieldLinechart = ({ fieldName }) =>{
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        // Call getAllFieldData and provide a callback to handle real-time updates
        const unsubscribe = ReviewData.getAllReviews((reviews) => {
          // Update the allData state whenever the reviews change
          setAllData(reviews);
        });
    
        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      }, []); // No dependencies, useEffect runs once when the component mounts

      // Calculate dailyaverages from field
      const dailyAverages = ReviewData.calculateDailyAverage(allData, fieldName);
      //console.log(dailyAverages);

      // Build linechart
      const lineData = [
        ["Päivämäärä", `keskiarvo ${fieldName}`],
        ...dailyAverages.map(({ date, averageField }) => [new Date(date).toLocaleDateString("en-GB"), averageField]),
      ];

      // Linechart options
      const lineOptions = {
        title: `Päivittäiset keskiarvot - ${fieldName}`,
          vAxis: {
            viewWindowMode:"explicit",
            title: `Keskiarvo ${fieldName}`,
            viewWindow: {
              max:5,
              min:0,
              
            },
            ticks: [1,2,3,4,5]
          },
          hAxis: {
            gridlines: {
              color: "transparent", // For only horizontal lines only
            },
          },
          legend: { position: "bottom" },
          colors: ["#B83B5E"],
      }

    return (
        <div>
            <div className="linechart">
                <h1>Keskiarvo aikajanalla kentässä {fieldName}</h1>
                <Chart
                chartType="LineChart"
                data={lineData}
                options={lineOptions}
                />
            </div>
        </div>
    )
}

export default FieldLinechart;