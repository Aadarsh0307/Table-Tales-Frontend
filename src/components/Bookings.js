import React from 'react';
import ReservationCard from './ReservationCard';
import './Bookings.css';
import Axios from "axios"
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Bookings = () => {

  const id = useParams().id; 
  const [data, setData] = useState([]);

  useEffect(()=>{

    Axios.get('https://table-tales-backend.onrender.com/getBookingDetails/'+id)
    .then((res) =>{
      if(res.status === 200)
      { 
        console.log(res.data)
        setData(res.data)
      }
      
    })
    .catch(err => alert(err))
  },[])

  return (
    <>
      <div className="booking-heading">Reservation Details</div>
      <div className="booking-container">
        <div className="row my-3">
          {data.map((dat, index) => (
            <ReservationCard
              key={index}
              id={dat.UserId}
              bid={dat._id}
              email="john@example.com"
              phoneNumber="123-456-7890"
              numberOfPeople={dat.Tables}
              date={dat.Date}
              time={dat.Slot}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Bookings;