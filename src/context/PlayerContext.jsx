import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams  } from 'react-router-dom';

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


    const { type, id } = useParams();
    const [searchParams] = useSearchParams();
    
    const season = searchParams.get('season');
    const episode = searchParams.get('episode');  
    const [trailer, setTrailer] = useState(null);
    const [data, setData] = useState(null);  // Estado para armazenar as informações do filme ou série
    const navigate = useNavigate()
    // Função para buscar trailer e informações básicas
    const fetchTrailerAndData = async () => {
      try {
        let response;
        let dataResponse;
    
        // Obter trailer e conteúdo para filme
        if (type === 'movie') {
          response = await api.get(`/movie/${id}/videos`, {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'pt-BR',
            },
          });
    
          if (response.data.results && response.data.results.length > 0) {
            setTrailer(response.data.results[0]); // O trailer mais relevante
          }
    
          dataResponse = await api.get(`/movie/${id}`, {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'pt-BR',
            },
          });
    
          // Armazenando as informações do filme
          setData(dataResponse.data);
        }
    
        // Obter trailer e conteúdo para série de TV
        else if (type === 'tvshow') {
          response = await api.get(`/tv/${id}/videos`, {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'pt-BR',
            },
          });
    
          if (response.data.results && response.data.results.length > 0) {
            setTrailer(response.data.results[0]); // O trailer mais relevante
          }
    
          dataResponse = await api.get(`/tv/${id}`, {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: 'pt-BR',
            },
          });
    
          const seriesData = dataResponse.data;
    
          // Atualizar o estado com as informações da série
          setData((prevData) => ({
            ...prevData,
            ...seriesData,
          }));
    
          // Obter informações da temporada atual
          if (season) {
            const seasonResponse = await api.get(`/tv/${id}/season/${season}`, {
              params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                language: 'pt-BR',
              },
            });
    
            const seasonData = seasonResponse.data;
    
            // Atualizar o estado com as informações da temporada
            setData((prevData) => ({
              ...prevData,
              season: seasonData,
            }));
          }
    
          // Obter informações do episódio atual
          if (season && episode) {
            const episodeResponse = await api.get(`/tv/${id}/season/${season}/episode/${episode}`, {
              params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                language: 'pt-BR',
              },
            });
    
            const episodeData = episodeResponse.data;
    
            // Atualizar o estado com as informações do episódio
            setData((prevData) => ({
              ...prevData,
              episode: episodeData,
            }));
          }
        }
      } catch (error) {
        console.error('Erro ao buscar trailer e dados:', error);
      }
    };
    
    console.log(trailer)
    // Carregar trailer e dados quando o id ou type mudar
    useEffect(() => {
      fetchTrailerAndData();
    }, [id, type]);
    const handleNextEpisode = () => {
      if (!data?.season || !season || !episode) {
        console.warn('Dados da temporada ou do episódio não disponíveis.');
        return;
      }
   
      const totalEpisodes = data.season.episodes?.length || 0; // Número total de episódios na temporada atual
      const currentSeason = parseInt(season, 10);
      const currentEpisode = parseInt(episode, 10);
  
      if (currentEpisode < totalEpisodes) {
        // Ir para o próximo episódio da mesma temporada
        navigate(`/player/tvshow/${id}?season=${currentSeason}&episode=${currentEpisode + 1}`);
      } else {
        // Se for o último episódio da temporada, ir para o primeiro episódio da próxima temporada
        navigate(`/player/tvshow/${id}?season=${currentSeason + 1}&episode=1`);
      }
  
      setTimeout(() => {
        window.location.reload();
      }, 100); // Pequeno atraso para garantir que a navegação seja concluída
    
    };
    
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
