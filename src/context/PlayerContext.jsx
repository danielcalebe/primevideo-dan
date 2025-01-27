import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1); // Volume inicial
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const seekBg = useRef();
  const seekBar = useRef();

  const [time, setTime] = useState({
    currentTime: 0,
    totalTime: 0,
  });

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  // Atualizar a barra de progresso
  const updateProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setTime((prevTime) => ({
        ...prevTime,
        currentTime,
        totalTime: duration,
      }));
      setProgress((currentTime / duration) * 100); // Atualiza a barra de progresso
    }
  };

  // Adiciona o evento de atualização de progresso
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.ontimeupdate = updateProgress;
    }

    
  }, [videoRef]);

  const toggleMute = () => {
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    const handleLoadedMetadata = () => {
      const duration = videoElement.duration;
      if (!isNaN(duration)) {
        setTime((prevTime) => ({
          ...prevTime,
          totalTime: duration,
        }));
      }
    };

    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [videoRef]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.ontimeupdate = () => {
        const currentTime = videoRef.current.currentTime;
        setTime({
          currentTime,
          totalTime: videoRef.current.duration,
        });
      };
    }
  }, [videoRef]);


  const handleFullScreen = () => {
    const element = document.documentElement;

    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10;
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const seekVideo = async (e) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        videoRef.current.duration;
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        videoRef,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        progress,
        setProgress,
        isMuted,
        setIsMuted,
        isFullScreen,
        setIsFullScreen,
        togglePlayPause,
        handleVolumeChange,
        handleProgressChange,
        updateProgress,
        toggleMute,
        handleFullScreen,
        skipForward,
        skipBackward,
        handleVideoEnd,
        seekBg,
        seekBar,
        time,
        seekVideo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};
