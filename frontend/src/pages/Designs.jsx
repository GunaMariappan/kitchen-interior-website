import { useState } from "react";
import DesignCard from "../components/DesignCard/DesignCard";
import { kitchenDesigns, kitchenCategories } from "../utils/dummyData";
import "./Designs.css";

const Designs = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDesigns =
    activeCategory === "All"
      ? kitchenDesigns
      : kitchenDesigns.filter((design) => design.category === activeCategory);

  return (
    <div className="designs-page">
      <div className="designs-hero">
        <h1>Our Kitchen Designs</h1>
        <p>Explore our collection of premium kitchen designs, crafted to match every style and space.</p>
      </div>

      <div className="designs-container">
        <div className="category-filter">
          {kitchenCategories.map((category) => (
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
      </div>
    </div>
  );
};

export default Designs;