
import React, { useState, useEffect, useRef } from 'react';
import { Wish, useWishContext } from '@/context/WishContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface WishCardProps {
  wish: Wish;
  onNext: () => void;
}

const WishCard: React.FC<WishCardProps> = ({ wish, onNext }) => {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { markWishAsGuessed } = useWishContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [visibleMessage, setVisibleMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
    if (cardRef.current) {
      setTimeout(() => {
        cardRef.current?.classList.add('opacity-100', 'translate-y-0');
      }, 300);
    }
    
    // Text animation
    if (messageIndex < wish.message.length) {
      const timer = setTimeout(() => {
        setVisibleMessage(prev => prev + wish.message[messageIndex]);
        setMessageIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timer);
    }
  }, [wish.message, messageIndex]);
  
  const handleGuess = () => {
    if (guess.toLowerCase() === wish.sender.toLowerCase()) {
      setIsCorrect(true);
      markWishAsGuessed(wish.id);
      setTimeout(() => {
        onNext();
      }, 2000);
    } else {
      setAttempts(prev => prev + 1);
      if (attempts >= 4) {
        setRevealed(true);
        markWishAsGuessed(wish.id);
        setTimeout(() => {
          onNext();
        }, 3000);
      }
      setGuess('');
    }
  };
  
  const handleSkip = () => {
    setRevealed(true);
    markWishAsGuessed(wish.id);
    setTimeout(() => {
      onNext();
    }, 1500);
  };
  
  return (
    <div 
      ref={cardRef}
      className="glass-card p-6 md:p-8 max-w-2xl w-full mx-auto opacity-0 translate-y-20 transition-all duration-700 ease-out"
    >
      {/* Comet trail particles */}
      <div className="absolute top-0 right-0 transform -translate-y-full">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 50}px`,
              right: `${Math.random() * 50}px`,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 mr-2 text-space-teal" />
        <h3 className="text-lg font-medium text-space-teal">Cosmic Message</h3>
      </div>
      
      <div className="mb-8 min-h-[120px]">
        <p className="text-xl leading-relaxed">"{visibleMessage}"</p>
      </div>
      
      <div className={cn(
        "transition-all duration-500",
        (isCorrect || revealed) ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <p className="mb-2 text-sm font-medium text-gray-300">
          Guess who sent this wish? ({5 - attempts} attempts left)
        </p>
        
        <div className="flex gap-2">
          <Input
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter name..."
            className="flex-1 bg-space-darker/50 border-space-purple/30 focus:border-space-teal"
            onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
          />
          
          <Button 
            onClick={handleGuess}
            className="bg-space-purple hover:bg-space-purple/80"
          >
            Guess
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          className="mt-4 text-sm text-gray-400 hover:text-white"
          onClick={handleSkip}
        >
          Skip this wish
        </Button>
      </div>
      
      <div className={cn(
        "transition-all duration-500 transform",
        (isCorrect || revealed) ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute pointer-events-none"
      )}>
        <div className="text-center p-4 rounded-lg bg-space-darker/50 border border-space-purple/20">
          {isCorrect ? (
            <>
              <p className="text-xl font-medium text-space-teal mb-2">That's correct!</p>
              <p className="text-gray-300">This wish was from {wish.sender}</p>
            </>
          ) : (
            <>
              <p className="text-gray-300 mb-2">This wish was from</p>
              <p className="text-2xl font-medium shimmer-text">{wish.sender}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishCard;
