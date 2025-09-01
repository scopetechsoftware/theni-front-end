import React, { useState, useEffect } from 'react';

// --- Dummy Store Data ---
const storesData = [
  {
    storeName: "Fashion Fusion",
    category: "Fashion",
    description: "Your ultimate destination for trendy and stylish clothing.",
    coverImage: "https://placehold.co/1200x400/F7A800/000?text=Fashion+Fusion",
    logoImage: "https://placehold.co/150x150/00488E/fff?text=FF",
    plan: "platinum",
    review: "Excellent service and a fantastic collection.",
    location: { district: "Manhattan", city: "New York", pincode: "10001" },
    galleryImages: [
      "https://placehold.co/600x400/F7A800/000?text=Gallery+1",
      "https://placehold.co/600x400/00488E/fff?text=Gallery+2",
      "https://placehold.co/600x400/F7A800/000?text=Gallery+3",
    ],
    aboutMe: "We believe in sustainable fashion and high-quality materials. Our mission is to provide stylish and comfortable apparel for everyone.",
    phoneNumber: "+12125550100",
    websiteLink: "https://www.fashionfusion.com",
    socialMediaLinks: {
      instagram: "https://instagram.com/fashionfusion",
      facebook: "https://facebook.com/fashionfusion",
      twitter: "https://twitter.com/fashionfusion",
      youtube: "https://youtube.com/fashionfusion",
      email: "contact@fashionfusion.com",
    },
    services: [
      { title: "Personal Styling", image: "https://placehold.co/300x200/F7A800/000?text=Styling", description: "Get a customized look with our expert stylists." },
      { title: "Alterations", image: "https://placehold.co/300x200/00488E/fff?text=Alterations", description: "Tailor your new clothes to fit you perfectly." },
    ],
    products: [
      { title: "Summer Dress", image: "https://placehold.co/300x200/F7A800/000?text=Dress", description: "A light and breezy dress for warm days." },
      { title: "Denim Jacket", image: "https://placehold.co/300x200/00488E/fff?text=Jacket", description: "A classic jacket for any occasion." },
    ],
  },
  {
    storeName: "Tasty Bites",
    category: "Food",
    description: "Serving delicious and fresh food daily with a smile.",
    coverImage: "https://placehold.co/1200x400/00488E/fff?text=Tasty+Bites",
    logoImage: "https://placehold.co/150x150/F7A800/000?text=TB",
    plan: "diamond",
    review: "The best burgers in town!",
    location: { district: "Hollywood", city: "Los Angeles", pincode: "90028" },
    galleryImages: [
      "https://placehold.co/600x400/00488E/fff?text=Food+1",
      "https://placehold.co/600x400/F7A800/000?text=Food+2",
      "https://placehold.co/600x400/00488E/fff?text=Food+3",
    ],
    aboutMe: "We use locally sourced ingredients to create mouth-watering dishes that are good for you and the planet.",
    phoneNumber: "+13235550101",
    websiteLink: "https://www.tastybites.com",
    socialMediaLinks: {
      instagram: "https://instagram.com/tastybites",
      facebook: "https://facebook.com/tastybites",
    },
    services: [
      { title: "Catering", image: "https://placehold.co/300x200/00488E/fff?text=Catering", description: "Professional catering for your next event." },
      { title: "Delivery", image: "https://placehold.co/300x200/F7A800/000?text=Delivery", description: "Get your favorite dishes delivered to your door." },
    ],
    products: [
      { title: "Gourmet Burger", image: "https://placehold.co/300x200/00488E/fff?text=Burger", description: "Our signature burger with special sauce." },
      { title: "Veggie Wrap", image: "https://placehold.co/300x200/F7A800/000?text=Wrap", description: "A fresh and healthy wrap with seasonal vegetables." },
    ],
  },
  {
    storeName: "Gadget Guru",
    category: "Electronics",
    description: "The latest electronics and gadgets for tech enthusiasts.",
    coverImage: "https://placehold.co/1200x400/F7A800/000?text=Gadget+Guru",
    logoImage: "https://placehold.co/150x150/00488E/fff?text=GG",
    plan: "gold",
    review: "Knowledgeable staff and great prices.",
    location: { district: "The Loop", city: "Chicago", pincode: "60601" },
    galleryImages: [
      "https://placehold.co/600x400/F7A800/000?text=Gadget+1",
      "https://placehold.co/600x400/00488E/fff?text=Gadget+2",
      "https://placehold.co/600x400/F7A800/000?text=Gadget+3",
    ],
    aboutMe: "We provide cutting-edge technology and unparalleled customer support to help you find the perfect device.",
    phoneNumber: "+13125550102",
    websiteLink: "https://www.gadgetguru.com",
    socialMediaLinks: {
      twitter: "https://twitter.com/gadgetguru",
      youtube: "https://youtube.com/gadgetguru",
    },
    services: [
      { title: "Device Repair", image: "https://placehold.co/300x200/F7A800/000?text=Repair", description: "Expert repair for all your electronic devices." },
    ],
    products: [
      { title: "Smartwatch", image: "https://placehold.co/300x200/00488E/fff?text=Watch", description: "Track your fitness and stay connected." },
      { title: "Wireless Headphones", image: "https://placehold.co/300x200/F7A800/000?text=Headphones", description: "Enjoy crystal-clear audio on the go." },
    ],
  },
];

