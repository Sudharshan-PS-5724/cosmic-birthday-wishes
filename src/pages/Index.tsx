
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stars from '@/components/Stars';

const Index: React.FC = () => {
  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Stars count={150} />
      <Navbar />
      <Hero name="Alex" />
    </div>
  );
};

export default Index;
