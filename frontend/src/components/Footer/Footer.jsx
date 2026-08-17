import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3 className="footer-logo">
            Kitchen<span>Interiors</span>
          </h3>
          <p className="footer-desc">
            Crafting premium, functional, and beautiful kitchen spaces
            tailored to your lifestyle.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/designs">Designs</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li>Phone: +91 99999 99999</li>
            <li>Email: info@kitcheninteriors.com</li>
            <li>Location: Coimbatore, Tamil Nadu</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Kitchen Interiors. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;