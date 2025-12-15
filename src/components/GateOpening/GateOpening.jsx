import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./GateOpening.css";

const HeartIcon = () => (
  <svg
    className="gate-heart-icon"
    viewBox="0 0 24 24"
    width="28"
    height="28"
    aria-hidden="true"
  >
    <path d="M12 21s-7.2-4.35-9.6-8.55C.6 9.15 2.1 5.7 5.7 4.8c2.1-.6 4.2.3 5.4 2 1.2-1.7 3.3-2.6 5.4-2 3.6.9 5.1 4.35 3.3 7.65C19.2 16.65 12 21 12 21z" />
  </svg>
);

const GateOpening = ({ onFinish }) => {
  const [openGate, setOpenGate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenGate(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="gate-overlay">
      {/* CÁNH TRÁI */}
      <motion.div
        className="gate gate-left"
        animate={{ x: openGate ? "-100%" : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <div className="gate-text">
          <div className="gate-names">
            <div className="gate-name">Hoàng Sơn</div>
            <div className="gate-heart">
              <HeartIcon />
            </div>
            <div className="gate-name">Mỹ Duyên</div>
          </div>
        </div>
      </motion.div>

      {/* CÁNH PHẢI */}
      <motion.div
        className="gate gate-right"
        animate={{ x: openGate ? "100%" : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (openGate) onFinish();
        }}
      >
        <div className="gate-text">
          <h2 className="gate-title gate-invitation">Wedding Invitation</h2>
          <p className="gate-small gate-invite-sub">Trân trọng kính mời</p>
        </div>
      </motion.div>
    </div>
  );
};

export default GateOpening;
