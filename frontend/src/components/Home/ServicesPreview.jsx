import { Link } from "react-router-dom";
import "./ServicesPreview.css";

const services = [
  {
    title: "Kitchen Interior Design",
    description: "Complete kitchen design tailored to your space and lifestyle.",
  },
  {
    title: "Modular Kitchen",
    description: "Space-efficient, modern modular kitchen solutions.",
  },
  {
    title: "Cabinet Installation",
    description: "Custom cabinetry built and installed with precision.",
  },
  {
    title: "Countertop Work",
    description: "Durable, elegant countertops in a variety of materials.",
  },
  {
    title: "Lighting",
    description: "Functional and ambient lighting design for your kitchen.",
  },
  {
    title: "Kitchen Renovation",
    description: "Full renovation services to modernize your existing kitchen.",
  },
];

const ServicesPreview = () => {
  return (
    <section className="services-preview">
      <div className="section-container">
        <div className="section-heading">
          <h2>Our Services</h2>
          <p>From design to installation, we handle every step of your kitchen transformation.</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        <div className="services-cta">
          <Link to="/services" className="btn btn-outline">View All Services</Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;