import React from 'react';
import { assets } from '../assets/assets';

function Header() {
  return (
    <div className='flex flex-col items-center justify-center text-center p-6 text-black min-h-screen'>

      <img 
        src={assets.header_img} 
        alt="Profile" 
        className='w-36 h-36 rounded-full mb-6 shadow-lg border-4 border-white'
      />
      
      <h1 className='text-xl font-medium mb-2 flex items-center gap-2'>
        Hey Developer 
        <img 
          src={assets.hand_wave} 
          alt="wave" 
          className='w-6 h-6' 
        />
      </h1>
      
      <h2 className='text-5xl font-bold mb-4'>Welcome to our App</h2>
      
      <p className='text-lg max-w-xl mb-6'>
        Let’s start with a quick product tour and we’ll have you up and running in no time!
      </p>
      
            <button className='flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all'>Get Started</button>
    
    </div>
  );
}

export default Header;
