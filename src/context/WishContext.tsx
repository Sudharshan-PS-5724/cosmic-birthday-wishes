
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Wish {
  id: number;
  message: string;
  sender: string;
  guessed: boolean;
}

interface WishContextType {
  wishes: Wish[];
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>;
  currentWishIndex: number;
  setCurrentWishIndex: React.Dispatch<React.SetStateAction<number>>;
  markWishAsGuessed: (id: number) => void;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const useWishContext = () => {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error('useWishContext must be used within a WishProvider');
  }
  return context;
};

interface WishProviderProps {
  children: ReactNode;
}

export const WishProvider = ({ children }: WishProviderProps) => {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      message: "Happy birthday! May this year bring you all the cosmic wonders and celestial joys you deserve. Here's to another trip around the sun!",
      sender: "Emma",
      guessed: false
    },
    {
      id: 2,
      message: "Wishing you a stellar birthday filled with moments that shine as bright as the stars. May your day be as amazing as you are!",
      sender: "Michael",
      guessed: false
    },
    {
      id: 3,
      message: "On your special day, I'm sending wishes as vast as the galaxy. May your birthday be extraordinary, just like you!",
      sender: "Sophia",
      guessed: false
    },
    {
      id: 4,
      message: "Happy orbit around the sun! May this new age bring you endless adventures and cosmic blessings throughout the year.",
      sender: "Noah",
      guessed: false
    },
    {
      id: 5,
      message: "As you celebrate another year of existence in this universe, may your day be filled with stardust and your year with light!",
      sender: "Olivia",
      guessed: false
    }
  ]);
  
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  
  const markWishAsGuessed = (id: number) => {
    setWishes(prevWishes => 
      prevWishes.map(wish => 
        wish.id === id ? { ...wish, guessed: true } : wish
      )
    );
  };
  
  const value = {
    wishes,
    setWishes,
    currentWishIndex,
    setCurrentWishIndex,
    markWishAsGuessed
  };
  
  return <WishContext.Provider value={value}>{children}</WishContext.Provider>;
};
