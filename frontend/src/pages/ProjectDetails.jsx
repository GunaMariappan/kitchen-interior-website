import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getWhatsAppLink } from "../utils/whatsapp";
import { getProjectBySlug } from "../services/api";
import "./ProjectDetails.css";

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const response = await getProjectBySlug(slug);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <div className="state-message">Loading project details...</div>;
  }

  if (notFound || !project) {
    return (
      <div className="project-details-empty">
        <h2>Project Not Found</h2>
        <p>The project you're looking for doesn't exist or may have been removed.</p>
        <Link to="/projects" className="btn-outline btn-small">Back to Projects</Link>
      </div>
    );
  }

  const message = `Hi, I saw your ${project.title} project and would like to know more about your kitchen interior services.`;

  return (
    <div className="project-details-page">
      <div className="project-details-container">
        <Link to="/projects" className="back-link">← Back to Projects</Link>

        <span className="project-card-type">{project.kitchen_type}</span>
        <h1>{project.title}</h1>

        <div className="project-details-meta">
          <span>📍 {project.location}</span>
          {project.completion_date && <span>📅 Completed: {project.completion_date}</span>}
        </div>

        <p className="project-details-desc">{project.description}</p>

        {project.images?.length > 0 && (
          <>
            <h3 className="gallery-heading">Project Gallery</h3>
            <div className="project-gallery">
              {project.images.map((img) => (
                <div className="gallery-image" key={img.id}>
                  <img src={img.image} alt={project.title} />
                </div>
              ))}
            </div>
          </>
        )}

        <a href={getWhatsAppLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
          Enquire About This Project
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;