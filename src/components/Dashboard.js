import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import AdminProfile from './AdminProfile';
import RestaurantForm from './RestaurantForm';
import Axios from "axios"

const restaurants = {
  
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  display: 'flex',
  flexDirection: 'row',
};

const contentArray = [
  {
    id: 1,
    name: 'Content 1',
  },
  {
    id: 2,
    name: 'Content 2',
  },
  {
    id: 3,
    name: 'Content 3',
  },
];




const pageStyle = {
  background: `url(${process.env.PUBLIC_URL}/admindashboard.jpg)`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState([])

  const openModal = () => {
    setModalIsOpen(true);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  const navigate = useNavigate();

  useEffect(()=>{

    Axios.get('http://localhost:3000/findRestaurantAdmin',{
      withCredentials:true
    })
    .then((res)=>{

      if(res.status === 200)
      {
        
        setData(res.data)
      }
    })
    .catch((err) => console.log(err))
  },[])

  const handlingLogout = () => {
    const isConfirmed = window.confirm('Are you sure you want to log out?');

    if (isConfirmed) {
    alert('Logging out...');

    Axios.post('http://localhost:3000/logout',{ans:1},
    {
      withCredentials:true
    })
    .then((res)=>{
      if(res.status === 200)
      {
        navigate('/');
        window.location.reload(true)
      }
    })
    .catch((err)=> alert(err))
    }
  };
  const AdminRestoContainer = ({ content }) => {
    
    return (
      <Link to={`/booking-list/`+content._id} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="content-card-container">
          <div className="content-card" >
            <img src={content && content.Images[0]} />
            <div className="card-body">
              <div className="content-text">{content && content.Name}
                
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const handleAddRestoClick = () => {
    openModal();
  };

  return (
    <div className="admin-page-container" style={pageStyle}>
      <AdminProfile />
      <div className="admin-heading">Your Restaurants</div>
      
        <div className="admin-container">
          
            {data.map((content, index) => (
              <AdminRestoContainer key={index} content={content} />
            ))}
            <div className="admin-card" onClick={openModal} style={{ width: '200px' }}>
              <button className="add-restro-button">+</button>
            </div>
         
        </div>
      
      {modalIsOpen && <RestaurantForm closeModalProp={closeModal} />}
      <div className="Logout-ButtonContainer">
          <button onClick={handlingLogout} className="Logout-Button">
            Logout
          </button>
        </div>
    </div>
  );
};

export default Dashboard;