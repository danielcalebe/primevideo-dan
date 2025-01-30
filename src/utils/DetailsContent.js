import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
export const useDetailsContentJs = () => {
    const { id } = useParams();
    const { type } = useParams();
    const [movie, setMovie] = useState(null); // Estado para o filme
    const [tvshow, setTvshow] = useState(null); // Estado para a série de TV
    const [similarContent, setSimilarContent] = useState([]); // Estado para conteúdos similares

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;

                // Detalhes do filme ou série
                if (type === 'movie') {
                    response = await api.get(`/movie/${id}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    if (response.data) setMovie(response.data);

                    // Filmes similares
                    const similarResponse = await api.get(`/movie/${id}/similar`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    if (similarResponse.data?.results) setSimilarContent(similarResponse.data.results);
                } else if (type === 'tvshow') {
                    response = await api.get(`/tv/${id}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    if (response.data) setTvshow(response.data);

                    // Séries similares
                    const similarResponse = await api.get(`/tv/${id}/similar`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    if (similarResponse.data?.results) setSimilarContent(similarResponse.data.results);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes ou conteúdos similares:', error);
            }
        };

        fetchData();
    }, [id, type]);

    return { movie, tvshow, similarContent, api,type  };
};

