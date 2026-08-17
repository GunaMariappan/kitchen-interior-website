import { useState } from "react";
import { getWhatsAppLink } from "../utils/whatsapp";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.trim())) newErrors.phone = "Enter a valid 10-digit phone number";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // NOTE: This currently only simulates submission.
      // In Phase 13, this will send data to the Django backend via POST /api/enquiries/
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }
  };

  const generalMessage = "Hi, I found your kitchen interior website and I am interested in your services.";

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>Have a question or ready to start your kitchen project? Reach out to us.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <ul>
            <li><strong>Phone:</strong> +91 99999 99999</li>
            <li><strong>WhatsApp:</strong> +91 99999 99999</li>
            <li><strong>Email:</strong> info@kitcheninteriors.com</li>
            <li><strong>Location:</strong> Coimbatore, Tamil Nadu</li>
          </ul>
          <a href={getWhatsAppLink(generalMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            Chat on WhatsApp
          </a>
        </div>

        <div className="contact-form-wrapper">
          <h2>Send Us a Message</h2>

          {submitted && (
            <div className="form-success">
              Thank you! Your enquiry has been received. We'll get back to you soon.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (optional)</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary form-submit">Submit Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;