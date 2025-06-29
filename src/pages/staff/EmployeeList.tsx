import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';
import { 
  Search, Filter, Download, Mail, Edit3, UserPlus, MoreHorizontal, 
  Calendar, Phone, MapPin, Briefcase, Clock, ChevronDown, LayoutGrid, List
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LogOut, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import {
  Popover, PopoverContent, PopoverTrigger
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { mockEmployees, departmentOptions } from '@/data/mockEmployees';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedEmployees, setSelectedEmployees] = useState<(string | number)[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Summary stats
  const summary = useMemo(() => {
    const total = employees.length;
    const present = employees.filter(e => e.attendance === 'Present').length;
    const absent = employees.filter(e => e.attendance === 'Absent').length;
    const roleCounts: Record<string, number> = {};
    employees.forEach(e => { roleCounts[e.role] = (roleCounts[e.role] || 0) + 1; });
    const recent = employees.filter(e => {
      const joinDate = new Date(e.joinDate);
      const diff = (Date.now() - joinDate.getTime()) / (1000*60*60*24);
      return diff <= 30;
    }).length;
    return { total, present, absent, roleCounts, recent };
  }, [employees]);
  const navigate = useNavigate();

  // Filter employees based on search term and filters
  useEffect(() => {
    let filteredEmployees = mockEmployees;
    
    // Search filter
    if (searchTerm) {
      filteredEmployees = filteredEmployees.filter(
        employee => employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   employee.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Department filter
    if (departmentFilter !== 'All') {
      filteredEmployees = filteredEmployees.filter(
        employee => employee.department === departmentFilter
      );
    }
    
    // Status filter
    if (statusFilter !== 'All') {
      filteredEmployees = filteredEmployees.filter(
        employee => employee.status === statusFilter
      );
    }
    
    // Date range filter
    if (dateRange) {
      const { from, to } = dateRange;
      filteredEmployees = filteredEmployees.filter(employee => {
        const joinDate = new Date(employee.joinDate);
        return joinDate >= from! && joinDate <= to!;
      });
    }
    
    setEmployees(filteredEmployees);
  }, [searchTerm, departmentFilter, statusFilter, dateRange]);

  // Handle select all checkbox
  useEffect(() => {
    if (selectAll) {
      setSelectedEmployees(employees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  }, [selectAll, employees]);

  // Toggle individual employee selection
  const toggleEmployeeSelection = (id: string | number) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter(empId => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('All');
    setStatusFilter('All');
    setDateRange(undefined);
  };

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Inactive':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'On Leave':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  // Get attendance badge color
  const getAttendanceBadgeColor = (attendance: string) => {
    switch (attendance) {
      case 'Present':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Absent':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderBar pageTitle="Staff Management" />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Employee List</h1>
          <p className="text-gray-600">Manage your staff and employee information</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate('/staff/employees/add')}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Employee
        </Button>
      </div>

      {/* Summary Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-wrap gap-4 items-center">
        <div className="text-sm font-medium">Total: <span className="font-semibold">{summary.total}</span></div>
        <div className="text-sm font-medium text-green-700">Present: {summary.present}</div>
        <div className="text-sm font-medium text-red-700">Absent: {summary.absent}</div>
        <div className="text-sm font-medium">New (&lt;30d): {summary.recent}</div>
        {/* show first 3 role counts */}
        {Object.entries(summary.roleCounts).slice(0,3).map(([role,count])=> (
          <div key={role} className="text-sm text-gray-600">{role}: {count}</div>
        ))}
        <div className="ml-auto flex gap-2">
          <Button variant={viewMode==='grid'?'default':'outline'} size="icon" onClick={()=>setViewMode('grid')}><LayoutGrid className="h-4 w-4"/></Button>
          <Button variant={viewMode==='table'?'default':'outline'} size="icon" onClick={()=>setViewMode('table')}><List className="h-4 w-4"/></Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search employees..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departmentOptions.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRange ? (
                    dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Join Date Range</span>
                    )
                  ) : (
                    <span>Join Date Range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
                <div className="flex justify-end gap-2 p-2 border-t">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDateRange(undefined)}
                  >
                    Clear
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button variant="outline" onClick={resetFilters}>
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedEmployees.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <Checkbox 
              id="selectAll" 
              checked={selectAll}
              onCheckedChange={(checked) => setSelectAll(!!checked)}
            />
            <label htmlFor="selectAll" className="ml-2 text-sm font-medium">
              {selectedEmployees.length} employees selected
            </label>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Send Message
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Bulk Actions
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Update Department</DropdownMenuItem>
                <DropdownMenuItem>Update Status</DropdownMenuItem>
                <DropdownMenuItem>Update Salary</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Delete Selected</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}

      {viewMode==='grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div className="flex items-center">
                <Checkbox 
                  id={`employee-${employee.id}`}
                  checked={selectedEmployees.includes(employee.id)}
                  onCheckedChange={() => toggleEmployeeSelection(employee.id)}
                  className="mr-2"
                />
                <div>
                  <CardTitle className="text-lg">{employee.name}</CardTitle>
                  <CardDescription>{employee.role}</CardDescription>
                </div>
              </div>
              <Badge className={getAttendanceBadgeColor(employee.attendance)}>
                {employee.attendance}
              </Badge>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4 border-2 border-gray-100">
                  <img 
                    src="https://res.cloudinary.com/dgcpuirdo/image/upload/v1749978777/Screenshot_2025-06-14_163619_ubad6u.png" 
                    alt={employee.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Mail className="h-4 w-4 mr-1" />
                    {employee.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Phone className="h-4 w-4 mr-1" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {employee.address}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-600">{employee.department}</span>
                </div>
                <div className="flex items-center">
                  <Badge className={getStatusBadgeColor(employee.status)}>
                    {employee.status}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-600">
                    {format(new Date(employee.joinDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-gray-600">
                    {format(new Date(employee.joinDate), 'pp')}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex justify-between">
              <Button variant="outline" size="sm" onClick={() => navigate(`/staff/employees/${employee.id}`)}>
                View Profile
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(`/staff/employees/${employee.id}`)}>
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigate(`/staff/employees/${employee.id}?edit=true`)}>
                  <Edit3 className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate(`/staff/employees/${employee.id}`)}>View Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/staff/employees/${employee.id}?edit=true`)}>Edit Details</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/staff/scheduling')}>Schedule</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => {
                      // Add deactivation logic here
                      alert(`Employee ${employee.name} has been deactivated`);
                    }}>Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map(emp=> (
                <TableRow key={emp.id}>
                  <TableCell className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://res.cloudinary.com/dgcpuirdo/image/upload/v1749978777/Screenshot_2025-06-14_163619_ubad6u.png"/>
                      <AvatarFallback>{emp.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</AvatarFallback>
                    </Avatar>
                    {emp.name}
                  </TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>
                    <Badge className={getAttendanceBadgeColor(emp.attendance)}>{emp.attendance}</Badge>
                  </TableCell>
                  <TableCell>{format(new Date(emp.joinDate),'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="z-50">
                        <DropdownMenuItem onClick={()=>navigate(`/staff/employees/${emp.id}`)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>navigate(`/staff/employees/${emp.id}?edit=true`)}>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>navigate('/staff/scheduling')}>Schedule</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={() => {
                          // Add deactivation logic here
                          alert(`Employee ${emp.name} has been deactivated`);
                        }}>Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
 
       {/* Empty State */}
      {employees.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No employees found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={resetFilters}>Reset Filters</Button>
        </div>
      )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeList;
