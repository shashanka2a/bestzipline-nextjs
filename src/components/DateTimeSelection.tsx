"use client";

import { useState, useMemo } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Helper to check if two dates are the same day (ignoring time)
const isSameDay = (d1: Date, d2: Date | null) => {
  return d2 && d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

// Define blocked dates for specific months/years
const blockedDatesMap: { [key: string]: number[] } = {
  '2025-8': [20, 21, 24, 27, 28, 29, 30], // September 2025 (month 8)
  '2025-9': [1, 4], // October 2025 (month 9)
  // Add more blocked dates for other months/years as needed
};

export function DateTimeSelection({ onNext }: DateTimeSelectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const isDateBlocked = (date: Date) => {
    const dateKey = `${date.getFullYear()}-${date.getMonth()}`;
    const monthBlockedDays = blockedDatesMap[dateKey];
    return monthBlockedDays ? monthBlockedDays.includes(date.getDate()) : false;
  };

  const isDateBeforeToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];

    // Calculate the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();

    // Add days from the previous month to fill the leading empty cells
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek; i > 0; i--) {
      days.unshift(new Date(year, month - 1, lastDayOfPrevMonth - i + 1));
    }

    // Add days of the current month
    const numDaysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= numDaysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from the next month to fill the trailing empty cells
    const totalCells = 42; // 6 rows * 7 days
    let dayOfNextMonth = 1;
    while (days.length < totalCells) {
      days.push(new Date(year, month + 1, dayOfNextMonth));
      dayOfNextMonth++;
    }

    return days;
  };

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const canProceed = selectedDate && selectedTimeSlot && !isDateBlocked(selectedDate);

  const handleNext = () => {
    if (canProceed) {
      onNext(selectedDate, selectedTimeSlot);
    } else {
      // Show a helpful message or scroll to the calendar
      const calendarElement = document.querySelector('[data-calendar-section]');
      if (calendarElement) {
        calendarElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Calendar */}
      <div className="animate-slide-up" data-calendar-section>
        <h3 className="text-lg font-semibold mb-6 text-gray-900">Select a Date</h3>
        
        {/* Custom Calendar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover-lift transition-smooth">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <button 
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors touch-target"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <h4 className="text-xl font-semibold text-gray-900">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h4>
            
            <button 
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors touch-target"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
                const isToday = isSameDay(date, new Date());
                const isSelected = isSameDay(date, selectedDate);
                const isBlocked = isDateBlocked(date);
                const isPast = isDateBeforeToday(date);
                const isDisabled = isBlocked || isPast;

                return (
                  <button
                    key={index}
                    onClick={() => !isDisabled && setSelectedDate(date)}
                    disabled={isDisabled}
                    className={`
                      calendar-day relative h-12 w-12 rounded-xl text-sm font-medium touch-target
                      ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-900'}
                      ${isToday && !isSelected ? 'today' : ''}
                      ${isSelected ? 'selected' : ''}
                      ${isBlocked ? 'blocked' : ''}
                      ${isPast ? 'past' : ''}
                      ${!isDisabled && isCurrentMonth ? 'hover:bg-gray-100' : ''}
                    `}
                  >
                    {date.getDate()}
                    {isToday && !isSelected && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-adventure-green rounded-full"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-50 border border-blue-200 rounded-full"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-50 border border-red-200 rounded-full"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && !isDateBlocked(selectedDate) && (
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-lg font-semibold mb-6 text-gray-900">Select a Time</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timeSlots.map((slot, index) => (
              <button
                key={slot}
                onClick={() => setSelectedTimeSlot(slot)}
                className={`
                  time-slot p-4 rounded-xl border-2 text-sm font-medium touch-target
                  ${selectedTimeSlot === slot
                    ? 'selected border-adventure-green text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Button
          onClick={handleNext}
          className={`
            w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 touch-target
            ${canProceed 
              ? 'bg-adventure-green hover:bg-adventure-green-dark text-white shadow-lg hover:shadow-xl transform hover:scale-105' 
              : 'bg-adventure-green/20 border-2 border-adventure-green/30 text-adventure-green hover:bg-adventure-green/30 hover:shadow-md transform hover:scale-105'
            }
          `}
          style={{
            color: canProceed ? 'white' : 'var(--adventure-green)',
            backgroundColor: canProceed ? 'var(--adventure-green)' : 'rgba(107, 155, 58, 0.2)',
            borderColor: canProceed ? 'var(--adventure-green)' : 'rgba(107, 155, 58, 0.3)'
          }}
        >
          {canProceed ? 'CONTINUE TO DETAILS' : 'SELECT DATE & TIME TO CONTINUE'}
        </Button>
        
        {!canProceed && (
          <p className="text-center text-sm text-gray-600 mt-3 animate-fade-in">
            💡 Click the button above to scroll to the calendar and select your date & time
          </p>
        )}
      </div>
    </div>
  );
}