import React, { useMemo, useState, useEffect } from "react";
import "./GiftSection.css";

const SECRET = "RSVP_hoangson_2025_change_me"; // phải khớp với Apps Script SECRET

const getClientId = () => {
  const key = "rsvp_client_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = (crypto?.randomUUID?.() || `cid_${Date.now()}_${Math.random()}`).replaceAll("-", "");
    localStorage.setItem(key, id);
  }
  return id;
};

const GiftSection = ({ selectedSide }) => {
  // ===== RSVP STATE =====
  const [guestName, setGuestName] = useState("");
  const [attendance, setAttendance] = useState("yes"); // yes | no
  const [rsvpMsg, setRsvpMsg] = useState("");

  // LINK SCRIPT MỚI CỦA BÉ
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbw0qRxov668mXoQ58ByuP8L8OfNc7H6ivBhfaFYrvF184KrOh9NGVTeSewnBbRmuNIN/exec";

  const onSubmitRSVP = async (e) => {
    e.preventDefault();

    const name = (guestName || "").trim();
    if (!name) {
      setRsvpMsg("Vui lòng nhập họ và tên.");
      return;
    }

    setRsvpMsg("Đang gửi xác nhận...");

   const payload = {
  name,
  attendance,
  side: selectedSide || "unknown",
  secret: SECRET,
  clientId: getClientId(),
};

    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {
        json = null;
      }

      if (json?.ok) {
        setRsvpMsg(
          attendance === "yes"
            ? `Đã ghi nhận: ${name} sẽ tham dự. Cảm ơn bạn!`
            : `Đã ghi nhận: ${name} không thể tham dự. Cảm ơn bạn đã phản hồi!`
        );
        return;
      }

      console.log("RSVP non-JSON or not ok:", text);
      throw new Error("Non-JSON/Not ok response");
    } catch (err) {
      try {
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        setRsvpMsg(
          attendance === "yes"
            ? `Đã ghi nhận: ${name} sẽ tham dự. (Nếu cần, vui lòng kiểm tra lại trong bảng.)`
            : `Đã ghi nhận: ${name} không thể tham dự. (Nếu cần, vui lòng kiểm tra lại trong bảng.)`
        );
      } catch (err2) {
        console.error(err, err2);
        setRsvpMsg("Có lỗi xảy ra, thử lại sau giúp mình nha.");
      }
    }
  };

  // ===== GIFT INFO (tự đổi theo selectedSide) =====
  const groomGift = {
    bankName: "Sacombank",
    accountName: "NGUYEN VO HOANG SON",
    accountNumber: "060110159601",
    transferNote: "CHUYEN TIEN NHANH QUA QR",
    qrImage: "/qr-hoangson.png",
    qrAlt: "VietQR - Hoàng Sơn",
  };

  const brideGift = {
    bankName: "ACB",
    accountName: "LY MY DUYEN",
    accountNumber: "1096577",
    transferNote: "CHUYEN TIEN NHANH QUA QR",
    qrImage: "/qr-myduyen.png",
    qrAlt: "VietQR - Ly My Duyen",
  };

  // Mặc định vẫn là chú rể (như hiện tại), chỉ đổi khi selectedSide === "bride"
  const gift = selectedSide === "bride" ? brideGift : groomGift;

  const fields = useMemo(
    () => [
      { label: "Ngân hàng:", value: gift.bankName },
      { label: "Chủ tài khoản:", value: gift.accountName },
      { label: "Số tài khoản:", value: gift.accountNumber },
      { label: "Nội dung:", value: gift.transferNote },
    ],
    [gift.bankName, gift.accountName, gift.accountNumber, gift.transferNote]
  );

  const [copiedKey, setCopiedKey] = useState(null);

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch (e) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    }
  };

  // ESC clear message
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setRsvpMsg("");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <section className="gift-section" id="gift">
      <div className="gift-shell">
        {/* ================= RSVP BLOCK (TRƯỚC MỪNG CƯỚI) ================= */}
        <div className="rsvp-card">
          <h3 className="rsvp-title">Xác nhận tham dự</h3>

          <form className="rsvp-form" onSubmit={onSubmitRSVP}>
            <label className="rsvp-label">Họ và tên</label>
            <input
              className="rsvp-input"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Nhập tên của bạn"
              autoComplete="name"
            />

            <div className="rsvp-subtitle">Bạn sẽ tham dự chứ?</div>

            <label className="rsvp-radio">
              <input
                type="radio"
                name="attendance"
                checked={attendance === "yes"}
                onChange={() => setAttendance("yes")}
              />
              <span>Có, tôi sẽ tham dự</span>
            </label>

            <label className="rsvp-radio">
              <input
                type="radio"
                name="attendance"
                checked={attendance === "no"}
                onChange={() => setAttendance("no")}
              />
              <span>Tôi bận, rất tiếc không thể tham dự</span>
            </label>

            <button className="rsvp-btn" type="submit">
              Gửi xác nhận
            </button>

            {rsvpMsg && <div className="rsvp-msg">{rsvpMsg}</div>}
          </form>
        </div>

        {/* ================= MỪNG CƯỚI ================= */}
        <h2 className="gift-title">Mừng Cưới</h2>
        <div className="gift-divider" />

        <p className="gift-desc">
          Nếu anh/chị/bạn muốn gửi lời chúc mừng đến tụi mình, có thể chuyển khoản
          theo thông tin dưới đây. Tụi mình xin phép nhận tấm lòng này như một món
          quà quý báu cho chặng đường mới.
        </p>

        <div className="gift-card">
          <div className="gift-card-title">📌 Thông tin chuyển khoản:</div>

          <div className="gift-form">
            {fields.map((f, idx) => {
              const key = `${idx}-${f.label}`;
              const isCopied = copiedKey === key;

              return (
                <div className="gift-row" key={key}>
                  <div className="gift-label">{f.label}</div>

                  <button
                    type="button"
                    className={`gift-input ${isCopied ? "copied" : ""}`}
                    onClick={() => copyText(f.value, key)}
                    aria-label={`Copy ${f.label}`}
                    title="Click để copy"
                  >
                    <span className="gift-value">{f.value}</span>
                    <span className="gift-copyhint">
                      {isCopied ? "Đã copy" : "Click để copy"}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="gift-qr">
          <div className="gift-qr-box">
            <img
              src={gift.qrImage}
              alt={gift.qrAlt}
              className="gift-qr-img"
              loading="lazy"
            />
          </div>
          <div className="gift-qr-note">Quét mã QR để chuyển khoản</div>
        </div>

        <div className="gift-thanks">
          Cảm ơn mọi người thật nhiều vì đã luôn yêu thương và ủng hộ! Tụi mình
          mong sẽ sớm có dịp gặp nhau để cùng chia sẻ niềm vui.
        </div>

        <div className="gift-hearts" aria-hidden="true">
          <span>💗</span>
          <span>💗</span>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
