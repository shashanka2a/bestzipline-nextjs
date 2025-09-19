"use client";

import { useState } from "react";
import { DateTimeSelection } from "./DateTimeSelection";
import { BookingForm } from "./BookingForm";
import { CheckoutScreen } from "./CheckoutScreen";
import { ConfirmationScreen } from "./ConfirmationScreen";
import { Button } from "./ui/button";
import { ArrowLeft, Check } from "lucide-react";

interface BookingData {
  date: Date | null;
  timeSlot: string | null;
  name: string;
  email: string;
  phone: string;
  groupSize: number;
}

interface BookingFlowProps {
  onBack: () => void;
  onBookingComplete: () => void;
}

export function BookingFlow({ onBack, onBookingComplete }: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState<'datetime' | 'details' | 'checkout' | 'confirmation'>('datetime');
  const [bookingData, setBookingData] = useState<BookingData>({
    date: null,
    timeSlot: null,
    name: '',
    email: '',
    phone: '',
    groupSize: 1,
  });
  const [bookingId] = useState(`ZL-${Date.now()}`);

  const handleDateTimeNext = (date: Date, timeSlot: string) => {
    setBookingData(prev => ({ ...prev, date, timeSlot }));
    setCurrentStep('details');
  };

  const handleFormSubmit = (formData: Omit<BookingData, 'date' | 'timeSlot'>) => {
    setBookingData(prev => ({ ...prev, ...formData }));
    setCurrentStep('checkout');
  };

  const handlePayment = () => {
    setCurrentStep('confirmation');
  };

  const handleConfirmationComplete = () => {
    onBookingComplete();
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 'datetime': return 'Select Date & Time';
      case 'details': return 'Your Details';
      case 'checkout': return 'Checkout';
      case 'confirmation': return 'Confirmation';
      default: return '';
    }
  };

  const handleBackNavigation = () => {
    switch (currentStep) {
      case 'datetime':
        onBack();
        break;
      case 'details':
        setCurrentStep('datetime');
        break;
      case 'checkout':
        setCurrentStep('details');
        break;
      case 'confirmation':
        // Can't go back from confirmation
        break;
    }
  };

  const handleStepClick = (step: 'datetime' | 'details' | 'checkout') => {
    // Allow navigation to previous steps only
    switch (step) {
      case 'datetime':
        if (currentStep === 'details' || currentStep === 'checkout') {
          setCurrentStep('datetime');
        }
        break;
      case 'details':
        if (currentStep === 'checkout') {
          setCurrentStep('details');
        }
        break;
      case 'checkout':
        // Can't jump to checkout without completing previous steps
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-4 md:px-6">
        <div className="max-w-md md:max-w-4xl mx-auto flex items-center">
          {currentStep !== 'confirmation' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackNavigation}
              className="mr-3 touch-target hover-scale transition-fast"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <h2 className="text-lg md:text-xl font-semibold flex-1 animate-slide-in-right">{getStepTitle()}</h2>
        </div>
      </div>

      {/* Progress Indicator */}
      {currentStep !== 'confirmation' && (
        <div className="max-w-md md:max-w-4xl mx-auto px-4 py-6 animate-slide-up">
          <div className="flex items-center justify-between mb-8">
            {/* Step 1 */}
            <div className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep !== 'datetime' ? 'text-white' : 'text-gray-700'
                }`}
                style={{
                  backgroundColor: currentStep !== 'datetime' ? 'var(--adventure-green)' : '#f3f4f6'
                }}
              >
                {currentStep !== 'datetime' ? <Check className="h-4 w-4" /> : '1'}
              </div>
              <span className="ml-2 text-sm text-gray-600">Date & Time</span>
            </div>
            
            <div className="flex-1 h-px bg-gray-200 mx-4" />
            
            {/* Step 2 */}
            <div className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep !== 'datetime' ? 'text-white' : 'text-gray-700'
                }`}
                style={{
                  backgroundColor: currentStep !== 'datetime' ? 'var(--adventure-green)' : '#f3f4f6'
                }}
              >
                {currentStep !== 'datetime' ? <Check className="h-4 w-4" /> : '2'}
              </div>
              <span className="ml-2 text-sm text-gray-600">Details</span>
            </div>
            
            <div className="flex-1 h-px bg-gray-200 mx-4" />
            
            {/* Step 3 */}
            <div className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === 'checkout' ? 'text-white' : 'text-gray-700'
                }`}
                style={{
                  backgroundColor: currentStep === 'checkout' ? 'var(--adventure-green)' : '#f3f4f6'
                }}
              >
                3
              </div>
              <span className="ml-2 text-sm text-gray-600">Payment</span>
            </div>
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="max-w-md md:max-w-4xl mx-auto px-4 pb-6">
        {currentStep === 'datetime' && (
          <DateTimeSelection onNext={handleDateTimeNext} />
        )}
        
        {currentStep === 'details' && (
          <BookingForm 
            onSubmit={handleFormSubmit}
            initialData={{
              name: bookingData.name,
              email: bookingData.email,
              phone: bookingData.phone,
              groupSize: bookingData.groupSize,
            }}
          />
        )}

        {currentStep === 'checkout' && (
          <CheckoutScreen 
            bookingData={bookingData}
            onPayment={handlePayment}
          />
        )}

        {currentStep === 'confirmation' && (
          <ConfirmationScreen 
            bookingData={bookingData}
            bookingId={bookingId}
            onComplete={handleConfirmationComplete}
          />
        )}
      </div>
    </div>
  );
}