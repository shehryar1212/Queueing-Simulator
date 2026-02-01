import React, { useState } from 'react'
import Hero from './Hero'
import Footer from '../components/Footer'
import Testtimols from '../components/Testtimols'
import Splash_page from './Splash_page.jsx'
const Home = () => {
  const [splash, setSplash] = useState(true)

setTimeout(()=>{
  setSplash(false);
},1500)
  return (
    <>
      {
        splash ? 
        <Splash_page/> 
        :
        
        <div className='w-full '>
            <Hero/>
            <Footer/>
        </div>
      }
    </>
  )
}

export default Home