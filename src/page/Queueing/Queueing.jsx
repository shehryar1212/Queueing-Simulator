import { Link, Outlet } from 'react-router-dom';

const Queueing = () => {
  return (
    // This wrapper ensures the background covers the entire viewport
    <div className='min-h-screen bg-cream w-full'>
      <div className='flex flex-wrap justify-center gap-4 md:gap-10 p-4'>
        <Link to="mmcModel"><h1 className='md:text-2xl text-xl text-pink-900 font-bold hover:underline cursor-pointer active:scale-95'>M/M/C</h1></Link>
        <Link to="mgcModel"><h1 className='md:text-2xl text-xl text-pink-900 font-bold hover:underline cursor-pointer active:scale-95'>M/G/C</h1></Link>
        <Link to="ggcModel"><h1 className='md:text-2xl text-xl text-pink-900 font-bold hover:underline cursor-pointer active:scale-95'>G/G/C</h1></Link>
      </div>

      {/* The Outlet content will now also reside within the bg-cream container */}
      <div className="p-4">
        <Outlet/>
      </div>
    </div>
  )
}
export default Queueing;