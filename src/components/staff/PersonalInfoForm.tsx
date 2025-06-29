import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    dateOfBirth: Date | undefined;
    gender: string;
    maritalStatus: string;
    bloodGroup: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    contactInfo: {
      email: string;
      phone: string;
      alternatePhone: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
    photo: File | null;
  };
  updateFormData: (data: any) => void;
  markSectionComplete: (isComplete: boolean) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ 
  formData, 
  updateFormData,
  markSectionComplete 
}) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  // Check if form is complete
  useEffect(() => {
    const isComplete = 
      formData.firstName.trim() !== '' && 
      formData.lastName.trim() !== '' && 
      formData.dateOfBirth !== undefined &&
      formData.gender !== '' &&
      formData.contactInfo.email.trim() !== '' &&
      formData.contactInfo.phone.trim() !== '' &&
      formData.address.street.trim() !== '' &&
      formData.address.city.trim() !== '' &&
      formData.address.state.trim() !== '' &&
      formData.address.postalCode.trim() !== '';
    
    markSectionComplete(isComplete);
  }, [formData, markSectionComplete]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      updateFormData({
        [section]: {
          ...formData[section as keyof typeof formData],
          [field]: value
        }
      });
    } else {
      updateFormData({ [name]: value });
    }
  };

  // Handle select change
  const handleSelectChange = (value: string, name: string) => {
    updateFormData({ [name]: value });
  };

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    updateFormData({ dateOfBirth: date });
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ photo: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold text-gray-800 mb-4">Personal Information</div>
      
      {/* Photo Upload */}
      <div className="flex items-center space-x-6 mb-6">
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
              {photoPreview ? (
                <img src={photoPreview} alt="Employee" className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400 flex flex-col items-center justify-center">
                  <Upload className="h-8 w-8 mb-1" />
                  <span className="text-xs">No photo</span>
                </div>
              )}
            </div>
            <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer">
              <Upload className="h-4 w-4" />
              <input 
                id="photo-upload" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Upload employee photo</p>
        </div>
        
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
              <Input 
                id="firstName" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleInputChange} 
                placeholder="Enter first name"
                required
              />
            </div>
            
            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
              <Input 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleInputChange} 
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Basic Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Date of Birth */}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth <span className="text-red-500">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.dateOfBirth && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.dateOfBirth}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) => date > new Date() || date < new Date('1940-01-01')}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
          <Select 
            value={formData.gender} 
            onValueChange={(value) => handleSelectChange(value, 'gender')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Marital Status */}
        <div className="space-y-2">
          <Label htmlFor="maritalStatus">Marital Status</Label>
          <Select 
            value={formData.maritalStatus} 
            onValueChange={(value) => handleSelectChange(value, 'maritalStatus')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Blood Group */}
        <div className="space-y-2">
          <Label htmlFor="bloodGroup">Blood Group</Label>
          <Select 
            value={formData.bloodGroup} 
            onValueChange={(value) => handleSelectChange(value, 'bloodGroup')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Contact Information */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="contactInfo.email">Email <span className="text-red-500">*</span></Label>
              <Input 
                id="contactInfo.email" 
                name="contactInfo.email" 
                value={formData.contactInfo.email} 
                onChange={handleInputChange} 
                placeholder="Enter email address"
                type="email"
                required
              />
            </div>
            
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="contactInfo.phone">Phone <span className="text-red-500">*</span></Label>
              <Input 
                id="contactInfo.phone" 
                name="contactInfo.phone" 
                value={formData.contactInfo.phone} 
                onChange={handleInputChange} 
                placeholder="Enter phone number"
                required
              />
            </div>
            
            {/* Alternate Phone */}
            <div className="space-y-2">
              <Label htmlFor="contactInfo.alternatePhone">Alternate Phone</Label>
              <Input 
                id="contactInfo.alternatePhone" 
                name="contactInfo.alternatePhone" 
                value={formData.contactInfo.alternatePhone} 
                onChange={handleInputChange} 
                placeholder="Enter alternate phone (optional)"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Address */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Address</h3>
          <div className="space-y-4">
            {/* Street Address */}
            <div className="space-y-2">
              <Label htmlFor="address.street">Street Address <span className="text-red-500">*</span></Label>
              <Textarea 
                id="address.street" 
                name="address.street" 
                value={formData.address.street} 
                onChange={handleInputChange} 
                placeholder="Enter street address"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* City */}
              <div className="space-y-2">
                <Label htmlFor="address.city">City <span className="text-red-500">*</span></Label>
                <Input 
                  id="address.city" 
                  name="address.city" 
                  value={formData.address.city} 
                  onChange={handleInputChange} 
                  placeholder="Enter city"
                  required
                />
              </div>
              
              {/* State */}
              <div className="space-y-2">
                <Label htmlFor="address.state">State <span className="text-red-500">*</span></Label>
                <Input 
                  id="address.state" 
                  name="address.state" 
                  value={formData.address.state} 
                  onChange={handleInputChange} 
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Postal Code */}
              <div className="space-y-2">
                <Label htmlFor="address.postalCode">Postal Code <span className="text-red-500">*</span></Label>
                <Input 
                  id="address.postalCode" 
                  name="address.postalCode" 
                  value={formData.address.postalCode} 
                  onChange={handleInputChange} 
                  placeholder="Enter postal code"
                  required
                />
              </div>
              
              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="address.country">Country</Label>
                <Input 
                  id="address.country" 
                  name="address.country" 
                  value={formData.address.country} 
                  onChange={handleInputChange} 
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Emergency Contact */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="emergencyContact.name">Contact Name</Label>
              <Input 
                id="emergencyContact.name" 
                name="emergencyContact.name" 
                value={formData.emergencyContact.name} 
                onChange={handleInputChange} 
                placeholder="Enter emergency contact name"
              />
            </div>
            
            {/* Relationship */}
            <div className="space-y-2">
              <Label htmlFor="emergencyContact.relationship">Relationship</Label>
              <Input 
                id="emergencyContact.relationship" 
                name="emergencyContact.relationship" 
                value={formData.emergencyContact.relationship} 
                onChange={handleInputChange} 
                placeholder="Enter relationship"
              />
            </div>
            
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="emergencyContact.phone">Contact Phone</Label>
              <Input 
                id="emergencyContact.phone" 
                name="emergencyContact.phone" 
                value={formData.emergencyContact.phone} 
                onChange={handleInputChange} 
                placeholder="Enter emergency contact phone"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoForm;
