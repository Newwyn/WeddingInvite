import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import OverlayIntro from './components/OverlayIntro/OverlayIntro';
// import GateOpening from './components/GateOpening/GateOpening';
import HeroSection from './components/HeroSection/HeroSection';
import Countdown from './components/Countdown/Countdown';
import EventInfo from './components/EventInfo/EventInfo';
import MapsSection from './components/MapsSection/MapsSection';
import Slideshow from './components/Slideshow/Slideshow';
import Gallery from './components/Gallery/Gallery';
import ThankYou from './components/ThankYou/ThankYou';
import MusicPlayer from './components/MusicPlayer/MusicPlayer';
import GiftSection from './components/GiftSection/GiftSection';

function AppInner() {
  const location = useLocation();

  // ✅ quyết định hiển thị overlay theo link
  const overlayMode = useMemo(() => {
    if (location.pathname === '/le-tan-hon') return 'groom';
    if (location.pathname === '/le-vu-quy') return 'bride';
    return null; // "/" → hiện cả 2
  }, [location.pathname]);

  const [showOverlay, setShowOverlay] = useState(true);
  const [showGate, setShowGate] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSide, setSelectedSide] = useState(null);

  // ✅ nếu vào từ link riêng → set sẵn nhà trai / gái
  useEffect(() => {
    if (location.pathname === '/le-tan-hon') {
      setSelectedSide('groom');
    } else if (location.pathname === '/le-vu-quy') {
      setSelectedSide('bride');
    } else {
      setSelectedSide(null);
    }
  }, [location.pathname]);

  // Khi bấm "Mở thiệp"
  const handleOpenInvitation = (side) => {
    setSelectedSide(side || selectedSide || null);
    setShowOverlay(false);
    setShowMain(true);
    setIsPlaying(true);
  };

  // Nút quay lại overlay
  const handleBackToOverlay = () => {
    setShowMain(false);
    setIsPlaying(false);
    setShowOverlay(true);

    // giữ đúng bên theo link
    if (location.pathname === '/le-tan-hon') setSelectedSide('groom');
    else if (location.pathname === '/le-vu-quy') setSelectedSide('bride');
    else setSelectedSide(null);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {showOverlay && (
        <OverlayIntro
          show={showOverlay}
          onOpen={handleOpenInvitation}
          mode={overlayMode}
        />
      )}

      {showMain && (
        <>
          <button
            className="back-to-overlay"
            onClick={handleBackToOverlay}
          >
            ← Quay lại
          </button>

          <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

          <HeroSection selectedSide={selectedSide} />
          <Countdown selectedSide={selectedSide} />
          <EventInfo selectedSide={selectedSide} />
          <MapsSection selectedSide={selectedSide} />

          <Slideshow />
          <Gallery />
          <GiftSection selectedSide={selectedSide} />
          <ThankYou />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppInner />} />
        <Route path="/le-tan-hon" element={<AppInner />} />
        <Route path="/le-vu-quy" element={<AppInner />} />
        <Route path="*" element={<AppInner />} />
      </Routes>
    </BrowserRouter>
  );
}
