import React from 'react'
import { useRouter } from 'next/router'
import { FaGamepad, FaBookOpen, FaMusic } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { episodes } from '@/data/episodes'


export default function EpisodePage() {
  const router = useRouter()
  const { id } = router.query


  if (!id) return null;

  const episode = episodes[parseInt(id, 10) - 1];

  return (
    <div className="flex min-h-screen p-12 text-white">
 

    <div className="p-4">
      <h1 className="text-xl font-bold">{episode.title}</h1>
      <Image src={episode.image} width={600} height={400} alt={episode.title} />
      <p className="mt-4">{episode.description}</p>

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
          <Link href={`/collaboration/${episode.id}`}>
            <p className="bg-red-600 text-white p-2 rounded">
              Open for Collaboration
            </p>
          </Link>
        </div>
      )}
    </div>
    </div>
  )
}
