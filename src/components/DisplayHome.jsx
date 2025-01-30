
import { useHomeJs } from '../utils/Home';
import { useUtils } from '../utils/utils';

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const DisplayHome = () => {

    const {
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
    } = useHomeJs();

    const {
        navigate,
        assets,
        Swiper, SwiperSlide, Navigation, Pagination, Autoplay,
        CarrousselItem, OriginalsItem,
        refreshPage,

    } = useUtils();

    return (
        <div className="w-full h-screen bg-black mb-[900px] absolute ">
            <Swiper ref={swiperRef}

                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={50}
                slidesPerView={1}

                effect="fade"
                fadeEffect={{ crossFade: true }} // Suaviza a troca

                speed={1000}
                pagination={{
                    clickable: true,
                    type: 'bullets',
                    renderBullet: (index, className) => {
                        const isActive = className.includes('swiper-pagination-bullet-active');
                        return (
                            `<span class="${className} w-4 h-4 rounded-full bg-white mx-2 hover:bg-white transition-all duration-300 ease-in-out ${isActive ? 'bg-white' : 'bg-transparent'}"></span>`
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
                updateOnWindowResize={true}
            >
                {favoriteTV.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className={`w-full h-full flex flex-col justify-end inner-custom relative  
                    ${showTeaser ? 'inner-custom2' : ''}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${slide.backdrop_path})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
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
                                    <source src={assets.teaserDefault} type="video/mp4" />
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

                            <div className="p-14 w-[45%] flex flex-col gap-2">
                                <div className="flex flex-col gap-3 group transition-all duration-1000 ease-in-out transform scale-95 hover:scale-100">
                                    <img className="w-16 transition-all duration-1000 ease-in-out" src={assets.logo_prime_blue} alt="" />
                                    <img className="w-32 transition-all duration-1000 ease-in-out" src={`https://image.tmdb.org/t/p/original${slide.poster_path}`} alt="" />

                                    <h1 className='text-white text-xl font-semibold tracking-wider'>{slide.name}</h1>

                                    <p className="text-white opacity-0 group-hover:opacity-100 md:group-hover:flex transition-opacity hidden
                                duration-1000 ease-in-out line-clamp-2 h-1 group-hover:h-12 transform scale-90 group-hover:scale-100">
                                        {slide.overview}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                                    <div onClick={() => {
                                        navigate(`/player/${slide.media_type == 'tv' ? 'movie' : 'tvshow'}/${slide.id}`);
                                        refreshPage();
                                    }} className="cursor-pointer relative w-full group sm:w-auto">
                                        <div

                                            className="flex items-center sm:gap-3 w-full sm:w-auto px-1 sm:pl-6 sm:pr-12  justify-center sm:justify-start 
                                            py-3 bg-[#33373E] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                                        >
                                            <img
                                                className="w-[40%]  sm:w-8 w-[25%] group-hover:invert md:relative sm:"
                                                src={assets.play_icon}
                                                alt="Play Icon"
                                            />
                                            <p>
                                                <span className="truncate sm:block hidden truncate">Episódio 1</span>
                                                <span className="truncate sm:block hidden truncate">Assista agora</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="relative group">
                                            <div
                                                className="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#33373E]
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
                                                className="absolute top-16 left-1/2 transform -translate-x-1/2 mt-2 p-1 px-3 bg-white text-black text-xs sm:text-sm rounded-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out"
                                            >
                                                Lista
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <div
                                                className="flex items-center justify-center w-12 h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-[#33373E] rounded-full hover:bg-white transition-all duration-300 ease-in-out cursor-pointer"
                                            >
                                                <img
                                                    className="w-[50%] sm:w-8 group-hover:invert"
                                                    src={assets.info_icon}
                                                    alt="Detalhes"
                                                />
                                            </div>
                                            <div
                                                className="absolute top-16 left-1/2 transform -translate-x-1/2 mt-2 p-1 px-3 bg-white text-black text-xs sm:text-sm rounded-lg opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out"
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

                            <button onClick={goToPrevSlide} className="custom-prev transition-all duration-300 ease-in-out hover:scale-110 scale-90 cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white rotate-90">
                                <img className="w-8" src={assets.arrow_white_icon} alt="" />
                            </button>
                            <button onClick={goToNextSlide} className="custom-next transition-all duration-300 ease-in-out hover:scale-110 scale-90 cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white -rotate-90">
                                <img className="w-8" src={assets.arrow_white_icon} alt="" />
                            </button>

                            <div className="absolute right-6 bottom-4">
                                <img className="w-8" src={assets.age_icon} alt="" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>



            <div className="relative ">
                <div className="w-full p-6 bg-black absolute top-0     ">
                    <h2 className="text-white text-2xl mb-4">Top Rated</h2>

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



                <div className="w-full p-6 bg-black absolute top-60 pb-[450px]">
                    <h2 className="text-white text-2xl mb-4">Filmes da Galera</h2>

                    <div className="relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            className="peer text-white absolute z-20 top-[50%] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20"
                        >
                            <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                        </button>

                        <div ref={carouselRef} className="flex gap-4 scroll-smooth overflow-hidden">
                            {movies.popular.map((item, index) => (
                                <OriginalsItem
                                    key={index}
                                    id={item.id}
                                    name={item.title}
                                    description={item.overview}
                                    img1={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                                    type='movie'
                                    img2={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                                    logo={
                                        item.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                            : ''
                                    }
                                    index={index}
                                />
                            ))}
                        </div>

                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            className="text-white absolute z-20 top-[50%] right-0 hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-30"
                        >
                            <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                        </button>
                    </div>

                </div>


            </div>





            <div className='mt-[125%] md:mt-[80%] lg:mt-[50%] relative  w-full'>


                <div className="w-full p-6 bg-black    relative   transition-all duration-300">
                    <h2 className="text-white text-2xl mb-4">Séries em Destaque</h2>

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
                        {tvshows.topRated.map((tvshow) => (
                            <SwiperSlide key={tvshow.id}>
                                <CarrousselItem
                                    id={tvshow.id}
                                    name={tvshow.title}
                                    description={tvshow.overview}
                                    background={`https://image.tmdb.org/t/p/original${tvshow.backdrop_path}`}
                                    type="tvshow"
                                    logo={
                                        tvshow.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${tvshow.poster_path}`
                                            : ''
                                    }
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="w-full p-6 bg-black  relative">
                    <h2 className="text-white text-2xl mb-4">Passando Agora</h2>

                    <button className="peer custom-prev-second4 text-white absolute left-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-10">
                        <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>
                    <button className="custom-next-second4 text-white absolute right-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-10">
                        <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.custom-next-second4',
                            prevEl: '.custom-prev-second4',
                        }}
                        spaceBetween={300}
                        slidesPerView={5}
                        className="w-full flex gap-4"
                    >
                        {movies.nowPlaying.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <CarrousselItem
                                    id={movie.id}
                                    name={movie.title}
                                    type="movie"
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


                <div className="w-full p-6 bg-black    relative   transition-all duration-300">
                    <h2 className="text-white text-2xl mb-4">Séries no Ar</h2>

                    <button className="peer custom-prev-second5 text-white absolute left-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20">
                        <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>
                    <button className="custom-next-second5 text-white absolute right-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-20">
                        <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.custom-next-second5',
                            prevEl: '.custom-prev-second5',
                        }}
                        spaceBetween={300}
                        slidesPerView={5}
                        className="w-full flex gap-4"
                    >
                        {tvshows.onTheAir
                            .sort((a, b) => {
                                return b.id - a.id;
                            })
                            .map((tvshow) => (
                                <SwiperSlide key={tvshow.id}>
                                    <CarrousselItem
                                        id={tvshow.id}
                                        name={tvshow.title}
                                        description={tvshow.overview}
                                        background={`https://image.tmdb.org/t/p/original${tvshow.backdrop_path}`}
                                        type="tvshow"
                                        logo={
                                            tvshow.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${tvshow.poster_path}`
                                                : ''
                                        }
                                    />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>




                <div className="w-full p-6 bg-black  relative">
                    <h2 className="text-white text-2xl mb-4">Em breve</h2>

                    <button className="peer custom-prev-second4 text-white absolute left-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-10">
                        <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>
                    <button className="custom-next-second4 text-white absolute right-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-10">
                        <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.custom-next-second4',
                            prevEl: '.custom-prev-second4',
                        }}
                        spaceBetween={300}
                        slidesPerView={5}
                        className="w-full flex gap-4"
                    >
                        {movies.upcoming.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <CarrousselItem
                                    id={movie.id}
                                    name={movie.title}
                                    type="movie"
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


                <div className="w-full p-6 bg-black    relative   transition-all duration-300">
                    <h2 className="text-white text-2xl mb-4">No ar hoje</h2>

                    <button className="peer custom-prev-second6 text-white absolute left-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20">
                        <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>
                    <button className="custom-next-second6 text-white absolute right-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-20">
                        <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.custom-next-second6',
                            prevEl: '.custom-prev-second6',
                        }}
                        spaceBetween={300}
                        slidesPerView={5}
                        className="w-full flex gap-4"
                    >
                        {tvshows.airingToday.map((tvshow) => (
                            <SwiperSlide key={tvshow.id}>
                                <CarrousselItem
                                    id={tvshow.id}
                                    name={tvshow.title}
                                    description={tvshow.overview}
                                    background={`https://image.tmdb.org/t/p/original${tvshow.backdrop_path}`}
                                    type="tvshow"
                                    logo={
                                        tvshow.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${tvshow.poster_path}`
                                            : ''
                                    }
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>



                <div className="w-full p-6 bg-black    relative   transition-all duration-300">
                    <h2 className="text-white text-2xl mb-4">Séries Populares</h2>

                    <button className="peer custom-prev-second7 text-white absolute left-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 rounded transform -translate-y-1/2 z-20">
                        <img className="w-4 rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>
                    <button className="custom-next-second7 text-white absolute right-6 top-[148px] hover:bg-[#33373E] hover:bg-opacity-50 transform scale-90 transition-all duration-300 ease-in-out hover:scale-110 p-1 py-16 transform -translate-y-1/2 z-20">
                        <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: '.custom-next-second7',
                            prevEl: '.custom-prev-second7',
                        }}
                        spaceBetween={300}
                        slidesPerView={5}
                        className="w-full flex gap-40   "
                    >
                        {tvshows.popular.map((tvshow) => (
                            <SwiperSlide key={tvshow.id}>
                                <CarrousselItem
                                    id={tvshow.id}
                                    name={tvshow.title}
                                    description={tvshow.overview}
                                    background={`https://image.tmdb.org/t/p/original${tvshow.backdrop_path}`}
                                    type="tvshow"
                                    logo={
                                        tvshow.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${tvshow.poster_path}`
                                            : ''
                                    }
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
            <div className='h-[2000px]  bg-black'>ss</div>





        </div>

    );
};

export default DisplayHome;
