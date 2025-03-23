import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Wish {
  id: number;
  message: string;
  sender: string;
  guessed: boolean;
  guessedCorrectly?: boolean;
}

interface WishContextType {
  wishes: Wish[];
  setWishes: React.Dispatch<React.SetStateAction<Wish[]>>;
  currentWishIndex: number;
  setCurrentWishIndex: React.Dispatch<React.SetStateAction<number>>;
  markWishAsGuessed: (id: number, isCorrect?: boolean) => void;
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
    "id": 1,
    "message": "Thank you for being a good akka during my college years and the years to come.",
    "sender": "Tarun",
    "guessed": false
  },
  {
    "id": 2,
    "message": "Wishing you many more happy returns of the day Fidelity Employee Swetha R (Ka**u s*haa) 🌚\nMay you get all you desire in your life 🥰\nWishes from your first trustworthy classmate 😂",
    "sender": "Felix",
    "guessed": false
  },
  {
    "id": 3,
    "message": "Happiestt birthdayyy swe_kv🥳❣️ (or should I call u by tat name😛) You're finally 21!! Wishing you another year filled with joy, laughter, and all the things you love❤️ This birthday marks another year of our friendship as well 💕😁(not revealing the number of years) Also not revealing anything else that will make u find me easier😂 I so wish u turn 22 before me😭 now find who I am😙",
    "sender": "Anjana",
    "guessed": false
  },
  {
    "id": 4,
    "message": "Helloooo Swetha kaaaa!\nA very very happy birthday to you... Have been kind enough to still continue calling you Akka while you have attained the post of Senior Aunty now🤣\n\nSer ser sorry.... Enuf kadupu aairpa... Paakamalaye theridhu...\n\nSo to the queen of typos and mass laughs and to the one who gave me the nickname people call so often they forget my real name😂!\n\nAnd I honorably give myself the award of best detective this day to have found Seetha's Ramam with my detective proficiency (stalking skills)!\n\nIppo nejamave kalaai over... To some nice words segment...\n\nTo the one with the most beautiful eyes, to the one with the ability to draft beautiful lines of poetry, to the one who gives the most honest opinions and to a trustworthy friend...\n\nIniya piranthanaal vaazhthukal! May your eyes glitter more with you achieving all that you dreamed for!!",
    "sender": "Chinmaiyee",
    "guessed": false
  },
  {
    "id": 5,
    "message": "Heyyy KV..happieee 21!! 🩷\nEven though we had our ups and downs..you are one of my cherished friends. Bday nu solala😂..you are one of a kind and I hope that all your dreams in your heart come true and the year is filled with things that make u happy ✨\n\nhttps://pin.it/3CN3XLQbp",
    "sender": "Sudhiksha",
    "guessed": false
  },
  {
    "id": 6,
    "message": "Hey Swetha,\n\nHappy Birthday!\nI'm thinking about your crazy infectious smile (read laughter) and your super optimistic vibe. Here's to many more adventures, laughter-filled moments, and memories to cherish!\n\nCheers!",
    "sender": "Nandana",
    "guessed": false
  },
  {
    "id": 7,
    "message": "Happy birthday! I hope you get to do your big Instagram candle celebration next year. I also hope to hear many more interesting stories during lab classes. Enjoy the day CAT 2 laam parava ille.",
    "sender": "Suraj",
    "guessed": false
  },
  {
    "id": 8,
    "message": "Happy birthday Swetha!! Have you heard of ahead-of-time compilers? Well that's great. Takes one to know one it is. I am pretty sure you have one too. Your sense of punctuality is admirable and it is that, I hold you for. Your sixth sense for time is impeccable and I feel the need to extend my appreciation for keeping me on track for the open elective xD. A remnant oscillating between principles and comfort, I find you having great perspectives and a creative mind. Lastly, like you would say, 'Take those variables and play away and the expression you embody changes, after all you are the narrator.' Have a great day and a better year ahead. Cheers.",
    "sender": "Sreekar",
    "guessed": false
  },
  {
    "id": 9,
    "message": "Happy Birthday Swetha! 🎉 Your positivity and quick thinking are truly inspiring, and I really fascinate on how you always make big bold decisions without any hesitation. Wishing you a year filled with exciting opportunities, happiness, and I hope this year gets adventurous as you are. Keep being yourself fearless & unstoppable enjoy the day to your fullest ✨🎂🥳",
    "sender": "Yogesh",
    "guessed": false
  },
  {
    "id": 10,
    "message": "Happy Birthday, Swetha! 🎉\nYou are someone who speaks your heart, stands strong for what you believe in, and faces everything with confidence and grace✨. Your boldness makes you truly special! Wishing you a year filled with happiness, success, and endless adventures🥳🥳",
    "sender": "Yuthika",
    "guessed": false
  },
  {
    "id": 11,
    "message": "Happy Birthday Swetha K V. You were one of my first friends in college, but over time, we both took different paths. However, Sportium brought us back together, giving us one last chance to work side by side before college ends. During that time, we not only worked together but also rediscovered our friendship. We had long conversations, often without any real content, yet somehow meaningful. We also talked about our lives, had long gossip sessions, and shared moments that will always be special. Wishing you all the happiness and successful year ahead.",
    "sender": "Vijay R S",
    "guessed": false
  },
  {
    "id": 12,
    "message": "Wishing you a very Happy Birthday Swethaaa! 🫶🏻🥳\nIt's been really great knowing you as a friend😊.\n\nFrom random fun during lab sessions to just passing time with little things, those moments have made college life a lot more enjoyable🫰🏻.\n\nHope this year brings you lots of happiness, success, and everything you wish for. May you achieve all your goals and have plenty of reasons to smile along the way. Wishing you all the very best for the future, keep being the amazing person you are!✨✨\n\nEnjoy your day to the fullest!🎉\n\nBest wishes...",
    "sender": "Tafhy",
    "guessed": false
  },
  {
    "id": 13,
    "message": "Hi Darling. Okay I'll give myself away at the start itself. It feels like yesterday I was like OMG it's swetha's bday i have to write a poem....\nAnd now you're 21...HAPPY BIRTHDAY HUMAN!!!!!🎉🎉🎉🎉\nOkay so you have been the bestest friend i could have asked for and granted there are times when i got super upset cuz of stuff (yes im thinking of the photo booth) but you've always brought out the 'different' in me... and I think I'm the same too? maybe?\nI'm glad for all the moments we got. Im glad to see you grow into the woman you are meant to be. No matter what happens, you'll always have a friend in me...\nSo if you happen to have a dead body to bury.... Dw I'll bring a shovel :)\nHere's the best of love, life and all things nice in all the years ahead... For you ❣️\nPS: you have to wait for that crochet shrug a little longer, darling ;)",
    "sender": "Thejesswini",
    "guessed": false
  },
  {
    "id": 14,
    "message": "We do not know each other so well, but I understood you as the brave girl who is versatile in everything. Let all your wishes be granted by the Shooting stars!!",
    "sender": "Madhukrishaa",
    "guessed": false
  },
  {
    "id": 15,
    "message": "Hey hi Swetha! Happy birthday :)\nA huge fan of your portrait photos 😂❤!\nMay this year be a wonderful year for you! All the very bestt",
    "sender": "Dharunika",
    "guessed": false
  },
  {
    "id": 16,
    "message": "Hiiiiiiiiii Swethaaa! Many more happy returns of the dayyy! 😂 I know 21 is a big age! Also, I'm sure you'll come out with flying colors... or wings, who knows?!  Happy birthdayyyy againnnn! 💗",
    "sender": "Supreethaa",
    "guessed": false
  },
  {
    "id": 17,
    "message": "Hi kvs,\nAs far as this festival goes, there are things I am grateful for and you are one of them. Thank you for countless of times that you have heard my rants and badmouthed me out to help me get through these difficult times. You do offer me a shoulder to cry on when my heart is filled with joy. You are my beacon of hope, for you make the unbearable pain worth enduring. You have all the reasons to consider yourself as lucky to have an intelligent and handsome me around. 😉 Your company always changes unimaginative moments to moments to remember. Don't worry about your age… alcohol will make it all better😂\nHappy birthday KVS 🎉",
    "sender": "Ram",
    "guessed": false
  },
  {
    "id": 18,
    "message": "Happiee birthday Sweths!!!!. Have fun turning 21 🍾😏 It feels like just yesterday we finished school and joined college and here we are celebrating your last year of college life. So make some memories and cherish every moment happening this year.\nKeep smiling and laughing (don't lose your style) and keep achieving many things. I really wish u all the best for your upcoming job and interviews as u will be entering into different world. Be strong and take care of yourself.. 💕",
    "sender": "Harshini",
    "guessed": false
  },
  {
    "id": 19,
    "message": "To the Birthday Queen (who totally has no clue who this is),\n\nHappy 21st, you absolute icon! 🎉 You’re strong, kind, and effortlessly likable. You push through doubts, stay ahead, and—let’s be real—best-dressed in our friend group. Statement or simple, you always pull it off.\n\nNow, Miss Independent, I know you want to do it all alone, but even queens have royal advisors. Just remember, you’ve got people (including this totally anonymous well-wisher) who always have your back.\n\nSo here’s to Swetha at 21—great outfits, good company, and zero wardrobe dilemmas. Stay fabulous!\n\nYour Favorite Mystery Well-Wisher 😌🎂✨",
    "sender": "Deshna",
    "guessed": false
  },
  {
    "id": 20,
    "message": "A person whose loud laugh couldn't be easily erased from my mind. Who always has a perspective that others may find interesting, if at all they truly understood them. The one I've seen who stands for the self, no matter what the world thinks or the situation around her. May this person smile throughout her life with God's blessings and lead a successful life. Happy birthday, Swe, as you step into your twenties! 🎉✨",
    "sender": "Singaram",
    "guessed": false
  },
  {
    "id": 21,
    "message": "Hi Swetha,\nWishing you a happiest bday 🥳💫! You are a person who is fun to be around… something that I wanna learn from you is your confidence. Happy 21!!!!✨",
    "sender": "Shreya",
    "guessed": false
  },
  {
    "id": 22,
    "message": "Second chance for me. Last chance for us. Let’s try to enjoy it to the fullest. Happiest birthday to the silly yet true girl I have ever seen. May your success be everlasting and continue the dream run. Time flies, yes, but I think it flies because people need to treasure the moments. Two highly conflicting persons. Looking forward to more fights and debates…\n\nSudharshan P S",
    "sender": "Sudharshan",
    "guessed": false
  }
  ]);
  
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  
  const markWishAsGuessed = (id: number, isCorrect: boolean = false) => {
    setWishes(prevWishes => 
      prevWishes.map(wish => 
        wish.id === id ? { ...wish, guessed: true, guessedCorrectly: isCorrect } : wish
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
