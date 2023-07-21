import 'tailwindcss/tailwind.css'
import 'daisyui/dist/full.css'

export default function Marketplace() {
  const nfts = [
    { id: 1, name: 'NFT 1', image: '/path/to/image1', description: 'This is NFT 1', price: '2.5 ETH', owner: '0xabCD...' },
    { id: 2, name: 'NFT 2', image: '/path/to/image2', description: 'This is NFT 2', price: '5 ETH', owner: '0xefGH...' },
    // ... add more NFTs
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl mb-6">NFT Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map(nft => (
          <div key={nft.id} className="card bordered">
            <figure>
              <img className="w-full h-64 object-cover mb-4 rounded" src={nft.image} alt={nft.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{nft.name}</h2>
              <p>{nft.description}</p>
              <div className="card-actions">
                <div className="badge badge-primary">{nft.price}</div>
                <div className="badge badge-outline">Owner: {nft.owner}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
