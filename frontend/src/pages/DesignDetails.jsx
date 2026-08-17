import { useParams, Link } from "react-router-dom";
import { getWhatsAppLink } from "../utils/whatsapp";
import { kitchenDesigns } from "../utils/dummyData";
import "./DesignDetails.css";

const DesignDetails = () => {
  const { slug } = useParams();
  const design = kitchenDesigns.find((d) => d.slug === slug);

  if (!design) {
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
        <span className="design-card-placeholder">Image Coming Soon</span>
      </div>

      <div className="design-details-container">
        <Link to="/designs" className="back-link">← Back to Designs</Link>

        <span className="design-card-category">{design.category}</span>
        <h1>{design.title}</h1>
        <p className="design-details-desc">{design.description}</p>

        {design.price && <p className="design-details-price">{design.price}</p>}

        <div className="design-details-features">
          <h3>Features</h3>
          <ul>
            {design.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          Enquire About This Design
        </a>
      </div>
    </div>
  );
};

export default DesignDetails;