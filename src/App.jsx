import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { assets } from './assets/assets'
import Display from './components/Display'

function App() {

  return (
    
    <>  
  <div className="relative h-screen">
  <div className="absolute top-0 left-0 w-full z-10">
    <Navbar />
  </div>
    <Display />
</div>


    </>
  )
}

export default App
