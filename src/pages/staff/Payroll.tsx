import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calculator, 
  CalendarIcon, 
  Check, 
  ChevronDown, 
  CreditCard, 
  IndianRupee, 
  Download, 
  Edit, 
  FileText, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Send, 
  TrendingUp,
  Settings,
  Clock,
  Percent,
  Receipt
} from 'lucide-react';

const PayrollSystem = () => {
  // State Management
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      empId: "EMP001",
      department: "Engineering",
      position: "Senior Developer",
      baseSalary: 1200000,
      hourlyRate: 600,
      email: "rajesh.kumar@company.com",
      joinDate: "2023-01-15"
    },
    {
      id: 2,
      name: "Priya Sharma",
      empId: "EMP002",
      department: "Sales",
      position: "Sales Manager",
      baseSalary: 950000,
      hourlyRate: 500,
      email: "priya.sharma@company.com",
      joinDate: "2023-02-20"
    }
  ]);

  const [attendance, setAttendance] = useState([
    {
      empId: "EMP001",
      month: "2025-06",
      workingDays: 22,
      presentDays: 20,
      overtimeHours: 10,
      leavesTaken: 2
    },
    {
      empId: "EMP002",
      month: "2025-06",
      workingDays: 22,
      presentDays: 22,
      overtimeHours: 5,
      leavesTaken: 0
    }
  ]);

  const [commissions, setCommissions] = useState([
    {
      empId: "EMP002",
      month: "2025-06",
      salesAmount: 2500000,
      commissionRate: 5,
      bonuses: 25000
    }
  ]);

  const [payrollSettings, setPayrollSettings] = useState({
    taxRate: 10, // TDS rate
    pfRate: 12, // EPF rate
    insuranceRate: 1.75, // ESI rate
    overtimeMultiplier: 2, // As per Indian labor laws
    commissionRules: {
      sales: 5,
      support: 2
    },
    professionalTax: 200 // Monthly professional tax
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showPayrollModal, setShowPayrollModal] = useState(false);
  const [payrollResults, setPayrollResults] = useState([]);

  // Salary Calculation Engine
  const calculateSalary = (employee, attendanceData, commissionData = null) => {
    const empAttendance = attendanceData.find(a => a.empId === employee.empId) || {
      workingDays: 22,
      presentDays: 22,
      overtimeHours: 0,
      leavesTaken: 0
    };

    const empCommission = commissionData?.find(c => c.empId === employee.empId);

    // Base calculations
    const dailySalary = employee.baseSalary / 30;
    const actualSalary = (empAttendance.presentDays / empAttendance.workingDays) * employee.baseSalary;
    const overtimePay = empAttendance.overtimeHours * employee.hourlyRate * payrollSettings.overtimeMultiplier;
    
    // Commission calculation
    let commissionAmount = 0;
    if (empCommission) {
      commissionAmount = (empCommission.salesAmount * empCommission.commissionRate / 100) + (empCommission.bonuses || 0);
    }

    const grossSalary = actualSalary + overtimePay + commissionAmount;

    // Deductions
    const taxDeduction = grossSalary * (payrollSettings.taxRate / 100); // TDS
    const pfDeduction = Math.min(employee.baseSalary * (payrollSettings.pfRate / 100) / 12, 1800); // EPF capped at 1800/month
    const esiDeduction = employee.baseSalary <= 1500000 ? (employee.baseSalary / 12) * (payrollSettings.insuranceRate / 100) : 0; // ESI if applicable
    const professionalTax = payrollSettings.professionalTax; // Professional Tax
    const totalDeductions = taxDeduction + pfDeduction + esiDeduction + professionalTax;

    const netSalary = grossSalary - totalDeductions;

    return {
      employee,
      baseSalary: employee.baseSalary,
      actualSalary,
      overtimePay,
      commissionAmount,
      grossSalary,
      taxDeduction,
      pfDeduction,
      esiDeduction,
      professionalTax,
      totalDeductions,
      netSalary,
      attendance: empAttendance
    };
  };

  // Run Monthly Payroll
  const runMonthlyPayroll = () => {
    const results = employees.map(emp => 
      calculateSalary(emp, attendance, commissions)
    );
    setPayrollResults(results);
    setShowPayrollModal(true);
  };

  // Employee Management Component
  const EmployeeForm = ({ employee, onSave, onClose }) => {
    const [formData, setFormData] = useState(employee || {
      name: '',
      empId: '',
      department: '',
      position: '',
      baseSalary: '',
      hourlyRate: '',
      email: '',
      joinDate: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newEmployee = {
        ...formData,
        id: employee?.id || Date.now(),
        baseSalary: parseFloat(formData.baseSalary),
        hourlyRate: parseFloat(formData.hourlyRate)
      };
      onSave(newEmployee);
      onClose();
    };
    
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="empId">Employee ID</Label>
            <Input
              id="empId"
              value={formData.empId}
              onChange={(e) => setFormData({...formData, empId: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select 
              value={formData.department}
              onValueChange={(value) => setFormData({...formData, department: value})}
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={formData.position}
              onChange={(e) => setFormData({...formData, position: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="baseSalary">Base Salary (Annual)</Label>
            <Input
              id="baseSalary"
              type="number"
              value={formData.baseSalary}
              onChange={(e) => setFormData({...formData, baseSalary: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="hourlyRate">Hourly Rate</Label>
            <Input
              id="hourlyRate"
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <Label htmlFor="joinDate">Join Date</Label>
            <Input
              id="joinDate"
              type="date"
              value={formData.joinDate}
              onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Save Employee</Button>
        </div>
      </form>
    );
  };

  // Payslip Component
  const PayslipModal = ({ payrollData, onClose }) => {
    const generatePDF = (employee) => {
      // Simulate PDF generation
      alert(`PDF payslip generated for ${employee.employee.name}`);
    };

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Monthly Payroll Results - June 2025</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {payrollData.map((emp, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">{emp.employee.name}</CardTitle>
                      <p className="text-sm text-gray-600">{emp.employee.empId} | {emp.employee.department}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => generatePDF(emp)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">BASE SALARY</Label>
                      <p className="font-semibold">₹{emp.baseSalary.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">ATTENDANCE</Label>
                      <p className="font-semibold">{emp.attendance.presentDays}/{emp.attendance.workingDays} days</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">OVERTIME</Label>
                      <p className="font-semibold">₹{emp.overtimePay.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">COMMISSION</Label>
                      <p className="font-semibold">₹{emp.commissionAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">GROSS SALARY</Label>
                      <p className="font-semibold text-green-600">₹{emp.grossSalary.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">TDS (10%)</Label>
                      <p className="font-semibold text-red-600">-₹{emp.taxDeduction.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">EPF (12%)</Label>
                      <p className="font-semibold text-red-600">-₹{emp.pfDeduction.toFixed(2)}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500">NET SALARY</Label>
                      <p className="font-bold text-lg text-blue-600">₹{emp.netSalary.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>Close</Button>
              <Button onClick={() => alert('Email sent to all employees!')}>
                Email All Payslips
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Dashboard Summary
  const DashboardSummary = () => {
    const totalEmployees = employees.length;
    const totalPayroll = payrollResults.reduce((sum, emp) => sum + emp.netSalary, 0);
    const avgSalary = totalPayroll / totalEmployees || 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <IndianRupee className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Payroll</p>
                <p className="text-2xl font-bold">₹{totalPayroll.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Average Salary</p>
                <p className="text-2xl font-bold">₹{avgSalary.toFixed(0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CalendarIcon className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Current Month</p>
                <p className="text-2xl font-bold">June 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const saveEmployee = (employeeData) => {
    if (employeeData.id && employees.find(e => e.id === employeeData.id)) {
      setEmployees(employees.map(e => e.id === employeeData.id ? employeeData : e));
    } else {
      setEmployees([...employees, employeeData]);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {/* Header */}
        <HeaderBar pageTitle="Payroll Management System" pageSubtitle="Complete Indian payroll solution with TDS, EPF & ESI calculations" />
        
        <div className="p-6">

        {/* Dashboard Summary */}
        <DashboardSummary />

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="commission">Commission</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button 
                      onClick={() => setShowEmployeeModal(true)}
                      className="h-20 flex flex-col items-center justify-center"
                    >
                      <Plus className="w-6 h-6 mb-2" />
                      Add Employee
                    </Button>
                    <Button 
                      onClick={runMonthlyPayroll}
                      className="h-20 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700"
                    >
                      <Calculator className="w-6 h-6 mb-2" />
                      Run Payroll
                    </Button>
                    <Button 
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                    >
                      <FileText className="w-6 h-6 mb-2" />
                      Generate Reports
                    </Button>
                    <Button 
                      variant="outline"
                      className="h-20 flex flex-col items-center justify-center"
                    >
                      <Settings className="w-6 h-6 mb-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Employee Management</CardTitle>
                  <Button onClick={() => setShowEmployeeModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Employee
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Base Salary</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>{employee.empId}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.department}</Badge>
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>₹{employee.baseSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setShowEmployeeModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Attendance Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Working Days</TableHead>
                      <TableHead>Present Days</TableHead>
                      <TableHead>Overtime Hours</TableHead>
                      <TableHead>Leaves Taken</TableHead>
                      <TableHead>Attendance %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell>{record.empId}</TableCell>
                        <TableCell>{record.month}</TableCell>
                        <TableCell>{record.workingDays}</TableCell>
                        <TableCell>{record.presentDays}</TableCell>
                        <TableCell>{record.overtimeHours}</TableCell>
                        <TableCell>{record.leavesTaken}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={record.presentDays / record.workingDays >= 0.9 ? "default" : "destructive"}
                          >
                            {((record.presentDays / record.workingDays) * 100).toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commission Tab */}
          <TabsContent value="commission">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Percent className="w-5 h-5 mr-2" />
                  Commission Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Month</TableHead>
                      <TableHead>Sales Amount</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Commission Amount</TableHead>
                      <TableHead>Bonuses</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commissions.map((record, index) => {
                      const commissionAmount = record.salesAmount * (record.commissionRate / 100);
                      const total = commissionAmount + (record.bonuses || 0);
                      return (
                        <TableRow key={index}>
                          <TableCell>{record.empId}</TableCell>
                          <TableCell>{record.month}</TableCell>
                          <TableCell>₹{record.salesAmount.toLocaleString()}</TableCell>
                          <TableCell>{record.commissionRate}%</TableCell>
                          <TableCell>₹{commissionAmount.toFixed(2)}</TableCell>
                          <TableCell>₹{record.bonuses || 0}</TableCell>
                          <TableCell className="font-semibold">₹{total.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Receipt className="w-5 h-5 mr-2" />
                    Payroll Processing
                  </CardTitle>
                  <Button onClick={runMonthlyPayroll} className="bg-green-600 hover:bg-green-700">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Payroll
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {payrollResults.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Base Salary</TableHead>
                        <TableHead>Overtime</TableHead>
                        <TableHead>Commission</TableHead>
                        <TableHead>Gross Salary</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Net Salary</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payrollResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{result.employee.name}</p>
                              <p className="text-sm text-gray-500">{result.employee.empId}</p>
                            </div>
                          </TableCell>
                          <TableCell>₹{result.baseSalary.toLocaleString()}</TableCell>
                          <TableCell>₹{result.overtimePay.toFixed(2)}</TableCell>
                          <TableCell>₹{result.commissionAmount.toFixed(2)}</TableCell>
                          <TableCell>₹{result.grossSalary.toFixed(2)}</TableCell>
                          <TableCell>₹{result.totalDeductions.toFixed(2)}</TableCell>
                          <TableCell className="font-semibold text-green-600">
                            ₹{result.netSalary.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No payroll calculated yet. Click "Calculate Payroll" to generate results.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Salary Report</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Employees:</span>
                      <span className="font-semibold">{employees.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Payroll:</span>
                      <span className="font-semibold">
                        ₹{payrollResults.reduce((sum, emp) => sum + emp.netSalary, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Deductions:</span>
                      <span className="font-semibold">
                        ₹{payrollResults.reduce((sum, emp) => sum + emp.totalDeductions, 0).toFixed(2)}
                      </span>
                    </div>
                    <Button className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Engineering', 'Sales', 'Marketing'].map(dept => {
                      const deptEmployees = employees.filter(e => e.department === dept);
                      const deptPayroll = payrollResults
                        .filter(r => r.employee.department === dept)
                        .reduce((sum, emp) => sum + emp.netSalary, 0);
                      
                      return (
                        <div key={dept} className="flex justify-between">
                          <span>{dept}:</span>
                          <span className="font-semibold">
                            ₹{deptPayroll.toFixed(2)} ({deptEmployees.length} emp)
                          </span>
                        </div>
                      );
                    })}
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Employee Modal */}
        {showEmployeeModal && (
          <Dialog open={showEmployeeModal} onOpenChange={setShowEmployeeModal}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
                </DialogTitle>
              </DialogHeader>
              <EmployeeForm
                employee={selectedEmployee}
                onSave={saveEmployee}
                onClose={() => {
                  setShowEmployeeModal(false);
                  setSelectedEmployee(null);
                }}
              />
            </DialogContent>
          </Dialog>
        )}

        {/* Payroll Results Modal */}
        {showPayrollModal && payrollResults.length > 0 && (
          <PayslipModal
            payrollData={payrollResults}
            onClose={() => setShowPayrollModal(false)}
          />
        )}
        </div>
      </main>
    </div>
  );
};

export default PayrollSystem;