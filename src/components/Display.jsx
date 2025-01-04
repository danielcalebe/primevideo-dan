import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { assets, slidesData } from '../assets/assets';

const Display = () => {


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
                }} autoplay={{ delay: 10000 }}
                className="w-full h-[80%]"
            >
                {slidesData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="w-full h-full flex flex-col justify-end inner-custom"
                            style={{
                                backgroundImage: `url(${slide.background})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >

                            <div className='p-14 w-[40%] flex flex-col gap-2'>
                                <div className='flex flex-col gap-3 group transition-all duration-500 ease-in-out'>
                                    <img className='w-16 transition-all duration-500 ease-in-out' src={assets.logo_prime_blue} alt="" />
                                    <img className='w-64 transition-all duration-500 ease-in-out' src={slide.letter} alt="" />

                                    {/* Descrição com animação e limitação de linhas */}
                                    <p className="text-white opacity-0 group-hover:opacity-100 group-hover:flex transition-opacity duration-500 ease-in-out line-clamp-2 h-1 group-hover:h-12">
                                        {slide.description}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-8">
                                    {/* Primeira div com o botão "Assista agora" */}
                                    <div className="cursor-pointer group hover:bg-white bg-[#33373E] rounded-lg 
                                   p-4 flex items-center gap-4 transition-all duration-300 ease-in-out justify-center sm:w-auto">
                                        <img className="lg:w-8 w-10 group-hover:invert" src={assets.play_icon} alt="Play Icon" />
                                        <h3 className="text-white font-semibold text-lg hidden md:block group-hover:text-black">
                                            Assista agora
                                        </h3>
                                    </div>

                                    {/* Segunda div com os botões de adicionar e informações */}
                                    <div className="flex gap-2 items-center w-full sm:w-auto">
                                        <div className="cursor-pointer bg-[#33373E] w-12 h-12 sm:w-14 sm:h-14 rounded-full p-2 flex items-center justify-center group hover:bg-white transition-all duration-300 ease-in-out">
                                            <img className="w-[75%] group-hover:invert" src={assets.add_icon} alt="" />
                                        </div>
                                        <div className="cursor-pointer bg-[#33373E] w-12 h-12 sm:w-14 sm:h-14 rounded-full p-2 flex items-center justify-center group hover:bg-white transition-all duration-300 ease-in-out">
                                            <img className="w-[75%] group-hover:invert" src={assets.info_icon} alt="" />
                                        </div>
                                    </div>
                                </div>


                                <div className=' text-white gap-2 items-center pt-5 hidden md:flex'>
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
        </div>
    );
};

export default Display;
