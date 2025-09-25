import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-gray-800">
        MyLogo
      </div>
      
      <ul className="hidden md:flex space-x-6">
        <li><a href="#" className="text-gray-600 hover:text-blue-600">Home</a></li>
        <li><a href="#" className="text-gray-600 hover:text-blue-600">About</a></li>
        <li><a href="#" className="text-gray-600 hover:text-blue-600">Services</a></li>
        <li><a href="#" className="text-gray-600 hover:text-blue-600">Contact</a></li>
      </ul>

      <div className="md:hidden">
        <button className="text-gray-800 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
