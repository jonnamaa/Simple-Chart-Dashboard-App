import React, { useEffect, useState } from "react";
import ReviewData from "../services/fetchData";
import '../styles/App.css'

const TotalComponent = () =>{
    const [count, setCount] = useState(0);

    useEffect(() => {
        // Call getAllReviews and provide a callback to handle real-time updates
        const unsubscribe = ReviewData.getAllReviews((reviews) => {
          // Set the count based on the length of the reviews array
          setCount(reviews.length);
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array, useEffect runs once when the component mounts


    return (
        <div className="totalCount">
            <h1>Annetut arviot yhteensä</h1>
                    <h2>{count} </h2>
        </div>
    )
}

export default TotalComponent;