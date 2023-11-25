import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>About Us</h5>
            <h7>
            At Table Tales, we are passionate about creating memorable dining 
            xperiences. Our platform connects diners with a diverse range of restaurants, offering a delightful journey for food enthusiasts. Discover new flavors, explore unique cuisines, 
            and make every meal a story to remember with Table Tales.
            </h7>
          </div>
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: contact@tabletales.com</li>
              <li>Phone: +123 456 7890</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p className="text-center">
                &copy; {new Date().getFullYear()} Table Tales. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
