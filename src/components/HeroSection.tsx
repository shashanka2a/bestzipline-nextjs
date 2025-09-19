"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  heroImage: string;
  onBookingClick: () => void;
}

export function HeroSection({ heroImage, onBookingClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Decorative Text */}
        <p 
          className="text-2xl mb-6 opacity-90"
          style={{ 
            fontFamily: 'cursive',
            color: 'var(--adventure-green-light)',
          }}
        >
          explore from above
        </p>
        
        {/* Main Headline */}
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-12 tracking-tight">
          FLORIDA&apos;S<br />
          LONGEST<br />
          ZIPLINE
        </h1>
        
        {/* CTA Button */}
        <Button
          className="px-8 py-6 text-lg font-semibold rounded-full border-2 border-dashed transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: 'var(--adventure-green)',
            borderColor: 'var(--adventure-green-light)',
            color: 'white',
          }}
          onClick={onBookingClick}
        >
          BOOK ADVENTURE
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}