import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000/api/coupons";

export default function TopOffersMarquee() {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => setCoupons(res.data))
            .catch((err) => console.error("Error fetching coupons:", err));
    }, []);

    if (coupons.length === 0) {
        return null; // Hide if no coupons
    }

    return (
        <>
            <style>{`
        .marquee-wrapper {
          width: 100%;
          // background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 30px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
          margin-top: 80px
        }

        .marquee-heading {
          font-size: 28px;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .marquee-heading:after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #FF6B6B, #FF8E53);
          border-radius: 2px;
        }

        .marquee-container {
          width: 100%;
          padding: 20px 0;
          overflow: hidden;
          position: relative;
        }

        .marquee-container:before, 
        .marquee-container:after {
          content: '';
          position: absolute;
          top: 0;
          height: 100%;
          width: 100px;
          z-index: 2;
        }

        .marquee-container:before {
          left: 0;
          background: linear-gradient(90deg, #f5f7fa 0%, transparent 100%);
        }

        .marquee-container:after {
          right: 0;
          background: linear-gradient(270deg, #f5f7fa 0%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          width: max-content;
          gap: 25px;
          animation: scroll-left 30s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .offer-card {
          flex-shrink: 0;
          width: 260px;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s ease;
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
          position: relative;
        }

        .offer-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }

        .offer-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(90deg, #FF6B6B, #FF8E53);
          color: white;
          font-size: 12px;
          font-weight: bold;
          padding: 4px 10px;
          border-radius: 20px;
          z-index: 3;
          box-shadow: 0 4px 8px rgba(255, 107, 107, 0.3);
        }

        .offer-image-container {
          position: relative;
          width: 100%;
          height: 150px;
          overflow: hidden;
        }

        .offer-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .offer-card:hover .offer-image {
          transform: scale(1.1);
        }

        .offer-details {
          padding: 16px;
          position: relative;
        }

        .offer-title {
          font-size: 16px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 6px;
          line-height: 1.4;
        }

        .offer-subtitle {
          font-weight: 500;
          color: #718096;
          font-size: 14px;
        }

        .offer-store {
          font-size: 13px;
          color: #a0aec0;
          margin-top: 8px;
          display: flex;
          align-items: center;
        }

        .offer-store:before {
          content: '🏪';
          margin-right: 6px;
        }

        .offer-card:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
          transform: scaleX(0);
          transform-origin: bottom right;
          transition: transform 0.4s ease;
        }

        .offer-card:hover:after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }

        @media (max-width: 768px) {
          .marquee-heading {
            font-size: 22px;
          }
          
          .offer-card {
            width: 220px;
          }
        }
      `}</style>

            <div className="marquee-wrapper">
                {/* Heading */}
                <h2 className="marquee-heading">Exclusive Offers</h2>

                {/* Marquee */}
                <div className="marquee-container">
                    <div className="marquee-track">
                        {/* Duplicate coupons once for seamless loop */}
                        {[...coupons, ...coupons].map((coupon, index) => (
                            <div key={coupon._id + "-" + index} className="offer-card">
                                <div className="offer-image-container">
                                    <img
                                        src={`http://localhost:4000${coupon.image.replace(/\\/g, "/")}`}
                                        alt={coupon.offerTitle?.highlight || "Offer"}
                                        className="offer-image"
                                    />
                                    <div className="offer-badge">HOT DEAL</div>
                                </div>

                                <div className="offer-details">
                                    <h3 className="offer-title">
                                        {coupon.offerTitle?.highlight}{" "}
                                        <span className="offer-subtitle">
                                            {coupon.offerTitle?.normal}
                                        </span>
                                    </h3>
                                    <p className="offer-store">
                                        {coupon.storeName?.storeName || "Unknown Store"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}