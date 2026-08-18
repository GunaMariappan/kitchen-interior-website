import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import { getProjects } from "../services/api";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        setProjects(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Unable to load projects right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="projects-page">
      <div className="projects-hero">
        <h1>Our Completed Projects</h1>
        <p>Take a look at some of our recently completed kitchen interior projects.</p>
      </div>

      <div className="projects-container">
        {loading && <div className="state-message">Loading projects...</div>}

        {error && <div className="state-message state-error">{error}</div>}

        {!loading && !error && (
          projects.length > 0 ? (
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No projects to show yet. Please check back soon.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Projects;