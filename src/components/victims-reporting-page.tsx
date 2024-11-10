// src/components/victims-reporting-page.tsx
'use client'

import { useState } from 'react'
import { Button } from "components/ui/button"
import { Input } from "components/ui/input"
import { Textarea } from "components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "components/ui/dialog"
import { Progress } from "components/ui/progress"
import { LayoutComponent } from './layout'
import { CubidSDK, CubidWidget } from 'cubid-sdk';

// Initialize with your dapp_id and api_key
const sdk = new CubidSDK(process.env.NEXT_PUBLIC_DAPP_ID, process.env.NEXT_PUBLIC_API_KEY);

export function VictimsReportingPageComponent() {
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
  const [humanScore, setHumanScore] = useState(50)
  const [isMinted, setIsMinted] = useState(false)

  const handleVerifyOwnershipSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsOtpModalOpen(true)
  }
  const handleEmailOrPhoneSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsOtpModalOpen(true)
  }

  const handleOtpSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsOtpModalOpen(false)
    setHumanScore(humanScore + 25)
  }

  const handleMintToChain = () => {
    setIsMinted(true)
  }

  // SDK Function Handlers
  /*
  const createUser = async () => {
    if (user) {
        setLoading('createUser');
        try {
            const response = await sdk.createUser({ email: user.email, phone: '' });
            const newUuid = response.user_id;
            setUser({ ...user, uuid: newUuid });
            setSdkResponse(response);
            localStorage.setItem('user_uuid', newUuid); // Save UUID to localStorage
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setLoading(null);
        }
    }
};

const fetchApproxLocation = async () => {
    if (user?.uuid) {
        setLoading('fetchApproxLocation');
        try {
            const response = await sdk.fetchApproxLocation({ user_id: user.uuid });
            setSdkResponse(response);
        } catch (error) {
            console.error("Error fetching approximate location:", error);
        } finally {
            setLoading(null);
        }
    }
};

const fetchExactLocation = async () => {
    if (user?.uuid) {
        setLoading('fetchExactLocation');
        try {
            const response = await sdk.fetchExactLocation({ user_id: user.uuid });
            setSdkResponse(response);
        } catch (error) {
            console.error("Error fetching exact location:", error);
        } finally {
            setLoading(null);
        }
    }
};

const fetchIdentity = async () => {
    if (user?.uuid) {
        setLoading('fetchIdentity');
        try {
            const response = await sdk.fetchIdentity({ user_id: user.uuid });
            setSdkResponse(response);
        } catch (error) {
            console.error("Error fetching identity:", error);
        } finally {
            setLoading(null);
        }
    }
};

const fetchRoughLocation = async () => {
    if (user?.uuid) {
        setLoading('fetchRoughLocation');
        try {
            const response = await sdk.fetchRoughLocation({ user_id: user.uuid });
            setSdkResponse(response);
        } catch (error) {
            console.error("Error fetching rough location:", error);
        } finally {
            setLoading(null);
        }
    }
};

const fetchUserData = async () => {
    if (user?.uuid) {
        setLoading('fetchUserData');
        try {
            const response = await sdk.fetchUserData({ user_id: user.uuid });
            setSdkResponse(response);
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(null);
        }
    }
};
*/

