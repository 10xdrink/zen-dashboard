import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LogOut, User, Bell, Settings, Calendar, Activity, Users, Package, FileText, 
  UserCheck, AlertTriangle, PlusCircle, UserPlus, ShoppingBag, CalendarClock,
  TrendingUp, BarChart3, LineChart, PieChart, Clock, ArrowRight, ArrowUpRight,
  UserCog, ListChecks, GraduationCap, ChevronDown
} from 'lucide-react';
import RupeeIcon from '@/components/icons/RupeeIcon';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';
import { 
  AreaChart, Area, BarChart, Bar, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { format, subDays, startOfToday } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

const Dashboard: React.FC = () => {
  const { user, logout, resetInactivityTimer } = useAuth();
  const [chartView, setChartView] = useState<'7day' | '30day'>('7day');
  const [revenueView, setRevenueView] = useState<'monthly' | 'quarterly'>('monthly');

  // Reset inactivity timer when dashboard is loaded
  useEffect(() => {
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariant = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Quick Stats Data
  const quickStats = [
    { 
      icon: <Calendar className="h-6 w-6" />, 
      title: "Today's Appointments", 
      value: 24, 
      change: +8, 
      link: "/appointments", 
      color: "bg-blue-500",
      trend: "up"
    },
    { 
      icon: <RupeeIcon className="h-6 w-6" />, 
      title: "Revenue Today", 
      value: "₹4,850", 
      change: +15.2, 
      link: "/finance/reports", 
      color: "bg-green-500",
      trend: "up"
    },
    { 
      icon: <UserCheck className="h-6 w-6" />, 
      title: "Staff Present", 
      value: 18, 
      change: -2, 
      link: "/staff/attendance", 
      color: "bg-purple-500",
      trend: "down"
    },
    { 
      icon: <AlertTriangle className="h-6 w-6" />, 
      title: "Inventory Alerts", 
      value: 5, 
      change: +3, 
      link: "/inventory/stock", 
      color: "bg-amber-500",
      trend: "up"
    },
  ];

  // Quick Actions
  const quickActions = [
    { icon: <PlusCircle className="h-5 w-5" />, title: "Add New Appointment", link: "/appointments/new" },
    { icon: <UserPlus className="h-5 w-5" />, title: "Register New Patient", link: "/patients/register" },
    { icon: <ShoppingBag className="h-5 w-5" />, title: "Add Inventory Item", link: "/inventory/add" },
    { icon: <CalendarClock className="h-5 w-5" />, title: "Create Staff Schedule", link: "/staff/schedule/new" },
  ];

  // Recent Activities
  const recentActivities = [
    { 
      type: "appointment", 
      title: "New appointment scheduled", 
      description: "Dr. Sarah Johnson with Patient #1245", 
      time: "10 minutes ago",
      status: "scheduled"
    },
    { 
      type: "patient", 
      title: "New patient registered", 
      description: "John Smith completed registration", 
      time: "25 minutes ago",
      status: "completed"
    },
    { 
      type: "inventory", 
      title: "Inventory updated", 
      description: "Surgical masks stock decreased by 50 units", 
      time: "1 hour ago",
      status: "alert"
    },
    { 
      type: "appointment", 
      title: "Appointment rescheduled", 
      description: "Patient #982 moved to tomorrow at 2:30 PM", 
      time: "2 hours ago",
      status: "rescheduled"
    },
    { 
      type: "patient", 
      title: "Patient record updated", 
      description: "Medical history updated for Patient #567", 
      time: "3 hours ago",
      status: "updated"
    },
  ];

  // Generate appointment data for the last 30 days - using useMemo to prevent regeneration on every render
  const appointmentData = React.useMemo(() => {
    const today = startOfToday();
    const days = chartView === '7day' ? 7 : 30;
    
    return Array.from({ length: days }).map((_, i) => {
      const date = subDays(today, days - i - 1);
      const scheduled = Math.floor(Math.random() * 20) + 10;
      const completed = Math.floor(scheduled * (0.7 + Math.random() * 0.2));
      const cancelled = Math.floor((scheduled - completed) * (Math.random() * 0.7));
      
      return {
        date: format(date, 'MMM dd'),
        scheduled,
        completed,
        cancelled,
      };
    });
  }, [chartView]); // Only regenerate when chartView changes

  // Generate revenue data - using useMemo to prevent regeneration on every render
  const revenueData = React.useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
    
    if (revenueView === 'monthly') {
      return months.map(month => ({
        name: month,
        revenue: Math.floor(Math.random() * 50000) + 30000,
        expenses: Math.floor(Math.random() * 30000) + 20000,
        profit: Math.floor(Math.random() * 20000) + 10000,
      }));
    } else {
      return quarters.map(quarter => ({
        name: quarter,
        revenue: Math.floor(Math.random() * 150000) + 100000,
        expenses: Math.floor(Math.random() * 90000) + 60000,
        profit: Math.floor(Math.random() * 60000) + 40000,
      }));
    }
  }, [revenueView]); // Only regenerate when revenueView changes

  // Generate service performance data - using useMemo for stability
  const serviceData = React.useMemo(() => [
    { name: 'General Checkup', value: 35 },
    { name: 'Specialist Consult', value: 25 },
    { name: 'Dental', value: 15 },
    { name: 'Pediatrics', value: 12 },
    { name: 'Dermatology', value: 8 },
    { name: 'Other', value: 5 },
  ], []);
  
  // Modern, minimalistic color palette for charts
  const COLORS = ['#156450', '#2A9D8F', '#8ECAE6', '#E9C46A', '#F4A261', '#E76F51'];
  
  // Chart styling constants
  const CHART_STYLE = {
    stroke: '#f5f5f5',
    strokeWidth: 1,
    fontSize: 12,
    fontFamily: 'Inter, sans-serif'
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <HeaderBar pageTitle="Dashboard" />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || 'Admin'}</h2>
            <p className="text-gray-600">Here's what's happening in your healthcare system today.</p>
          </div>
          
          {/* Quick Stats Section */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {quickStats.map((stat, index) => (
              <motion.div key={index} variants={itemVariant} className="cursor-pointer" onClick={() => window.location.href = stat.link}>
                <Card className="overflow-hidden shadow-xl hover:shadow-none transition-all duration-300 rounded-xl bg-gradient-to-br from-white to-gray-50 border-0 relative group">
                  {/* Colored accent line at top */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-1 transform transition-all duration-300 group-hover:h-2"
                    style={{ backgroundColor: stat.color.replace('bg-', '#').replace('blue-500', '156450').replace('green-500', '2A9D8F').replace('purple-500', '8ECAE6').replace('amber-500', 'E9C46A') }}
                  />
                  
                  <CardHeader className="pt-6 pb-0">
                    <div className="flex justify-between items-center">
                      <div 
                        className="text-white p-3 rounded-xl shadow-md transform transition-transform group-hover:scale-110 group-hover:-rotate-3"
                        style={{ backgroundColor: stat.color.replace('bg-', '#').replace('blue-500', '156450').replace('green-500', '2A9D8F').replace('purple-500', '8ECAE6').replace('amber-500', 'E9C46A') }}
                      >
                        {stat.icon}
                      </div>
                      {stat.trend === 'up' ? (
                        <Badge className="bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-lg px-2 py-1 flex items-center shadow-sm">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          {stat.change > 0 ? `+${stat.change}%` : `${stat.change}%`}
                        </Badge>
                      ) : (
                        <Badge className="bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg px-2 py-1 flex items-center shadow-sm">
                          <ArrowUpRight className="h-3 w-3 mr-1 rotate-180" />
                          {stat.change}%
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                    <p className="text-sm text-gray-500 mt-1 font-medium">{stat.title}</p>
                  </CardContent>
                  
                  <CardFooter className="pt-0 pb-4">
                    <div 
                      className="text-xs font-medium flex items-center transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: stat.color.replace('bg-', '#').replace('blue-500', '156450').replace('green-500', '2A9D8F').replace('purple-500', '8ECAE6').replace('amber-500', 'E9C46A') }}
                    >
                      View Details <ArrowRight className="h-3 w-3 ml-1" />
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts & Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Appointment Trends Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">Appointment Trends</CardTitle>
                  <CardDescription>Overview of appointment statistics</CardDescription>
                </div>
                <Tabs defaultValue="7day" className="w-[200px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger 
                      value="7day" 
                      onClick={() => setChartView('7day')}
                    >
                      7 Days
                    </TabsTrigger>
                    <TabsTrigger 
                      value="30day" 
                      onClick={() => setChartView('30day')}
                    >
                      30 Days
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={appointmentData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} style={CHART_STYLE} />
                      <YAxis axisLine={false} tickLine={false} style={CHART_STYLE} />
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Legend iconType="circle" iconSize={8} />
                      <Bar dataKey="scheduled" fill="#156450" name="Scheduled" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="completed" fill="#2A9D8F" name="Completed" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="cancelled" fill="#E9C46A" name="Cancelled" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Service Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Service Performance</CardTitle>
                <CardDescription>Distribution by service type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={serviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                        paddingAngle={2}
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#fff" strokeWidth={1} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      <Legend iconType="circle" iconSize={8} layout="horizontal" verticalAlign="bottom" align="center" />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Graph */}
          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-medium">Revenue Graph</CardTitle>
                <CardDescription>Financial performance overview</CardDescription>
              </div>
              <Tabs defaultValue="monthly" className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger 
                    value="monthly" 
                    onClick={() => setRevenueView('monthly')}
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger 
                    value="quarterly" 
                    onClick={() => setRevenueView('quarterly')}
                  >
                    Quarterly
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} style={CHART_STYLE} />
                    <YAxis axisLine={false} tickLine={false} style={CHART_STYLE} />
                    <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, undefined]} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" iconSize={8} />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#156450" fill="#15645022" name="Revenue" activeDot={{ stroke: '#156450', strokeWidth: 2, r: 4 }} />
                    <Area type="monotone" dataKey="expenses" stackId="2" stroke="#2A9D8F" fill="#2A9D8F22" name="Expenses" activeDot={{ stroke: '#2A9D8F', strokeWidth: 2, r: 4 }} />
                    <Area type="monotone" dataKey="profit" stackId="3" stroke="#8ECAE6" fill="#8ECAE622" name="Profit" activeDot={{ stroke: '#8ECAE6', strokeWidth: 2, r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions and Recent Activities */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <Card className="shadow-xl hover:shadow-none transition-all duration-300 overflow-hidden rounded-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#156450]" />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-800 flex items-center">
                  <div className="w-6 h-6 rounded-md bg-[#156450] flex items-center justify-center mr-2">
                    <ListChecks className="h-3.5 w-3.5 text-white" />
                  </div>
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-gray-500 ml-8">Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-start text-left font-normal border border-gray-100 hover:border-[#156450] hover:bg-[#156450] hover:text-white rounded-xl py-3 px-4 shadow-sm hover:shadow transition-all duration-200 group"
                      onClick={() => window.location.href = action.link}
                    >
                      <div className="mr-3 p-2 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-white group-hover:bg-opacity-20 group-hover:text-white">{action.icon}</div>
                      <span className="font-medium">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="lg:col-span-2 shadow-xl hover:shadow-none transition-all duration-300 overflow-hidden rounded-xl border-0 bg-gradient-to-br from-white to-gray-50">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#2A9D8F]" />
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-800 flex items-center">
                  <div className="w-6 h-6 rounded-md bg-[#2A9D8F] flex items-center justify-center mr-2">
                    <Activity className="h-3.5 w-3.5 text-white" />
                  </div>
                  Recent Activities
                </CardTitle>
                <CardDescription className="text-gray-500 ml-8">Latest updates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 hover:bg-gray-50 p-3 rounded-xl transition-all duration-200 group">
                      <div 
                        className={`
                          p-3 rounded-xl flex-shrink-0 shadow-sm
                          ${activity.type === 'appointment' ? 'bg-[#156450] text-white' : ''}
                          ${activity.type === 'patient' ? 'bg-[#2A9D8F] text-white' : ''}
                          ${activity.type === 'inventory' ? 'bg-[#E9C46A] text-white' : ''}
                        `}
                      >
                        {activity.type === 'appointment' && <Calendar className="h-4 w-4" />}
                        {activity.type === 'patient' && <User className="h-4 w-4" />}
                        {activity.type === 'inventory' && <Package className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-800">{activity.title}</h4>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {activity.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <div className="mt-2">
                          {activity.status === 'scheduled' && (
                            <Badge className="bg-[#15645015] text-[#156450] border border-[#15645030] hover:bg-[#15645020] rounded-lg px-2 py-1">Scheduled</Badge>
                          )}
                          {activity.status === 'completed' && (
                            <Badge className="bg-[#2A9D8F15] text-[#2A9D8F] border border-[#2A9D8F30] hover:bg-[#2A9D8F20] rounded-lg px-2 py-1">Completed</Badge>
                          )}
                          {activity.status === 'alert' && (
                            <Badge className="bg-[#E9C46A15] text-[#E9C46A] border border-[#E9C46A30] hover:bg-[#E9C46A20] rounded-lg px-2 py-1">Alert</Badge>
                          )}
                          {activity.status === 'rescheduled' && (
                            <Badge className="bg-[#8ECAE615] text-[#8ECAE6] border border-[#8ECAE630] hover:bg-[#8ECAE620] rounded-lg px-2 py-1">Rescheduled</Badge>
                          )}
                          {activity.status === 'updated' && (
                            <Badge className="bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200 rounded-lg px-2 py-1">Updated</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Button variant="ghost" className="w-full text-[#2A9D8F] hover:text-white hover:bg-[#2A9D8F] font-medium rounded-xl transition-all duration-200">
                  View All Activities <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Session Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Your session will automatically expire after 30 minutes of inactivity</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
