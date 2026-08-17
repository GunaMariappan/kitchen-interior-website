import { Link } from "react-router-dom";
import { getWhatsAppLink } from "../../utils/whatsapp";
import "./Hero.css";

const Hero = () => {
  const message = "Hi, I found your kitchen interior website and I am interested in your services.";

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>Transform Your Kitchen Into a Masterpiece</h1>
        <p>Premium, modern, and functional kitchen interiors designed to match your lifestyle. From concept to completion, we craft spaces you'll love for years to come.</p>
        <div className="hero-buttons">
          <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
          <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;