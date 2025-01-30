import { useLocation } from 'react-router-dom';
import { assets } from '../assets/assets'
import { useNavbarJs } from '../utils/Navbar.js';

const Navbar = () => {
        const { pathname: path } = useLocation();
    
    const {

        pathname,
        isScrolled, setIsScrolled,
        navigate,
        isVisibleSearchBar, setIsVisibleSearchBar,
        toggleVisibilitySearchBar,
        handleSearch,
        query, setQuery,
        loading, setLoading,
        results, setResults,
        handleSearchChange,
        handleSearchSubmit,
    } = useNavbarJs();
    return (
        <div
            className={` fixed top-0  z-50 p-3 px-10 flex items-center justify-self-center		 justify-between transition-all duration-300 ease-in-out ${isScrolled ? 'bg-[#33373E] text-white shadow-md  w-[99%]   ml-1  lg:ml-2 bg-opacity-70 rounded-b-lg backdrop-blur-xl	' : 'bg-transparent text-black w-full left-0'
                }`}
        >


            <div className='text-white text-center font-[550] lg:flex items-center gap-3  hidden '>

                <div onClick={() => navigate('/')} className='min-w-28 w-28 mr-5 cursor-pointer'>
                    <img src={assets.logo_white} alt="" />
                </div>

                <div onClick={() => navigate(`/`)} className=' hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                    <h3 className='px-4 py-2'>Início</h3>
                </div>
                <div onClick={() => navigate(`/search?query=filmes`)} className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                    <h3 className='px-4 py-2'>Filmes</h3>
                </div>
                <div onClick={() => navigate(`/search?query=series`)} className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                    <h3 className='px-4 py-2'>Series</h3>
                </div>
                <div onClick={() => navigate(`/search?query=esportes`)} className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                    <h3 className='px-4 py-2'>Esportes</h3>
                </div>
                <div onClick={() => navigate(`/search?query=ao%20vivo`)} className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                    <h3 className='px-4 py-2 truncate'>TV ao vivo</h3>
                </div>
                <hr className='border-none bg-[#666B79] h-6 w-[2.5px]' />

                <div className='hover:shadow-[0px_4px_15px_0px_#0578FF] px-4 py-2  rounded-lg cursor-pointer hover:bg-[#0578FF] hover:text-black transition-all duration-150 ease-in-out flex gap-2 items-center'>
                    <img className='min-w-11 w-11 	' src={assets.logo_prime_white} alt="" />
                </div>

                <div className='group px-4 py-2 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out flex gap-2 items-center'>
                    <img className='w-[22px] h-[19px]	group-hover:invert' src={assets.subscriptions_icon} alt="" />
                    <h3 className=''>Assinaturas</h3>
                </div>

            </div>

            <div className='group font-[550] lg:hidden'>
                <div className='  px-4 py-2 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer group-hover:bg-white group-hover:text-black transition-all duration-150 ease-in-out flex 
                items-center justify-center gap-2'>
                    <h3 className='text-white group-hover:text-black'>Menu</h3>
                    <img className='w-3  group-hover:invert group-hover:rotate-180' src={assets.arrow_white_icon} alt="" />

                </div>

                <div className='hidden group-hover:flex absolute mt-2 bg-[#2D3239]   flex-col bg-opacity-60 backdrop-blur-md p-6 rounded text-white gap-2'>
                    <div className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                        <h3 className='px-4 py-2'>Início</h3>
                    </div>
                    <div className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                        <h3 className='px-4 py-2'>Filmes</h3>
                    </div>
                    <div className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                        <h3 className='px-4 py-2'>Series</h3>
                    </div>
                    <div className=' hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                        <h3 className='px-4 py-2'>Esportes</h3>
                    </div>
                    <div className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                        <h3 className='px-4 py-2'>TV ao vivo</h3>
                    </div>

                    <div className='group px-4 py-2 flex items-center gap-2 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 
                ease-in-out'>
                        <h3 >Categorias</h3>
                        <img className='w-3 h-2  hover:invert hover:rotate-180' src={assets.arrow_white_icon} alt="" />

                    </div>

                    <div className='group px-4 py-2 flex items-center gap-2 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 
                ease-in-out'>
                        <h3 >Minha área</h3>
                        <img className='w-3 h-2  hover:invert hover:rotate-180' src={assets.arrow_white_icon} alt="" />

                    </div>

                    <div className='hover:shadow-[0px_4px_15px_0px_#0578FF] px-4 py-2  rounded-lg cursor-pointer flex justify-center
             bg-[#0578FF] hover:text-black transition-all duration-150 ease-in-out flex gap-2 items-center'>
                        <img className='min-w-11 w-11 	' src={assets.logo_prime_white} alt="" />
                    </div>

                    <div className='group   px-4 py-2 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer bg-[#2D3239] hover:bg-white hover:text-black transition-all duration-150 ease-in-out flex gap-2 items-center'>
                        <img className='w-[22px] h-[19px]	hover:invert' src={assets.subscriptions_icon} alt="" />
                        <h3 className=''>Assinaturas</h3>
                    </div>

                </div>
            </div>

            <div className='min-w-28 w-28 mr-5 lg:hidden cursor-pointer'>
                <img onClick={() => navigate('/')} src={assets.logo_white} alt="" />
            </div>

            <div className='flex items-center'>
                <div onClick={toggleVisibilitySearchBar} className=' cursor-pointer group w-10 h-10 rounded-full hover:bg-white p-2 flex items-center justify-center'>
                    <img className='w-[80%] group-hover:invert' src={assets.search_icon} alt="" />
                </div>
                <div onClick={() => navigate(`/categories`)} className={`cursor-pointer group w-10 h-10 rounded-full hover:bg-white p-2 lg:flex items-center 
                 justify-center hidden ${path.includes('categories')
                        ? 'bg-gradient-to-b from-white via-[#44484e]  to-[#44484e]'

                        : ''}`}>
                    <img className={`w-[80%] ${path.includes('categories') ? '' : 'group-hover:invert'}`} src={assets.categories_icon} alt="" />
                    <div className='  absolute bg-[#181C23] text-white -ml-[35%] p-4 rounded-lg bg-opacity-80  
                    transition-all duration-300 ease-in-out top-[77.5%]  hidden     group-hover:flex transform translate-x-[200%]   group-hover:flex group-hover:translate-x-0'>
                        {/* Primeira lista de gêneros */}
                        <div className=''>
                            <p className='text-md  p-2 mb-2 brightness-50 tracking-wider'>GÊNEROS</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Ação e aventura</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Anime</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Comédia</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Documentário</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Drama</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Fantasia</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Terror</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Infantis</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Suspense e mistério</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Romance</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Ficção científica</h3>
                                </div>
                            </div>
                        </div>

                        {/* Segunda lista de gêneros */}
                        <div className="">
                            <p className='text-md p-2 mb-2 brightness-50 tracking-wider'>COLEÇÕES EM DESTAQUE</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">O Melhor de 2025</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Feito para você</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Ao vivo em breve</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Estreia em casa</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Aclamados pela crítica</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">LGBTQIAP+</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Vozes negras</h3>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

                <div onClick={() => navigate(`/mystuff`)} className={` ${path.includes('mystuff')
                    ? 'bg-gradient-to-b from-white via-[#44484e]  to-[#44484e]'

                    : ''} cursor-pointer group w-10 h-10 rounded-full hover:bg-white p-2 lg:flex items-center justify-center hidden`}>
                    <img className={`w-[80%] ${path.includes('mystuff') ? '' : 'group-hover:invert'}`} src={assets.mystuff_icon} alt="" />

                    <div className="absolute bg-[#181C23] -ml-5 text-white p-4 rounded-lg bg-opacity-80 transition-all duration-500 ease-in-out top-[77.5%] transform  translate-x-[300px] hidden  group-hover:block  group-hover:translate-x-0">
                        <p className='text-md  p-2 mb-2 brightness-50 tracking-wide	'>MINHA ÁREA</p>
                        <div className='flex flex-col gap-2'>
                            <div className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                                <h3 className='px-4 py-2'>Todos</h3>
                            </div>  <div className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                                <h3 className='px-4 py-2'>Sua lista</h3>
                            </div>  <div className='hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out'>
                                <h3 className='px-4 py-2'>Comprar ou alugar</h3>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='cursor-pointer group w-10 h-10 rounded-full hover:bg-white  flex items-center justify-center'>
                    <img onClick={() => navigate('/editprofile')} className='w-[100%] group-hover:' src={assets.profile_icon} alt="" />

                    <div className='absolute bg-[#181C23] -ml-[35%] lg:-ml-[25%] text-white p-4 rounded-lg 
                     bg-opacity-80 transition-all duration-500 ease-in-out top-[77.5%] transform 
                      translate-x-[200%] hidden  group-hover:flex  group-hover:translate-x-0'>
                        <div className=''>
                            <p className='text-md p-2 mb-2 brightness-50 tracking-wider'>SUA CONTA</p>

                            <div className="grid grid-cols-1 gap-2">
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Ajuda</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Assita onde quiser</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Conta e configurações</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Sair</h3>
                                </div>

                            </div>

                        </div>
                        <div className=''>
                            <p className='text-md 	 p-2 mb-2 brightness-50 tracking-wider'>PERFIS</p>

                            <div className="grid grid-cols-1 gap-2">
                                <div className=" px-4 py-1 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)]
                                 rounded-lg cursor-pointer flex gap-2 items-center hover:bg-white hover:text-black 
                                 transition-all  duration-150 ease-in-out">
                                    <img className='w-10' src={assets.profile_icon} alt="" />
                                    <h3 className="">danielcalebe</h3>
                                </div>
                                <div className=" px-4 py-1 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)]
                                 rounded-lg cursor-pointer flex gap-2 items-center hover:bg-white hover:text-black 
                                 transition-all  duration-150 ease-in-out">
                                    <img className='w-10' src={assets.profile_icon} alt="" />
                                    <h3 className="">danielcalebe</h3>
                                </div>
                                <div className=" px-4 py-1 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)]
                                 rounded-lg cursor-pointer flex gap-2 items-center hover:bg-white hover:text-black 
                                 transition-all  duration-150 ease-in-out">
                                    <img className='w-10' src={assets.profile_icon} alt="" />
                                    <h3 className="">danielcalebe</h3>
                                </div>
                                <div className=" px-4 py-1 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)]
                                 rounded-lg cursor-pointer flex gap-2 items-center hover:bg-white hover:text-black 
                                 transition-all  duration-150 ease-in-out">
                                    <img className='w-10' src={assets.profile_icon} alt="" />
                                    <h3 className="">danielcalebe</h3>
                                </div>
                                <div className="px-4 py-2 hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)]
                                    rounded-lg cursor-pointer flex gap-2 items-center hover:bg-white hover:text-black 
                                    transition-all duration-150 ease-in-out">

                                    <div className="cursor-pointer flex justify-center items-center hover:invert 
                                    group w-8 h-8 rounded-full bg-[#33373d]">
                                        <img className="w-[50%] " src={assets.add_icon} alt="Adicionar" />
                                    </div>
                                    <h3 className="">Adicionar um novo perfil</h3>
                                </div>


                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 onClick={() => navigate('/editprofile')} className="px-4 py-2">Editar perfil</h3>
                                </div>
                                <div className="hover:shadow-[1px_1px_4px_1px_rgba(255,255,255,0.5)] rounded-lg cursor-pointer hover:bg-white hover:text-black transition-all duration-150 ease-in-out">
                                    <h3 className="px-4 py-2">Saiba mais</h3>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>



            <div className={`mt-56 absolute left-1/2 transform -translate-x-1/2 bg-[#181C23]  items-center justify-center p-10 rounded-lg w-[60%]
                transition-all duration-400 ease-in-out  ${isVisibleSearchBar ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <form onSubmit={handleSearchSubmit} className='flex gap-2 items-center p-3 bg-[#33373D] rounded-lg focus-within:border-2 focus-within:border-white w-full'>
                    <button type="submit">
                        <img className='w-6 h-6 brightness-75' src={assets.search_icon} alt="" />

                    </button>


                    <input
                        value={query}
                        onChange={handleSearchChange}

                        className='bg-transparent focus:outline-none p-2 rounded w-full text-white'
                        type="text"
                        placeholder="Busca"
                    />

                </form>

            </div>


        </div>
    )
}

export default Navbar
