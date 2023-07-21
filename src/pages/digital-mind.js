import { useEffect, useState } from 'react';

export default function DigitalMind() {
  const [dialogue, setDialogue] = useState("");

  useEffect(() => {
    const dialogues = ["Hello!", "Nice to meet you.", "How are you?", "I remembered last time I had an ice cream, a seagull came and took it away.", "How's the weather?"];
    
    // Change dialogue every 3 seconds
    setInterval(() => {
      let randomDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
      setDialogue(randomDialogue);
    }, 3000);
  }, []);

  return (
    <div className="flex justify-center items-center space-x-4">
      <img className="w-1/2 h-auto" src="/akira.png" alt="png_image" />
      <img className="w-1/4 h-auto" src="/akira_moving.gif" alt="gif_image" />
      <div className='w-1/4 flex flex-col'>
        <div className='container abolute min-height'>
      <p className="text-center text-xl">{dialogue}</p>
      </div>
      <input placeholder='How so?'></input>
      <button>Respond</button>
      </div>
    </div>
  );
};
