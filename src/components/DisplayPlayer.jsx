import React, { useEffect, useRef, useState } from 'react';
import { usePlayerContext } from '../context/PlayerContext';  // Importe o hook do contexto
import { assets, seriesData } from '../assets/assets';
import { useNavigate, useParams } from 'react-router-dom';
const DisplayPlayer = () => {
  const {
    videoRef,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    progress,
    setProgress,
    isMuted,
    setIsMuted,
    isFullScreen,
    togglePlayPause,
    handleVolumeChange,
    handleProgressChange,
    updateProgress,
    toggleMute,
    handleFullScreen,
    skipForward,
    skipBackward,
    handleVideoEnd,
    seekBg,
    seekBar,
    time, setTime,
    seekVideo,
    isInactive, setIsInactive

  } = usePlayerContext();  // Agora você pode acessar o contexto aqui

  const { id } = useParams();
  const data = seriesData ? seriesData[id - 1] : null;
  const navigate = useNavigate();






  return (
    <div className="z-10 w-full h-screen bg-black text-white flex flex-col items-center justify-between relative overflow-hidden 	">
      {data && (
        <>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={data.teaser}
            onEnded={handleVideoEnd}
            autoPlay ={isPlaying ? true : false}
            controls={false} // Remover controles nativos
            onTimeUpdate={updateProgress}
          ></video>

          <div className={`w-full h-screen transition-all duration-1000 easy-in-out ${isInactive ? 'opacity-0 pointer-events-none	' : 'opacity-100 '} `}>
            <div className="flex items-center w-full text-white absolute top-10 px-10 justify-between  overflow-hidden">
              {/* Seção da esquerda */}
              <div className="flex gap-4 items-center ">
                <h3 className="text-2xl">X-ray</h3>
                <div className="flex items-center gap-1">
                  <h6>Todos</h6>
                  <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
                </div>
              </div>

              {/* Seção do meio (Título e nome do episódio) */}
              <div className="text-center ml-24">
                <h1 className="text-3xl">{data.name}</h1>
                <h5 className="text-2xl font-light font-sans">Temporada 1, Ep. 1 Nome do episódio</h5>
              </div>

              {/* Seção da direita (Ícones) */}
              <div className="flex gap-5 items-center">
                <div className="flex justify-center group">
                  <img className="cursor-pointer h-7 hover:brightness-200" src={assets.caption_icon} alt="" />
                  <p className="fixed top-24 opacity-0 group-hover:block hidden group-hover:opacity-100 text-lg">Legendas</p>
                </div>
                <div className="flex justify-center group ">
                  <img className="cursor-pointer h-7 hover:brightness-200" src={assets.settings_icon} alt="" />
                  <p className="fixed top-24  right-2opacity-0 group-hover:block hidden group-hover:opacity-100 text-lg">Opções</p>
                </div>


                <div className="relative  flex justify-center group items-center">
                  <img
                    onClick={toggleMute}
                    className="cursor-pointer h-7 brightness-75 hover:brightness-200"
                    src={isMuted ? assets.unmute_icon : assets.mute_icon}
                    alt="Mute"
                  />
                  <div className="fixed top-36  z-20 transform -rotate-90 hidden group-hover:flex p-5 bg-[#484444]  justify-center rounded-lg">
                    <input
                      className=" "
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                  </div>
                </div>



                <div className="flex justify-center group">
                  <img
                    onClick={handleFullScreen}
                    className="cursor-pointer h-7 hover:brightness-200"
                    src={isFullScreen ? assets.exit_full_screen_icon : assets.enter_full_screen_icon}
                    alt={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  />
                  <p className="fixed top-24 opacity-0 group-hover:block hidden group-hover:opacity-100 text-lg">{isFullScreen ? "Sair da tela cheia" : "Tela cheia"}</p>
                </div>
                <hr className="border-white border-[1px] h-9 brightness-75" />
                <div className="flex justify-center group">
                  <img onClick={() => navigate(-1)} className="cursor-pointer h-7 hover:brightness-200" src={assets.exit_icon} alt="Close" />
                  <p className="fixed top-24  shadow-black opacity-0 group-hover:block hidden group-hover:opacity-100 text-lg right-10">Fechar reprodutor</p>
                </div>
              </div>
            </div>

            <div className='  w-full flex items-center align-middle justify-center z-20  gap-36 top-[47%] absolute'>

              <img onClick={skipBackward} className='cursor-pointer w-[4.5%] brightness-[1.20] hover:brightness-200' src={assets.back10_icon} alt="" />
              <img onClick={togglePlayPause} className={`${isPlaying ? 'w-[3.5%] brightness-[1.30]' : 'w-[4.5%]'} cursor-pointer brightness-75 hover:brightness-200`} src={`${isPlaying ? assets.pause_icon : assets.play_icon}`} alt="" />
              <img onClick={skipForward} className='cursor-pointer w-[4.5%] brightness-[1.20] hover:brightness-200' src={assets.skip10_icon} alt="" />

            </div>

            <div className='z-20 w-full mb-20 flex items-center justify-center absolute -bottom-4   font-sans '>
              <div className="flex items-center gap-5 z-20">
              <p className='text-lg absolute top-4 flex gap-2'>{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')} 
                <p className='brightness-75'>/</p>
                <p className='brightness-75'>  {time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</p> 
              </p>

                <div
                  ref={seekBg}
                  onClick={seekVideo}
                  className="relative w-[95vw] max-w-[100%] bg-white bg-opacity-40 rounded-full cursor-pointer h-[4px] group"
                >
                  {/* Linha de progresso */}
                  <hr
                    ref={seekBar}
                    className="h-full border-none bg-white rounded-full absolute top-1/2 transform -translate-y-1/2"
                  />

                  {/* Bolinha de Progresso */}
                  <div
                    className="bg-white rounded-full w-4 h-4 absolute hidden group-hover:block"
                    style={{
                      left: seekBar.current ? `${seekBar.current.style.width}` : '0%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  ></div>

             
                </div>
                <div className='absolute right-10 top-4 flex gap-2 items-center brightness-75 hover:brightness-200  cursor-pointer '>
                      <p>Proximo episódio</p>
                      <img src={assets.arrow_white_icon} alt="" className=" h-[10.5px] -rotate-90 mt-[2px]" />
                  </div>
              </div>
              
            </div>
                    
          </div>
        </>
      )}
      {!data && <p className="text-center">Vídeo não encontrado.</p>}
    </div>
  );
};

export default DisplayPlayer;
