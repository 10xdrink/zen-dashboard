import React, { useState, useEffect } from 'react';
import FinanceLayout from '@/components/layout/FinanceLayout';
import { 
  Banknote, CreditCard, PieChart, Users, BarChart2, Calendar, Clock, 
  TrendingUp, TrendingDown, RefreshCw, Download, Search, Filter,
  Phone, Mail, MessageSquare, Send, Settings, FileText, Printer,
  AlertCircle, CheckCircle, XCircle, Plus, Edit, Trash2, Eye,
  Calculator, DollarSign, Target, Award, Bell, Lock, Unlock,
  ArrowUp, ArrowDown, MoreHorizontal, SortAsc, SortDesc, Home,
  Activity, Smartphone, Globe, Building2, Zap, Star, Camera,
  QrCode, Scan, Upload, Save, Share2, Copy, ExternalLink,
  User, UserCheck, Timer, MapPin, Shield, Headphones
} from 'lucide-react';
import { Doughnut, Bar, Line, Pie, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, RadialLinearScale);

const CollectionDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Auto-refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (autoRefresh) {
        handleRefresh();
      }
    }, 30000); // 30 seconds
    
    return () => clearInterval(timer);
  }, [autoRefresh]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Mock data
  const dashboardData = {
    todaysTotal: 145890,
    yesterdayTotal: 132450,
    monthlyAvg: 128000,
    monthlyTarget: 4200000,
    targetAchievement: 68.5,
    lastUpdated: new Date().toLocaleTimeString(),
    
    paymentMethods: {
      cash: { 
        amount: 52420, 
        count: 98, 
        avg: 535, 
        percentage: 35.9, 
        trend: 8.5,
        float: 5000,
        available: 47420,
        status: 'normal'
      },
      card: { 
        amount: 43680, 
        count: 54, 
        avg: 809, 
        percentage: 29.9, 
        trend: 12.3,
        successRate: 96.2,
        failed: 2,
        debit: 28420,
        credit: 15260,
        processingFees: 524
      },
      upi: { 
        amount: 31250, 
        count: 76, 
        avg: 411, 
        percentage: 21.4, 
        trend: 15.7,
        successRate: 94.8,
        avgResponseTime: 2.3,
        apps: { gpay: 45, phonepe: 35, paytm: 20 }
      },
      bank: { 
        amount: 12890, 
        count: 12, 
        avg: 1074, 
        percentage: 8.8, 
        trend: 5.2,
        verified: 10,
        pending: 2,
        sameDaySettlement: 83
      },
      wallet: { 
        amount: 5650, 
        count: 18, 
        avg: 314, 
        percentage: 3.9, 
        trend: -2.1,
        breakdown: { paytm: 3250, amazonPay: 1680, others: 720 }
      }
    },
    
    services: [
      { id: 1, name: 'General Consultation', category: 'Consultation', transactions: 48, revenue: 24000, avgPrice: 500, growth: 12.5, topDoctor: 'Dr. Amit Patel', code: 'CONS001' },
      { id: 2, name: 'Dental Cleaning', category: 'Dental', transactions: 32, revenue: 32000, avgPrice: 1000, growth: 18.3, topDoctor: 'Dr. Priya Sharma', code: 'DENT001' },
      { id: 3, name: 'Blood Test', category: 'Laboratory', transactions: 68, revenue: 20400, avgPrice: 300, growth: -2.1, topDoctor: 'Lab Tech', code: 'LAB001' },
      { id: 4, name: 'Physiotherapy Session', category: 'Therapy', transactions: 28, revenue: 22400, avgPrice: 800, growth: 15.7, topDoctor: 'Dr. Sunita Reddy', code: 'PHYS001' },
      { id: 5, name: 'X-Ray', category: 'Radiology', transactions: 22, revenue: 26400, avgPrice: 1200, growth: 8.4, topDoctor: 'Radiologist', code: 'RAD001' },
      { id: 6, name: 'ECG', category: 'Cardiology', transactions: 15, revenue: 22500, avgPrice: 1500, growth: 22.1, topDoctor: 'Dr. Rajesh Kumar', code: 'CARD001' }
    ],
    
    doctors: [
      { 
        id: 1, name: 'Dr. Rajesh Kumar', department: 'Cardiology', 
        collection: 28500, patients: 18, avgPerPatient: 1583, 
        topService: 'ECG', efficiency: 94.2, ranking: 1,
        photo: '👨‍⚕️', trend: 18.5
      },
      { 
        id: 2, name: 'Dr. Priya Sharma', department: 'Dental', 
        collection: 26800, patients: 32, avgPerPatient: 838, 
        topService: 'Dental Cleaning', efficiency: 91.8, ranking: 2,
        photo: '👩‍⚕️', trend: 12.3
      },
      { 
        id: 3, name: 'Dr. Amit Patel', department: 'General Medicine', 
        collection: 24000, patients: 48, avgPerPatient: 500, 
        topService: 'Consultation', efficiency: 88.5, ranking: 3,
        photo: '👨‍⚕️', trend: 8.7
      },
      { 
        id: 4, name: 'Dr. Sunita Reddy', department: 'Physiotherapy', 
        collection: 22400, patients: 28, avgPerPatient: 800, 
        topService: 'Therapy Session', efficiency: 92.1, ranking: 4,
        photo: '👩‍⚕️', trend: 15.2
      }
    ],
    
    outstandingDues: {
      total: 285400,
      totalPatients: 186,
      critical: 45200,
      criticalPatients: 28,
      ageWise: {
        '0-30': { amount: 125600, patients: 78, percentage: 44.0, probability: 85 },
        '31-60': { amount: 89200, patients: 52, percentage: 31.3, probability: 65 },
        '61-90': { amount: 48300, patients: 34, percentage: 16.9, probability: 35 },
        '90+': { amount: 22300, patients: 22, percentage: 7.8, probability: 15 }
      }
    }
  };

  const TabButton = ({ id, label, icon, isActive, onClick, badge }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all relative ${
        isActive 
          ? 'bg-[#156450] text-white shadow-md' 
          : 'bg-white text-gray-600 hover:bg-[#156450]/10 border border-gray-200'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {badge && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );

  // Collection Dashboard Components
  const TodaysCollectionWidget = () => {
    const growthRate = ((dashboardData.todaysTotal - dashboardData.yesterdayTotal) / dashboardData.yesterdayTotal * 100).toFixed(1);
    const targetProgress = (dashboardData.todaysTotal / (dashboardData.monthlyTarget / 30) * 100).toFixed(1);

    return (
      <div className="bg-gradient-to-br from-[#156450]/10 to-white p-8 rounded-xl shadow-sm border border-[#156450]/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Today's Total Collection</h2>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {currentTime.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button className="p-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90">
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Collection Counter */}
        <div className="text-center mb-6">
          <div className={`text-6xl font-bold mb-2 ${refreshing ? 'animate-pulse' : ''}`} style={{ color: '#156450' }}>
            ₹{dashboardData.todaysTotal.toLocaleString()}
          </div>
          <p className="text-sm text-gray-600">Last updated: {dashboardData.lastUpdated}</p>
        </div>

        {/* Comparison Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Yesterday</p>
            <p className="text-lg font-semibold">₹{dashboardData.yesterdayTotal.toLocaleString()}</p>
            <div className={`flex items-center justify-center gap-1 text-sm ${growthRate >= 0 ? 'text-[#156450]' : 'text-red-600'}`}>
              {growthRate >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(growthRate)}%
            </div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Monthly Avg</p>
            <p className="text-lg font-semibold">₹{dashboardData.monthlyAvg.toLocaleString()}</p>
            <p className="text-sm text-[#156450]">+13.9% vs last month</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Monthly Target</p>
            <p className="text-lg font-semibold">₹{(dashboardData.monthlyTarget / 100000).toFixed(1)}L</p>
            <p className="text-sm text-orange-600">{dashboardData.targetAchievement}% achieved</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Today's Target</p>
            <p className="text-lg font-semibold">₹{Math.round(dashboardData.monthlyTarget / 30 / 1000)}K</p>
            <p className={`text-sm ${targetProgress >= 100 ? 'text-[#156450]' : 'text-orange-600'}`}>
              {targetProgress}% complete
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Daily Target Progress</span>
            <span className="text-sm text-gray-600">{targetProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-[#156450] transition-all duration-1000"
              style={{ width: `${Math.min(targetProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const PaymentMethodCard = ({ method, data, icon }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-[#156450]/10">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold capitalize">{method} Payments</h3>
            <p className="text-sm text-gray-600">{data.percentage}% of total</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-sm ${data.trend >= 0 ? 'text-[#156450]' : 'text-red-600'}`}>
          {data.trend >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          {Math.abs(data.trend)}%
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-3xl font-bold text-[#156450]">₹{data.amount.toLocaleString()}</p>
        <p className="text-sm text-gray-600">{data.count} transactions • Avg: ₹{data.avg}</p>
      </div>

      {/* Method-specific details */}
      {method === 'cash' && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Available:</span>
            <span className="font-medium">₹{data.available.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Float:</span>
            <span className="font-medium">₹{data.float.toLocaleString()}</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs text-center ${
            data.status === 'normal' ? 'bg-[#156450]/20 text-[#156450]' : 'bg-yellow-100 text-yellow-700'
          }`}>
            Cash Status: {data.status}
          </div>
        </div>
      )}

      {method === 'card' && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Success Rate:</span>
            <span className="font-medium text-[#156450]">{data.successRate}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Debit Cards:</span>
            <span className="font-medium">₹{data.debit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Credit Cards:</span>
            <span className="font-medium">₹{data.credit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Processing Fees:</span>
            <span className="font-medium text-red-600">₹{data.processingFees}</span>
          </div>
        </div>
      )}

      {method === 'upi' && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Success Rate:</span>
            <span className="font-medium text-[#156450]">{data.successRate}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Avg Response:</span>
            <span className="font-medium">{data.avgResponseTime}s</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Top Apps: </span>
            <span className="font-medium">GPay {data.apps.gpay}%, PhonePe {data.apps.phonepe}%</span>
          </div>
        </div>
      )}

      <button className="w-full py-2 bg-[#156450]/10 text-[#156450] rounded-lg hover:bg-[#156450]/20 transition-colors text-sm font-medium">
        {method === 'cash' ? 'Count Cash' :
         method === 'card' ? 'View Failed Txns' :
         method === 'upi' ? 'View UPI Details' :
         method === 'bank' ? 'Verify Pending' :
         'Wallet Analysis'}
      </button>
    </div>
  );

  const ServiceRevenueSection = () => {
    const [serviceFilter, setServiceFilter] = useState('all');
    const [sortBy, setSortBy] = useState('revenue');

    const serviceData = {
      labels: dashboardData.services.map(s => s.name),
      datasets: [{
        data: dashboardData.services.map(s => s.revenue),
        backgroundColor: ['#156450', '#1e7e63', '#22c55e', '#16a34a', '#15803d', '#166534'],
        borderWidth: 0
      }]
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Service-wise Revenue Analysis</h3>
          <div className="flex gap-2">
            <select 
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
            >
              <option value="all">All Categories</option>
              <option value="consultation">Consultations</option>
              <option value="laboratory">Laboratory</option>
              <option value="radiology">Radiology</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Service Chart */}
          <div className="lg:col-span-1">
            <h4 className="text-md font-medium mb-4">Revenue Distribution</h4>
            <div className="h-64">
              <Doughnut data={serviceData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} />
            </div>
          </div>

          {/* Service Table */}
          <div className="lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2">Service</th>
                    <th className="text-left py-3 px-2">Category</th>
                    <th className="text-left py-3 px-2">Transactions</th>
                    <th className="text-left py-3 px-2">Revenue</th>
                    <th className="text-left py-3 px-2">Growth</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.services.map((service, index) => (
                    <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div>
                          <div className="font-medium">{service.name}</div>
                          <div className="text-xs text-gray-500">{service.code}</div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          service.category === 'Consultation' ? 'bg-blue-100 text-blue-700' :
                          service.category === 'Laboratory' ? 'bg-green-100 text-green-700' :
                          service.category === 'Radiology' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {service.category}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{service.transactions}</span>
                          <div className="w-12 bg-gray-200 rounded-full h-1">
                            <div 
                              className="h-1 rounded-full bg-[#156450]"
                              style={{ width: `${(service.transactions / Math.max(...dashboardData.services.map(s => s.transactions))) * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="font-semibold text-[#156450]">₹{service.revenue.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Avg: ₹{service.avgPrice}</div>
                      </td>
                      <td className="py-3 px-2">
                        <div className={`flex items-center gap-1 ${service.growth >= 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                          {service.growth >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          <span className="text-sm font-medium">{Math.abs(service.growth)}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <button className="p-1 text-[#156450] hover:bg-[#156450]/20 rounded">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Services</p>
            <p className="text-xl font-bold text-[#156450]">{dashboardData.services.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Top Service</p>
            <p className="text-sm font-bold text-[#156450]">{dashboardData.services[0].name}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Fastest Growing</p>
            <p className="text-sm font-bold text-[#156450]">ECG (+22.1%)</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Most Popular</p>
            <p className="text-sm font-bold text-[#156450]">Blood Test (68 txns)</p>
          </div>
        </div>
      </div>
    );
  };

  const DoctorPerformanceSection = () => {
    const [viewMode, setViewMode] = useState('cards');
    const [sortBy, setSortBy] = useState('collection');

    const DoctorCard = ({ doctor }) => (
      <div className={`bg-white p-6 rounded-xl shadow-sm border-2 transition-all hover:shadow-md ${
        doctor.ranking === 1 ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-white' :
        doctor.ranking === 2 ? 'border-gray-300 bg-gradient-to-br from-gray-50 to-white' :
        doctor.ranking === 3 ? 'border-orange-300 bg-gradient-to-br from-orange-50 to-white' :
        'border-gray-200'
      }`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-[#156450]/10 rounded-full flex items-center justify-center text-2xl">
              {doctor.photo}
            </div>
            {doctor.ranking <= 3 && (
              <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                doctor.ranking === 1 ? 'bg-yellow-500' :
                doctor.ranking === 2 ? 'bg-gray-500' :
                'bg-orange-500'
              }`}>
                {doctor.ranking}
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.department}</p>
            <div className="flex items-center gap-2 mt-1">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Rank #{doctor.ranking}</span>
              <div className={`flex items-center gap-1 text-xs ${doctor.trend >= 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                {doctor.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {Math.abs(doctor.trend)}%
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Collection</p>
            <p className="text-lg font-bold text-[#156450]">₹{doctor.collection.toLocaleString()}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Patients</p>
            <p className="text-lg font-bold text-[#156450]">{doctor.patients}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Avg/Patient:</span>
            <span className="font-medium">₹{doctor.avgPerPatient}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Top Service:</span>
            <span className="font-medium">{doctor.topService}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Efficiency:</span>
            <span className="font-medium text-[#156450]">{doctor.efficiency}%</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-[#156450] transition-all duration-500"
              style={{ width: `${doctor.efficiency}%` }}
            />
          </div>
        </div>
        
        <button className="w-full mt-4 px-4 py-2 bg-[#156450]/10 text-[#156450] rounded-lg hover:bg-[#156450]/20 transition-colors text-sm font-medium">
          View Details
        </button>
      </div>
    );

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Doctor-wise Collection Performance</h3>
          <div className="flex gap-2">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
            >
              <option value="collection">By Collection</option>
              <option value="patients">By Patient Count</option>
              <option value="efficiency">By Efficiency</option>
            </select>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 text-sm rounded-l-lg ${viewMode === 'cards' ? 'bg-[#156450] text-white' : 'hover:bg-gray-50'}`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-sm rounded-r-lg ${viewMode === 'list' ? 'bg-[#156450] text-white' : 'hover:bg-gray-50'}`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {dashboardData.doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Doctor</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Collection</th>
                  <th className="text-left py-3 px-4">Patients</th>
                  <th className="text-left py-3 px-4">Avg/Patient</th>
                  <th className="text-left py-3 px-4">Efficiency</th>
                  <th className="text-left py-3 px-4">Trend</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.doctors.map(doctor => (
                  <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#156450]/10 rounded-full flex items-center justify-center text-sm">
                          {doctor.photo}
                        </div>
                        <div>
                          <div className="font-medium">{doctor.name}</div>
                          <div className="text-xs text-gray-500">Rank #{doctor.ranking}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{doctor.department}</td>
                    <td className="py-3 px-4 font-semibold text-[#156450]">₹{doctor.collection.toLocaleString()}</td>
                    <td className="py-3 px-4">{doctor.patients}</td>
                    <td className="py-3 px-4">₹{doctor.avgPerPatient}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{doctor.efficiency}%</span>
                        <div className="w-12 bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full bg-[#156450]"
                            style={{ width: `${doctor.efficiency}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center gap-1 ${doctor.trend >= 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                        {doctor.trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span className="text-sm">{Math.abs(doctor.trend)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-1 text-[#156450] hover:bg-[#156450]/20 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Department Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          {[
            { dept: 'Cardiology', doctors: 2, total: 28500, avg: 14250, top: 'Dr. Rajesh Kumar' },
            { dept: 'Dental', doctors: 2, total: 26800, avg: 13400, top: 'Dr. Priya Sharma' },
            { dept: 'General Medicine', doctors: 3, total: 24000, avg: 8000, top: 'Dr. Amit Patel' },
            { dept: 'Physiotherapy', doctors: 1, total: 22400, avg: 22400, top: 'Dr. Sunita Reddy' }
          ].map((dept, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{dept.dept}</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctors:</span>
                  <span className="font-medium">{dept.doctors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium text-[#156450]">₹{dept.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-medium">₹{dept.avg.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Top: {dept.top}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OutstandingDuesWidget = () => {
    const duesData = {
      labels: Object.keys(dashboardData.outstandingDues.ageWise),
      datasets: [{
        data: Object.values(dashboardData.outstandingDues.ageWise).map(age => age.amount),
        backgroundColor: ['#156450', '#22c55e', '#f59e0b', '#ef4444'],
        borderWidth: 0
      }]
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Outstanding Dues Summary</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 text-sm">
              <Send className="h-4 w-4 inline mr-1" />
              Send Reminders
            </button>
            <button className="px-4 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
              <FileText className="h-4 w-4 inline mr-1" />
              Generate Report
            </button>
          </div>
        </div>

        {/* Critical Alert */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <h4 className="font-semibold text-red-800">
                Total Outstanding: ₹{dashboardData.outstandingDues.total.toLocaleString()}
              </h4>
              <p className="text-sm text-red-600">
                {dashboardData.outstandingDues.totalPatients} patients with pending payments
              </p>
              <p className="text-sm text-red-600">
                Critical: ₹{dashboardData.outstandingDues.critical.toLocaleString()} 
                ({dashboardData.outstandingDues.criticalPatients} patients &gt;90 days)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Age-wise Chart */}
          <div>
            <h4 className="text-md font-medium mb-4">Age-wise Distribution</h4>
            <div className="h-48">
              <Doughnut data={duesData} options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} />
            </div>
          </div>

          {/* Age-wise Breakdown */}
          <div>
            <h4 className="text-md font-medium mb-4">Breakdown by Age</h4>
            <div className="space-y-3">
              {Object.entries(dashboardData.outstandingDues.ageWise).map(([range, data], index) => {
                const colors = ['text-[#156450] bg-[#156450]/20', 'text-green-600 bg-green-100', 'text-yellow-600 bg-yellow-100', 'text-red-600 bg-red-100'];
                return (
                  <div key={range} className={`p-3 rounded-lg border ${colors[index].replace('text-', 'border-').replace('/20', '/30').replace('-100', '-200')}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className={`font-medium ${colors[index].split(' ')[0]}`}>{range} Days</h5>
                      <span className={`px-2 py-1 rounded-full text-xs ${colors[index]}`}>
                        {data.probability}% Probability
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Amount: </span>
                        <span className="font-semibold">₹{data.amount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Patients: </span>
                        <span className="font-semibold">{data.patients}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-200">
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm">
            <Mail className="h-4 w-4" />
            Email Reminders
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 text-sm">
            <Phone className="h-4 w-4" />
            Schedule Calls
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 text-sm">
            <CreditCard className="h-4 w-4" />
            Payment Links
          </button>
          <button className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 text-sm">
            <FileText className="h-4 w-4" />
            Statements
          </button>
        </div>
      </div>
    );
  };

  // Payment Processing Components
  const PaymentProcessing = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [paymentAmount, setPaymentAmount] = useState(0);

    const mockPatients = [
      { id: 'PT001', name: 'John Doe', phone: '+91 9876543210', email: 'john@example.com', outstanding: 2500, lastVisit: '2025-06-15' },
      { id: 'PT002', name: 'Jane Smith', phone: '+91 9876543211', email: 'jane@example.com', outstanding: 0, lastVisit: '2025-06-18' },
      { id: 'PT003', name: 'Rahul Verma', phone: '+91 9876543212', email: 'rahul@example.com', outstanding: 1200, lastVisit: '2025-06-10' }
    ];

    const mockServices = [
      { id: 'SV001', name: 'General Consultation', category: 'Consultation', price: 500, doctor: 'Dr. Amit Patel' },
      { id: 'SV002', name: 'Dental Cleaning', category: 'Dental', price: 1000, doctor: 'Dr. Priya Sharma' },
      { id: 'SV003', name: 'Blood Test', category: 'Laboratory', price: 300, doctor: 'Lab Technician' },
      { id: 'SV004', name: 'X-Ray Chest', category: 'Radiology', price: 800, doctor: 'Radiologist' }
    ];

    const PatientSelectionStep = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Step 1: Patient Selection</h3>
        
        {/* Search Interface */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Patient ID, Name, or Phone Number"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Scan className="h-4 w-4" />
            </button>
            <button className="px-4 py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90">
              <Plus className="h-4 w-4 inline mr-1" />
              New Patient
            </button>
          </div>

          {/* Patient List */}
          <div className="space-y-2">
            {mockPatients.map(patient => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedPatient?.id === patient.id ? 'border-[#156450] bg-[#156450]/10' : 'border-gray-200 hover:border-[#156450]/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{patient.name}</h4>
                    <p className="text-sm text-gray-600">ID: {patient.id} | Phone: {patient.phone}</p>
                    <p className="text-sm text-gray-600">Last Visit: {patient.lastVisit}</p>
                  </div>
                  <div className="text-right">
                    {patient.outstanding > 0 && (
                      <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                        Outstanding: ₹{patient.outstanding.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Patient Info */}
        {selectedPatient && (
          <div className="bg-[#156450]/10 border border-[#156450]/30 rounded-lg p-4">
            <h4 className="font-semibold text-[#156450] mb-2">Selected Patient</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name:</p>
                <p className="font-medium">{selectedPatient.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact:</p>
                <p className="font-medium">{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Outstanding:</p>
                <p className={`font-medium ${selectedPatient.outstanding > 0 ? 'text-red-600' : 'text-[#156450]'}`}>
                  ₹{selectedPatient.outstanding.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );

    const ServiceSelectionStep = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Step 2: Service Selection</h3>
        
        {/* Service Search */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
            <option>All Categories</option>
            <option>Consultation</option>
            <option>Laboratory</option>
            <option>Radiology</option>
          </select>
        </div>

        {/* Available Services */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-4">Available Services</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockServices.map(service => (
              <div
                key={service.id}
                onClick={() => {
                  if (!selectedServices.find(s => s.id === service.id)) {
                    setSelectedServices([...selectedServices, { ...service, quantity: 1 }]);
                  }
                }}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#156450]/50 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium">{service.name}</h5>
                    <p className="text-sm text-gray-600">{service.category} - {service.doctor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#156450]">₹{service.price}</p>
                    <button className="text-sm text-[#156450] hover:underline">Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Services */}
        {selectedServices.length > 0 && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-4">Selected Services</h4>
            <div className="space-y-3">
              {selectedServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-medium">{service.name}</h5>
                    <p className="text-sm text-gray-600">{service.doctor}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const updated = [...selectedServices];
                          if (updated[index].quantity > 1) {
                            updated[index].quantity--;
                            setSelectedServices(updated);
                          }
                        }}
                        className="w-6 h-6 bg-gray-200 rounded text-sm hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{service.quantity}</span>
                      <button
                        onClick={() => {
                          const updated = [...selectedServices];
                          updated[index].quantity++;
                          setSelectedServices(updated);
                        }}
                        className="w-6 h-6 bg-gray-200 rounded text-sm hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold w-20 text-right">₹{(service.price * service.quantity).toLocaleString()}</span>
                    <button
                      onClick={() => setSelectedServices(selectedServices.filter((_, i) => i !== index))}
                      className="text-red-600 hover:bg-red-100 p-1 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-[#156450]">
                  ₹{selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );

    const PaymentMethodStep = () => {
      const totalAmount = selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0);
      
      return (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Step 3: Payment Method</h3>
          
          {/* Amount Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-center">
              <h4 className="text-lg font-medium mb-2">Amount Due</h4>
              <p className="text-4xl font-bold text-[#156450]">₹{totalAmount.toLocaleString()}</p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-4">Select Payment Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'cash', name: 'Cash', icon: <Banknote className="h-6 w-6" /> },
                { id: 'card', name: 'Card', icon: <CreditCard className="h-6 w-6" /> },
                { id: 'upi', name: 'UPI', icon: <Smartphone className="h-6 w-6" /> }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-6 border rounded-lg transition-all ${
                    paymentMethod === method.id ? 'border-[#156450] bg-[#156450]/10' : 'border-gray-200 hover:border-[#156450]/50'
                  }`}
                >
                  <div className="text-center">
                    <div className={`inline-flex p-3 rounded-lg mb-3 ${
                      paymentMethod === method.id ? 'bg-[#156450] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {method.icon}
                    </div>
                    <p className="font-medium">{method.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Interface */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            {paymentMethod === 'cash' && (
              <div className="space-y-4">
                <h4 className="font-medium">Cash Payment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount Tendered</label>
                    <input
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                      placeholder="Enter amount received"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Change to Return</label>
                    <div className="px-4 py-2 bg-gray-100 rounded-lg text-lg font-semibold">
                      ₹{Math.max(0, paymentAmount - totalAmount).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <h4 className="font-medium">Card Payment</h4>
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Please insert or swipe the card</p>
                  <p className="text-sm text-gray-500 mt-2">Processing will begin automatically</p>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <h4 className="font-medium">UPI Payment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">Scan QR Code</p>
                    <div className="inline-block p-4 bg-gray-100 rounded-lg">
                      <QrCode className="h-24 w-24 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Amount: ₹{totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Or enter UPI ID</p>
                    <input
                      type="text"
                      placeholder="Enter UPI ID"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450] mb-3"
                    />
                    <button className="w-full py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90">
                      Send Payment Request
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    };

    const PaymentConfirmationStep = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Step 4: Payment Confirmation</h3>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
          <CheckCircle className="h-16 w-16 text-[#156450] mx-auto mb-4" />
          <h4 className="text-xl font-semibold text-[#156450] mb-2">Payment Successful!</h4>
          <p className="text-gray-600 mb-4">Transaction ID: TXN123456789</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p className="text-gray-600">Patient:</p>
                <p className="font-medium">{selectedPatient?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Amount Paid:</p>
                <p className="font-medium text-[#156450]">₹{selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90 flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Receipt
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Receipt
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              SMS Receipt
            </button>
          </div>
        </div>
      </div>
    );

    const renderStep = () => {
      switch (currentStep) {
        case 1: return <PatientSelectionStep />;
        case 2: return <ServiceSelectionStep />;
        case 3: return <PaymentMethodStep />;
        case 4: return <PaymentConfirmationStep />;
        default: return <PatientSelectionStep />;
      }
    };

    return (
      <div className="space-y-6">
        {/* Step Indicator */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map(step => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step ? 'border-[#156450] bg-[#156450] text-white' : 'border-gray-300 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 flex-1 mx-2 ${
                    currentStep > step ? 'bg-[#156450]' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={currentStep >= 1 ? 'text-[#156450] font-medium' : 'text-gray-500'}>Patient</span>
            <span className={currentStep >= 2 ? 'text-[#156450] font-medium' : 'text-gray-500'}>Services</span>
            <span className={currentStep >= 3 ? 'text-[#156450] font-medium' : 'text-gray-500'}>Payment</span>
            <span className={currentStep >= 4 ? 'text-[#156450] font-medium' : 'text-gray-500'}>Receipt</span>
          </div>
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={
                (currentStep === 1 && !selectedPatient) ||
                (currentStep === 2 && selectedServices.length === 0) ||
                (currentStep === 3 && (!paymentAmount || paymentAmount < selectedServices.reduce((total, service) => total + (service.price * service.quantity), 0)))
              }
              className="px-6 py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentStep(1);
                setSelectedPatient(null);
                setSelectedServices([]);
                setPaymentAmount(0);
              }}
              className="px-6 py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90"
            >
              New Transaction
            </button>
          )}
        </div>
      </div>
    );
  };

  // Outstanding Management Component
  const OutstandingManagement = () => {
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [filterAmount, setFilterAmount] = useState([0, 50000]);
    const [filterAge, setFilterAge] = useState([]);

    const outstandingPatients = [
      { id: 'PT001', name: 'John Doe', phone: '+91 9876543210', due: 5000, daysOverdue: 45, lastPayment: '2025-05-07', lastContact: '2025-06-15', probability: 85 },
      { id: 'PT002', name: 'Jane Smith', phone: '+91 9876543211', due: 3500, daysOverdue: 32, lastPayment: '2025-05-20', lastContact: '2025-06-18', probability: 92 },
      { id: 'PT003', name: 'Rahul Verma', phone: '+91 9876543212', due: 2000, daysOverdue: 15, lastPayment: '2025-06-06', lastContact: '2025-06-20', probability: 75 },
      { id: 'PT004', name: 'Priya Patel', phone: '+91 9876543213', due: 7500, daysOverdue: 78, lastPayment: '2025-04-04', lastContact: '2025-06-10', probability: 60 }
    ];

    return (
      <div className="space-y-6">
        {/* Filter Panel */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Filter Outstanding Dues</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filterAmount[0]}
                  onChange={(e) => setFilterAmount([Number(e.target.value), filterAmount[1]])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filterAmount[1]}
                  onChange={(e) => setFilterAmount([filterAmount[0], Number(e.target.value)])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Days Overdue</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>All Ages</option>
                <option>0-30 days</option>
                <option>31-60 days</option>
                <option>61-90 days</option>
                <option>90+ days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Status</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>All Status</option>
                <option>Never Contacted</option>
                <option>Contacted</option>
                <option>No Response</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Patient</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name, ID, or Phone"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Outstanding Table */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Outstanding Dues Management</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm">
                <Send className="h-4 w-4 inline mr-1" />
                Bulk Reminders
              </button>
              <button className="px-4 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                <Download className="h-4 w-4 inline mr-1" />
                Export List
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">
                    <input type="checkbox" className="rounded text-[#156450] focus:ring-[#156450]" />
                  </th>
                  <th className="text-left py-3 px-4">Patient</th>
                  <th className="text-left py-3 px-4">Due Amount</th>
                  <th className="text-left py-3 px-4">Days Overdue</th>
                  <th className="text-left py-3 px-4">Last Payment</th>
                  <th className="text-left py-3 px-4">Last Contact</th>
                  <th className="text-left py-3 px-4">Recovery Score</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {outstandingPatients.map(patient => (
                  <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedPatients.includes(patient.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPatients([...selectedPatients, patient.id]);
                          } else {
                            setSelectedPatients(selectedPatients.filter(id => id !== patient.id));
                          }
                        }}
                        className="rounded text-[#156450] focus:ring-[#156450]"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{patient.name}</div>
                        <div className="text-xs text-gray-500">{patient.id}</div>
                        <div className="text-xs text-gray-500">{patient.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-red-600">₹{patient.due.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        patient.daysOverdue > 60 ? 'bg-red-100 text-red-800' :
                        patient.daysOverdue > 30 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-[#156450]/20 text-[#156450]'
                      }`}>
                        {patient.daysOverdue} days
                      </span>
                    </td>
                    <td className="py-3 px-4">{patient.lastPayment}</td>
                    <td className="py-3 px-4">{patient.lastContact}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-[#156450] transition-all duration-500"
                            style={{ width: `${patient.probability}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{patient.probability}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button className="p-1 text-[#156450] hover:bg-[#156450]/20 rounded" title="Call">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-blue-600 hover:bg-blue-100 rounded" title="SMS">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-purple-600 hover:bg-purple-100 rounded" title="Email">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded" title="More">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Automated Reminders Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Automated Reminder Setup</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Communication Methods</label>
                <div className="space-y-2">
                  {['SMS', 'Email', 'WhatsApp'].map(method => (
                    <label key={method} className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2 text-[#156450] focus:ring-[#156450]" />
                      <span className="text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-[#156450]/10 rounded-lg p-4">
                <h4 className="font-semibold text-[#156450] mb-2">Today's Reminder Stats</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Reminders Sent:</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Rate:</span>
                    <span className="font-medium text-[#156450]">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payments Received:</span>
                    <span className="font-medium text-[#156450]">₹45,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Settlement Options</h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Payment Plans</h4>
                <div className="space-y-2">
                  {['3 Months Plan', '6 Months Plan', '12 Months Plan'].map(plan => (
                    <div key={plan} className="flex items-center justify-between">
                      <span className="text-sm">{plan}</span>
                      <button className="text-[#156450] text-sm hover:underline">Setup</button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Partial Payment</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Minimum Payment:</span>
                    <span className="font-medium">₹500</span>
                  </div>
                  <button className="w-full py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                    Accept Partial Payment
                  </button>
                </div>
              </div>

              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <h4 className="font-semibold text-red-800 mb-2">Write-off Procedures</h4>
                <p className="text-xs text-red-600 mb-2">For amounts over 90 days with supervisor approval</p>
                <button className="w-full py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm">
                  Initiate Write-off
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Daily Closing Component
  const DailyClosing = () => {
    const [cashCounts, setCashCounts] = useState({
      2000: 0, 500: 10, 200: 25, 100: 80, 50: 40, 20: 100, 10: 50, 5: 20, 2: 25, 1: 50
    });
    const [varianceExplanation, setVarianceExplanation] = useState('');

    const expectedCash = dashboardData.paymentMethods.cash.amount;
    const countedCash = Object.entries(cashCounts).reduce((total, [denom, count]) => total + (parseInt(denom) * count), 0);
    const variance = countedCash - expectedCash;

    const CashDenomination = ({ value, count, onChange }) => (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-8 bg-green-100 border border-green-300 rounded flex items-center justify-center text-xs font-semibold">
            ₹{value}
          </div>
          <span className="font-medium">₹{value} {value >= 5 ? 'Notes' : 'Coins'}</span>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={count}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
          />
          <span className="text-sm">×</span>
          <span className="font-semibold w-20 text-right">₹{(value * count).toLocaleString()}</span>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        {/* Cash Count Reconciliation */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-6">Cash Count Reconciliation</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Physical Cash Count */}
            <div>
              <h4 className="font-semibold mb-4">Physical Cash Count</h4>
              <div className="space-y-3">
                {Object.entries(cashCounts).map(([denomination, count]) => (
                  <CashDenomination
                    key={denomination}
                    value={parseInt(denomination)}
                    count={count}
                    onChange={(newCount) => setCashCounts({...cashCounts, [denomination]: newCount})}
                  />
                ))}
              </div>
            </div>

            {/* Reconciliation Summary */}
            <div>
              <h4 className="font-semibold mb-4">Reconciliation Summary</h4>
              <div className="bg-[#156450]/10 rounded-lg p-4 space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Physical Cash Total:</span>
                  <span className="font-semibold">₹{countedCash.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Cash (System):</span>
                  <span className="font-semibold">₹{expectedCash.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Variance:</span>
                  <span className={`font-semibold ${variance === 0 ? 'text-[#156450]' : variance > 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {variance > 0 ? '+' : ''}₹{variance.toLocaleString()}
                  </span>
                </div>
              </div>

              {variance !== 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Variance Explanation</label>
                  <textarea
                    value={varianceExplanation}
                    onChange={(e) => setVarianceExplanation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                    rows={3}
                    placeholder="Explain any variance..."
                  />
                </div>
              )}

              <button className="w-full py-3 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90 font-semibold">
                Approve Reconciliation
              </button>
            </div>
          </div>
        </div>

        {/* Bank Deposit & Transaction Summary */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Bank Deposit Preparation */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Bank Deposit Preparation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                  <option>HDFC Bank - ****1234</option>
                  <option>ICICI Bank - ****5678</option>
                  <option>SBI - ****9012</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cash Amount</label>
                  <input
                    type="number"
                    value={countedCash}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cheques</label>
                  <input
                    type="number"
                    defaultValue="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span>Deposit Bag Number:</span>
                  <span className="font-mono text-[#156450]">DB-2025-0621-001</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Seal Number:</span>
                  <input
                    type="text"
                    placeholder="Enter seal number"
                    className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-3 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90 font-semibold flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  Generate Slip
                </button>
                <button className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold flex items-center justify-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </button>
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Daily Transaction Summary</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#156450]/10 rounded-lg p-4 text-center">
                  <h4 className="text-sm font-medium text-[#156450]">Total Transactions</h4>
                  <p className="text-2xl font-bold text-[#156450]">248</p>
                  <p className="text-sm text-[#156450]">₹{dashboardData.todaysTotal.toLocaleString()}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <h4 className="text-sm font-medium text-red-600">Refunds</h4>
                  <p className="text-2xl font-bold text-red-600">12</p>
                  <p className="text-sm text-red-600">₹6,200</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Cash Payments:</span>
                  <span className="font-medium">₹{dashboardData.paymentMethods.cash.amount.toLocaleString()} ({dashboardData.paymentMethods.cash.count} trans)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Card Payments:</span>
                  <span className="font-medium">₹{dashboardData.paymentMethods.card.amount.toLocaleString()} ({dashboardData.paymentMethods.card.count} trans)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">UPI Payments:</span>
                  <span className="font-medium">₹{dashboardData.paymentMethods.upi.amount.toLocaleString()} ({dashboardData.paymentMethods.upi.count} trans)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Bank Transfers:</span>
                  <span className="font-medium">₹{dashboardData.paymentMethods.bank.amount.toLocaleString()} ({dashboardData.paymentMethods.bank.count} trans)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Wallet Payments:</span>
                  <span className="font-medium">₹{dashboardData.paymentMethods.wallet.amount.toLocaleString()} ({dashboardData.paymentMethods.wallet.count} trans)</span>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button className="flex-1 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                  Detailed Report
                </button>
                <button className="flex-1 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                  Email Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Day-end Reports & Closure */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Day-end Reports & Closure</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending Closure</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Generation */}
            <div>
              <h4 className="font-semibold mb-4">Report Generation</h4>
              <div className="space-y-3">
                {[
                  'Daily Summary Report',
                  'Detailed Transaction Report', 
                  'Outstanding Report',
                  'Performance Report',
                  'Exception Report'
                ].map(report => (
                  <div key={report} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{report}</span>
                    <button className="text-[#156450] hover:text-[#156450]/70">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Variance Analysis */}
            <div>
              <h4 className="font-semibold mb-4">Variance Analysis</h4>
              <div className="space-y-3">
                <div className="p-3 bg-[#156450]/10 border border-[#156450]/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#156450]" />
                    <span className="text-sm font-medium">Payment Processing</span>
                  </div>
                  <p className="text-xs text-[#156450] mt-1">All reconciled</p>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Cash Variance</span>
                  </div>
                  <p className="text-xs text-yellow-600 mt-1">₹{Math.abs(variance).toLocaleString()} {variance > 0 ? 'excess' : 'shortage'}</p>
                </div>
                <div className="p-3 bg-[#156450]/10 border border-[#156450]/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#156450]" />
                    <span className="text-sm font-medium">UPI Reconciliation</span>
                  </div>
                  <p className="text-xs text-[#156450] mt-1">Matched</p>
                </div>
              </div>
            </div>

            {/* Day Closure */}
            <div>
              <h4 className="font-semibold mb-4">Day Closure</h4>
              <div className="space-y-3">
                <div className="bg-[#156450]/10 rounded-lg p-4">
                  <h5 className="font-medium text-[#156450] mb-2">Closure Checklist</h5>
                  <div className="space-y-1 text-sm">
                    {[
                      'Cash reconciliation completed',
                      'Bank deposits prepared', 
                      'Reports generated',
                      'Variances explained',
                      'Supervisor approval'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-[#156450]" />
                        <span className="text-[#156450]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold flex items-center justify-center gap-2">
                  <Lock className="h-4 w-4" />
                  Close Day
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render function for tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <TodaysCollectionWidget />
            
            {/* Payment Methods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <PaymentMethodCard
                method="cash"
                data={dashboardData.paymentMethods.cash}
                icon={<Banknote className="h-6 w-6 text-[#156450]" />}
              />
              <PaymentMethodCard
                method="card"
                data={dashboardData.paymentMethods.card}
                icon={<CreditCard className="h-6 w-6 text-[#156450]" />}
              />
              <PaymentMethodCard
                method="upi"
                data={dashboardData.paymentMethods.upi}
                icon={<Smartphone className="h-6 w-6 text-[#156450]" />}
              />
              <PaymentMethodCard
                method="bank"
                data={dashboardData.paymentMethods.bank}
                icon={<Building2 className="h-6 w-6 text-[#156450]" />}
              />
              <PaymentMethodCard
                method="wallet"
                data={dashboardData.paymentMethods.wallet}
                icon={<Globe className="h-6 w-6 text-[#156450]" />}
              />
            </div>

            <ServiceRevenueSection />
            <DoctorPerformanceSection />
            <OutstandingDuesWidget />
          </div>
        );
      case 'payment-processing':
        return <PaymentProcessing />;
      case 'outstanding':
        return <OutstandingManagement />;
      case 'daily-closing':
        return <DailyClosing />;
      default:
        return null;
    }
  };

  return (
    <FinanceLayout 
      pageTitle="Daily Collections Management" 
      pageSubtitle="Real-time collection tracking and payment processing"
    >
      {/* Header with Quick Stats Ticker */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#156450]" />
              <span className="text-sm font-medium">
                {currentTime.toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-[#156450]" />
                <span className="font-medium">₹{dashboardData.todaysTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="font-medium">248 transactions</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="font-medium">₹{dashboardData.outstandingDues.total.toLocaleString()} pending</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">
              Shift: Morning | Cash Drawer: #CD001
            </div>
            <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
              <Headphones className="h-4 w-4 inline mr-1" />
              Emergency
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                autoRefresh 
                  ? 'bg-[#156450] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Zap className="h-4 w-4 inline mr-1" />
              {autoRefresh ? 'Live' : 'Manual'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6 flex flex-wrap gap-3">
        <TabButton
          id="dashboard"
          label="Collection Dashboard"
          icon={<Home className="h-4 w-4" />}
          isActive={activeTab === 'dashboard'}
          onClick={setActiveTab}
        />
        <TabButton
          id="payment-processing"
          label="Payment Processing"
          icon={<CreditCard className="h-4 w-4" />}
          isActive={activeTab === 'payment-processing'}
          onClick={setActiveTab}
        />
        <TabButton
          id="outstanding"
          label="Outstanding Management"
          icon={<Clock className="h-4 w-4" />}
          isActive={activeTab === 'outstanding'}
          onClick={setActiveTab}
          badge={dashboardData.outstandingDues.criticalPatients}
        />
        <TabButton
          id="daily-closing"
          label="Daily Closing"
          icon={<Lock className="h-4 w-4" />}
          isActive={activeTab === 'daily-closing'}
          onClick={setActiveTab}
        />
      </div>

      {/* Main Content */}
      <div className="min-h-screen">
        {renderTabContent()}
      </div>

      {/* Real-time Update Indicator */}
      {refreshing && (
        <div className="fixed bottom-4 right-4 bg-[#156450] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span className="text-sm">Updating data...</span>
        </div>
      )}


    </FinanceLayout>
  );
};

export default CollectionDashboard;
