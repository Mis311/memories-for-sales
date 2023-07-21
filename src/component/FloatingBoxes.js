import { useEffect, useState } from 'react';

const memories = [
  {
    title: "Discovering a Hidden Bookstore",
    description: "Tucked away in a narrow alley was a charming little bookstore filled with rare, ancient books. It was like stepping into another world.",
    isFictional: false,
    imageUrl: "https://example.com/images/bookstore.jpg"
  },
  {
    title: "Making the Perfect Cup of Coffee",
    description: "After months of experimenting, I finally brewed the perfect cup of coffee. Rich, aromatic and utterly satisfying, it was a small victory worth celebrating.",
    isFictional: false,
    imageUrl: "https://example.com/images/coffee.jpg"
  },
  {
    title: "Encountering a Majestic Deer in the Forest",
    description: "On a morning walk through the woods, I came across a graceful deer. We shared a silent, serene moment before it bounded off into the undergrowth.",
    isFictional: true,
    imageUrl: "https://example.com/images/deer.jpg"
  },
  {
    title: "Finding a Message in a Bottle",
    description: "Walking on the beach, I found a bottle with a message inside. It was a whimsical reminder of the mysterious, romantic side of life.",
    isFictional: true,
    imageUrl: "https://example.com/images/message.jpg"
  },
  {
    title: "Rescuing a Stray Kitten",
    description: "I found a scared, wet kitten under my porch during a rainstorm. It was a small act of kindness, but it made a huge difference to the little one.",
    isFictional: true,
    imageUrl: "https://example.com/images/kitten.jpg"
  }
];


const FloatingBoxes = () => {
  const [collectedMemories, setCollectedMemories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMemory, setCurrentMemory] = useState(null);

  const collectMemory = (memory) => {
    setCollectedMemories([...collectedMemories, memory]);
    setCurrentMemory(memory);
    setShowModal(true);
  };
  

  useEffect(() => {
    const boxCount = memories.length;
    const container = document.querySelector(".floatingBoxesContainer");

    for (let i = 0; i < boxCount; i++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.top = Math.random() * window.innerHeight + "px";
      box.style.left = Math.random() * window.innerWidth + "px";
      box.style.animationDuration = Math.random() * 2 + 3 + "s";
      box.style.animationDelay = Math.random() * 2 + "s";

      box.addEventListener('click', () => collectMemory(memories[i]));

      container.appendChild(box);
    }
  }, []);

  return (
    <div className="floatingBoxesContainer mt-12 z-0 cursor-pointer">
      {showModal && (
  <div className="text-black modal fixed bottom-0 right-0 mb-4 mr-4 p-4 bg-white border border-gray-300 rounded shadow-lg w-1/2 space-x-4">
    <img src={currentMemory.imageUrl} alt={currentMemory.title} className="w-full h-48 object-cover mb-4" />
    <h2 className="text-lg font-bold mb-2">{currentMemory.title}</h2>
    <p className="mb-4">{currentMemory.description}</p>
    <button className="px-4 p-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 " onClick={() => setShowModal(false)}>Close</button>
    <button className="px-4 p-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700" onClick={() => setShowModal(false)}>Save</button>

  </div>
)}

    </div>
  );
};

export default FloatingBoxes;
