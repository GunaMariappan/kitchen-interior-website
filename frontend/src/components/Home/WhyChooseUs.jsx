import "./WhyChooseUs.css";

const features = [
  {
    title: "Premium Materials",
    description: "We use only high-quality, durable materials sourced from trusted manufacturers.",
  },
  {
    title: "Expert Craftsmanship",
    description: "Our skilled designers and craftsmen bring years of experience to every project.",
  },
  {
    title: "Custom Designs",
    description: "Every kitchen is tailored to your space, needs, and personal style.",
  },
  {
    title: "On-Time Delivery",
    description: "We respect your time and ensure projects are completed as promised.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <div className="section-container">
        <div className="section-heading">
          <h2>Why Choose Us</h2>
          <p>We combine design expertise with quality craftsmanship to deliver kitchens that are both beautiful and functional.</p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;