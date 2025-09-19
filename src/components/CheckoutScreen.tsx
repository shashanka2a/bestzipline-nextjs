"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CreditCard, Lock } from "lucide-react";

interface BookingData {
  date: Date | null;
  timeSlot: string | null;
  name: string;
  email: string;
  phone: string;
  groupSize: number;
}

interface CheckoutScreenProps {
  bookingData: BookingData;
  onPayment: () => void;
}

const PRICE_PER_PERSON = 89;

export function CheckoutScreen({ bookingData, onPayment }: CheckoutScreenProps) {
  const subtotal = PRICE_PER_PERSON * bookingData.groupSize;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handlePayment = () => {
    // Mock payment processing
    setTimeout(() => {
      onPayment();
    }, 2000); // Simulate payment processing delay
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Order Summary</h3>
        
        <div className="space-y-4">
          {/* Service */}
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Florida&apos;s Longest Zipline Adventure</p>
              <p className="text-sm text-gray-600">
                {bookingData.date?.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-sm text-gray-600">{bookingData.timeSlot}</p>
              <p className="text-sm text-gray-600">
                {bookingData.groupSize} {bookingData.groupSize === 1 ? 'person' : 'people'}
              </p>
            </div>
            <p className="font-medium">${subtotal.toFixed(2)}</p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({bookingData.groupSize} × ${PRICE_PER_PERSON})</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Taxes & Fees</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Customer Details */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Customer Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span>{bookingData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span>{bookingData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone:</span>
            <span>{bookingData.phone}</span>
          </div>
        </div>
      </Card>

      {/* Payment Section */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4 flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Information
        </h3>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">Demo Payment - No real charges will be made</p>
          <div className="space-y-2 text-sm">
            <p>Card Number: •••• •••• •••• 4242</p>
            <p>Expires: 12/28 • CVV: •••</p>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Lock className="mr-2 h-4 w-4" />
          Your payment information is encrypted and secure
        </div>

        <Button
          onClick={handlePayment}
          className="w-full py-4 font-semibold rounded-lg"
          style={{
            backgroundColor: 'var(--adventure-green)',
            color: 'white',
          }}
        >
          PAY ${total.toFixed(2)}
        </Button>
      </Card>

      {/* Cancellation Policy */}
      <div className="text-xs text-gray-500 space-y-1">
        <p><strong>Cancellation Policy:</strong></p>
        <p>• Free cancellation up to 24 hours before your adventure</p>
        <p>• 50% refund for cancellations within 24 hours</p>
        <p>• No refund for no-shows</p>
      </div>
    </div>
  );
}