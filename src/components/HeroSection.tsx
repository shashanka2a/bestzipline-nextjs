"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  heroImage: string;
  onBookingClick: () => void;
}

export function HeroSection({ heroImage, onBookingClick }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-12 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto desktop-max-width">
        {/* Decorative Text */}
        <p 
          className="text-lg md:text-2xl mb-4 md:mb-6 opacity-90 animate-slide-up"
          style={{ 
            fontFamily: 'cursive',
            color: 'var(--adventure-green-light)',
            animationDelay: '0.2s'
          }}
        >
          explore from above
        </p>
        
        {/* Main Headline */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-8 md:mb-12 tracking-tight animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <span className="block">FLORIDA&apos;S</span>
          <span className="block animate-float" style={{ animationDelay: '0.6s' }}>LONGEST</span>
          <span className="block animate-float" style={{ animationDelay: '0.8s' }}>ZIPLINE</span>
        </h1>
        
        {/* CTA Button */}
        <Button
          className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-semibold rounded-full border-2 border-dashed hover-scale transition-smooth animate-scale-in touch-target"
          style={{
            backgroundColor: 'var(--adventure-green)',
            borderColor: 'var(--adventure-green-light)',
            color: 'white',
            animationDelay: '1s'
          }}
          onClick={onBookingClick}
        >
          BOOK ADVENTURE
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
        </Button>
        
        {/* Desktop-only additional content */}
        <div className="desktop-hidden md:block mt-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Experience the thrill of soaring through Florida&apos;s beautiful canopy on our state&apos;s longest zipline course. 
            Perfect for adventurers of all ages!
          </p>
        </div>
      </div>
      
      {/* Floating elements for desktop */}
      <div className="desktop-hidden md:block absolute top-1/4 left-8 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="w-3 h-3 bg-adventure-green-light rounded-full animate-pulse-subtle"></div>
      </div>
      <div className="desktop-hidden md:block absolute top-1/3 right-12 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-2 h-2 bg-adventure-green rounded-full animate-pulse-subtle"></div>
      </div>
    </section>
  );
}