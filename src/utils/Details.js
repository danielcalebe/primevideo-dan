import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
export const useDetailsJs = () => {
    const { id, type } = useParams();
    const [movie, setMovie] = useState(null); // Estado do filme
    const [tvshow, setTvshow] = useState(null); // Estado da série de TV
    const [activeContent, setActiveContent] = useState(type === 'tvshow' ? 'a' : 'b');
    const [isFixed, setIsFixed] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(0);
    const [episodes, setEpisodes] = useState([]); // Estado para episódios

    const containerDetailRef = useRef(null);
    const navigate = useNavigate();

    // Função para lidar com o scroll
    useEffect(() => {
        const handleScroll = () => {
            if (containerDetailRef.current) {
                const containerTop = containerDetailRef.current.getBoundingClientRect().top;
                setIsFixed(containerTop <= window.innerHeight * 0.08);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleContentToggle = (content) => {
        setActiveContent((prevContent) => (prevContent === content ? null : content));
    };

    // Função para buscar dados de filme ou série
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (type === 'movie') {
                    response = await api.get(`/movie/${id}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    setMovie(response.data || null);
                } else if (type === 'tvshow') {
                    response = await api.get(`/tv/${id}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    setTvshow(response.data || null);
                }
            } catch (error) {
                console.error(`Erro ao buscar os detalhes: ${error}`);
            }
        };

        fetchData();
    }, [id, type]);

    // Definindo a temporada inicial
    useEffect(() => {
        if (tvshow?.seasons?.length > 0) {
            setSelectedSeason(tvshow.seasons[0]);
        }
    }, [tvshow]);

    // Buscando episódios quando a temporada muda
    useEffect(() => {
        const fetchEpisodes = async () => {
            if (selectedSeason && tvshow?.id) {
                try {
                    const response = await api.get(`/tv/${tvshow.id}/season/${selectedSeason.season_number}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    setEpisodes(response.data?.episodes || []);
                } catch (error) {
                    console.error(`Erro ao buscar episódios: ${error}`);
                }
            }
        };
        fetchEpisodes();
    }, [selectedSeason, tvshow]);

    const handleSeasonChange = (event) => {
        const seasonNumber = parseInt(event.target.value, 10);
        const season = tvshow?.seasons?.find((s) => s.season_number === seasonNumber);
        if (season) {
            setSelectedSeason(season);
        } else {
            console.warn('Temporada não encontrada:', seasonNumber);
        }
    };

    return {
        movie,
        tvshow,
        activeContent,
        setActiveContent,
        isFixed,
        selectedSeason,
        episodes,
        handleSeasonChange,
        handleContentToggle,
        containerDetailRef,
        type 
    };
};
