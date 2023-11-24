import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './restaurantAddForm.css';
import Axios from 'axios';

const RestaurantForm = ({ isOpen, closeModalProp }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cuisine, setCuisine] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    about: '',
    mobile: '',
    menu: '',
    category: 'Veg', // default value
    cuisine: {
      northIndian: false,
      Chinese: false,
      southIndian: false,
      Italian: false,
      Continental: false,
    },
    averagePrice: '',
  });
  const [image, setImage] = useState(null)

  useEffect(() => {
    // Open the modal when the component mounts
    if (isOpen) {
      setModalIsOpen(true);
    }
  }, [isOpen]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        setImage(base64String);
        setFormData((prevData) => ({
          ...prevData,
          menu: base64String,
        }))
      };

      // This is important to handle errors or abort events
      reader.onerror = () => {
        console.error('Error reading the file.');
      };

      // Start reading the selected file
      reader.readAsDataURL(selectedFile);
    }
  }

  const closeModal = () => {
    setModalIsOpen(false);
    // Reset the form if needed
    setFormData({
      name: '',
      city: '',
      address: '',
      about: '',
      mobile: '',
      menu: '',
      category: 'Veg',
      cuisine: {
        northIndian: false,
        Chinese: false,
        southIndian: false,
        Italian: false,
        Continental: false,
      },
      averagePrice: '',
    });
    // Call the prop function to close the modal in the parent component
    closeModalProp();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        cuisine: {
          ...prevData.cuisine,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    //console.log(formData);

    var arr = [];var images=[]; images.push(formData.menu);
    var cat = []; cat.push(formData.category)
    for(let x in formData.cuisine)
    {
      if(formData.cuisine[x])
      {
        let y = String(x);

        if(y == "northIndian")
        {
          arr.push("North Indian")
        }
        else if(y == "southIndian")
        {
          arr.push("South Indian")
        }
        else
        {
          arr.push(y)
        }
        
      }
    }

    Axios.post('https://table-tales-backend.onrender.com/newRestaurant', {
      Name:formData.name,
      City:formData.city,
      Address:formData.address,
      Images:images,
      About:formData.about,
      MobNumber:formData.mobile,
      Category:cat,
      Cuisine:arr,
      AvgPrice:Number(formData.averagePrice)
    }
    ,{
      withCredentials:true
    })
    .then((res)=>{
      if(res.status === 200)
      {
        console.log("Successfully added a restaurant")
      }
    })
    .catch((err) => alert(err))

    console.log(arr)


    // Close the modal
    closeModal();
  };

  useEffect(() => {
    // Open the modal when the component mounts
    openModal();
  }, []);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Restaurant Form"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <div className="restaurant-form-wrapper">
        <form onSubmit={handleSubmit}>
          <label className="modal-label">
            Restaurant Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="modal-input"
            />
          </label>
          <label className="modal-label">
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="modal-input"
            />
          </label>
          <label className="modal-label">
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="modal-input"
            />
          </label>
          <label className="modal-label">
            About:
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="modal-textarea"
            ></textarea>
          </label>
          <label className="modal-label">
            Mobile Number:
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="modal-input"
            />
          </label>
          <label className="modal-label">
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="fileInput"
            />
          </label>
          <label className="modal-label">
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="modal-select"
            >
              <option value="Veg">Veg</option>
              <option value="Non Veg">Non Veg</option>
            </select>
          </label>
          <label className="modal-label">
            Cuisine:
            <div className="cuisine-checkbox">
              <input
                type="checkbox"
                name="northIndian"
                checked={formData.cuisine.northIndian}
                onChange={handleChange}
              />
              <label>North Indian</label>
            </div>
            <div className="cuisine-checkbox">
              <input
                type="checkbox"
                name="Chinese"
                checked={formData.cuisine.Chinese}
                onChange={handleChange}
              />
              <label>Chinese</label>
            </div>
            <div className="cuisine-checkbox">
              <input
                type="checkbox"
                name="southIndian"
                checked={formData.cuisine.southIndian}
                onChange={handleChange}
              />
              <label>South Indian</label>
            </div>
            <div className="cuisine-checkbox">
              <input
                type="checkbox"
                name="Italian"
                checked={formData.cuisine.Italian}
                onChange={handleChange}
              />
              <label>Italian</label>
            </div>
            <div className="cuisine-checkbox">
              <input
                type="checkbox"
                name="Continental"
                checked={formData.cuisine.Continental}
                onChange={handleChange}
              />
              <label>Continental</label>
            </div>
          </label>
          <label className="modal-label">
            Average Price:
            <input
              type="text"
              name="averagePrice"
              value={formData.averagePrice}
              onChange={handleChange}
              className="modal-input"
            />
          </label>
          <button type="submit" className="modal-button">
            Submit
          </button>
        </form>
        <button onClick={closeModal} className="close-button">
          X
        </button>
      </div>
    </Modal>
  );
};

export default RestaurantForm;
