import { Link } from "react-router-dom";
import { getWhatsAppLink } from "../../utils/whatsapp";
import "./CTASection.css";

const CTASection = () => {
  const message = "Hi, I found your kitchen interior website and I am interested in your services.";

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Ready to Transform Your Kitchen?</h2>
        <p>Get in touch with us today for a free consultation and quote.</p>
        <div className="cta-buttons">
          <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
          <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;