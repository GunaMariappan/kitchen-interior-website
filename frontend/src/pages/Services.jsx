import { Link } from "react-router-dom";
import { services } from "../utils/dummyData";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive kitchen interior solutions, from design to installation.</p>
      </div>

      <div className="services-container">
        <div className="services-full-grid">
          {services.map((service) => (
            <div className="service-full-card" key={service.id}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <h2>Not sure which service you need?</h2>
          <p>Get in touch and we'll help you plan the perfect kitchen for your home.</p>
          <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;