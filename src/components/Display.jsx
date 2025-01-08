import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { assets, originalsPrimeData, seriesData } from '../assets/assets';
import SerieItem from './SerieItem';
import OriginalsItem from './OriginalsItem';

const Display = () => {

    const [hoverStartTime, setHoverStartTime] = useState(null);
    const [showTeaser, setshowTeaser] = useState(false);

    const handleMouseEnter = () => {
        const timeout = setTimeout(() => {
            setshowTeaser(true); // Mostra o conteúdo após 5 segundos
        }, 1000);

        setHoverStartTime({ time: performance.now(), timeout });
    };

    const handleMouseLeave = () => {
        if (hoverStartTime?.timeout) {
            clearTimeout(hoverStartTime.timeout); // Cancela o timeout se o mouse sair antes de 5 segundos
        }
        setHoverStartTime(null);
        setshowTeaser(false); // Oculta o conteúdo novamente
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



    return (
        <div className="w-full h-screen bg-black">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                spaceBetween={50}
                slidesPerView={1}

                pagination={{
                    clickable: true,
                }} autoplay={{ delay: 20000 }}
                className="w-full h-[80%]"
            >
                {seriesData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className={`w-full h-full flex flex-col justify-end inner-custom  relative
                                 ${showTeaser ? 'inner-custom2 ' : ''} `}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                backgroundImage: `url(${slide.background})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            {/* Conteúdo com transição */}
                            <div
                                className={` absolute  inset-0 flex items-center justify-center
                                     bg-black bg-opacity-75 text-white text-lg transition-opacity duration-500 ${showTeaser ? "block oapcity-100" : "hidden opacity-0"
                                    }`}
                            >

                                <video

                                    className=" top-2 a w-[100%] h-full a -right-[12%] absolute"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    <source className="a absolute " src={slide.teaser} type="video/mp4" />
                                    <div className="video-shadow-overlay"></div>

                                </video>

                            </div>



                            <div className={`p-14 w-[40%] flex flex-col gap-2 `}>
                                <div className='flex flex-col gap-3 group transition-all duration-500 ease-in-out  transform scale-95 hover:scale-100'>
                                    <img className='w-16 transition-all duration-500 ease-in-out' src={assets.logo_prime_blue} alt="" />
                                    <img className='w-64 transition-all duration-500 ease-in-out' src={slide.logo} alt="" />

                                    {/* Descrição com animação e limitação de linhas */}
                                    <p className="text-white opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity 
                                            duration-500 ease-in-out line-clamp-2 h-1 group-hover:h-12 transform scale-90 group-hover:scale-100">
                                        {slide.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                                    {/* Botão "Assista agora" */}
                                    <div className="relative w-full sm:w-auto">
                                        <button
                                            className="flex items-center gap-3 w-full sm:w-auto px-6 py-3 bg-[#33373E] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                                        >
                                            <img
                                                className="w-6 sm:w-8 group-hover:invert"
                                                src={assets.play_icon}
                                                alt="Play Icon"
                                            />
                                            <span>Assista agora</span>
                                        </button>
                                    </div>

                                    {/* Botões de adicionar e informações */}
                                    <div className="flex gap-4">
                                        {/* Botão Adicionar */}
                                        <div className="relative group">
                                            <div
                                                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#33373E] rounded-full hover:bg-white transition-all duration-300 ease-in-out cursor-pointer"
                                            >
                                                <img
                                                    className="w-6 sm:w-8 group-hover:invert"
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
                                                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#33373E] rounded-full hover:bg-white transition-all duration-300 ease-in-out cursor-pointer"
                                            >
                                                <img
                                                    className="w-6 sm:w-8 group-hover:invert"
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



                                <div className=' text-white gap-2 items-center pt-5 hidden md:flex relative' >
                                    <img className='w-5 h-5' src={assets.verified_icon} alt="" />
                                    <p>Incluído no Prime</p>
                                </div>
                            </div>


                            <button className="custom-prev transition-all duration-300 easy-in-out hover:scale-110  scale-90 cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white rotate-90">
                                <img className='w-8' src={assets.arrow_white_icon} alt="" />
                            </button>
                            <button className="custom-next transition-all duration-300 easy-in-out hover:scale-110  scale-90 cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white -rotate-90">
                                <img className='w-8' src={assets.arrow_white_icon} alt="" />
                            </button>

                            <div className='absolute right-6 bottom-4'>
                                <img className='w-8' src={assets.age_icon} alt="" />
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>



            <div className="w-full p-6 bg-black mt=10">
                <h2 className="text-white text-2xl mb-4 ">Séries em Destaque</h2>

                <Swiper
                    modules={[Navigation,]}
                    navigation={{
                        nextEl: '.custom-next-second',
                        prevEl: '.custom-prev-second',
                    }}
                    spaceBetween={20}
                    slidesPerView={5}
                    className="w-full"
                >
                    {seriesData.map((serie, index) => (
                        <SwiperSlide key={serie.id}>
                            <SerieItem
                                id={serie.id}
                                name={serie.name}
                                description={serie.description}
                                background={serie.background}
                                logo={serie.logo}
                                index={index}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="custom-prev-second text-white absolute left-4 -bottom-10 transform -translate-y-1/2 z-10">
                    <img className='w-10 rotate-90' src={assets.arrow_white_icon} alt="" />

                </button>
                <button className="custom-next-second text-white absolute right-4 -bottom-10    transform -translate-y-1/2 z-10">
                    <img className='w-10 -rotate-90' src={assets.arrow_white_icon} alt="" />

                </button>
            </div>






            <div className="w-full p-6 bg-black">
                <h2 className="text-white text-2xl mb-4">Séries em Destaque</h2>

                <div className="relative">
                    {/* Botão para navegar para trás */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75"
                    >
                        ❮
                    </button>

                    {/* Contêiner do Carrossel */}
                    <div
                        ref={carouselRef}
                        className="flex gap-4 overflow-x-scroll scroll-smooth no-scrollbar"
                    >
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

                    {/* Botão para navegar para frente */}
                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-75"
                    >
                        ❯
                    </button>
                </div>
                <div className='bg-black h-[500px]'></div>
            </div>            </div>

            );
};

            export default Display;
