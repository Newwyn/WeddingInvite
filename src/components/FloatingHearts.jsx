import { useEffect, useState } from "react";

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();

      const newHeart = {
        id,
        left: Math.random() * 100, // %
        top: Math.random() * 100,  // %
        size: 12 + Math.random() * 8, // 12–20px
        color: Math.random() > 0.5 ? "#ff8fa3" : "#ffc0cb",
      };

      setHearts((prev) => [...prev, newHeart]);

      // Xoá tim sau 4s
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 4000);
    }, 1000); // 1 giây tạo 1 tim (có thể chỉnh 800–1500)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            fontSize: `${heart.size}px`,
            color: heart.color,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
