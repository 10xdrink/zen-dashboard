import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";
import Stepper from "@/components/ui/stepper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Plus, Search, Clock, Calendar as CalendarIcon, User, Star, Phone, Mail, MapPin, Heart, Activity, AlertTriangle, Shield, Check, X, FileText, Bell, CreditCard, Clipboard, ExternalLink, ArrowRight, Info, Users, Clock3 } from "lucide-react";
import { format, addDays, isSameDay, addWeeks, getHours, getMinutes, parseISO, isToday, isTomorrow, isAfter, addMinutes } from "date-fns";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

// Mock data for our enhanced UI
const MOCK_PATIENTS = [
  { id: 1, name: "John Smith", phone: "555-1234", email: "john@example.com", dob: "1980-05-15", gender: "Male", address: "123 Main St", insurance: "BlueCross", photo: "", lastVisit: "2025-05-01", appointments: 12, preferredDoctor: "Dr. Wilson", tags: ["Diabetic", "Priority"], notes: "Prefers afternoon appointments", insuranceId: "BC-56789", balance: 0 },
  { id: 2, name: "Sarah Johnson", phone: "555-5678", email: "sarah@example.com", dob: "1992-11-22", gender: "Female", address: "456 Oak Ave", insurance: "Aetna", photo: "", lastVisit: "2025-06-10", appointments: 5, preferredDoctor: "Dr. Patel", tags: [], notes: "", insuranceId: "AT-12345", balance: 75 },
  { id: 3, name: "Robert Chen", phone: "555-9012", email: "robert@example.com", dob: "1975-03-30", gender: "Male", address: "789 Pine Rd", insurance: "Medicare", photo: "", lastVisit: "2025-01-15", appointments: 8, preferredDoctor: "Dr. Adams", tags: ["Allergy"], notes: "Allergic to penicillin", insuranceId: "MC-98765", balance: 120 },
  { id: 4, name: "Maria Garcia", phone: "555-3456", email: "maria@example.com", dob: "1988-07-12", gender: "Female", address: "101 Cedar Ln", insurance: "UnitedHealth", photo: "", lastVisit: "2025-04-22", appointments: 3, preferredDoctor: "Dr. Smith", tags: ["New Patient"], notes: "", insuranceId: "UH-45678", balance: 0 },
  { id: 5, name: "David Wilson", phone: "555-7890", email: "david@example.com", dob: "1969-09-08", gender: "Male", address: "202 Maple Dr", insurance: "Cigna", photo: "", lastVisit: "2025-05-30", appointments: 20, preferredDoctor: "Dr. Lee", tags: ["VIP", "Chronic"], notes: "Regular checkup every 3 months", insuranceId: "CI-34567", balance: 45 },
  { id: 6, name: "Jennifer Taylor", phone: "555-2345", email: "jennifer@example.com", dob: "1990-02-14", gender: "Female", address: "303 Elm St", insurance: "Humana", photo: "", lastVisit: "2025-03-05", appointments: 7, preferredDoctor: "Dr. Wilson", tags: ["Pregnant"], notes: "Due date: 2025-09-15", insuranceId: "HU-23456", balance: 0 },
];

const SERVICE_CATEGORIES = [
  { id: "general", name: "General", icon: Activity },
  { id: "dental", name: "Dental", icon: Shield },
  { id: "vision", name: "Vision", icon: User },
  { id: "therapy", name: "Therapy", icon: Heart },
  { id: "preventive", name: "Preventive", icon: Bell },
  { id: "lab", name: "Laboratory", icon: FileText },
  { id: "dermatology", name: "Dermatology", icon: Star },
  { id: "wellness", name: "Wellness", icon: Users },
];

