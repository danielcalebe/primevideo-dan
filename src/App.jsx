import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { assets } from './assets/assets'

function App() {

  return (
    
    <>  
    
    <div className='h-screen'>
       <div 
    className="w-full  h-[100%]  "  // Garante que ocupe toda a tela
    style={{
      backgroundColor: 'rgba(174, 8, 8, 0.2)',

      backgroundImage: `url(${assets.ss})`,
      backgroundSize: 'cover',  // Faz a imagem cobrir toda a área
      backgroundPosition: 'center',  // Centraliza a imagem
      backgroundRepeat: 'no-repeat',  // Impede a repetição da imagem
    }}
  >
      <Navbar />
      
   
        {/* Outros conteúdos aqui */}
      </div></div>
    </>
  )
}

export default App
