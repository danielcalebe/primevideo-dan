import React, { createContext, useState, useContext, useRef, useEffect } from 'react';

// Criando o Contexto
const PlayerContext = createContext();

// Criando o Provedor
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
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });


  // Play/Pause handler
  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Volume handler
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Progress handler
  const handleProgressChange = (e) => {
    const newTime = e.target.value;
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  // Update progress
  const updateProgress = () => {
    const currentTime = videoRef.current.currentTime;
    const duration = videoRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  const toggleMute = () => {
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Fullscreen handler for the page (not the video itself)
  const handleFullScreen = () => {
    const element = document.documentElement; // Pega o elemento da página inteira (html)

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

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullScreenChange);
    };
  }, []);



  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 10; // Avança 10 segundos
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 10; // Volta 10 segundos
    }
  };
  const handleVideoEnd = () => {
    setIsPlaying(false); // Atualiza o estado de isPlaying para false quando o vídeo terminar
  };








  const seekVideo = async (e) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        videoRef.current.duration;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.ontimeupdate = () => {
        seekBar.current.style.width = `${
          (videoRef.current.currentTime / videoRef.current.duration) * 100
        }%`;
        setTime({
          currentTime: {
            second: Math.floor(videoRef.current.currentTime % 60),
            minute: Math.floor(videoRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(videoRef.current.duration % 60),
            minute: Math.floor(videoRef.current.duration / 60),
          },
        });
      };
    }
  }, [videoRef]);





  useEffect(() => {
    const handleSpaceKeyPress = (event) => {
      if (event.code === "Space") {  // Detecta a tecla "Espaço"
        event.preventDefault();  // Impede o comportamento padrão (ex: rolar a página)

        // Alterna entre play e pause
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPlaying(true);

        } else {
          videoRef.current.pause();
          setIsPlaying(false);

        }
      }
    };

    // Adiciona o evento de teclado para detectar a tecla de espaço
    document.addEventListener("keydown", handleSpaceKeyPress);

    // Remove o evento quando o componente for desmontado
    return () => {
      document.removeEventListener("keydown", handleSpaceKeyPress);
    };
  }, []); // O useEffect será executado apenas uma vez ao montar o componente



  const [isInactive, setIsInactive] = useState(false);
  const timeoutDuration = 3000; // Tempo de inatividade em milissegundos (3 segundos)
  let timeout;

  useEffect(() => {
    // Função para reiniciar o timeout e detectar atividade
    const resetInactivity = () => {
      setIsInactive(false);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsInactive(true), timeoutDuration);
    };

    // Adiciona o evento de movimento do mouse
    window.addEventListener("mousemove", resetInactivity);

    // Configura o timeout inicial
    timeout = setTimeout(() => setIsInactive(true), timeoutDuration);

    // Limpa os recursos ao desmontar
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetInactivity);
    };
  }, []);


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
        time, setTime,
        seekVideo,
        isInactive, setIsInactive

      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};
