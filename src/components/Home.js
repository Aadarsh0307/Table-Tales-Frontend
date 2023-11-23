import React from 'react';
import SearchBar from './SearchBar';

function Home() {
    const pageStyle = {
    background: `url(${process.env.PUBLIC_URL}/background.jpg)`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    };

    const textStyle = {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      };

  return (
    <div style={pageStyle}>
    <div className="container mt-5">
      <div className="jumbotron" style={textStyle}>
        <h1 className="display-4" style={textStyle}>Welcome to Table Tales</h1>
        <p className="lead" style={textStyle}>Discover great places to eat around you!</p>
        <hr className="my-4" />
        <p style={textStyle}>Explore the best restaurants and dishes in your area.</p>
        <SearchBar />
      </div>
    </div>
    </div>
  );
}

export default Home;