// --- Store Card Component ---
const StoreCard = ({ store, onSelectStore }) => (
  <div className="store-card">
    <div className="card-header">
      <img src={store.logoImage} alt={`${store.storeName} Logo`} className="card-logo" />
      <div className="card-title-container">
        <h3 className="card-title">{store.storeName}</h3>
        <span className={`plan-badge ${store.plan}`}>{store.plan}</span>
      </div>
    </div>
    <p className="card-description">{store.description}</p>
    <div className="card-meta">
      <span>{store.category}</span>
      <span>{store.location.city}</span>
    </div>
    <button onClick={() => onSelectStore(store)} className="view-store-btn">
      View Store
    </button>
  </div>
);

// --- Store Detail Component ---
const StoreDetails = ({ store, onBack }) => (
  <div className="store-details">
    <button onClick={onBack} className="back-btn">&larr; Back to Stores</button>
    
    <div className="hero-section" style={{ backgroundImage: `url(${store.coverImage})` }}>
      <img src={store.logoImage} alt={`${store.storeName} Logo`} className="detail-logo" />
      <h1 className="detail-title">{store.storeName}</h1>
    </div>

    <div className="content-container">
      <p className="about-text">{store.aboutMe}</p>
      
      <div className="contact-info">
        <p><strong>Location:</strong> {store.location.district}, {store.location.city}, {store.location.pincode}</p>
        <p><strong>Phone:</strong> {store.phoneNumber}</p>
        <p><strong>Website:</strong> <a href={store.websiteLink} target="_blank" rel="noopener noreferrer">{store.websiteLink}</a></p>
      </div>

      <div className="section">
        <h2>Gallery</h2>
        <div className="gallery">
          {store.galleryImages.map((img, index) => (
            <img key={index} src={img} alt={`Gallery ${index + 1}`} className="gallery-img" />
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2>Services</h2>
        <div className="item-list">
          {store.services.map((service, index) => (
            <div key={index} className="item-card">
              <img src={service.image} alt={service.title} className="item-img" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2>Products</h2>
        <div className="item-list">
          {store.products.map((product, index) => (
            <div key={index} className="item-card">
              <img src={product.image} alt={product.title} className="item-img" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h2>Social Media</h2>
        <div className="social-links">
          {store.socialMediaLinks.instagram && <a href={store.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
          {store.socialMediaLinks.facebook && <a href={store.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>}
          {store.socialMediaLinks.twitter && <a href={store.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>}
          {store.socialMediaLinks.youtube && <a href={store.socialMediaLinks.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
          {store.socialMediaLinks.email && <a href={`mailto:${store.socialMediaLinks.email}`}>Email</a>}
        </div>
      </div>
    </div>
  </div>
);

// --- Main App Component ---
const App = () => {
  const [stores, setStores] = useState(storesData);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStore, setSelectedStore] = useState(null);

  const categories = [...new Set(storesData.map(s => s.category))];

  useEffect(() => {
    if (selectedCategory === "all") {
      setStores(storesData);
    } else {
      setStores(storesData.filter(store => store.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <>
      <style>
        {`
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .title {
            text-align: center;
            color: #333;
            margin-bottom: 2rem;
            font-size: 2.5rem;
          }
          .filter-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
          }
          .filter-btn {
            background-color: #fff;
            color: #00488E;
            border: 1px solid #00488E;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .filter-btn:hover, .filter-btn.active {
            background-color: #00488E;
            color: #fff;
          }
          .store-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }
          .store-card {
            background-color: #fff;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: transform 0.3s ease;
          }
          .store-card:hover {
            transform: translateY(-5px);
          }
          .card-header {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .card-logo {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid #F7A800;
            margin-bottom: 1rem;
          }
          .card-title-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .card-title {
            font-size: 1.25rem;
            font-weight: bold;
            color: #333;
          }
          .plan-badge {
            font-size: 0.75rem;
            padding: 0.2rem 0.6rem;
            border-radius: 10px;
            text-transform: uppercase;
            color: #fff;
            font-weight: bold;
          }
          .plan-badge.platinum { background-color: #00488E; }
          .plan-badge.diamond { background-color: #F7A800; }
          .plan-badge.gold { background-color: #555; }
          .card-description {
            color: #666;
            margin-bottom: 1rem;
            flex-grow: 1;
          }
          .card-meta {
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-size: 0.9rem;
            color: #888;
            margin-bottom: 1rem;
          }
          .view-store-btn {
            background-color: #F7A800;
            color: #fff;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .view-store-btn:hover {
            background-color: #e59a00;
          }

          /* Store Details Styling */
          .store-details {
            background-color: #fff;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            padding-bottom: 2rem;
          }
          .back-btn {
            background-color: #333;
            color: #fff;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            margin: 1rem;
            position: absolute;
            z-index: 10;
          }
          .hero-section {
            width: 100%;
            height: 300px;
            background-size: cover;
            background-position: center;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 2rem;
            color: #fff;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
          }
          .hero-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            z-index: 1;
          }
          .detail-logo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            object-fit: cover;
            border: 5px solid #fff;
            margin-bottom: 1rem;
            z-index: 2;
          }
          .detail-title {
            font-size: 3rem;
            font-weight: bold;
            z-index: 2;
          }
          .content-container {
            padding: 2rem;
          }
          .about-text {
            color: #555;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
          }
          .contact-info {
            background-color: #f9f9f9;
            border-left: 5px solid #00488E;
            padding: 1rem;
            margin-bottom: 2rem;
          }
          .section {
            margin-bottom: 2rem;
          }
          .section h2 {
            font-size: 2rem;
            border-bottom: 2px solid #ccc;
            padding-bottom: 0.5rem;
            margin-bottom: 1.5rem;
          }
          .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
          }
          .gallery-img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .item-list {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }
          .item-card {
            background-color: #f0f2f5;
            border-radius: 10px;
            padding: 1rem;
            text-align: center;
          }
          .item-img {
            width: 100%;
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 0.5rem;
          }
          .item-card h3 {
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
            font-weight: bold;
          }
          .item-card p {
            font-size: 0.9rem;
            color: #666;
          }
          .social-links {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
          }
          .social-links a {
            background-color: #00488E;
            color: #fff;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }
          .social-links a:hover {
            background-color: #00376d;
          }
        `}
      </style>
      <div className="container">
        {selectedStore ? (
          <StoreDetails store={selectedStore} onBack={() => setSelectedStore(null)} />
        ) : (
          <>
            <h1 className="title">Store Directory</h1>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            <div className="store-grid">
              {stores.map(store => (
                <StoreCard key={store.storeName} store={store} onSelectStore={setSelectedStore} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
