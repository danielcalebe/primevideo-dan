import React from 'react';
import { assets } from '../assets/assets';

const SerieItem = ({ id, name, description, background, logo }) => {
  return (
    <div className="min-w-[50%] sm:min-w-[33.33%] md:min-w-[25%] lg:min-w-[20%] rounded text-white group transition-all duration-300 ease-in-out">
      <div
        className="min-h-[120px] sm:min-h-[150px] lg:min-h-[150px] rounded relative group-hover:scale-110 transition-all duration-300 ease-in-out"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img src={logo} alt="" className="w-[60%] sm:w-[50%] mx-auto mt-2" />
        <img
          className="w-8 sm:w-10 absolute bottom-2 right-2"
          src={assets.logo_prime_white}
          alt=""
        />
      </div>

      <div className="pt-4 rounded bg-black hidden group-hover:block">
        <h2 className="text-sm sm:text-md">{name}</h2>
        <h4 className="text-[#37F1A3] text-xs font-medium">#30 no Brasil</h4>
        <div className="flex flex-col gap-2">
          <div className="flex bg-[#33373E] rounded-lg py-3 sm:py-4 m-[1px] gap-2 items-center justify-center mt-2">
            <img className="w-5 sm:w-6" src={assets.play_icon} alt="" />
            <h3 className="text-xs sm:text-sm font-medium">Reproduzir T1, Ep. 1</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-[#33373E] rounded-full p-2 sm:p-3">
              <img className="w-5 sm:w-6" src={assets.add_icon} alt="" />
            </div>
            <div className="bg-[#33373E] rounded-full p-2 sm:p-3">
              <img className="w-5 sm:w-6" src={assets.hide_icon} alt="" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center pt-5">
          <img className="w-4 h-4" src={assets.verified_icon} alt="" />
          <p className="text-xs sm:text-sm">Incluído no Prime</p>
        </div>

        <div className="flex pt-4 gap-2 items-center">
          <p className="text-xs brightness-75">2025</p>
          <img className="w-4 sm:w-5" src={assets.age_icon} alt="" />
        </div>
        <p className="text-white pt-4 line-clamp-3 text-xs sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SerieItem;