const handleFetchScore = async () => {
  try {
    const response = await sdk.fetchScore({ user_id: '53291732-de93-4715-b4fa-d05181f7de8c' });
    setHumanScore((prevScore) => prevScore + response);
  } catch (error) {
    console.error("Error fetching score:", error);
  }
};

  return (
    <LayoutComponent>
      <h1 className="text-2xl font-bold mb-6 text-slate-100">Report a Scam</h1>

      <Card className="mb-6 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Scam Details - will be posted publicly</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Describe the scam in detail. What happened?" className="mb-4 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            <Select>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Scam Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="phishing">Phishing</SelectItem>
                <SelectItem value="rugpull">Rug Pull</SelectItem>
                <SelectItem value="ponzi">Ponzi Scheme</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input placeholder="Amount Lost" type="number" step="0.000001" className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
            <Select>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="eth">ETH</SelectItem>
                <SelectItem value="btc">BTC</SelectItem>
                <SelectItem value="bnb">BNB</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Estimated USD Value" type="number" step="0.01" className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
          </div>
          <Input placeholder="Perpetrator accounts (comma-separated)" className="mb-4 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
          <Input placeholder="Related transactions (comma-separated)" className="mb-4 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
          <Input type="file" accept="image/*,.pdf" multiple className="bg-slate-700 border-slate-600 text-slate-100" />
          <p className="mb-4 text-slate-300">This part of the report will be publicised on-chain and can be accessed by anyone, anywhere at any time, worldwide. Please ensure no personal data has been included above.</p>
        </CardContent>
      </Card>

      <Card className="mb-6 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Private and Confidential Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyOwnershipSubmit} className="flex space-x-2 mb-4">
            <Input placeholder="My account that got scammed" className="mb-4 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
            <Button type="submit" className="bg-slate-700 hover:bg-slate-600">Sign</Button>
          </form>
          <form onSubmit={handleEmailOrPhoneSubmit} className="flex space-x-2 mb-4">
            <Input placeholder="Email or Phone Number" className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
            <Button type="submit" className="bg-slate-700 hover:bg-slate-600">Verify</Button>
          </form>
          <div className="mb-4">
            <p className="mb-2 text-slate-300">Human Score: {humanScore}%</p>
            <Progress value={humanScore} className="w-full bg-slate-700" />
          </div>
          <Button onClick={() => setHumanScore(Math.min(humanScore + 10, 100))} className="bg-slate-700 hover:bg-slate-600">
            Increase Trustworthiness
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6 bg-slate-800 border-slate-700">
          <CardHeader>
          <CardTitle className="text-slate-100">
                  Increase your score
              </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center mt-4">
              <div className="text-white grid grid-cols-3 gap-3">
                  <CubidWidget stampToRender="google" uuid={`53291732-de93-4715-b4fa-d05181f7de8c`} page_id="35" api_key={process.env.NEXT_PUBLIC_API_KEY ?? ""} />
                  <CubidWidget stampToRender="twitter" uuid={`53291732-de93-4715-b4fa-d05181f7de8c`} page_id="35" api_key={process.env.NEXT_PUBLIC_API_KEY ?? ""} />
                  <CubidWidget stampToRender="discord" uuid={`53291732-de93-4715-b4fa-d05181f7de8c`} page_id="35" api_key={process.env.NEXT_PUBLIC_API_KEY ?? ""} />
                  <CubidWidget stampToRender="github" uuid={`53291732-de93-4715-b4fa-d05181f7de8c`} page_id="35" api_key={process.env.NEXT_PUBLIC_API_KEY ?? ""} />
                  <CubidWidget stampToRender="facebook" uuid={`53291732-de93-4715-b4fa-d05181f7de8c`} page_id="35" api_key={process.env.NEXT_PUBLIC_API_KEY ?? ""} />
                  <Button onClick={handleFetchScore}>Fetch Score</Button>
              </div>
          </CardContent>
      </Card>

      <Card className="mb-6 bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-slate-300">Please report this crime to your local authorities if you haven&apos;t already. </p>
          <Input placeholder="Police report reference number" className="mb-4 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
          <Input type="file" accept="image/*,.pdf" className="mb-4 bg-slate-700 border-slate-600 text-slate-100" />
          <p className="mb-4 text-slate-300">This information will be kept private. You police report reference number will only be shared with lawfully identified employees of insurance companies and law enforcement agencies. You contact details will not be shared with anyone. However, we will provide a messaging service, so please monitor your email and/or phone for automated messages from Blacklist.</p>
          <Button onClick={handleMintToChain} className="bg-slate-700 hover:bg-slate-600">Save to Chain</Button>
        </CardContent>
      </Card>

      {isMinted && (
        <Card className="bg-slate-800 border-slate-700">
          <CardContent>
            <p className="text-center py-4 text-slate-300">
              Your claim has been saved. View your case details here: 
              <a href="/claim/1234" className="text-blue-400 hover:text-blue-300 ml-1">Case #1234</a>
            </p>
          </CardContent>
        </Card>
      )}

      <Dialog open={isOtpModalOpen} onOpenChange={setIsOtpModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-slate-100">Enter One-Time Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOtpSubmit}>
            <Input placeholder="Enter OTP" className="mb-4 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400" />
            <DialogFooter>
              <Button type="submit" className="bg-slate-700 hover:bg-slate-600">Verify</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </LayoutComponent>
  )
}