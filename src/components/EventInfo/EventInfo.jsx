import React from "react";
import "./EventInfo.css";
import { motion } from "framer-motion";

const EventInfo = ({ selectedSide }) => {
  const imgSrc = selectedSide === "groom" ? "/2.png" : "/1.png";

  return (
    <section className="eventinfo-wrapper">
      {/* ===== HEADER ===== */}
      <motion.div
        className="eventinfo-header"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="eventinfo-title">Thông tin lễ cưới</h2>

        <div className="eventinfo-underline">
          <span></span>
        </div>

        <p className="eventinfo-desc">
          Chúng mình rất mong được chia sẻ niềm hạnh phúc này cùng với gia đình
          và bạn bè thân yêu ♥
        </p>
      </motion.div>

      {/* ===== IMAGE ===== */}
      <motion.div
        className="eventinfo-image-card"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        viewport={{ once: true }}
      >
        <img className="eventinfo-image" src={imgSrc} alt="Event info" />
      </motion.div>
    </section>
  );
};

export default EventInfo;
