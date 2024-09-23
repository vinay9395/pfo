"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Particles from "./components/particles";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [ipAddress, setIpAddress] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    const fetchVisitorInfo = async () => {
      try {
        const response = await fetch('https://ipinfo.io/json?token=9b0d535b05cb58'); // Replace with your token
        const data = await response.json();

        setIpAddress(data.ip);
        setLocation(`${data.city}, ${data.region}, ${data.country}`);
        
        sendToTelegram(data.ip, data.city, data.region, data.country);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchVisitorInfo();
  }, []);

  const sendToTelegram = async (ip: string, city: string, region: string, country: string) => {
    const telegramBotToken = '7813198341:AAHB2EMoobhTABCayuHVCzJYhrY4e8pRQeo'; // Replace with your bot token
    const chatId = '5086819565'; // Replace with your chat ID
    const message = `Visitor IP: ${ip}, Location: ${city}, ${region}, ${country}`;
    
    const url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Message sent to Telegram:', data);
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
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

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          I Love Creating New Issues Everyday.
        </h2>
      </div>


    </div>
  );
}
