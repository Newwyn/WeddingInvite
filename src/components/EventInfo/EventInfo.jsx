import React, { useState, useEffect } from "react";
import "./EventInfo.css";
import { motion } from "framer-motion";

const EventInfo = ({ selectedSide }) => {
  const [previewImage, setPreviewImage] = useState(null);

  // Chặn scroll khi mở modal
  useEffect(() => {
    if (previewImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // cleanup
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [previewImage]);

  // Chọn hình theo nhà trai / nhà gái
  const imageSet =
    selectedSide === "groom"
      ? ["/groom-card-1.png", "/groom-card-2.png"]
      : selectedSide === "bride"
      ? ["/bride-card-1.png", "/bride-card-2.png"]
      : [];

  return (
    <section className="eventinfo-wrapper">
      <motion.h2
        className="eventinfo-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Thông Tin Sự Kiện
      </motion.h2>

      <div className="eventinfo-divider"></div>

      {/* HAI HÌNH THIỆP */}
      <motion.div
        className="eventinfo-images"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {imageSet.map((url, index) => (
          <motion.div
            key={index}
            className="eventinfo-card"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            onClick={() => setPreviewImage(url)} // click mở modal
          >
            <img src={url} alt={`card-${index}`} />
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL PHÓNG TO */}
      {previewImage && (
        <div className="modal-overlay" onClick={() => setPreviewImage(null)}>
          <div
            className="modal-content zoom-in"
            onClick={(e) => e.stopPropagation()} // tránh tắt khi click vào ảnh
          >
            <img src={previewImage} alt="preview-card" />
          </div>
        </div>
      )}
    </section>
  );
};

export default EventInfo;
