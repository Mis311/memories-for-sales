import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { FaGamepad, FaBookOpen, FaMusic,FaArrowRight , FaArrowLeft   } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { episodes } from '@/data/episodes'


export default function EpisodePage() {
  
  const router = useRouter()
  const { id } = router.query
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [isCollabOpen, setIsCollabOpen] = useState(false);
  const [collaborations, setCollaborations] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };

  useEffect(() => {
    if (isCollabOpen) {
     
      setCollaborations([
        { id: 1, title: 'Collaboration 1', description: 'Description for collaboration 1' },
        { id: 2, title: 'Collaboration 2', description: 'Description for collaboration 2' },
        // ...more collaborations
      ]);
    }
  }, [isCollabOpen]);

  const handleCollabToggle = () => {
    setIsCollabOpen(!isCollabOpen);
  };

  if (!id) return null;

  const episode = episodes[parseInt(id, 10) - 1];

  return (
    <div className="flex min-h-screen p-12 text-white">
 

    <div className="p-4">
      <h1 className="text-xl font-bold">{episode.title}</h1>   
      {episode.id > 1 && 
    <Link href={`/episodes/${episode.id-1}`}>
        <button className='mt-auto p-2 bg-indigo-700 text-white rounded flex items-center'><FaArrowLeft /></button>
    </Link>
}

{episode.id < episodes.length && 
    <Link href={`/episodes/${episode.id+1}`}>
        <button className='mt-auto p-2 bg-indigo-700 text-white rounded flex items-center'><FaArrowRight /></button>
    </Link>
}

      <Image src={episode.image} width={600} height={400} alt={episode.title} />
      <p className="mt-4">{episode.description}</p>

<p className="mt-4">{episode.text}</p>
{episode.images && episode.images.length > 0 && (
  <>
    {episode.images[0] && <Image src={episode.images[0]} width={600} height={400} alt={episode.title} />}
    {episode.images[1] && <Image src={episode.images[1]} width={600} height={400} alt={episode.title} />}
  </>
)}

{episode.manga && episode.manga.length > 0 && (
  <>
    {episode.manga[0] && <Image src={episode.manga[0]} width={600} height={400} alt={episode.title} />}
    {episode.manga[1] && <Image src={episode.manga[1]} width={600} height={400} alt={episode.title} />}
  </>
)}
 <div className="mt-8 flex gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white p-2 rounded">
          <FaGamepad />
          Play Game
        </button>


        <button className="flex items-center gap-2 bg-green-600 text-white p-2 rounded">
          <FaBookOpen />
          Read Novel
        </button>

        <button className="flex items-center gap-2 bg-purple-600 text-white p-2 rounded">
          <FaMusic />
          Listen Music
        </button>
      </div>

      {episode.openForCollab && (
        <div className="mt-4">
          <button onClick={handleCollabToggle} className="bg-red-600 text-white p-2 rounded">
            Open for Collaboration
          </button>
          {isCollabOpen && collaborations.map(collab => (
            <div key={collab.id} className="bg-gray-600 p-2 mt-2 rounded">
              <h3 className="font-bold">{collab.title}</h3>
              <p>{collab.description}</p>
            </div>
          ))}
           {/* Attach file and submit form */}
      <form className="m-2" onSubmit={handleSubmit}>
        <label>
          Attach a file:
          <input type="file" onChange={handleFileChange} />
        </label>

        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
        </div>
      )}
    </div>
    </div>
  )
}
