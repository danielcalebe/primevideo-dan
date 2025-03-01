import React from 'react';
import { assets } from '../assets/assets';
import CarrousselItem from './CarrousselItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { useHomeJs } from '../utils/Home';

const DisplayMyStuff = () => {

    const {
        movies,

    } = useHomeJs();


    return (
        <div className="bg-black  flex-col flex  w-full p-5 pb-[25%]">
            <div className='pl-12 pt-16'>
                <h1 className="  text-white font-semibold text-4xl">Minha área</h1>

                <div className='flex gap-5 items-center pt-6'>
                    <h4 className="text-white font-semibold text-lg ">Lista para assistir - Filmes</h4>
                    <div className='flex gap-2 items-center'>
                        <h6 className="text-white font-semibold text-md">Ver tudo </h6>
                        <img className='w-4 -rotate-90' src={assets.arrow_white_icon} alt="" />
                    </div>
                </div>
            </div>
            <div>


                <div className="w-full p-6 ml-5 bg-black relative">

                    {/* Botão de Navegação para o carrossel de "Séries em Destaque" */}
                    <button
                        className="peer custom-prev-second text-white absolute left-6 top-[107px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20"
                    >
                        <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <button
                        className="custom-next-second text-white absolute right-6 top-[107px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-30"
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
                        className="w-full flex gap-4"
                    >
                        {movies.topRated.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <CarrousselItem
                                    id={movie.id}
                                    name={movie.title}
                                    type={'movie'}

                                    description={movie.overview}
                                    background={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    logo={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : ''
                                    }
                                />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>

            </div>



        </div>
    );
};

export default DisplayMyStuff;
