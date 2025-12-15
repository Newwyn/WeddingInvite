import React from "react";
import "./MapsSection.css";

const MapsSection = ({ selectedSide }) => {
  // ===== LINK MỞ GOOGLE MAPS (ĐÚNG NHƯ BẠN NÓI) =====
  const groomMapLink = "https://maps.app.goo.gl/SuZNKaZg6hujfJYE6";
  const brideMapLink = "https://goo.gl/maps/PrJ4kv6FtwLTxsHU6";

  // ===== LINK EMBED CHUẨN (iframe src) =====
  const groomEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8121913215205!2d106.7338217!3d10.8256801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527881e378ad7%3A0xe56516934de312b0!2sWhite%20Garden%20GH!5e0!3m2!1svi!2s!4v1765811755882!5m2!1svi!2s";

  const brideEmbed =
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3914.1071744108453!2d106.61253307504775!3d11.179699988994619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDEwJzQ2LjkiTiAxMDbCsDM2JzU0LjQiRQ!5e0!3m2!1svi!2s!4v1765812154487!5m2!1svi!2s";

  const isGroom = selectedSide === "groom";

  return (
    <section className="maps-section">
      <h2 className="section-title">
        {isGroom
          ? "Bản đồ đến địa điểm nhà trai"
          : "Bản đồ đến địa điểm nhà gái"}
      </h2>

      <div className="section-divider" />

      <div className="map-card">
        <h3 className="map-side-title">
          {isGroom ? "Nhà Trai" : "Nhà Gái"}
        </h3>

        <p className="map-address">
          {isGroom ? "White Garden GH" : "Địa điểm nhà gái"}
        </p>

        <div className="map-embed">
          <iframe
            src={isGroom ? groomEmbed : brideEmbed}
            width="100%"
            height="360"
            style={{ border: 0, borderRadius: "16px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={isGroom ? "Google Map - Nhà Trai" : "Google Map - Nhà Gái"}
          />
        </div>

        <a
          href={isGroom ? groomMapLink : brideMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="map-button"
        >
          📍 Xem trên Google Maps
        </a>
      </div>
    </section>
  );
};

export default MapsSection;
