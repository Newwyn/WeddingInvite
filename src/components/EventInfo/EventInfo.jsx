import React, { useEffect, useMemo, useState } from "react";
import "./EventInfo.css";

const EventInfo = ({ selectedSide }) => {
  const images = useMemo(() => {
    // selectedSide === "groom" => nhà trai
    // selectedSide !== "groom" => nhà gái
    return selectedSide === "groom"
      ? ["/3.png", "/2.png"] // ✅ 3 trước 2
      : ["/4.png", "/1.png"]; // ✅ 4 trước 1
  }, [selectedSide]);

  const [openSrc, setOpenSrc] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpenSrc(null);
    };

    if (openSrc) {
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
  }, [openSrc]);

  return (
    <section className="eventinfo-wrapper">
      {/* Header */}
      <div className="eventinfo-header">
        <h2 className="eventinfo-title">Thông tin lễ cưới</h2>
        <div className="eventinfo-underline">
          <span></span>
        </div>
        <p className="eventinfo-desc">
          Chúng mình rất mong được chia sẻ niềm hạnh phúc này cùng với gia đình
          và bạn bè thân yêu ♥
        </p>
      </div>

      {/* Images */}
      <div className="eventinfo-images">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className="eventinfo-image-card"
            onClick={() => setOpenSrc(src)}
            aria-label="Xem ảnh lớn"
          >
            <img className="eventinfo-image" src={src} alt={`Event ${index + 1}`} />
          </button>
        ))}
      </div>

      {/* Modal preview */}
      {openSrc && (
        <div className="eventinfo-modal-overlay" onClick={() => setOpenSrc(null)}>
          <div
            className="eventinfo-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Xem ảnh"
          >
            <button
              type="button"
              className="eventinfo-modal-close"
              onClick={() => setOpenSrc(null)}
              aria-label="Đóng"
            >
              ×
            </button>

            <img className="eventinfo-modal-img" src={openSrc} alt="Preview" />
          </div>
        </div>
      )}
    </section>
  );
};

export default EventInfo;
