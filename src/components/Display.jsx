

import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DisplayHome from './DisplayHome';
import DisplayCategories from './DisplayCategories';
import Footer from './Footer';
import DisplayEditProfile from './DisplayEditProfile';
import DisplayMyStuff from './DisplayMyStuff';
import DisplayDetail from './DisplayDetail';

const Display = ({isSongPage}) => {
 

  return (



    <div className='h-screen w-full  flex flex-col bg-black  '
    >
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/categories' element={<DisplayCategories />} />
        <Route path='/editprofile' element={<DisplayEditProfile />} />
        <Route path='/mystuff' element={<DisplayMyStuff />} />
        <Route path='/detail/:id' element={<DisplayDetail />} />


      </Routes>


    </div>
  );
};

export default Display;