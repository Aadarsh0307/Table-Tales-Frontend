import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function ProfilePage() {

  const nav = useNavigate()
  const [username, setUsername] = useState('Your Username');
  const [profilePicture, setProfilePicture] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [email, setEmail] = useState('youremail@example.com');
  const [recentBookings, setRecentBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {

   
    Axios.post('https://table-tales-backend.onrender.com/user', { ans: "yes" }, {
      withCredentials: true,

    })
      .then((res) => {
        if (res.status == 200) {
          const { Name, Email, PhoneNumber, ProfilePic } = res.data;
          setProfilePicture(ProfilePic); setSelectedProfilePicture(ProfilePic)
          setUsername(Name); setEmail(Email); setPhoneNumber(PhoneNumber);
          setNewEmail(Email); setNewUsername(Name); setNewPhoneNumber(PhoneNumber);
        }
      })
      .catch(err => alert(err))
  }, [username, email, phoneNumber])

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = async() =>{

    await Axios.post("https://table-tales-backend.onrender.com/logout",{data:1}, {
      withCredentials:true
    })
    .then((res)=>{
      if(res.status == "200")
      {
        nav('/');
        window.location.reload(true)
      }
    })
  }

  const handleSave = () => {
    // Make API calls to update the data on the backend with the new values
    // After successful updates, set setIsEditing(false);
    alert('Saving changes...');
    Axios.post('https://table-tales-backend.onrender.com/update', {
      Name: newUsername, Email: newEmail, PhoneNumber: newPhoneNumber,
      ProfilePic: profilePicture
    }
      , {
        withCredentials: true
      })
      .then((res) => {
        if (res.status == 200) {
          console.log(res)

          setSelectedProfilePicture(profilePicture)
          setUsername(newUsername);
          setEmail(newEmail);
          setPhoneNumber(newPhoneNumber);
        }
      })
      .catch((err) => alert(err))
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset the new values and set editing to false
    alert('Canceling changes...');
    setProfilePicture(selectedProfilePicture)
    setNewUsername(username);
    setNewEmail(email);
    setNewPhoneNumber(phoneNumber);
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePicture(base64String);
      };

      // This is important to handle errors or abort events
      reader.onerror = () => {
        console.error('Error reading the file.');
      };

      // Start reading the selected file
      reader.readAsDataURL(selectedFile);
    }

  };

  const handleUpdateBooking = (e) => {
    // Placeholder for updating the current booking
    console.log(e.target.id)
  };

  const handleCancelBooking = (e) => {
    // Placeholder for canceling the current booking
    alert('Canceling the current booking...');
    
    Axios.post('https://table-tales-backend.onrender.com/cancelBooking', {bid:e.target.id})
    .then((res)=>{
      if(res.status == 200)
      {
        console.log("Successfully cancelled booking")
        window.location.reload(true)
      }
    })
    .catch((err) => alert(err))
  };

  const handleEditPhoto = () => {
    // Placeholder for handling the edit photo action
    alert('Editing profile photo...');
  };

  const handleClear = () =>{

    Axios.put('https://table-tales-backend.onrender.com/clearPastBookings',{data:1},
    {
      withCredentials:true
    })
    .then((res)=>{
      if(res.status === 200 && res.data.deletedCount>0)
      {
        console.log(res);
        window.location.reload(true)

      }
      
    })
    .catch((err)=>alert(err))
  }

  useEffect(() => {
    // Mock data for demonstration

    Axios.get('https://table-tales-backend.onrender.com/getBookings', {
      withCredentials: true
    })
      .then((res) => {
        console.log(res)
        if (res.data == "No booking found") {

        }
        else {
          
          const currentDate = new Date();
          const allBookings = res.data;
  
          const pastBookings = allBookings.filter(booking => new Date(booking.Date) < currentDate);
          const futureBookings = allBookings.filter(booking => new Date(booking.Date) >= currentDate);
  
          setRecentBookings(pastBookings);
          setCurrentBooking(futureBookings);
        }
      })
      .catch((err) => alert(err))

    const dummyRecentBookings = [
      {
        bookingId: '12345',
        dayBooked: 'Monday',
        dateBooked: '2023-11-20',
        timeBooked: '10:00 AM',
        numSeatsBooked: 2,
      },
      {
        bookingId: '67890',
        dayBooked: 'Wednesday',
        dateBooked: '2023-11-22',
        timeBooked: '02:30 PM',
        numSeatsBooked: 3,
      },
    ];

    const dummyCurrentBooking = {
      bookingId: 'ABCDE',
      dayBooked: 'Friday',
      dateBooked: '2023-11-24',
      timeBooked: '12:15 PM',
      numSeatsBooked: 1,
    };



  }, []);

  const pageStyle = {
    background: `url(${process.env.PUBLIC_URL}/profile-background.jpg)`,
  };

  return (
    <div className="ProfileContainer" style={pageStyle}>
      <div className="WhiteBackground">
        <h1>Profile View</h1>

        <div className="AvatarUpload">
          <div className="AvatarPreview" onClick={() => document.getElementById('fileInput') && document.getElementById('fileInput').click()}>
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div className="DefaultProfilePicture" />
            )}
          </div>

          {isEditing && (
            <div className="AvatarEdit">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                id="fileInput"
              />
              <label htmlFor="fileInput" onClick={handleEditPhoto}></label>
            </div>
          )}
        </div>


        <div className="UserInfoContainer">
          <p>
            <strong>Username:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="EditInput"
              />
            ) : (
              <span>{newUsername}</span>
            )}
          </p>

          <p>
            <strong>Email:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="EditInput"
              />
            ) : (
              <span>{newEmail}</span>
            )}
          </p>

          <p>
            <strong>Phone Number:</strong>{' '}
            {isEditing ? (
              <input
                type="text"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                className="EditInput"
              />
            ) : (
              <span>{newPhoneNumber}</span>
            )}
          </p>
        </div>

        <div className="EditButtonContainer">
          {isEditing && (
            <>
              <button onClick={handleSave} className="SaveButton" >
                Save
              </button>
              <button onClick={handleCancel} className="CancelButton">
                Cancel
              </button>
            </>
          )}
          {!isEditing && (
            <button onClick={handleEdit} className="EditButton">
              Edit Profile
            </button>
          )}
        </div>

        <h2>Current Booking</h2>
        {currentBooking && currentBooking.map((booking) => {

          return (
            <>
              <div className="BookingBox">
                <div className="BookingCard">
                  <h4>Booking ID: {booking._id}</h4>
                  <p><strong>Restaurant:</strong> {booking.RName}</p>
                  <p><strong>Date:</strong> {booking.Date}</p>
                  <p className='cap'><strong>Time Slot:</strong> {booking.Slot}</p>
                  <p><strong>Number of Tables:</strong> {booking.Tables}</p>
                </div>

                <div className="EditButtonContainer">

                  <button onClick={handleCancelBooking} id={booking._id} className="CancelBookingButton">
                    Cancel Booking
                  </button>
                </div>

              </div>
            </>
          )
        })
        
        }
         <div className="LogoutButtonContainer">
          <button onClick={handleClear} className="LogoutButton2">
            Clear Past Bookings
          </button>
        </div>
        {!currentBooking && (
          <p className="NoBookingMessage">No current booking.</p>
        )}
        <h2 className="RecentBookingsTitle">Past Bookings</h2>
        <div className="RecentBookingsList">
          {recentBookings && recentBookings.map((booking) => (
            <div className="BookingBox" key={booking._id}>
              <div className="BookingCard">
                <h4>Booking ID: {booking._id}</h4>
                <p><strong>Restaurant:</strong> {booking.RName}</p>
                <p><strong>Date:</strong> {booking.Date}</p>
                <p className='cap'><strong>Time Slot:</strong> {booking.Slot}</p>
                <p><strong>Number of Tables Booked:</strong> {booking.Tables}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="LogoutButtonContainer">
          <button onClick={handleLogout} className="LogoutButton">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;