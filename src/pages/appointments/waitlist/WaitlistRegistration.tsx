import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Info, Search, UserPlus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TimeSlot {
  day: Date;
  am: boolean;
  pm: boolean;
}

const WaitlistRegistration: React.FC = () => {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
  const [flexibility, setFlexibility] = useState("flexible");
  const [priority, setPriority] = useState("standard");
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Helper function to check if a day is already in selectedSlots
  const findSlotByDay = (day: Date): TimeSlot | undefined => {
    return selectedSlots.find(slot => 
      slot.day.getFullYear() === day.getFullYear() &&
      slot.day.getMonth() === day.getMonth() &&
      slot.day.getDate() === day.getDate()
    );
  };

  // Handle slot selection
  const handleSlotSelection = (day: Date, period: 'am' | 'pm') => {
    setSelectedSlots(prevSlots => {
      // Find if day already exists
      const existingSlotIndex = prevSlots.findIndex(slot => 
        slot.day.getFullYear() === day.getFullYear() &&
        slot.day.getMonth() === day.getMonth() &&
        slot.day.getDate() === day.getDate()
      );
      
      // If day exists, toggle the AM/PM slot
      if (existingSlotIndex !== -1) {
        const updatedSlots = [...prevSlots];
        if (period === 'am') {
          updatedSlots[existingSlotIndex].am = !updatedSlots[existingSlotIndex].am;
        } else {
          updatedSlots[existingSlotIndex].pm = !updatedSlots[existingSlotIndex].pm;
        }
        
        // If both AM and PM are false, remove the day
        if (!updatedSlots[existingSlotIndex].am && !updatedSlots[existingSlotIndex].pm) {
          return updatedSlots.filter((_, i) => i !== existingSlotIndex);
        }
        
        return updatedSlots;
      } 
      // If day doesn't exist, add it with the selected slot
      else {
        return [...prevSlots, {
          day: new Date(day),
          am: period === 'am',
          pm: period === 'pm'
        }];
      }
    });
  };

  // Clear form
  const handleClearForm = () => {
    setPatientId("");
    setPatientName("");
    setPatientPhone("");
    setPatientEmail("");
    setSelectedSlots([]);
    setFlexibility("flexible");
    setPriority("standard");
    setDate(new Date());
  };

  // Submit form
  const handleSubmit = () => {
    // Here we would send the data to an API
    console.log({
      patientInfo: { id: patientId, name: patientName, phone: patientPhone, email: patientEmail },
      selectedSlots,
      flexibility,
      priority
    });
    
    // Show success message
    alert("Patient added to waitlist successfully!");
    handleClearForm();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Left Column - Input Form */}
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Waitlist Registration Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Patient Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Patient Information</h3>
              
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor="patient-id">Patient ID</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="patient-id" 
                      placeholder="Enter Patient ID" 
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  New Patient
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Patient Name" 
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Phone Number" 
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email Address" 
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Preferred Slots */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Preferred Slots</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px]">Select preferred days and times by clicking on the calendar and checking AM/PM options.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Time Preferences</h4>
                  {date && (
                    <div className="p-4 border rounded-lg space-y-2">
                      <p className="text-sm font-medium">
                        {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </p>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="am-slot" 
                            checked={findSlotByDay(date)?.am || false}
                            onCheckedChange={() => handleSlotSelection(date, 'am')}
                          />
                          <label htmlFor="am-slot" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Morning (8 AM - 12 PM)
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="pm-slot" 
                            checked={findSlotByDay(date)?.pm || false}
                            onCheckedChange={() => handleSlotSelection(date, 'pm')}
                          />
                          <label htmlFor="pm-slot" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Afternoon (1 PM - 5 PM)
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Selected Slots:</h4>
                    {selectedSlots.length === 0 ? (
                      <p className="text-sm text-gray-500">No slots selected</p>
                    ) : (
                      <div className="space-y-1">
                        {selectedSlots.map((slot, index) => (
                          <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                            {slot.day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}:
                            {slot.am && " Morning"}{slot.am && slot.pm && ","}{slot.pm && " Afternoon"}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Flexibility Options */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Flexibility Options</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px]">Indicate how flexible the patient is with appointment scheduling.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <RadioGroup value={flexibility} onValueChange={setFlexibility}>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="flex-1" />
                    <Label htmlFor="flex-1">Flexible (±1 day from selected dates)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rigid" id="flex-2" />
                    <Label htmlFor="flex-2">Rigid (Only selected dates work)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekend" id="flex-3" />
                    <Label htmlFor="flex-3">Weekend Only</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            
            {/* Priority Level */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Priority Level</h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px]">Set priority level for waitlist placement.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleClearForm}>
                Clear
              </Button>
              <Button onClick={handleSubmit}>
                Add to Waitlist
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right Column - Summary & Tips */}
      <div>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Estimated Wait Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <h3 className="text-3xl font-bold text-primary">3-5 days</h3>
              <p className="text-sm text-gray-500 mt-2">based on current queue</p>
            </div>
            <div className="space-y-2 pt-4 border-t">
              <p className="text-sm">Current waitlist: <span className="font-medium">24 patients</span></p>
              <p className="text-sm">Average wait: <span className="font-medium">4.2 days</span></p>
              <p className="text-sm">Next available: <span className="font-medium">June 21, 2025</span></p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Maximize Chances</h4>
              <p className="text-sm text-gray-500">
                Select multiple days and time slots to increase the chances of getting an earlier appointment.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Notification Preferences</h4>
              <p className="text-sm text-gray-500">
                Make sure patient contact details are up-to-date to receive prompt notifications about slot availability.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Cancellation List</h4>
              <p className="text-sm text-gray-500">
                Urgent priority patients will be contacted first when cancellations occur.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaitlistRegistration;
