import { useState, useEffect } from 'react';
import Link from 'next/link';
const Earn = () => {
 
  const [modelImage, setModelImage] = useState('/howto.png');



  useEffect(() => {
    const timer = setInterval(() => {
      setModelImage(prev => prev === '/howto.png' ? '/pop.png' : '/howto.png');
    }, 1500);
    return () => clearInterval(timer);  // Clean up on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Earn</h1>

      {/* Model image */}
      <div className="flex">
        <img className="m-2" src={modelImage} alt="Model" />
      </div>

      {/* Step by step explanation */}
      <div className="m-2 text-lg">
        <h2 className="font-semibold">Steps to Earn Credit:</h2>
        <ol>
          <li>Step 1: Open the Flagged Work</li>
          <li>Step 2: Take the Work and Moddify as per Request</li>
          <li>Step 3: Submit and Wait for Approval</li>
        </ol>
      </div>

      {/* A few vertical cards */}
      <div className="flex flex-col">
        <div className="card bordered m-2">
          <figure>
            <img src="/modify.gif" alt="modify gif" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Example</h2>
            <p>In this picture we removed shadow and lines of the face according to original, and added shadow and decreased highlights on the eyes.</p>
          </div>
        </div>

        <div className="card bordered m-2">
          <figure>
            <img src="/shock0.png" alt="character face1" width="500" />
            <span className='text-5xl p-8'>→</span>
            <img src="/shock1.png" alt="character face2" width="500" />
          </figure>
          <div className="card-body">
          
            <h2 className="card-title">DAO Submittion</h2>
            <p>DAO Approval Process *You can also directly buy part of episode to own/invest in content</p>
        
          <figure>
            <img src="/data.png" alt="dao flowchart" />
          </figure>
            <h2 className="card-title">Practice</h2>
            <p>Try to upload the picture of a scene and wait for the DAO to validate your work!</p>
            <Link href='/episodes/2'><button className='bg-purple-600 rounded p-2 mt-4 text-2xl'>Try Making Contribution!</button></Link>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Earn;
