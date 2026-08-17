import { Link } from "react-router-dom";
import "./About.css";

const processSteps = [
  { step: "01", title: "Consultation", desc: "We understand your space, needs, and style preferences." },
  { step: "02", title: "Design", desc: "Our team creates a custom design plan tailored to your kitchen." },
  { step: "03", title: "Approval", desc: "You review the design, materials, and final quote before we begin." },
  { step: "04", title: "Execution", desc: "Our craftsmen bring the design to life with precision and care." },
  { step: "05", title: "Handover", desc: "We complete final checks and hand over your dream kitchen." },
];

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Crafting premium kitchen spaces with passion, precision, and years of expertise.</p>
      </div>

      <div className="about-container">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            We are a dedicated team of kitchen interior designers and craftsmen committed to
            transforming everyday kitchens into functional, beautiful spaces. With years of
            hands-on experience, we combine modern design sensibilities with practical
            engineering to deliver kitchens that our clients love for years to come.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To make premium kitchen design accessible, reliable, and stress-free for every
            homeowner — through honest communication, quality craftsmanship, and attention
            to detail at every step of the process.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us</h2>
          <p>
            We believe a kitchen is the heart of the home. That's why we take a personalized
            approach to every project, ensuring the final design reflects your taste, fits
            your budget, and stands the test of time — both in style and durability.
          </p>
        </section>

        <section className="about-process">
          <h2>Our Process</h2>
          <div className="process-grid">
            {processSteps.map((item) => (
              <div className="process-card" key={item.step}>
                <span className="process-number">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="about-cta">
          <h2>Ready to start your kitchen journey?</h2>
          <Link to="/contact" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </div>
    </div>
  );
};

export default About;