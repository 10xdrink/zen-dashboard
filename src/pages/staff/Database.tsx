import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EmployeeList from './EmployeeList';
import { UserPlus, Users, FileText, Settings } from 'lucide-react';

const StaffDatabase: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        <p className="text-gray-600">Manage your staff and employee information</p>
      </div>

      <Tabs defaultValue="employees" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="employees" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Employee List
          </TabsTrigger>
          <TabsTrigger value="onboarding" className="flex items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            Onboarding
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees">
          <EmployeeList />
        </TabsContent>
        
        <TabsContent value="onboarding">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Employee Onboarding</h3>
            <p className="text-gray-500 mb-4">This section is under development</p>
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Employee Documents</h3>
            <p className="text-gray-500 mb-4">This section is under development</p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Staff Settings</h3>
            <p className="text-gray-500 mb-4">This section is under development</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffDatabase;
