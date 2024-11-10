'use client'

import { useState } from 'react'
import { Button } from "components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "components/ui/dialog"
import { Textarea } from "components/ui/textarea"
import { LayoutComponent } from './layout'

export function ClaimDetailsPageComponent() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <LayoutComponent>
      <h1 className="text-2xl font-bold mb-6 text-slate-100">Claim Details - Case #1234</h1>
      <Card className="mb-6 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Case Information</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <p><strong className="text-slate-100">Chain:</strong> Ethereum</p>
          <p><strong className="text-slate-100">Reported Date:</strong> 2024-03-15</p>
          <p><strong className="text-slate-100">Scam Type:</strong> Phishing</p>
          <p><strong className="text-slate-100">Amount Lost:</strong> 5 ETH</p>
          <p><strong className="text-slate-100">Description:</strong> The victim received an email claiming to be from a popular DeFi platform, asking them to verify their wallet. Upon clicking the link and connecting their wallet, the funds were transferred out.</p>
        </CardContent>
      </Card>
      <Card className="mb-6 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Evidence</CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <p><strong className="text-slate-100">Perpetrator Accounts:</strong></p>
          <ul className="list-disc pl-5 mb-4">
            <li>0x1234...5678</li>
            <li>0x9876...5432</li>
          </ul>
          <p><strong className="text-slate-100">Related Transactions:</strong></p>
          <ul className="list-disc pl-5">
            <li>0xabcd...efgh</li>
            <li>0xijkl...mnop</li>
          </ul>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Button 
          onClick={() => setIsFavorited(!isFavorited)}
          className={`${isFavorited ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-700 hover:bg-slate-600'}`}
        >
          {isFavorited ? 'Remove from Favorites' : 'Save to Favorites'}
        </Button>
        <Button onClick={() => setIsContactModalOpen(true)} className="bg-slate-700 hover:bg-slate-600">
          Contact the Victim
        </Button>
      </div>

      <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-slate-100">Contact the Victim</DialogTitle>
          </DialogHeader>
          <Textarea 
            placeholder="Enter your message to the victim" 
            className="min-h-[100px] bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" 
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContactModalOpen(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Cancel
            </Button>
            <Button onClick={() => setIsContactModalOpen(false)} className="bg-slate-700 hover:bg-slate-600">
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </LayoutComponent>
  )
}