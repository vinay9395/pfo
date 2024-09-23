"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Contact", href: "/contact" },
];

interface IPInfo {
  ip: string;
  hostname: string;
  city: string;
  region: string;
  country: string;
  loc: string; // Latitude and longitude
  postal: string;
  timezone: string;
  org: string; // ISP or organization
  privacy: {
    vpn: boolean;
    proxy: boolean;
    tor: boolean;
  };
}

export default function Home() {
  const [ipInfo, setIpInfo] = useState<IPInfo | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    const fetchVisitorInfo = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=YOUR_TOKEN'); // Replace with your token
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setIpInfo(data);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchVisitorInfo();
  }, []);

  const handleShowInfo = () => {
    setShowInfo(prev => !prev); // Toggle visibility of IP info

    // Scroll to the IP information section if showing info
    if (!showInfo) {
      setTimeout(() => {
        const infoSection = document.getElementById("ip-info");
        if (infoSection) {
          infoSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Delay to allow rendering before scrolling
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
          <button 
            onClick={handleShowInfo} 
            className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
          >
            {showInfo ? 'Hide Info' : 'My Info'}
          </button>
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Vansh~fr
      </h1>

      {/* Section for displaying user IP information */}
      <div id="ip-info" className={`my-4 text-center text-white transition-all duration-500 ease-in-out ${showInfo ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {ipInfo && (
          <>
            <h2>Your IP Information:</h2>
            <p>IP: {ipInfo.ip}</p>
            <p>Hostname: {ipInfo.hostname}</p>
            <p>City: {ipInfo.city}</p>
            <p>Region: {ipInfo.region}</p>
            <p>Country: {ipInfo.country}</p>
            <p>Postal Code: {ipInfo.postal}</p>
            <p>Location (Lat, Long): {ipInfo.loc}</p>
            <p>Timezone: {ipInfo.timezone}</p>
            <p>Organization/ISP: {ipInfo.org}</p>
            <p>VPN Detected? {ipInfo.privacy.vpn ? 'Yes' : 'No'}</p>
            <p>Proxy Detected? {ipInfo.privacy.proxy ? 'Yes' : 'No'}</p>
            <p>Tor Detected? {ipInfo.privacy.tor ? 'Yes' : 'No'}</p>
          </>
        )}
      </div>

      {/* Additional content below */}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          I Love Creating New Issues Everyday.
        </h2>
      </div>

    </div>
  );
}
