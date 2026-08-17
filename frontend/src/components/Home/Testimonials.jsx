import "./Testimonials.css";

const testimonials = [
  {
    name: "Priya Ramesh",
    location: "Coimbatore",
    quote: "The team transformed our old kitchen into a modern, functional space. The attention to detail was outstanding.",
  },
  {
    name: "Arjun Kumar",
    location: "Chennai",
    quote: "Professional service from start to finish. They delivered exactly what we envisioned, on time and on budget.",
  },
  {
    name: "Divya Shankar",
    location: "Bangalore",
    quote: "Excellent craftsmanship and great communication throughout the project. Highly recommend their work.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="section-container">
        <div className="section-heading">
          <h2>What Our Customers Say</h2>
          <p>Real experiences from homeowners who trusted us with their kitchens.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.name}>
              <p className="testimonial-quote">"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <p className="author-name">{testimonial.name}</p>
                <p className="author-location">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;