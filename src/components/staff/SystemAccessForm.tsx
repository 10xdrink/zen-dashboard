import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface SystemAccessFormProps {
  formData: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    permissions: string[];
    accessLevel: string;
  };
  updateFormData: (data: any) => void;
  markSectionComplete: (isComplete: boolean) => void;
}

const roles = [
  { id: 'admin', name: 'Administrator' },
  { id: 'doctor', name: 'Doctor' },
  { id: 'beautician', name: 'Beautician' },
  { id: 'staff', name: 'Staff' },
  { id: 'reception', name: 'Reception' },
];

const accessLevels = [
  { id: 'read', name: 'Read Only' },
  { id: 'standard', name: 'Standard' },
  { id: 'elevated', name: 'Elevated' },
  { id: 'admin', name: 'Administrator' },
];

const allPermissions = [
  'dashboard:view',
  'patients:manage',
  'appointments:manage',
  'inventory:manage',
  'billing:manage',
  'reports:view',
];

const SystemAccessForm: React.FC<SystemAccessFormProps> = ({ formData, updateFormData, markSectionComplete }) => {
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Validate form completeness
  useEffect(() => {
    const isComplete =
      formData.username.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim().length >= 6 &&
      formData.password === formData.confirmPassword &&
      formData.role !== '' &&
      formData.accessLevel !== '';

    markSectionComplete(isComplete);
  }, [formData, markSectionComplete]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    // Handle password matching validation
    if ((name === 'password' || name === 'confirmPassword') && formData.confirmPassword !== '') {
      if (name === 'password') {
        setPasswordError(value !== formData.confirmPassword ? 'Passwords do not match' : null);
      } else {
        setPasswordError(value !== formData.password ? 'Passwords do not match' : null);
      }
    }
  };

  // Handle select change
  const handleSelectChange = (value: string, name: string) => {
    updateFormData({ [name]: value });
  };

  // Handle permission toggle
  const togglePermission = (permission: string) => {
    const alreadySelected = formData.permissions.includes(permission);
    if (alreadySelected) {
      updateFormData({ permissions: formData.permissions.filter(p => p !== permission) });
    } else {
      updateFormData({ permissions: [...formData.permissions, permission] });
    }
  };

  // Quick username generator
  const generateUsername = () => {
    if (formData.email) {
      const namePart = formData.email.split('@')[0];
      updateFormData({ username: namePart });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold text-gray-800 mb-4">System Access Setup</div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* Username & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username <span className="text-red-500">*</span></Label>
              <div className="flex gap-2">
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  required
                />
                <Button type="button" variant="outline" onClick={generateUsername}>
                  Auto
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter system email"
                required
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password (min 6 chars)"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                required
              />
            </div>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          {/* Role & Access Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">System Role <span className="text-red-500">*</span></Label>
              <Select value={formData.role} onValueChange={(v) => handleSelectChange(v, 'role')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessLevel">Access Level <span className="text-red-500">*</span></Label>
              <Select value={formData.accessLevel} onValueChange={(v) => handleSelectChange(v, 'accessLevel')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {accessLevels.map((al) => (
                    <SelectItem key={al.id} value={al.id}>
                      {al.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {allPermissions.map((perm) => (
                <div key={perm} className="flex items-center space-x-2">
                  <Checkbox
                    id={perm}
                    checked={formData.permissions.includes(perm)}
                    onCheckedChange={() => togglePermission(perm)}
                  />
                  <label htmlFor={perm} className="text-sm">
                    {perm}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemAccessForm;
