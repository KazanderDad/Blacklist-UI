// components/investigators-page.tsx
'use client'

import { useState } from 'react'
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { LayoutComponent } from './layout'
import Link from 'next/link'

export function InvestigatorsPageComponent() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [loginStep, setLoginStep] = useState('email')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [organization, setOrganization] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)

  const handleEmailSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoginStep('passcode')
  }

  const handlePasscodeSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setLoginStep('registration')
  }

  const handleRegistrationSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsSignedIn(true)
    setLoginStep('email')
  }

  const handleSearch = () => {
    setShowSearchResults(true)
  }

  const renderLoginForm = () => {
    switch (loginStep) {
      case 'email':
        return (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input 
              placeholder="Email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
            />
            <Button type="submit" className="w-full bg-slate-700 hover:bg-slate-600">Send Passcode</Button>
          </form>
        )
      case 'passcode':
        return (
          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <Input placeholder="Passcode" type="text" required className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400" />
            <Button type="submit" className="w-full bg-slate-700 hover:bg-slate-600">Verify</Button>
          </form>
        )
      case 'registration':
        return (
          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <Input 
              placeholder="Name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
            />
            <Input 
              placeholder="Country" 
              required 
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
            />
            <Input 
              placeholder="Investigative Body" 
              required 
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
            />
            <Button type="submit" className="w-full bg-slate-700 hover:bg-slate-600">Complete Registration</Button>
          </form>
        )
    }
  }

  return (
    <LayoutComponent>
      <h1 className="text-2xl font-bold mb-6 text-slate-100">Investigator Dashboard</h1>
      <Card className="mb-6 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Search and Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Select Chain" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="ethereum">Ethereum</SelectItem>
                <SelectItem value="bitcoin">Bitcoin</SelectItem>
                <SelectItem value="binance">Binance Smart Chain</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search by account" className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
            <Input placeholder="Search by transaction" className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
            <Input 
              type="date" 
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-slate-700 border-slate-600 text-slate-100"
            />
            <Input 
              type="date" 
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-slate-700 border-slate-600 text-slate-100"
            />
          </div>
          <Button className="mt-4 bg-slate-700 hover:bg-slate-600" onClick={handleSearch}>Search</Button>
        </CardContent>
      </Card>

      {showSearchResults && (
        <Card className="mb-6 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li><Link href="/claim/" className="text-blue-400 hover:text-blue-300">Case #1234 - Ethereum Phishing Scam</Link></li>
              <li><Link href="/claim/" className="text-blue-400 hover:text-blue-300">Case #5678 - Bitcoin Ransomware Attack</Link></li>
              <li><Link href="/claim/" className="text-blue-400 hover:text-blue-300">Case #9101 - Binance Smart Chain Rug Pull</Link></li>
            </ul>
          </CardContent>
        </Card>
      )}

      {!isSignedIn && (
        <Card className="mb-6 bg-slate-800 border-slate-700">
          <CardContent>
            <p className="mb-4 text-slate-300">Sign in to save favorites and contact victims.</p>
            <Button onClick={() => setLoginStep('email')} className="bg-slate-700 hover:bg-slate-600">Sign In</Button>
          </CardContent>
        </Card>
      )}

      {isSignedIn && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">My Favorited Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li><Link href="/claim/4" className="text-blue-400 hover:text-blue-300">Case #1122 - Solana NFT Scam</Link></li>
              <li><Link href="/claim/5" className="text-blue-400 hover:text-blue-300">Case #3344 - Polygon Fake ICO</Link></li>
              <li><Link href="/claim/6" className="text-blue-400 hover:text-blue-300">Case #5566 - Cardano Impersonation Fraud</Link></li>
            </ul>
          </CardContent>
        </Card>
      )}

      {!isSignedIn && loginStep !== 'email' && (
        <Card className="mt-6 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-100">
              {loginStep === 'passcode' ? 'Enter Passcode' : 'Complete Registration'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderLoginForm()}
          </CardContent>
        </Card>
      )}
    </LayoutComponent>
  )
}