 {/* Controles Personalizados */}
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-3/4 bg-gray-800 bg-opacity-80 rounded-lg p-4 flex flex-col">
                        {/* Barra de progresso */}
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            className="w-full"
                            onChange={handleProgressChange}
                        />

                        <div className="flex items-center justify-between mt-4">
                            {/* Botão Play/Pause */}
                            <button
                                onClick={togglePlayPause}
                                className="text-white bg-gray-700 px-4 py-2 rounded-lg"
                            >
                                {isPlaying ? 'Pause' : 'Play'}
                            </button>

                            {/* Controle de Volume */}
                            <div className="flex items-center">
                                <label className="mr-2">Volume</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                            </div>

                            {/* Botão Fullscreen */}
                            <button
                                onClick={handleFullScreen}
                                className="text-white bg-gray-700 px-4 py-2 rounded-lg"
                            >
                                Tela Cheia
                            </button>
                        </div>
                    </div>