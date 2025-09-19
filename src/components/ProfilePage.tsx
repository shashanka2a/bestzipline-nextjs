"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Edit3, 
  X, 
  User,
  ChevronRight
} from "lucide-react";

interface Booking {
  id: string;
  date: Date;
  timeSlot: string;
  groupSize: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  totalPaid: number;
}

interface ProfilePageProps {
  onBack: () => void;
}

// Mock booking data
const mockBookings: Booking[] = [
  {
    id: 'ZL-2024-001',
    date: new Date('2024-12-25'),
    timeSlot: '10:30 AM',
    groupSize: 2,
    status: 'upcoming',
    totalPaid: 192.96
  },
  {
    id: 'ZL-2024-002',
    date: new Date('2024-11-15'),
    timeSlot: '2:00 PM',
    groupSize: 4,
    status: 'completed',
    totalPaid: 385.92
  },
  {
    id: 'ZL-2024-003',
    date: new Date('2024-10-08'),
    timeSlot: '1:30 PM',
    groupSize: 1,
    status: 'completed',
    totalPaid: 96.12
  }
];

export function ProfilePage({ onBack }: ProfilePageProps) {
  const [bookings] = useState<Booking[]>(mockBookings);
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const handleReschedule = (bookingId: string) => {
    alert(`Reschedule functionality for booking ${bookingId} would open here`);
  };

  const handleCancel = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking? You may be eligible for a partial refund.')) {
      alert(`Cancellation for booking ${bookingId} would be processed here`);
    }
  };

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold">Florida&apos;s Longest Zipline</h3>
          <p className="text-sm text-gray-500">Booking #{booking.id}</p>
        </div>
        <Badge 
          variant={
            booking.status === 'upcoming' ? 'default' : 
            booking.status === 'completed' ? 'secondary' : 'destructive'
          }
          style={{
            backgroundColor: booking.status === 'upcoming' ? 'var(--adventure-green)' : undefined,
            color: booking.status === 'upcoming' ? 'white' : undefined
          }}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="mr-2 h-4 w-4" />
          {booking.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="mr-2 h-4 w-4" />
          {booking.timeSlot}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Users className="mr-2 h-4 w-4" />
          {booking.groupSize} {booking.groupSize === 1 ? 'person' : 'people'}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="mr-2 h-4 w-4" />
          Florida Adventure Park
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="font-semibold">${booking.totalPaid.toFixed(2)}</span>
        
        {booking.status === 'upcoming' && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleReschedule(booking.id)}
              className="flex items-center"
            >
              <Edit3 className="mr-1 h-3 w-3" />
              Reschedule
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleCancel(booking.id)}
              className="flex items-center text-red-600 hover:text-red-700"
            >
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
          </div>
        )}

        {booking.status === 'completed' && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert('Booking again functionality would open here')}
          >
            Book Again
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mr-3"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </Button>
          <h2 className="text-lg font-semibold flex-1">My Profile</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center mb-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mr-4"
              style={{ backgroundColor: 'var(--adventure-green)' }}
            >
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">John Adventure</h3>
              <p className="text-sm text-gray-600">john@example.com</p>
              <p className="text-sm text-gray-600">(555) 123-4567</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
            <div>
              <p className="font-semibold">{bookings.length}</p>
              <p className="text-xs text-gray-600">Total Bookings</p>
            </div>
            <div>
              <p className="font-semibold">{upcomingBookings.length}</p>
              <p className="text-xs text-gray-600">Upcoming</p>
            </div>
            <div>
              <p className="font-semibold">{pastBookings.filter(b => b.status === 'completed').length}</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
          </div>
        </Card>

        {/* Bookings Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                <p className="text-gray-600 mb-4">Ready for your next adventure?</p>
                <Button
                  onClick={onBack}
                  style={{
                    backgroundColor: 'var(--adventure-green)',
                    color: 'white',
                  }}
                >
                  Book Now
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <Card className="p-8 text-center">
                <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">No past bookings</h3>
                <p className="text-gray-600">Your adventure history will appear here</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}