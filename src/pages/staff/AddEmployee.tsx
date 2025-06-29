import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';
import { LogOut, Bell, User, ArrowLeft, ArrowRight, Save, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PersonalInfoForm from '@/components/staff/PersonalInfoForm';
import EmploymentDetailsForm from '@/components/staff/EmploymentDetailsForm';
import DocumentUploadForm from '@/components/staff/DocumentUploadForm';
import SystemAccessForm from '@/components/staff/SystemAccessForm';
import { useNavigate } from 'react-router-dom';

// Define the employee data structure
export interface EmployeeFormData {
  // Personal Information
  personalInfo: {
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
  
  // Employment Details
  employmentDetails: {
    employeeId: string;
    role: string;
    department: string;
    reportingManager: string;
    joinDate: Date | undefined;
    employmentType: string;
    workSchedule: string;
    salary: {
      basic: number;
      hra: number;
      allowances: number;
      total: number;
    };
    bankDetails: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      ifscCode: string;
    };
  };
  
  // Documents
  documents: {
    idProofs: File[];
    educationalCertificates: File[];
    medicalLicense: File | null;
    employmentContract: File | null;
    otherDocuments: File[];
  };
  
  // System Access
  systemAccess: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    permissions: string[];
    accessLevel: string;
  };
}

// Initial form data
const initialFormData: EmployeeFormData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    gender: '',
    maritalStatus: '',
    bloodGroup: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
    },
    contactInfo: {
      email: '',
      phone: '',
      alternatePhone: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    photo: null,
  },
  employmentDetails: {
    employeeId: '',
    role: '',
    department: '',
    reportingManager: '',
    joinDate: undefined,
    employmentType: '',
    workSchedule: '',
    salary: {
      basic: 0,
      hra: 0,
      allowances: 0,
      total: 0,
    },
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: '',
    },
  },
  documents: {
    idProofs: [],
    educationalCertificates: [],
    medicalLicense: null,
    employmentContract: null,
    otherDocuments: [],
  },
  systemAccess: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    permissions: [],
    accessLevel: '',
  },
};

const AddEmployee: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [formProgress, setFormProgress] = useState({
    personal: false,
    employment: false,
    documents: false,
    system: false,
  });

  // Update form data
  const updateFormData = (section: keyof EmployeeFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data,
      },
    }));
  };

  // Mark section as complete
  const markSectionComplete = (section: keyof typeof formProgress, isComplete: boolean) => {
    setFormProgress(prev => ({
      ...prev,
      [section]: isComplete,
    }));
  };

  // Navigate to next tab
  const goToNextTab = () => {
    if (activeTab === 'personal') setActiveTab('employment');
    else if (activeTab === 'employment') setActiveTab('documents');
    else if (activeTab === 'documents') setActiveTab('system');
  };

  // Navigate to previous tab
  const goToPreviousTab = () => {
    if (activeTab === 'employment') setActiveTab('personal');
    else if (activeTab === 'documents') setActiveTab('employment');
    else if (activeTab === 'system') setActiveTab('documents');
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your API
      console.log('Submitting employee data:', formData);
      
      // Show success message
      alert('Employee added successfully!');
      
      // Navigate back to employee list
      navigate('/staff/employees');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee. Please try again.');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderBar pageTitle="Add New Employee" pageSubtitle="Create a new staff profile" />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-6 flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-4"
              onClick={() => navigate('/staff/employees')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Employee List
            </Button>
            <h2 className="text-2xl font-bold text-gray-800">Add New Employee</h2>
          </div>

          <Card>
            <CardContent className="p-6">
              {/* Progress Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="personal" className="flex flex-col items-center py-3">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${formProgress.personal ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      {formProgress.personal ? <Check className="h-4 w-4" /> : '1'}
                    </div>
                    <span>Personal Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="employment" className="flex flex-col items-center py-3">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${formProgress.employment ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      {formProgress.employment ? <Check className="h-4 w-4" /> : '2'}
                    </div>
                    <span>Employment</span>
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex flex-col items-center py-3">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${formProgress.documents ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      {formProgress.documents ? <Check className="h-4 w-4" /> : '3'}
                    </div>
                    <span>Documents</span>
                  </TabsTrigger>
                  <TabsTrigger value="system" className="flex flex-col items-center py-3">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${formProgress.system ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                      {formProgress.system ? <Check className="h-4 w-4" /> : '4'}
                    </div>
                    <span>System Access</span>
                  </TabsTrigger>
                </TabsList>

                {/* Form Content */}
                <TabsContent value="personal">
                  <PersonalInfoForm 
                    formData={formData.personalInfo} 
                    updateFormData={(data) => updateFormData('personalInfo', data)}
                    markSectionComplete={(isComplete) => markSectionComplete('personal', isComplete)}
                  />
                </TabsContent>
                
                <TabsContent value="employment">
                  <EmploymentDetailsForm 
                    formData={formData.employmentDetails} 
                    updateFormData={(data) => updateFormData('employmentDetails', data)}
                    markSectionComplete={(isComplete) => markSectionComplete('employment', isComplete)}
                  />
                </TabsContent>
                
                <TabsContent value="documents">
                  <DocumentUploadForm 
                    formData={formData.documents} 
                    updateFormData={(data) => updateFormData('documents', data)}
                    markSectionComplete={(isComplete) => markSectionComplete('documents', isComplete)}
                  />
                </TabsContent>
                
                <TabsContent value="system">
                  <SystemAccessForm 
                    formData={formData.systemAccess} 
                    updateFormData={(data) => updateFormData('systemAccess', data)}
                    markSectionComplete={(isComplete) => markSectionComplete('system', isComplete)}
                  />
                </TabsContent>
              </Tabs>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={goToPreviousTab}
                  disabled={activeTab === 'personal'}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <div>
                  {activeTab === 'system' ? (
                    <Button 
                      onClick={handleSubmit}
                      disabled={!Object.values(formProgress).every(Boolean)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Employee
                    </Button>
                  ) : (
                    <Button onClick={goToNextTab}>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddEmployee;
