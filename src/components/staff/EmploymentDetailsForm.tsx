import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmploymentDetailsFormProps {
  formData: {
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
  updateFormData: (data: any) => void;
  markSectionComplete: (isComplete: boolean) => void;
}

// Mock data for dropdowns
const departments = [
  { id: 'medical', name: 'Medical' },
  { id: 'nursing', name: 'Nursing' },
  { id: 'admin', name: 'Administration' },
  { id: 'reception', name: 'Reception' },
  { id: 'pharmacy', name: 'Pharmacy' },
  { id: 'laboratory', name: 'Laboratory' },
  { id: 'radiology', name: 'Radiology' },
  { id: 'physiotherapy', name: 'Physiotherapy' },
  { id: 'housekeeping', name: 'Housekeeping' },
  { id: 'security', name: 'Security' },
];

const roles = [
  { id: 'doctor', name: 'Doctor', department: 'medical' },
  { id: 'nurse', name: 'Nurse', department: 'nursing' },
  { id: 'admin_staff', name: 'Administrative Staff', department: 'admin' },
  { id: 'receptionist', name: 'Receptionist', department: 'reception' },
  { id: 'pharmacist', name: 'Pharmacist', department: 'pharmacy' },
  { id: 'lab_technician', name: 'Lab Technician', department: 'laboratory' },
  { id: 'radiologist', name: 'Radiologist', department: 'radiology' },
  { id: 'physiotherapist', name: 'Physiotherapist', department: 'physiotherapy' },
  { id: 'housekeeping_staff', name: 'Housekeeping Staff', department: 'housekeeping' },
  { id: 'security_guard', name: 'Security Guard', department: 'security' },
  { id: 'manager', name: 'Department Manager', department: '' },
  { id: 'director', name: 'Director', department: '' },
];

const managers = [
  { id: '1', name: 'Dr. Rajesh Kumar', role: 'Medical Director' },
  { id: '2', name: 'Priya Singh', role: 'Head Nurse' },
  { id: '3', name: 'Amit Sharma', role: 'Admin Manager' },
  { id: '4', name: 'Neha Gupta', role: 'HR Manager' },
  { id: '5', name: 'Vikram Patel', role: 'Operations Manager' },
];

const employmentTypes = [
  { id: 'full_time', name: 'Full Time' },
  { id: 'part_time', name: 'Part Time' },
  { id: 'contract', name: 'Contract' },
  { id: 'intern', name: 'Intern' },
  { id: 'probation', name: 'Probation' },
];

const workSchedules = [
  { id: 'regular', name: 'Regular (9 AM - 5 PM)' },
  { id: 'morning', name: 'Morning Shift (6 AM - 2 PM)' },
  { id: 'evening', name: 'Evening Shift (2 PM - 10 PM)' },
  { id: 'night', name: 'Night Shift (10 PM - 6 AM)' },
  { id: 'weekend', name: 'Weekend Only' },
  { id: 'flexible', name: 'Flexible Hours' },
  { id: 'rotational', name: 'Rotational Shifts' },
];

const EmploymentDetailsForm: React.FC<EmploymentDetailsFormProps> = ({
  formData,
  updateFormData,
  markSectionComplete
}) => {
  const [filteredRoles, setFilteredRoles] = useState(roles);
  
  // Calculate total salary
  useEffect(() => {
    const total = formData.salary.basic + formData.salary.hra + formData.salary.allowances;
    updateFormData({
      salary: {
        ...formData.salary,
        total
      }
    });
  }, [formData.salary.basic, formData.salary.hra, formData.salary.allowances]);
  
  // Check if form is complete
  useEffect(() => {
    const isComplete = 
      formData.employeeId.trim() !== '' && 
      formData.role !== '' && 
      formData.department !== '' && 
      formData.joinDate !== undefined &&
      formData.employmentType !== '';
    
    markSectionComplete(isComplete);
  }, [formData, markSectionComplete]);

  // Filter roles based on department
  useEffect(() => {
    if (formData.department) {
      const filtered = roles.filter(role => 
        role.department === formData.department || role.department === ''
      );
      setFilteredRoles(filtered);
    } else {
      setFilteredRoles(roles);
    }
  }, [formData.department]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      
      // Handle numeric inputs for salary
      if (section === 'salary') {
        const numValue = value === '' ? 0 : parseFloat(value);
        updateFormData({
          [section]: {
            ...formData[section as keyof typeof formData],
            [field]: numValue
          }
        });
      } else {
        updateFormData({
          [section]: {
            ...formData[section as keyof typeof formData],
            [field]: value
          }
        });
      }
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
    updateFormData({ joinDate: date });
  };

  // Generate employee ID
  const generateEmployeeId = () => {
    const prefix = formData.department ? formData.department.substring(0, 3).toUpperCase() : 'EMP';
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newId = `${prefix}-${randomNum}`;
    updateFormData({ employeeId: newId });
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold text-gray-800 mb-4">Employment Details</div>
      
      {/* Basic Employment Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Position Information</h3>
            
            {/* Employee ID */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="employeeId">Employee ID <span className="text-red-500">*</span></Label>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={generateEmployeeId}
                  type="button"
                >
                  Generate ID
                </Button>
              </div>
              <Input 
                id="employeeId" 
                name="employeeId" 
                value={formData.employeeId} 
                onChange={handleInputChange} 
                placeholder="Enter employee ID"
                required
              />
            </div>
            
            {/* Department */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="department">Department <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => handleSelectChange(value, 'department')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Role */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleSelectChange(value, 'role')}
                disabled={!formData.department}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.department ? "Select role" : "Select department first"} />
                </SelectTrigger>
                <SelectContent>
                  {filteredRoles.map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Reporting Manager */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="reportingManager">Reporting Manager <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.reportingManager} 
                onValueChange={(value) => handleSelectChange(value, 'reportingManager')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select manager" />
                </SelectTrigger>
                <SelectContent>
                  {managers.map(manager => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.name} ({manager.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Join Date */}
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.joinDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.joinDate ? format(formData.joinDate, "PPP") : <span>Select join date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.joinDate}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">Work Schedule</h3>
            
            {/* Employment Type */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="employmentType">Employment Type <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.employmentType} 
                onValueChange={(value) => handleSelectChange(value, 'employmentType')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  {employmentTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Work Schedule */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="workSchedule">Work Schedule</Label>
              <Select 
                value={formData.workSchedule} 
                onValueChange={(value) => handleSelectChange(value, 'workSchedule')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select work schedule" />
                </SelectTrigger>
                <SelectContent>
                  {workSchedules.map(schedule => (
                    <SelectItem key={schedule.id} value={schedule.id}>{schedule.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Salary Information */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Salary Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Basic Salary */}
            <div className="space-y-2">
              <Label htmlFor="salary.basic">Basic Salary</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input 
                  id="salary.basic" 
                  name="salary.basic" 
                  value={formData.salary.basic || ''} 
                  onChange={handleInputChange} 
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-8"
                />
              </div>
            </div>
            
            {/* HRA */}
            <div className="space-y-2">
              <Label htmlFor="salary.hra">HRA</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input 
                  id="salary.hra" 
                  name="salary.hra" 
                  value={formData.salary.hra || ''} 
                  onChange={handleInputChange} 
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-8"
                />
              </div>
            </div>
            
            {/* Allowances */}
            <div className="space-y-2">
              <Label htmlFor="salary.allowances">Allowances</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input 
                  id="salary.allowances" 
                  name="salary.allowances" 
                  value={formData.salary.allowances || ''} 
                  onChange={handleInputChange} 
                  placeholder="0.00"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-8"
                />
              </div>
            </div>
            
            {/* Total */}
            <div className="space-y-2">
              <Label htmlFor="salary.total">Total Salary</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                <Input 
                  id="salary.total" 
                  value={formData.salary.total.toFixed(2)} 
                  readOnly
                  className="pl-8 bg-gray-50"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Bank Details */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Name */}
            <div className="space-y-2">
              <Label htmlFor="bankDetails.accountName">Account Holder Name</Label>
              <Input 
                id="bankDetails.accountName" 
                name="bankDetails.accountName" 
                value={formData.bankDetails.accountName} 
                onChange={handleInputChange} 
                placeholder="Enter account holder name"
              />
            </div>
            
            {/* Account Number */}
            <div className="space-y-2">
              <Label htmlFor="bankDetails.accountNumber">Account Number</Label>
              <Input 
                id="bankDetails.accountNumber" 
                name="bankDetails.accountNumber" 
                value={formData.bankDetails.accountNumber} 
                onChange={handleInputChange} 
                placeholder="Enter account number"
              />
            </div>
            
            {/* Bank Name */}
            <div className="space-y-2">
              <Label htmlFor="bankDetails.bankName">Bank Name</Label>
              <Input 
                id="bankDetails.bankName" 
                name="bankDetails.bankName" 
                value={formData.bankDetails.bankName} 
                onChange={handleInputChange} 
                placeholder="Enter bank name"
              />
            </div>
            
            {/* IFSC Code */}
            <div className="space-y-2">
              <Label htmlFor="bankDetails.ifscCode">IFSC Code</Label>
              <Input 
                id="bankDetails.ifscCode" 
                name="bankDetails.ifscCode" 
                value={formData.bankDetails.ifscCode} 
                onChange={handleInputChange} 
                placeholder="Enter IFSC code"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmploymentDetailsForm;
