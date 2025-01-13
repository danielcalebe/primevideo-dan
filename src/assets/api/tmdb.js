  import axios from 'axios';

  // URL base da API do TMDb
  const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: '2adb7e9cb49e1dcd82fbb18a9355911a', // Substitua pela sua chave
      language: 'pt-BR',          // Idioma (opcional)
    },
  });

  export const getTrendingMovies = async () => {
    try {
      const response = await tmdb.get('/tv/popular');
      return response.data.results; // Retorna uma lista de filmes
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      return [];
    }
  };


  export default tmdb;
