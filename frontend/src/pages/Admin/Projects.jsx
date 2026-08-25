import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, deleteProject } from "../../services/api";
import "./Designs.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingSlug, setDeletingSlug] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProjects();
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Unable to load projects. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug, title) => {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      setDeletingSlug(slug);
      await deleteProject(slug);
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project. Please try again.");
    } finally {
      setDeletingSlug(null);
    }
  };

  if (loading) {
    return <p className="admin-loading">Loading projects...</p>;
  }

  if (error) {
    return <p className="admin-error">{error}</p>;
  }

  return (
    <div className="admin-designs-page">
      <div className="admin-page-header">
        <h1>Projects</h1>
        <Link to="/admin/projects/new" className="btn btn-primary">
          + Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="admin-empty">No projects yet. Click "Add New Project" to create one.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Kitchen Type</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0].image}
                        alt={project.title}
                        className="admin-thumb"
                      />
                    ) : (
                      <div className="admin-thumb admin-thumb-placeholder">No image</div>
                    )}
                  </td>
                  <td>{project.title}</td>
                  <td>{project.location}</td>
                  <td>{project.kitchen_type}</td>
                  <td>{project.images ? project.images.length : 0}</td>
                  <td className="admin-table-actions">
                    <Link to={`/admin/projects/edit/${project.slug}`} className="admin-action-link">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(project.slug, project.title)}
                      disabled={deletingSlug === project.slug}
                      className="admin-action-link admin-action-delete"
                    >
                      {deletingSlug === project.slug ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Projects;