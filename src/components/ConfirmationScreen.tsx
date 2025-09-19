"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle, Calendar, Download, Share2 } from "lucide-react";

interface BookingData {
  date: Date | null;
  timeSlot: string | null;
  name: string;
  email: string;
  phone: string;
  groupSize: number;
}

interface ConfirmationScreenProps {
  bookingData: BookingData;
  bookingId: string;
  onComplete: () => void;
}

export function ConfirmationScreen({ bookingData, bookingId, onComplete }: ConfirmationScreenProps) {
  const handleAddToCalendar = () => {
    if (!bookingData.date || !bookingData.timeSlot) return;

    // Create calendar event
    const startDate = new Date(bookingData.date);
    const [time, period] = bookingData.timeSlot.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    startDate.setHours(hour24, minutes || 0, 0, 0);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours duration

    const event = {
      title: "Florida's Longest Zipline Adventure",
      start: startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      end: endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
      description: `Zipline Adventure for ${bookingData.groupSize} ${bookingData.groupSize === 1 ? 'person' : 'people'}. Booking ID: ${bookingId}`,
      location: "Florida Adventure Park, FL"
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    window.open(calendarUrl, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Zipline Adventure Booking",
        text: `I just booked Florida's longest zipline adventure for ${bookingData.date?.toLocaleDateString()}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(`I just booked Florida's longest zipline adventure for ${bookingData.date?.toLocaleDateString()}! Booking ID: ${bookingId}`);
      alert('Booking details copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6 text-center">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div 
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--adventure-green)' }}
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Success Message */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600">
          Your adventure is all set. Get ready for an amazing experience!
        </p>
      </div>

      {/* Booking Details Card */}
      <Card className="p-6 text-left">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Booking Details</h3>
          <span className="text-sm text-gray-500">#{bookingId}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Adventure:</span>
            <span className="font-medium">Florida&apos;s Longest Zipline</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">
              {bookingData.date?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{bookingData.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Group Size:</span>
            <span className="font-medium">
              {bookingData.groupSize} {bookingData.groupSize === 1 ? 'person' : 'people'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Paid:</span>
            <span className="font-semibold">${((89 * bookingData.groupSize) * 1.08).toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Important Information */}
      <Card className="p-6 text-left">
        <h3 className="font-semibold mb-3">Important Information</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>📍 <strong>Location:</strong> Florida Adventure Park, 123 Canopy Way, FL 32801</p>
          <p>🕐 <strong>Arrival:</strong> Please arrive 30 minutes before your scheduled time</p>
          <p>👕 <strong>What to wear:</strong> Comfortable clothes and closed-toe shoes</p>
          <p>📞 <strong>Contact:</strong> Call (555) 123-4567 if you need to make changes</p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCalendar}
          className="w-full py-3 font-semibold rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: 'var(--adventure-green)',
            color: 'white',
          }}
        >
          <Calendar className="mr-2 h-5 w-5" />
          ADD TO CALENDAR
        </Button>

        <div className="flex gap-3">
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1 py-3 font-semibold rounded-lg flex items-center justify-center"
          >
            <Share2 className="mr-2 h-4 w-4" />
            SHARE
          </Button>
          
          <Button
            onClick={() => {
              // Mock download confirmation email
              alert('Confirmation email sent to ' + bookingData.email);
            }}
            variant="outline"
            className="flex-1 py-3 font-semibold rounded-lg flex items-center justify-center"
          >
            <Download className="mr-2 h-4 w-4" />
            EMAIL
          </Button>
        </div>

        <Button
          onClick={onComplete}
          variant="ghost"
          className="w-full py-3"
        >
          Continue to Profile
        </Button>
      </div>
    </div>
  );
}