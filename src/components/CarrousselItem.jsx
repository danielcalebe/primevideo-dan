import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import tmdb from '../assets/api/tmdb'; // Certifique-se de que o tmdb está importado corretamente
import { useNavigate } from 'react-router-dom';
import api from '../api';
const CarrousselItem = ({ id, name, description, background, logo, type }) => {
  const navigate = useNavigate()


  const refreshPage = () => {
    navigate(0); // Recarrega a página, forçando uma nova renderização
};




  return (
    <div className=''>
      <div onClick={() => {
  navigate(`/detail/${type}/${id}`); // Navega para a página com o novo id
  refreshPage(); // Chama a função para forçar a atualização da página
}}
className="min-w-[300px] min-h-[150px] rounded text-white group ">
        <div
          className="  min-h-[150px] sm:min-h-[150px] lg:min-h-[150px] rounded relative group-hover:scale-110 transition-all duration-300 ease-in-out"
          style={{
            backgroundImage: `url(${background})`,
         
            backgroundSize: 'cover',
          }}
        >
          <img src={logo} alt="Logo" className="w-[30%] sm:w-[30%] mx-auto mt-2 absolute left-6" />
          <img
            className="w-8 sm:w-10 absolute bottom-2 right-2"
            src={assets.logo_prime_white}
            alt="Prime Logo"
          />
        </div>

        {/* Div que aparece ao fazer hover, posicionada abaixo */}
        <div className=" pt-4 rounded bg-black opacity-0 group-hover:opacity-100 hidden group-hover:block z-60 top-2 p-3 transition-opacity duration-300 ease-in-out mt-2">
          <h2 className="text-sm sm:text-md">{name}</h2>
          <h4 className="text-[#37F1A3] text-xs font-medium">#30 no Brasil</h4>
          <div className="flex flex-col gap-2">
            <div className="flex bg-[#33373E] rounded-lg py-3 sm:py-4 m-[1px] gap-2 items-center justify-center mt-2">
              <img className="w-5 sm:w-6" src={assets.play_icon} alt="Play" />
              <h3 className="text-xs sm:text-sm font-medium">Reproduzir T1, Ep. 1</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#33373E] rounded-full p-2 sm:p-3">
                <img className="w-5 sm:w-6" src={assets.add_icon} alt="Add" />
              </div>
              <div className="bg-[#33373E] rounded-full p-2 sm:p-3">
                <img className="w-5 sm:w-6" src={assets.hide_icon} alt="Hide" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center pt-5">
            <img className="w-4 h-4" src={assets.verified_icon} alt="Verified" />
            <p className="text-xs sm:text-sm">Incluído no Prime</p>
          </div>

          <div className="flex pt-4 gap-2 items-center">
            <p className="text-xs brightness-75">2025</p>
            <img className="w-4 sm:w-5" src={assets.age_icon} alt="Age Icon" />
          </div>
          <p className="z text-white pt-4 line-clamp-3 text-xs sm:text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarrousselItem;
