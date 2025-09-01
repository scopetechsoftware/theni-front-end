import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <style>{`
        * { box-sizing: border-box; }
        .carousel-wrapper {
          position: relative;
          max-width: 80%;
          margin: 2rem auto;
          user-select: none;
        }
        .carousel {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: calc((100% - 16px) / 2);
          gap: 16px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding-bottom: 12px;
        }
        .carousel.no-transition { scroll-behavior: auto !important; }
        .carousel::-webkit-scrollbar { display: none; }
        .card {
          background: #fff;
          border-radius: 15px;
          scroll-snap-align: start;
          padding: 20px;
          cursor: grab;
          max-height: fit-content;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(2, 12, 21, 0.3);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        
        .card-title { font-size: 1.2rem; font-weight: bold; color: #00488E; margin-bottom: 0.5rem; }
        .card-desc { color: #333; font-size: 0.95rem; line-height: 1.4; }
        .card-image { margin-top: 1rem; flex-shrink:0; border-radius: 12px; overflow: hidden; height: 40px; width: 40px; border-radius: 50%; }
        .card-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
        .card:hover .card-image img { transform: scale(1.05); }
        .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: #00488E;
          border: none;
          color: #fff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          transition: 0.3s;
        }
        .arrow-btn:hover { background: #F7A800; }
        .arrow-left { left: -20px; }
        .arrow-right { right: -20px; }
        @media (max-width: 768px) {
          .carousel { grid-auto-columns: 100%; }
          .arrow-btn { display: none; }
        }
      `}</style>

      <div className="carousel-wrapper" onMouseEnter={() => clearInterval(timeoutRef.current)} onMouseLeave={autoPlay}>
        <button className="arrow-btn arrow-left" onClick={scrollLeftFunc}>&#8249;</button>
        <div
          className="carousel"
          ref={carouselRef}
          onScroll={handleScroll}
        >
          {item && item.filter((_, i) => _.category === 'slider').reverse().slice().map(({ _id, slider }) => {
            
         
           const  fixed_path = slider.logoImage?.replace("\\", "/");
           
            return(
            
            <div className="card" key={_id}>
              <div>
                <div className="card-image">
                  <img src={`${api}/${fixed_path}`} alt={slider.title} />
                </div>
                <h3 className="card-title">{slider.title}</h3>
                <p className="card-desc">{slider.content}</p>
              </div>
              <button style={{ background: slider.buttonBackgroundColor, width: 'fit-content', padding: '10px 20px', borderRadius: '5px', outline: 0, border: 0, boxShadow: `2px 3px 5px ${toRgba(slider.buttonBackgroundColor)}` }}>
                <Link to={slider.url} style={{ color: slider.buttonColor, textDecoration: 'none' }}>{slider.buttonName}</Link>
              </button>
            </div>
          )})}
        </div>
        <button className="arrow-btn arrow-right" onClick={scrollRightFunc}>&#8250;</button>
      </div>
    </>
  );
}