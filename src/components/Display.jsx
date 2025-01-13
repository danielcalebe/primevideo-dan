

import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DisplayHome from './DisplayHome';
import DisplayCategories from './DisplayCategories';
import Footer from './Footer';
import DisplayEditProfile from './DisplayEditProfile';

const Display = ({isSongPage}) => {
 

  return (



    <div className='h-screen w-full h-full p-0 m-0 flex flex-col bg-black  '
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/categories' element={<DisplayCategories />} />
        <Route path='/editprofile' element={<DisplayEditProfile />} />


      </Routes>

      <Footer />

    </div>
  );
};

export default Display;