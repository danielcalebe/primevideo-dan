import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className="z-20 w-full bg-black flex flex-col gap-1 justify-center items-center pb-2">
            <div className="w-14">
                <img className="w-full" src={assets.logo_prime_white} alt="Logo" />
            </div>
            <div className="flex gap-2 items-center">
                <p className="text-[#90DFFE] text-md font-semibold">Termos de aviso e privacidade</p>
                <p className="text-[#90DFFE] text-md font-semibold">Enviar feedback</p>
                <p className="text-[#90DFFE] text-md font-semibold">Ajuda</p>
                <p className="text-[#728792] text-md font-semibold">© 1996-2025, Amazon.com, Inc. ou suas afilhadas</p>
            </div>
        </div>
    );
};



export default Footer
