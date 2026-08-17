import ProjectCard from "../components/ProjectCard/ProjectCard";
import { projects } from "../utils/dummyData";
import "./Projects.css";

const Projects = () => {
  return (
    <div className="projects-page">
      <div className="projects-hero">
        <h1>Our Completed Projects</h1>
        <p>Take a look at some of our recently completed kitchen interior projects.</p>
      </div>

      <div className="projects-container">
        {projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No projects to show yet. Please check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;