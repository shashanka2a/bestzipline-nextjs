"use client";

import { Button } from "./ui/button";
import { Home, Calendar, User } from "lucide-react";

interface DesktopNavigationProps {
  currentView: 'hero' | 'booking' | 'profile';
  onNavigate: (view: 'hero' | 'booking' | 'profile') => void;
}

export function DesktopNavigation({ currentView, onNavigate }: DesktopNavigationProps) {
  return (
    <nav className="hidden md:block fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 safe-area-pt">
      <div className="desktop-max-width px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-adventure-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">FL</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Zipline</span>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              onClick={() => onNavigate('hero')}
              className={`px-4 py-2 transition-smooth hover-scale ${
                currentView === 'hero' 
                  ? 'text-adventure-green bg-adventure-green/10' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => onNavigate('booking')}
              className={`px-4 py-2 transition-smooth hover-scale ${
                currentView === 'booking' 
                  ? 'text-adventure-green bg-adventure-green/10' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Adventure
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => onNavigate('profile')}
              className={`px-4 py-2 transition-smooth hover-scale ${
                currentView === 'profile' 
                  ? 'text-adventure-green bg-adventure-green/10' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
