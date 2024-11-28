import React from "react";
import "./Footer.scss";
import { MdFacebook } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Welcome to our online shop. We provide high-quality products at the
            best prices.
          </p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <span className="icon">
                <MdEmail />
              </span>
              Email: support@shop.com
            </li>
            <li>
              <span className="icon">
                <FaPhoneAlt />
              </span>
              Phone: +123 456 789
            </li>
            <li>
              <span className="icon">
                {" "}
                <FaAddressBook />
              </span>
              Address: 123 Main Street, City
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <MdFacebook />
                </span>
                Facebook
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <RiInstagramFill />
                </span>
                Instagram
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <span className="icon">
                  <FaTwitter />
                </span>
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 IAHSEA SHOP. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
