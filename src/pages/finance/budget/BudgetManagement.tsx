import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  Calendar, ChevronRight, Plus, Copy, Download, Settings, BarChart3, PieChart as PieChartIcon, Activity,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Search, Filter, Edit, Eye, Users,
  DollarSign, Target, Clock, Building, FileText, Bell, ChevronDown, ArrowRight, Save, Send,
  Zap, Shield, Briefcase, Calculator, CreditCard, Banknote, Phone, Mail, MessageSquare,
  Home, Building2, Package, Clipboard, Construction, RefreshCw, Lock, Unlock, Star,
  Award, Gauge, MoreHorizontal, ChevronLeft, Upload, Share2, PrinterIcon, Info
} from 'lucide-react';

const BudgetManagement = () => {
  const [activeTab, setActiveTab] = useState('planning');
  const [budgetPeriod, setBudgetPeriod] = useState('FY 2025-26');
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [viewMode, setViewMode] = useState('cards');
  const [alertCount, setAlertCount] = useState(8);

  // Mock data
  const budgetOverview = {
    totalBudget: 25000000,
    utilized: 17250000,
    remaining: 7750000,
    utilizationPercent: 69,
    departments: 12,
    approvalsPending: 5,
    lastUpdated: new Date().toLocaleDateString()
  };

  const budgetAllocation = [
    { name: 'Operational Budget', amount: 18000000, percent: 72, color: '#156450' },
    { name: 'Capital Expenditure', amount: 5000000, percent: 20, color: '#22c55e' },
    { name: 'Emergency Reserve', amount: 1500000, percent: 6, color: '#f59e0b' },
    { name: 'Strategic Initiatives', amount: 500000, percent: 2, color: '#3b82f6' }
  ];

  const monthlyTrend = [
    { month: 'Apr', budget: 2000000, actual: 1850000, forecast: 1950000 },
    { month: 'May', budget: 2100000, actual: 2250000, forecast: 2200000 },
    { month: 'Jun', budget: 2200000, actual: 2180000, forecast: 2190000 },
    { month: 'Jul', budget: 2300000, actual: 2400000, forecast: 2350000 },
    { month: 'Aug', budget: 2150000, actual: 2100000, forecast: 2125000 },
    { month: 'Sep', budget: 2250000, actual: 2300000, forecast: 2275000 },
    { month: 'Oct', budget: 2400000, actual: 0, forecast: 2450000 },
    { month: 'Nov', budget: 2350000, actual: 0, forecast: 2380000 },
    { month: 'Dec', budget: 2200000, actual: 0, forecast: 2150000 },
    { month: 'Jan', budget: 2100000, actual: 0, forecast: 2050000 },
    { month: 'Feb', budget: 2000000, actual: 0, forecast: 1980000 },
    { month: 'Mar', budget: 2300000, actual: 0, forecast: 2280000 }
  ];

  const departmentBudgets = [
    {
      id: 1,
      name: 'Cardiology',
      head: 'Dr. Rajesh Kumar',
      totalBudget: 4500000,
      utilized: 3100000,
      remaining: 1400000,
      utilizationPercent: 69,
      status: 'On Track',
      variance: -150000,
      lastUpdated: '2025-06-20',
      alerts: 2,
      performance: 92
    },
    {
      id: 2,
      name: 'Emergency Medicine',
      head: 'Dr. Priya Sharma',
      totalBudget: 3800000,
      utilized: 2950000,
      remaining: 850000,
      utilizationPercent: 78,
      status: 'Warning',
      variance: 180000,
      lastUpdated: '2025-06-21',
      alerts: 4,
      performance: 87
    },
    {
      id: 3,
      name: 'Radiology',
      head: 'Dr. Amit Patel',
      totalBudget: 3200000,
      utilized: 2100000,
      remaining: 1100000,
      utilizationPercent: 66,
      status: 'On Track',
      variance: -85000,
      lastUpdated: '2025-06-19',
      alerts: 1,
      performance: 94
    },
    {
      id: 4,
      name: 'Laboratory',
      head: 'Dr. Sunita Reddy',
      totalBudget: 2800000,
      utilized: 2200000,
      remaining: 600000,
      utilizationPercent: 79,
      status: 'Critical',
      variance: 250000,
      lastUpdated: '2025-06-22',
      alerts: 6,
      performance: 82
    },
    {
      id: 5,
      name: 'Administration',
      head: 'Mr. Ravi Singh',
      totalBudget: 4200000,
      utilized: 2850000,
      remaining: 1350000,
      utilizationPercent: 68,
      status: 'On Track',
      variance: -120000,
      lastUpdated: '2025-06-20',
      alerts: 1,
      performance: 89
    },
    {
      id: 6,
      name: 'IT Services',
      head: 'Ms. Kavya Nair',
      totalBudget: 1800000,
      utilized: 1100000,
      remaining: 700000,
      utilizationPercent: 61,
      status: 'Under Budget',
      variance: -180000,
      lastUpdated: '2025-06-18',
      alerts: 0,
      performance: 96
    }
  ];

  const revenueStreams = [
    { name: 'Patient Services', budget: 15000000, ytd: 9800000, forecast: 14500000 },
    { name: 'Insurance Claims', budget: 8000000, ytd: 5600000, forecast: 8200000 },
    { name: 'Government Grants', budget: 1500000, ytd: 750000, forecast: 1400000 },
    { name: 'Other Income', budget: 500000, ytd: 350000, forecast: 480000 }
  ];

  const alerts = [
    { id: 1, type: 'critical', department: 'Laboratory', message: 'Budget exceeded by ₹2.5L', date: '2025-06-22', priority: 'High' },
    { id: 2, type: 'warning', department: 'Emergency Medicine', message: 'Approaching 80% utilization', date: '2025-06-21', priority: 'Medium' },
    { id: 3, type: 'info', department: 'IT Services', message: 'Under budget by ₹1.8L', date: '2025-06-20', priority: 'Low' },
    { id: 4, type: 'critical', department: 'Cardiology', message: 'Equipment purchase overrun', date: '2025-06-19', priority: 'High' }
  ];

  const varianceAnalysis = [
    { category: 'Personnel Costs', budget: 12000000, actual: 11800000, variance: -200000, percent: -1.7, type: 'Favorable' },
    { category: 'Medical Supplies', budget: 4500000, actual: 4850000, variance: 350000, percent: 7.8, type: 'Unfavorable' },
    { category: 'Equipment', budget: 3200000, actual: 2950000, variance: -250000, percent: -7.8, type: 'Favorable' },
    { category: 'Utilities', budget: 1800000, actual: 1920000, variance: 120000, percent: 6.7, type: 'Unfavorable' },
    { category: 'Professional Services', budget: 2200000, actual: 2180000, variance: -20000, percent: -0.9, type: 'Favorable' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Under Budget': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  // Planning Tab Components
  const BudgetOverviewDashboard = () => (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Annual Budget</p>
              <p className="text-3xl font-bold text-[#156450]">{formatCurrency(budgetOverview.totalBudget)}</p>
              <p className="text-sm text-gray-500">FY 2025-26</p>
            </div>
            <DollarSign className="h-8 w-8 text-[#156450]" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Utilized</p>
              <p className="text-3xl font-bold text-orange-600">{budgetOverview.utilizationPercent}%</p>
              <p className="text-sm text-gray-500">{formatCurrency(budgetOverview.utilized)}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining Budget</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(budgetOverview.remaining)}</p>
              <p className="text-sm text-gray-500">Available funds</p>
            </div>
            <Target className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-3xl font-bold text-purple-600">{budgetOverview.departments}</p>
              <p className="text-sm text-gray-500">{budgetOverview.approvalsPending} pending approval</p>
            </div>
            <Building className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Budget Allocation Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Budget Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetAllocation}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
                label={({ name, percent }) => `${name}: ${percent}%`}
              >
                {budgetAllocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Monthly Budget vs Actual</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `₹${value / 1000000}M`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="budget" stroke="#156450" name="Budget" strokeWidth={2} />
              <Line type="monotone" dataKey="actual" stroke="#f59e0b" name="Actual" strokeWidth={2} />
              <Line type="monotone" dataKey="forecast" stroke="#3b82f6" name="Forecast" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Revenue Stream Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Revenue Stream</th>
                <th className="text-left py-3 px-4">Budget</th>
                <th className="text-left py-3 px-4">YTD Actual</th>
                <th className="text-left py-3 px-4">Forecast</th>
                <th className="text-left py-3 px-4">Achievement</th>
                <th className="text-left py-3 px-4">Variance</th>
              </tr>
            </thead>
            <tbody>
              {revenueStreams.map((stream, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{stream.name}</td>
                  <td className="py-3 px-4">{formatCurrency(stream.budget)}</td>
                  <td className="py-3 px-4">{formatCurrency(stream.ytd)}</td>
                  <td className="py-3 px-4">{formatCurrency(stream.forecast)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-[#156450]"
                          style={{ width: `${(stream.ytd / stream.budget * 100)}%` }}
                        />
                      </div>
                      <span className="text-sm">{Math.round(stream.ytd / stream.budget * 100)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      stream.forecast >= stream.budget ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {formatCurrency(stream.forecast - stream.budget)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const BudgetCreationWizard = () => {
    const [wizardStep, setWizardStep] = useState(1);
    const [budgetData, setBudgetData] = useState({
      framework: {},
      revenue: {},
      expenses: {},
      consolidation: {}
    });

    const WizardStep1 = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Step 1: Budget Framework Setup</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fiscal Year</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>FY 2025-26</option>
                <option>FY 2026-27</option>
                <option>FY 2027-28</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Cycle</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>Annual</option>
                <option>Bi-annual</option>
                <option>Quarterly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>INR - Indian Rupee</option>
                <option>USD - US Dollar</option>
                <option>EUR - Euro</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department Selection</label>
              <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                {departmentBudgets.map(dept => (
                  <label key={dept.id} className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2 text-[#156450] focus:ring-[#156450]" />
                    <span className="text-sm">{dept.name}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Categories</label>
              <div className="space-y-2">
                {['Operational Expenses', 'Capital Expenditure', 'Administrative Costs', 'Emergency Reserve'].map(category => (
                  <label key={category} className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2 text-[#156450] focus:ring-[#156450]" />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const WizardStep2 = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Step 2: Revenue Budget Planning</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">Service Revenue</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Services</label>
                <input type="number" placeholder="15000000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Claims</label>
                <input type="number" placeholder="8000000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Services</label>
                <input type="number" placeholder="2000000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Other Revenue Sources</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Government Grants</label>
                <input type="number" placeholder="1500000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Investment Income</label>
                <input type="number" placeholder="500000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Miscellaneous</label>
                <input type="number" placeholder="300000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Revenue Assumptions</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Growth Rate</label>
              <input type="number" placeholder="15" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              <span className="text-xs text-gray-500">% per annum</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Inflation</label>
              <input type="number" placeholder="6" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              <span className="text-xs text-gray-500">% per annum</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Market Share</label>
              <input type="number" placeholder="25" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              <span className="text-xs text-gray-500">% of market</span>
            </div>
          </div>
        </div>
      </div>
    );

    const WizardStep3 = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Step 3: Expense Budget Planning</h3>
        
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">Personnel Costs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Headcount</label>
                <input type="number" placeholder="120" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Salary</label>
                <input type="number" placeholder="60000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Increase</label>
                <input type="number" placeholder="8" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
                <span className="text-xs text-gray-500">% increase</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Benefits Cost</label>
                <input type="number" placeholder="2400000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">Operational Expenses</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Supplies</label>
                <input type="number" placeholder="4500000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Utilities</label>
                <input type="number" placeholder="1800000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance</label>
                <input type="number" placeholder="1200000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Services</label>
                <input type="number" placeholder="2200000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">Capital Expenditure</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medical Equipment</label>
                <input type="number" placeholder="2800000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">IT Infrastructure</label>
                <input type="number" placeholder="1500000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Facility Upgrades</label>
                <input type="number" placeholder="2000000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicles</label>
                <input type="number" placeholder="800000" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const WizardStep4 = () => (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Step 4: Budget Consolidation & Review</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">Budget Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Revenue:</span>
                <span className="font-semibold text-green-600">₹27,300,000</span>
              </div>
              <div className="flex justify-between">
                <span>Total Expenses:</span>
                <span className="font-semibold text-red-600">₹25,000,000</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Net Surplus:</span>
                  <span className="font-semibold text-[#156450]">₹2,300,000</span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Profit Margin:</span>
                <span>8.4%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="font-medium mb-4">Validation Checklist</h4>
            <div className="space-y-2">
              {[
                'Mathematical consistency verified',
                'Department allocations reviewed',
                'Historical trends analyzed',
                'Market assumptions validated',
                'Risk factors considered',
                'Approval workflows defined'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Review Required</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This budget shows a 12% increase over last year. Please ensure all assumptions are well-documented 
                and justified before submitting for approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        {/* Wizard Progress */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Budget Creation Wizard</h3>
            <span className="text-sm text-gray-600">Step {wizardStep} of 4</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  wizardStep >= step ? 'bg-[#156450] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`h-1 w-16 ${wizardStep > step ? 'bg-[#156450]' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 mb-6">
            {wizardStep === 1 && "Set up your budget framework and organizational structure"}
            {wizardStep === 2 && "Define revenue streams and forecasting assumptions"}
            {wizardStep === 3 && "Plan operational and capital expenditures"}
            {wizardStep === 4 && "Review and consolidate your budget"}
          </div>
        </div>

        {/* Wizard Content */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          {wizardStep === 1 && <WizardStep1 />}
          {wizardStep === 2 && <WizardStep2 />}
          {wizardStep === 3 && <WizardStep3 />}
          {wizardStep === 4 && <WizardStep4 />}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setWizardStep(Math.max(1, wizardStep - 1))}
              disabled={wizardStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {wizardStep < 4 ? (
              <button
                onClick={() => setWizardStep(Math.min(4, wizardStep + 1))}
                className="px-6 py-2 bg-[#156450] text-white rounded-md hover:bg-[#156450]/90"
              >
                Next
              </button>
            ) : (
              <div className="space-x-3">
                <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Save Draft
                </button>
                <button className="px-6 py-2 bg-[#156450] text-white rounded-md hover:bg-[#156450]/90">
                  Submit for Approval
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DepartmentBudgets = () => (
    <div className="space-y-6">
      {/* Department Overview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Department Budget Management</h3>
          <div className="flex gap-3">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
            >
              <option value="all">All Departments</option>
              {departmentBudgets.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-2 text-sm ${viewMode === 'cards' ? 'bg-[#156450] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-[#156450] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Table
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {departmentBudgets.map(dept => (
              <div key={dept.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{dept.name}</h4>
                    <p className="text-sm text-gray-600">{dept.head}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(dept.status)}`}>
                      {dept.status}
                    </span>
                    {dept.alerts > 0 && (
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                        {dept.alerts} alerts
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Budget:</span>
                    <span className="font-semibold">{formatCurrency(dept.totalBudget)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Utilized:</span>
                    <span className="font-semibold">{formatCurrency(dept.utilized)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-semibold">{formatCurrency(dept.remaining)}</span>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Utilization</span>
                      <span>{dept.utilizationPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          dept.utilizationPercent > 80 ? 'bg-red-500' : 
                          dept.utilizationPercent > 70 ? 'bg-yellow-500' : 'bg-[#156450]'
                        }`}
                        style={{ width: `${dept.utilizationPercent}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Variance:</span>
                    <span className={`font-semibold ${dept.variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(Math.abs(dept.variance))} {dept.variance >= 0 ? 'over' : 'under'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Performance:</span>
                    <span className="font-semibold text-[#156450]">{dept.performance}/100</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 px-3 py-2 bg-[#156450]/10 text-[#156450] rounded-md hover:bg-[#156450]/20 text-sm">
                    View Details
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Head</th>
                  <th className="text-left py-3 px-4">Total Budget</th>
                  <th className="text-left py-3 px-4">Utilized</th>
                  <th className="text-left py-3 px-4">Utilization %</th>
                  <th className="text-left py-3 px-4">Variance</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Performance</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departmentBudgets.map(dept => (
                  <tr key={dept.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{dept.name}</div>
                        {dept.alerts > 0 && (
                          <span className="text-xs text-red-600">{dept.alerts} alerts</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">{dept.head}</td>
                    <td className="py-3 px-4 font-semibold">{formatCurrency(dept.totalBudget)}</td>
                    <td className="py-3 px-4">{formatCurrency(dept.utilized)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{dept.utilizationPercent}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full ${
                              dept.utilizationPercent > 80 ? 'bg-red-500' : 
                              dept.utilizationPercent > 70 ? 'bg-yellow-500' : 'bg-[#156450]'
                            }`}
                            style={{ width: `${dept.utilizationPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`${dept.variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCurrency(Math.abs(dept.variance))}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(dept.status)}`}>
                        {dept.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span>{dept.performance}/100</span>
                        <div className="w-8 bg-gray-200 rounded-full h-1">
                          <div 
                            className="h-1 rounded-full bg-[#156450]"
                            style={{ width: `${dept.performance}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
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
        )}
      </div>
    </div>
  );

  // Monitoring Tab Components
  const BudgetMonitoringDashboard = () => (
    <div className="space-y-6">
      {/* Real-time Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border-l-4 border-red-500 shadow-sm">
          <div className="flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <p className="font-semibold text-red-800">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-yellow-600 mr-3" />
            <div>
              <p className="font-semibold text-yellow-800">Warning Alerts</p>
              <p className="text-2xl font-bold text-yellow-600">5</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center">
            <Info className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <p className="font-semibold text-blue-800">Info Alerts</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget vs Actual Comparison */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Budget vs Actual Performance</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyTrend.slice(0, 6)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${value / 1000000}M`} />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="budget" fill="#156450" name="Budget" />
            <Bar dataKey="actual" fill="#f59e0b" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Variance Analysis */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Variance Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Budget</th>
                <th className="text-left py-3 px-4">Actual</th>
                <th className="text-left py-3 px-4">Variance</th>
                <th className="text-left py-3 px-4">Variance %</th>
                <th className="text-left py-3 px-4">Type</th>
              </tr>
            </thead>
            <tbody>
              {varianceAnalysis.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{item.category}</td>
                  <td className="py-3 px-4">{formatCurrency(item.budget)}</td>
                  <td className="py-3 px-4">{formatCurrency(item.actual)}</td>
                  <td className="py-3 px-4">
                    <span className={`${item.variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {formatCurrency(Math.abs(item.variance))}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`${item.variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {Math.abs(item.percent)}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.type === 'Favorable' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Active Alerts</h3>
          <button className="px-4 py-2 bg-[#156450] text-white rounded-md hover:bg-[#156450]/90">
            View All Alerts
          </button>
        </div>
        <div className="space-y-3">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{alert.department}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.priority === 'High' ? 'bg-red-100 text-red-800' :
                      alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.date}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Reporting Tab Components
  const BudgetReporting = () => (
    <div className="space-y-6">
      {/* Report Generation Panel */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Budget Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Utilization Report', description: 'Detailed budget utilization analysis', icon: BarChart3 },
            { name: 'Variance Report', description: 'Budget vs actual variance analysis', icon: TrendingUp },
            { name: 'Performance Report', description: 'Department performance metrics', icon: Award },
            { name: 'Forecast Report', description: 'Updated forecasts and projections', icon: Activity },
            { name: 'Executive Summary', description: 'High-level budget overview', icon: FileText },
            { name: 'Compliance Report', description: 'Budget compliance and controls', icon: Shield }
          ].map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <report.icon className="h-6 w-6 text-[#156450]" />
                <h4 className="font-medium">{report.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-[#156450]/10 text-[#156450] rounded-md hover:bg-[#156450]/20 text-sm">
                  <Download className="h-4 w-4 inline mr-1" />
                  Download
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Scorecard */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Budget Performance Scorecard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="40" cy="40" r="36" stroke="#156450" strokeWidth="8" fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.87)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-[#156450]">87</span>
              </div>
            </div>
            <h4 className="font-medium">Overall Score</h4>
            <p className="text-sm text-gray-600">Excellent</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="40" cy="40" r="36" stroke="#22c55e" strokeWidth="8" fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.92)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-green-600">92</span>
              </div>
            </div>
            <h4 className="font-medium">Budget Control</h4>
            <p className="text-sm text-gray-600">Excellent</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="40" cy="40" r="36" stroke="#f59e0b" strokeWidth="8" fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.78)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-yellow-600">78</span>
              </div>
            </div>
            <h4 className="font-medium">Forecast Accuracy</h4>
            <p className="text-sm text-gray-600">Good</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-3 relative">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="40" cy="40" r="36" stroke="#3b82f6" strokeWidth="8" fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - 0.85)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">85</span>
              </div>
            </div>
            <h4 className="font-medium">Efficiency</h4>
            <p className="text-sm text-gray-600">Very Good</p>
          </div>
        </div>
      </div>

      {/* Forecast Updates */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Forecast Updates & Projections</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Year-end Projections</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Projected Revenue:</span>
                <span className="font-semibold text-green-600">₹26,800,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projected Expenses:</span>
                <span className="font-semibold text-red-600">₹24,200,000</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Projected Surplus:</span>
                  <span className="font-semibold text-[#156450]">₹2,600,000</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Confidence Level:</span>
                <span className="font-medium">85%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Scenario Analysis</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { scenario: 'Optimistic', value: 3200000 },
                { scenario: 'Base Case', value: 2600000 },
                { scenario: 'Conservative', value: 1800000 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scenario" />
                <YAxis tickFormatter={(value) => `₹${value / 1000000}M`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#156450" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  // Settings Tab Component
  const BudgetSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Budget Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium">General Settings</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>INR - Indian Rupee</option>
                <option>USD - US Dollar</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Period</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>Annual (April - March)</option>
                <option>Calendar Year (Jan - Dec)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alert Thresholds</label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="75" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" />
                  <span className="text-sm">% Warning threshold</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" defaultValue="90" className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" />
                  <span className="text-sm">% Critical threshold</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">User Permissions</h4>
            <div className="space-y-3">
              {[
                { role: 'Budget Administrator', users: 2, permissions: 'Full Access' },
                { role: 'Department Head', users: 6, permissions: 'Department Budget' },
                { role: 'Finance Manager', users: 3, permissions: 'View & Monitor' },
                { role: 'Budget Analyst', users: 4, permissions: 'Analysis & Reports' }
              ].map((role, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <span className="font-medium">{role.role}</span>
                    <span className="text-sm text-gray-600 ml-2">({role.users} users)</span>
                  </div>
                  <span className="text-sm text-gray-600">{role.permissions}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main component tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case 'planning':
        return (
          <div className="space-y-6">
            <div className="flex gap-4 border-b border-gray-200">
              {[
                { id: 'overview', name: 'Overview Dashboard', icon: BarChart3 },
                { id: 'creation', name: 'Budget Creation', icon: Plus },
                { id: 'departments', name: 'Department Budgets', icon: Building }
              ].map(subTab => (
                <button
                  key={subTab.id}
                  onClick={() => setActiveSubTab(subTab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeSubTab === subTab.id
                      ? 'border-[#156450] text-[#156450]'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <subTab.icon className="h-4 w-4" />
                  {subTab.name}
                </button>
              ))}
            </div>
            
            {activeSubTab === 'overview' && <BudgetOverviewDashboard />}
            {activeSubTab === 'creation' && <BudgetCreationWizard />}
            {activeSubTab === 'departments' && <DepartmentBudgets />}
          </div>
        );
        
      case 'monitoring':
        return <BudgetMonitoringDashboard />;
        
      case 'reporting':
        return <BudgetReporting />;
        
      case 'settings':
        return <BudgetSettings />;
        
      default:
        return <BudgetOverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <span>Financial Management</span>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-gray-900 font-medium">Budget Management</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Budget Management System</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={budgetPeriod}
              onChange={(e) => setBudgetPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
            >
              <option>FY 2025-26</option>
              <option>FY 2024-25</option>
              <option>FY 2023-24</option>
            </select>
            
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Plus className="h-4 w-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Copy className="h-4 w-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Download className="h-4 w-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Settings className="h-4 w-4" />
            </button>
            
            {alertCount > 0 && (
              <button className="relative p-2 text-red-600 hover:bg-red-50 rounded-md">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {alertCount}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-8 w-8 text-[#156450]" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-xl font-bold text-[#156450]">{formatCurrency(budgetOverview.totalBudget)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Utilized</p>
              <p className="text-xl font-bold text-orange-600">{budgetOverview.utilizationPercent}%</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Target className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining</p>
              <p className="text-xl font-bold text-blue-600">{formatCurrency(budgetOverview.remaining)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="bg-white border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'planning', name: '📋 Budget Planning', description: 'Create and manage budgets' },
            { id: 'monitoring', name: '📊 Budget Monitoring', description: 'Track performance and alerts' },
            { id: 'reporting', name: '📈 Budget Reporting', description: 'Generate reports and analysis' },
            { id: 'settings', name: '⚙️ Budget Settings', description: 'Configure system settings' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setActiveSubTab('overview');
              }}
              className={`flex flex-col items-start py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-[#156450] text-[#156450]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.name}</span>
              <span className="text-xs text-gray-500 mt-1">{tab.description}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default BudgetManagement;