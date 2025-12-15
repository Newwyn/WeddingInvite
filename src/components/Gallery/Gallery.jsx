import React from "react";
import { motion } from "framer-motion";
import "./Gallery.css";

const images = Array.from({ length: 12 }, (_, i) => `/gallery/${i + 1}.png`);

const Gallery = () => {
  return (
    <section className="gallery-section" id="gallery">
      <motion.div
        className="gallery-shell"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="gallery-title">Bộ Sưu Tập Ảnh</h2>
        <div className="gallery-divider" />

        <div className="gallery-grid">
          {images.map((src, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={src}
                alt={`gallery-${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Gallery;
