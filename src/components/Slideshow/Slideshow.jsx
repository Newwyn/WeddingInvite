import React, { useMemo, useState } from "react";
import "./Slideshow.css";
import { motion, AnimatePresence } from "framer-motion";

const Slideshow = () => {
  // Nếu project của vợ đang có mảng images khác thì giữ y như cũ,
  // chỉ cần dùng current index như bên dưới.
  const images = useMemo(
    () => ["/slide1.png", "/slide2.png", "/slide3.png", "/slide4.png", "/slide5.png"],
    []
  );

  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((p) => (p - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((p) => (p + 1) % images.length);
  };

  return (
    <section className="slideshow-wrapper" id="slideshow">
      <div className="slideshow-container">
        <button className="slide-nav left" onClick={prevSlide} aria-label="Prev">
          ‹
        </button>

        <div className="slide-frame">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={images[current]}
              alt={`slide-${current + 1}`}
              className={`slide-image ${
               current === 2 ? "slide3-mobile-left" : ""
} ${current === 4 ? "slide5-mobile-right" : ""}`}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>

        <button className="slide-nav right" onClick={nextSlide} aria-label="Next">
          ›
        </button>
      </div>
    </section>
  );
};

export default Slideshow;
