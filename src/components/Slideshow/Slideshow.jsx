// src/components/Slideshow.jsx
import React, { useState, useEffect } from "react";
import "./Slideshow.css";
import { motion, AnimatePresence } from "framer-motion";

// ====== CẤU HÌNH ======
const SLIDE_INTERVAL = 5000; // ms
const TOTAL_SLIDES = 5;      // có bao nhiêu slideX.png thì để số đó

// Tự tạo mảng /slide1.png -> /slideN.png
const images = Array.from(
  { length: TOTAL_SLIDES },
  (_, i) => `/slide${i + 1}.png`
);

const Slideshow = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide, PAUSE khi hover
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goTo = (index) => {
    setCurrent(index);
  };

  return (
    <section className="slideshow-section" id="gallery">
      <h2 className="slideshow-title">Khoảnh Khắc Đáng Nhớ</h2>
      <div className="slideshow-divider" />

      <div
        className="slideshow-frame"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Nút trái */}
        <button
          className="nav-btn nav-btn-left"
          type="button"
          onClick={prevSlide}
        >
          ‹
        </button>

        {/* Ảnh */}
        <div className="slideshow-inner">
          <AnimatePresence mode="sync" initial={false}>
            <motion.img
              key={current}
              src={images[current]}
              alt={`slide-${current + 1}`}
              className="slide-image"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }} // phóng to nhẹ khi hover
            />
          </AnimatePresence>
        </div>

        {/* Nút phải */}
        <button
          className="nav-btn nav-btn-right"
          type="button"
          onClick={nextSlide}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="slideshow-dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`dot ${idx === current ? "active" : ""}`}
            onClick={() => goTo(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default Slideshow;
