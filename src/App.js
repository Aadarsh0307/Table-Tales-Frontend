// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import RestaurantOne from './components/RestaurantOne';
import RestaurantLogin from './components/RestaurantLogin';
import SearchBar from './components/SearchBar';
import BookTable from './components/BookTable';
import Home from './components/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurant-login" element={<RestaurantLogin />} />
          <Route path="/restaurant/:id" element={<RestaurantOne />} />
          <Route path="/search-bar" element={<SearchBar />} />
          <Route path="/book-table" element={<BookTable />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
