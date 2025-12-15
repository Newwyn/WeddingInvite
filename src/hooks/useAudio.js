import { useState, useRef } from "react";

const useAudio = (url) => {
  const audioRef = useRef(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    audioRef.current.play()
      .then(() => setIsPlaying(true))
      .catch(() => {}); // tránh crash autoplay
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return {
    audioRef,
    isPlaying,
    play,
    pause,
  };
};

export default useAudio;
