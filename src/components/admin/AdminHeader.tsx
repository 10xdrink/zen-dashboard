import React, { useState } from 'react';
import { Search, Bell, Menu, ChevronDown, Settings, User, LogOut, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AdminHeaderProps {
  activeSection: string;
  toggleSidebar: () => void;
}

const sectionTitles = {
  dashboard: 'Dashboard',
  appointments: 'Appointment Management',
  patients: 'Patient Management',
  staff: 'Staff Management',
  inventory: 'Inventory Management',
  finance: 'Financial Management',
  marketing: 'Marketing & Promotions',
  reports: 'Reports & Analytics',
  settings: 'System Settings',
};

export const AdminHeader = ({ activeSection, toggleSidebar }: AdminHeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-white via-gray-50 to-white backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-100/50">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
      
      <div className="relative px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSidebar}
              className="lg:hidden hover:bg-gray-100/70 hover:scale-105 transition-all duration-200"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </Button>
            
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 bg-clip-text text-transparent">
                  {sectionTitles[activeSection as keyof typeof sectionTitles] || 'Dashboard'}
                </h1>
                <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <span className="text-xs font-medium text-white">Live</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Search */}
            <div className="relative hidden md:block">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                  <Input
                    placeholder="Search patients, appointments..."
                    className={`pl-12 pr-12 w-80 h-11 bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl focus:shadow-xl focus:border-blue-300 ${isSearchFocused ? 'ring-2 ring-blue-200' : ''}`}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Command className="w-3 h-3" />
                      <span>K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Notifications */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative h-11 w-11 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
              >
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-30" />
              </Button>
            </div>

            {/* Enhanced Profile Section */}
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-3 h-11 px-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">
                    Administrator
                  </p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </Button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold">A</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Admin User</p>
                        <p className="text-sm text-gray-600">admin@zennara.in</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start rounded-xl hover:bg-blue-50 transition-colors duration-200"
                    >
                      <User className="w-4 h-4 mr-3 text-gray-500" />
                      Profile Settings
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start rounded-xl hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4 mr-3 text-gray-500" />
                      System Settings
                    </Button>
                    <hr className="my-2 border-gray-100" />
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start rounded-xl hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
    </header>
  );
};