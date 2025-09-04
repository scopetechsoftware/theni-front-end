import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./StoreBrowser.css"
import {useNavigate} from "react-router-dom"

const API_URL = "http://localhost:4000/api/stores";

const StoreBrowser = () => {
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        setStores(res.data);
        const uniqueCategories = [
          "All",
          ...new Set(res.data.map((store) => store.category)),
        ];
        setCategories(uniqueCategories);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stores:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredStores =
    selectedCategory === "All"
      ? stores
      : stores.filter((store) => store.category === selectedCategory);

  const searchedStores = filteredStores.filter(
    (store) =>
      store.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (store.description && store.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="store-browser">
      <header className="store-browser-header">
        <h1>Discover Local Stores</h1>
        <p>Explore unique shops, businesses, and services in your community</p>
        
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search stores by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="category-section">
        <h2>Filter by Category</h2>
        <div className="categories">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'active' : ''}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className="stores-grid">
            {searchedStores.map((store) => (
              <div key={store._id} className="store-card">
                <div className="store-image">
                  {store.coverImage ? (
                    <img
                      src={`http://localhost:4000/${store.coverImage.replace("\\", "/")}`}
                      alt={store.storeName}
                    />
                  ) : (
                    <div className="no-image">
                      <i className="fas fa-store"></i>
                    </div>
                  )}
                  {store.logoImage && (
                    <div className="store-logo">
                      <img
                        src={`http://localhost:4000/${store.logoImage.replace("\\", "/")}`}
                        alt={store.storeName}
                      />
                    </div>
                  )}
                </div>

                <div className="store-details">
                  <h3>{store.storeName}</h3>
                  <span className="store-category">{store.category}</span>
                  <p>{store.description || "No description available"}</p>

                  <div className="store-actions">
                  <button onClick={() => navigate(`/storedetails/${store._id}`)} className="visit-btn">
  <i className="fas fa-external-link-alt"></i> View store
</button>


                   
                    
                    
                    <div className="action-buttons">
                      <button className="action-btn">
                        <i className="far fa-heart"></i>
                      </button>
                      <button className="action-btn">
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {searchedStores.length === 0 && !isLoading && (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <h3>No stores found</h3>
              <p>
                {searchQuery 
                  ? `We couldn't find any stores matching "${searchQuery}" in the ${selectedCategory !== "All" ? selectedCategory + " category" : "all categories"}.`
                  : `There are no stores available in the ${selectedCategory !== "All" ? selectedCategory + " category" : "database"} at the moment.`
                }
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="clear-filters"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StoreBrowser;