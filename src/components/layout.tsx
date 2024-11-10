'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function LayoutComponent({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <header className="py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Blacklist
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <Link href="/victims" className="hover:text-slate-300">Victims</Link>
            <Link href="/investigators" className="hover:text-slate-300">Investigators</Link>
            <ConnectButton /> {/* Connect Wallet button from RainbowKit */}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
