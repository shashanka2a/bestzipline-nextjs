"use client";

import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { BookingFlow } from "./components/BookingFlow";
import { ProfilePage } from "./components/ProfilePage";
import { BottomNavigation } from "./components/BottomNavigation";
import { DesktopNavigation } from "./components/DesktopNavigation";

export default function App() {
  const [currentView, setCurrentView] = useState<'hero' | 'booking' | 'profile'>('hero');
  const heroImageUrl = "https://images.unsplash.com/photo-1571849728258-17e110628af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6aXBsaW5lJTIwYWR2ZW50dXJlJTIwZm9yZXN0JTIwY2Fub3B5fGVufDF8fHx8MTc1ODMwNTM0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

  const handleBookingClick = () => {
    setCurrentView('booking');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  const handleBookingComplete = () => {
    setCurrentView('profile');
  };

  const handleNavigation = (view: 'hero' | 'booking' | 'profile') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0 md:pt-20">
      <DesktopNavigation 
        currentView={currentView}
        onNavigate={handleNavigation}
      />
      
      <div className="animate-fade-in">
        {currentView === 'hero' && (
          <HeroSection 
            heroImage={heroImageUrl} 
            onBookingClick={handleBookingClick}
          />
        )}
        
        {currentView === 'booking' && (
          <BookingFlow 
            onBack={handleBackToHero}
            onBookingComplete={handleBookingComplete}
          />
        )}

        {currentView === 'profile' && (
          <ProfilePage onBack={handleBackToHero} />
        )}
      </div>

      <BottomNavigation 
        currentView={currentView}
        onNavigate={handleNavigation}
      />
    </div>
  );
}