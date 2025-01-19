import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DisplayHome from './DisplayHome';
import DisplayCategories from './DisplayCategories';
import Footer from './Footer';
import DisplayEditProfile from './DisplayEditProfile';
import DisplayMyStuff from './DisplayMyStuff';
import DisplayDetail from './DisplayDetail';
import DisplayPlayer from './DisplayPlayer';
import { PlayerProvider } from '../context/PlayerContext';

const Display = () => {
  return (
    <div className='h-screen w-full flex flex-col bg-black'>
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/categories' element={<DisplayCategories />} />
        <Route path='/editprofile' element={<DisplayEditProfile />} />
        <Route path='/mystuff' element={<DisplayMyStuff />} />
        <Route path='/detail/:id' element={<DisplayDetail />} />

        {/* Aqui você envolve apenas a rota de DisplayPlayer com o PlayerProvider */}
        <Route path='/player/:id' element={
          <PlayerProvider>
            <DisplayPlayer />
          </PlayerProvider>
        } />
      </Routes>
    </div>
  );
};

export default Display;
