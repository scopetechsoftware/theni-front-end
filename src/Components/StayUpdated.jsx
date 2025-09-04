import React, { useState } from "react";
import axios from "axios";

export default function StayUpdated() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const whatsappNumber = "+919500756881";
  const whatsappMessage = encodeURIComponent(
    "Hello! I want to know more about your offers."
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("/api/subscribe", { email });
      setStatus("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="stay-updated-container">
      <div className="stay-left">
        <div className="header-section">
          <h2>Stay Updated</h2>
          <div className="decoration-line"></div>
        </div>
        <p className="description">
          Subscribe today and never miss out on the latest updates, exclusive
          offers, and valuable learning resources. Join our growing community!
        </p>
        
        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="input-container">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <button type="submit" className="subscribe-btn">
            <span>Subscribe</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
        
        {status && (
          <div className={`status-message ${status.includes("Thank you") ? "success" : "error"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {status.includes("Thank you") ? (
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              ) : (
                <circle cx="12" cy="12" r="10"></circle>
              )}
              {status.includes("Thank you") ? (
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              ) : (
                  <>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </>
              )}
            </svg>
            {status}
          </div>
        )}
      </div>

      <div className="divider">
        <span>OR</span>
      </div>

      <div className="stay-right">
        <div className="whatsapp-box">
          <div className="whatsapp-header">
            <div className="whatsapp-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
              </svg>
            </div>
            <h3>Connect on WhatsApp</h3>
          </div>
          
          <p className="whatsapp-description">
            Prefer a quick chat? Reach out instantly on WhatsApp for support or registration assistance.
          </p>
          
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-link"
          >
            <span className="whatsapp-number">{whatsappNumber}</span>
            <svg className="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
          
          <div className="qr-section">
            <div className="qr-placeholder">
              <div className="qr-code">
                <div className="qr-inner">
                  {/* This would be your QR code image */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="#25D366">
                    <rect x="20" y="20" width="15" height="15"/>
                    <rect x="20" y="65" width="15" height="15"/>
                    <rect x="65" y="20" width="15" height="15"/>
                    {/* Simplified QR pattern */}
                    <rect x="40" y="40" width="5" height="5"/>
                    <rect x="50" y="40" width="5" height="5"/>
                    <rect x="40" y="50" width="5" height="5"/>
                    <rect x="55" y="55" width="5" height="5"/>
                  </svg>
                </div>
              </div>
            </div>
            <p className="qr-text">Scan QR code to start chatting</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stay-updated-container {
          display: flex;
          justify-content: space-between;
          background: linear-gradient(135deg, #00488e 0%, #00264d 100%);
          color: #fff;
          padding: 20px 40px;
          border-radius: 16px;
          gap: 40px;
          flex-wrap: wrap;
          box-shadow: 0 20px 40px rgba(0, 38, 77, 0.15);
          position: relative;
          overflow: hidden;
          margin-top:100px
        }
        
        .stay-updated-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #f7a800, #ffd166);
          z-index: 1;
          
        }

        .stay-left {
          flex: 1 1 400px;
          padding-right: 20px;
        }
        
        .header-section {
          margin-bottom: 24px;
        }

        .stay-left h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 12px;
          background: linear-gradient(135deg, #fff 0%, #cce4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .decoration-line {
          height: 4px;
          width: 60px;
          background: linear-gradient(90deg, #f7a800, #ffd166);
          border-radius: 2px;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 32px;
          color: #cce4ff;
          max-width: 90%;
        }

        .subscription-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        
        .input-container {
          position: relative;
          flex: 1 1 300px;
        }

        .input-container input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          border-radius: 8px;
          border: 2px solid transparent;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        
        .input-container input:focus {
          outline: none;
          border-color: #f7a800;
          background: rgba(255, 255, 255, 0.15);
        }
        
        .input-container input::placeholder {
          color: #a0cfff;
        }
        
        .icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #a0cfff;
        }

        .subscribe-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 24px;
          background: linear-gradient(135deg, #f7a800 0%, #ffd166 100%);
          border: none;
          color: #00264d;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .subscribe-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(247, 168, 0, 0.25);
        }
        
        .subscribe-btn svg {
          width: 18px;
          height: 18px;
        }

        .status-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border-radius: 8px;
          margin-top: 16px;
          font-size: 0.95rem;
        }
        
        .status-message.success {
          background: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }
        
        .status-message.error {
          background: rgba(231, 76, 60, 0.15);
          color: #e74c3c;
        }
        
        .status-message svg {
          width: 18px;
          height: 18px;
        }

        .divider {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin: 0 10px;
        }
        
        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        }
        
        .divider span {
          background: #00488e;
          padding: 0 16px;
          z-index: 1;
          color: #a0cfff;
          font-size: 0.9rem;
        }

        .stay-right {
          flex: 1 1 350px;
          display: flex;
          align-items: center;
      
        }

        .whatsapp-box {
          background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
          color: #212529;
          padding: 30px;
          border-radius: 16px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0, 38, 77, 0.1);
        }
        
        .whatsapp-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        
        .whatsapp-icon {
          width: 40px;
          height: 40px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .whatsapp-icon svg {
          width: 24px;
          height: 24px;
        }
        
        .whatsapp-header h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #212529;
        }

        .whatsapp-description {
          color: #6c757d;
          margin-bottom: 24px;
          line-height: 1.5;
        }

        .whatsapp-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: #f8f9fa;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          margin-bottom: 24px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .whatsapp-link:hover {
          background: #e9ecef;
          transform: translateY(-2px);
        }
        
        .whatsapp-number {
          font-weight: 700;
          color: #25D366;
          font-size: 1.1rem;
        }
        
        .arrow {
          width: 18px;
          height: 18px;
          color: #6c757d;
        }

        .qr-section {
          text-align: center;
        }
        
        .qr-placeholder {
          display: inline-block;
          padding: 16px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          margin-bottom: 12px;
        }
        
        .qr-code {
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .qr-text {
          font-size: 0.9rem;
          color: #6c757d;
          margin: 0;
        }

        @media (max-width: 968px) {
          .stay-updated-container {
            padding: 40px 30px;
            gap: 30px;
          }
          
          .divider {
            margin: 20px 0;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .stay-updated-container {
            flex-direction: column;
            padding: 30px 20px;
          }
          
          .stay-left {
            padding-right: 0;
          }
          
          .subscription-form {
            flex-direction: column;
          }
          
          .subscribe-btn {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}