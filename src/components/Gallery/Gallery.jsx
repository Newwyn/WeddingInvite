import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Gallery.css";

const Gallery = () => {
  const images = useMemo(
    () => Array.from({ length: 12 }, (_, i) => `/gallery/${i + 1}.png`),
    []
  );

  const [activeSrc, setActiveSrc] = useState(null);

  // ESC để đóng
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActiveSrc(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="gallery-section" id="gallery">
      <motion.div
        className="gallery-shell"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="gallery-title">Bộ sưu tập ảnh</h2>

        <div className="gallery-divider">
          <span />
        </div>

        <div className="gallery-grid">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              className="gallery-item"
              onClick={() => setActiveSrc(src)}
              aria-label={`Mở ảnh ${index + 1}`}
            >
              <img
                className="gallery-img"
                src={src}
                alt={`gallery-${index + 1}`}
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      </motion.div>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {activeSrc && (
          <motion.div
            className="gallery-modal"
            onClick={() => setActiveSrc(null)} // bấm ra ngoài tắt
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="gallery-modal-content"
              onClick={(e) => e.stopPropagation()} // chặn click lan ra ngoài
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <button
                type="button"
                className="gallery-modal-close"
                onClick={() => setActiveSrc(null)}
                aria-label="Đóng"
              >
                ×
              </button>

              <img className="gallery-modal-img" src={activeSrc} alt="preview" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
