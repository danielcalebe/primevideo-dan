import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  
import { fetchSearchResults } from '../api'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useUtils } from '../utils/utils';
const DisplaySearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); 


  const {
    refreshPage,
    navigate,
    assets,
    CarrousselItem
  } = useUtils();

  const queryParam = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (queryParam) {
      search(queryParam);  
    }
  }, [location]);



  useEffect(() => {
    if (queryParam) {  
      refreshPage;
    }
  }, [queryParam]); 



  const search = async (query) => {
    setLoading(true);
    try {
      const data = await fetchSearchResults(query);
      setResults(data);
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
    } finally {
      setLoading(false);
    }
  };

  const chunkSize = 6;
  const chunks = [];
  for (let i = 0; i < results.length; i += chunkSize) {
    chunks.push(results.slice(i, i + chunkSize));
  }

  return (
    <div>
      <h1 className='mt-20'></h1>
      <h1 className='text-white p-6 text-lg'>Resultados para "{queryParam}".</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div>
          {chunks.length > 0 ? (
            chunks.map((chunk, index) => (
              <div key={index} className="w-full p-6 bg-black relative transition-all duration-300">
                <h2 className="text-white text-2xl mb-4">
                  {index === 0 ? 'Principais resultados' : 'Outros Resultados'}
                </h2>

                {/* Botões de Navegação */}
                <button className="peer custom-prev-second3 text-white absolute left-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20">
                  <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                </button>
                <button className="custom-next-second3 text-white absolute right-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-20">
                  <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                </button>

                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: '.custom-next-second3',
                    prevEl: '.custom-prev-second3',
                  }}
                  spaceBetween={300}
                  slidesPerView={5}
                  className="w-full flex gap-4"
                >
                  {chunk.map((result) => (
                    result.backdrop_path && ( // Verifica se há backdrop_path antes de renderizar
                      <SwiperSlide key={result.id}>
                        <CarrousselItem
                          id={result.id}
                          name={result.title || result.name} 
                          type={result.media_type === 'tv' ? 'tvshow' : 'movie'}
                          description={result.overview}
                          background={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                          logo={
                            result.poster_path
                              ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                              : '' // Fallback se não houver logo
                          }
                        />
                      </SwiperSlide>
                    )
                  ))}
                </Swiper>
              </div>
            ))
          ) : (
            <p>Nenhum resultado encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DisplaySearch;
