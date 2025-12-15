import { useRef, useCallback } from 'react';

const useFadeVolume = () => {
  const fadeIntervalRef = useRef(null);

  const fadeIn = useCallback((audioElement, duration = 1500) => {
    if (!audioElement) return;

    // Clear any existing fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const steps = 30;
    const stepDuration = duration / steps;
    const volumeIncrement = 1 / steps;
    let currentStep = 0;

    audioElement.volume = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = Math.min(currentStep * volumeIncrement, 1);
      audioElement.volume = newVolume;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, stepDuration);
  }, []);

  const fadeOut = useCallback((audioElement, duration = 1500, callback) => {
    if (!audioElement) return;

    // Clear any existing fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const steps = 30;
    const stepDuration = duration / steps;
    const initialVolume = audioElement.volume;
    const volumeDecrement = initialVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = Math.max(initialVolume - (currentStep * volumeDecrement), 0);
      audioElement.volume = newVolume;

      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        if (callback) callback();
      }
    }, stepDuration);
  }, []);

  return { fadeIn, fadeOut };
};

export default useFadeVolume;