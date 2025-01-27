import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const OriginalsItem = ({ id, name, description, img1, img2, logo, type }) => {

  const refreshPage = () => {
    navigate(0); // Recarrega a página, forçando uma nova renderização
  };
  const navigate = useNavigate();
  return (
    <div className=" group w-[50%] md:w-[30%] lg:w-[20%] hover:lg:w-[50%] hover:w-[120%] hover:md:w-[20%] hover:sm:w-[60%]  
     flex-shrink-0 relative group-group transition-transform duration-500 scale-90 hover:scale-100">
      <div className='w-full group-hover:hidden '>
        <img src={assets.logo_prime_white} alt="" className="absolute w-10 bottom-2 right-2 " />

        <img className="" src={img1} alt={name} />
      </div>
      <div className=' relative group-hover:flex hidden'>
        <img className='h-full ' src={img2} alt="" />

        <div className='absolute h-full z-10 flex flex-col justify-center mt-10 pl-10'>
          <img className='w-[20%] p-2' src={logo} alt="" />
          <div className='flex gap-4'>

            <div onClick={() => {
              navigate(`/player/${type}/${id}`); // Navega para a página com o novo id
              refreshPage(); // Chama a função para forçar a atualização da página
            }} className="  cursor-pointer flex bg-[#33373E] bg-opacity-60  rounded-lg  gap-2 items-center justify-center px-3 transition-all duration-400 transform hover:scale-110">
              <img className="w-6 p-0" src={assets.play_icon} alt="" />
              <h3 className="text-lg font-medium text-white ">Reproduzir</h3>
            </div>
            <div className="cursor-pointer  flex items-center gap-2">
              <div className="bg-[#33373E] bg-opacity-60 rounded-full p-4 transition-all duration-400 transform hover:scale-110">
                <img className="w-6  " src={assets.add_icon} alt="" />
              </div>
              <div className="cursor-pointer  bg-[#33373E] bg-opacity-60 rounded-full p-4 transition-all duration-400 transform hover:scale-110">
                <img className="w-6 " src={assets.hide_icon} alt="" />
              </div>
            </div>
          </div>
          <div className='flex gap-2 absolute bottom-14 left-10 items-center'>
            <img className='w-5' src={assets.verified_icon} alt="" />
            <p className='text-white text-sm '>Incluído no Prime</p>
          </div>
        </div>

      </div>


    </div>
  );
};


export default OriginalsItem;
