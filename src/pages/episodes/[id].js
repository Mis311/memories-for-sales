import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { FaGamepad, FaBookOpen, FaMusic,FaArrowRight , FaArrowLeft   } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { episodes } from '@/data/episodes'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'
import ABI_CONTRACT from '../../contract-abi/ABI_CONTRACT'
import axios from 'axios'
import { File, NFTStorage } from "nft.storage";


export default function EpisodePage() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState("");
  const [url, setUrl] = useState("");
  console.log('___files', files)

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })
  const myData = useContractRead({
    address: '0x127cbf19A44E9ED1C2D5E9Ed1d90F38bC8e976c8',
    abi: ABI_CONTRACT,
    functionName: 'getAllContributions',
  })
  console.log('__myData:', myData?.data)

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: '0x127cbf19A44E9ED1C2D5E9Ed1d90F38bC8e976c8',
    abi: ABI_CONTRACT,
    functionName: 'createContribution',
    args: [url],
  })

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
  const [selectedCollab, setSelectedCollab] = useState(null);

  const handleCollabSelect = (collab) => {
    setSelectedCollab(collab);
  };

  const handleCollabSubmit = (event) => {
    event.preventDefault();
    // handle submission, `selectedCollab` is the selected collaboration
    console.log(selectedCollab);
  };

  useEffect(() => {
    if (isCollabOpen) {
     
      setCollaborations([
        { id: 1, title: 'Request for music tribution', description: 'Feel free to submit OST of episode' },
        { id: 2, title: 'Request for manga ', description: 'Frame 2 character face' },
        // ...more collaborations
      ]);
    }
  }, [isCollabOpen]);

  const handleCollabToggle = () => {
    setIsCollabOpen(!isCollabOpen);
  };

  if (!id) return null;

  const episode = episodes[parseInt(id, 10) - 1];


  // UPLOAD PINATA
  const handleFiles = async event => {
    const updataData = new FormData();
    updataData.append("file", event.target.files[0]);
    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", updataData, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "2f7a99fef33b2783bde7",
        pinata_secret_api_key: "9082e887ce9262fcf525cd85b5a0da348a5b1fc3fb725bacdd5af3d80a051d5c",
      },
    });
    setFiles("https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash);
  };

  
  const saveToNFTStorage = async () => {
    try {
      const author = address
      const obj = {
        files,
        isAprove: false,
        aprover: "0xF5831958f93BDb8803000532E773649ACfc4AD66",
        author
      };
      console.log("obj", obj)

      const apiKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDc0N2E1MEVlMUZkNzUzZjkzYUM5MWYyNkUwNDMxMGRCZjY5ZWEzYjkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjQzMTk2MDkxMSwibmFtZSI6ImNvbW11bml0eS1wZXRzIn0.tADr_0uY9SstZFqVHhdezC6ora_glwrWKhToNkssG8w";

      const client = new NFTStorage({ token: apiKey });

      const metadata = await client.store({
        name: "Contributions",
        description: JSON.stringify(obj),
        image: new File([files], "imageName", { type: "image/*" }),
      });
      console.log("metadata", metadata);

      if (metadata) {
        console.log("metadata URL", metadata?.url);
        const url = metadata?.url.substring(7);
        const fullUrl = `https://cloudflare-ipfs.com/ipfs/${url}`;
        console.log("fullUrl", fullUrl);
        setUrl(fullUrl)
        // setDisplayUpload(false)
        // const saveToContract = await contract.createFoundraiser(fullUrl, targetAmmount);
        // const tx = await saveToContract.wait();
        // console.log("tx", tx);
        // history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        {isCollabOpen && (
          <form onSubmit={handleCollabSubmit}>
            {collaborations.map(collab => (
              <div key={collab.id} className="bg-gray-600 p-2 mt-2 rounded">
                <input 
                  type="radio" 
                  id={`collab-${collab.id}`}
                  name="collaboration"
                  value={collab.id}
                  onChange={() => handleCollabSelect(collab)}
                />
                <label htmlFor={`collab-${collab.id}`} className="ml-2 font-bold">{collab.title}</label>
                <p>{collab.description}</p>
              </div>
            ))}
            
            <label htmlFor="formFileImage5">+ Upload File</label>
            <input
              type="file"
              id="formFileImage5"
              onChange={handleFiles}
              defaultValue={files}
              style={{ display: "none" }}
              required
            />
            <button type="submit" onClick={saveToNFTStorage} className="mt-2 p-2 bg-blue-600 text-white rounded">
              saveToNFTStorage            
            </button>
            <button type="submit" onClick={write} className="mt-2 p-2 bg-blue-600 text-white rounded">
              Submit Collaboration
            </button>
          </form>
        )}
      </div>
    )}
           
    </div>
    </div>
  )
}
