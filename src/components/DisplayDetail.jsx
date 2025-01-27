import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { assets } from '../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';
import DisplayDetailContent from './DisplayDetailContent';
import api from '../api';
import axios from 'axios';

const DisplayDetail = () => {
    const { id } = useParams();
    const { type } = useParams();
    const [movie, setMovie] = useState(null); // Inicializa o estado do filme
    const [tvshow, setTvshow] = useState(null); // Inicializa o estado da série de TV
    const [activeContent, setActiveContent] = useState(type == 'tvshow' ? 'a' : 'b');
    const [isFixed, setIsFixed] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState(0); // Colocado aqui, para evitar hook condicional
    const [episodes, setEpisodes] = useState([]); // Estado para armazenar os episódios

    const containerDetailRef = useRef(null);
    const navigate = useNavigate();


   

    useEffect(() => {
        const handleScroll = () => {
            if (containerDetailRef.current) {
                const containerTop = containerDetailRef.current.getBoundingClientRect().top;
                setIsFixed(containerTop <= window.innerHeight * 0.08);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleContentToggle = (content) => {
        setActiveContent((prevContent) => (prevContent === content ? null : content));
    };

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (type === 'movie') {
                    response = await api.get(`/movie/${id}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    if (response.data) {
                        setMovie(response.data);
                    } else {
                        console.error('Filme não encontrado');
                    }
                } else if (type === 'tvshow') {
                    response = await api.get(`/tv/${id}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    if (response.data) {
                        setTvshow(response.data);
                    } else {
                        console.error('Série não encontrada');
                    }
                }
            } catch (error) {
                console.error(`Erro ao buscar os detalhes: ${error}`);
            }
        };

        fetchData();
    }, [id, type]);

    
    useEffect(() => {
        // Define a temporada inicial ao carregar os dados da série
        if (tvshow?.seasons?.length > 0) {
            setSelectedSeason(tvshow.seasons[0]);
        }
    }, [tvshow]);

    useEffect(() => {
        // Fetch episódios quando a temporada for alterada
        const fetchEpisodes = async () => {
            if (selectedSeason && tvshow?.id) {
                try {
                    const response = await api.get(`/tv/${tvshow.id}/season/${selectedSeason.season_number}`, {
                        params: {
                            api_key: import.meta.env.VITE_TMDB_API_KEY,
                            language: 'pt-BR',
                        },
                    });
                    if (response.data?.episodes) {
                        setEpisodes(response.data.episodes);
                    } else {
                        console.error('Episódios não encontrados');
                    }
                } catch (error) {
                    console.error(`Erro ao buscar episódios: ${error}`);
                }
            }
        };
        fetchEpisodes();
    }, [selectedSeason, tvshow]);

    const handleSeasonChange = (event) => {
        const seasonNumber = parseInt(event.target.value, 10);
        const season = tvshow?.seasons?.find((s) => s.season_number === seasonNumber);
        if (season) {
            setSelectedSeason(season);
        } else {
            console.warn('Temporada não encontrada:', seasonNumber);
        }
    };

    // Verifica se o filme ou a série de TV foi carregado
    if (type === 'movie' && !movie) {
        return <div>Carregando filme...</div>;
    }

    if (type === 'tvshow' && !tvshow) {
        return <div>Carregando série de TV...</div>;
    }

console.log(movie)
    return (
        <div className="w-full h-screen">
            <div className="w-full h-[90%] lg:h-[95%] xl:h-[80%] lg:translate-y-[13%] translate-y-[9%] transform flex flex-col inner-custom"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${type == 'tvshow' ? tvshow.backdrop_path : movie.backdrop_path})`,  // Aumente o valor de w1280 para o tamanho desejado
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed', // Se desejar efeito parallax
                    boxShadow: `
                    inset 300px 0px 600px 40px rgba(0, 0, 0, 0.9),
                    inset 0px -150px 320px 10px rgba(0, 0, 0, 0.6)
                `,
                }}

            >
                <div className='flex flex-col p-10 pt-8 text-white'>
                    <div className='w-16'>
                        <img src={assets.logo_prime_blue} alt="" />
                    </div>

                    <div className={`mt-6 flex flex-col ${type == 'tvshow' ? 'gap-3' : 'gap-5'}`}>
                        <h1 className="text-5xl font-bold tracking-wide">{type == 'tvshow' ? tvshow.name : movie.title}</h1>
                        <div>
                            {tvshow ? (
                                tvshow.seasons?.length > 0 ? (
                                    <select
                                        className="overflow-y-hidden cursor-pointer bg-[#33373E] p-3 text-xl border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800"
                                        name="seasons"
                                        id="seasons"
                                        onChange={handleSeasonChange}
                                    >
                                        {tvshow.seasons.map((season) => (
                                            <option
                                                key={season.id}
                                                className="bg-[#33373E] p-3 text-xl text-white border-0 rounded-lg hover:text-black hover:bg-white transition-all duration-800"
                                                value={season.season_number}
                                            >
                                                Temporada {season.season_number}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <div>Esta série não tem temporadas  poníveis.</div>
                                )
                            ) : (
                                <div></div>
                            )}
                        </div>




                        <p className={`w-[45%] text-[1.2rem] line-clamp-3`}>
  {type === 'tvshow' ? tvshow.overview || 'Descrição padrão para séries.' : movie.overview || 'Descrição padrão para filmes.'}
</p>


                        <div className="flex gap-3 items-center">
                            <p className="text-[#8C8C8D] font-bold">IMDb {type == 'tvshow' ? selectedSeason.vote_average : movie.vote_average?.toFixed(1)} </p>
                            <p className="text-[#8C8C8D] font-bold">
                                {type == 'tvshow' ?

                                    selectedSeason.air_date ? new Date(selectedSeason.air_date).getFullYear() : ''

                                    :
                                    movie.release_date ? new Date(movie.release_date).getFullYear() : ''


                                }
                            </p>
                            <p className="text-[#8C8C8D] font-bold">{type == 'tvshow' ? `${selectedSeason.episode_count} episódios` : `${movie.runtime} minutos`}  </p>
                            <div className="bg-[#33373E] p-1 px-2 rounded text-sm font-bold">
                                <p>X-RAY</p>
                            </div>
                            <img className="w-7" src={assets.age_icon} alt="" />
                        </div>

                        <div className="flex gap-3 items-center">

                            {type === 'tvshow' && tvshow.genres && tvshow.genres.map((genre) => (
                                <div className="flex gap-3 items-center">

                                    <p key={genre.id} className="underline font-semibold">
                                        {genre.name}
                                    </p>
                                    •
                                </div>

                            ))}

                            {type === 'movie' && movie.genres && movie.genres.map((genre) => (
                                <div className="flex gap-3 items-center">

                                    <p key={genre.id} className="underline font-semibold flex">
                                        {genre.name}

                                    </p>
                                    •
                                </div>


                            ))}
                        </div>


                    </div>

                    <div className={`max-w-[60%] flex gap-4  flex-wrap ${type == 'tvshow' ? 'mt-[1%]' : 'mt-[3%]'} `}>
                        {/* Botões grandes */}
                        <div className="max-w-[60%] flex gap-2">
                            <div onClick={() =>
                                navigate(
                                    `/player/${type}/${type === 'tvshow' ? tvshow.id : movie.id}${type === 'tvshow' ? `?season=1&episode=1` : ''
                                    }`
                                )
                            }
                                className="bg-smooth lg:text-lg text-md font-[600] flex gap-3 bg-[#33373E] p-4 px-5 rounded-lg items-center bg-opacity-80 tracking-wider cursor-pointer group hover:text-black hover:bg-white">
                                <img className="group-hover:invert h-4 lg:h-6" src={assets.play_icon} alt="" />
                                <p className="truncate ">
                                    <h5 className=''>{type == 'tvshow' ? 'Reproduzir episódio 1 ' : 'Reproduzir'} </h5>
                                    <h5 className=''>{type == 'tvshow' ? ' da 1ª temporada' : ''} </h5>
                                </p>
                            </div>
                            <div className="bg-smooth text:text-lg text-md font-[600] flex gap-3 bg-[#33373E] p-3 px-6 rounded-lg items-center bg-opacity-80 tracking-wider hover:text-black cursor-pointer hover:bg-white">
                                <p>
                                    <h5>Mais opções de</h5>
                                    <h5>Compra/aluguel</h5>
                                </p>
                            </div>
                        </div>
                        {/* Botões pequenos */}
                        <div className="flex gap-3 items-center">
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.add_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-700 group-hover:scale-100">Lista</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.like_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-700 group-hover:scale-100">Curtir</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert -rotate-180" src={assets.like_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-700 group-hover:scale-100 truncate">Não tenho interesse</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.download_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-700 group-hover:scale-100">Download</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.share_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all easy-in-out duration-700 group-hover:scale-100">Compartilhar</h6>
                            </div>

                        </div>
                        <div id="a" className="mt-3 flex gap-2">
                            <img className="h-[5%]" src={assets.verified_icon} alt="" />
                            <p>Incluído no Prime</p>
                        </div>


                    </div>



                </div>

                <div ref={containerDetailRef} className={` text-white flex bg-black flex-col w-full absolute top-[95%]`}>
                    <div className={`flex gap-6 ${type == 'tvshow' ? 'px-12  ' : 'px-6 '}  items-center ${isFixed ? 'fixed top-[8%] bg-[#363A40] bg-opacity-80 backdrop-blur-lg w-[99%] mx-2 rounded-lg z-10 py-5' : 'pt-8 pb-2'}`}>
                        {[type == 'tvshow' ? 'Episódios' : '', 'Relacionados', 'Detalhes'].map((label, index) => {
                            const contentKey = String.fromCharCode(97 + index);
                            return (
                                <a
                                    key={contentKey}
                                    onClick={() => handleContentToggle(contentKey)}
                                    className={`cursor-pointer flex flex-col items-center text-lg font-medium ${activeContent === contentKey ? '' : 'brightness-50'}`}
                                >
                                    {label}
                                    <hr className={`w-full border-white border-2 mt-2 transition-all duration-500 ${activeContent === contentKey ? 'opacity' : 'opacity-0'}`} />
                                </a>
                            );
                        })}
                    </div>
                    <DisplayDetailContent activeContent={activeContent} seasonNumber={selectedSeason?.season_number} selectedSeason={selectedSeason} episodes={episodes} />

                </div>

            </div>


        </div >
    );
};

export default DisplayDetail;
