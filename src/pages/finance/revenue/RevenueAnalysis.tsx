import React, { useState, useEffect } from 'react';
import { 
  Download, RefreshCcw, SlidersHorizontal, TrendingUp, TrendingDown, Filter,
  Calendar, DollarSign, Target, BarChart3, Users, Clock, Eye, Search,
  ChevronDown, ChevronUp, Award, Star, AlertCircle, CheckCircle,
  ArrowUpRight, ArrowDownRight, MoreHorizontal, FileText, Mail,
  Phone, MessageSquare, Settings, Globe, CreditCard, Smartphone
} from 'lucide-react';
import { Line, Bar, Doughnut, Pie, Scatter, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js';
import FinanceLayout from '@/components/layout/FinanceLayout';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
);

const RevenueAnalysis = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('This Month');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [activeSection, setActiveSection] = useState('trends');
  const [selectedFilters, setSelectedFilters] = useState({
    department: [],
    doctor: [],
    service: [],
    paymentMethod: []
  });

  // Mock data for the dashboard
  const mockData = {
    kpis: {
      totalRevenue: { value: 12450000, trend: 15.3, target: 15000000 },
      avgDailyRevenue: { value: 415000, trend: 8.7 },
      revenueTarget: { achieved: 83, target: 15000000 },
      growthRate: { mom: 15.3, yoy: 28.5 }
    },
    dailyRevenue: [
      { date: '2025-06-01', revenue: 380000, target: 400000 },
      { date: '2025-06-02', revenue: 420000, target: 400000 },
      { date: '2025-06-03', revenue: 395000, target: 400000 },
      { date: '2025-06-04', revenue: 445000, target: 400000 },
      { date: '2025-06-05', revenue: 410000, target: 400000 },
      { date: '2025-06-06', revenue: 385000, target: 400000 },
      { date: '2025-06-07', revenue: 460000, target: 400000 }
    ],
    topServices: [
      { name: 'General Consultation', revenue: 2850000, transactions: 5700, avgPrice: 500, growth: 12.5, margin: 68 },
      { name: 'Dental Treatment', revenue: 2280000, transactions: 2280, avgPrice: 1000, growth: 18.3, margin: 72 },
      { name: 'Cardiology', revenue: 1980000, transactions: 1320, avgPrice: 1500, growth: 22.1, margin: 85 },
      { name: 'Laboratory Tests', revenue: 1650000, transactions: 5500, avgPrice: 300, growth: -2.1, margin: 45 },
      { name: 'Radiology', revenue: 1440000, transactions: 1200, avgPrice: 1200, growth: 5.4, margin: 78 },
      { name: 'Physiotherapy', revenue: 1280000, transactions: 1600, avgPrice: 800, growth: 15.7, margin: 62 }
    ],
    doctors: [
      { 
        id: 1, name: 'Dr. Rajesh Kumar', department: 'Cardiology', 
        revenue: 1980000, patients: 1320, avgTransaction: 1500, growth: 18.5,
        ranking: 1, efficiency: 9.2, rating: 4.8, commission: 198000
      },
      { 
        id: 2, name: 'Dr. Priya Sharma', department: 'Dental', 
        revenue: 1680000, patients: 1680, avgTransaction: 1000, growth: 12.3,
        ranking: 2, efficiency: 8.9, rating: 4.7, commission: 168000
      },
      { 
        id: 3, name: 'Dr. Amit Patel', department: 'General Medicine', 
        revenue: 1425000, patients: 2850, avgTransaction: 500, growth: 8.7,
        ranking: 3, efficiency: 8.5, rating: 4.6, commission: 142500
      },
      { 
        id: 4, name: 'Dr. Sunita Reddy', department: 'Physiotherapy', 
        revenue: 1280000, patients: 1600, avgTransaction: 800, growth: 15.2,
        ranking: 4, efficiency: 8.8, rating: 4.9, commission: 128000
      }
    ],
    paymentMethods: {
      cash: { transactions: 2856, revenue: 1428000, successRate: 100, avgAmount: 500 },
      card: { transactions: 1824, revenue: 1824000, successRate: 96.2, avgAmount: 1000 },
      upi: { transactions: 3420, revenue: 1710000, successRate: 94.8, avgAmount: 500 },
      netBanking: { transactions: 570, revenue: 1140000, successRate: 98.5, avgAmount: 2000 },
      wallet: { transactions: 1140, revenue: 570000, successRate: 92.3, avgAmount: 500 }
    }
  };

  const chartColors = {
    primary: '#156450',
    secondary: '#1e7e63',
    accent: '#22c55e',
    light: '#dcfce7',
    gradient: 'linear-gradient(135deg, #156450, #22c55e)'
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { usePointStyle: true, padding: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#156450',
        borderWidth: 1
      }
    },
    scales: {
      x: { 
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280' }
      },
      y: { 
        grid: { color: '#f3f4f6' },
        ticks: { color: '#6b7280' }
      }
    }
  };

  // KPI Cards Component
  interface KPICardProps {
    title: string;
    value: string;
    trend?: number;
    subtitle?: string;
    progress?: number;
    icon: React.ReactNode;
  }
  
  const KPICard = ({ title, value, trend = 0, subtitle = "", progress, icon }: KPICardProps) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-green-50">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      {progress !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium" style={{ color: '#156450' }}>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #156450, #22c55e)'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );

  // Daily Revenue Chart
  const DailyRevenueChart = () => {
    const data = {
      labels: mockData.dailyRevenue.map(d => new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })),
      datasets: [
        {
          label: 'Daily Revenue',
          data: mockData.dailyRevenue.map(d => d.revenue),
          borderColor: '#156450',
          backgroundColor: 'rgba(21, 100, 80, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#156450',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        },
        {
          label: 'Target',
          data: mockData.dailyRevenue.map(d => d.target),
          borderColor: '#ef4444',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          pointRadius: 0
        }
      ]
    };

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Daily Revenue Tracking</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
              Line
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Bar
            </button>
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              Area
            </button>
          </div>
        </div>
        <div className="h-80">
          <Line data={data} options={chartOptions} />
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-xl font-bold" style={{ color: '#156450' }}>₹28.95L</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Average Daily</p>
            <p className="text-xl font-bold" style={{ color: '#156450' }}>₹4.14L</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Highest Day</p>
            <p className="text-xl font-bold" style={{ color: '#156450' }}>₹4.60L</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Target Achievement</p>
            <p className="text-xl font-bold text-green-600">103.5%</p>
          </div>
        </div>
      </div>
    );
  };

  // Service Performance Component
  const ServicePerformance = () => {
    const serviceData = {
      labels: mockData.topServices.map(s => s.name),
      datasets: [{
        data: mockData.topServices.map(s => s.revenue),
        backgroundColor: [
          '#156450', '#1e7e63', '#22c55e', '#16a34a', '#15803d', '#166534'
        ],
        borderWidth: 0,
        hoverOffset: 8
      }]
    };

    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Revenue Services</h3>
          <div className="h-80 flex items-center justify-center">
            <Doughnut data={serviceData} options={{ ...chartOptions, cutout: '50%' }} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Service Performance Details</h3>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1">
              <Eye className="h-4 w-4" />
              View All
            </button>
          </div>
          <div className="space-y-4">
            {mockData.topServices.slice(0, 6).map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: serviceData.datasets[0].backgroundColor[index] }}></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.transactions.toLocaleString()} transactions</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{(service.revenue / 100000).toFixed(1)}L</p>
                  <div className={`flex items-center gap-1 text-sm ${service.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {service.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(service.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Doctor Performance Component
  const DoctorPerformance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {mockData.doctors.map(doctor => (
          <div key={doctor.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl">👨‍⚕️</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.department}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">Rank #{doctor.ranking}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-lg font-bold" style={{ color: '#156450' }}>₹{(doctor.revenue / 100000).toFixed(1)}L</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Patients</p>
                <p className="text-lg font-bold" style={{ color: '#156450' }}>{doctor.patients.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Transaction:</span>
                <span className="font-medium">₹{doctor.avgTransaction.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Growth:</span>
                <span className={`font-medium ${doctor.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {doctor.growth > 0 ? '+' : ''}{doctor.growth}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating:</span>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-4 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium">
              View Details
            </button>
          </div>
        ))}
      </div>
      
      {/* Commission Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Commission Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Doctor</th>
                <th className="text-left py-3 px-4">Revenue</th>
                <th className="text-left py-3 px-4">Commission Rate</th>
                <th className="text-left py-3 px-4">Commission Amount</th>
                <th className="text-left py-3 px-4">Incentives</th>
                <th className="text-left py-3 px-4">Total Payout</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.doctors.map(doctor => (
                <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm">👨‍⚕️</span>
                      </div>
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-gray-500 text-xs">{doctor.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold">₹{(doctor.revenue / 100000).toFixed(1)}L</td>
                  <td className="py-3 px-4">10%</td>
                  <td className="py-3 px-4 font-semibold" style={{ color: '#156450' }}>₹{(doctor.commission / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4">₹{(doctor.commission * 0.1 / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4 font-semibold">₹{(doctor.commission * 1.1 / 1000).toFixed(0)}K</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Paid</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Payment Analysis Component
  const PaymentAnalysis = () => {
    const paymentData = {
      labels: Object.keys(mockData.paymentMethods).map(method => 
        method.charAt(0).toUpperCase() + method.slice(1).replace(/([A-Z])/g, ' $1')
      ),
      datasets: [{
        data: Object.values(mockData.paymentMethods).map(method => method.revenue),
        backgroundColor: ['#156450', '#1e7e63', '#22c55e', '#16a34a', '#15803d'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    };

    const successRateData = {
      labels: Object.keys(mockData.paymentMethods).map(method => 
        method.charAt(0).toUpperCase() + method.slice(1).replace(/([A-Z])/g, ' $1')
      ),
      datasets: [{
        label: 'Success Rate (%)',
        data: Object.values(mockData.paymentMethods).map(method => method.successRate),
        backgroundColor: '#156450',
        borderColor: '#156450',
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false
      }]
    };

    return (
      <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Distribution</h3>
              <div className="h-80 flex items-center justify-center">
                <Pie data={paymentData} options={chartOptions} />
              </div>
            </div>
          
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Success Rates</h3>
              <div className="h-80">
                <Bar data={successRateData} options={{
                  ...chartOptions,
                  scales: {
                    ...chartOptions.scales,
                    y: { ...chartOptions.scales.y, min: 80, max: 100 }
                  }
                }} />
              </div>
            </div>
        </div>
        
        {/* Payment Method Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          {Object.entries(mockData.paymentMethods).map(([method, data]) => (
            <div key={method} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold capitalize">
                  {method.replace(/([A-Z])/g, ' $1')}
                </h3>
                <div className="p-2 rounded-lg bg-green-50">
                  {method === 'cash' && <DollarSign className="h-5 w-5 text-green-600" />}
                  {method === 'card' && <CreditCard className="h-5 w-5 text-green-600" />}
                  {method === 'upi' && <Smartphone className="h-5 w-5 text-green-600" />}
                  {method === 'netBanking' && <Globe className="h-5 w-5 text-green-600" />}
                  {method === 'wallet' && <Smartphone className="h-5 w-5 text-green-600" />}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Revenue:</span>
                  <span className="font-semibold">₹{(data.revenue / 100000).toFixed(1)}L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Transactions:</span>
                  <span className="font-medium">{data.transactions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Amount:</span>
                  <span className="font-medium">₹{data.avgAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Success Rate:</span>
                  <span className={`font-medium ${data.successRate > 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {data.successRate}%
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${data.successRate}%`,
                      backgroundColor: data.successRate > 95 ? '#156450' : '#f59e0b'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Failed Payments Analysis */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Failed Payment Analysis</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-2 text-sm">
                <RefreshCcw className="h-4 w-4" />
                Retry Failed
              </button>
              <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                Send Reminders
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-red-700 mb-2">Failed Transactions</h4>
              <p className="text-2xl font-bold text-red-900">156</p>
              <p className="text-sm text-red-600">₹2.34L Lost Revenue</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-700 mb-2">Technical Issues</h4>
              <p className="text-2xl font-bold text-yellow-900">45%</p>
              <p className="text-sm text-yellow-600">70 transactions</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-orange-700 mb-2">Insufficient Funds</h4>
              <p className="text-2xl font-bold text-orange-900">32%</p>
              <p className="text-sm text-orange-600">50 transactions</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-700 mb-2">Recovery Rate</h4>
              <p className="text-2xl font-bold text-green-900">68%</p>
              <p className="text-sm text-green-600">106 recovered</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Navigation Tabs
  interface TabButtonProps {
    id: string;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: (id: string) => void;
  }
  
  const TabButton = ({ id, label, icon, isActive, onClick }: TabButtonProps) => {
    return (
      <button
        onClick={() => onClick(id)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
          isActive 
            ? 'text-white shadow-md' 
            : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
        }`}
        style={isActive ? { backgroundColor: '#156450' } : {}}
      >
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  };

  return (
    <FinanceLayout pageTitle="Revenue Analysis & Insights" pageSubtitle="Business Intelligence Dashboard">
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <select 
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:border-green-500"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
            <option>Custom Range</option>
          </select>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              autoRefresh 
                ? 'text-white' 
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
            style={autoRefresh ? { backgroundColor: '#156450' } : {}}
          >
            <RefreshCcw className="h-4 w-4" />
            {autoRefresh ? 'Live' : 'Auto-refresh'}
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={`₹${(mockData.kpis.totalRevenue.value / 10000000).toFixed(2)}Cr`}
            trend={mockData.kpis.totalRevenue.trend}
            subtitle="Current Period"
            icon={<DollarSign className="h-6 w-6" style={{ color: '#156450' }} />}
          />
          <KPICard
            title="Average Daily Revenue"
            value={`₹${(mockData.kpis.avgDailyRevenue.value / 100000).toFixed(1)}L`}
            trend={mockData.kpis.avgDailyRevenue.trend}
            subtitle="Per day average"
            icon={<BarChart3 className="h-6 w-6" style={{ color: '#156450' }} />}
          />
          <KPICard
            title="Revenue Target"
            value={`${mockData.kpis.revenueTarget.achieved}% Achieved`}
            progress={mockData.kpis.revenueTarget.achieved}
            subtitle={`₹${(mockData.kpis.revenueTarget.target / 10000000).toFixed(1)}Cr Target`}
            icon={<Target className="h-6 w-6" style={{ color: '#156450' }} />}
          />
          <KPICard
            title="Growth Rate"
            value={`+${mockData.kpis.growthRate.mom}% MoM`}
            subtitle={`+${mockData.kpis.growthRate.yoy}% YoY`}
            trend={mockData.kpis.growthRate.mom}
            icon={<TrendingUp className="h-6 w-6" style={{ color: '#156450' }} />}
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton
            id="trends"
            label="Revenue Trends"
            icon={<TrendingUp className="h-4 w-4" />}
            isActive={activeSection === 'trends'}
            onClick={setActiveSection}
          />
          <TabButton
            id="services"
            label="Service Performance"
            icon={<BarChart3 className="h-4 w-4" />}
            isActive={activeSection === 'services'}
            onClick={setActiveSection}
          />
          <TabButton
            id="doctors"
            label="Doctor Performance"
            icon={<Users className="h-4 w-4" />}
            isActive={activeSection === 'doctors'}
            onClick={setActiveSection}
          />
          <TabButton
            id="payments"
            label="Payment Analysis"
            icon={<CreditCard className="h-4 w-4" />}
            isActive={activeSection === 'payments'}
            onClick={setActiveSection}
          />
        </div>

        {/* Content Sections */}
        {activeSection === 'trends' && (
          <div className="space-y-8">
            <DailyRevenueChart />
            
            {/* Monthly Comparison */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Revenue Comparison</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                  <div key={month} className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                    <p className="text-sm text-gray-600">{month} 2025</p>
                    <p className="text-xl font-bold" style={{ color: '#156450' }}>₹{(20 + index * 2)}L</p>
                    <p className="text-xs text-green-600">+{5 + index}%</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Year-over-Year Growth */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Year-over-Year Growth Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">2023 Total</p>
                  <p className="text-2xl font-bold" style={{ color: '#156450' }}>₹8.2Cr</p>
                  <p className="text-sm text-green-600">Base Year</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">2024 Total</p>
                  <p className="text-2xl font-bold" style={{ color: '#156450' }}>₹10.5Cr</p>
                  <p className="text-sm text-green-600">+28% Growth</p>
                </div>
                <div className="text-center p-6 bg-green-100 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-gray-600">2025 Projected</p>
                  <p className="text-2xl font-bold" style={{ color: '#156450' }}>₹13.8Cr</p>
                  <p className="text-sm text-green-600">+31% Growth</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'services' && <ServicePerformance />}
        {activeSection === 'doctors' && <DoctorPerformance />}
        {activeSection === 'payments' && <PaymentAnalysis />}
      </div>
    </FinanceLayout>
  );
};

export default RevenueAnalysis;