const MOCK_SERVICES = [
  { id: 1, name: "Annual Check-up", category: "general", duration: 30, price: 150, color: "#4CAF50", description: "Complete physical examination and health assessment", requiresFasting: false, popularity: 0.9 },
  { id: 2, name: "Dental Cleaning", category: "dental", duration: 45, price: 120, color: "#2196F3", description: "Professional teeth cleaning and oral health check", requiresFasting: false, popularity: 0.85 },
  { id: 3, name: "Eye Examination", category: "vision", duration: 30, price: 100, color: "#9C27B0", description: "Comprehensive eye test and prescription check", requiresFasting: false, popularity: 0.7 },
  { id: 4, name: "Physical Therapy", category: "therapy", duration: 60, price: 200, color: "#FF9800", description: "Personalized rehabilitation and therapy session", requiresFasting: false, popularity: 0.65 },
  { id: 5, name: "Vaccination", category: "preventive", duration: 15, price: 80, color: "#795548", description: "Standard or seasonal vaccination", requiresFasting: false, popularity: 0.8 },
  { id: 6, name: "Blood Test", category: "lab", duration: 10, price: 70, color: "#F44336", description: "Complete blood count and analysis", requiresFasting: true, popularity: 0.75 },
  { id: 7, name: "Skin Consultation", category: "dermatology", duration: 30, price: 180, color: "#E91E63", description: "Skin condition assessment and treatment recommendations", requiresFasting: false, popularity: 0.6 },
  { id: 8, name: "Nutrition Consultation", category: "wellness", duration: 45, price: 130, color: "#8BC34A", description: "Dietary assessment and nutritional planning", requiresFasting: false, popularity: 0.5 },
  { id: 9, name: "Teeth Whitening", category: "dental", duration: 60, price: 250, color: "#2196F3", description: "Professional teeth whitening treatment", requiresFasting: false, popularity: 0.45 },
  { id: 10, name: "Cholesterol Screening", category: "lab", duration: 15, price: 90, color: "#F44336", description: "Lipid panel blood test", requiresFasting: true, popularity: 0.55 },
  { id: 11, name: "Mental Health Consultation", category: "therapy", duration: 50, price: 220, color: "#FF9800", description: "Mental wellness assessment and counseling", requiresFasting: false, popularity: 0.7 },
  { id: 12, name: "Flu Shot", category: "preventive", duration: 10, price: 60, color: "#795548", description: "Seasonal influenza vaccination", requiresFasting: false, popularity: 0.9 },
];

const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Wilson", specialty: "General", photo: "", rating: 4.8, availability: 0.7, bio: "Board-certified general practitioner with 15 years of experience", schedule: { start: "09:00", end: "17:00", daysOff: [0, 6] }, color: "#4CAF50" }, // 0=Sunday, 6=Saturday
  { id: 2, name: "Dr. Patel", specialty: "Dental", photo: "", rating: 4.9, availability: 0.5, bio: "Specialized in cosmetic and restorative dentistry", schedule: { start: "08:00", end: "16:00", daysOff: [0, 3] }, color: "#2196F3" },
  { id: 3, name: "Dr. Adams", specialty: "Vision", photo: "", rating: 4.6, availability: 0.8, bio: "Ophthalmologist with expertise in retinal diseases", schedule: { start: "10:00", end: "18:00", daysOff: [0, 6] }, color: "#9C27B0" },
  { id: 4, name: "Dr. Smith", specialty: "Therapy", photo: "", rating: 4.7, availability: 0.6, bio: "Physical therapist specializing in sports injuries", schedule: { start: "08:00", end: "16:00", daysOff: [0, 6] }, color: "#FF9800" },
  { id: 5, name: "Dr. Lee", specialty: "Dermatology", photo: "", rating: 4.9, availability: 0.3, bio: "Dermatologist with focus on skin cancer prevention", schedule: { start: "09:00", end: "17:00", daysOff: [0, 5] }, color: "#E91E63" },
  { id: 6, name: "Dr. Johnson", specialty: "General", photo: "", rating: 4.5, availability: 0.9, bio: "Family medicine doctor emphasizing preventative care", schedule: { start: "07:00", end: "15:00", daysOff: [0, 6] }, color: "#673AB7" },
];

// Generate time slots for the next 14 days
const generateTimeSlots = () => {
  const slots = [];
  for (let day = 0; day < 14; day++) {
    const date = addDays(new Date(), day);
    const dayOfWeek = date.getDay(); // 0=Sunday, 6=Saturday
    
    // Generate slots for each doctor based on their schedule
    MOCK_DOCTORS.forEach(doctor => {
      // Skip if it's the doctor's day off
      if (doctor.schedule.daysOff.includes(dayOfWeek)) return;
      
      // Parse doctor's schedule hours
      const startHour = parseInt(doctor.schedule.start.split(':')[0]);
      const endHour = parseInt(doctor.schedule.end.split(':')[0]);
      
      // Generate time slots in 30 min increments during doctor's hours
      for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += 30) {
          // 80% chance of slot being available (randomized availability)
          if (Math.random() > 0.2) {
            slots.push({
              time: `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`,
              date: date,
              available: true,
              doctor: doctor.id,
              duration: 30 // default duration in minutes
            });
          }
        }
      }
    });
  }
  return slots;
};

