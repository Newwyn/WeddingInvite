import React from "react";
import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = ({ selectedSide }) => {
  const weddingDate =
    selectedSide === "groom"
      ? "10 - 01 - 2026"
      : selectedSide === "bride"
      ? "28 - 12 - 2025"
      : "";

  return (
    <section className="hero-section">
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hinhnay.png)`,
        }}
      />

      {/* ✅ WRAP lo canh giữa (không bị Motion đè transform) */}
      <div className="hero-card-wrap">
        <motion.div
          className="hero-card"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <p className="hero-pre-title">Lễ đính hôn</p>

          <h1 className="hero-names">
            Hoàng Sơn
            <span className="ampersand">&</span>
            Mỹ Duyên
          </h1>

          <div className="hero-divider"></div>

          {weddingDate && <p className="hero-date">{weddingDate}</p>}

          <p className="hero-subtitle">Hân hạnh được đón tiếp</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
