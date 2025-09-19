"use client";

import { Button } from "./ui/button";
import { Home, Calendar, User } from "lucide-react";

interface BottomNavigationProps {
  currentView: 'hero' | 'booking' | 'profile';
  onNavigate: (view: 'hero' | 'booking' | 'profile') => void;
}

export function BottomNavigation({ currentView, onNavigate }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="max-w-md mx-auto flex justify-around">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('hero')}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === 'hero' ? 'text-current' : 'text-gray-500'
          }`}
          style={{
            color: currentView === 'hero' ? 'var(--adventure-green)' : undefined
          }}
        >
          <Home className="h-5 w-5 mb-1" />
          <span className="text-xs">Home</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('booking')}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === 'booking' ? 'text-current' : 'text-gray-500'
          }`}
          style={{
            color: currentView === 'booking' ? 'var(--adventure-green)' : undefined
          }}
        >
          <Calendar className="h-5 w-5 mb-1" />
          <span className="text-xs">Book</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center py-2 px-4 ${
            currentView === 'profile' ? 'text-current' : 'text-gray-500'
          }`}
          style={{
            color: currentView === 'profile' ? 'var(--adventure-green)' : undefined
          }}
        >
          <User className="h-5 w-5 mb-1" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </div>
  );
}