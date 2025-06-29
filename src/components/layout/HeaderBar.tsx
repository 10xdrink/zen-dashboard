import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  Command,
  UserCog,
  ListChecks,
  CalendarClock,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

interface HeaderBarProps {
  pageTitle: string;
  pageSubtitle?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ pageTitle, pageSubtitle }) => {
  const { user, logout } = useAuth();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-white via-gray-50 to-white backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-100/50 sticky top-0 z-30">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#156450]/10 via-transparent to-[#156450]/10 pointer-events-none" />
      
      <div className="relative px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-[#156450]">
                  {pageTitle}
                </h1>
              </div>
              {pageSubtitle && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p>{pageSubtitle}</p>
                </div>
              )}
              {!pageSubtitle && (
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
              )}
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
                className="relative h-11 w-11 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#156450] transition-all duration-200 group"
              >
                <Bell className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-200" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#156450] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#156450] rounded-full animate-ping opacity-30" />
              </Button>
            </div>

            {/* Enhanced Profile Section */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-3 h-11 px-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-xl hover:scale-105 hover:bg-[#156450] transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-[#156450] rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">{user?.name?.[0] ?? 'A'}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#156450] border-2 border-white rounded-full" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors duration-200">
                      {user?.name || 'Admin User'}
                    </p>
                    <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors duration-200">
                      {user?.role || 'Administrator'}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden z-50">
                <DropdownMenuLabel className="p-4 bg-gradient-to-r from-[#156450]/10 to-[#156450]/20 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[#156450] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">{user?.name?.slice(0,2) || 'AU'}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user?.name || 'Admin User'}</p>
                      <p className="text-sm text-gray-600">admin@zennara.in</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <div className="p-2">
                  <DropdownMenuItem className="rounded-xl hover:bg-[#156450] hover:text-white transition-colors duration-200 group">
                    <User className="w-4 h-4 mr-3 text-gray-500 group-hover:text-white" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl hover:bg-[#156450] hover:text-white transition-colors duration-200 group">
                    <UserCog className="w-4 h-4 mr-3 text-gray-500 group-hover:text-white" />
                    Manage Access
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl hover:bg-[#156450] hover:text-white transition-colors duration-200 group">
                    <ListChecks className="w-4 h-4 mr-3 text-gray-500 group-hover:text-white" />
                    Tasks
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl hover:bg-[#156450] hover:text-white transition-colors duration-200 group">
                    <CalendarClock className="w-4 h-4 mr-3 text-gray-500 group-hover:text-white" />
                    Schedule
                  </DropdownMenuItem>
                  <DropdownMenuItem className="rounded-xl hover:bg-[#156450] hover:text-white transition-colors duration-200 group">
                    <Calendar className="w-4 h-4 mr-3 text-gray-500 group-hover:text-white" />
                    Appointments
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-2 border-gray-100" />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="rounded-xl hover:bg-red-600 text-red-600 hover:text-white transition-colors duration-200 group"
                  >
                    <LogOut className="w-4 h-4 mr-3 group-hover:text-white" />
                    Sign Out
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
    </header>
  );
};

export default HeaderBar;
