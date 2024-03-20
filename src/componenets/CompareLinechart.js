import React, { useEffect, useState } from "react";
import ReviewData from "../services/fetchData";
import { Chart } from "react-google-charts";
import '../styles/App.css'

const CompareLinechart = () =>{
    const [allData, setAllData] = useState([]);

    useEffect(() => {
        // Call getAllFieldData and provide a callback to handle real-time updates
        const unsubscribe = ReviewData.getAllReviews((reviews) => {
          // Update the allData state whenever the reviews change  
          setAllData(reviews);
        });
    
        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      }, []);

      // Calculate daily averages from all fields:
      const dailyAveragesTunnelma = ReviewData.calculateDailyAverage(allData, "tunnelma");
      const dailyAveragesPalvelu = ReviewData.calculateDailyAverage(allData, "palvelu");
      const dailyAveragesRuoka = ReviewData.calculateDailyAverage(allData, "ruoka");

    // Build linecahrt: combine data for all variables into a single array
    const lineData = [
        ["Päivämäärä", "keskiarvo tunnelma", "keskiarvo palvelu", "keskiarvo ruoka"],
        ...dailyAveragesTunnelma.map(({ date, averageField }, index) => [
          new Date(date).toLocaleDateString("en-GB"),
          averageField,
          dailyAveragesPalvelu[index].averageField,
          dailyAveragesRuoka[index].averageField,
        ]),
    ];

    // Linechart options
      const lineOptions = {
        title: "Päivittäiset keskiarvot - tunnelma, palvelu, ruoka",
          vAxis: {
            viewWindowMode:"explicit",
            title: "Keskiarvo",
            viewWindow: {
              max:5,
              min:0,
              
            },
            ticks: [1,2,3,4,5]
          },
          hAxis: {
            gridlines: {
              color: "transparent", // Set gridline color to transparent for only horizontal lines
            },
          },
          legend: { position: "bottom" },
          colors: ["#B83B5E", '#F08A5D', '#6A2C70'],
      }

    return (
        <div>
            <div className="linechart">
                <h1>Päivittäisten keskiarvojen vertailu kenttien suhteen </h1>
                <Chart
                chartType="LineChart"
                data={lineData}
                options={lineOptions}
                />
            </div>
        </div>
    )
}

export default CompareLinechart;