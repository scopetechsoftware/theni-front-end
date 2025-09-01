import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const coupons = [
  {
    couponCode: "2892994",
    storeName: "Pizzeria Fantasia",
    category: "Food",
    image: "https://placehold.co/400x200/F7A800/000?text=Pizza",
    offerTitle: { highlight: "Free Pizza Slice", normal: " with any large pizza order" },
    plan: "platinum",
    location: { city: "New York", district: "Manhattan" },
    expiredDate: "2025-09-02",
  },
  {
    couponCode: "4321098",
    storeName: "Golden Spoon",
    category: "Restaurant",
    image: "https://placehold.co/400x200/F7A800/000?text=Dining",
    offerTitle: { highlight: "20% Off", normal: " your entire bill" },
    plan: "gold",
    location: { city: "Los Angeles", district: "Hollywood" },
    expiredDate: "2025-10-15",
  },
  {
    couponCode: "5678123",
    storeName: "Style Haven",
    category: "Fashion",
    image: "https://placehold.co/400x200/F7A800/000?text=Fashion",
    offerTitle: { highlight: "Buy One, Get One", normal: " on all T-shirts" },
    plan: "silver",
    location: { city: "New York", district: "Brooklyn" },
    expiredDate: "2025-08-31",
  },
  {
    couponCode: "9876543",
    storeName: "Tech Gadgets",
    category: "Electronics",
    image: "https://placehold.co/400x200/F7A800/000?text=Electronics",
    offerTitle: { highlight: "10% Discount", normal: " on all laptops" },
    plan: "platinum",
    location: { city: "Los Angeles", district: "Santa Monica" },
    expiredDate: "2025-09-10",
  },
  {
    couponCode: "3456789",
    storeName: "Coffee Corner",
    category: "Food",
    image: "https://placehold.co/400x200/F7A800/000?text=Coffee",
    offerTitle: { highlight: "Free Coffee", normal: " with any pastry purchase" },
    plan: "gold",
    location: { city: "New York", district: "Manhattan" },
    expiredDate: "2025-09-01",
  },
  {
    couponCode: "1122334",
    storeName: "Fitness First",
    category: "Health",
    image: "https://placehold.co/400x200/F7A800/000?text=Fitness",
    offerTitle: { highlight: "One Month Free", normal: " on new gym memberships" },
    plan: "platinum",
    location: { city: "Los Angeles", district: "Hollywood" },
    expiredDate: "2025-09-05",
  },
  {
    couponCode: "5566778",
    storeName: "Bookworm's Paradise",
    category: "Books",
    image: "https://placehold.co/400x200/F7A800/000?text=Books",
    offerTitle: { highlight: "Buy 2, Get 1 Free", normal: " on all fiction books" },
    plan: "silver",
    location: { city: "Chicago", district: "Lincoln Park" },
    expiredDate: "2025-11-20",
  },
  {
    couponCode: "9988776",
    storeName: "Movieplex",
    category: "Entertainment",
    image: "https://placehold.co/400x200/F7A800/000?text=Movies",
    offerTitle: { highlight: "50% Off", normal: " on movie tickets for two" },
    plan: "platinum",
    location: { city: "Chicago", district: "The Loop" },
    expiredDate: "2025-08-28",
  },
];


