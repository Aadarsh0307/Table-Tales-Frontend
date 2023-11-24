import React, { useState, useEffect } from 'react';
import "./RestaurantOne.css";
import "./BookTable.js";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Rating from 'react-rating-stars-component';
import Axios from "axios"
import { useParams } from 'react-router-dom';
import userpic from '../images/acc.png' 

// import dayjs from 'dayjs';

function RestaurantOne() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [newReview, setNewReview] = useState('');
  const [userAvatars, setUserAvatars] = useState({
    userId1: 'url-to-avatar1',
    userId2: 'url-to-avatar2',
    // Add more user avatars as needed
  });
  const [data, setData] = useState();
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false)
  const [date, setDate] = useState("")

  useEffect(()=>{

    let tod = new Date();
    handleDateChange(tod);
  },[])

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await Axios.get(`http://localhost:3000/restaurants/${id}`);
        if (isMounted && response.status === 200) {
          setData(response.data);
          setLoaded(true);
          setReviews(response.data.Reviews)
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [id, setLoaded, setData]); // Include dependencies in the array

  

  
  const handleDateChange = (date) => {

    setSelectedDate(date);
    const dateObject = date;
    const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1)
    .toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
    setDate(formattedDate)
    console.log(date)

  };

  const handleIncrement = () => {
    if (numberOfPersons < 20) {
      setNumberOfPersons((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (numberOfPersons > 1) {
      setNumberOfPersons((prevCount) => prevCount - 1);
    }
  };

  const handlePersonChange = (event) => {
    setNumberOfPersons(parseInt(event.target.value, 10));
  };

  const [selectedTime, setSelectedTime] = useState('08:00');

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };
  
 
  function calculateAverageRating() {
    if (reviews.length === 0) {
      return 0; // Return 0 if there are no reviews to avoid division by zero
    }
  
    const totalRating = reviews.reduce((sum, review) => sum + parseFloat(review.Ratings), 0);
    const averageRating = totalRating / reviews.length;

  
    return averageRating.toFixed(1);

  }

  const handleAddReview = () => {

    console.log(calculateAverageRating())
    
    Axios.post('http://localhost:3000/updateReview', {
      rid:data._id,
      rating:userRating,
      comment:newReview,
      newRating:calculateAverageRating()
    },
    {
      withCredentials:true
    })
    .then((res)=>{
      if(res.status == 200)
      {
        console.log("Review successfully added")
        window.location.reload(true)
      }
    })
    .catch((err) => alert(err))
  };


  // Function to handle "Read More" click
  const handleReadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
  };

  // Slice the reviews array to only show the visible reviews
  const visibleReviewsList = reviews.slice(0, visibleReviews);

  const Images = {
    background: `url(${process.env.PUBLIC_URL}/profile-background.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const restaurantImg = {

    width: '100%',
    height: '100%',
    borderRadius: '10px',
    objectFit: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  }

  const pageStyle = {
    background: `url(${process.env.PUBLIC_URL}/restaurant-info.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const [time, setTime] = useState('breakfast');

 
  const handleBook = (e) =>{

    console.log(date); 
    let tables = String(Math.floor(Number(numberOfPersons) / 4 )+ (Number(numberOfPersons) % 4 === 0 ? 0 : 1));
    console.log(tables); 
    console.log(time);

    Axios.post('http://localhost:3000/bookSlot', {
      R_ID:data._id,
      Day:date,
      Slot:time,
      Tables:tables,
      RName:data.Name
    },
    {
      withCredentials:true

    })
    .then((res) =>{
      console.log(res.data)
      if(res.data === "Slot not found")
      {
        alert("Slot not found")
      }
      else if(res.data === "Not enough available tables for booking")
      {
        alert("Not enough available tables for booking")
      }
      else if(res.data === "Booking already exists for the slot and day")
      {
        alert("Booking already exists for the same slot, and day")
      }
      else
      {
        alert("Successfully booked")
      }
    })
    .catch((err) => alert(err))
  }

  const handleSlot = (e) =>{
    setTime(e.target.value)
    console.log(time)
  }
  return (
    <div className="full-container" style={pageStyle}>
      <div className='info-container'>
        <div className="name-container">
          <div className="restaurant-name"  >
            <img src={data && data.Images[0]} style={restaurantImg} />
            <div className="name">{data && data.Name}</div>
            <div className="subname first">₹{data && data.AvgPrice} for two | {data && data.Address}</div><br />
            <div className="subname second">Open from 10:00 AM to 5:00 PM</div>
          </div>
          <div className="about-restaurant">
            <div className="about">
              About
            </div>
            <div className="about-description">{data && data.About}</div>
            <div className='about'>Cuisine</div>
            {data ? data.Cuisine.map((val, ind) => {

              return (
                <span>| {val} |</span>
              )

            }) : ""}

            <div className='about'>Category</div>
            {data ? data.Category.map((val, ind) => {

              return (
                <span>| {val} |</span>
              )

            }) : ""}
          </div>


          <div className="rating-reviews">Rating & Reviews</div>
          <i>Average Rating: {calculateAverageRating()}</i>
          <div className="rating-reviews-description">
            <span>Rate the Restaurant: </span>
            <Rating
              value={userRating}
              count={5}
              onChange={handleRatingChange}
              size={40} // Adjust the size as needed
              activeColor="#ffd700"
            />
          </div>

          <div>
            <div className="reviews-list">
              <textarea
                rows="4"
                cols="50"
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                placeholder="Write a review..."
                className="review-input"
              />
              <button onClick={handleAddReview} className="add-review-button">Add Review</button>
              {visibleReviewsList.map((review, index) => (
                <div className="review-item" key={index}>
                  {/* Display user avatar */}
                  <img
                    src={review.UserPic?review.UserPic:userpic}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                  />

                  {/* Display review content */}
                  <div>
                    <div>{review.Name}</div>
                    <span style={{ marginTop: '20px' }}>Rating: {review.Ratings} stars</span>
                    <div className="reviews-list">{review.Comment}</div>
                  </div>
                </div>
              ))}
            </div>
            {reviews.length > visibleReviews && (
              <button onClick={handleReadMore} className="read-more-button">
                Read More
              </button>
            )}
          </div>
          <div className='about'>Images</div>
          <div>
            {data?data.Images.map((image) =>{

              return(
                <img className='rectangle2' style={Images} src={image} />
              )

            }):""}
            
          </div>
        </div>
        <div className="book-container">
          <div className="input-group1">
            <div className="date-picker-container">
              <DatePicker
                id="dateSelector"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd MMM, yyyy" // Custom date format
                minDate={new Date()}
                placeholderText={'Select a date'}
              // readOnly
              />
            </div>
          </div>
          <div className="input-group text-light">
            <label htmlFor="personSelector">Number of Persons: </label></div>
          <div className="input-group text-light btn-container">
            <div className="btn-row">
              <button onClick={handleDecrement}>-</button>
              <span>{numberOfPersons}</span>
              <button onClick={handleIncrement}>+</button>

            </div>
          </div>
          <div className="input-group text-light">
            <label>Select your Slot: </label></div>
 
          <button className="rectangle" value="breakfast" onClick={handleSlot}>Breakfast</button>
          <button className="rectangle" value="lunch" onClick={handleSlot}>Lunch</button>
          <button className="rectangle" value="dinner" onClick={handleSlot}>Dinner</button>
          <button className="book-table-button" onClick={handleBook}>Book Table</button>
        </div>
      </div>
    </div>
  )
}


export default RestaurantOne;