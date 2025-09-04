import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const API_URL = "http://localhost:4000/api/coupons";

const CouponFilter = () => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Fetch from API
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        setCoupons(res.data);
        setFilteredCoupons(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching coupons:", err);
        setIsLoading(false);
      });
  }, []);

  // Filtering logic
  const filterCoupons = () => {
    const now = dayjs();
    const filtered = coupons.filter((coupon) => {
      const expired = dayjs(coupon.expiredDate).isBefore(now, "day");
      const matchesSearch = coupon.offerTitle?.highlight
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory = categoryFilter
        ? (coupon.category || coupon.storeName?.category) === categoryFilter
        : true;
      const matchesLocation = locationFilter
        ? coupon.location?.city?.toLowerCase().includes(locationFilter.toLowerCase()) ||
        coupon.location?.district?.toLowerCase().includes(locationFilter.toLowerCase())
        : true;
      const matchesPlan = planFilter
        ? (coupon.plan || coupon.storeName?.plan) === planFilter
        : true;

      return !expired && matchesSearch && matchesCategory && matchesLocation && matchesPlan;
    });
    setFilteredCoupons(filtered);
  };

  useEffect(() => {
    filterCoupons();
  }, [search, categoryFilter, locationFilter, planFilter, coupons]);

  const handleClearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setLocationFilter("");
    setPlanFilter("");
  };

  const calculateExpiry = (date) => {
    const now = dayjs();
    const expiry = dayjs(date);
    const diffDays = expiry.diff(now, "day");
    const diffHours = expiry.diff(now, "hour");

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) {
      const hoursLeft = diffHours % 24;
      const minutesLeft = expiry.diff(now, "minute") % 60;
      return `${hoursLeft}:${minutesLeft.toString().padStart(2, '0')} hours left`;
    }
    if (diffDays <= 2) {
      const hoursLeft = diffHours % 24;
      const minutesLeft = expiry.diff(now, "minute") % 60;
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ${hoursLeft}:${minutesLeft.toString().padStart(2, '0')} left`;
    }
    return `${diffDays} days left`;
  };

  const getExpiryColor = (date) => {
    const now = dayjs();
    const expiry = dayjs(date);
    const diff = expiry.diff(now, "day");
    if (diff <= 2) return "#e53e3e"; // Red for urgent
    if (diff <= 7) return "#dd6b20"; // Orange for soon
    return "#38a169"; // Green for plenty of time
  };

  const getExpiryBadgeVariant = (date) => {
    const now = dayjs();
    const expiry = dayjs(date);
    const diff = expiry.diff(now, "day");
    if (diff <= 2) return "urgent";
    if (diff <= 7) return "soon";
    return "normal";
  };

  // Dropdown options
  const categories = [...new Set(coupons.map((c) => c.category || c.storeName?.category).filter(Boolean))];
  const locations = [...new Set(coupons.map((c) => c.location?.city).filter(Boolean))];
  const plans = [...new Set(coupons.map((c) => c.plan || c.storeName?.plan).filter(Boolean))];

  return (
    <div className="coupon-app">
      <div className="coupon-container">
        <div className="app-header">
          <h1 className="page-title">Exclusive Coupons</h1>
          <p className="page-subtitle">Discover amazing deals and save on your favorite brands</p>
        </div>

        {/* Filters Section */}
        <div className="filters-card">
          <div className="filters-header">
            <h2>Filter Coupons</h2>
            <button onClick={handleClearFilters} className="clear-filters-btn">
              <i className="fas fa-times"></i> Clear All
            </button>
          </div>

          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="search">Search Offers</label>
              <div className="search-input-container">
                <i className="fas fa-search"></i>
                <input
                  id="search"
                  type="text"
                  placeholder="Find offers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="filter-input"
                />
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="category">Category</label>
              <div className="select-container">
                <i className="fas fa-tag"></i>
                <select
                  id="category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="location">Location</label>
              <div className="select-container">
                <i className="fas fa-map-marker-alt"></i>
                <select
                  id="location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Locations</option>
                  {locations.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="plan">Plan Type</label>
              <div className="select-container">
                <i className="fas fa-crown"></i>
                <select
                  id="plan"
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Plans</option>
                  {plans.map((p) => (
                    <option key={p} value={p}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing <span>{filteredCoupons.length}</span> of <span>{coupons.length}</span> available coupons</p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading coupons...</p>
          </div>
        )}

        {/* Coupons Grid */}
        {!isLoading && (
          <div className="coupon-grid">
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <div key={coupon._id} className="premium-coupon-card">
                  <div className="premium-card-header">
                    <div className="premium-badges-container">
                      <span className={`premium-plan-badge plan-${(coupon.plan || coupon.storeName?.plan || 'basic').toLowerCase()}`}>
                        <i className="fas fa-crown"></i>
                        {coupon.plan || coupon.storeName?.plan || 'Basic'}
                      </span>
                      <span className={`premium-expiry-badge ${getExpiryBadgeVariant(coupon.expiredDate)}`}>
                        <i className="fas fa-clock"></i>
                        {calculateExpiry(coupon.expiredDate)}
                      </span>
                    </div>
                  </div>

                  <div className="premium-image-container">
                    <div className="premium-image-frame">
                      <img
                        src={`http://localhost:4000${coupon.image?.replace(/\\/g, "/")}`}
                        alt={coupon.offerTitle?.highlight}
                        className="premium-coupon-image"
                        onError={(e) =>
                        (e.target.src =
                          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80")
                        }
                      />
                      <div className="premium-image-overlay">
                        <div className="premium-discount-badge">
                          <i className="fas fa-percentage"></i>
                          <span>SAVE NOW</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="premium-content">
                    <div className="premium-title-section">
                      <h3 className="premium-highlight-title">
                        {coupon.offerTitle?.highlight}
                      </h3>
                      {coupon.offerTitle?.normal && (
                        <p className="premium-subtitle">{coupon.offerTitle?.normal}</p>
                      )}
                    </div>

                    <div className="premium-details-grid">
                      <div className="premium-detail-item">
                        <div className="premium-detail-icon">
                          <i className="fas fa-store"></i>
                        </div>
                        <div className="premium-detail-text">
                          <span className="detail-label">Store</span>
                          <span className="detail-value">{coupon.storeName?.storeName || "Unknown Store"}</span>
                        </div>
                      </div>

                      <div className="premium-detail-item">
                        <div className="premium-detail-icon">
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="premium-detail-text">
                          <span className="detail-label">Location</span>
                          <span className="detail-value">{coupon.location?.city}, {coupon.location?.district}</span>
                        </div>
                      </div>

                      <div className="premium-detail-item">
                        <div className="premium-detail-icon">
                          <i className="fas fa-tag"></i>
                        </div>
                        <div className="premium-detail-text">
                          <span className="detail-label">Category</span>
                          <span className="detail-value">{coupon.category || coupon.storeName?.category || "Uncategorized"}</span>
                        </div>
                      </div>
                    </div>

                    <button className="premium-use-btn" onClick={() => setSelectedCoupon(coupon)}>
                      <div className="btn-content">
                        <i className="fas fa-ticket-alt"></i>
                        <span>Claim This Offer</span>
                      </div>
                      <div className="btn-shine"></div>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <div className="no-results-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>No coupons found</h3>
                <p>Try adjusting your filters to find more deals</p>
                <button onClick={handleClearFilters} className="cta-button">
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Premium Modal */}
            {selectedCoupon && (
              <div className="premium-modal-overlay" onClick={() => setSelectedCoupon(null)}>
                <div className="premium-modal-content" onClick={(e) => e.stopPropagation()}>
                  <div className="premium-modal-header">
                    <span className="premium-close-btn" onClick={() => setSelectedCoupon(null)}>
                      <i className="fas fa-times"></i>
                    </span>
                    <div className="modal-plan-badge">
                      <span className={`premium-plan-badge plan-${(selectedCoupon.plan || selectedCoupon.storeName?.plan || 'basic').toLowerCase()}`}>
                        <i className="fas fa-crown"></i>
                        {selectedCoupon.plan || selectedCoupon.storeName?.plan || 'Basic'}
                      </span>
                    </div>
                  </div>

                  <div className="premium-modal-image-container">
                    <img
                      src={`http://localhost:4000${selectedCoupon.image?.replace(/\\/g, "/")}`}
                      alt={selectedCoupon.offerTitle?.highlight}
                      className="premium-modal-image"
                      onError={(e) =>
                        (e.target.src =
                          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80")
                      }
                    />
                  </div>

                  <div className="premium-modal-body">
                    <div className="premium-modal-title-section">
                      <h2 className="premium-modal-highlight">{selectedCoupon.offerTitle?.highlight}</h2>
                      {selectedCoupon.offerTitle?.normal && (
                        <p className="premium-modal-subtitle">{selectedCoupon.offerTitle?.normal}</p>
                      )}
                    </div>

                    <div className="premium-modal-details">
                      <div className="premium-modal-detail">
                        <div className="modal-detail-icon">
                          <i className="fas fa-store"></i>
                        </div>
                        <div className="modal-detail-content">
                          <span className="modal-detail-label">Store</span>
                          <span className="modal-detail-value">{selectedCoupon.storeName?.storeName}</span>
                        </div>
                      </div>

                      <div className="premium-modal-detail">
                        <div className="modal-detail-icon">
                          <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <div className="modal-detail-content">
                          <span className="modal-detail-label">Location</span>
                          <span className="modal-detail-value">{selectedCoupon.location?.city}, {selectedCoupon.location?.district}</span>
                        </div>
                      </div>

                      <div className="premium-modal-detail">
                        <div className="modal-detail-icon">
                          <i className="fas fa-tag"></i>
                        </div>
                        <div className="modal-detail-content">
                          <span className="modal-detail-label">Category</span>
                          <span className="modal-detail-value">{selectedCoupon.category}</span>
                        </div>
                      </div>

                      <div className="premium-modal-detail">
                        <div className="modal-detail-icon">
                          <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="modal-detail-content">
                          <span className="modal-detail-label">Expires</span>
                          <span className="modal-detail-value">{calculateExpiry(selectedCoupon.expiredDate)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="premium-modal-actions">
                      <button
                        className="premium-share-btn"
                        onClick={() => {
                          const text = `🎉 ${selectedCoupon.offerTitle?.highlight}\nStore: ${selectedCoupon.storeName?.storeName}\nLocation: ${selectedCoupon.location?.city}, ${selectedCoupon.location?.district}\nExpiry: ${calculateExpiry(selectedCoupon.expiredDate) }\ncoupon-code:${selectedCoupon.couponCode}`;
                          const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                          window.open(url, "_blank");
                        }}
                      >
                        <i className="fab fa-whatsapp"></i>
                        <span>Share on WhatsApp</span>
                      </button>

                      <button
                        className="premium-download-btn"
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = `http://localhost:4000${selectedCoupon.image?.replace(/\\/g, "/")}`;
                          link.download = "coupon.jpg";
                          link.click();
                        }}
                      >
                        <i className="fas fa-download"></i>
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .coupon-app {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
          padding: 20px;
          font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .coupon-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .app-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #00488E 0%, #F7A800 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .page-subtitle {
          font-size: 1.1rem;
          color: #718096;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Filters Card */
        .filters-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 72, 142, 0.1);
          padding: 24px;
          margin-bottom: 30px;
        }
        
        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .filters-header h2 {
          font-size: 1.5rem;
          color: #2d3748;
          margin: 0;
        }
        
        .clear-filters-btn {
          background: #f8f9fa;
          border: 1px solid #e2e8f0;
          color: #718096;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .clear-filters-btn:hover {
          background: #edf2f7;
          color: #4a5568;
        }
        
        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        .filter-group label {
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 8px;
          font-size: 0.9rem;
        }
        
        .search-input-container, .select-container {
          position: relative;
        }
        
        .search-input-container i, .select-container i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
          z-index: 1;
        }
        
        .filter-input, .filter-select {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.2s ease;
          background: white;
          color: #2d3748;
          appearance: none;
        }
        
        .filter-select {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px;
        }
        
        .filter-input:focus, .filter-select:focus {
          border-color: #00488E;
          box-shadow: 0 0 0 3px rgba(0, 72, 142, 0.2);
          outline: none;
        }
        
        /* Results Info */
        .results-info {
          margin-bottom: 20px;
          font-size: 0.9rem;
          color: #718096;
        }
        
        .results-info span {
          font-weight: 600;
          color: #00488E;
        }
        
        /* Loading State */
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }
        
        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #00488E;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Coupon Grid */
        .coupon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        
        /* Premium Coupon Card */
        .premium-coupon-card {
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 72, 142, 0.12);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        
        .premium-coupon-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00488E 0%, #F7A800 50%, #00488E 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .premium-coupon-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 72, 142, 0.25);
        }
        
        .premium-coupon-card:hover::before {
          opacity: 1;
        }
        
        .premium-card-header {
          padding: 0;
          background: transparent;
          position: absolute;
          top: 16px;
          left: 16px;
          right: 16px;
          z-index: 2;
        }
        
        .premium-badges-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .premium-plan-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .premium-plan-badge.plan-gold {
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.9) 0%, rgba(255, 193, 7, 0.9) 100%);
          color: #1a1a1a;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
        }

        .premium-plan-badge.plan-platinum {
          background: linear-gradient(135deg, rgba(229, 228, 226, 0.9) 0%, rgba(192, 192, 192, 0.9) 100%);
          color: #1a1a1a;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
        }

        .premium-plan-badge.plan-diamond {
          background: linear-gradient(135deg, rgba(185, 242, 255, 0.9) 0%, rgba(147, 197, 253, 0.9) 100%);
          color: #1a1a1a;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
        }

        .premium-plan-badge.plan-basic {
          background: linear-gradient(135deg, rgba(107, 114, 128, 0.9) 0%, rgba(75, 85, 99, 0.9) 100%);
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }
        
        .premium-expiry-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 50px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .premium-expiry-badge.urgent {
          background: linear-gradient(135deg, rgba(254, 215, 215, 0.95) 0%, rgba(252, 165, 165, 0.95) 100%);
          color: #991b1b;
        }
        
        .premium-expiry-badge.soon {
          background: linear-gradient(135deg, rgba(254, 235, 203, 0.95) 0%, rgba(251, 191, 36, 0.95) 100%);
          color: #92400e;
        }
        
        .premium-expiry-badge.normal {
          background: linear-gradient(135deg, rgba(198, 246, 213, 0.95) 0%, rgba(134, 239, 172, 0.95) 100%);
          color: #14532d;
        }
        
        .premium-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: linear-gradient(45deg, #f0f4f8, #e2e8f0);
        }
        
        .premium-image-frame {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .premium-coupon-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(1.05) saturate(1.1);
        }
        
        .premium-coupon-card:hover .premium-coupon-image {
          transform: scale(1.08);
          filter: brightness(1.1) saturate(1.2);
        }
        
        .premium-image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 60%,
            rgba(0, 0, 0, 0.3) 85%,
            rgba(0, 0, 0, 0.6) 100%
          );
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 16px;
        }
        
        .premium-discount-badge {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .premium-content {
          padding: 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: white;
        }
        
        .premium-title-section {
          text-align: center;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .premium-highlight-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #1a202c;
          margin: 0 0 8px;
          line-height: 1.3;
          background: linear-gradient(135deg, #00488E 0%, #0066cc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        
        .premium-subtitle {
          font-size: 0.95rem;
          color: #64748b;
          font-weight: 500;
          margin: 0;
          line-height: 1.4;
        }
        
        .premium-details-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        
        .premium-detail-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }
        
        .premium-detail-item:hover {
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          transform: translateX(4px);
        }
        
        .premium-detail-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #00488E 0%, #0066cc 100%);
          border-radius: 10px;
          margin-right: 12px;
          color: white;
          font-size: 0.9rem;
          box-shadow: 0 4px 12px rgba(0, 72, 142, 0.3);
        }
        
        .premium-detail-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }
        
        .detail-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
        }
        
        .detail-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.2;
        }
        
        .premium-use-btn {
          margin-top: auto;
          padding: 16px 20px;
          background: linear-gradient(135deg, #00488E 0%, #0066cc 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.9rem;
          box-shadow: 0 6px 20px rgba(0, 72, 142, 0.3);
        }
        
        .premium-use-btn:hover {
          background: linear-gradient(135deg, #003366 0%, #00488E 100%);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 72, 142, 0.4);
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          position: relative;
          z-index: 1;
        }
        
        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.6s ease;
        }
        
        .premium-use-btn:hover .btn-shine {
          left: 100%;
        }
        
        /* No Results */
        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        
        .no-results-icon {
          font-size: 4rem;
          color: #e2e8f0;
          margin-bottom: 20px;
        }
        
        .no-results h3 {
          font-size: 1.5rem;
          color: #2d3748;
          margin-bottom: 10px;
        }
        
        .no-results p {
          color: #718096;
          margin-bottom: 20px;
        }
        
        .cta-button {
          padding: 12px 24px;
          background: #00488E;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .cta-button:hover {
          background: #003366;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 72, 142, 0.3);
        }

        /* Premium Modal */
        .premium-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
          animation: modalFadeIn 0.3s ease-out;
        }

        .premium-modal-content {
          background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 24px;
          max-width: 550px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .premium-modal-header {
          position: relative;
          padding: 20px 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .premium-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          color: #64748b;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .premium-close-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
          transform: scale(1.1);
        }

        .modal-plan-badge {
          margin-top: 4px;
        }

        .premium-modal-image-container {
          padding: 0 20px;
          margin-bottom: 24px;
        }

        .premium-modal-image {
          width: 100%;
          max-height: 280px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          transition: transform 0.3s ease;
        }

        .premium-modal-image:hover {
          transform: scale(1.02);
        }

        .premium-modal-body {
          padding: 0 20px 20px;
        }

        .premium-modal-title-section {
          text-align: center;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e2e8f0;
        }

        .premium-modal-highlight {
          font-size: 1.75rem;
          font-weight: 800;
          color: #1a202c;
          margin: 0 0 12px;
          line-height: 1.2;
          background: linear-gradient(135deg, #00488E 0%, #0066cc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .premium-modal-subtitle {
          font-size: 1rem;
          color: #64748b;
          font-weight: 500;
          margin: 0;
          line-height: 1.5;
        }

        .premium-modal-details {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .premium-modal-detail {
          display: flex;
          align-items: center;
          padding: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .premium-modal-detail:hover {
          background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 72, 142, 0.1);
        }

        .modal-detail-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #00488E 0%, #0066cc 100%);
          border-radius: 12px;
          margin-right: 16px;
          color: white;
          font-size: 1.1rem;
          box-shadow: 0 4px 15px rgba(0, 72, 142, 0.3);
        }

        .modal-detail-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
        }

        .modal-detail-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .modal-detail-value {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.3;
        }

        .premium-modal-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .premium-share-btn, .premium-download-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 20px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .premium-share-btn {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
        }

        .premium-download-btn {
          background: linear-gradient(135deg, #00488E 0%, #0066cc 100%);
          color: white;
          box-shadow: 0 6px 20px rgba(0, 72, 142, 0.3);
        }

        .premium-share-btn:hover {
          background: linear-gradient(135deg, #1DA851 0%, #0f6b5a 100%);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
        }

        .premium-download-btn:hover {
          background: linear-gradient(135deg, #003366 0%, #00488E 100%);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 72, 142, 0.4);
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .coupon-app {
            padding: 16px;
          }
          
          .page-title {
            font-size: 2rem;
          }
          
          .filters-grid {
            grid-template-columns: 1fr;
          }
          
          .coupon-grid {
            grid-template-columns: 1fr;
          }

          .premium-coupon-card {
            margin-bottom: 8px;
          }

          .premium-highlight-title {
            font-size: 1.2rem;
          }

          .premium-modal-content {
            margin: 10px;
            max-width: calc(100vw - 20px);
            border-radius: 20px;
          }

          .premium-modal-actions {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .premium-modal-highlight {
            font-size: 1.4rem;
          }

          .premium-details-grid {
            gap: 10px;
          }

          .premium-detail-item {
            padding: 12px;
          }

          .modal-detail-icon {
            width: 40px;
            height: 40px;
            margin-right: 12px;
          }
        }

        @media (max-width: 480px) {
          .premium-card-header {
            left: 12px;
            right: 12px;
            top: 12px;
          }

          .premium-badges-container {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }

          .premium-content {
            padding: 20px 16px;
          }

          .premium-highlight-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default CouponFilter;