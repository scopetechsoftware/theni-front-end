import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobBrowser.css";

const API_URL = "http://localhost:4000/api/jobs";

const JobBrowser = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        setJobs(res.data);

        const uniqueCategories = [
          "All",
          ...new Set(res.data.map((job) => job.storeName?.category || "Other")),
        ];
        setCategories(uniqueCategories);

        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
        setIsLoading(false);
      });
  }, []);

  // category filter
  const filteredJobs =
    selectedCategory === "All"
      ? jobs
      : jobs.filter((job) => job.storeName?.category === selectedCategory);

  // search filter
  const searchedJobs = filteredJobs.filter(
    (job) =>
      job.jobName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.description &&
        job.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="job-browser">
      <header className="job-browser-header">
        <div className="header-content">
          <h1>Discover Local Opportunities</h1>
          <p>Find your next career move with businesses in your community</p>

          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search jobs by title, skills, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        <div className="category-section">
          <h2>Browse by Category</h2>
          <div className="categories-scroll">
            <div className="categories">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                >
                  {cat}
                  {selectedCategory === cat && <span className="selected-indicator"></span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading opportunities...</p>
          </div>
        ) : (
          <>
            <div className="results-header">
              <h3>
                {searchedJobs.length} {searchedJobs.length === 1 ? "Opportunity" : "Opportunities"} 
                {selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}
                {searchQuery ? ` matching "${searchQuery}"` : ""}
              </h3>
            </div>

            <div className="jobs-grid">
              {searchedJobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="card-header">
                    <div className="company-info">
                      <div className="company-avatar">
                        {job.storeName?.name?.charAt(0) || "C"}
                      </div>
                      <div className="company-details">
                        <h3>{job.jobName}</h3>
                        <span className="company-name">{job.storeName?.name || "Company"}</span>
                      </div>
                    </div>
                    <span className="job-category">
                      {job.storeName?.category || "General"}
                    </span>
                  </div>

                  <div className="job-details">
                    <div className="detail-item">
                      <i className="fas fa-dollar-sign"></i>
                      <span>{job.salary || "Negotiable"}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-graduation-cap"></i>
                      <span>{job.qualification || "Not specified"}</span>
                    </div>
                  </div>

                  <p className="job-description">
                    {job.description && job.description.length > 120 
                      ? `${job.description.substring(0, 120)}...` 
                      : job.description || "No description available"}
                  </p>

                  <div className="job-actions">
                    <a
                      href={job.applicationLink}
                      target="_blank"
                      rel="noreferrer"
                      className="apply-btn"
                    >
                      <i className="fas fa-paper-plane"></i>
                      Apply Now
                    </a>
                    <div className="action-buttons">
                      <button className="action-btn" title="Save job">
                        <i className="far fa-bookmark"></i>
                      </button>
                      <button className="action-btn" title="Share job">
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {searchedJobs.length === 0 && !isLoading && (
              <div className="no-results">
                <div className="no-results-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>No opportunities found</h3>
                <p>
                  {searchQuery
                    ? `We couldn't find any jobs matching "${searchQuery}" in the ${
                        selectedCategory !== "All"
                          ? selectedCategory + " category"
                          : "all categories"
                      }`
                    : `There are no jobs available in the ${
                        selectedCategory !== "All"
                          ? selectedCategory + " category"
                          : "database"
                      } at the moment.`}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="clear-filters"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobBrowser;