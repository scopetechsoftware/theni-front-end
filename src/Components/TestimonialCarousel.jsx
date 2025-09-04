import React from "react";
import Slider from "react-slick";

const testimonials = [
  { id: 1, name: "Alice", role: "Customer", text: "Amazing service and quick delivery!" },
  { id: 2, name: "Bob", role: "Client", text: "Highly recommended. Professional and reliable team." },
  { id: 3, name: "Carol", role: "User", text: "Loved this experience. Great offers and discounts." },
  { id: 4, name: "David", role: "Customer", text: "Customer support was excellent and very helpful." },
  { id: 5, name: "Eva", role: "Client", text: "They really care about their customers!" },
];

export default function TestimonialCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768, // On mobile, only one card
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial-section">
      <h2 className="testimonial-title">What Our Customers Say</h2>
      <Slider {...settings}>
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial-slide">
            <div className="testimonial-card">
              <p className="testimonial-text">“{t.text}”</p>
              <h4 className="testimonial-name">{t.name}</h4>
              <small className="testimonial-role">{t.role}</small>
            </div>
          </div>
        ))}
      </Slider>

      <style jsx>{`
        .testimonial-section {
          padding: 60px 20px;
          background: #f9fafb;
        }

        .testimonial-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 40px;
          background: linear-gradient(135deg, #00488e, #f7a800);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .testimonial-slide {
          padding: 10px;
        }

        .testimonial-card {
          background: #fff;
          border-radius: 14px;
          padding: 30px 25px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .testimonial-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 28px rgba(0, 72, 142, 0.2);
        }

        .testimonial-text {
          font-size: 1rem;
          font-style: italic;
          color: #4a5568;
          margin-bottom: 18px;
          line-height: 1.6;
        }

        .testimonial-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          color: #2d3748;
        }

        .testimonial-role {
          font-size: 0.9rem;
          color: #718096;
        }
      `}</style>
    </div>
  );
}
