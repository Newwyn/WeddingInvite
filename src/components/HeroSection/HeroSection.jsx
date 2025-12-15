import React from "react";
import { motion } from "framer-motion";
import "./HeroSection.css";

const HeroSection = ({ selectedSide }) => {
  // ✅ ngày theo lựa chọn ở OverlayIntro
  const weddingDate =
    selectedSide === "groom"
      ? "10 - 01 - 2026"
      : selectedSide === "bride"
      ? "28 - 12 - 2025"
      : ""; // nếu chưa chọn thì để trống

  // tim rơi
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
  }));

  return (
    <section className="hero-section">
      {/* Background ảnh trong public */}
      <div
        className="hero-background"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hinhnay.png)`,
        }}
      />

      <div className="falling-hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="falling-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            ❤
          </div>
        ))}
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Dòng trên cùng */}
        <p className="hero-pre-title">Wedding</p>

        <h1 className="hero-names">
          <span className="groom-name">Hoàng Sơn</span>
          <span className="ampersand">&</span>
          <span className="bride-name">Mỹ Duyên</span>
        </h1>

        <div className="hero-divider"></div>

        {/* ✅ NGÀY TO RÕ, nằm trên “Hân hạnh…” */}
        {weddingDate && <p className="hero-date hero-date-strong">{weddingDate}</p>}

        <p className="hero-subtitle">Hân hạnh được đón tiếp</p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
