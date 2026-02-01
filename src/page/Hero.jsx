import React from 'react'
import hero from '/queue2.jpg'
import "../App.css";

const Hero = () => {
  // Logic: Removed the 'el' ref and the useEffect hook entirely to prevent 
  // the 'tagName' null error. The UI is now stable and declarative.

  return (
    <div className='h-full w-full flex flex-col items-center md:p-3 pt-7 bg-cream'>
      {/* The span below is now static. 
        In a simulation, clarity is better than flashing text. 
      */}
      <h1 className='md:text-7xl text-5xl font-bold text-center md:px-[1vw] md:pt-[5vw] md:pb-[3vw] '>
        Welcome to Simulator <span className="text-pink-900"></span>
      </h1>
      
      <p className='md:text-xl font-sans font-semibold md:pb-[2vw] p-5'> 
        Under the supervision of Dr.Shaista Rais <span className='text-pink-900'></span> <span className='text-pink-900'></span> 
      </p>
      
      <img src={hero} alt="Queue Simulation" className='rounded-2xl md:w-[95%] md:max-h-screen h-96 py-[2vw] px-2 hover:scale-95 transition-transform'/>
      
      <div className='w-[100%] h-[100%] flex flex-wrap'>
        {/* <div className='md:w-[50%] w-full px-[2vw] py-[4vw]'>
          <h1 className='md:text-4xl text-2xl md:text-left text-center font-sans font-extrabold pb-6'>Objective</h1>
          <p className='md:text-xl font-sans'>
            Explore and analyze queueing systems using advanced mathematical models and simulation techniques. 
            This comprehensive queueing simulator implements fundamental queueing theory concepts including 
            M/M/1, M/M/C, M/G/C, and G/G/C models to optimize service systems, reduce customer waiting times, 
            and improve resource utilization.
          </p>
        </div> */}
        <div className='md:w-[50%] w-full px-[1vw] py-[2vw] '>
          {/* Layout placeholder for additional metrics or graphics */}
        </div>
      </div>
    </div>
  )
}

export default Hero