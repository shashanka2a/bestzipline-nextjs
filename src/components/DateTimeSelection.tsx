"use client";

import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";

interface DateTimeSelectionProps {
  onNext: (date: Date, timeSlot: string) => void;
}

const timeSlots = [
  '9:00 AM',
  '10:30 AM', 
  '12:00 PM',
  '1:30 PM',
  '3:00 PM',
  '4:30 PM'
];

// Mock blocked dates (weekends and some random dates)
const getBlockedDates = () => {
  const blocked = [];
  const today = new Date();
  
  // Block next 30 days worth of weekends and some random dates
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Block weekends
    if (date.getDay() === 0 || date.getDay() === 6) {
      blocked.push(date);
    }
    
    // Block some random dates (maintenance days)
    if (i === 5 || i === 12 || i === 23) {
      blocked.push(date);
    }
  }
  
  return blocked;
};

export function DateTimeSelection({ onNext }: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const blockedDates = getBlockedDates();

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(blockedDate => 
      blockedDate.toDateString() === date.toDateString()
    );
  };

  const isDateBeforeToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const canProceed = selectedDate && selectedTimeSlot;

  const handleNext = () => {
    if (selectedDate && selectedTimeSlot) {
      onNext(selectedDate, selectedTimeSlot);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Calendar */}
      <div className="animate-slide-up">
        <h3 className="font-medium mb-4">Select a Date</h3>
        <div className="border rounded-lg p-4 bg-white hover-lift transition-smooth">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => isDateBeforeToday(date) || isDateBlocked(date)}
            className="w-full"
            modifiers={{
              blocked: blockedDates,
            }}
            modifiersStyles={{
              blocked: { 
                backgroundColor: '#fee2e2', 
                color: '#dc2626',
                textDecoration: 'line-through'
              },
            }}
            classNames={{
              head_cell: "text-gray-500 text-xs font-medium w-8 h-8 flex items-center justify-center",
              head_row: "flex w-full justify-between mb-2",
              table: "w-full",
              row: "flex w-full justify-between",
              cell: "w-8 h-8 flex items-center justify-center",
            }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          <span className="inline-block w-3 h-3 bg-red-100 rounded mr-2"></span>
          Blocked dates are not available for booking
        </p>
      </div>

      {/* Time Slots */}
      {selectedDate && !isDateBlocked(selectedDate) && (
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-medium mb-4">Select a Time</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot, index) => (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`p-3 rounded-lg border text-sm font-medium transition-smooth hover-scale touch-target ${
                  selectedTimeSlot === slot
                    ? 'text-white border-2 animate-scale-in'
                    : 'text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  backgroundColor: selectedTimeSlot === slot ? 'var(--adventure-green)' : 'white',
                  borderColor: selectedTimeSlot === slot ? 'var(--adventure-green)' : undefined,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      <Button
        onClick={handleNext}
        disabled={!canProceed}
        className="w-full py-3 font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover-scale transition-smooth touch-target animate-slide-up"
        style={{
          backgroundColor: canProceed ? 'var(--adventure-green)' : '#9ca3af',
          color: 'white',
          animationDelay: '0.4s'
        }}
      >
        CONTINUE TO DETAILS
      </Button>
    </div>
  );
}