const CouponFilter = () => {
  const [filteredCoupons, setFilteredCoupons] = useState(coupons);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");

  const filterCoupons = () => {
    const now = dayjs();
    const filtered = coupons.filter((coupon) => {
      const expired = dayjs(coupon.expiredDate).isBefore(now, "day");
      const matchesSearch = coupon.offerTitle.highlight.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter ? coupon.category === categoryFilter : true;
      const matchesLocation = locationFilter ? (coupon.location.city.toLowerCase().includes(locationFilter.toLowerCase()) || coupon.location.district.toLowerCase().includes(locationFilter.toLowerCase())) : true;
      const matchesPlan = planFilter ? coupon.plan === planFilter : true;
      
      return !expired && matchesSearch && matchesCategory && matchesLocation && matchesPlan;
    });
    setFilteredCoupons(filtered);
  };

  useEffect(() => {
    filterCoupons();
  }, [search, categoryFilter, locationFilter, planFilter]);

  const handleClearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setLocationFilter("");
    setPlanFilter("");
  };

  const calculateExpiry = (date) => {
    const now = dayjs();
    const expiry = dayjs(date);
    const diff = expiry.diff(now, "day");
    if (diff <= 2 && diff >= 0) return `Expiring soon: ${diff} days left`;
    if (diff > 2) return `Expires in ${diff} days`;
    return "Expired";
  };
  
  const getExpiryColor = (date) => {
    const now = dayjs();
    const expiry = dayjs(date);
    const diff = expiry.diff(now, "day");
    if (diff <= 2) return "red";
    return "#6b7280";
  }

  const categories = [...new Set(coupons.map((c) => c.category).filter(Boolean))];
  const locations = [...new Set(coupons.map((c) => c.location.city).filter(Boolean))];
  const plans = [...new Set(coupons.map((c) => c.plan).filter(Boolean))];

  return (
    <>
      <style>
        {`
        .coupon-container {
          min-height: 100vh;
          background-color: #f3f4f6;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }

        .max-w-7xl {
          max-width: 1280px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 2.25rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 2rem;
          text-align: center;
        }

        .filter-section {
          background-color: #fff;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          margin-bottom: 2rem;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .filter-section {
            flex-direction: row;
          }
        }

        .filter-input, .filter-select {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 9999px;
          outline: none;
          transition: all 300ms;
        }
        .filter-input:focus, .filter-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px #3b82f6;
        }
        .filter-input {
          flex: 1;
        }
        @media (min-width: 768px) {
          .filter-input, .filter-select {
            width: auto;
          }
        }

        .clear-button {
          width: 100%;
          padding: 0.5rem 1.5rem;
          background-color: #e5e7eb;
          color: #374151;
          border: none;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: all 300ms;
        }
        .clear-button:hover {
          background-color: #d1d5db;
        }
        @media (min-width: 768px) {
          .clear-button {
            width: auto;
          }
        }

        .coupon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .coupon-card {
          position: relative;
          background-color: #fff;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          overflow: hidden;
          transition: transform 300ms ease-in-out;
        }
        .coupon-card:hover {
          transform: scale(1.05);
        }

        .coupon-plan {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background-color: #fcd34d;
          color: #000;
          font-size: 0.75rem;
          font-weight: bold;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          text-transform: uppercase;
          z-index: 10;
        }

        .coupon-image {
          width: 100%;
          height: 12rem;
          object-fit: cover;
          border-radius: 1rem 1rem 0 0;
        }

        .coupon-content {
          padding: 1.5rem;
        }

        .coupon-title {
          font-size: 1.25rem;
          font-weight: bold;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .coupon-subtitle {
          font-size: 1rem;
          font-weight: normal;
          color: #4b5563;
        }

        .info-section {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .expiry-text {
          margin-top: 0.5rem;
          font-weight: 600;
        }

        .no-coupons {
          text-align: center;
          color: #6b7280;
          font-size: 1.125rem;
          padding-top: 3rem;
          padding-bottom: 3rem;
          grid-column: 1 / -1; /* Span across all columns */
        }
        `}
      </style>

      <div className="coupon-container">
        <div className="max-w-7xl">
          <h1 className="page-title">Your Coupons</h1>
          
          <div className="filter-section">
            <input
              type="text"
              placeholder="Search by offer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="filter-input"
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">All Plans</option>
              {plans.map((p) => (
                <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
              ))}
            </select>
            <button
              onClick={handleClearFilters}
              className="clear-button"
            >
              Clear
            </button>
          </div>

          <div className="coupon-grid">
            {filteredCoupons.length > 0 ? (
              filteredCoupons.map((coupon) => (
                <div
                  key={coupon.couponCode}
                  className="coupon-card"
                  style={{ transform: 'scale(1)', transition: 'transform 300ms ease-in-out' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div className="coupon-plan">
                    {coupon.plan}
                  </div>
                  <img
                    src={coupon.image}
                    alt={coupon.offerTitle.highlight}
                    className="coupon-image"
                    onError={(e) => e.target.src = 'https://placehold.co/400x200/F7A800/000?text=Coupon'}
                  />
                  <div className="coupon-content">
                    <h2 className="coupon-title">
                      {coupon.offerTitle.highlight}
                      <span className="coupon-subtitle"> {coupon.offerTitle.normal}</span>
                    </h2>
                    <div className="info-section">
                      <p className="info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" style={{ height: '1rem', width: '1rem' }}>
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{coupon.location.city}, {coupon.location.district}</span>
                      </p>
                      <p className="info-item">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" style={{ height: '1rem', width: '1rem' }}>
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span>{coupon.storeName}</span>
                      </p>
                    </div>
                    <div className="expiry-text" style={{ color: getExpiryColor(coupon.expiredDate) }}>
                      {calculateExpiry(coupon.expiredDate)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-coupons">
                No coupons found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponFilter;
