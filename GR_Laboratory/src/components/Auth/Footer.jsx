import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer pb-3">
      <div className="footer-container">
        <div className="footer-about">
          <h3>About Us</h3>
          <p>
            We are a leading clinical laboratory providing high-quality
            diagnostic services to patients and healthcare providers.
          </p>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/" className="text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/tests" className="text-white">
                Services
              </a>
            </li>
            <li>
              <a href="/" className="text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/" className="text-white">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: info@grlaboratory.com</p>
          <p>Phone: +91 91754XXXXX</p>
          <p>
            Address: E1B 105, Sai Milan Residency, beside Raj Empire, Sanjay
            Nagar, Dhruv Park Society, Godadara, Surat, Gujarat 394210
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Clinical Laboratory. All Rights
          Reserved.
        </p>
        <div className="social-media">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="bi bi-facebook"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="bi bi-twitter-x"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
