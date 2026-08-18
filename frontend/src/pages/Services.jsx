import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../services/api";
import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServices();
        setServices(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Unable to load services right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <div className="services-hero">
        <h1>Our Services</h1>
        <p>Comprehensive kitchen interior solutions, from design to installation.</p>
      </div>

      <div className="services-container">
        {loading && <div className="state-message">Loading services...</div>}
        {error && <div className="state-message state-error">{error}</div>}

        {!loading && !error && (
          <>
            {services.length > 0 ? (
              <div className="services-full-grid">
                {services.map((service) => (
                  <div className="service-full-card" key={service.id}>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No services listed yet. Please check back soon.</p>
              </div>
            )}

            <div className="services-cta">
              <h2>Not sure which service you need?</h2>
              <p>Get in touch and we'll help you plan the perfect kitchen for your home.</p>
              <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Services;