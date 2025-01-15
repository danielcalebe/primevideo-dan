import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { assets } from './assets/assets'
import Display from './components/Display'
import Footer from './components/Footer'

function App() {

  return (

    <>
        <div className="relative h-screen h-full flex flex-col ">
          <div className=" top-0 left-0 w-full z-10 fixed">
            <Navbar />
          </div>
          <div className=' '>
                      <Display />

          </div>
          <div>

          </div>

        </div>



    </>
  )
}

export default App
