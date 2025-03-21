
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BirthdayCake from './BirthdayCake';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC<{ name: string }> = ({ name }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add staggered animations
    const elements = [headingRef, imageRef, quoteRef, buttonRef];
    elements.forEach((ref, index) => {
      if (ref.current) {
        setTimeout(() => {
          if (ref.current) {
            ref.current.classList.add('opacity-100');
            ref.current.classList.remove('translate-y-10');
          }
        }, 300 + index * 300);
      }
    });
  }, []);
  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-space-darker z-0"></div>
      
      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-radial from-space-purple/20 to-transparent opacity-30 z-1"></div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 
          ref={headingRef}
          className="font-display font-bold text-4xl md:text-6xl lg:text-7xl mb-8 opacity-0 translate-y-10 transition-all duration-700 ease-out shimmer-text"
        >
          Happy Birthday, {name}!
        </h1>
        
        <div 
          ref={imageRef}
          className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-300"
        >
          <img 
            src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" 
            alt={name} 
            className="w-full h-full object-cover rounded-full border-4 border-space-teal/50 shadow-[0_0_30px_rgba(62,252,252,0.3)]"
          />
          <div className="absolute -inset-1 rounded-full blur-md bg-space-teal/20 -z-10"></div>
        </div>
        
        <BirthdayCake />
        
        <p 
          ref={quoteRef}
          className="text-xl md:text-2xl mt-12 mb-10 font-light leading-relaxed max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out delay-600"
        >
          "Another trip around the sun, another year of cosmic adventures. Today we celebrate your stellar existence!"
        </p>
        
        <div 
          ref={buttonRef}
          className="mt-8 opacity-0 translate-y-10 transition-all duration-700 ease-out delay-900"
        >
          <Link to="/wishes">
            <Button 
              size="lg"
              className="bg-space-teal hover:bg-space-teal/80 text-black font-medium px-8 py-6 rounded-full transition-all duration-300 group"
            >
              Explore Your Wishes
              <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-space-darker to-transparent z-1"></div>
    </div>
  );
};

export default Hero;
