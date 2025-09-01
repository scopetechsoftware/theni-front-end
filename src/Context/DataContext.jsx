import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// 1. Create Context
export const DetailsContext = createContext();

const DataContextProvider = ({ children }) => {
  const api = "http://localhost:4000";

  // 2. States for all 5 APIs
  const [ads, setAds] = useState(null);
  const [students, setStudents] = useState(null);
  const [placements, setPlacements] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [offers, setOffers] = useState(null);

  // 3. Fetch functions
  const fetchAds = async () => {
    try {
      const res = await axios.get(`${api}/api/ads`);
      setAds(res.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
  };

//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get(`${api}/api/students`);
//       setStudents(res.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   const fetchPlacements = async () => {
//     try {
//       const res = await axios.get(`${api}/api/placements`);
//       setPlacements(res.data);
//     } catch (error) {
//       console.error("Error fetching placements:", error);
//     }
//   };

//   const fetchReviews = async () => {
//     try {
//       const res = await axios.get(`${api}/api/reviews`);
//       setReviews(res.data);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     }
//   };

//   const fetchOffers = async () => {
//     try {
//       const res = await axios.get(`${api}/api/offers`);
//       setOffers(res.data);
//     } catch (error) {
//       console.error("Error fetching offers:", error);
//     }
//   };

  // 4. Auto-fetch when component mounts (optional)
  useEffect(() => {
    fetchAds();
    // fetchStudents();
    // fetchPlacements();
    // fetchReviews();
    // fetchOffers();
  }, []);

  const coupons = [
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c5d", // example ObjectId of Store
    image: "coupon1.jpg",
    offerTitle: { highlight: "50% OFF", normal: "on all electronics" },
    description: "Get 50% off on all electronics this weekend only!",
    termsAndCondition: "Valid till stocks last. Not combinable with other offers.",
    expiredDate: new Date("2025-12-31"),
    addsPoster: "poster1.jpg",
    couponCode: "ELEC50",
    category: "Electronics",
    location: { district: "Central", city: "Mumbai", pincode: "400001" },
    plan: "platinum",
    shareLink: "http://example.com/coupon/elec50",
    watermarkImage: "watermark1.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c5e",
    image: "coupon2.jpg",
    offerTitle: { highlight: "Buy 1 Get 1", normal: "on all shoes" },
    description: "Exclusive B1G1 offer on all branded shoes.",
    termsAndCondition: "Valid for first 100 customers.",
    expiredDate: new Date("2025-11-30"),
    addsPoster: "poster2.jpg",
    couponCode: "SHOESB1G1",
    category: "Footwear",
    location: { district: "North", city: "Delhi", pincode: "110001" },
    plan: "gold",
    shareLink: "http://example.com/coupon/shoesb1g1",
    watermarkImage: "watermark2.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c5f",
    image: "coupon3.jpg",
    offerTitle: { highlight: "30% OFF", normal: "on all apparels" },
    description: "Get flat 30% discount on new arrivals.",
    termsAndCondition: "Offer valid online only.",
    expiredDate: new Date("2025-10-15"),
    addsPoster: "poster3.jpg",
    couponCode: "APPAREL30",
    category: "Fashion",
    location: { district: "West", city: "Bengaluru", pincode: "560001" },
    plan: "diamond",
    shareLink: "http://example.com/coupon/apparel30",
    watermarkImage: "watermark3.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c60",
    image: "coupon4.jpg",
    offerTitle: { highlight: "25% Cashback", normal: "on grocery" },
    description: "Get 25% cashback on your grocery bill.",
    termsAndCondition: "Valid on minimum purchase of ₹500.",
    expiredDate: new Date("2025-09-30"),
    addsPoster: "poster4.jpg",
    couponCode: "GROC25",
    category: "Grocery",
    location: { district: "East", city: "Kolkata", pincode: "700001" },
    plan: "platinum",
    shareLink: "http://example.com/coupon/groc25",
    watermarkImage: "watermark4.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c61",
    image: "coupon5.jpg",
    offerTitle: { highlight: "Free Dessert", normal: "on orders above ₹1000" },
    description: "Get a complimentary dessert with your meal order above ₹1000.",
    termsAndCondition: "Valid only on weekends.",
    expiredDate: new Date("2025-12-15"),
    addsPoster: "poster5.jpg",
    couponCode: "FREEDESSERT",
    category: "Food & Beverages",
    location: { district: "Central", city: "Chennai", pincode: "600001" },
    plan: "gold",
    shareLink: "http://example.com/coupon/freedessert",
    watermarkImage: "watermark5.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c62",
    image: "coupon6.jpg",
    offerTitle: { highlight: "10% OFF", normal: "on home appliances" },
    description: "Save 10% on all home appliances till end of month.",
    termsAndCondition: "Cannot be combined with bank offers.",
    expiredDate: new Date("2025-08-31"),
    addsPoster: "poster6.jpg",
    couponCode: "HOME10",
    category: "Home Appliances",
    location: { district: "South", city: "Hyderabad", pincode: "500001" },
    plan: "diamond",
    shareLink: "http://example.com/coupon/home10",
    watermarkImage: "watermark6.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c63",
    image: "coupon7.jpg",
    offerTitle: { highlight: "Flat ₹200 OFF", normal: "on beauty products" },
    description: "Get flat ₹200 discount on all beauty & skincare products.",
    termsAndCondition: "Valid for first 50 orders per day.",
    expiredDate: new Date("2025-09-10"),
    addsPoster: "poster7.jpg",
    couponCode: "BEAUTY200",
    category: "Beauty & Wellness",
    location: { district: "North", city: "Pune", pincode: "411001" },
    plan: "platinum",
    shareLink: "http://example.com/coupon/beauty200",
    watermarkImage: "watermark7.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c64",
    image: "coupon8.jpg",
    offerTitle: { highlight: "Buy 2 Get 1 Free", normal: "on books" },
    description: "Buy any 2 books and get 1 free on all collections.",
    termsAndCondition: "Free book of equal or lesser value.",
    expiredDate: new Date("2025-12-01"),
    addsPoster: "poster8.jpg",
    couponCode: "BOOKSBOGO",
    category: "Books",
    location: { district: "East", city: "Jaipur", pincode: "302001" },
    plan: "gold",
    shareLink: "http://example.com/coupon/booksbogo",
    watermarkImage: "watermark8.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c65",
    image: "coupon9.jpg",
    offerTitle: { highlight: "15% OFF", normal: "on sports gear" },
    description: "Get 15% discount on all sports equipment.",
    termsAndCondition: "Valid online and offline.",
    expiredDate: new Date("2025-11-20"),
    addsPoster: "poster9.jpg",
    couponCode: "SPORTS15",
    category: "Sports",
    location: { district: "West", city: "Ahmedabad", pincode: "380001" },
    plan: "diamond",
    shareLink: "http://example.com/coupon/sports15",
    watermarkImage: "watermark9.png"
  },
  {
    storeName: "64f1a2b5c2e4f1d2a3b4c66",
    image: "coupon10.jpg",
    offerTitle: { highlight: "Free Shipping", normal: "on orders above ₹500" },
    description: "Enjoy free shipping on all orders above ₹500.",
    termsAndCondition: "Valid for standard delivery only.",
    expiredDate: new Date("2025-12-31"),
    addsPoster: "poster10.jpg",
    couponCode: "FREESHIP500",
    category: "E-commerce",
    location: { district: "Central", city: "Lucknow", pincode: "226001" },
    plan: "platinum",
    shareLink: "http://example.com/coupon/freeship500",
    watermarkImage: "watermark10.png"
  }
];




  // 5. Provide values to all pages
  return (
    <DetailsContext.Provider
      value={{
        ads,
        coupons
        // placements,
        // reviews,
        // offers,
        // fetchAds,
        // fetchStudents,
        // fetchPlacements,
        // fetchReviews,
        // fetchOffers,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

export default DataContextProvider;
