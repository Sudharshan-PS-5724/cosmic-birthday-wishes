
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Stars from '@/components/Stars';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      <Stars count={200} />
      
      <div className="glass-card p-10 text-center max-w-md animate-fade-in-up">
        <h1 className="text-6xl font-display font-bold mb-4 shimmer-text">404</h1>
        <p className="text-xl text-gray-300 mb-6">This cosmic destination doesn't exist in our universe</p>
        <Link to="/">
          <Button className="bg-space-purple hover:bg-space-purple/80 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Return to the Stars
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
