import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYWRiN2U5Y2I0OWUxZGNkODJmYmIxOGE5MzU1OTExYSIsIm5iZiI6MTczNjQzMjcwMC42ODIsInN1YiI6IjY3N2ZkYzNjZTBkNTY0OTNlNGJiMzczNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TP6IYasHDs0AP_HqgsURilmJ_2w4CWPldbDd4OwXczM'
  }
});

export const fetchSearchResults = async (query) => {
  try {
    const response = await api.get(`/search/multi`, {
      params: {
        query,
        language: 'pt-BR'
      }
    });
    return response.data.results; 
  } catch (error) {
    console.error('Erro ao buscar resultados:', error);
    return [];
  }
};

api.get('/authentication')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Erro ao fazer a solicitação:', error);
  });

export default api;
