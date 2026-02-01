import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className='font-sans bg-cream sticky w-full flex flex-col md:flex-row justify-between items-start md:items-center md:h-16 h-full md:px-[3vw] md:py-[1vw] py-3 px-3 border border-b-2 border-cream'>
      <div className='flex items-center w-full md:w-auto'>
        <Link to="/">
          <h1 className='md:text-3xl text-2xl md:font-bold font-extrabold text-black-900 cursor-pointer'>
            Simulator
          </h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className='hidden md:flex gap-3'>
        <div className="relative group">
          <Link to="/Simulation">
            <button className='md:w-fit md:h-[3vw] mr:4 px-2 md:mr-2 rounded-md bg-pink-900 text-white active:scale-95 hover:bg-pink-700 text-md transition-colors'>
              Simulation
            </button>
          </Link>
          {/* Dropdown for simulation models */}
          <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md mt-1 w-40 z-50">
            <Link to="/Simulation/MM1" className="block px-4 py-2 hover:bg-gray-100 text-sm">M/M/1</Link>
            <Link to="/Simulation/MMC" className="block px-4 py-2 hover:bg-gray-100 text-sm">M/M/C</Link>
            <Link to="/Simulation/MGC" className="block px-4 py-2 hover:bg-gray-100 text-sm">M/G/C</Link>
          </div>
        </div>
        {/* 'Queuing Models' block has been removed from here */}
      </div>

      {/* Mobile Menu Icon */}
      <div className='md:hidden cursor-pointer self-end' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute w-full top-full right-0 bg-white shadow-lg border rounded-md flex flex-col p-3 gap-3 z-50'>
          <Link to="/Simulation" onClick={() => setIsMenuOpen(false)}>
            <button className='w-full h-fit px-2 py-2 rounded-md bg-pink-900 text-white active:scale-95 hover:bg-pink-700 text-md transition-colors'>
              Simulation
            </button>
          </Link>
          {/* 'Queuing Models' button has been removed from here */}
        </div>
      )}
    </div>
  );
};

export default Header;