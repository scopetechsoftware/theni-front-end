import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom"
import './StoreDetail.css'; // Your CSS file


const StoreDetail = () => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const {id} = useParams()
  

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/stores/${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch store data');
        }
        
        const data = await response.json();
        setStore(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading store information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h3>Store Not Found</h3>
          <p>The store you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="store-detail-page">
      {/* Hero Section */}
      <div className="hero-section">
        {store.coverImage ? (
          <img src={`http://localhost:4000/${store.coverImage}`} alt={store.storeName} className="hero-image" />
        ) : (
          <div className="hero-placeholder"></div>
        )}
        <div className="hero-overlay"></div>
        
        <div className="container">
          <div className="hero-content">
            <button className="back-button" onClick={() => window.history.back()}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Listings
            </button>
            
            <div className="store-header-card">
              <div className="store-logo-section">
                {store.logoImage ? (
                  <img src={`http://localhost:4000/${store.logoImage}`} alt={store.storeName} className="store-logo" />
                ) : (
                  <div className="store-logo-placeholder">
                    {store.storeName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              <div className="store-info">
                <div className="store-title-section">
                  <h1 className="store-name">{store.storeName}</h1>
                  <div className="store-meta">
                    <span className="category-badge">{store.category}</span>
                    <span className={`plan-badge plan-${store.plan.toLowerCase()}`}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>
                      {store.plan}
                    </span>
                  </div>
                </div>
                
                {store.location && (
                  <div className="location-info">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                    </svg>
                    <span>{store.location.city}, {store.location.district} - {store.location.pincode}</span>
                  </div>
                )}
                
                <div className="action-buttons">
                  <button className="btn-primary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Contact Now
                  </button>
                  
                  <button className="btn-secondary">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
                    </svg>
                    Save to Favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          <div className="content-layout">
            <div className="content-main">
              {/* Tab Navigation */}
              <div className="tab-navigation">
                <button 
                  className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
                  onClick={() => setActiveTab('services')}
                >
                  Services
                </button>
                <button 
                  className={`tab-button ${activeTab === 'products' ? 'active' : ''}`}
                  onClick={() => setActiveTab('products')}
                >
                  Products
                </button>
                <button 
                  className={`tab-button ${activeTab === 'gallery' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gallery')}
                >
                  Gallery
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="tab-content">
                {activeTab === 'overview' && (
                  <div className="content-card">
                    <h3>About This Store</h3>
                    
                    {store.description ? (
                      <div className="about-content">
                        <p className="description">{store.description}</p>
                        
                        {store.aboutMe && (
                          <div className="about-me-section">
                            <h4>About Me</h4>
                            <p className="about-me">{store.aboutMe}</p>
                          </div>
                        )}
                        
                        {store.review && (
                          <div className="review-section">
                            <h4>Customer Reviews</h4>
                            <div className="review-card">
                              <div className="review-star">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                                </svg>
                              </div>
                              <p>{store.review}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="no-content">
                        <p>No description available for this store.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'services' && (
                  <div className="content-card">
                    <h3>Our Services</h3>
                    
                    {store.services && store.services.length > 0 ? (
                      <div className="services-grid">
                        {store.services.map((service, index) => (
                          <div key={index} className="service-card">
                            <div className="service-image">
                              {service.image ? (
                                <img src={`http://localhost:4000/${service.image}`} alt={service.title} />
                              ) : (
                                <div className="image-placeholder">
                                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2H6C4.9 2 4.01 2.9 4.01 4L4 20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM13 9V3.5L18.5 9H13Z" fill="white"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="service-info">
                              <h4>{service.title}</h4>
                              <p>{service.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-content">
                        <p>No services listed for this store.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'products' && (
                  <div className="content-card">
                    <h3>Our Products</h3>
                    
                    {store.products && store.products.length > 0 ? (
                      <div className="products-grid">
                        {store.products.map((product, index) => (
                          <div key={index} className="product-card">
                            <div className="product-image">
                              {product.image ? (
                                <img src={`http://localhost:4000/${product.image}`} alt={product.title} />
                              ) : (
                                <div className="image-placeholder">
                                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18Z" fill="white"/>
                                    <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15Z" fill="white"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div className="product-info">
                              <h4>{product.title}</h4>
                              <p>{product.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-content">
                        <p>No products listed for this store.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'gallery' && (
                  <div className="content-card">
                    <h3>Gallery</h3>
                    
                    {store.galleryImages && store.galleryImages.length > 0 ? (
                      <div className="gallery-grid">
                        {store.galleryImages.map((image, index) => (
                          <div key={index} className="gallery-item">
                            <img src={`http://localhost:4000/${image}`} alt={`Gallery ${index + 1}`} />
                            <div className="gallery-overlay">
                              <button className="gallery-view-btn">View</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="no-content">
                        <p>No gallery images available for this store.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="sidebar">
              {/* Contact Card */}
              <div className="sidebar-card">
                <div className="card-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                  </svg>
                  <h3>Contact Information</h3>
                </div>
                
                <div className="contact-list">
                  {store.phoneNumber && (
                    <div className="contact-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="#667eea"/>
                      </svg>
                      <div className="contact-details">
                        <span className="contact-label">Phone Number</span>
                        <a href={`tel:${store.phoneNumber}`} className="contact-value">{store.phoneNumber}</a>
                      </div>
                    </div>
                  )}
                  
                  {store.websiteLink && (
                    <div className="contact-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.42 16.42 20 12 20Z" fill="#667eea"/>
                      </svg>
                      <div className="contact-details">
                        <span className="contact-label">Website</span>
                        <a href={store.websiteLink} target="_blank" rel="noopener noreferrer" className="contact-value">
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                  
                  {store.location && (
                    <div className="contact-item">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#667eea"/>
                      </svg>
                      <div className="contact-details">
                        <span className="contact-label">Address</span>
                        <span className="contact-value">
                          {store.location.city}, {store.location.district} - {store.location.pincode}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Social Media Card */}
              {store.socialMediaLinks && (
                <div className="sidebar-card">
                  <div className="card-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor"/>
                    </svg>
                    <h3>Follow Us</h3>
                  </div>
                  
                  <div className="social-links">
                    {store.socialMediaLinks.facebook && (
                      <a href={store.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                      </a>
                    )}
                    
                    {store.socialMediaLinks.instagram && (
                      <a href={store.socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                        </svg>
                        Instagram
                      </a>
                    )}
                    
                    {store.socialMediaLinks.twitter && (
                      <a href={store.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Twitter
                      </a>
                    )}
                    
                    {store.socialMediaLinks.youtube && (
                      <a href={store.socialMediaLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-link youtube">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        YouTube
                      </a>
                    )}
                  </div>
                </div>
              )}
              
              {/* Location Card */}
              {store.location && (
                <div className="sidebar-card">
                  <div className="card-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                    </svg>
                    <h3>Location</h3>
                  </div>
                  
                  <div className="location-content">
                    <div className="address-info">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#667eea"/>
                      </svg>
                      {store.location.city}, {store.location.district} - {store.location.pincode}
                    </div>
                    
                    <div className="map-container">
                      {/* This would be replaced with an actual map component */}
                      <div style={{ 
                        height: '200px', 
                        background: '#f1f5f9', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        borderRadius: '15px'
                      }}>
                        <p>Map would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;