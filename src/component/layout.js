import Link from 'next/link'
import WalletConnect from './WalletConnect'
export default function Layout({ children }) {
  return (
    <div className="min-h-screen p-12 bg-indigo-900 text-white bg-gradient-to-b from-purple-950 via-indigo-800 gradient-radial radient-gradient">
       <nav className="z-50 w-full absolute bg-transparent flex justify-end">
      <ul className="flex flex-row space-x-4 z-10">
      <li><Link href="/">Home</Link></li>
        <li><Link href="/game">Play</Link></li>
        <li><Link href="/earn">Contribute & Earn</Link></li>
        <li><Link href="/marketplace">Marketplace Mémoires</Link></li>
        <li><Link href="/digital-mind">Digital Mind (Beta)</Link></li>
        <li><WalletConnect /></li>
      </ul>
    </nav>
      <main>
        {children}
      </main>
    </div>
  )
}
