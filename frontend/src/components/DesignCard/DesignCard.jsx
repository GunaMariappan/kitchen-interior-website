import { Link } from "react-router-dom";
import { getWhatsAppLink } from "../../utils/whatsapp";
import "./DesignCard.css";

const DesignCard = ({ design }) => {
  const message = `Hi, I am interested in the ${design.title} design shown on your website. I would like to know more details.`;

  return (
    <div className="design-card">
      <div className="design-card-image">
        {design.image ? (
          <img src={design.image} alt={design.title} />
        ) : (
          <span className="design-card-placeholder">Image Coming Soon</span>
        )}
      </div>
      <div className="design-card-body">
        <span className="design-card-category">{design.category?.name || "Kitchen"}</span>
        <h3 className="design-card-title">{design.title}</h3>
        <p className="design-card-desc">{design.description}</p>
        <div className="design-card-actions">
          <Link to={`/designs/${design.slug}`} className="btn-outline btn-small">View Details</Link>
          <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-small">Enquire</a>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;