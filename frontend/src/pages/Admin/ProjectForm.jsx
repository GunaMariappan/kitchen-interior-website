import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProjectBySlug,
  createProject,
  updateProject,
  uploadProjectImages,
  deleteProjectImage,
} from "../../services/api";
import "./DesignForm.css";
import "./ProjectForm.css";

const ProjectForm = () => {
  const { slug } = useParams();
  const isEditMode = Boolean(slug);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    kitchen_type: "",
    description: "",
    completion_date: "",
  });
  const [currentSlug, setCurrentSlug] = useState(slug || null);
  const [images, setImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      loadProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await getProjectBySlug(slug);
      const project = response.data;
      setFormData({
        title: project.title || "",
        location: project.location || "",
        kitchen_type: project.kitchen_type || "",
        description: project.description || "",
        completion_date: project.completion_date || "",
      });
      setImages(project.images || []);
      setCurrentSlug(project.slug);
    } catch (err) {
      console.error("Error loading project:", err);
      setError("Unable to load this project.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    setNewFiles(Array.from(e.target.files || []));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim() || !formData.location.trim() || !formData.kitchen_type.trim()) {
      setError("Title, location, and kitchen type are required.");
      return;
    }

    const payload = {
      title: formData.title,
      location: formData.location,
      kitchen_type: formData.kitchen_type,
      description: formData.description,
      completion_date: formData.completion_date || null,
    };

    try {
      setSaving(true);
      let projectSlug = currentSlug;

      if (isEditMode) {
        await updateProject(currentSlug, payload);
      } else {
        const response = await createProject(payload);
        projectSlug = response.data.slug;
        setCurrentSlug(projectSlug);
      }

      if (newFiles.length > 0) {
        await uploadSelectedImages(projectSlug);
      }

      navigate("/admin/projects");
    } catch (err) {
      console.error("Error saving project:", err);
      setError("Failed to save project. Please check the fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const uploadSelectedImages = async (projectSlug) => {
    const uploadData = new FormData();
    newFiles.forEach((file) => uploadData.append("images", file));
    await uploadProjectImages(projectSlug, uploadData);
  };

  const handleAddImagesNow = async () => {
    if (newFiles.length === 0 || !currentSlug) return;
    try {
      setUploadingImages(true);
      const uploadData = new FormData();
      newFiles.forEach((file) => uploadData.append("images", file));
      const response = await uploadProjectImages(currentSlug, uploadData);
      setImages((prev) => [...prev, ...response.data]);
      setNewFiles([]);
    } catch (err) {
      console.error("Error uploading images:", err);
      alert("Failed to upload images. Please try again.");
    } finally {
      setUploadingImages(false);
    }
  };

  const handleDeleteImage = async (imageId) => {
    const confirmed = window.confirm("Remove this image?");
    if (!confirmed) return;

    try {
      setDeletingImageId(imageId);
      await deleteProjectImage(imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.error("Error deleting image:", err);
      alert("Failed to delete image. Please try again.");
    } finally {
      setDeletingImageId(null);
    }
  };

  if (loading) {
    return <p className="admin-loading">Loading...</p>;
  }

  return (
    <div className="admin-design-form-page">
      <h1>{isEditMode ? "Edit Project" : "Add New Project"}</h1>

      {error && <div className="admin-form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="e.g. Coimbatore"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="kitchen_type">Kitchen Type *</label>
          <input
            type="text"
            id="kitchen_type"
            name="kitchen_type"
            placeholder="e.g. L-Shaped Kitchen"
            value={formData.kitchen_type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="completion_date">Completion Date (optional)</label>
          <input
            type="date"
            id="completion_date"
            name="completion_date"
            value={formData.completion_date || ""}
            onChange={handleChange}
          />
        </div>

        {isEditMode && images.length > 0 && (
          <div className="form-group">
            <label>Current Images</label>
            <div className="project-image-gallery">
              {images.map((img) => (
                <div key={img.id} className="project-image-item">
                  <img src={img.image} alt="Project" />
                  <button
                    type="button"
                    className="project-image-remove"
                    disabled={deletingImageId === img.id}
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    {deletingImageId === img.id ? "..." : "✕"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="images">
            {isEditMode ? "Add More Images" : "Project Images (optional)"}
          </label>
          <input type="file" id="images" name="images" accept="image/*" multiple onChange={handleFileSelect} />
          {newFiles.length > 0 && (
            <p className="project-image-hint">{newFiles.length} file(s) selected</p>
          )}
          {isEditMode && newFiles.length > 0 && (
            <button
              type="button"
              className="btn btn-secondary project-upload-now-btn"
              onClick={handleAddImagesNow}
              disabled={uploadingImages}
            >
              {uploadingImages ? "Uploading..." : "Upload Selected Images"}
            </button>
          )}
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : isEditMode ? "Update Project" : "Create Project"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/admin/projects")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;