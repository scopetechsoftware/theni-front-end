import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const api = "http://localhost:4000";

const Hero = ({ item }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroItems = item?.filter((val) => val.category === 'hero') || [];

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    if (heroItems.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroItems.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [heroItems.length]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // If no hero items, show default content
  if (heroItems.length === 0) {
    return (
      <div style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        height: '80vh', 
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: 'column', 
        padding: "5%", 
        gap: '10px', 
        alignItems: 'center', 
        textAlign: 'center'
      }}> 
        <h1 style={{fontSize: "50px", color: '#fff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>Welcome to Our Store</h1>
        <p style={{color: '#fff', fontWeight: '900', fontSize: '1.2rem'}}>Discover amazing products and offers</p>
        <button style={{
          background: '#6a11cb', 
          width: 'fit-content', 
          padding: "12px 24px", 
          border: 0, 
          margin: 0, 
          boxShadow: '2px 3px 5px rgba(0,0,0,0.3)', 
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          <Link to="/shop" style={{color: '#fff', textDecoration: 'none', fontSize: '1.1rem'}}>Shop Now</Link>
        </button>
      </div>
    );
  }

  return (
    <div style={{position: 'relative', height: '80vh', overflow: 'hidden'}}>
      {/* Slides */}
      {heroItems.map((hero, index) => {
        const fixed_path = hero.hero.image.replace(/\\/g, "/");
        const isActive = index === currentSlide;
        
        return (
          <div 
            key={hero._id || index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `url(${api}/${fixed_path}) center/cover no-repeat`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: "5%", 
              gap: '10px', 
              alignItems: 'center', 
              textAlign: 'center',
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: isActive ? 2 : 1,
              // Add overlay
              boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,0.3)'
            }}
          > 
            <h1 style={{
              fontSize: "50px", 
              color: '#fff', 
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              transform: isActive ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.8s ease-in-out',
              opacity: isActive ? 1 : 0,
              transitionDelay: '0.2s'
            }}>
              {hero.hero.title}
            </h1>
            
            <p style={{
              color: '#fff', 
              fontWeight: '900',
              fontSize: '1.2rem',
              transform: isActive ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
              opacity: isActive ? 1 : 0,
              transitionDelay: '0.4s'
            }}>
              {hero.hero.description}
            </p>
            
            <button style={{
              background: hero.hero.btnBackgroundColor, 
              width: 'fit-content', 
              padding: "12px 24px", 
              border: 0, 
              margin: 0, 
              boxShadow: '2px 3px 5px rgba(0,0,0,0.3)', 
              borderRadius: '5px',
              cursor: 'pointer',
              transform: isActive ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
              opacity: isActive ? 1 : 0,
              transitionDelay: '0.6s'
            }}>
              <Link 
                to={hero.hero.buttonUrl} 
                style={{
                  color: '#fff', 
                  textDecoration: 'none',
                  fontSize: '1.1rem'
                }}
              >
                {hero.hero.buttonName}
              </Link>
            </button>
          </div>
        );
      })}
      
      {/* Navigation Arrows (only show if multiple slides) */}
      {heroItems.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ‹
          </button>
          
          <button 
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
          >
            ›
          </button>
        </>
      )}
      
      {/* Indicators (only show if multiple slides) */}
      {heroItems.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '10px',
          zIndex: 3
        }}>
          {heroItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;