import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDesigns, deleteDesign } from "../../services/api";
import "./Designs.css";

const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingSlug, setDeletingSlug] = useState(null);

  useEffect(() => {
    fetchDesigns();
  }, []);

  const fetchDesigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDesigns();
      setDesigns(response.data);
    } catch (err) {
      console.error("Error fetching designs:", err);
      setError("Unable to load designs. Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug, title) => {
    const confirmed = window.confirm(`Delete "${title}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      setDeletingSlug(slug);
      await deleteDesign(slug);
      setDesigns((prev) => prev.filter((d) => d.slug !== slug));
    } catch (err) {
      console.error("Error deleting design:", err);
      alert("Failed to delete design. Please try again.");
    } finally {
      setDeletingSlug(null);
    }
  };

  if (loading) {
    return <p className="admin-loading">Loading designs...</p>;
  }

  if (error) {
    return <p className="admin-error">{error}</p>;
  }

  return (
    <div className="admin-designs-page">
      <div className="admin-page-header">
        <h1>Designs</h1>
        <Link to="/admin/designs/new" className="btn btn-primary">
          + Add New Design
        </Link>
      </div>

      {designs.length === 0 ? (
        <p className="admin-empty">No designs yet. Click "Add New Design" to create one.</p>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {designs.map((design) => (
                <tr key={design.id}>
                  <td>
                    {design.image ? (
                      <img src={design.image} alt={design.title} className="admin-thumb" />
                    ) : (
                      <div className="admin-thumb admin-thumb-placeholder">No image</div>
                    )}
                  </td>
                  <td>{design.title}</td>
                  <td>{design.category ? design.category.name : "-"}</td>
                  <td>{design.price || "-"}</td>
                  <td className="admin-table-actions">
                    <Link to={`/admin/designs/edit/${design.slug}`} className="admin-action-link">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(design.slug, design.title)}
                      disabled={deletingSlug === design.slug}
                      className="admin-action-link admin-action-delete"
                    >
                      {deletingSlug === design.slug ? "Deleting..." : "Delete"}
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

export default Designs;
