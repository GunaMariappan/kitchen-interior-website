import { useParams, Link } from "react-router-dom";
import { getWhatsAppLink } from "../utils/whatsapp";
import { projects } from "../utils/dummyData";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="project-details-empty">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist or may have been removed.</p>
        <Link to="/projects" className="btn-outline btn-small">Back to Projects</Link>
      </div>
    );
  }

  const message = `Hi, I saw your ${project.title} project and would like to know more about your kitchen interior services.`;

  const imagePlaceholders = Array.from({ length: project.images });

  return (
    <div className="project-details-page">
      <div className="project-details-container">
        <Link to="/projects" className="back-link">← Back to Projects</Link>

        <span className="project-card-type">{project.kitchenType}</span>
        <h1>{project.title}</h1>

        <div className="project-details-meta">
          <span>📍 {project.location}</span>
          <span>📅 Completed: {project.completionDate}</span>
        </div>

        <p className="project-details-desc">{project.description}</p>

        <h3 className="gallery-heading">Project Gallery</h3>
        <div className="project-gallery">
          {imagePlaceholders.map((_, index) => (
            <div className="gallery-image" key={index}>
              <span className="design-card-placeholder">Image {index + 1}</span>
            </div>
          ))}
        </div>

        <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          Enquire About This Project
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;