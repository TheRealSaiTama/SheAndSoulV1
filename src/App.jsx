import { useState, useEffect, useRef } from 'react';
import './App.css';
import CountdownScreen from './components/CountdownScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [startTransition, setStartTransition] = useState(false);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Trigger gradient transition after a delay (e.g., 0.2 seconds; adjust as needed)
    const transitionTimer = setTimeout(() => {
      setStartTransition(true);
    }, 800);

    return () => {
      clearTimeout(transitionTimer);
    };
  }, []);

  useEffect(() => {
    if (startTransition && videoRef.current) {
      const videoElement = videoRef.current;
      const playTimeout = setTimeout(async () => {
        try {
          await videoElement.play();
        } catch (err) {
          setIsMuted(true);
          videoElement.muted = true;
          videoElement.play();
        }
      }, 1300);

      return () => clearTimeout(playTimeout);
    }
  }, [startTransition]);

  const handleVideoEnd = () => {
    setShowSplash(false);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const videoIsCurrentlyMuted = videoRef.current.muted;
      videoRef.current.muted = !videoIsCurrentlyMuted;
      setIsMuted(!videoIsCurrentlyMuted);
    }
  };

  return (
    <>
      {showSplash ? (
        <div className={`splash-screen ${startTransition ? 'transitioning' : ''}`}>
          <h1 className="title">
            <span className="she">She</span>
            <span className="amp">&</span>
            <span className="soul">Soul</span>
          </h1>
          <video
            ref={videoRef}
            src="/animated-logo.mp4"
            playsInline
            onEnded={handleVideoEnd}
            className="logo-video"
          />
          {isMuted && (
            <button onClick={toggleMute} className="unmute-button" title="Unmute">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
            </button>
          )}
        </div>
      ) : (
        <CountdownScreen />
      )}
    </>
  );
}

export default App;