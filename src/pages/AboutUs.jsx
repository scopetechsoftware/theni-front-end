import React, { useState } from "react";
import axios from "axios";
import StayUpdated from "../Components/StayUpdated";

const API_SUBSCRIBE = "/api/subscribe";

export default function AboutUs() {
  const [email, setEmail] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return setStatusMsg("Please enter a valid email address.");

    try {
      await axios.post(API_SUBSCRIBE, { email });
      setStatusMsg("Thank you for subscribing!");
      setEmail("");
    } catch {
      setStatusMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="about-page">
      {/* About Section */}
      {/* Hero / Banner */}
<section className="hero-banner">
  <div className="hero-content">
    <h1>About Theni Offers</h1>
    <p>
      Connecting local businesses with customers through amazing deals and
      coupons. Bringing the best discounts in Theni right to your fingertips.
    </p>
  </div>
</section>


      {/* Mission Section */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Local Deals</h3>
            <p>
              Exclusive offers from shops and services across Theni, updated
              regularly.
            </p>
          </div>
          <div className="card">
            <h3>Easy Coupons</h3>
            <p>
              Grab your discount coupons online and redeem them at your favorite
              stores.
            </p>
          </div>
          <div className="card">
            <h3>Smart Shopping</h3>
            <p>
              Save more while you shop with curated offers designed for every
              customer.
            </p>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="plans-section">
        <h2>Subscription Plans</h2>
        <div className="card-grid">
          <div className="plan-card platinum">
            <h3>Platinum</h3>
            <p className="price">₹1,500 / month</p>
            <ul>
              <li>Header ad placement</li>
              <li>Featured in 20% of 50 coupon downloads</li>
              <li>#1 in related searches</li>
              <li>#1 in coupon lists</li>
              <li>Portfolio profile</li>
              <li>Free festival & holiday creatives</li>
            </ul>
          </div>

          <div className="plan-card gold">
            <h3>Gold</h3>
            <p className="price">₹1,000 / month</p>
            <ul>
              <li>Sidebar ad placement</li>
              <li>Featured in 10% of coupon downloads</li>
              <li>Top 3 in related searches</li>
              <li>Listed in coupon lists</li>
              <li>Portfolio profile</li>
            </ul>
          </div>

          <div className="plan-card silver">
            <h3>Silver</h3>
            <p className="price">₹500 / month</p>
            <ul>
              <li>Basic listing in offers</li>
              <li>Appears in search results</li>
              <li>Portfolio profile</li>
            </ul>
          </div>
        </div>
        <button className="get-listed-btn">Get Listed Now</button>
      </section>

      {/* Why Choose */}
      <section className="why-section">
        <h2>Why Choose Theni Offers?</h2>
        <div className="card-grid">
          <div className="card">
            <h3>Exclusive Deals</h3>
            <p>
              Get access to the best discounts and coupons from top local
              businesses.
            </p>
          </div>
          <div className="card">
            <h3>Support Local</h3>
            <p>
              Every coupon you use directly helps small businesses in Theni
              grow.
            </p>
          </div>
          <div className="card">
            <h3>Easy & Fast</h3>
            <p>
              Simple to use and quick to redeem — saving money has never been
              easier.
            </p>
          </div>
        </div>
      </section>
      <StayUpdated />

      {/* Subscribe + WhatsApp */}
      {/* <section className="subscribe-whatsapp">
        <div className="subscribe">
          <h2>Stay Updated</h2>
          <p>
            Subscribe today and never miss out on the latest updates, exclusive
            offers, and valuable learning resources.
          </p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setStatusMsg("");
              }}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {statusMsg && <p className="status-msg">{statusMsg}</p>}
        </div>

        <div className="whatsapp-contact">
          <h3>Connect with Us on WhatsApp</h3>
          <p>
            Prefer a quick chat? Reach out instantly on WhatsApp for support or
            registration assistance.
          </p>
          <a
            href="https://wa.me/919500756881"
            target="_blank"
            rel="noopener noreferrer"
            className="wa-number"
          >
            +91 9500756881
          </a>
          <img src="/whatsapp-qr.png" alt="WhatsApp QR" className="wa-qr" />
          <p>
            Scan the QR code or tap the number above to start a WhatsApp chat
            instantly.
          </p>
        </div>
      </section> */}

      {/* Footer
      <footer className="footer">
        <h3>Theni Offers & Coupons</h3>
        <nav>
          <a href="/">Home</a> | <a href="/offers">Offers</a> |{" "}
          <a href="/stores">Stores</a> | <a href="/about">About Us</a> |{" "}
          <a href="/contact">Contact Us</a>
        </nav>
        <div className="contact-info">
          <p>+91 98765 43210</p>
          <p>hello@thenioffers.com</p>
        </div>
        <p>© {new Date().getFullYear()} Theni Offers. All rights reserved.</p>
      </footer> */}

      <style jsx>{`


/* Hero Banner */
.hero-banner {
  background: linear-gradient(rgba(0,72,142,0.85), rgba(0,72,142,0.85)), 
              url("/banner-bg.jpg") center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 100px 20px;
  border-radius: 0 0 20px 20px;
}

.hero-banner h1 {
  font-size: 2.8rem;
  margin-bottom: 15px;
  font-weight: bold;
}

.hero-banner p {
  max-width: 700px;
  margin: 0 auto;
  font-size: 1.2rem;
  line-height: 1.6;
}

        .about-page {
          font-family: "Segoe UI", sans-serif;
          color: #333;
          line-height: 1.6;
        }

        h2 {
          color: #00488e;
          margin-bottom: 20px;
          text-align: center;
        }

        /* Section Spacing */
        section {
          max-width: 1100px;
          margin: 60px auto;
          padding: 0 20px;
        }

        /* Card Grid */
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }

        .card {
          background: #fff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        }

        /* Plans */
        .plan-card {
          border-radius: 12px;
          padding: 25px;
          text-align: center;
          color: #fff;
        }
        .platinum {
          background: linear-gradient(135deg, #00488e, #0a66c2);
        }
        .gold {
          background: linear-gradient(135deg, #f7a800, #ffcc33);
        }
        .silver {
          background: linear-gradient(135deg, #a8a8a8, #d9d9d9);
          color: #222;
        }

        .plan-card h3 {
          margin: 0 0 10px;
        }

        .price {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .plan-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          text-align: left;
        }

        .plan-card ul li {
          margin-bottom: 8px;
          padding-left: 15px;
          position: relative;
        }

        .plan-card ul li:before {
          content: "✔";
          position: absolute;
          left: 0;
          color: #fff;
        }

        .get-listed-btn {
          display: block;
          margin: 30px auto 0;
          background: #f7a800;
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
        }

        .get-listed-btn:hover {
          background: #ff9800;
        }

        /* Subscribe + WhatsApp */
        .subscribe-whatsapp {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
          align-items: flex-start;
          background: #00488e;
          color: white;
          padding: 50px 20px;
          border-radius: 12px;
        }

        .subscribe input {
          flex: 1;
          padding: 12px;
          border-radius: 6px;
          border: none;
          margin-right: 10px;
        }

        .subscribe button {
          background: #f7a800;
          border: none;
          padding: 12px 24px;
          color: #00488e;
          font-weight: bold;
          cursor: pointer;
          border-radius: 6px;
        }

        .whatsapp-contact {
          flex: 1;
          background: white;
          color: black;
          padding: 25px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .wa-number {
          display: block;
          margin: 15px 0;
          color: #f7a800;
          font-size: 1.2rem;
          text-decoration: none;
          font-weight: bold;
        }

        .wa-qr {
          width: 120px;
          margin: 15px 0;
        }

        /* Footer */
        .footer {
          background: #f2f2f2;
          text-align: center;
          padding: 30px 20px;
          color: #333;
        }
        .footer nav a {
          margin: 0 8px;
          color: #00488e;
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
