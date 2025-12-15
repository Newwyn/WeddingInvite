import React, { useEffect, useMemo, useState } from "react";
import "./Countdown.css";

const Countdown = ({ selectedSide }) => {
  // monthIndex = tháng - 1
  const groomDate = useMemo(() => new Date(2026, 0, 10, 23, 59, 59), []); // 10/01/2026
  const brideDate = useMemo(() => new Date(2025, 11, 28, 23, 59, 59), []); // 28/12/2025

  const targetDate = selectedSide === "groom" ? groomDate : brideDate;

  const calculateTimeLeft = () => {
    const now = Date.now();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

useEffect(() => {
  setTimeLeft(calculateTimeLeft());
  const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
  return () => clearInterval(timer);
}, [selectedSide, targetDate]);


  return (
    <section className="countdown-section" id="countdown">
      <div className="countdown-inner">
        {/* LEFT PHOTO */}
        <div className="countdown-side countdown-left">
          <img className="countdown-photo" src="/time1.png" alt="time1" />
        </div>

        {/* CENTER CONTENT */}
        <div className="countdown-content">
          <div className="countdown-header">
            <h2 className="countdown-title">Đếm ngược đến ngày trọng đại</h2>
            <div className="countdown-divider" />
            <p className="countdown-subtitle">
              Từng giây, từng phút đều đáng giá khi chúng ta đang đếm ngược đến khoảnh khắc thiêng liêng nhất
            </p>
          </div>

          <div className="countdown-boxes">
            <div className="countdown-box">
              <span>{String(timeLeft.days).padStart(2, "0")}</span>
              <p>NGÀY</p>
            </div>
            <div className="countdown-box">
              <span>{String(timeLeft.hours).padStart(2, "0")}</span>
              <p>GIỜ</p>
            </div>
            <div className="countdown-box">
              <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
              <p>PHÚT</p>
            </div>
            <div className="countdown-box">
              <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
              <p>GIÂY</p>
            </div>
          </div>

          <div className="countdown-footer">
            Hẹn gặp bạn tại lễ cưới của chúng mình! 💕
            <div className="save-date">♥ SAVE THE DATE ♥</div>
          </div>
        </div>

        {/* RIGHT PHOTO */}
        <div className="countdown-side countdown-right">
          <img className="countdown-photo" src="/time2.png" alt="time2" />
        </div>
      </div>
    </section>
  );
};

export default Countdown;
