// DisplayDetailContent.jsx
import React from 'react';
import { assets, seriesData } from '../assets/assets';
import { useParams } from 'react-router-dom';
import SerieItem from './SerieItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
const DisplayDetailContent = ({ activeContent }) => {

    const { id } = useParams();
    const data = seriesData ? seriesData[id - 1] : null;


    const contents = {
        a: (
            <div className='px-8'>
                <div className='w-full flex justify-end '>
                    <select className=' cursor-pointer bg-[#33373E] p-3 text-xl border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800 easy-in-out' name="" id="">
                        <option className='bg-[#33373E] p-3 text-xl text-white border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800 easy-in-out' value="1">Classificar   </option>
                        <option className='bg-[#33373E] p-3 text-xl text-white border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800 easy-in-out' value="2">Número do episódio</option>
                        <option className='bg-[#33373E] p-3 text-xl text-white border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800 easy-in-out' value="3">Episódio mais recente</option>
                    </select>
                </div>
                <div className="flex flex-col mt-4 justify-center">
                    <div className='flex  items-center-center justify-between text-white group hover:bg-[#191E25] p-4 rounded-lg  '>
                        <div className='flex '>
                            <div className='p-3 w-[30%] lg:w-[28%] relative cursor-pointer   '>
                                <img className='hidden lg:block rounded-lg' src={data.background} alt="" />
                                <div className="lg:opacity-0 hover:scale-110 group-hover:opacity-100 transition-all duration-900 easy-in-out lg:absolute bg-white p-4
                                 rounded-full flex items-center justify-center lg:top-[30%] lg:left-[45%] w-14">
                                    <img className='invert brightness-75' src={assets.play_icon} alt="" />
                                </div>

                            </div>
                            <div className=' p-3 flex flex-col gap-3 w-[70%] lg:w-[35%] justify-center'>
                                <h4 className=" text-sm lg:text-lg font-semibold tracking-wider truncate ">T1 EP.1 - Title of the episode</h4>
                                <div className=' gap-3 lg:flex hidden'>
                                    <p className="text-md  "> 16 de janeiro de 2025 </p>
                                    <p>42 min</p>
                                    <img className='w-6 ' src={assets.age_icon} alt="" />
                                </div>

                                <div className='hidden lg:block'>
                                    <p className={`line-clamp-2 brightness-75 text-lg 	
`}>
                                        {data.description}
                                    </p>

                                </div>


                                <div className='  truncate gap-1 items-center lg:flex hidden '>
                                    <img className='w-5' src={assets.verified_icon} alt="" />
                                    <p className='truncate pt-[0.6px]'>Incluído no Prime</p>
                                </div>
                                <div className='truncate lg:block hidden p-2 rounded-lg bg-[#474B51] w-[50%] text-center py-4 text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 easy-in-out hover:bg-white hover:text-black cursor-pointer  '>
                                    <h5>Mais opções de compra</h5>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-3 w-[40%] h-[100%] items-center lg:self-auto	 self-center'>
                            <div className='hover:bg-gray-800 cursor-pointer p-3 rounded-full  h-12 flex items-center'>
                                <img className='w-8' src={assets.download_icon} alt="" />
                            </div>
                            <h3 className='lg:hidden cursor-pointer text-center truncate'>. . .</h3>



                        </div>

                    </div>


                    <div className='flex  items-center-center justify-between text-white group hover:bg-[#191E25] p-4 rounded-lg  '>
                        <div className='flex '>
                            <div className='p-3 w-[30%] lg:w-[28%] relative cursor-pointer   '>
                                <img className='hidden lg:block rounded-lg' src={data.background} alt="" />
                                <div className="lg:opacity-0 hover:scale-110 group-hover:opacity-100 transition-all duration-900 easy-in-out lg:absolute bg-white p-4
                                 rounded-full flex items-center justify-center lg:top-[30%] lg:left-[45%] w-14">
                                    <img className='invert brightness-75' src={assets.play_icon} alt="" />
                                </div>

                            </div>
                            <div className=' p-3 flex flex-col gap-3 w-[70%] lg:w-[35%] justify-center'>
                                <h4 className=" text-sm lg:text-lg font-semibold tracking-wider truncate ">T1 EP.1 - Title of the episode</h4>
                                <div className=' gap-3 lg:flex hidden'>
                                    <p className="text-md  "> 16 de janeiro de 2025 </p>
                                    <p>42 min</p>
                                    <img className='w-6 ' src={assets.age_icon} alt="" />
                                </div>

                                <div className='hidden lg:block'>
                                    <p className={`line-clamp-2 brightness-75 text-lg 	
`}>
                                        {data.description}
                                    </p>

                                </div>


                                <div className='  truncate gap-1 items-center lg:flex hidden '>
                                    <img className='w-5' src={assets.verified_icon} alt="" />
                                    <p className='truncate pt-[0.6px]'>Incluído no Prime</p>
                                </div>
                                <div className=' truncate lg:block hidden p-2 rounded-lg bg-[#474B51] w-[50%] text-center py-4 text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 easy-in-out hover:bg-white hover:text-black cursor-pointer  '>
                                    <h5>Mais opções de compra</h5>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-3 w-[40%] h-[100%] items-center lg:self-auto	 self-center'>
                            <div className='hover:bg-gray-800 cursor-pointer p-3 rounded-full  h-12 flex items-center'>
                                <img className='w-8' src={assets.download_icon} alt="" />
                            </div>
                            <h3 className='lg:hidden cursor-pointer text-center truncate'>. . .</h3>



                        </div>

                    </div>



                </div>


            </div>

        ),
        b: (
            <div className='p-2 mb-[30%]'>

                <div className="w-full p-6 bg-black relative ">
                    <h2 className="text-white text-xl mb-4">Os clientes também gostam:</h2>

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


            </div>
        ),
        c: (
            <div className='flex flex-col gap-10 px-4 mb-[30%] px-8'>
                <h6 className="text-semibold text-lg">Saiba mais</h6>
                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Classificação do Conteudo</h1>
                    <p className='text-[#AAAAAA] text-lg'>Drogas lícitas, violência</p>
                </div>
                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Idioma de áudio</h1>
                    <p className='text-[#AAAAAA] text-lg'>Português(Brasil), English</p>
                </div>

                <div className='flex gap-3 flex-col'>
                    <h1 className='text-3xl font-bold'>Legendas</h1>
                    <p className='text-[#AAAAAA] text-lg'>Português(Brasil), English</p>
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
                    <h1 className='text-3xl font-bold'>Estúdio</h1>
                    <p className='text-[#AAAAAA] text-lg'>Estúdio</p>
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
