import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';
import { mockEmployees, Employee } from '@/data/mockEmployees';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EmployeeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const editMode = searchParams.get('edit') === 'true';

  const employeeIndex = mockEmployees.findIndex((e: any) => e.id.toString() === id);
  const employee = employeeIndex !== -1 ? mockEmployees[employeeIndex] : undefined;
  const [formState, setFormState] = useState<Employee | undefined>(employee);

  const handleChange = (field: keyof Employee, value: any) => {
    if (!formState) return;
    setFormState({ ...formState, [field]: value });
  };

  const handleSave = () => {
    if (formState && employeeIndex !== -1) {
      mockEmployees[employeeIndex] = formState;
      navigate(`/staff/employees/${formState.id}`);
    }
  };

  if (!employee) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Employee not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <HeaderBar pageTitle="Employee Profile" pageSubtitle={`${employee.name}'s information`} />
        <div className="p-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
        </Button>
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            {employee.photo ? (
              <img src={employee.photo} alt={employee.name} className="w-32 h-32 rounded-full object-cover border" />
            ) : (
              <div className="w-32 h-32 rounded-full border flex items-center justify-center bg-gray-100 text-gray-400">
                <User className="w-16 h-16" />
              </div>
            )}
            <div>
              {editMode ? (
                <>
                  <Label className="text-sm text-gray-500">Name</Label>
                  <Input value={formState?.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="mb-2" />
                  <Label className="text-sm text-gray-500">Role</Label>
                  <Input value={formState?.role || ''} onChange={(e) => handleChange('role', e.target.value)} className="mb-2" />
                  <Label className="text-sm text-gray-500">Department</Label>
                  <Input value={formState?.department || ''} onChange={(e) => handleChange('department', e.target.value)} />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{employee.name}</h2>
                  <p className="text-gray-600">{employee.role} · {employee.department}</p>
                </>
              )}
            </div>
          </div>
          {/* Basic details */}
          {editMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="text-sm text-gray-500">Email</Label>
                <Input value={formState?.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
              </div>
              <div>
                <Label className="text-sm text-gray-500">Phone</Label>
                <Input value={formState?.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
              </div>
              <div>
                <Label className="text-sm text-gray-500">Join Date</Label>
                <Input type="date" value={formState?.joinDate || ''} onChange={(e) => handleChange('joinDate', e.target.value)} />
              </div>
              <div>
                <Label className="text-sm text-gray-500">Status</Label>
                <Input value={formState?.status || ''} onChange={(e) => handleChange('status', e.target.value)} />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800">{employee.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="text-gray-800">{employee.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="text-gray-800">{employee.status}</p>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Address</h3>
              <p className="text-gray-800">{employee.address}</p>
            </>
          )}
          {editMode && (
            <div className="flex gap-4 pt-4">
              <Button onClick={handleSave}>Save</Button>
              <Button variant="outline" onClick={() => navigate(`/staff/employees/${id}`)}>Cancel</Button>
            </div>
          )}
          {/* Extend with more sections (documents, performance, attendance) later */}
        </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
