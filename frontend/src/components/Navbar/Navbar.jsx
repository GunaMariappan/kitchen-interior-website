import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getWhatsAppLink } from "../../utils/whatsapp";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Designs", path: "/designs" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const whatsappMessage = "Hi, I found your kitchen interior website and I am interested in your services.";

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>Kitchen<span>Interiors</span></Link>

        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")} onClick={closeMenu}>{link.name}</NavLink>
            </li>
          ))}
          <li className="navbar-cta-mobile">
            <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Chat on WhatsApp</a>
          </li>
        </ul>

        <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp navbar-cta-desktop">Chat on WhatsApp</a>

        <button className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;