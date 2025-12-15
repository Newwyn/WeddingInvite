import React, { useState } from 'react';
import './App.css';

import OverlayIntro from './components/OverlayIntro/OverlayIntro';
import GateOpening from './components/GateOpening/GateOpening';
import HeroSection from './components/HeroSection/HeroSection';
import Countdown from './components/Countdown/Countdown';
import EventInfo from './components/EventInfo/EventInfo';
import MapsSection from './components/MapsSection/MapsSection';
import Slideshow from './components/Slideshow/Slideshow';
import Gallery from './components/Gallery/Gallery';
import ThankYou from './components/ThankYou/ThankYou';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';

function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [showGate, setShowGate] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSide, setSelectedSide] = useState(null); // 'groom' | 'bride'

  // Khi bấm "Mở thiệp"
  const handleOpenInvitation = (side) => {
    setSelectedSide(side || null);
    setShowOverlay(false);
    setShowGate(true);   // 👉 bật cổng
  };

  // Khi cổng mở xong
  const handleGateFinish = () => {
    setShowGate(false);  // tắt cổng
    setShowMain(true);   // hiện nội dung
    setIsPlaying(true);  // bật nhạc
  };

  return (
    <div className="App">
      {/* MÀN CHỌN THIỆP */}
      {showOverlay && (
        <OverlayIntro show={showOverlay} onOpen={handleOpenInvitation} />
      )}

      {/* CỔNG MỞ */}
      {showGate && <GateOpening onFinish={handleGateFinish} />}

      {/* NỘI DUNG THIỆP */}
      {showMain && (
        <>
          <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

          {/* ✅ CHỈ THÊM selectedSide VÀO ĐÂY */}
          <HeroSection selectedSide={selectedSide} />

          <Countdown selectedSide={selectedSide} />
          <EventInfo selectedSide={selectedSide} />
          <MapsSection selectedSide={selectedSide} />

          <Slideshow />
          <Gallery />
          <ThankYou />
        </>
      )}
    </div>
  );
}

export default App;
