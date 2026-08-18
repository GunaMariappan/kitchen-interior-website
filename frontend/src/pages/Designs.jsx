import { useState, useEffect } from "react";
import DesignCard from "../components/DesignCard/DesignCard";
import { getDesigns } from "../services/api";
import "./Designs.css";

const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setLoading(true);
        const response = await getDesigns();
        setDesigns(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching designs:", err);
        setError("Unable to load designs right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const categories = ["All", ...new Set(designs.map((d) => d.category?.name).filter(Boolean))];

  const filteredDesigns =
    activeCategory === "All"
      ? designs
      : designs.filter((design) => design.category?.name === activeCategory);

  return (
    <div className="designs-page">
      <div className="designs-hero">
        <h1>Our Kitchen Designs</h1>
        <p>Explore our collection of premium kitchen designs, crafted to match every style and space.</p>
      </div>

      <div className="designs-container">
        {loading && <div className="state-message">Loading designs...</div>}

        {error && <div className="state-message state-error">{error}</div>}

        {!loading && !error && (
          <>
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${activeCategory === category ? "active" : ""}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {filteredDesigns.length > 0 ? (
              <div className="designs-grid">
                {filteredDesigns.map((design) => (
                  <DesignCard key={design.id} design={design} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No designs found in this category yet. Please check back soon.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Designs;