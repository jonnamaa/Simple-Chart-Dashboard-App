import { db } from "../firebase-config";
import { 
    collection,
    onSnapshot
} from "firebase/firestore";

class ReviewData {
   
    // getAllReviews method listening for real-time updates
    getAllReviews = (callback) => {
        const reviewsCollectionRef = collection(db, "reviews");

        const unsubscribe= onSnapshot(reviewsCollectionRef, (querySnapshot) => {
            const reviews = [];
            querySnapshot.forEach((doc) => {
                reviews.push(doc.data());
            });
            callback(reviews);
        });
        return unsubscribe;
    }

    // Caluculate daily averages from field
    calculateDailyAverage = (dataList, field) => {
        // Map to store daily averages
        const dailyAverages = new Map();
      
        // Iterate through the data list
        dataList.forEach((item) => {
          // Convert Firestore timestamp to Date
          const timestamp = new Date(item.timestamp.seconds * 1000 + item.timestamp.nanoseconds / 1e6);
      
          // Extract date in the format YYYY-MM-DD
          const dateKey = timestamp.toISOString().split('T')[0];
      
          // Calculate average in field
          if (!dailyAverages.has(dateKey)) {
            dailyAverages.set(dateKey, { sum: 0, count: 0 });
          }
      
          const currentAverage = dailyAverages.get(dateKey);
          currentAverage.sum += item[field];
          currentAverage.count += 1;
        });
      
        // Calculate the final average for each date
        const result = [];
      
        for (const [dateKey, { sum, count }] of dailyAverages) {
          const averageField = sum / count;
          result.push({ date: new Date(dateKey), averageField });
        }
      
        // Sort the result by date
        result.sort((a, b) => (a.date) - (b.date));
      
        return result;
      };

}

export default new ReviewData();

