import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import DisplayDetailContent from './DisplayDetailContent';
import { useDetailsJs } from '../utils/Details';
import { useUtils } from '../utils/utils';

const DisplayDetail = () => {
    const {
        assets,
        navigate
    } = useUtils();
    const {
        movie,
        tvshow,
        activeContent,
        setActiveContent,
        isFixed,
        selectedSeason,
        episodes,
        handleSeasonChange,
        handleContentToggle,
        containerDetailRef,
        type
    } = useDetailsJs(); 

    if (!movie && !tvshow) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="w-full h-screen">
            <div className="w-full h-[90%] lg:h-[95%] xl:h-[80%] lg:translate-y-[13%] translate-y-[9%] transform flex flex-col inner-custom"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${type == 'tvshow' ? tvshow.backdrop_path : movie.backdrop_path})`,  // Aumente o valor de w1280 para o tamanho desejado
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
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

                                    <p onClick={() => navigate(`/search?query=${genre.name}`)} key={genre.id} className=" cursor-pointer underline font-semibold">
                                        {genre.name}
                                    </p>
                                    •
                                </div>

                            ))}

                            {type === 'movie' && movie.genres && movie.genres.map((genre) => (
                                <div className="flex gap-3 items-center">

                                    <p onClick={() => navigate(`/search?query=${genre.name}`)} key={genre.id} className=" cursor-pointer underline font-semibold flex">
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
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all ease-in-out duration-700 group-hover:scale-100">Lista</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.like_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all ease-in-out duration-700 group-hover:scale-100">Curtir</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert -rotate-180" src={assets.like_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all ease-in-out duration-700 group-hover:scale-100 truncate">Não tenho interesse</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.download_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all ease-in-out duration-700 group-hover:scale-100">Download</h6>
                            </div>
                            <div className="group bg-[#33373E] bg-opacity-70 rounded-full scale-smooth hover:bg-white p-2 h-16 w-16 flex items-center justify-center cursor-pointer scale-smooth">
                                <img className="w-[80%] group-hover:invert" src={assets.share_icon} alt="" />
                                <h6 className="bg-white text-black text-lg rounded-lg text-center p-1 px-3 absolute -top-12 transform scale-0 transition-all ease-in-out duration-700 group-hover:scale-100">Compartilhar</h6>
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
