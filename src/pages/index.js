import Image from 'next/image'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa';
import SignUpForm from '@/component/SignUpForm';
import {episodes} from '../data/episodes'; 
import WalletConnect from '@/component/WalletConnect';
import YouTube from 'react-youtube';

export default function Home() {
  const videoRef = useRef(null);

  const handlePlay = () => {
    // Request fullscreen
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
      videoRef.current.msRequestFullscreen();
    }
  
    // Start playing
    videoRef.current.play();
  };
  

  const handleVideoClick = () => {

    window.location.href = 'https://forms.gle/pEQWCfsYu5wpEbdJ8';
  };

  return (
    <>

    <div className="flex min-h-screen p-12 bg-indigo-900 text-white bg-gradient-to-b from-purple-950 via-indigo-800 gradient-radial radient-gradient">
    {/* logo */}
    <div className="absolute top-3 left-12 mt-4 ml-4">
      <p className="text-3xl font-bold" style={{textShadow: '0 0 15px #CCF, 0 0 40px #CCF, 0 0 40px #CCF, 0 0 40px #90D, 0 0 40px #90D, 0 0 80px #90D'}}>Memories for Sales</p>
    </div>

 

      {/* Left Navigation Bar */}
      <div className="w-1/4 bg-slate-900 text-white p-8 rounded-tl-md rounded-bl-md drop-shadow-xl mt-12">
     
        <h2 className="text-xl font-bold mb-4 text-gray-200">Menu</h2>
        <ul className="space-y-4">
          <li><Link href="/">Home</Link></li>
 
          <li><Link href="/game">Play</Link></li>
          <li><Link href="/earn">Contribute & Earn</Link></li>
          <li><Link href="/marketplace">Marketplace Mémoires</Link></li>
          <li><Link href="/digital-mind">Digital Mind (Beta)</Link></li>
      <li><WalletConnect /></li>
        </ul>
      </div>

      {/* Main Content */}

      <div className="w-3/4 text-dark-blue mt-12">
        <header className="w-full bg-black p-6 mb-8 rounded-tr-md flex flex-row">
        <YouTube
  videoId="VBrD-XgKExs" 
  opts={{
    height: '400',
    width: '600',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  }}
  onEnd={handleVideoClick} // change this if you want something to happen at the end of the video
/>
          <div className='flex flex-col p-12'>
          <h1 className="text-3xl font-bold drop-shadow-xl">Memories for Sales</h1>
          <p className="mt-2">
            In the futuristic city of Neo Tokyo, inpoverished youth Kaiya sells his memories illegally. When Kaiya finds his path to become a city hero, his missing memoriesg awaken the ghost from the past.
          </p>
          <button className="btn btn-primary mt-4 text-white">Apply to Read or Contribute</button>
          </ div>
        </header>

        <main className="flex flex-wrap">
  {episodes.length > 0 ? (
    episodes.map((episode) => (
      <div key={episode.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
        <div className="bg-white shadow-md rounded-md p-4 h-full flex flex-col">
          <img src={episode.image} alt={episode.title} className="rounded mb-4" />
          {episode.openForCollab && (
            <button className="btn btn-secondary absolute m-2 bg-vibrant-orange text-dark-blue">
              Open
            </button>
          )}
          <h2 className="text-lg font-semibold mb-2 text-black">Episode {episode.id-1}: {episode.title}</h2>
          <p className='text-black'>{episode.description}</p>
          <Link href={`/episodes/${episode.id}`}>
            <button className=" mt-auto p-2 bg-indigo-700 text-white rounded flex items-center">
              <FaArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p>Loading...</p>
  )}
</main>

        <footer>
          <SignUpForm />
        </footer>
      </div>
    </div>
    </>
  )
}