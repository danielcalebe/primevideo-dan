import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const DisplayEditProfile = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center justify-center gap-6  pt-32 pb-[5%] '>
            <h1 className='text-4xl text-white  font-bold'> Quem está assistindo?</h1>
            <div className='flex  w-full items-center justify-center text-center flex-wrap'>
                <div onClick={() => navigate('/')} className='group flex flex-col cursor-pointer items-center justify-center w-[33%] md:w-[25%] lg:w-[12.5%] gap-2'>
                    <img className='w-[80%] group-hover:scale-110 transform transition-all ease-in-out duration-500' src={assets.profile_icon} alt="" />
                    <h4 className='text-white font-semibold text-xl brightness-75 group-hover:brightness-100 group-hover:scale-110 transform transition-all ease-in-out duration-400 '>danielcalebe</h4>
                </div>
                <div onClick={() => navigate('/')} className='group flex flex-col cursor-pointer items-center justify-center w-[33%] md:w-[25%] lg:w-[12.5%] gap-2'>
                    <img className='w-[80%] group-hover:scale-110 transform transition-all ease-in-out duration-500' src={assets.profile_icon} alt="" />
                    <h4 className='text-white font-semibold text-xl brightness-75 group-hover:brightness-100 group-hover:scale-110 transform transition-all ease-in-out duration-400 '>danielcalebe</h4>
                </div>
                <div onClick={() => navigate('/')} className='group flex flex-col cursor-pointer items-center justify-center w-[33%] md:w-[25%] lg:w-[12.5%] gap-2'>
                    <img className='w-[80%] group-hover:scale-110 transform transition-all ease-in-out duration-500' src={assets.profile_icon} alt="" />
                    <h4 className='text-white font-semibold text-xl brightness-75 group-hover:brightness-100 group-hover:scale-110 transform transition-all ease-in-out duration-400 '>danielcalebe</h4>
                </div>
                <div onClick={() => navigate('/')} className='group flex flex-col cursor-pointer items-center justify-center w-[33%] md:w-[25%] lg:w-[12.5%] gap-2'>
                    <img className='w-[80%] group-hover:scale-110 transform transition-all ease-in-out duration-500' src={assets.profile_icon} alt="" />
                    <h4 className='text-white font-semibold text-xl brightness-75 group-hover:brightness-100 group-hover:scale-110 transform transition-all ease-in-out duration-400 '>danielcalebe</h4>
                </div>
                <div onClick={() => navigate('/')}  className='group flex flex-col cursor-pointer items-center justify-center w-[33%] md:w-[25%] lg:w-[12.5%] gap-2'>
                    <img className='w-[80%] group-hover:scale-110 transform transition-all ease-in-out duration-500' src={assets.profile_icon} alt="" />
                    <h4 className='text-white font-semibold text-xl brightness-75 group-hover:brightness-100 group-hover:scale-110 transform transition-all ease-in-out duration-400 '>danielcalebe</h4>
                </div>
                <div className='group flex flex-col cursor-pointer items-center justify-center w-[33%] md:w-[25%] lg:w-[12.5%] gap-2'>

                    <div
                        className="group-hover:scale-110 transform transition-all ease-in-out duration-500 flex items-center justify-center w-[75%]  py-[30%] bg-[#33373E]
                                                            rounded-full 
                                                            transition-all duration-300 ease-in-out cursor-pointer"
                    >
                        <img
                            className="sm:w-[25%]  w-8 "
                            src={assets.add_icon}
                            alt="Adicionar"
                        />

                    </div>
                    <h4 className='text-white font-semibold text-xl brightness-75 group-hover:brightness-100 group-hover:scale-110 transform transition-all ease-in-out duration-400 '>Adicionar n...</h4>

                </div>

            </div>

                <div className='mt-[7%]  flex justify-center items-center rounded-lg text-white bg-[#33373E] p-4 text-lg font-medium cursor-pointer transition-all duraion-1000 ease-in-out hover:text-black hover:bg-white'>
                    <h4>Editar perfil</h4>
                </div>

        </div>
    )
}

export default DisplayEditProfile
