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
import GiftSection from './components/GiftSection/GiftSection';


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

    // ✅ TẠM BỎ QUA GATEOPENING: vào thẳng nội dung thiệp + bật nhạc
    setShowMain(true);
    setIsPlaying(true);

    // ⛔ Giữ code cũ để bật lại sau (chỉ comment, không xóa)
    // setShowGate(true);   // 👉 bật cổng
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

      {/* CỔNG MỞ (tạm vô hiệu hóa hiển thị để khách không thấy) */}
      {/* {showGate && <GateOpening onFinish={handleGateFinish} />} */}

      {/* NỘI DUNG THIỆP */}
      {showMain && (
        <>
          <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

          <HeroSection selectedSide={selectedSide} />

          <Countdown selectedSide={selectedSide} />
          <EventInfo selectedSide={selectedSide} />
          <MapsSection selectedSide={selectedSide} />

          <Slideshow />
          <Gallery />
	<GiftSection />
          <ThankYou />
        </>
      )}
    </div>
  );
}

export default App;
