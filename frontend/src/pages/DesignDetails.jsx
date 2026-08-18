import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getWhatsAppLink } from "../utils/whatsapp";
import { getDesignBySlug } from "../services/api";
import "./DesignDetails.css";

const DesignDetails = () => {
  const { slug } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const response = await getDesignBySlug(slug);
        setDesign(response.data);
      } catch (err) {
        console.error("Error fetching design:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDesign();
  }, [slug]);

  if (loading) {
    return <div className="state-message">Loading design details...</div>;
  }

  if (notFound || !design) {
    return (
      <div className="design-details-empty">
        <h2>Design Not Found</h2>
        <p>The design you're looking for doesn't exist or may have been removed.</p>
        <Link to="/designs" className="btn-outline btn-small">Back to Designs</Link>
      </div>
    );
  }

  const message = `Hi, I am interested in the ${design.title} design shown on your website. I would like to know more details.`;

  return (
    <div className="design-details-page">
      <div className="design-details-image">
        {design.image ? (
          <img src={design.image} alt={design.title} />
        ) : (
          <span className="design-card-placeholder">Image Coming Soon</span>
        )}
      </div>

      <div className="design-details-container">
        <Link to="/designs" className="back-link">← Back to Designs</Link>

        <span className="design-card-category">{design.category?.name || "Kitchen"}</span>
        <h1>{design.title}</h1>
        <p className="design-details-desc">{design.description}</p>

        {design.price && <p className="design-details-price">{design.price}</p>}

        {design.features?.length > 0 && (
          <div className="design-details-features">
            <h3>Features</h3>
            <ul>
              {design.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          Enquire About This Design
        </a>
      </div>
    </div>
  );
};

export default DesignDetails;