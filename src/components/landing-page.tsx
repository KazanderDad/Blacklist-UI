"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { LayoutComponent } from "./layout";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

export function LandingPageComponent() {
  const [showScrollButton, setShowScrollButton] = useState<"down" | "up">(
    "down"
  );
  const [searchParams, setSearchParams] = useState("");
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Toggle between down and up arrow based on scroll position
      if (window.scrollY > 50) {
        setShowScrollButton("up");
      } else {
        setShowScrollButton("down");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(
          `/api/search?query=${encodeURIComponent(searchParams)}`
        );
        console.log("response", response.data);
        if (
          response.data &&
          typeof response.data === "object" &&
          "result" in response.data
        ) {
          setSearchResult((prevResults) => [...prevResults, response.data]);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  return (
    <LayoutComponent>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md">
            <Input
              type="search"
              placeholder="Search for a case..."
              className="bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-400"
              value={searchParams}
              onChange={(e) => setSearchParams(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </div>
      {searchResult && (
        <div className="p-4 bg-slate-800 text-slate-100">
          <h2 className="text-2xl font-bold mb-2">Search Results</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b border-slate-700 p-2">Search Param</th>
                <th className="border-b border-slate-700 p-2">Result</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((result: any, index: number) => (
                <tr key={index}>
                  <td className="border-b border-slate-700 p-2">
                    {result.searchParams.query}
                  </td>
                  <td className="border-b border-slate-700 p-2">
                    {result.result ? (
                      <span className="text-red-500">SPAMMER X</span>
                    ) : (
                      <span className="text-green-500">CLEAN ✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Blacklist</h1>
          <p className="text-xl mb-8 text-slate-300">
            Blacklist is a platform for reporting and investigating blockchain
            scam transactions. We aim to provide recourse for victims and tools
            for investigators to combat fraud.
          </p>
          <div className="flex justify-center space-x-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-slate-700 hover:bg-slate-600"
            >
              <Link href="/victims">I want to report a theft</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-slate-700 hover:bg-slate-600"
            >
              <Link href="/investigators">I&apos;m an Investigator</Link>
            </Button>
          </div>
          <p className="mb-8 text-slate-400">
            Help us maintain and improve this platform to fight against
            blockchain fraud.
          </p>
          <Button asChild className="bg-slate-700 hover:bg-slate-600">
            <a
              href="https://www.buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Support Us on Buy Me a Coffee
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
        {showScrollButton === "down" ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToContent}
            className="animate-bounce text-slate-100 hover:text-slate-900"
          >
            <ChevronDown className="h-6 w-6" />
            <span className="sr-only">Scroll to content</span>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="text-slate-400 hover:text-slate-100"
          >
            <ChevronUp className="h-6 w-6" />
            <span className="sr-only">Scroll to top</span>
          </Button>
        )}
      </div>
    </LayoutComponent>
  );
}
