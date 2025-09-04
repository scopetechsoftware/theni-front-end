import React, { useState } from 'react';
import { 
  ShoppingBag, Mail, Phone, MapPin, Facebook, 
  Twitter, Instagram, Youtube, Heart, Send,
  Shield, FileText, HelpCircle, ArrowRight
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      // Simulate API call
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-header">
              <div className="brand-icon">
                <ShoppingBag className="icon" />
              </div>
              <div>
                <h3 className="brand-title">Theni Deals</h3>
                <p className="brand-subtitle">Premium Marketplace</p>
              </div>
            </div>

            <p className="brand-description">
              Your trusted destination for the best deals and offers in Theni. We connect you with premium local businesses and exclusive discounts.
            </p>

            <div className="social-links">
              <span className="social-title">Connect with us:</span>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" className="social-icon" aria-label="YouTube">
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              {['Featured Deals', 'Flash Sales', 'Categories', 'Trending Now', 'New Arrivals', 'Best Sellers'].map(link => (
                <li key={link}>
                  <a href="#">
                    <ArrowRight size={14} />
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links */}
          <div className="footer-links">
            <h4>Information</h4>
            <ul>
              <li><a href="#"><Shield size={14} /><span>Privacy Policy</span></a></li>
              <li><a href="#"><FileText size={14} /><span>Terms of Service</span></a></li>
              <li><a href="#"><HelpCircle size={14} /><span>Support Center</span></a></li>
              <li><a href="#"><span>About Us</span></a></li>
              <li><a href="#"><span>Store Directory</span></a></li>
              <li><a href="#"><span>Merchant Login</span></a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="footer-contact">
            <h4>Stay Connected</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" size={16} />
                <span>Theni, Tamil Nadu, India</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" size={16} />
                <a href="mailto:hello@thenideals.com">hello@thenideals.com</a>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" size={16} />
                <a href="tel:+91-9876543210">+91 98765 43210</a>
              </div>
            </div>

            <div className="newsletter">
              <h5>Get Exclusive Deals</h5>
              <p className="newsletter-text">Subscribe to receive special offers and updates</p>
              <form onSubmit={handleSubmit} className="newsletter-form">
                <div className="input-group">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="subscribe-btn" disabled={subscribed}>
                    {subscribed ? 'Subscribed!' : <Send size={16} />}
                  </button>
                </div>
                {subscribed && <div className="success-message">Thank you for subscribing!</div>}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © 2025 Theni Deals. All rights reserved. Made with <Heart size={14} className="heart-icon" /> in India
            </div>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Support</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: #e0e0e0;
          padding: 70px 0 0;
          font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
          border-top: 1px solid #333;
         
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 50px;
          margin-bottom: 50px;
        }

        /* Brand Section */
        .footer-brand .brand-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .brand-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3);
        }

        .brand-icon .icon {
          width: 28px;
          height: 28px;
          color: white;
        }

        .brand-title {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #fff, #ccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }

        .brand-subtitle {
          font-size: 0.9rem;
          color: #aaa;
          margin: 5px 0 0;
        }

        .brand-description {
          margin: 20px 0 25px;
          line-height: 1.7;
          color: #b0b0b0;
          max-width: 300px;
        }

        .social-links {
          margin-top: 25px;
        }

        .social-title {
          display: block;
          font-weight: 600;
          margin-bottom: 12px;
          color: #e0e0e0;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          display: inline-flex;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: #ccc;
          transition: all 0.3s ease;
          border: 1px solid transparent;
        }

        .social-icon:hover {
          background: rgba(106, 17, 203, 0.2);
          color: #fff;
          transform: translateY(-2px);
          border-color: rgba(106, 17, 203, 0.3);
        }

        /* Links Sections */
        .footer-links h4,
        .footer-contact h4 {
          font-size: 1.2rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-links h4:after,
        .footer-contact h4:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #6a11cb, #2575fc);
          border-radius: 3px;
        }

        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links li a {
          color: #b0b0b0;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          padding: 5px 0;
        }

        .footer-links li a:hover {
          color: #fff;
          transform: translateX(5px);
        }

        .footer-links li a svg {
          transition: transform 0.3s ease;
        }

        .footer-links li a:hover svg {
          transform: rotate(-45deg);
          color: #6a11cb;
        }

        /* Contact Section */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #b0b0b0;
        }

        .contact-icon {
          color: #6a11cb;
          flex-shrink: 0;
        }

        .contact-item a {
          color: #b0b0b0;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-item a:hover {
          color: #fff;
        }

        /* Newsletter */
        .newsletter h5 {
          font-size: 1.1rem;
          color: #fff;
          margin-bottom: 10px;
        }

        .newsletter-text {
          color: #b0b0b0;
          margin-bottom: 20px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .newsletter-form {
          width: 100%;
        }

        .input-group {
          display: flex;
          position: relative;
          margin-bottom: 8px;
        }

        .input-group input {
          flex: 1;
          padding: 14px 18px;
          border-radius: 10px 0 0 10px;
          border: 1px solid #444;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .input-group input:focus {
          outline: none;
          border-color: #6a11cb;
          background: rgba(255, 255, 255, 0.08);
        }

        .input-group input::placeholder {
          color: #888;
        }

        .subscribe-btn {
          padding: 0 20px;
          border-radius: 0 10px 10px 0;
          border: none;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .subscribe-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #5809b5 0%, #1c64d9 100%);
          box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3);
        }

        .subscribe-btn:disabled {
          opacity: 0.8;
          cursor: not-allowed;
        }

        .success-message {
          color: #4ade80;
          font-size: 0.85rem;
          margin-top: 8px;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Bottom Bar */
        .footer-bottom {
          border-top: 1px solid #444;
          padding: 25px 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .copyright {
          display: flex;
          align-items: center;
          gap: 5px;
          color: #999;
          font-size: 0.9rem;
        }

        .heart-icon {
          color: #ef4444;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }

        .footer-bottom-links a {
          color: #999;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #fff;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr 1fr;
            gap: 40px 30px;
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 50px 0 0;
          }
          
          .footer-main {
            grid-template-columns: 1fr;
            gap: 35px;
          }
          
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
          
          .footer-bottom-links {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 0 15px;
          }
          
          .input-group {
            flex-direction: column;
          }
          
          .input-group input {
            border-radius: 10px;
            margin-bottom: 10px;
          }
          
          .subscribe-btn {
            border-radius: 10px;
            padding: 12px;
          }
          
          .footer-bottom-links {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;