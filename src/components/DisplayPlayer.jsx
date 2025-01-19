import React from 'react';
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
    handleFullScreen
  } = usePlayerContext();  // Agora você pode acessar o contexto aqui

  const { id } = useParams();
  const data = seriesData ? seriesData[id - 1] : null;
  const navigate = useNavigate();

  return (
    <div className="z-10 w-full h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {data && (
        <>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={data.teaser}
            autoPlay
            controls={false} // Remover controles nativos
            onTimeUpdate={updateProgress}
          ></video>

          <div className="flex items-center w-full text-white absolute top-10 px-10 justify-between ml-2 overflow-hidden">
            {/* Seção da esquerda */}
            <div className="flex gap-4 items-center">
              <h3 className="text-2xl">X-ray</h3>
              <div className="flex items-center gap-1">
                <h6>Todos</h6>
                <img className="w-4 -rotate-90" src={assets.arrow_white_icon} alt="" />
              </div>
            </div>

            {/* Seção do meio (Título e nome do episódio) */}
            <div className="text-center flex-grow">
              <h1 className="text-3xl">{data.name}</h1>
              <h5 className="text-2xl font-light font-sans">Temporada 1, Ep. 1 Nome do episódio</h5>
            </div>

            {/* Seção da direita (Ícones) */}
            <div className="flex gap-5 items-center ">
              <div className="flex justify-center group">
                <img className="cursor-pointer h-7 hover:brightness-200" src={assets.caption_icon} alt="" />
                <p className="absolute top-16 opacity-0 group-hover:block hidden group-hover:opacity-100 text-lg">Legendas</p>
              </div>
              <div className="flex justify-center group">
                <img className="cursor-pointer h-7 hover:brightness-200" src={assets.settings_icon} alt="" />
                <p className="absolute top-16 opacity-0 group-hover:block hidden group-hover:opacity-100 text-lg">Opções</p>
              </div>
              <div className="flex justify-center group flex-col relative">
                <img onClick={toggleMute} className="cursor-pointer h-7 brightness-75 hover:brightness-200" src={isMuted ? assets.unmute_icon : assets.mute_icon} alt="Mute" />

                <div
                  className="absolute top-7 -left-2 bg-[#454545] p-4 rounded-lg shadow-md flex items-center justify-center hidden group-hover:flex"
                  style={{ width: '50px', height: '150px' }}
                >
                  <input
                    className="transform -rotate-90 w-[120px] custom-range"
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
                <p className="absolute top-16 opacity-0 group-hover:block hidden group-hover:opacity-100 text-lg">{isFullScreen ? "Sair da tela cheia" : "Tela cheia"}</p>
              </div>
              <hr className="border-white border-[1px] h-9 brightness-75" />
              <div className="flex justify-center group">
                <img onClick={() => navigate(-1)} className="cursor-pointer h-7 hover:brightness-200" src={assets.exit_icon} alt="Close" />
                <p className="absolute top-16 opacity-0 group-hover:block hidden group-hover:opacity-100 text-lg right-10">Fechar reprodutor</p>
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
