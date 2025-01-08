  import React from 'react';
  import { assets } from '../assets/assets';

  const OriginalsItem = ({ id, name, description, img1, img2, logo }) => {
    return (
      <div className="group w-[20%] hover:w-[50%] flex-shrink-0 relative group-group transition-transform duration-300">
        <img className="w-full group-hover:hidden" src={img1} alt={name} />
        <img className='h-full absolute group-hover:block hidden' src={img2} alt="" />
      </div>
    );
  };


  export default OriginalsItem;
