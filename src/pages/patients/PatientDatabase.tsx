import React, { useEffect, useMemo, useState } from "react";
import { 
  Search, User, Calendar, FileText, CreditCard, MessageSquare, 
  Phone, Mail, MapPin, Heart, AlertCircle, Plus, Edit, Trash2,
  Download, Upload, Filter, BarChart3, PieChart, TrendingUp,
  Clock, Star, DollarSign, Activity, ChevronDown, ChevronRight,
  X, Save, Eye, Settings, Shield, History, Pill, Stethoscope
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";

// Extended Patient type with all necessary fields
type Patient = {
  id: string;
  fullName: string;
  contact: string;
  email?: string;
  address?: string;
  dob?: string;
  regDate: string;
  lastVisit?: string;
  emergencyContact?: string;
  
  // Medical Information
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  conditions?: string[];
  
  // Treatment & Appointment History
  appointments: Appointment[];
  treatments: Treatment[];
  payments: Payment[];
  communications: Communication[];
  
  // Preferences & Settings
  preferences?: {
    preferredDoctor?: string;
    preferredTime?: string;
    communicationMethod?: 'phone' | 'email' | 'sms';
    reminderSettings?: boolean;
  };
  
  // Documents
  documents?: Document[];
  
  // Analytics
  totalSpent?: number;
  visitCount?: number;
  satisfactionScore?: number;
  lastSatisfactionDate?: string;
};

type Appointment = {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
};

type Treatment = {
  id: string;
  date: string;
  type: string;
  description: string;
  doctor: string;
  cost: number;
  status: 'completed' | 'ongoing' | 'cancelled';
};

type Payment = {
  id: string;
  date: string;
  amount: number;
  method: 'cash' | 'card' | 'insurance' | 'online';
  description: string;
  status: 'paid' | 'pending' | 'overdue';
};

type Communication = {
  id: string;
  date: string;
  type: 'call' | 'email' | 'sms' | 'visit';
  direction: 'incoming' | 'outgoing';
  subject: string;
  content: string;
  staff: string;
};

type Document = {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url?: string;
};

const PatientDatabase: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState("database");
  const [activeProfileTab, setActiveProfileTab] = useState("overview");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showAddPatient, setShowAddPatient] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    fromDate: "",
    toDate: "",
    lastVisitFrom: "",
    lastVisitTo: "",
    treatmentType: "",
    doctor: "",
    status: "",
    bloodType: "",
    minAge: "",
    maxAge: ""
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockPatients: Patient[] = [
      {
        id: "P001",
        fullName: "John Doe",
        contact: "555-0123",
        email: "john.doe@email.com",
        address: "123 Main St, City",
        dob: "1990-05-15",
        regDate: "2024-01-15",
        lastVisit: "2024-06-10",
        emergencyContact: "555-0124",
        bloodType: "O+",
        allergies: ["Penicillin", "Shellfish"],
        medications: ["Lisinopril", "Metformin"],
        conditions: ["Hypertension", "Diabetes Type 2"],
        appointments: [
          {
            id: "A001",
            date: "2024-06-20",
            time: "10:00",
            doctor: "Dr. Smith",
            type: "Follow-up",
            status: "scheduled",
            notes: "Blood pressure check"
          }
        ],
        treatments: [
          {
            id: "T001",
            date: "2024-06-10",
            type: "Consultation",
            description: "Routine checkup and medication review",
            doctor: "Dr. Smith",
            cost: 150,
            status: "completed"
          }
        ],
        payments: [
          {
            id: "PAY001",
            date: "2024-06-10",
            amount: 150,
            method: "card",
            description: "Consultation fee",
            status: "paid"
          }
        ],
        communications: [
          {
            id: "C001",
            date: "2024-06-05",
            type: "call",
            direction: "outgoing",
            subject: "Appointment Reminder",
            content: "Called to remind about upcoming appointment",
            staff: "Sarah Johnson"
          }
        ],
        preferences: {
          preferredDoctor: "Dr. Smith",
          preferredTime: "morning",
          communicationMethod: "email",
          reminderSettings: true
        },
        documents: [
          {
            id: "D001",
            name: "Lab Results - June 2024",
            type: "pdf",
            uploadDate: "2024-06-10",
            size: "2.3 MB"
          }
        ],
        totalSpent: 450,
        visitCount: 3,
        satisfactionScore: 4.5
      },
      {
        id: "P002",
        fullName: "Jane Smith",
        contact: "555-0456",
        email: "jane.smith@email.com",
        address: "456 Oak Ave, City",
        dob: "1985-08-22",
        regDate: "2024-02-20",
        lastVisit: "2024-06-15",
        bloodType: "A-",
        allergies: ["Latex"],
        medications: ["Advil"],
        conditions: [],
        appointments: [],
        treatments: [
          {
            id: "T002",
            date: "2024-06-15",
            type: "Dental Cleaning",
            description: "Routine dental cleaning and examination",
            doctor: "Dr. Johnson",
            cost: 120,
            status: "completed"
          }
        ],
        payments: [
          {
            id: "PAY002",
            date: "2024-06-15",
            amount: 120,
            method: "insurance",
            description: "Dental cleaning",
            status: "paid"
          }
        ],
        communications: [],
        preferences: {
          preferredDoctor: "Dr. Johnson",
          preferredTime: "afternoon",
          communicationMethod: "phone"
        },
        documents: [],
        totalSpent: 240,
        visitCount: 2,
        satisfactionScore: 5.0
      }
    ];
    setPatients(mockPatients);
  }, []);

  // Filtered patients based on search and filter criteria
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const searchTerm = filters.search.toLowerCase();
      const matchesSearch = !searchTerm || 
        patient.fullName.toLowerCase().includes(searchTerm) ||
        patient.contact.includes(searchTerm) ||
        patient.id.toLowerCase().includes(searchTerm) ||
        patient.email?.toLowerCase().includes(searchTerm);

      const matchesRegDate = (!filters.fromDate || new Date(patient.regDate) >= new Date(filters.fromDate)) &&
                           (!filters.toDate || new Date(patient.regDate) <= new Date(filters.toDate));

      const matchesLastVisit = (!filters.lastVisitFrom || !patient.lastVisit || new Date(patient.lastVisit) >= new Date(filters.lastVisitFrom)) &&
                              (!filters.lastVisitTo || !patient.lastVisit || new Date(patient.lastVisit) <= new Date(filters.lastVisitTo));

      const matchesTreatmentType = !filters.treatmentType || 
        patient.treatments.some(t => t.type.toLowerCase().includes(filters.treatmentType.toLowerCase()));

      const matchesDoctor = !filters.doctor || 
        patient.treatments.some(t => t.doctor.toLowerCase().includes(filters.doctor.toLowerCase())) ||
        patient.appointments.some(a => a.doctor.toLowerCase().includes(filters.doctor.toLowerCase()));

      const matchesBloodType = !filters.bloodType || patient.bloodType === filters.bloodType;

      // Age calculation
      let matchesAge = true;
      if (patient.dob && (filters.minAge || filters.maxAge)) {
        const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();
        matchesAge = (!filters.minAge || age >= parseInt(filters.minAge)) &&
                    (!filters.maxAge || age <= parseInt(filters.maxAge));
      }

      return matchesSearch && matchesRegDate && matchesLastVisit && 
             matchesTreatmentType && matchesDoctor && matchesBloodType && matchesAge;
    });
  }, [patients, filters]);

  // Analytics calculations
  const analytics = useMemo(() => {
    const totalPatients = patients.length;
    const activePatients = patients.filter(p => p.lastVisit && 
      new Date(p.lastVisit) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)).length;
    
    const totalRevenue = patients.reduce((sum, p) => sum + (p.totalSpent || 0), 0);
    const avgSatisfaction = patients.reduce((sum, p) => sum + (p.satisfactionScore || 0), 0) / patients.length;
    
    const treatmentTypes = patients.flatMap(p => p.treatments.map(t => t.type))
      .reduce((acc, type) => {
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const monthlyRevenue = patients.flatMap(p => p.payments)
      .reduce((acc, payment) => {
        const month = new Date(payment.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + payment.amount;
        return acc;
      }, {} as Record<string, number>);

    return {
      totalPatients,
      activePatients,
      totalRevenue,
      avgSatisfaction,
      treatmentTypes,
      monthlyRevenue
    };
  }, [patients]);

  const clearFilters = () => {
    setFilters({
      search: "",
      fromDate: "",
      toDate: "",
      lastVisitFrom: "",
      lastVisitTo: "",
      treatmentType: "",
      doctor: "",
      status: "",
      bloodType: "",
      minAge: "",
      maxAge: ""
    });
  };

  const PatientCard = ({ patient }: { patient: Patient }) => (
    <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer"
         onClick={() => setSelectedPatient(patient)}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{patient.fullName}</h3>
        <span className="text-sm text-[#156450]">{patient.id}</span>
      </div>
      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Phone size={14} />
          {patient.contact}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={14} />
          Last visit: {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'Never'}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={14} />
          Total spent: ${patient.totalSpent || 0}
        </div>
      </div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-1">
          <Star size={14} className="text-yellow-500" />
          <span className="text-sm">{patient.satisfactionScore || 'N/A'}</span>
        </div>
        <div className="flex gap-1">
          {patient.conditions?.slice(0, 2).map((condition, idx) => (
            <span key={idx} className="text-xs bg-green-100 text-[#156450] px-2 py-1 rounded">
              {condition}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const PatientProfile = ({ patient }: { patient: Patient }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedPatient, setEditedPatient] = useState(patient);

    const profileTabs = [
      { id: "overview", label: "Overview", icon: User },
      { id: "medical", label: "Medical History", icon: Heart },
      { id: "appointments", label: "Appointments", icon: Calendar },
      { id: "treatments", label: "Treatments", icon: Stethoscope },
      { id: "payments", label: "Payments", icon: CreditCard },
      { id: "communications", label: "Communications", icon: MessageSquare },
      { id: "documents", label: "Documents", icon: FileText },
      { id: "preferences", label: "Preferences", icon: Settings }
    ];

    const savePatient = () => {
      setPatients(prev => prev.map(p => p.id === patient.id ? editedPatient : p));
      setSelectedPatient(editedPatient);
      setEditMode(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
        <div className="bg-white w-full max-w-4xl h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{patient.fullName}</h2>
              <p className="text-gray-600">Patient ID: {patient.id}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-2 px-4 py-2 bg-[#156450] text-white rounded-md hover:bg-[#0d503e]"
              >
                <Edit size={16} />
                {editMode ? 'Cancel' : 'Edit'}
              </button>
              {editMode && (
                <button
                  onClick={savePatient}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  <Save size={16} />
                  Save
                </button>
              )}
              <button
                onClick={() => setSelectedPatient(null)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b overflow-x-auto">
            {profileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveProfileTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium whitespace-nowrap ${
                  activeProfileTab === tab.id
                    ? 'border-[#156450] text-[#156450]'
                    : 'border-transparent text-[#156450] hover:text-gray-700'
                }`}
              >
                {React.createElement(tab.icon, { size: 16 })}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeProfileTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editedPatient.fullName}
                            onChange={(e) => setEditedPatient({...editedPatient, fullName: e.target.value})}
                            className="w-full px-3 py-2 border border-[#156450] rounded-md"
                          />
                        ) : (
                          <p className="text-gray-900">{patient.fullName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editedPatient.contact}
                            onChange={(e) => setEditedPatient({...editedPatient, contact: e.target.value})}
                            className="w-full px-3 py-2 border border-[#156450] rounded-md"
                          />
                        ) : (
                          <p className="text-gray-900">{patient.contact}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        {editMode ? (
                          <input
                            type="email"
                            value={editedPatient.email || ''}
                            onChange={(e) => setEditedPatient({...editedPatient, email: e.target.value})}
                            className="w-full px-3 py-2 border border-[#156450] rounded-md"
                          />
                        ) : (
                          <p className="text-gray-900">{patient.email || 'Not provided'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        {editMode ? (
                          <textarea
                            value={editedPatient.address || ''}
                            onChange={(e) => setEditedPatient({...editedPatient, address: e.target.value})}
                            className="w-full px-3 py-2 border border-[#156450] rounded-md"
                            rows={2}
                          />
                        ) : (
                          <p className="text-gray-900">{patient.address || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Medical Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                        <p className="text-gray-900">{patient.bloodType || 'Unknown'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                        <div className="flex flex-wrap gap-1">
                          {patient.allergies?.map((allergy, idx) => (
                            <span key={idx} className="bg-green-100 text-[#156450] px-2 py-1 rounded text-xs">
                              {allergy}
                            </span>
                          )) || <p className="text-[#156450]">None reported</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Medications</label>
                        <div className="flex flex-wrap gap-1">
                          {patient.medications?.map((med, idx) => (
                            <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              {med}
                            </span>
                          )) || <p className="text-[#156450]">None</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Conditions</label>
                        <div className="flex flex-wrap gap-1">
                          {patient.conditions?.map((condition, idx) => (
                            <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                              {condition}
                            </span>
                          )) || <p className="text-[#156450]">None reported</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <User className="text-[#156450]" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-[#156450]">Total Visits</p>
                        <p className="text-2xl font-bold text-[#156450]">{patient.visitCount || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <DollarSign className="text-green-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-green-600">Total Spent</p>
                        <p className="text-2xl font-bold text-green-900">${patient.totalSpent || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <Star className="text-yellow-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-yellow-600">Satisfaction</p>
                        <p className="text-2xl font-bold text-yellow-900">{patient.satisfactionScore || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Clock className="text-purple-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-purple-600">Last Visit</p>
                        <p className="text-sm font-bold text-purple-900">
                          {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeProfileTab === "appointments" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Appointment History</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#156450] text-white rounded-md">
                    <Plus size={16} />
                    New Appointment
                  </button>
                </div>
                <div className="space-y-3">
                  {patient.appointments.map((appointment) => (
                    <div key={appointment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{appointment.type}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </p>
                          <p className="text-sm text-gray-600">with {appointment.doctor}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'cancelled' ? 'bg-green-100 text-[#156450]' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-gray-700 mt-2">{appointment.notes}</p>
                      )}
                    </div>
                  ))}
                  {patient.appointments.length === 0 && (
                    <p className="text-[#156450] text-center py-8">No appointments found</p>
                  )}
                </div>
              </div>
            )}

            {activeProfileTab === "treatments" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Treatment History</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#156450] text-white rounded-md">
                    <Plus size={16} />
                    Add Treatment
                  </button>
                </div>
                <div className="space-y-3">
                  {patient.treatments.map((treatment) => (
                    <div key={treatment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium">{treatment.type}</p>
                          <p className="text-sm text-gray-600 mt-1">{treatment.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>{new Date(treatment.date).toLocaleDateString()}</span>
                            <span>{treatment.doctor}</span>
                            <span className="font-medium">${treatment.cost}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          treatment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          treatment.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                          'bg-green-100 text-[#156450]'
                        }`}>
                          {treatment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {patient.treatments.length === 0 && (
                    <p className="text-[#156450] text-center py-8">No treatments found</p>
                  )}
                </div>
              </div>
            )}

            {activeProfileTab === "payments" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Payment History</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#156450] text-white rounded-md">
                    <Plus size={16} />
                    Record Payment
                  </button>
                </div>
                <div className="space-y-3">
                  {patient.payments.map((payment) => (
                    <div key={payment.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>{new Date(payment.date).toLocaleDateString()}</span>
                            <span className="capitalize">{payment.method}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${payment.amount}</p>
                          <span className={`px-2 py-1 rounded text-xs ${
                            payment.status === 'paid' ? 'bg-green-100 text-green-800' :
                            payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-[#156450]'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {patient.payments.length === 0 && (
                    <p className="text-[#156450] text-center py-8">No payments found</p>
                  )}
                </div>
              </div>
            )}

            {activeProfileTab === "communications" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Communication Log</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#156450] text-white rounded-md">
                    <Plus size={16} />
                    Add Communication
                  </button>
                </div>
                <div className="space-y-3">
                  {patient.communications.map((comm) => (
                    <div key={comm.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comm.subject}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              comm.type === 'call' ? 'bg-green-100 text-green-800' :
                              comm.type === 'email' ? 'bg-green-100 text-green-800' :
                              comm.type === 'sms' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {comm.type}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              comm.direction === 'incoming' ? 'bg-gray-100 text-gray-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {comm.direction}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{comm.content}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span>{new Date(comm.date).toLocaleDateString()}</span>
                            <span>by {comm.staff}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {patient.communications.length === 0 && (
                    <p className="text-[#156450] text-center py-8">No communications found</p>
                  )}
                </div>
              </div>
            )}

            {activeProfileTab === "documents" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Documents</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#156450] text-white rounded-md">
                    <Upload size={16} />
                    Upload Document
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patient.documents?.map((doc) => (
                    <div key={doc.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {doc.type.toUpperCase()} • {doc.size}
                          </p>
                          <p className="text-xs text-gray-600">
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <button className="p-1 text-gray-400 hover:text-[#156450]">
                            <Eye size={14} />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-green-600">
                            <Download size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )) || (
                    <div className="col-span-full">
                      <p className="text-[#156450] text-center py-8">No documents uploaded</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeProfileTab === "preferences" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Patient Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Doctor</label>
                      <p className="text-gray-900">{patient.preferences?.preferredDoctor || 'No preference'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                      <p className="text-gray-900 capitalize">{patient.preferences?.preferredTime || 'No preference'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Communication Method</label>
                      <p className="text-gray-900 capitalize">{patient.preferences?.communicationMethod || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reminder Settings</label>
                      <p className="text-gray-900">{patient.preferences?.reminderSettings ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Privacy Settings</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Allow SMS reminders</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Allow email communications</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Share data with insurance</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Marketing communications</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar pageTitle="Patient Database" pageSubtitle="Comprehensive patient management system" />
        <div className="flex justify-end px-6 py-4">
          <button
            onClick={() => setShowAddPatient(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#156450] text-white rounded-md hover:bg-[#0d503e] transition-colors"
          >
            <Plus size={16} />
            Add Patient
          </button>
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {/* Header */}
          {/* Remove duplicate header since we're using HeaderBar */}
          <div className="bg-white shadow-sm border-b hidden">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#156450]">Patient Database</h1>
              <p className="text-gray-600">Comprehensive patient management system</p>
            </div>
            <button
              onClick={() => setShowAddPatient(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#156450] text-white rounded-md hover:bg-[#0d503e] transition-colors"
            >
              <Plus size={16} />
              Add Patient
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Main Tabs */}
        <div className="flex mb-6 border-b">
          {[
            { id: "database", label: "Patient Database", icon: User },
            { id: "analytics", label: "Analytics", icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-[#156450] text-[#156450]'
                  : 'border-transparent text-[#156450] hover:text-gray-700'
              }`}
            >
              {React.createElement(tab.icon, { size: 16 })}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "database" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg border p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search name, phone, ID, email..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full pl-10 pr-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                  />
                </div>
                <input
                  type="date"
                  placeholder="Registration From"
                  value={filters.fromDate}
                  onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
                  className="px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                />
                <input
                  type="date"
                  placeholder="Registration To"
                  value={filters.toDate}
                  onChange={(e) => setFilters({...filters, toDate: e.target.value})}
                  className="px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                />
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-[#156450] rounded-md hover:bg-gray-50"
                >
                  <Filter size={16} />
                  Advanced
                  {showAdvancedSearch ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
              </div>

              {showAdvancedSearch && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t">
                  <input
                    type="date"
                    placeholder="Last Visit From"
                    value={filters.lastVisitFrom}
                    onChange={(e) => setFilters({...filters, lastVisitFrom: e.target.value})}
                    className="px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                  />
                  <input
                    type="date"
                    placeholder="Last Visit To"
                    value={filters.lastVisitTo}
                    onChange={(e) => setFilters({...filters, lastVisitTo: e.target.value})}
                    className="px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                  />
                  <input
                    type="text"
                    placeholder="Treatment Type"
                    value={filters.treatmentType}
                    onChange={(e) => setFilters({...filters, treatmentType: e.target.value})}
                    className="px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                  />
                  <input
                    type="text"
                    placeholder="Doctor"
                    value={filters.doctor}
                    onChange={(e) => setFilters({...filters, doctor: e.target.value})}
                    className="px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                  />
                  <select
                    value={filters.bloodType}
                    onChange={(e) => setFilters({...filters, bloodType: e.target.value})}
                    className="px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                  >
                    <option value="">All Blood Types</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min Age"
                      value={filters.minAge}
                      onChange={(e) => setFilters({...filters, minAge: e.target.value})}
                      className="w-full px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                    />
                    <input
                      type="number"
                      placeholder="Max Age"
                      value={filters.maxAge}
                      onChange={(e) => setFilters({...filters, maxAge: e.target.value})}
                      className="w-full px-3 py-2 border border-[#156450] rounded-md focus:outline-none focus:ring-2 focus:ring-[#156450]"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-600">
                  Showing {filteredPatients.length} of {patients.length} patients
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#156450] hover:text-green-800"
                >
                  Clear all filters
                </button>
              </div>
            </div>

            {/* Patient Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-12">
                <User className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
                <p className="mt-1 text-sm text-[#156450]">
                  Try adjusting your search criteria or add a new patient.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <User className="text-[#156450]" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Patients</p>
                    <p className="text-2xl font-bold">{analytics.totalPatients}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Activity className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Patients</p>
                    <p className="text-2xl font-bold">{analytics.activePatients}</p>
                    <p className="text-xs text-[#156450]">Last 90 days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <DollarSign className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Star className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Satisfaction</p>
                    <p className="text-2xl font-bold">{analytics.avgSatisfaction.toFixed(1)}</p>
                    <p className="text-xs text-[#156450]">Out of 5.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Treatment Types</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.treatmentTypes).map(([type, count]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm">{type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#156450] h-2 rounded-full" 
                            style={{ width: `${(count / Math.max(...Object.values(analytics.treatmentTypes))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.monthlyRevenue).slice(-6).map(([month, revenue]) => (
                    <div key={month} className="flex justify-between items-center">
                      <span className="text-sm">{month}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(revenue / Math.max(...Object.values(analytics.monthlyRevenue))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">${revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Analytics */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Patient Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Top Conditions</h4>
                  <div className="space-y-2">
                    {patients.flatMap(p => p.conditions || [])
                      .reduce((acc, condition) => {
                        acc[condition] = (acc[condition] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                      && Object.entries(patients.flatMap(p => p.conditions || [])
                        .reduce((acc, condition) => {
                          acc[condition] = (acc[condition] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>))
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 5)
                        .map(([condition, count]) => (
                          <div key={condition} className="flex justify-between text-sm">
                            <span>{condition}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Common Allergies</h4>
                  <div className="space-y-2">
                    {patients.flatMap(p => p.allergies || [])
                      .reduce((acc, allergy) => {
                        acc[allergy] = (acc[allergy] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                      && Object.entries(patients.flatMap(p => p.allergies || [])
                        .reduce((acc, allergy) => {
                          acc[allergy] = (acc[allergy] || 0) + 1;
                          return acc;
                        }, {} as Record<string, number>))
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 5)
                        .map(([allergy, count]) => (
                          <div key={allergy} className="flex justify-between text-sm">
                            <span>{allergy}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Blood Type Distribution</h4>
                  <div className="space-y-2">
                    {patients.reduce((acc, p) => {
                      if (p.bloodType) acc[p.bloodType] = (acc[p.bloodType] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                    && Object.entries(patients.reduce((acc, p) => {
                      if (p.bloodType) acc[p.bloodType] = (acc[p.bloodType] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>))
                      .sort(([,a], [,b]) => b - a)
                      .map(([bloodType, count]) => (
                        <div key={bloodType} className="flex justify-between text-sm">
                          <span>{bloodType}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

          {/* Patient Profile Modal */}
          {selectedPatient && <PatientProfile patient={selectedPatient} />}
        </div>
      </div>
    </div>
  );
};

export default PatientDatabase;