import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./head.css"
const api = "http://localhost:4000";
export default function Carousel({ item }) {
  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  const [cardsPerView, setCardsPerView] = useState(2);
  const [cardWidth, setCardWidth] = useState(0);

  // Auto-play logic
  const autoPlay = () => {
    if (!carouselRef.current || cardWidth === 0) return;
    timeoutRef.current = setInterval(() => {
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }, 3000);
  };

  const resetAutoPlay = () => {
    clearInterval(timeoutRef.current);
    autoPlay();
  };

  // Main effect for layout, cloning, and initial setup
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !item || item.length === 0) return;

    const updateLayoutAndClone = () => {
      // 1. Calculate and update layout state
      const width = carousel.offsetWidth;
      const newCardsPerView = width <= 480 ? 1 : 2;
      setCardsPerView(newCardsPerView);

      const firstCard = carousel.querySelector(".card");
      if (!firstCard) return;

      const newCardWidth = firstCard.offsetWidth + 16;
      setCardWidth(newCardWidth);

      // 2. Remove any existing clones to prevent duplicates
      carousel.querySelectorAll(".clone").forEach(c => c.remove());

      // 3. Clone cards for infinite scroll
      const children = Array.from(carousel.children);
      children.slice(-newCardsPerView).forEach(c => {
        const clone = c.cloneNode(true);
        clone.classList.add("clone");
        carousel.insertBefore(clone, carousel.firstChild);
      });
      children.slice(0, newCardsPerView).forEach(c => {
        const clone = c.cloneNode(true);
        clone.classList.add("clone");
        carousel.appendChild(clone);
      });

      // 4. Set initial scroll position
      carousel.scrollLeft = newCardsPerView * newCardWidth;
    };

    // Run once on component mount and on window resize
    updateLayoutAndClone();
    window.addEventListener("resize", updateLayoutAndClone);

    return () => {
      window.removeEventListener("resize", updateLayoutAndClone);
      clearInterval(timeoutRef.current); // Cleanup auto-play on unmount
    };
  }, [item]);

  // Effect to manage auto-play after cardWidth is determined
  useEffect(() => {
    if (cardWidth > 0) {
      autoPlay();
    }
    return () => clearInterval(timeoutRef.current);
  }, [cardWidth]);

  // Infinite scroll handler
  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel || cardWidth === 0) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // Scroll to the end of the cloned cards to create the loop effect
    if (carousel.scrollLeft <= 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = maxScroll - cardsPerView * cardWidth;
      setTimeout(() => carousel.classList.remove("no-transition"), 20);
    } else if (carousel.scrollLeft >= maxScroll - 1) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = cardsPerView * cardWidth;
      setTimeout(() => carousel.classList.remove("no-transition"), 20);
    }
  };

  const scrollLeftFunc = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      resetAutoPlay();
    }
  };

  const scrollRightFunc = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      resetAutoPlay();
    }
  };

  // Convert any color to rgba with a given opacity
  function toRgba(color, alpha = 0.4) {
    let div = document.createElement("div");
    div.style.color = color;
    document.body.appendChild(div);

    let rgb = getComputedStyle(div).color;
    document.body.removeChild(div);

    let values = rgb.match(/\d+/g).map(Number);
    return `rgba(${values[0]}, ${values[1]}, ${values[2]}, ${alpha})`;
  }

  return (
    <>
       

      <div className="carousel-wrapper" onMouseEnter={() => clearInterval(timeoutRef.current)} onMouseLeave={autoPlay}>
        <button className="arrow-btn arrow-left" onClick={scrollLeftFunc} aria-label="Previous slide">&#8249;</button>
        <div
          className="carousel"
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {item && item.filter((_, i) => _.category === 'slider').reverse().slice().map(({ _id, slider }) => {
            const fixed_path = slider.logoImage?.replace("\\", "/");

            return (
              <div className="card" key={_id}>
                <div className="card-content">
                  <div className="card-header">
                    <div className="card-image">
                      <img src={`${api}/${fixed_path}`} alt={slider.title} />
                    </div>
                    <div className="card-text">
                      <h3 className="card-title">{slider.title}</h3>
                    </div>
                  </div>
                  <p className="card-desc">{slider.content}</p>
                  <div className="card-button">
                    <button style={{
                      background: slider.buttonBackgroundColor,
                      padding: '12px 25px',
                      borderRadius: '8px',
                      outline: 0,
                      border: 0,
                      boxShadow: `0 4px 10px ${toRgba(slider.buttonBackgroundColor)}`,
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease'
                    }}>
                      <Link to={slider.url} style={{ color: slider.buttonColor, textDecoration: 'none' }}>{slider.buttonName}</Link>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <button className="arrow-btn arrow-right" onClick={scrollRightFunc} aria-label="Next slide">&#8250;</button>

        {/* <div className="carousel-indicators">
          {item && item.filter((_, i) => _.category === 'slider').map((_, index) => (
            <div key={index} className={`indicator ${index === 0 ? 'active' : ''}`}></div>
          ))}
        </div> */}
      </div>
    </>
  );
}