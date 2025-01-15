import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { assets, seriesData } from '../assets/assets';
import { useParams } from 'react-router-dom';
const DisplayDetail = () => {

    const { id } = useParams();
    const data = seriesData ? seriesData[id - 1] : null;
    console.log(data)





    return (
        <div className="w-full h-screen  ">
            <div className='w-full h-[90%] lg:h-[95%] xl:h-[80%] translate-y-[13%] transform flex flex-col  inner-custom  '
                style={{
                    backgroundImage: `url(${data.background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    boxShadow: `
                                inset 300px 0px 600px 40px rgba(0, 0, 0, 0.9), 
                               
                                inset 0px -150px 320px 10px rgba(0, 0, 0, 0.6)
                              `,
                }}
            >

                <div className='flex flex-col p-10 pt-8 text-white  '>
                    <div className='w-16'>
                        <img src={assets.logo_prime_blue} alt="" />
                    </div>

                    <div className='mt-6 flex flex-col gap-4'>
                        <h1 className="text-5xl font-bold tracking-wide	">{data.name}</h1>
                        <h4 className="text-[#37F1A3] text-md font-bold tracking-wide mt-2">1 indicações ao PRIMETIME EMMYS® em 2008</h4>
                        <div>
                            <select className=' cursor-pointer bg-[#33373E] p-3 text-xl border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800 easy-in-out' name="" id="">
                                <option className='bg-[#33373E] p-3 text-xl text-white border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800 easy-in-out' value="1">Temporada 1</option>
                                <option className='bg-[#33373E] p-3 text-xl text-white border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800 easy-in-out' value="2">Temporada 2</option>
                                <option className='bg-[#33373E] p-3 text-xl text-white border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800 easy-in-out' value="3">Temporada 3</option>
                            </select>
                        </div>

                        <p className='w-[45%] text-[1.2rem] line-clamp-3	'>{data.description}</p>

                        <div className='flex gap-3 items-center'>
                            <p className='text-[#8C8C8D] font-bold'>IMDb 8,4</p>
                            <p className='text-[#8C8C8D] font-bold'>2005</p>
                            <p className='text-[#8C8C8D] font-bold'>23 episódios</p>
                            <div className='bg-[#33373E] p-1 px-2 rounded text-sm font-bold'>
                                <p>X-RAY</p>
                            </div>
                            <img className='w-7' src={assets.age_icon} alt="" />

                        </div>

                        <div className='flex gap-3 items-center'>
                            <p className="underline font-semibold">Aventura</p>•
                            <p className="underline font-semibold">Suspense</p>•
                            <p className="underline font-semibold">Drama</p>•

                            <p className="underline font-semibold">Fantasia</p>

                        </div>
                    </div>

                    <div className='max-w-[60%] flex gap-4 mt-5 flex-wrap'>
                        {/**Botões grandes */}
                        <div className='max-w-[60%] flex gap-2  '>

                            <div className=' bg-smooth   lg:text-lg text-md font-[600] flex gap-3 bg-[#33373E] p-2 px-3 rounded-lg items-center bg-opacity-80 tracking-wider cursor-pointer group hover:text-black hover:bg-white'>
                                <img className=' group-hover:invert h-4 lg:h-6' src={assets.play_icon} alt="" />
                                <p className='truncate'>
                                    <h5>Episódio 1</h5>
                                    <h5>Continuar assistindo</h5>
                                </p>
                            </div>
                            <div className='bg-smooth    text:text-lg text-md font-[600] flex gap-3 bg-[#33373E] p-3 px-6 rounded-lg items-center bg-opacity-80 tracking-wider hover:text-black cursor-pointer  hover:bg-white'>
                                <p>
                                    <h5>Mais opções de</h5>
                                    <h5>Compra/aluguel</h5>
                                </p>
                            </div>
                        </div>
                        {/**Botões pequenos*/}

                        <div className='flex gap-3  items-center'>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full  scale-smooth hover:bg-white  p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.add_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-7 00 group-hover:scale-100">Lista</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full  scale-smooth hover:bg-white  p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.like_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-7 00 group-hover:scale-100">Curtir</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full  scale-smooth hover:bg-white  p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert rotate-180" src={assets.like_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-7 00 group-hover:scale-100 truncate">Não tenho interesse</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full  scale-smooth hover:bg-white  p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.download_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-7 00 group-hover:scale-100 truncate">Baixar ep 2</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full  scale-smooth hover:bg-white  p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.share_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-7 00 group-hover:scale-100">Compartilhar</h6>
                            </div>



                        </div>
                        <div className='mt-3 flex gap-2 	'>
                            <img className='h-[5%]' src={assets.verified_icon} alt="" />
                            <p>Incluído no Prime</p>
                        </div>

                    </div>





                </div>



            </div>



            <div className='text-white flex bg-black  top-[90%] absolute w-full'>dasddsadasdasdsadgsadhasdsahdhasdhas
<img src={assets.add_icon} alt="" />
            </div>



        </div>

    );
};

export default DisplayDetail;
