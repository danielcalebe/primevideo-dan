// DisplayDetailContent.jsx
import React, { } from 'react';
import { assets } from '../assets/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import CarrousselItem from './CarrousselItem';
import { useDetailsContentJs } from '../utils/DetailsContent';
const DisplayDetailContent = ({ activeContent, selectedSeason, episodes }) => {

    const { movie, tvshow, similarContent, type } = useDetailsContentJs();

    // Renderização condicional para carregamento
    if (!movie && !tvshow) {
        return <div className='text-white'>Carregando detalhes...</div>;
    }




    const contents = {
        a: selectedSeason && tvshow ? (
            <div className="flex flex-col mt-4 justify-center">
                {episodes ? (
                    episodes.map((episode) => (
                        <div
                            key={episode.id}
                            className=" relative flex items-center lg:items-start
 justify-between text-white group hover:bg-[#191E25] p-4 rounded-lg"
                        >
                            <div className="flex">
                                <div className="p-3 w-[30%] lg:w-[28%] relative cursor-pointer">
                                    <img
                                        className="hidden lg:block rounded-lg"
                                        src={`https://image.tmdb.org/t/p/w1280${episode.still_path ? episode.still_path : tvshow.backdrop_path}`}
                                        alt={`Episódio ${episode.episode_number}`}
                                    />
                                    <div onClick={() =>
                                        navigate(
                                            `/player/${type}/${type === 'tvshow' ? tvshow.id : movie.id}${type === 'tvshow' ? `?season=${selectedSeason.season_number}&episode=${episode.episode_number}` : ''
                                            }`
                                        )}
                                        className="lg:opacity-0 hover:scale-110 group-hover:opacity-100 transition-all duration-900 ease-in-out lg:absolute bg-white p-4 rounded-full flex items-center justify-center lg:top-[30%] lg:left-[45%] w-14">
                                        <img

                                            className="invert brightness-75"
                                            src={assets.play_icon}
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className="p-3 flex flex-col gap-3 w-[70%] lg:w-[35%] justify-center">
                                    <h4 className="text-sm lg:text-lg font-semibold tracking-wider truncate">
                                        T{episode.season_number} EP.{episode.episode_number} - {episode.name}
                                    </h4>
                                    <div className="gap-3 lg:flex hidden">
                                        {new Date(episode.air_date).toLocaleDateString('pt-BR')}
                                        <p>{episode.runtime || '0'} min</p>
                                        <img className="w-6" src={assets.age_icon} alt="" />
                                    </div>
                                    <div className="hidden lg:block">
                                        <p className="line-clamp-2 brightness-75 text-lg">
                                            {episode.overview || 'Sem descrição disponível.'}
                                        </p>
                                    </div>
                                    <div className="truncate gap-1 items-center lg:flex hidden">
                                        <img className="w-5" src={assets.verified_icon} alt="" />
                                        <p className="truncate pt-[0.6px]">Incluído no Prime</p>
                                    </div>
                                    <div className="truncate lg:block hidden p-2 rounded-lg bg-[#474B51] w-[50%] text-center py-4 text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out hover:bg-white hover:text-black cursor-pointer">
                                        <h5>Mais opções de compra</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 lg:w-[10%] w-[40%] h-[100%] items-center   lg:self-auto self-center">
                                <div className="hover:bg-gray-800 cursor-pointer p-3 rounded-full h-12 flex items-center">
                                    <img className="w-8" src={assets.download_icon} alt="" />
                                </div>
                                <h3 className="lg:hidden cursor-pointer text-center truncate">. . .</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Esta temporada não possui episódios disponíveis.</p>
                )}
            </div>
        ) : (
            <p>Selecione uma temporada para visualizar os episódios.</p>
        ),

        b: (
            <div className='p-2 mb-[30%]'>

                <div className="w-full p-6 bg-black relative ">
                    <h2 className="text-white text-xl mb-4">Os clientes também gostam:</h2>

                    {/* Botão de Navegação para o carrossel de "Séries em Destaque" */}
                    <button
                        className="peer custom-prev-second text-white absolute left-6 top-[155px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20"
                    >
                        <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <button
                        className="custom-next-second text-white absolute right-6 top-[155px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-30"
                    >
                        <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.custom-next-second',
                            prevEl: '.custom-prev-second',
                        }}
                        spaceBetween={300}
                        slidesPerView={5}
                    >
                        {similarContent
                            .filter((similar) => similar.backdrop_path) // Filtra itens sem backdrop_path
                            .map((similar, index) => (
                                <SwiperSlide key={similar.id}>
                                    <CarrousselItem
                                        id={similar.id}
                                        name={similar.name || similar.title} // Usa `name` para séries ou `title` para filmes
                                        description={similar.overview} // Ajusta para usar a propriedade correta
                                        background={`https://image.tmdb.org/t/p/w1280${similar.backdrop_path}`}
                                        type={similar.media_type || (similar.title ? 'movie' : 'tvshow')} // Determina o tipo com base nos dados
                                        logo={`https://image.tmdb.org/t/p/w1280${similar.poster_path}`}
                                        index={index} // Usa o índice correto do loop
                                    />
                                </SwiperSlide>
                            ))}

                        <div className='w-[50%] h-200 '>

                        </div>
                    </Swiper>
                </div>


                
                


            </div>
        ),


        c: (

            <div className='flex flex-col gap-10 px-4 mb-[30%] px-8'>
                <h6 className="text-semibold text-lg">Saiba mais </h6>
                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Classificação do Conteudo</h1>
                    <p className='text-[#AAAAAA] text-lg'>{type == 'tvshow' ? tvshow.adult ? 'Para maiores de 18' : 'Para menores de 18' : movie.adult ? 'Para maiores de 18' : 'Para menores de 18'}   </p>
                </div>
                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold '>Idioma de áudio</h1>
                    <div className='flex gap-2'>
                        {type == 'tvshow' ?

                            tvshow.languages && tvshow.languages.map((language) => (

                                <p className='text-[#AAAAAA] text-lg'>{language} -</p>
                            ))
                            :

                            <p className='text-[#AAAAAA] text-lg'>{movie.original_language} </p>

                        }

                    </div>

                </div>

                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Legendas</h1>
                    <div className='flex gap-2'>

                        {type == 'tvshow' ?

                            tvshow.languages && tvshow.languages.map((language) => (

                                <p className='text-[#AAAAAA] text-lg'>{language} -</p>
                            ))
                            :


                            <p className='text-[#AAAAAA] text-lg'>{movie.original_language} </p>

                        }
                    </div>
                </div>

                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Diretores</h1>
                    <p className=' text-lg  gap-3 flex'>
                        <p className='underline'>Diretor 1,</p>
                        <p className='underline'> Diretor 2</p>

                    </p>
                </div>
                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Produtores</h1>
                    <p className=' text-lg  gap-3 flex'>
                        <p className='underline'>Produtor 1,</p>
                        <p className='underline'> Produtor 2</p>

                    </p>
                </div>
                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Elenco</h1>
                    <p className=' text-lg  gap-3 flex'>
                        <p className='underline'>Ator 1,</p>
                        <p className='underline'> Ator 2</p>

                    </p>
                </div>
                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Produção</h1>
                    {type == 'tvshow' ?
                        tvshow.production_companies && tvshow.production_companies.map((production_companie) => (
                            <p className='text-[#AAAAAA] text-lg'>{production_companie.name}</p>
                        ))
                        :
                        movie.production_companies && movie.production_companies.map((production_companie) => (
                            <p className='text-[#AAAAAA] text-lg'>{production_companie.name}</p>
                        ))

                    }

                </div>

                <p className='tracing-wide text-[#AAAAAA] font-semibold flex gap-3'>Ao clicar em reproduzir você concorda com nossos <p className='text-white underline cursor-pointer'>Termos de uso</p></p>


                <hr className="w-full border-[#AAAAAA] border-2 brightness-75" />

                <div className='flex gap-3 flex-col mt-8'>
                    <h1 className='text-xl font-bold'>Feedback</h1>
                    <p className='underline text-lg cursor-pointer'>Enviar feedback</p>
                </div>

                <div className='flex gap-3 flex-col mt-8'>
                    <h1 className='text-xl font-bold'>Suporte</h1>
                    <p className='underline text-lg cursor-pointer'>Ajuda</p>
                </div>



            </div>


        ),
    };

    return (
        <div className="p-4 text-white">
            {contents[activeContent] || <p>Selecione uma seção para visualizar os detalhes.</p>}
        </div>
    );
};

export default DisplayDetailContent;