const MOCK_TIMESLOTS = generateTimeSlots();

// Steps for the booking process
const STEPS = [
  "Patient",
  "Service",
  "Doctor",
  "Date & Time",
  "Extras",
  "Confirm",
];

const TAG_COLORS = {
  "Priority": "bg-red-100 text-red-800",
  "Diabetic": "bg-purple-100 text-purple-800",
  "Allergy": "bg-yellow-100 text-yellow-800",
  "VIP": "bg-green-100 text-green-800",
  "Chronic": "bg-blue-100 text-blue-800",
  "New Patient": "bg-orange-100 text-orange-800",
  "Pregnant": "bg-pink-100 text-pink-800"
};

interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  insurance: string;
  photo: string;
  lastVisit: string;
  appointments: number;
  preferredDoctor: string;
  tags: string[];
  notes: string;
  insuranceId: string;
  balance: number;
}

interface Service {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
  color: string;
  description: string;
  requiresFasting: boolean;
  popularity: number;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  photo: string;
  rating: number;
  availability: number;
  bio: string;
  schedule: {
    start: string;
    end: string;
    daysOff: number[];
  };
  color: string;
}

interface AppointmentTimeSlot {
  time: string;
  date: Date;
  available: boolean;
  doctor: number;
  duration: number;
}

interface AppointmentExtras {
  notes: string;
  sendReminder: boolean;
  reminderTime: string;
  notificationMethods: {
    sms: boolean;
    email: boolean;
    app: boolean;
  };
  insuranceVerified: boolean;
  specialRequirements: string;
  followUpRequired: boolean;
}

