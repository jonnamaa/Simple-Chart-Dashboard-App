import React, { useEffect, useState } from "react";
import ReviewData from "../services/fetchData";
import { Chart } from "react-google-charts";
import '../styles/App.css'

const ReviewCountInTimeline = () =>{
    const [reviewCounts, setReviewCounts] = useState([]);

    useEffect(() => {
        // Call getReviewCounts and provide a callback to handle real-time updates
        const unsubscribe = ReviewData.getAllReviews((reviews) => {
          const reviewCountsPerDay = calculateReviewCounts(reviews);
          // Update the reviewCounts state whenever the reviews change
          setReviewCounts(reviewCountsPerDay);
        });
    
        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
      }, []); // No dependencies, useEffect runs once when the component mounts

    // Function calculate review counts
    const calculateReviewCounts = (dataList) => {
        // Map to store review counts
        const reviewCountsMap = new Map();
      
        // Iterate through the data list
        dataList.forEach((item) => {
          // Convert Firestore timestamp to Date
          const timestamp = new Date(item.timestamp.seconds * 1000 + item.timestamp.nanoseconds / 1e6);
      
          // Extract date in the format YYYY-MM-DD
          const dateKey = timestamp.toISOString().split('T')[0];
      
          // Count the reviews for each date
          if (!reviewCountsMap.has(dateKey)) {
            reviewCountsMap.set(dateKey, 1);
          } else {
            reviewCountsMap.set(dateKey, reviewCountsMap.get(dateKey) + 1);
          }
        });
      
        // Convert map to an array for chart data
        const result = [];
      
        for (const [dateKey, count] of reviewCountsMap) {
          result.push({ date: new Date(dateKey), count });
        }
      
        // Sort the result by date
        result.sort((a, b) => (a.date) - (b.date));
      
        return result;
      };
  
    // Build chart
    const chartData = [
        ["Päivämäärä", "Arvosteluiden määrä"],
        ...reviewCounts.map(({ date, count }) => [new Date(date).toLocaleDateString("en-GB"), count]),
      ];
    
    // Chart otions
    const chartOptions = {
        title: "Arvosteluiden määrä ajan kuluessa",
        vAxis: {
          title: "Arvosteluiden määrä",
          minValue: 0,
        },
        legend: { position: "bottom" },
        colors: ["#B83B5E"],
    };

    return (
        <div>
            <div className="linechart">
                <h1>Arvosteluiden määrä ajan kuluessa</h1>
                <Chart
                chartType="LineChart"
                data={chartData}
                options={chartOptions}
                />
            </div>
        </div>
    )
}

export default ReviewCountInTimeline;