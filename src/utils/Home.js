import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const useHomeJs = () => {
    const [hoverStartTime, setHoverStartTime] = useState(null);
    const [showTeaser, setShowTeaser] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false);
    const videoRef = useRef(null);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const swiperRef = useRef(null);
    
    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            setShowTeaser(true);
            setVideoStarted(true);
        }, 3000);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowTeaser(false);
        setVideoStarted(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const stopVideo = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: carouselRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -carouselRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    const [isPlaying, setIsPlaying] = useState(false);
    const isAutoplayEnabled = !videoStarted || !isPlaying;
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const goToNextSlide = () => {
        const swiperInstance = swiperRef.current?.swiper;
        swiperInstance?.slideNext();
    };

    const goToPrevSlide = () => {
        const swiperInstance = swiperRef.current?.swiper;
        swiperInstance?.slidePrev();
    };

   

    // Estados para armazenar filmes e séries
    const [movies, setMovies] = useState({
        topRated: [],
        popular: [],
        nowPlaying: [],
        upcoming: [],
    });

    const [tvshows, setTvShows] = useState({
        topRated: [],
        popular: [],
        airingToday: [],
        onTheAir: [],
    });

    const [favoriteTV, setFavoriteTV] = useState([]); 

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const [popularResponse, topRatedResponse, nowPlayingResponse, upcomingResponse] = await Promise.all([
                    api.get('/movie/popular', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'pt-BR' } }),
                    api.get('/movie/top_rated', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'pt-BR' } }),
                    api.get('/movie/now_playing', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'pt-BR' } }),
                    api.get('/movie/upcoming', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'pt-BR' } }),
                ]);

                setMovies({
                    topRated: topRatedResponse.data.results,
                    popular: popularResponse.data.results,
                    nowPlaying: nowPlayingResponse.data.results,
                    upcoming: upcomingResponse.data.results,
                });
            } catch (error) {
                console.error("Erro ao buscar filmes:", error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchFavoriteTV = async () => {
            try {
                const response = await api.get('/account/{account_id}/favorite/tv', {
                    params: {
                        api_key: import.meta.env.VITE_TMDB_API_KEY,
                        session_id: import.meta.env.VITE_SESSION_ID,
                        language: 'pt-BR',
                    },
                });

                if (response.data?.results) {
                    setFavoriteTV(response.data.results);
                }
            } catch (error) {
                console.error("Erro ao buscar séries favoritas:", error);
            }
        };

        fetchFavoriteTV();
    }, []);

    useEffect(() => {
        const fetchTvShows = async () => {
            try {
                const [popularResponse, topRatedResponse, airingTodayResponse, onTheAirResponse] = await Promise.all([
                    api.get('/tv/popular', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'pt-BR' } }),
                    api.get('/tv/top_rated', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'pt-BR' } }),
                    api.get('/tv/airing_today', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'pt-BR' } }),
                    api.get('/tv/on_the_air', { params: { api_key: import.meta.env.VITE_TMDB_API_KEY, language: 'pt-BR' } }),
                ]);

                setTvShows({
                    topRated: topRatedResponse.data.results,
                    popular: popularResponse.data.results,
                    airingToday: airingTodayResponse.data.results,
                    onTheAir: onTheAirResponse.data.results,
                });
            } catch (error) {
                console.error("Erro ao buscar séries:", error);
            }
        };

        fetchTvShows();
    }, []);

    return {
        hoverStartTime,
        setHoverStartTime,
        showTeaser,
        videoStarted,
        videoRef,
        timeoutRef,
        handleMouseEnter,
        handleMouseLeave,
        stopVideo,
        carouselRef,
        handleNext,
        handlePrev,
        isPlaying,
        isAutoplayEnabled,
        isMuted,
        toggleMute,
        swiperRef,
        goToNextSlide,
        goToPrevSlide,
        movies,
        tvshows,
        favoriteTV,
    };
};
