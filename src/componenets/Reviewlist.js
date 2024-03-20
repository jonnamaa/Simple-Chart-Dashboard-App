import React, { useEffect, useState } from "react";
import ReviewData from "../services/fetchData";
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import '../styles/App.css'

const ReviewList = () =>{
    const [reviews, setReviews] = useState([]);
    const [visibleItems, setVisibleItems] = useState(5);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Call getAllReviews and provide a callback to handle real-time updates
        const unsubscribe = ReviewData.getAllReviews((reviews) => {
            // Update the data whenever the reviews change
            const sortedReviews = reviews.map((review) => ({ ...review, id: review.id })).sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
            // Update the reviews state whenever the reviews change
            setReviews(sortedReviews);
        });

        // Cleanup the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    // Button's functionality
    const showAllItems = () => {
        setVisibleItems(reviews.length); // Set visible items to the total number of items
        setIsExpanded(true);
    };

    // Button's functionality
    const minimizeList = () => {
        setVisibleItems(5); // Set visible items back to the initial 5
        setIsExpanded(false);
    };
    
    return (
        <>
        <h1>Asiakaspalautteet</h1>
        <ListGroup as="ol" numbered>
            {reviews.slice(0, visibleItems).map((review) => (
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                >
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{review.palaute}</div>
                        <small className="text-muted">
                            {new Date(review.timestamp.toDate()).toLocaleDateString()}
                        </small>
                    </div>
                    <Badge bg="" pill style={{backgroundColor: '#B83B5E'}} >
                        {`tunnelma:${review.tunnelma} palvelu:${review.palvelu} ruoka:${review.ruoka}`}
                    </Badge>
                </ListGroup.Item>
            ))}
        </ListGroup>
        {isExpanded ? (
                <Button variant="" style={{backgroundColor: '#6A2C70', color: 'white'}} onClick={minimizeList}>
                    Pienennä
                </Button>
            ) : (
                <Button variant="" style={{backgroundColor: '#6A2C70', color: 'white'}} onClick={showAllItems}>
                    Näytä kaikki
                </Button>
            )}
        </>
    )
}

export default ReviewList;