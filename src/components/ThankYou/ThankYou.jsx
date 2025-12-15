import { useEffect, useRef, useState } from "react";
import "./ThankYou.css";

export default function ThankYou() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="thankyou-section">
      {/* Background image */}
      <img
        src="/thanks.png"
        alt="Thank you"
        className={`thankyou-image ${visible ? "show" : ""} ${
          open ? "dim" : ""
        }`}
      />

      {/* Letter icon */}
      <div className="letter-icon" onClick={() => setOpen(true)}>
        ✉️
      </div>

      {/* Overlay thank you */}
      {open && (
        <div className="thankyou-overlay" onClick={() => setOpen(false)}>
          <div
            className="thankyou-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Cảm Ơn Quý Khách</h2>
            <p>
              Sự hiện diện của quý khách là niềm vinh hạnh
              <br />
              và là món quà ý nghĩa nhất đối với gia đình chúng tôi.
              <br />
              Rất mong được đón tiếp!
            </p>
            <div className="thankyou-sign">
              Trân trọng,
              <br />
              <strong>Hoàng Sơn &amp; Mỹ Duyên</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
