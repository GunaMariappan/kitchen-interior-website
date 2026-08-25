import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDesignBySlug, createDesign, updateDesign, getCategories } from "../../services/api";
import "./DesignForm.css";

const DesignForm = () => {
  const { slug } = useParams();
  const isEditMode = Boolean(slug);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    description: "",
    features_text: "",
    price: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
    if (isEditMode) {
      loadDesign();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const loadDesign = async () => {
    try {
      setLoading(true);
      const response = await getDesignBySlug(slug);
      const design = response.data;
      setFormData({
        title: design.title || "",
        category_id: design.category ? design.category.id : "",
        description: design.description || "",
        features_text: Array.isArray(design.features) ? design.features.join("\n") : "",
        price: design.price || "",
      });
      setExistingImage(design.image || null);
    } catch (err) {
      console.error("Error loading design:", err);
      setError("Unable to load this design.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError("Title is required.");
      return;
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    if (formData.category_id) payload.append("category_id", formData.category_id);
    payload.append("description", formData.description);
    payload.append("features_text", formData.features_text);
    payload.append("price", formData.price);
    if (imageFile) payload.append("image", imageFile);

    try {
      setSaving(true);
      if (isEditMode) {
        await updateDesign(slug, payload);
      } else {
        await createDesign(payload);
      }
      navigate("/admin/designs");
    } catch (err) {
      console.error("Error saving design:", err);
      setError("Failed to save design. Please check the fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="admin-loading">Loading...</p>;
  }

  return (
    <div className="admin-design-form-page">
      <h1>{isEditMode ? "Edit Design" : "Add New Design"}</h1>

      {error && <div className="admin-form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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
          <label htmlFor="features_text">Features (one per line)</label>
          <textarea
            id="features_text"
            name="features_text"
            rows="5"
            placeholder={"Soft-close cabinets\nGranite countertop\nLED lighting"}
            value={formData.features_text}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (optional)</label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="e.g. Starting at ₹1,50,000"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image {isEditMode ? "(leave empty to keep current)" : ""}</label>
          {existingImage && (
            <img src={existingImage} alt="Current" className="admin-form-current-image" />
          )}
          <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? "Saving..." : isEditMode ? "Update Design" : "Create Design"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/designs")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DesignForm;