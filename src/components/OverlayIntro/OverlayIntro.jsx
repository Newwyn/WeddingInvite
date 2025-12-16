import React, { useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./OverlayIntro.css";

const OverlayIntro = ({ show, onOpen }) => {
  // ✅ khóa scroll nền khi overlay mở
  useEffect(() => {
    if (!show) return;

    const prevOverflow = document.body.style.overflow;
    const prevOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.overscrollBehavior = prevOverscroll;
    };
  }, [show]);

  const hearts = useMemo(() => {
    const COUNT = 45;
    return Array.from({ length: COUNT }).map((_, i) => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 3.2 + Math.random() * 3.8;
      const delay = Math.random() * 2.8;
      const drift = (Math.random() * 60 - 30).toFixed(1);
      return { id: i, left, top, duration, delay, drift };
    });
  }, [show]);

  const HEART_SIZE = 16;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="overlay-intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="heart-layer">
            {hearts.map((h) => (
              <span
                key={h.id}
                className="floating-heart"
                style={{
                  left: `${h.left}%`,
                  top: `${h.top}%`,
                  fontSize: `${HEART_SIZE}px`,
                  animationDuration: `${h.duration}s`,
                  animationDelay: `${h.delay}s`,
                  "--drift": `${h.drift}px`,
                }}
              >
                ♥
              </span>
            ))}
          </div>

          <motion.div
            className="overlay-inner"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="overlay-title">Wedding Invitation</h1>
            <p className="overlay-subtitle">Trân trọng kính mời</p>

            <div className="overlay-grid">
              <motion.div
                className="side-card"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <motion.div
                  className="side-card-image"
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <img src="/side-left.png" alt="Tiệc nhà trai" />
                </motion.div>

                <h3 className="side-title">Tiệc nhà trai</h3>
                <p className="side-subdate">10 tháng 01 năm 2026</p>

                <button className="open-button" onClick={() => onOpen("groom")}>
                  Mở thiệp
                </button>
              </motion.div>

              <motion.div
                className="side-card"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 }}
              >
                <motion.div
                  className="side-card-image"
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                >
                  <img src="/side-right.png" alt="Tiệc nhà gái" />
                </motion.div>

                <h3 className="side-title">Tiệc nhà gái</h3>
                <p className="side-subdate">28 tháng 12 năm 2025</p>

                <button className="open-button" onClick={() => onOpen("bride")}>
                  Mở tiệc
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverlayIntro;
