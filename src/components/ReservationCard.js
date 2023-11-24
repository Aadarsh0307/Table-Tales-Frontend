import React, { useEffect, useState } from 'react';
import './ReservationCard.css';
import Axios from "axios"

const ReservationCard = ({ id,bid, email, phoneNumber, numberOfPeople, table, date, time }) => {

  const handleEditBooking = () => {
    alert('Updating the current booking...');
  };

  const handlingCancelBooking = () => {
    alert('Canceling the current booking...');

    Axios.post('https://table-tales-backend.onrender.com/cancelBooking', {bid})
    .then((res)=>{
      if(res.status ===200)
      {
        console.log("Booking successfully deleted")
        window.location.reload(true)
      }
    })
    .catch((err) => alert(err))
    
  };

  const [Name , setName]= useState("");
  const [Email , setEmail]= useState("");
  const [Phone , setPhone]= useState("");

  useEffect(()=>{

    Axios.get('https://table-tales-backend.onrender.com/user/'+id)
    .then((res)=>{
      if(res.status === 200)
      {
        setName(res.data.Name); setEmail(res.data.Email);
        setPhone(res.data.PhoneNumber)
      }
    })

  })

  return (
    <div className="reservation-card">
      <div className="card-body">
        <div className="detail">
          <span className="label">Name:</span>
          <span className="answer">{Name}</span>
        </div>
        <div className="detail">
          <span className="label">Email:</span>
          <span className="answer">{Email}</span>
        </div>
        <div className="detail">
          <span className="label">Phone Number:</span>
          <span className="answer">{Phone}</span>
        </div>
        <div className="detail">
          <span className="label">Number of Tables:</span>
          <span className="answer">{numberOfPeople}</span>
        </div>
        
        <div className="detail">
          <span className="label">Date:</span>
          <span className="answer">{date}</span>
        </div>
        <div className="detail">
          <span className="label">Time Slot:</span>
          <span className="answer">{time}</span>
        </div>
        <div className="EditButtonContainer">
              
              <button onClick={handlingCancelBooking} className="CancelBooking-Button">
                Cancel
              </button>
            </div>
      </div>
    </div>
  );
};

export default ReservationCard;