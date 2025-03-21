
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        scrolled ? 'bg-space-darker/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-display font-bold shimmer-text tracking-tight"
        >
          Celestial Wishes
        </Link>
        
        <div className="flex space-x-4 items-center">
          <Link
            to="/"
            className={cn(
              'px-4 py-2 rounded-md transition-all duration-300 font-medium',
              location.pathname === '/' 
                ? 'text-white bg-space-purple/20'
                : 'text-gray-300 hover:text-white hover:bg-space-purple/10'
            )}
          >
            Home
          </Link>
          
          <Link
            to="/wishes"
            className={cn(
              'px-4 py-2 rounded-md transition-all duration-300 font-medium',
              location.pathname === '/wishes' 
                ? 'text-white bg-space-purple/20'
                : 'text-gray-300 hover:text-white hover:bg-space-purple/10'
            )}
          >
            Wishes
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
