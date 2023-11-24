import React from 'react';
import './BookTable.css';
import { useEffect, useState, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function BookTable() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [cuisine, setCuisine] = useState([]);
  const [price, setPrice] = useState(10000);
  const [option, setOption] = useState('Ratings');
  const [location, setLocation] = useState('Delhi');

  const pageStyle = {
    background: `url(${process.env.PUBLIC_URL}/booktable-img.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const restaurantImage = {
    
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  }


  const navigate = useNavigate();

  const handleCardClick = (restaurantId) => {
    navigate.push(`/restaurant/${restaurantId}`);
  };

  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const restaurantRows = chunkArray(data, 3);

  const handleData = () => {
    Axios.post('https://table-tales-backend.onrender.com/filterCategory', {
      category: category,
      cuisine: cuisine,
      price: price,
      sort: option,
      city: location,
    }
    )
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => console.error('Error:', err));
  };
  const [debouncedDataUpdate, setDebouncedDataUpdate] = useState(1);

  useEffect(() => {
    
    if (debouncedDataUpdate !== null) {
      handleData();
    }
  }, [debouncedDataUpdate]);

  const handleChange = (e) => {
    const { id, checked, value } = e.target;

    if (id == 'c1' || id == 'c2') {
      setCategory((prevCategory) => {
        if (checked) {
          return [...prevCategory, value];
        } else {
          return prevCategory.filter((cat) => cat !== value);
        }
      });
    }

    if (id == 'd1' || id == 'd2' || id == 'd3' || id == 'd4' || id == 'd5') {
      setCuisine((prevCuisine) => {
        if (checked) {
          return [...prevCuisine, value];
        } else {
          return prevCuisine.filter((cus) => cus !== value);
        }
      });
    }

    if (id == 'e1' || id == 'e2') {
      const val = checked ? Number(value) : 10000;
      setPrice(val);
    }

    if (id == 'sort') {
      setOption(value);
    }

    if (id == 'loc') {
      setLocation(value);
    }

    // Debounce the data update for 300 milliseconds (adjust the delay as needed)
    clearTimeout(debouncedDataUpdate);
    const timeoutId = setTimeout(() => {
      setDebouncedDataUpdate(timeoutId);
    }, 300);

    setDebouncedDataUpdate(timeoutId);
  };
  return (
    <>
      <div style={pageStyle}>
        <div className="menu-container">
          <div className="sidebar">
            <Link to="/" className="table-tales-link">
              <h1 className="row justify-content-center table-tales-heading">Table Tales</h1>
            </Link>
            <h2>Filter by Category</h2>
            <div className="sidebar-item">
              <input
                type="checkbox"
                id="c1"
                name="category"
                onChange={handleChange}
                value="Veg"
              />
              <label htmlFor="c1">Veg</label>
              <br />
              <input
                type="checkbox"
                id="c2"
                name="category"
                onChange={handleChange}
                value="Non Veg"
              />
              <label htmlFor="c2">Non Veg</label>
            </div>
            <h2>Filter by Cuisine</h2>
            <div className="sidebar-item">
              <input
                type="checkbox"
                id="d1"
                name="cuisine"
                onChange={handleChange}
                value="North Indian"
              />
              <label htmlFor="d1">North Indian</label>
              <br />
              <input
                type="checkbox"
                id="d2"
                name="cuisine"
                onChange={handleChange}
                value="Chinese"
              />
              <label htmlFor="d2">Chinese</label>
              <br />
              <input
                type="checkbox"
                id="d3"
                name="cuisine"
                onChange={handleChange}
                value="Italian"
              />
              <label htmlFor="d3">Italian</label>
              <br />
              <input
                type="checkbox"
                id="d4"
                name="cuisine"
                onChange={handleChange}
                value="Continental"
              />
              <label htmlFor="d4">Continental</label>
              <br />
              <input
                type="checkbox"
                id="d5"
                name="cuisine"
                onChange={handleChange}
                value="South Indian"
              />
              <label htmlFor="d5">South Indian</label>
            </div>
            <h2>Filter by Price</h2>
            <div className="sidebar-item">
              <input
                type="checkbox"
                id="e1"
                name="e1"
                onChange={handleChange}
                value="3000"
              />
              <label htmlFor="e1">Under 3000</label>
              <br />
              <input
                type="checkbox"
                id="e2"
                name="e2"
                onChange={handleChange}
                value="2000"
              />
              <label htmlFor="e2">Under 2000</label>
              <br />
            </div>
          </div>
          <div className="menu">
            <div className="select-menu" id="s1">
              <span>Sort By </span>
              <select name="sort" id="sort" onChange={handleChange}>
                <option value="Ratings">Rating</option>
                <option value="Price">Price</option>
              </select>
            </div>
            <div className="select-menu2" id="s2">
              <span>Enter your location </span>
              <select name="loc" id="loc" onChange={handleChange}>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
              </select>
              <div className="restaurant-list">
                <div className="restaurant-rows">
                  {restaurantRows.map((row, rowIndex) => (
                    <div className="restaurant-row" key={rowIndex}>
                      {row.map((restaurant) => (
                        <Link to={`/restaurant/${restaurant._id}`} key={restaurant.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div className="restaurant-card" >
                            <img src={restaurant.Images[0]} style={restaurantImage}/>
                            <div className="rating-badge">
                              <span style={{ marginRight: '5px' }}>{parseFloat(restaurant.Ratings ?restaurant.Ratings:0)}</span>
                              <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className="card-content">
                              <h3>{restaurant.Name}</h3>
                              <p>{restaurant.Address}</p>
                              <h4>₹{restaurant.AvgPrice}</h4>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default BookTable;