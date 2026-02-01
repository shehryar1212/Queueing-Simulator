import React from 'react'
import splash_image from '/Splash_image.png'
const Splash_page = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#c2b38c] '>
        <img src={splash_image} alt="" srcset="" className='animate-pulse'/>
    </div>
  )
}

export default Splash_page