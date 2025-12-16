import React, { useEffect, useState } from "react";
import "./ThankYou.css";

const ThankYou = () => {
  const [openNote, setOpenNote] = useState(false);

  // ESC để đóng + khoá scroll nền khi modal mở
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenNote(false);
    };

    if (openNote) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openNote]);

  return (
    <section className="thankyou-section" id="thanks">
      {/* Icon phong bì */}
      <button
        type="button"
        className="envelope-btn"
        aria-label="Mở lời nhắn"
        onClick={() => setOpenNote(true)}
      >
        {/* dùng emoji cho nhẹ dự án; nếu bé có ảnh phong bì thì đổi sang <img /> */}
        <span className="envelope-icon">✉️</span>
      </button>

      {/* Ảnh collage / bức thư lớn của bé (nếu đang có thì giữ lại ở đây) */}
      <div className="thankyou-collage">
        <img src="/thanks.png" alt="thank-you" />
      </div>

      {/* MODAL LỜI NHẮN */}
      {openNote && (
        <div className="note-overlay" onClick={() => setOpenNote(false)}>
          <div
            className="note-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Lời nhắn"
          >
            <button
              type="button"
              className="note-close"
              aria-label="Đóng"
              onClick={() => setOpenNote(false)}
            >
              ×
            </button>

            <h3 className="note-title">Lời nhắn</h3>
            <div className="note-divider" />

            <p className="note-text">
              Cảm ơn mọi người đã đến chung vui cùng tụi mình. Sự hiện diện và
              lời chúc của mọi người là món quà quý giá nhất trong ngày đặc biệt
              này. Hẹn gặp mọi người tại buổi tiệc nhé!
            </p>

            <div className="note-hearts" aria-hidden="true">
              <span>💗</span>
              <span>💗</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ThankYou;
