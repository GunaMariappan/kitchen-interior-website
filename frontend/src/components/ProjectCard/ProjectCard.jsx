import { Link } from "react-router-dom";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  const firstImage = project.images?.length > 0 ? project.images[0].image : null;

  return (
    <div className="project-card">
      <div className="project-card-image">
        {firstImage ? (
          <img src={firstImage} alt={project.title} />
        ) : (
          <span className="design-card-placeholder">Image Coming Soon</span>
        )}
      </div>
      <div className="project-card-body">
        <span className="project-card-type">{project.kitchen_type}</span>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-location">📍 {project.location}</p>
        <p className="project-card-desc">{project.description}</p>
        <Link to={`/projects/${project.slug}`} className="btn-outline btn-small project-card-btn">
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;