import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { assets, originalsPrimeData, seriesData } from '../assets/assets';
import SerieItem from './SerieItem';
import OriginalsItem from './OriginalsItem';
import { getTrendingMovies } from '../assets/api/tmdb';
import Footer from './Footer';
const DisplayHome = () => {

    const [hoverStartTime, setHoverStartTime] = useState(null);
    const [showTeaser, setShowTeaser] = useState(false);
    const [videoStarted, setVideoStarted] = useState(false); // Estado para controlar o início do vídeo
    const videoRef = useRef(null);

    // Função chamada ao entrar no hover
    const handleMouseEnter = () => {
        const timeout = setTimeout(() => {
            setShowTeaser(true); // Mostra o conteúdo após 5 segundos
            setVideoStarted(true); // Inicia o vídeo após o tempo de hover
        }, 3000); // Aguarda 5 segundos

        setHoverStartTime({ time: performance.now(), timeout });
    };

    // Função chamada ao sair do hover
    const handleMouseLeave = () => {
        if (hoverStartTime?.timeout) {
            clearTimeout(hoverStartTime.timeout); // Cancela o timeout se o mouse sair antes de 5 segundos
        }
        setHoverStartTime(null);
        setShowTeaser(false); // Oculta o conteúdo novamente
        setVideoStarted(false); // Para o vídeo caso o hover seja interrompido
        if (videoRef.current) {
            videoRef.current.pause(); // Pausa o vídeo
        }
    };

    const stopVideo = () => {
        const videoElement = document.getElementById("videoC");
        if (videoElement) {
            videoElement.pause(); // Pausa o vídeo
            // Opcional: reseta o tempo do vídeo para o início
        }
    };


    const carouselRef = useRef(null);

    // Função para navegar para frente
    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: carouselRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };

    // Função para navegar para trás
    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -carouselRef.current.offsetWidth,
                behavior: "smooth",
            });
        }
    };
    const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar se o vídeo está sendo reproduzido

    const isAutoplayEnabled = !videoStarted || !isPlaying;

    const [isMuted, setIsMuted] = useState(true); // Estado para controlar o mute/desmute
    const toggleMute = () => {
        setIsMuted(!isMuted); // Alterna o estado do mute
    };















    return (
        <div className="w-full h-screen bg-black mb-[900px]">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                speed={1000}
                pagination={{
                    clickable: true,
                    type: 'bullets',
                    renderBullet: (index, className) => {
                        const isActive = className.includes('swiper-pagination-bullet-active');
                        return (
                            `<span class="${className} w-4 h-4 rounded-full bg-white mx-2 hover:bg-white transition-all duration-300 ease-in-out ${isActive ? 'bg-white' : 'bg-transparent'}">
        </span>`
                        );
                    },
                }}
                autoplay={isAutoplayEnabled ? { delay: 20000 } : false}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                onSlideChange={stopVideo}
                className="w-full h-[80%]"
            >
                {seriesData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className={`w-full h-full flex flex-col justify-end inner-custom relative
                    ${showTeaser ? 'inner-custom2' : ''}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                backgroundImage: `url(${slide.background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            {/* Teaser de vídeo */}
                            <div
                                className={`absolute inset-0 flex bg-black bg-opacity-75 text-white text-lg transition-opacity duration-500 ${showTeaser ? 'block opacity-100' : 'hidden opacity-0'}`}
                            >
                                <video
                                    id="videoC"
                                    className="top-2 w-full h-full lg:-right-[12%] absolute"
                                    autoPlay
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    style={{
                                        visibility: videoStarted ? 'visible' : 'hidden',
                                    }}
                                >
                                    <source src={slide.teaser} type="video/mp4" />
                                </video>
                                <button
                                    className="absolute top-[18%] right-[5%] p-2 bg-black bg-opacity-50 rounded-full text-white"
                                    onClick={toggleMute}
                                >
                                    {isMuted ? (
                                        <img className="w-6 h-6" src={assets.unmute_icon} alt="Mute" />
                                    ) : (
                                        <img className="w-6 h-6" src={assets.mute_icon} alt="Unmute" />
                                    )}
                                </button>
                            </div>

                            {/* Conteúdo com descrição */}
                            <div className="p-14 w-[45%] flex flex-col gap-2">
                                <div className="flex flex-col gap-3 group transition-all duration-500 ease-in-out transform scale-95 hover:scale-100">
                                    <img className="w-16 transition-all duration-500 ease-in-out" src={assets.logo_prime_blue} alt="" />
                                    <img className="w-64 transition-all duration-500 ease-in-out" src={slide.logo} alt="" />

                                    {/* Descrição com animação */}
                                    <p className="text-white opacity-0 group-hover:opacity-100 md:group-hover:flex transition-opacity hidden
                                duration-500 ease-in-out line-clamp-2 h-1 group-hover:h-12 transform scale-90 group-hover:scale-100">
                                        {slide.description}
                                    </p>
                                </div>

                                {/* Botões de ação */}
                                <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                                    {/* Botão "Assista agora" */}
                                    <div className="relative w-full group sm:w-auto">
                                        <div
                                            className="flex items-center gap-3 w-full sm:w-auto px-1 sm:px-6 justify-center sm:justify-start py-3 bg-[#33373E] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                                        >
                                            <img
                                                className="w-[40%] sm:w-8 w-20 group-hover:invert md:relative sm:absolute"
                                                src={assets.play_icon}
                                                alt="Play Icon"
                                            />
                                            <span className="truncate sm:block hidden">Assista agora</span>
                                        </div>
                                    </div>

                                    {/* Botões de adicionar e informações */}
                                    <div className="flex gap-4">
                                        {/* Botão Adicionar */}
                                        <div className="relative group">
                                            <div
                                                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#33373E]
                                            rounded-full hover:bg-white
                                            transition-all duration-300 ease-in-out cursor-pointer"
                                            >
                                                <img
                                                    className="w-[50%] sm:w-8 group-hover:invert"
                                                    src={assets.add_icon}
                                                    alt="Adicionar"
                                                />
                                            </div>
                                            <div
                                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-1 px-3 bg-white text-black text-xs sm:text-sm rounded-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out"
                                            >
                                                Lista
                                            </div>
                                        </div>

                                        {/* Botão Informações */}
                                        <div className="relative group">
                                            <div
                                                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#33373E] rounded-full hover:bg-white transition-all duration-300 ease-in-out cursor-pointer"
                                            >
                                                <img
                                                    className="w-[50%] sm:w-8 group-hover:invert"
                                                    src={assets.info_icon}
                                                    alt="Detalhes"
                                                />
                                            </div>
                                            <div
                                                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-1 px-3 bg-white text-black text-xs sm:text-sm rounded-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out"
                                            >
                                                Detalhes
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-white gap-2 items-center pt-5 hidden md:flex relative">
                                    <img className="w-5 h-5" src={assets.verified_icon} alt="" />
                                    <p>Incluído no Prime</p>
                                </div>
                            </div>

                            {/* Botões de navegação customizados */}
                            <button className="custom-prev transition-all duration-300 ease-in-out hover:scale-110 scale-90 cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white rotate-90">
                                <img className="w-8" src={assets.arrow_white_icon} alt="" />
                            </button>
                            <button className="custom-next transition-all duration-300 ease-in-out hover:scale-110 scale-90 cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white -rotate-90">
                                <img className="w-8" src={assets.arrow_white_icon} alt="" />
                            </button>

                            {/* Icone de idade */}
                            <div className="absolute right-6 bottom-4">
                                <img className="w-8" src={assets.age_icon} alt="" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>




            <div className="relative">
                {/* Carrossel "Séries em Destaque" */}
                <div className="w-full p-6 bg-black relative">
                    <h2 className="text-white text-2xl mb-4">Séries em Destaque</h2>

                    {/* Botão de Navegação para o carrossel de "Séries em Destaque" */}
                    <button
                        className="peer custom-prev-second text-white absolute left-6 top-[155px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 easy-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20"
                    >
                        <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <button
                        className="custom-next-second text-white absolute right-6 top-[155px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 easy-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-30"
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
                        {seriesData.map((serie, index) => (
                            <SwiperSlide key={serie.id}>
                                <SerieItem
                                    id={serie.id}
                                    name={serie.name}
                                    description={serie.description}
                                    background={serie.background}

                                    logo={serie.logo}

                                    index={serie.index}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>



                {/* Carrossel "Original Prime" */}
                <div className="w-full p-6 bg-black absolute top-60 pb-[450px]">
                    <h2 className="text-white text-2xl mb-4">Original Prime</h2>

                    <div className="relative">
                        {/* Botão de Navegação para o carrossel de "Original Prime" */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }} // Impede propagação do evento
                            className="peer text-white absolute z-20 top-[50%] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 easy-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20"
                        >
                            <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                        </button>

                        {/* Contêiner do Carrossel */}
                        <div ref={carouselRef} className="flex gap-4 scroll-smooth overflow-hidden">
                            {originalsPrimeData.map((item, index) => (
                                <OriginalsItem
                                    key={index}
                                    id={item.id}
                                    name={item.name}
                                    description={item.description}
                                    img1={item.img1}
                                    img2={item.img2}
                                    logo={item.logo}
                                    index={index}
                                />
                            ))}
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(); }} // Impede propagação do evento
                            className="text-white absolute z-20 top-[50%] right-0 hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 easy-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-30"
                        >
                            <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                        </button>
                    </div>

                </div>
            </div>


        </div>

    );
};

export default DisplayHome;
