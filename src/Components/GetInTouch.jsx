import React, { useState } from "react";
import axios from "axios";

const faqs = [
  { question: "How can I place an order?", answer: "Simply navigate to our stores page, select a store, and click 'Order Now' to get started." },
  { question: "What payment methods are accepted?", answer: "We accept all major credit cards, UPI, and mobile wallet payments for your convenience." },
  { question: "Can I edit my order after placing it?", answer: "Yes! Contact customer support within 15 minutes of placing the order to make changes." },
  { question: "Do you deliver outside Theni?", answer: "Currently we only deliver within the Theni district, but stay tuned—we’re expanding soon!" },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/enquiries", formData);
      setStatus("✅ Enquiry submitted successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="faq-section">
      <h2 className="faq-title">Have Questions? We’ve Got Answers!</h2>

      <div className="faq-flex">
        {/* FAQ Column */}
        <div className="faq-column">
          <div className="accordion">
            {faqs.map((faq, idx) => (
              <div key={idx} className="accordion-item">
                <button
                  className={`accordion-header ${openIndex === idx ? "open" : ""}`}
                  onClick={() => toggle(idx)}
                >
                  {faq.question}
                  <span className="accordion-icon">{openIndex === idx ? "−" : "+"}</span>
                </button>
                {openIndex === idx && (
                  <div className="accordion-body">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Enquiry Form Column */}
        <div className="enquiry-form">
          <h3>Didn’t find your answer? Send us an enquiry!</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone (optional)" />
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required></textarea>
            <button type="submit">Submit Enquiry</button>
          </form>
          {status && <p className="status-msg">{status}</p>}
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 20px;
          margin-top:90px
        }

        .faq-title {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #00488e, #f7a800);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Flexbox for two columns */
        .faq-flex {
          display: flex;
          gap: 40px;
          align-items: flex-start;
          flex-wrap: wrap; /* for mobile responsiveness */
        }

        .faq-column {
          flex: 1;
          min-width: 300px;
        }

        .accordion {
          border-top: 2px solid #e2e8f0;
        }

        .accordion-item {
          border-bottom: 1px solid #e2e8f0;
        }

        .accordion-header {
          width: 100%;
          text-align: left;
          padding: 18px;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .accordion-header:hover {
          background-color: #f1f5f9;
        }

        .accordion-icon {
          font-size: 1.5rem;
        }

        .accordion-body {
          padding: 0 18px 18px;
        }

        /* Enquiry form */
        .enquiry-form {
          flex: 1;
          min-width: 300px;
          padding: 20px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .enquiry-form h3 {
          margin-bottom: 20px;
          font-size: 1.3rem;
          color: #00488e;
        }

        .enquiry-form form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .enquiry-form input,
        .enquiry-form textarea {
          padding: 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
        }

        .enquiry-form textarea {
          min-height: 100px;
          resize: vertical;
        }

        .enquiry-form button {
          background: linear-gradient(135deg, #00488e, #f7a800);
          color: #fff;
          padding: 12px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s ease;
        }

        .enquiry-form button:hover {
          opacity: 0.9;
        }

        .status-msg {
          margin-top: 12px;
          font-size: 0.9rem;
          color: #16a34a;
        }
      `}</style>
    </div>
  );
}
