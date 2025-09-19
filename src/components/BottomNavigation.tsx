"use client";

import { Button } from "./ui/button";
import { Home, Calendar, User } from "lucide-react";

interface BottomNavigationProps {
  currentView: 'hero' | 'booking' | 'profile';
  onNavigate: (view: 'hero' | 'booking' | 'profile') => void;
}

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 safe-area-pb md:hidden">
      <div className="max-w-md mx-auto flex justify-around">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('hero')}
          className={`flex flex-col items-center py-2 px-4 touch-target transition-smooth hover-scale ${
            currentView === 'hero' ? 'text-current' : 'text-gray-500'
          }`}
          style={{
            color: currentView === 'hero' ? 'var(--adventure-green)' : undefined
          }}
        >
          <Home className={`h-5 w-5 mb-1 transition-transform ${currentView === 'hero' ? 'animate-bounce-subtle' : ''}`} />
          <span className="text-xs font-medium">Home</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('booking')}
          className={`flex flex-col items-center py-2 px-4 touch-target transition-smooth hover-scale ${
            currentView === 'booking' ? 'text-current' : 'text-gray-500'
          }`}
          style={{
            color: currentView === 'booking' ? 'var(--adventure-green)' : undefined
          }}
        >
          <Calendar className={`h-5 w-5 mb-1 transition-transform ${currentView === 'booking' ? 'animate-bounce-subtle' : ''}`} />
          <span className="text-xs font-medium">Book</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center py-2 px-4 touch-target transition-smooth hover-scale ${
            currentView === 'profile' ? 'text-current' : 'text-gray-500'
          }`}
          style={{
            color: currentView === 'profile' ? 'var(--adventure-green)' : undefined
          }}
        >
          <User className={`h-5 w-5 mb-1 transition-transform ${currentView === 'profile' ? 'animate-bounce-subtle' : ''}`} />
          <span className="text-xs font-medium">Profile</span>
        </Button>
      </div>
    </div>
  );
}