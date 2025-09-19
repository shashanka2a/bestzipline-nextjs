"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  groupSize: number;
}

interface BookingFormProps {
  onSubmit: (data: BookingFormData) => void;
  initialData: BookingFormData;
}

export function BookingForm({ onSubmit, initialData }: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.groupSize < 1 || formData.groupSize > 12) {
      newErrors.groupSize = 'Group size must be between 1 and 12';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof BookingFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Contact Information</h3>
        
        {/* Name */}
        <div className="space-y-2 mb-4">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2 mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2 mb-4">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Group Size */}
        <div className="space-y-2">
          <Label htmlFor="groupSize">Group Size</Label>
          <Select 
            value={formData.groupSize.toString()} 
            onValueChange={(value) => updateField('groupSize', parseInt(value))}
          >
            <SelectTrigger className={errors.groupSize ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select group size" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} {size === 1 ? 'person' : 'people'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.groupSize && (
            <p className="text-sm text-red-600">{errors.groupSize}</p>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Important Information</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Minimum age: 10 years old</li>
          <li>• Weight limit: 250 lbs per person</li>
          <li>• Closed-toe shoes required</li>
          <li>• Duration: approximately 2 hours</li>
        </ul>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full py-3 font-semibold rounded-lg"
        style={{
          backgroundColor: 'var(--adventure-green)',
          color: 'white',
        }}
      >
        REVIEW BOOKING
      </Button>
    </form>
  );
}