const NewAppointment: React.FC = () => {
  // Step management
  const [step, setStep] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "John", "Garcia", "555-12"
  ]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Selected values for each step
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<AppointmentTimeSlot | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Extras and confirmation data
  const [extras, setExtras] = useState<AppointmentExtras>({
    notes: "",
    sendReminder: true,
    reminderTime: "1 day",
    notificationMethods: { sms: true, email: true, app: false },
    insuranceVerified: false,
    specialRequirements: "",
    followUpRequired: false
  });
  
  // UI state management
  const [loading, setLoading] = useState<boolean>(false);
  const [favoritePatients, setFavoritePatients] = useState<number[]>([1, 5]); // IDs of favorited patients
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  
  // Filtered data based on search/selections
  const filteredPatients = MOCK_PATIENTS.filter(p => 
    searchQuery === "" || 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredServices = activeCategory === "all" 
    ? MOCK_SERVICES 
    : MOCK_SERVICES.filter(s => s.category === activeCategory);
    
  const filteredDoctors = selectedService 
    ? MOCK_DOCTORS.filter(d => d.specialty === selectedService.category || d.specialty === "General")
    : MOCK_DOCTORS;
  
  const filteredTimeSlots = MOCK_TIMESLOTS.filter(slot => 
    (!selectedDate || isSameDay(slot.date, selectedDate)) &&
    (!selectedDoctor || slot.doctor === selectedDoctor.id) &&
    (selectedService ? slot.duration >= selectedService.duration : true)
  );

  // Group time slots by hour for better UI organization
  const timeSlotsByHour = filteredTimeSlots.reduce((acc, slot) => {
    const hour = slot.time.split(':')[0];
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(slot);
    return acc;
  }, {} as Record<string, AppointmentTimeSlot[]>);
  
  // Step navigation
  const next = () => {
    if (step < STEPS.length - 1) {
      setLoading(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setLoading(false);
      }, 300);
    } else {
      handleFinish();
    }
  };
  
  const back = () => {
    if (step > 0) {
      setLoading(true);
      setTimeout(() => {
        setStep((s) => s - 1);
        setLoading(false);
      }, 200);
    }
  };
  
  // Check if we can proceed to the next step
  const canProceed = () => {
    switch(step) {
      case 0: return selectedPatient !== null;
      case 1: return selectedService !== null;
      case 2: return selectedDoctor !== null;
      case 3: return selectedTimeSlot !== null;
      case 4: return true; // Extras are optional
      default: return true;
    }
  };
  
  // Handle patient search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && !recentSearches.includes(query) && query.length > 2) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };
  
  // Handle patient selection
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchQuery(""); // Clear search after selection
    
    // If patient has preferred doctor, preselect it when we get to that step
    const preferredDoctor = MOCK_DOCTORS.find(d => d.name === patient.preferredDoctor);
    if (preferredDoctor) {
      setSelectedDoctor(preferredDoctor);
    }
  };
  
  // Handle patient favoriting
  const toggleFavorite = (patientId: number) => {
    setFavoritePatients(prev => 
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };
  
  // Handle service selection
  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    
    // If service category doesn't match current doctor's specialty, reset doctor
    if (selectedDoctor && selectedDoctor.specialty !== service.category && selectedDoctor.specialty !== "General") {
      setSelectedDoctor(null);
    }
  };
  
  // Handle doctor selection
  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    // Reset time slot if it doesn't match the selected doctor
    if (selectedTimeSlot && selectedTimeSlot.doctor !== doctor.id) {
      setSelectedTimeSlot(null);
    }
  };
  
  // Handle time slot selection
  const handleSelectTimeSlot = (slot: AppointmentTimeSlot) => {
    setSelectedTimeSlot(slot);
    setSelectedDate(slot.date);
  };
  
  // Handle notification preferences
  const handleNotificationChange = (type: 'sms' | 'email' | 'app', checked: boolean) => {
    setExtras(prev => ({
      ...prev,
      notificationMethods: {
        ...prev.notificationMethods,
        [type]: checked
      }
    }));
  };
  
  // Handle booking completion
  const handleFinish = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast.success("Appointment booked successfully!");
      // Reset form
      setStep(0);
      setSelectedPatient(null);
      setSelectedService(null);
      setSelectedDoctor(null);
      setSelectedTimeSlot(null);
      setSelectedDate(new Date());
      setExtras({
        notes: "",
        sendReminder: true,
        reminderTime: "1 day",
        notificationMethods: { sms: true, email: true, app: false },
        insuranceVerified: false,
        specialRequirements: "",
        followUpRequired: false
      });
      setLoading(false);
    }, 800);  
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="New Appointment" pageSubtitle="Book a patient appointment" />
        <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-6">
          {/* Stepper */}
          <Stepper steps={STEPS} currentStep={step} />

          {/* Step 1: Patient Selection */}
          {step === 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Search & select */}
              <div className="md:col-span-2 space-y-4">
                <Input placeholder="Search patient by name, phone, or ID" />
                <div className="border rounded h-56 flex items-center justify-center text-gray-400">
                  Live search results (TBD)
                </div>
                <Button size="sm" className="flex items-center space-x-1" onClick={() => setDrawerOpen(true)}>
                  <Plus className="w-4 h-4" /> <span>Register New Patient</span>
                </Button>
                <button onClick={() => toast("Guest booking")} className="text-sm text-blue-600 underline">
                  Book as Guest
                </button>
              </div>

              {/* Summary */}
              <Card>
                <CardContent className="p-4 min-h-[220px] flex items-center justify-center text-gray-400">
                  {selectedPatient ? "Patient chosen" : "No one selected"}
                </CardContent>
              </Card>
            </div>
          )}

          {/* TODO: Other steps skeleton */}
          {step > 0 && (
            <div className="h-64 border rounded flex items-center justify-center text-gray-400">
              Step {step + 1} UI coming soon
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" disabled={step === 0} onClick={back}>Back</Button>
            <Button disabled={step === 0 && !selectedPatient} onClick={next}>
              {step === STEPS.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>

      {/* Register new patient drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="w-full md:max-w-xl ml-auto md:rounded-l-lg">
          <DrawerHeader>
            <DrawerTitle>Register Patient (Quick)</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <Input placeholder="Full Name" />
            <Input placeholder="Phone" />
            <Input placeholder="Email" />
            <Textarea placeholder="Address" />
          </div>
          <DrawerFooter>
            <Button size="sm" onClick={() => { toast.success("Patient created (mock)"); setDrawerOpen(false); }}>Save</Button>
            <DrawerClose asChild>
              <Button size="sm" variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NewAppointment;
