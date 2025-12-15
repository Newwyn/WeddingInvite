import React, { useEffect, useRef } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.log("Autoplay blocked:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
     <audio
  ref={audioRef}
  src="/music.mp3"
  preload="auto"
  loop></audio>
      <div
        className="music-toggle"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? "🔊" : "🔇"}
      </div>
    </>
  );
}
