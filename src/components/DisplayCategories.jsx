import React from 'react';
import { categories } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const DisplayCategories = () => {

 const navigate = useNavigate();

    return (
        <div className="bg-black  flex-col flex  w-full p-5">
            <div className='pl-12 pt-16'>
                <h1 className="  text-white font-semibold text-4xl">Categorias</h1>
                <h4 className="text-white font-semibold text-lg pt-4">Gêneros</h4>
            </div>

            <div className="flex flex-wrap  gap-7 w-full pt-10 px-10 items-center justify-between bg-black">

                {categories.map((item, index) => {
                    return (
                        <div
                        onClick={() => navigate(`/search?query=${item.name}`)}
                            key={index}
                            className="p-4 w-[45%] md:w-[30%] lg:w-[17.5%] py-12 flex items-center justify-start rounded-lg text-white font-bold text-xl"
                            style={{
                                background: `linear-gradient(to right, ${item.bgColor} , #111317 )`,
                            }}

                        >
                            <h1 className="truncate">{item.name}</h1>
                        </div>
                    );
                })}
            </div>

            <div className='pl-12 pt-8'>
                <h4 className="text-white font-semibold text-lg pt-4">Coleções em Destaque</h4>
            </div>

            <div className="flex flex-wrap  gap-7 w-full pt-10 px-10 items-center bg-black">
                        
                       
                                <div className="p-4 w-[45%] md:w-[30%] lg:w-[17.5%] py-12 flex items-center justify-start rounded-lg text-white font-bold bg-[#121B2A] text-xl">
                                    <h1 className="truncate">Feito para você</h1>
                                </div>
                                <div className="p-4 w-[45%] md:w-[30%] lg:w-[17.5%] py-12 flex items-center justify-start rounded-lg text-white font-bold bg-[#1998FF] text-xl">
                                    <h1 className="truncate">Ao vivo e em breve</h1>
                                </div>
                                <div className="p-4 w-[45%] md:w-[30%] lg:w-[17.5%] py-12 flex items-center justify-start rounded-lg text-white font-bold bg-[#1998FF] text-xl">
                                    <h1 className="truncate">Estreia em casa</h1>
                                </div>
                                <div className="p-4 w-[45%] md:w-[30%] lg:w-[17.5%] py-12 flex items-center justify-start rounded-lg text-white font-bold bg-[#1998FF] text-xl">
                                    <h1 className="truncate">Aclamados pela crítica</h1>
                                </div>
                                <div className="p-4 w-[45%] md:w-[30%] lg:w-[17.5%] py-12 flex items-center justify-start rounded-lg text-white font-bold bg-[#1998FF] text-xl">
                                    <h1 className="truncate">LGBTQIAP+</h1>
                                </div>
                                <div className="p-4 w-[45%] md:w-[30%] lg:w-[17.5%] py-12 flex items-center justify-start rounded-lg text-white font-bold bg-[#1998FF] text-xl">
                                    <h1 className="truncate">Vozes negras</h1>
                                </div>
                       
                    </div>



        </div>
    );
};

export default DisplayCategories;
