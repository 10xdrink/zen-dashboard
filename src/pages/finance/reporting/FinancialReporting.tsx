import React, { useState, useEffect } from "react";
import FinanceLayout from "@/components/layout/FinanceLayout";
import { 
  BarChart3, FileText, Settings, Star, Clock3, Download, Mail, Printer,
  Calendar, Filter, Search, TrendingUp, TrendingDown, Target, Users,
  DollarSign, Eye, ChevronDown, ChevronUp, AlertCircle, CheckCircle,
  RefreshCw, Plus, Edit, Trash2, MoreHorizontal, Activity, PieChart,
  LineChart, BarChart, Gauge, Zap, Bell, Upload, Save, Send, Share2,
  BookOpen, HelpCircle, ArrowUpRight, ArrowDownRight, Home, Building2,
  CreditCard, Smartphone, Globe, Banknote, Phone, MessageSquare
} from "lucide-react";
import { Line, Bar, Doughnut, Pie, Radar, PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, RadialLinearScale } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, RadialLinearScale);

const TABS = [
  { id: "standard", label: "Standard Reports", icon: <FileText className="h-4 w-4" /> },
  { id: "custom", label: "Custom Reports", icon: <Settings className="h-4 w-4" /> },
  { id: "dashboards", label: "Financial Dashboards", icon: <BarChart3 className="h-4 w-4" /> },
];

const QuickStats = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    {[
      { label: "Total Revenue", value: "₹1,25,450", trend: "+12.5%", icon: <DollarSign className="h-5 w-5" /> },
      { label: "Transactions", value: "824", trend: "+8.3%", icon: <Activity className="h-5 w-5" /> },
      { label: "Outstanding", value: "₹32,800", trend: "-5.2%", icon: <AlertCircle className="h-5 w-5" /> },
      { label: "Collection Rate", value: "92%", trend: "+2.1%", icon: <Target className="h-5 w-5" /> },
    ].map((stat, index) => (
      <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2 rounded-lg bg-[#156450]/10">
            {React.cloneElement(stat.icon, { className: "h-5 w-5 text-[#156450]" })}
          </div>
          <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-[#156450]' : 'text-red-600'}`}>
            {stat.trend}
          </span>
        </div>
        <p className="text-sm text-gray-500">{stat.label}</p>
        <p className="text-xl font-semibold text-[#156450]">{stat.value}</p>
      </div>
    ))}
  </div>
);

const GlobalActionsBar = () => (
  <div className="flex flex-wrap gap-3 mb-6">
    {[
      { icon: <Star className="h-4 w-4" />, label: "Favorites", count: "12" },
      { icon: <FileText className="h-4 w-4" />, label: "Recent Reports", count: "8" },
      { icon: <Clock3 className="h-4 w-4" />, label: "Scheduled Reports", count: "5" },
      { icon: <HelpCircle className="h-4 w-4" />, label: "Help & Tutorials" },
    ].map((action, index) => (
      <button key={index} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-[#156450]/10 hover:border-[#156450]/30 transition-colors">
        {action.icon}
        {action.label}
        {action.count && <span className="ml-1 px-2 py-0.5 bg-[#156450] text-white text-xs rounded-full">{action.count}</span>}
      </button>
    ))}
  </div>
);

const StandardReports = () => {
  const [selectedReport, setSelectedReport] = useState("daily-sales");
  const [reportConfig, setReportConfig] = useState({
    dateRange: "today",
    customDate: "",
    includeOptions: {
      serviceBreakdown: true,
      doctorBreakdown: true,
      paymentDetails: true,
      hourlyDistribution: false,
      demographics: false,
      discounts: true,
      cancellations: false,
      refunds: true
    }
  });

  const reports = [
    { id: "daily-sales", name: "Daily Sales Report", icon: <BarChart3 className="h-5 w-5" />, status: "ready" },
    { id: "monthly-revenue", name: "Monthly Revenue Summary", icon: <TrendingUp className="h-5 w-5" />, status: "ready" },
    { id: "outstanding-dues", name: "Outstanding Dues Report", icon: <AlertCircle className="h-5 w-5" />, status: "generating" },
    { id: "payment-analysis", name: "Payment Method Analysis", icon: <CreditCard className="h-5 w-5" />, status: "ready" },
    { id: "refund-adjustment", name: "Refund & Adjustment Report", icon: <RefreshCw className="h-5 w-5" />, status: "ready" },
  ];

  const DailySalesReport = () => {
    const mockData = {
      summary: {
        totalSales: 125450,
        transactionCount: 248,
        averageTransaction: 506,
        peakHour: "11:00 AM",
        topService: "General Consultation",
        topDoctor: "Dr. Rajesh Kumar"
      },
      hourlyData: [
        { time: "9:00-10:00", transactions: 25, revenue: 15250, avgValue: 610, topService: "Consultation" },
        { time: "10:00-11:00", transactions: 32, revenue: 19800, avgValue: 619, topService: "Consultation" },
        { time: "11:00-12:00", transactions: 45, revenue: 28900, avgValue: 642, topService: "Dental" },
        { time: "12:00-13:00", transactions: 28, revenue: 16800, avgValue: 600, topService: "Lab Tests" },
        { time: "14:00-15:00", transactions: 35, revenue: 22400, avgValue: 640, topService: "Consultation" },
        { time: "15:00-16:00", transactions: 41, revenue: 25200, avgValue: 615, topService: "Physiotherapy" },
        { time: "16:00-17:00", transactions: 42, revenue: 27100, avgValue: 645, topService: "Dental" }
      ],
      paymentMethods: [
        { method: "Cash", amount: 45180, percentage: 36 },
        { method: "Card", amount: 37635, percentage: 30 },
        { method: "UPI", amount: 28269, percentage: 22.5 },
        { method: "Net Banking", amount: 14154, percentage: 11.5 }
      ]
    };

    const hourlyChartData = {
      labels: mockData.hourlyData.map(d => d.time),
      datasets: [{
        label: 'Revenue',
        data: mockData.hourlyData.map(d => d.revenue),
        backgroundColor: '#156450',
        borderColor: '#156450',
        borderRadius: 8,
        borderSkipped: false
      }]
    };

    const paymentChartData = {
      labels: mockData.paymentMethods.map(p => p.method),
      datasets: [{
        data: mockData.paymentMethods.map(p => p.amount),
        backgroundColor: ['#156450', '#1e7e63', '#22c55e', '#16a34a'],
        borderWidth: 0
      }]
    };

    return (
      <div className="space-y-6">
        {/* Report Configuration */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Report Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select 
                value={reportConfig.dateRange}
                onChange={(e) => setReportConfig({...reportConfig, dateRange: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            {/* Quick Actions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actions</label>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90 text-sm">
                  Generate
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="h-4 w-4" />
                </button>
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Mail className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Include Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Include Options</label>
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {Object.entries(reportConfig.includeOptions).slice(0, 4).map(([key, value]) => (
                  <label key={key} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => setReportConfig({
                        ...reportConfig,
                        includeOptions: {...reportConfig.includeOptions, [key]: e.target.checked}
                      })}
                      className="mr-2 text-[#156450] focus:ring-[#156450]"
                    />
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600">Total Sales</p>
            <p className="text-xl font-bold text-[#156450]">₹{mockData.summary.totalSales.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600">Transactions</p>
            <p className="text-xl font-bold text-[#156450]">{mockData.summary.transactionCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600">Average</p>
            <p className="text-xl font-bold text-[#156450]">₹{mockData.summary.averageTransaction}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600">Peak Hour</p>
            <p className="text-lg font-bold text-[#156450]">{mockData.summary.peakHour}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600">Top Service</p>
            <p className="text-sm font-bold text-[#156450]">{mockData.summary.topService}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <p className="text-sm text-gray-600">Top Doctor</p>
            <p className="text-sm font-bold text-[#156450]">{mockData.summary.topDoctor}</p>
          </div>
        </div>

        {/* Charts and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hourly Revenue Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Hourly Revenue Distribution</h4>
            <div className="h-64">
              <Bar data={hourlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Payment Methods Chart */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Payment Method Distribution</h4>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={paymentChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Detailed Transaction Table */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Hourly Transaction Details</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Time Slot</th>
                  <th className="text-left py-3 px-4">Transactions</th>
                  <th className="text-left py-3 px-4">Revenue</th>
                  <th className="text-left py-3 px-4">Avg Value</th>
                  <th className="text-left py-3 px-4">Top Service</th>
                  <th className="text-left py-3 px-4">Performance</th>
                </tr>
              </thead>
              <tbody>
                {mockData.hourlyData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{row.time}</td>
                    <td className="py-3 px-4">{row.transactions}</td>
                    <td className="py-3 px-4 font-semibold text-[#156450]">₹{row.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">₹{row.avgValue}</td>
                    <td className="py-3 px-4">{row.topService}</td>
                    <td className="py-3 px-4">
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        row.revenue > 25000 ? 'bg-[#156450]/20 text-[#156450]' :
                        row.revenue > 20000 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {row.revenue > 25000 ? 'High' : row.revenue > 20000 ? 'Medium' : 'Low'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const MonthlyRevenueReport = () => {
    const monthlyData = {
      currentMonth: { revenue: 3250000, growth: 12.5, target: 3500000, achievement: 92.8 },
      weeklyBreakdown: [
        { week: "Week 1", startDate: "01-Jun", endDate: "07-Jun", revenue: 825000, growth: 8.5, target: 875000, achievement: 94.3 },
        { week: "Week 2", startDate: "08-Jun", endDate: "14-Jun", revenue: 890000, growth: 15.2, target: 875000, achievement: 101.7 },
        { week: "Week 3", startDate: "15-Jun", endDate: "21-Jun", revenue: 780000, growth: -2.1, target: 875000, achievement: 89.1 },
        { week: "Week 4", startDate: "22-Jun", endDate: "28-Jun", revenue: 755000, growth: 18.9, target: 875000, achievement: 86.3 }
      ],
      departments: [
        { name: "General Medicine", revenue: 980000, percentage: 30.2, growth: 15.8, topService: "Consultation", topDoctor: "Dr. Amit Patel" },
        { name: "Cardiology", revenue: 720000, percentage: 22.1, growth: 22.1, topService: "ECG", topDoctor: "Dr. Rajesh Kumar" },
        { name: "Dental", revenue: 650000, percentage: 20.0, growth: 18.3, topService: "Cleaning", topDoctor: "Dr. Priya Sharma" },
        { name: "Laboratory", revenue: 520000, percentage: 16.0, growth: -2.1, topService: "Blood Test", topDoctor: "N/A" },
        { name: "Physiotherapy", revenue: 380000, percentage: 11.7, growth: 15.7, topService: "Therapy", topDoctor: "Dr. Sunita Reddy" }
      ]
    };

    const monthlyTrendData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue',
        data: [2800000, 2950000, 3100000, 2890000, 3050000, 3250000],
        borderColor: '#156450',
        backgroundColor: 'rgba(21, 100, 80, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4
      }]
    };

    const departmentData = {
      labels: monthlyData.departments.map(d => d.name),
      datasets: [{
        data: monthlyData.departments.map(d => d.revenue),
        backgroundColor: ['#156450', '#1e7e63', '#22c55e', '#16a34a', '#15803d'],
        borderWidth: 0
      }]
    };

    return (
      <div className="space-y-6">
        {/* Executive Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h4>
            <p className="text-2xl font-bold text-[#156450]">₹{(monthlyData.currentMonth.revenue / 100000).toFixed(1)}L</p>
            <p className="text-sm text-[#156450] flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{monthlyData.currentMonth.growth}% vs last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Target Achievement</h4>
            <p className="text-2xl font-bold text-[#156450]">{monthlyData.currentMonth.achievement}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="h-2 rounded-full bg-[#156450] transition-all duration-500"
                style={{ width: `${monthlyData.currentMonth.achievement}%` }}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Avg Daily Revenue</h4>
            <p className="text-2xl font-bold text-[#156450]">₹{(monthlyData.currentMonth.revenue / 30 / 1000).toFixed(0)}K</p>
            <p className="text-sm text-gray-600">Based on 30 working days</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Remaining Target</h4>
            <p className="text-2xl font-bold text-orange-600">₹{((monthlyData.currentMonth.target - monthlyData.currentMonth.revenue) / 1000).toFixed(0)}K</p>
            <p className="text-sm text-gray-600">To reach monthly target</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Monthly Revenue Trend</h4>
            <div className="h-64">
              <Line data={monthlyTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Department Revenue Distribution</h4>
            <div className="h-64 flex items-center justify-center">
              <Pie data={departmentData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Weekly Breakdown */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Weekly Performance Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Week</th>
                  <th className="text-left py-3 px-4">Period</th>
                  <th className="text-left py-3 px-4">Revenue</th>
                  <th className="text-left py-3 px-4">Growth</th>
                  <th className="text-left py-3 px-4">Target</th>
                  <th className="text-left py-3 px-4">Achievement</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.weeklyBreakdown.map((week, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{week.week}</td>
                    <td className="py-3 px-4">{week.startDate} - {week.endDate}</td>
                    <td className="py-3 px-4 font-semibold text-[#156450]">₹{(week.revenue / 1000).toFixed(0)}K</td>
                    <td className="py-3 px-4">
                      <span className={`flex items-center gap-1 ${week.growth > 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                        {week.growth > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {week.growth > 0 ? '+' : ''}{week.growth}%
                      </span>
                    </td>
                    <td className="py-3 px-4">₹{(week.target / 1000).toFixed(0)}K</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${week.achievement >= 100 ? 'text-[#156450]' : 'text-orange-600'}`}>
                        {week.achievement}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Analysis */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Department Performance Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {monthlyData.departments.map((dept, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-gray-900">{dept.name}</h5>
                  <span className="text-sm text-gray-500">{dept.percentage}%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue:</span>
                    <span className="font-semibold text-[#156450]">₹{(dept.revenue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Growth:</span>
                    <span className={`font-medium ${dept.growth > 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                      {dept.growth > 0 ? '+' : ''}{dept.growth}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Top Service:</span>
                    <span className="text-sm font-medium">{dept.topService}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Top Doctor:</span>
                    <span className="text-sm font-medium">{dept.topDoctor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const OutstandingDuesReport = () => {
    const duesData = {
      summary: {
        totalOutstanding: 1450000,
        totalPatients: 1234,
        averageDuePerPatient: 1175,
        oldestDue: 125,
        collectionProbability: 68
      },
      agingBuckets: [
        { range: "0-30 days", amount: 650000, patients: 542, percentage: 44.8, color: "#156450" },
        { range: "31-60 days", amount: 480000, patients: 386, percentage: 33.1, color: "#22c55e" },
        { range: "61-90 days", amount: 220000, patients: 198, percentage: 15.2, color: "#f59e0b" },
        { range: "90+ days", amount: 100000, patients: 108, percentage: 6.9, color: "#ef4444" }
      ],
      outstandingList: [
        { patientName: "John Doe", patientId: "PT001", dueAmount: 5000, daysOverdue: 45, lastPayment: "2025-05-07", lastContact: "2025-06-15", contactNumber: "+91 9876543210", actionStatus: "Called", recoveryScore: 85 },
        { patientName: "Jane Smith", patientId: "PT002", dueAmount: 3500, daysOverdue: 32, lastPayment: "2025-05-20", lastContact: "2025-06-18", contactNumber: "+91 9876543211", actionStatus: "Emailed", recoveryScore: 92 },
        { patientName: "Rahul Verma", patientId: "PT003", dueAmount: 2000, daysOverdue: 15, lastPayment: "2025-06-06", lastContact: "2025-06-20", contactNumber: "+91 9876543212", actionStatus: "No Contact", recoveryScore: 75 },
        { patientName: "Priya Patel", patientId: "PT004", dueAmount: 7500, daysOverdue: 78, lastPayment: "2025-04-04", lastContact: "2025-06-10", contactNumber: "+91 9876543213", actionStatus: "Payment Plan", recoveryScore: 60 }
      ]
    };

    const agingChartData = {
      labels: duesData.agingBuckets.map(bucket => bucket.range),
      datasets: [{
        data: duesData.agingBuckets.map(bucket => bucket.amount),
        backgroundColor: duesData.agingBuckets.map(bucket => bucket.color),
        borderWidth: 0
      }]
    };

    return (
      <div className="space-y-6">
        {/* Filter Panel */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Filters & Search</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>All Dates</option>
                <option>Last 30 days</option>
                <option>Last 60 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
              <div className="flex gap-2">
                <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
                <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age of Dues</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>All Ages</option>
                <option>0-30 days</option>
                <option>31-60 days</option>
                <option>61-90 days</option>
                <option>90+ days</option>
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

        {/* Summary Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Total Outstanding</h4>
            <p className="text-xl font-bold text-red-600">₹{(duesData.summary.totalOutstanding / 100000).toFixed(1)}L</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Total Patients</h4>
            <p className="text-xl font-bold text-[#156450]">{duesData.summary.totalPatients.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Average Due</h4>
            <p className="text-xl font-bold text-[#156450]">₹{duesData.summary.averageDuePerPatient.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Oldest Due</h4>
            <p className="text-xl font-bold text-orange-600">{duesData.summary.oldestDue} days</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Recovery Probability</h4>
            <p className="text-xl font-bold text-[#156450]">{duesData.summary.collectionProbability}%</p>
          </div>
        </div>

        {/* Age-wise Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Age-wise Due Distribution</h4>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={agingChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Aging Bucket Details</h4>
            <div className="space-y-4">
              {duesData.agingBuckets.map((bucket, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${bucket.color}15` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: bucket.color }}></div>
                    <div>
                      <p className="font-medium">{bucket.range}</p>
                      <p className="text-sm text-gray-600">{bucket.patients} patients</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{(bucket.amount / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-gray-600">{bucket.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outstanding Details Table */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold">Outstanding Dues Details</h4>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                <Send className="h-4 w-4 inline mr-1" />
                Send Reminders
              </button>
              <button className="px-4 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                <Download className="h-4 w-4 inline mr-1" />
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
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
                {duesData.outstandingList.map((patient, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{patient.patientName}</div>
                        <div className="text-gray-500 text-xs">{patient.patientId}</div>
                        <div className="text-gray-500 text-xs">{patient.contactNumber}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-red-600">₹{patient.dueAmount.toLocaleString()}</td>
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
                            style={{ width: `${patient.recoveryScore}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{patient.recoveryScore}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        <button className="p-1 text-[#156450] hover:bg-[#156450]/20 rounded">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-[#156450] hover:bg-[#156450]/20 rounded">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-purple-600 hover:bg-purple-100 rounded">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
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
      </div>
    );
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case "daily-sales":
        return <DailySalesReport />;
      case "monthly-revenue":
        return <MonthlyRevenueReport />;
      case "outstanding-dues":
        return <OutstandingDuesReport />;
      case "payment-analysis":
        return (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Payment Method Analysis</h3>
            <p className="text-gray-600">Comprehensive payment method performance analysis coming soon...</p>
          </div>
        );
      case "refund-adjustment":
        return (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Refund & Adjustment Report</h3>
            <p className="text-gray-600">Detailed refund and adjustment tracking coming soon...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Report Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            onClick={() => setSelectedReport(report.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedReport === report.id
                ? 'border-[#156450] bg-[#156450]/10'
                : 'border-gray-200 hover:border-[#156450]/50'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${selectedReport === report.id ? 'bg-[#156450] text-white' : 'bg-gray-100 text-gray-600'}`}>
                {report.icon}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs ${
                report.status === 'ready' ? 'bg-[#156450]/20 text-[#156450]' :
                report.status === 'generating' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {report.status}
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">{report.name}</h3>
          </div>
        ))}
      </div>

      {/* Report Content */}
      {renderReportContent()}
    </div>
  );
};

const CustomReports = () => {
  const [reportBuilder, setReportBuilder] = useState({
    reportType: 'revenue',
    dateRange: { from: '', to: '', period: 'thisMonth' },
    services: [],
    doctors: [],
    exportFormat: 'pdf',
    includeCharts: true,
    scheduledDelivery: false
  });

  const ReportBuilderWizard = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    const steps = [
      { id: 1, title: "Report Type", description: "Select the type of report to generate" },
      { id: 2, title: "Date Range", description: "Choose the time period for analysis" },
      { id: 3, title: "Filters", description: "Configure services and staff filters" },
      { id: 4, title: "Format", description: "Choose export format and layout options" },
      { id: 5, title: "Delivery", description: "Set delivery and scheduling options" }
    ];

    const StepIndicator = () => (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step.id ? 'border-[#156450] bg-[#156450] text-white' : 'border-gray-300 text-gray-400'
            }`}>
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div className={`h-1 w-16 mx-2 ${
                currentStep > step.id ? 'bg-[#156450]' : 'bg-gray-300'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    );

    const renderStepContent = () => {
      switch (currentStep) {
        case 1:
          return (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Report Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'revenue', name: 'Revenue Report', description: 'Detailed revenue analysis and trends', icon: <DollarSign className="h-6 w-6" /> },
                  { id: 'transaction', name: 'Transaction Report', description: 'Individual transaction details and summaries', icon: <Activity className="h-6 w-6" /> },
                  { id: 'patient', name: 'Patient Report', description: 'Patient-wise financial analysis', icon: <Users className="h-6 w-6" /> },
                  { id: 'doctor', name: 'Doctor Report', description: 'Doctor performance and earnings', icon: <Users className="h-6 w-6" /> },
                  { id: 'service', name: 'Service Report', description: 'Service-wise performance metrics', icon: <BarChart3 className="h-6 w-6" /> },
                  { id: 'custom', name: 'Custom Report', description: 'Build your own custom report', icon: <Settings className="h-6 w-6" /> }
                ].map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setReportBuilder({...reportBuilder, reportType: type.id})}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      reportBuilder.reportType === type.id ? 'border-[#156450] bg-[#156450]/10' : 'border-gray-200 hover:border-[#156450]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${reportBuilder.reportType === type.id ? 'bg-[#156450] text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{type.name}</h4>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );

        case 2:
          return (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Select Date Range</h3>
              
              {/* Quick Date Options */}
              <div>
                <h4 className="font-medium mb-3">Quick Date Options</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'today', label: 'Today' },
                    { id: 'yesterday', label: 'Yesterday' },
                    { id: 'thisWeek', label: 'This Week' },
                    { id: 'lastWeek', label: 'Last Week' },
                    { id: 'thisMonth', label: 'This Month' },
                    { id: 'lastMonth', label: 'Last Month' },
                    { id: 'thisQuarter', label: 'This Quarter' },
                    { id: 'thisYear', label: 'This Year' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setReportBuilder({...reportBuilder, dateRange: {...reportBuilder.dateRange, period: option.id}})}
                      className={`p-3 text-sm rounded-lg border transition-all ${
                        reportBuilder.dateRange.period === option.id 
                          ? 'border-[#156450] bg-[#156450]/10 text-[#156450]' 
                          : 'border-gray-200 hover:border-[#156450]/50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Date Range */}
              <div>
                <h4 className="font-medium mb-3">Custom Date Range</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                    <input
                      type="date"
                      value={reportBuilder.dateRange.from}
                      onChange={(e) => setReportBuilder({
                        ...reportBuilder,
                        dateRange: {...reportBuilder.dateRange, from: e.target.value, period: 'custom'}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                    <input
                      type="date"
                      value={reportBuilder.dateRange.to}
                      onChange={(e) => setReportBuilder({
                        ...reportBuilder,
                        dateRange: {...reportBuilder.dateRange, to: e.target.value, period: 'custom'}
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                    />
                  </div>
                </div>
              </div>

              {/* Comparison Options */}
              <div>
                <h4 className="font-medium mb-3">Comparison Options</h4>
                <div className="space-y-2">
                  {[
                    'Compare with previous period',
                    'Compare with same period last year',
                    'No comparison'
                  ].map((option, index) => (
                    <label key={index} className="flex items-center">
                      <input type="radio" name="comparison" className="mr-2 text-[#156450] focus:ring-[#156450]" />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );

        case 3:
          return (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Configure Filters</h3>
              
              {/* Service Category Filter */}
              <div>
                <h4 className="font-medium mb-3">Service Categories</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <h5 className="font-medium text-sm mb-3">Available Services</h5>
                    {[
                      { category: 'Consultations', services: ['General Consultation', 'Specialist Consultation', 'Emergency Consultation'] },
                      { category: 'Diagnostics', services: ['Lab Tests', 'X-Ray', 'MRI', 'CT Scan'] },
                      { category: 'Procedures', services: ['Minor Surgery', 'Major Surgery', 'Day Care'] },
                      { category: 'Packages', services: ['Health Checkup', 'Dental Package', 'Cardiac Package'] }
                    ].map((cat, catIndex) => (
                      <div key={catIndex} className="mb-4">
                        <label className="flex items-center font-medium text-sm mb-2">
                          <input type="checkbox" className="mr-2 text-[#156450] focus:ring-[#156450]" />
                          {cat.category}
                        </label>
                        <div className="ml-4 space-y-1">
                          {cat.services.map((service, serviceIndex) => (
                            <label key={serviceIndex} className="flex items-center text-sm">
                              <input type="checkbox" className="mr-2 text-[#156450] focus:ring-[#156450]" />
                              {service}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-sm mb-3">Selected Services</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-[#156450]/10 rounded">
                        <span className="text-sm">General Consultation</span>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-[#156450]/10 rounded">
                        <span className="text-sm">Lab Tests</span>
                        <button className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor/Staff Filter */}
              <div>
                <h4 className="font-medium mb-3">Doctor/Staff Selection</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { dept: 'General Medicine', doctors: ['Dr. Amit Patel', 'Dr. Rakesh Singh'] },
                    { dept: 'Cardiology', doctors: ['Dr. Rajesh Kumar', 'Dr. Priya Gupta'] },
                    { dept: 'Dental', doctors: ['Dr. Priya Sharma', 'Dr. Vikash Modi'] }
                  ].map((dept, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <label className="flex items-center font-medium text-sm mb-3">
                        <input type="checkbox" className="mr-2 text-[#156450] focus:ring-[#156450]" />
                        {dept.dept}
                      </label>
                      <div className="ml-4 space-y-2">
                        {dept.doctors.map((doctor, docIndex) => (
                          <label key={docIndex} className="flex items-center text-sm">
                            <input type="checkbox" className="mr-2 text-[#156450] focus:ring-[#156450]" />
                            {doctor}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );

        case 4:
          return (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Export Format & Layout</h3>
              
              {/* File Format */}
              <div>
                <h4 className="font-medium mb-3">File Format</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {[
                    { id: 'pdf', name: 'PDF', description: 'Professional report' },
                    { id: 'excel', name: 'Excel', description: 'Detailed data export' },
                    { id: 'csv', name: 'CSV', description: 'Raw data export' },
                    { id: 'powerpoint', name: 'PowerPoint', description: 'Presentation format' },
                    { id: 'word', name: 'Word', description: 'Text report' }
                  ].map((format) => (
                    <div
                      key={format.id}
                      onClick={() => setReportBuilder({...reportBuilder, exportFormat: format.id})}
                      className={`p-3 border rounded-lg cursor-pointer transition-all text-center ${
                        reportBuilder.exportFormat === format.id ? 'border-[#156450] bg-[#156450]/10' : 'border-gray-200 hover:border-[#156450]/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{format.name}</div>
                      <div className="text-xs text-gray-600">{format.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layout Options */}
              <div>
                <h4 className="font-medium mb-3">Report Layout</h4>
                <div className="space-y-3">
                  {[
                    { id: 'summary', label: 'Summary Only', description: 'Key metrics and highlights' },
                    { id: 'detailed', label: 'Detailed Report', description: 'Complete analysis with all data' },
                    { id: 'charts', label: 'Charts and Graphs Only', description: 'Visual representation only' },
                    { id: 'raw', label: 'Raw Data Only', description: 'Data tables without analysis' }
                  ].map((layout) => (
                    <label key={layout.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input type="radio" name="layout" className="mt-1 text-[#156450] focus:ring-[#156450]" />
                      <div>
                        <div className="font-medium text-sm">{layout.label}</div>
                        <div className="text-xs text-gray-600">{layout.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h4 className="font-medium mb-3">Additional Options</h4>
                <div className="space-y-2">
                  {[
                    'Include charts and graphs',
                    'Include summary tables',
                    'Include detailed transactions',
                    'Add company branding',
                    'Include data sources and methodology'
                  ].map((option, index) => (
                    <label key={index} className="flex items-center">
                      <input type="checkbox" defaultChecked={index < 2} className="mr-2 text-[#156450] focus:ring-[#156450]" />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          );

        case 5:
          return (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Delivery & Scheduling</h3>
              
              {/* Immediate vs Scheduled */}
              <div>
                <h4 className="font-medium mb-3">Delivery Options</h4>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input type="radio" name="delivery" defaultChecked className="mt-1 text-[#156450] focus:ring-[#156450]" />
                    <div>
                      <div className="font-medium text-sm">Generate Now</div>
                      <div className="text-xs text-gray-600">Download immediately after generation</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <input 
                      type="radio" 
                      name="delivery" 
                      onChange={(e) => setReportBuilder({...reportBuilder, scheduledDelivery: e.target.checked})}
                      className="mt-1 text-[#156450] focus:ring-[#156450]" 
                    />
                    <div>
                      <div className="font-medium text-sm">Schedule Delivery</div>
                      <div className="text-xs text-gray-600">Set up automated report generation</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Email Delivery */}
              <div>
                <h4 className="font-medium mb-3">Email Delivery</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                    <textarea
                      placeholder="Enter email addresses separated by commas"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Subject</label>
                    <input
                      type="text"
                      placeholder="Custom email subject"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                    />
                  </div>
                </div>
              </div>

              {/* Scheduling Options */}
              {reportBuilder.scheduledDelivery && (
                <div>
                  <h4 className="font-medium mb-3">Scheduling Options</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <StepIndicator />
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-center">{steps[currentStep - 1].title}</h3>
          <p className="text-gray-600 text-center">{steps[currentStep - 1].description}</p>
        </div>

        <div className="min-h-96">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep === totalSteps ? (
            <button className="px-6 py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90">
              Generate Report
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
              className="px-6 py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90"
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <ReportBuilderWizard />
      
      {/* Saved Templates */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Saved Report Templates</h3>
          <button className="px-4 py-2 bg-[#156450] text-white rounded-lg hover:bg-[#156450]/90 text-sm">
            <Plus className="h-4 w-4 inline mr-1" />
            Save Current as Template
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Monthly Revenue Summary', description: 'Standard monthly financial overview', lastUsed: '2 days ago' },
            { name: 'Doctor Performance Report', description: 'Quarterly doctor performance analysis', lastUsed: '1 week ago' },
            { name: 'Service Analysis', description: 'Comprehensive service-wise breakdown', lastUsed: '3 days ago' }
          ].map((template, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-sm">{template.name}</h4>
                  <p className="text-xs text-gray-600">{template.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Last used: {template.lastUsed}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 text-[#156450] hover:bg-[#156450]/20 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:bg-gray-100 rounded">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-100 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button className="w-full py-2 bg-[#156450]/10 text-[#156450] rounded-lg hover:bg-[#156450]/20 text-sm">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FinancialDashboards = () => {
  const [selectedDashboard, setSelectedDashboard] = useState("executive");

  const ExecutiveSummaryDashboard = () => {
    const executiveData = {
      primaryMetrics: {
        totalRevenue: { value: 12450000, growth: 15.3, target: 15000000, achievement: 83 },
        netProfit: { value: 3735000, margin: 30, growth: 18.7 },
        patientVolume: { value: 8420, growth: 12.5, newVsReturning: { new: 35, returning: 65 } },
        avgRevenuePerPatient: { value: 1478, growth: 8.9, benchmark: 1200 }
      },
      revenueStreams: [
        { source: 'Consultations', amount: 4982000, percentage: 40 },
        { source: 'Procedures', amount: 3736500, percentage: 30 },
        { source: 'Diagnostics', amount: 2490000, percentage: 20 },
        { source: 'Packages', amount: 1241500, percentage: 10 }
      ],
      departmentPerformance: [
        { dept: 'Cardiology', revenue: 2980000, growth: 22.1, rating: 'high', doctors: 4, utilization: 89 },
        { dept: 'General Medicine', revenue: 2850000, growth: 15.8, rating: 'high', doctors: 6, utilization: 85 },
        { dept: 'Dental', revenue: 2280000, growth: 18.3, rating: 'high', doctors: 3, utilization: 92 },
        { dept: 'Laboratory', revenue: 1980000, growth: -2.1, rating: 'medium', doctors: 2, utilization: 76 },
        { dept: 'Physiotherapy', revenue: 1360000, growth: 15.7, rating: 'high', doctors: 2, utilization: 88 }
      ]
    };

    const revenueStreamData = {
      labels: executiveData.revenueStreams.map(s => s.source),
      datasets: [{
        data: executiveData.revenueStreams.map(s => s.amount),
        backgroundColor: ['#156450', '#1e7e63', '#22c55e', '#16a34a'],
        borderWidth: 0
      }]
    };

    return (
      <div className="space-y-6">
        {/* Primary KPI Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-[#156450]/10 to-white p-6 rounded-xl border border-[#156450]/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-[#156450]">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-[#156450] font-medium">+{executiveData.primaryMetrics.totalRevenue.growth}%</div>
                <div className="text-xs text-gray-600">vs last period</div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-[#156450]">₹{(executiveData.primaryMetrics.totalRevenue.value / 10000000).toFixed(2)}Cr</p>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Target Achievement</span>
                <span className="font-medium text-[#156450]">{executiveData.primaryMetrics.totalRevenue.achievement}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-[#156450] transition-all duration-500"
                  style={{ width: `${executiveData.primaryMetrics.totalRevenue.achievement}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-blue-600 font-medium">{executiveData.primaryMetrics.netProfit.margin}%</div>
                <div className="text-xs text-gray-600">Profit Margin</div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Net Profit</h3>
            <p className="text-3xl font-bold text-blue-600">₹{(executiveData.primaryMetrics.netProfit.value / 10000000).toFixed(2)}Cr</p>
            <p className="text-sm text-blue-600 mt-2">+{executiveData.primaryMetrics.netProfit.growth}% growth</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-600 font-medium">+{executiveData.primaryMetrics.patientVolume.growth}%</div>
                <div className="text-xs text-gray-600">vs last period</div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Patient Volume</h3>
            <p className="text-3xl font-bold text-purple-600">{executiveData.primaryMetrics.patientVolume.value.toLocaleString()}</p>
            <div className="mt-2 text-sm">
              <span className="text-green-600">{executiveData.primaryMetrics.patientVolume.newVsReturning.new}% New</span>
              <span className="text-gray-500 mx-1">•</span>
              <span className="text-blue-600">{executiveData.primaryMetrics.patientVolume.newVsReturning.returning}% Returning</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-500">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-sm text-orange-600 font-medium">+{executiveData.primaryMetrics.avgRevenuePerPatient.growth}%</div>
                <div className="text-xs text-gray-600">vs benchmark</div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Revenue/Patient</h3>
            <p className="text-3xl font-bold text-orange-600">₹{executiveData.primaryMetrics.avgRevenuePerPatient.value.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-2">Benchmark: ₹{executiveData.primaryMetrics.avgRevenuePerPatient.benchmark.toLocaleString()}</p>
          </div>
        </div>

        {/* Revenue Streams and Financial Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Revenue Streams Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <Doughnut data={revenueStreamData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="mt-4 space-y-2">
              {executiveData.revenueStreams.map((stream, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: revenueStreamData.datasets[0].backgroundColor[index] }}
                    />
                    <span className="text-sm">{stream.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">₹{(stream.amount / 100000).toFixed(1)}L</div>
                    <div className="text-xs text-gray-500">{stream.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Financial Health Indicators</h3>
            <div className="space-y-4">
              {[
                { metric: 'Gross Profit Margin', value: '45%', trend: '+2.3%', status: 'good' },
                { metric: 'Operating Expense Ratio', value: '35%', trend: '-1.5%', status: 'good' },
                { metric: 'EBITDA', value: '₹4.2Cr', trend: '+18.7%', status: 'excellent' },
                { metric: 'Cash Flow', value: '₹3.8Cr', trend: '+12.1%', status: 'good' },
                { metric: 'Days Sales Outstanding', value: '28 days', trend: '-3 days', status: 'good' },
                { metric: 'Collection Efficiency', value: '92%', trend: '+2.1%', status: 'good' }
              ].map((indicator, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      indicator.status === 'excellent' ? 'bg-[#156450]' :
                      indicator.status === 'good' ? 'bg-green-400' :
                      'bg-yellow-400'
                    }`} />
                    <span className="text-sm font-medium">{indicator.metric}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold">{indicator.value}</div>
                    <div className={`text-xs ${indicator.trend.startsWith('+') || indicator.trend.startsWith('-') && indicator.metric.includes('Days') ? 'text-[#156450]' : 'text-red-600'}`}>
                      {indicator.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Performance Grid */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Department Performance Scorecard</h3>
            <div className="flex gap-2">
              <span className="text-sm text-gray-600">Performance Rating:</span>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-[#156450]" />
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="text-xs">Low</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {executiveData.departmentPerformance.map((dept, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">{dept.dept}</h4>
                  <div className={`w-3 h-3 rounded-full ${
                    dept.rating === 'high' ? 'bg-[#156450]' :
                    dept.rating === 'medium' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue:</span>
                    <span className="font-semibold text-[#156450]">₹{(dept.revenue / 100000).toFixed(1)}L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Growth:</span>
                    <span className={`font-medium ${dept.growth > 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                      {dept.growth > 0 ? '+' : ''}{dept.growth}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Doctors:</span>
                    <span className="font-medium">{dept.doctors}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Utilization:</span>
                    <span className="font-medium">{dept.utilization}%</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-[#156450] transition-all duration-500"
                      style={{ width: `${dept.utilization}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Insights Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Key Strategic Insights</h3>
            <div className="space-y-4">
              {[
                {
                  insight: "Cardiology department shows exceptional 22.1% growth",
                  impact: "High",
                  action: "Consider expanding cardiology services and hiring additional specialists"
                },
                {
                  insight: "Laboratory services showing negative growth (-2.1%)",
                  impact: "Medium",
                  action: "Review lab service pricing and equipment utilization"
                },
                {
                  insight: "Average revenue per patient increased by 8.9%",
                  impact: "High",
                  action: "Continue current service mix optimization strategies"
                },
                {
                  insight: "Collection efficiency at 92% above industry average",
                  impact: "Medium",
                  action: "Share best practices across all departments"
                }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-[#156450] pl-4 py-2">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">{item.insight}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.impact === 'High' ? 'bg-red-100 text-red-700' :
                      item.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {item.impact} Impact
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">{item.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Priority Action Items</h3>
            <div className="space-y-3">
              {[
                {
                  action: "Recruit 2 additional cardiologists",
                  timeline: "Q3 2025",
                  impact: "₹50L additional revenue",
                  status: "planning"
                },
                {
                  action: "Upgrade laboratory equipment",
                  timeline: "Q2 2025",
                  impact: "15% efficiency improvement",
                  status: "in-progress"
                },
                {
                  action: "Launch physiotherapy package deals",
                  timeline: "Next Month",
                  impact: "₹20L revenue boost",
                  status: "ready"
                },
                {
                  action: "Implement patient satisfaction program",
                  timeline: "Q4 2025",
                  impact: "10% retention improvement",
                  status: "planning"
                }
              ].map((item, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900">{item.action}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'ready' ? 'bg-[#156450]/20 text-[#156450]' :
                      item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status === 'ready' ? 'Ready' : item.status === 'in-progress' ? 'In Progress' : 'Planning'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>Timeline: {item.timeline}</div>
                    <div>Impact: {item.impact}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const KPITrackingDashboard = () => {
    const kpiData = {
      primaryKPIs: [
        {
          name: "Revenue Growth",
          current: 15.3,
          target: 12.0,
          unit: "%",
          trend: "up",
          achievement: 127.5,
          historical: [8.2, 10.5, 12.8, 11.9, 14.2, 15.3]
        },
        {
          name: "Patient Satisfaction",
          current: 4.7,
          target: 4.5,
          unit: "/5",
          trend: "up",
          achievement: 104.4,
          historical: [4.2, 4.3, 4.4, 4.5, 4.6, 4.7]
        },
        {
          name: "Collection Rate",
          current: 92.5,
          target: 90.0,
          unit: "%",
          trend: "up",
          achievement: 102.8,
          historical: [87.5, 88.9, 89.8, 90.5, 91.8, 92.5]
        },
        {
          name: "Staff Productivity",
          current: 8.4,
          target: 8.0,
          unit: "/10",
          trend: "stable",
          achievement: 105.0,
          historical: [7.8, 7.9, 8.1, 8.2, 8.3, 8.4]
        }
      ],
      secondaryKPIs: [
        { name: "Cost per Patient", current: 425, target: 450, unit: "₹", trend: "down", achievement: 105.6 },
        { name: "Equipment Utilization", current: 78, target: 75, unit: "%", trend: "up", achievement: 104.0 },
        { name: "Average Wait Time", current: 12, target: 15, unit: "min", trend: "down", achievement: 125.0 },
        { name: "Staff Retention", current: 94, target: 90, unit: "%", trend: "up", achievement: 104.4 }
      ]
    };

    const KPICard = ({ kpi, size = "large" }) => (
      <div className={`bg-white p-${size === 'large' ? '6' : '4'} rounded-xl border border-gray-200 hover:shadow-md transition-shadow`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold text-gray-900 ${size === 'large' ? 'text-lg' : 'text-sm'}`}>
            {kpi.name}
          </h3>
          <div className={`px-2 py-1 rounded-full text-xs ${
            kpi.achievement >= 100 ? 'bg-[#156450]/20 text-[#156450]' : 'bg-red-100 text-red-700'
          }`}>
            {kpi.achievement.toFixed(1)}%
          </div>
        </div>
        
        <div className="flex items-end gap-4 mb-4">
          <div>
            <p className={`${size === 'large' ? 'text-3xl' : 'text-2xl'} font-bold text-[#156450]`}>
              {kpi.current}{kpi.unit}
            </p>
            <p className="text-sm text-gray-600">
              Target: {kpi.target}{kpi.unit}
            </p>
          </div>
          <div className={`flex items-center gap-1 text-sm ${
            kpi.trend === 'up' ? 'text-[#156450]' :
            kpi.trend === 'down' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            {kpi.trend === 'up' && <TrendingUp className="h-4 w-4" />}
            {kpi.trend === 'down' && <TrendingDown className="h-4 w-4" />}
            {kpi.trend === 'stable' && <Activity className="h-4 w-4" />}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                kpi.achievement >= 100 ? 'bg-[#156450]' : 'bg-orange-400'
              }`}
              style={{ width: `${Math.min(kpi.achievement, 100)}%` }}
            />
          </div>
        </div>

        {/* Historical Trend */}
        {kpi.historical && size === 'large' && (
          <div className="h-16">
            <Line 
              data={{
                labels: ['6M', '5M', '4M', '3M', '2M', '1M'],
                datasets: [{
                  data: kpi.historical,
                  borderColor: '#156450',
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  pointRadius: 0,
                  tension: 0.4
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { display: false },
                  y: { display: false }
                }
              }}
            />
          </div>
        )}
      </div>
    );

    return (
      <div className="space-y-6">
        {/* KPI Configuration Panel */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">KPI Configuration</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                <Settings className="h-4 w-4 inline mr-1" />
                Configure Targets
              </button>
              <button className="px-4 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                <Bell className="h-4 w-4 inline mr-1" />
                Setup Alerts
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>This Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">KPI Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>All KPIs</option>
                <option>Financial</option>
                <option>Operational</option>
                <option>Strategic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>All Departments</option>
                <option>Cardiology</option>
                <option>General Medicine</option>
                <option>Dental</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alert Threshold</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>90% of Target</option>
                <option>95% of Target</option>
                <option>100% of Target</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary KPIs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Primary KPIs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {kpiData.primaryKPIs.map((kpi, index) => (
              <KPICard key={index} kpi={kpi} size="large" />
            ))}
          </div>
        </div>

        {/* Secondary KPIs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Secondary KPIs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpiData.secondaryKPIs.map((kpi, index) => (
              <KPICard key={index} kpi={kpi} size="small" />
            ))}
          </div>
        </div>

        {/* KPI Analysis Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Variance Analysis */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Variance Analysis</h3>
            <div className="space-y-4">
              {kpiData.primaryKPIs.map((kpi, index) => {
                const variance = ((kpi.current - kpi.target) / kpi.target) * 100;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{kpi.name}</p>
                      <p className="text-xs text-gray-600">
                        Current: {kpi.current}{kpi.unit} | Target: {kpi.target}{kpi.unit}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${variance >= 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                        {variance >= 0 ? '+' : ''}{variance.toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-600">Variance</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alert and Notification System */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Active Alerts</h3>
            <div className="space-y-3">
              {[
                {
                  kpi: "Revenue Growth",
                  message: "Exceeded target by 27.5%",
                  type: "success",
                  time: "2 hours ago"
                },
                {
                  kpi: "Equipment Utilization",
                  message: "Approaching 80% capacity",
                  type: "warning",
                  time: "5 hours ago"
                },
                {
                  kpi: "Patient Satisfaction",
                  message: "Improved to 4.7/5 rating",
                  type: "success",
                  time: "1 day ago"
                },
                {
                  kpi: "Average Wait Time",
                  message: "Reduced to 12 minutes",
                  type: "info",
                  time: "2 days ago"
                }
              ].map((alert, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  alert.type === 'success' ? 'border-[#156450] bg-[#156450]/10' :
                  alert.type === 'warning' ? 'border-yellow-400 bg-yellow-50' :
                  alert.type === 'error' ? 'border-red-400 bg-red-50' :
                  'border-blue-400 bg-blue-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{alert.kpi}</p>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{alert.time}</span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TrendAnalysisDashboard = () => {
    const trendData = {
      revenueTrend: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        actual: [2800000, 2950000, 3100000, 2890000, 3050000, 3250000],
        forecast: [3350000, 3420000, 3580000, 3650000, 3720000, 3850000],
        target: [3000000, 3000000, 3000000, 3000000, 3000000, 3000000]
      },
      growthRates: [
        { metric: "Revenue", current: 15.3, previous: 12.8, acceleration: 2.5 },
        { metric: "Patient Volume", current: 12.5, previous: 8.9, acceleration: 3.6 },
        { metric: "Average Transaction", current: 8.9, previous: 6.2, acceleration: 2.7 },
        { metric: "Market Share", current: 18.5, previous: 17.2, acceleration: 1.3 }
      ],
      seasonalPatterns: [
        { quarter: "Q1", pattern: "Peak Season", growth: 8.5, factors: ["Festival Season", "Insurance Renewals"] },
        { quarter: "Q2", pattern: "Moderate", growth: 5.2, factors: ["Summer Vacations", "School Holidays"] },
        { quarter: "Q3", pattern: "Low Season", growth: -2.1, factors: ["Monsoon", "Reduced Footfall"] },
        { quarter: "Q4", pattern: "Recovery", growth: 15.8, factors: ["Post-Monsoon", "Year-end Benefits"] }
      ]
    };

    const revenueTrendChartData = {
      labels: [...trendData.revenueTrend.labels, 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Actual Revenue',
          data: [...trendData.revenueTrend.actual, null, null, null, null, null, null],
          borderColor: '#156450',
          backgroundColor: 'rgba(21, 100, 80, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Forecast',
          data: [null, null, null, null, null, ...trendData.revenueTrend.forecast],
          borderColor: '#22c55e',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4
        },
        {
          label: 'Target',
          data: [...trendData.revenueTrend.target, ...trendData.revenueTrend.target],
          borderColor: '#ef4444',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [10, 5]
        }
      ]
    };

    return (
      <div className="space-y-6">
        {/* Trend Configuration */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Trend Analysis Configuration</h3>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                <LineChart className="h-4 w-4 inline mr-1" />
                Advanced Analytics
              </button>
              <button className="px-4 py-2 bg-[#156450]/20 text-[#156450] rounded-lg hover:bg-[#156450]/30 text-sm">
                <Download className="h-4 w-4 inline mr-1" />
                Export Analysis
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 24 Months</option>
                <option>Last 5 Years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trend Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>Revenue Trends</option>
                <option>Volume Trends</option>
                <option>Profitability Trends</option>
                <option>Efficiency Trends</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Granularity</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Forecast Period</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156450] focus:border-[#156450]">
                <option>6 Months</option>
                <option>12 Months</option>
                <option>18 Months</option>
                <option>24 Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Primary Trend Visualizations */}
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend Analysis & Forecasting</h3>
          <div className="h-80 mb-6">
            <Line data={revenueTrendChartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: 'top' },
                tooltip: {
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  titleColor: '#fff',
                  bodyColor: '#fff'
                }
              },
              scales: {
                x: { 
                  grid: { color: '#f3f4f6' },
                  ticks: { color: '#6b7280' }
                },
                y: { 
                  grid: { color: '#f3f4f6' },
                  ticks: { 
                    color: '#6b7280',
                    callback: function(value) {
                      return '₹' + (value / 100000).toFixed(1) + 'L';
                    }
                  }
                }
              }
            }} />
          </div>
          
          {/* Forecast Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-[#156450]/10 rounded-lg">
              <p className="text-sm text-gray-600">6-Month Forecast</p>
              <p className="text-xl font-bold text-[#156450]">₹21.6Cr</p>
              <p className="text-sm text-[#156450]">+18.5% growth</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Confidence Level</p>
              <p className="text-xl font-bold text-blue-600">85%</p>
              <p className="text-sm text-blue-600">High confidence</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Seasonal Factor</p>
              <p className="text-xl font-bold text-green-600">+12%</p>
              <p className="text-sm text-green-600">Peak season boost</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Market Impact</p>
              <p className="text-xl font-bold text-purple-600">+5%</p>
              <p className="text-sm text-purple-600">Market expansion</p>
            </div>
          </div>
        </div>

        {/* Growth Rate Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Growth Rate Analysis</h3>
            <div className="space-y-4">
              {trendData.growthRates.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{item.metric}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Acceleration:</span>
                      <span className={`font-semibold text-sm ${item.acceleration > 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                        {item.acceleration > 0 ? '+' : ''}{item.acceleration}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Previous Period</p>
                        <p className="font-semibold">{item.previous}%</p>
                      </div>
                      <div className="flex items-center">
                        <ArrowUpRight className="h-4 w-4 text-[#156450]" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Current Period</p>
                        <p className="font-semibold text-[#156450]">{item.current}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Seasonal Pattern Analysis</h3>
            <div className="space-y-4">
              {trendData.seasonalPatterns.map((pattern, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{pattern.quarter}</h4>
                      <p className="text-sm text-gray-600">{pattern.pattern}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${pattern.growth > 0 ? 'text-[#156450]' : 'text-red-600'}`}>
                        {pattern.growth > 0 ? '+' : ''}{pattern.growth}%
                      </p>
                      <p className="text-xs text-gray-600">Growth</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pattern.factors.map((factor, factorIndex) => (
                      <span key={factorIndex} className="px-2 py-1 bg-[#156450]/10 text-[#156450] rounded-full text-xs">
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Correlation Analysis</h3>
            <div className="space-y-4">
              {[
                { metric1: "Marketing Spend", metric2: "Patient Volume", correlation: 0.78, strength: "Strong" },
                { metric1: "Staff Count", metric2: "Revenue", correlation: 0.65, strength: "Moderate" },
                { metric1: "Patient Satisfaction", metric2: "Retention Rate", correlation: 0.89, strength: "Very Strong" },
                { metric1: "Equipment Utilization", metric2: "Profit Margin", correlation: 0.54, strength: "Moderate" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{item.metric1} vs {item.metric2}</p>
                    <p className="text-xs text-gray-600">{item.strength} correlation</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[#156450]">{item.correlation}</p>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full bg-[#156450] transition-all duration-500"
                        style={{ width: `${item.correlation * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Trend Insights & Recommendations</h3>
            <div className="space-y-4">
              {[
                {
                  insight: "Strong upward revenue trend with 15.3% growth",
                  recommendation: "Continue current strategy and consider capacity expansion",
                  priority: "High",
                  impact: "Positive"
                },
                {
                  insight: "Seasonal dip expected in Q3 based on historical patterns",
                  recommendation: "Plan promotional campaigns and service packages for Q3",
                  priority: "Medium",
                  impact: "Neutral"
                },
                {
                  insight: "Patient satisfaction shows strong correlation with retention",
                  recommendation: "Invest in patient experience improvement initiatives",
                  priority: "High",
                  impact: "Positive"
                },
                {
                  insight: "Equipment utilization trending upward, approaching capacity",
                  recommendation: "Evaluate equipment upgrade or expansion needs",
                  priority: "Medium",
                  impact: "Opportunity"
                }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-[#156450] pl-4 py-2">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-sm font-medium">{item.insight}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.priority === 'High' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{item.recommendation}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    item.impact === 'Positive' ? 'bg-[#156450]/20 text-[#156450]' :
                    item.impact === 'Opportunity' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.impact} Impact
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PerformanceIndicatorsDashboard = () => {
    const performanceData = {
      financialPerformance: [
        { metric: "Revenue per Square Foot", value: "₹1,250", benchmark: "₹1,100", status: "above" },
        { metric: "Profit Margin", value: "30%", benchmark: "25%", status: "above" },
        { metric: "Cash Conversion Cycle", value: "28 days", benchmark: "35 days", status: "above" },
        { metric: "Return on Investment", value: "18.5%", benchmark: "15%", status: "above" }
      ],
      operationalPerformance: [
        { metric: "Patient Satisfaction Score", value: "4.7/5", benchmark: "4.5/5", status: "above" },
        { metric: "Average Treatment Time", value: "45 min", benchmark: "60 min", status: "above" },
        { metric: "Staff Productivity Index", value: "8.4/10", benchmark: "7.5/10", status: "above" },
        { metric: "Equipment Downtime", value: "2.1%", benchmark: "5%", status: "above" }
      ],
      strategicPerformance: [
        { metric: "Market Share Growth", value: "+2.3%", benchmark: "+1.5%", status: "above" },
        { metric: "Patient Retention Rate", value: "85%", benchmark: "80%", status: "above" },
        { metric: "Digital Adoption Rate", value: "72%", benchmark: "60%", status: "above" },
        { metric: "Innovation Index", value: "7.8/10", benchmark: "6.5/10", status: "above" }
      ]
    };

    const PerformanceMatrix = () => {
      const matrixData = [
        { dept: "Cardiology", performance: 95, importance: 90, investment: 85, efficiency: 88 },
        { dept: "General Medicine", performance: 88, importance: 95, investment: 70, efficiency: 92 },
        { dept: "Dental", performance: 92, importance: 75, investment: 80, efficiency: 85 },
        { dept: "Laboratory", performance: 75, importance: 80, investment: 90, efficiency: 78 },
        { dept: "Physiotherapy", performance: 85, importance: 70, investment: 60, efficiency: 90 }
      ];

      return (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Performance Matrix</h3>
          <div className="relative h-80 bg-gray-50 rounded-lg p-4">
            {/* Matrix Grid */}
            <div className="absolute inset-4">
              {/* Quadrant Labels */}
              <div className="absolute top-2 right-2 text-xs text-gray-600 font-medium">High Performance, High Importance</div>
              <div className="absolute top-2 left-2 text-xs text-gray-600 font-medium">Low Performance, High Importance</div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-600 font-medium">High Performance, Low Importance</div>
              <div className="absolute bottom-2 left-2 text-xs text-gray-600 font-medium">Low Performance, Low Importance</div>
              
              {/* Center Lines */}
              <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300"></div>
              <div className="absolute left-0 top-1/2 w-full h-px bg-gray-300"></div>
              
              {/* Data Points */}
              {matrixData.map((item, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${item.performance}%`,
                    top: `${100 - item.importance}%`
                  }}
                >
                  <div className="w-8 h-8 bg-[#156450] rounded-full flex items-center justify-center text-white text-xs font-medium hover:scale-110 transition-transform cursor-pointer">
                    {item.dept.charAt(0)}
                  </div>
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs text-gray-700 whitespace-nowrap">
                    {item.dept}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Axis Labels */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
              Performance Score →
            </div>
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700">
              ← Business Importance
            </div>
          </div>
        </div>
      );
    };

    const PerformanceSection = ({ title, data, icon }) => (
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#156450]/10">
            {icon}
          </div>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.metric}</p>
                <p className="text-xs text-gray-600">Benchmark: {item.benchmark}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold text-[#156450]">{item.value}</p>
                <div className={`w-3 h-3 rounded-full ${
                  item.status === 'above' ? 'bg-[#156450]' :
                  item.status === 'at' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        {/* Performance Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PerformanceSection
            title="Financial Performance"
            data={performanceData.financialPerformance}
            icon={<DollarSign className="h-5 w-5 text-[#156450]" />}
          />
          <PerformanceSection
            title="Operational Performance"
            data={performanceData.operationalPerformance}
            icon={<Activity className="h-5 w-5 text-[#156450]" />}
          />
          <PerformanceSection
            title="Strategic Performance"
            data={performanceData.strategicPerformance}
            icon={<Target className="h-5 w-5 text-[#156450]" />}
          />
        </div>

        {/* Performance Matrix and Benchmarking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PerformanceMatrix />
          
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Performance Benchmarking</h3>
            <div className="space-y-4">
              {[
                { category: "Revenue per Patient", our: 1478, industry: 1200, peer: 1350, position: "Leader" },
                { category: "Patient Satisfaction", our: 4.7, industry: 4.2, peer: 4.5, position: "Leader" },
                { category: "Cost Efficiency", our: 68, industry: 72, peer: 70, position: "Above Average" },
                { category: "Digital Adoption", our: 72, industry: 45, peer: 58, position: "Leader" }
              ].map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{item.category}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.position === 'Leader' ? 'bg-[#156450]/20 text-[#156450]' :
                      item.position === 'Above Average' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.position}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-600">Our Performance</p>
                      <p className="font-semibold text-[#156450]">{item.our}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Industry Avg</p>
                      <p className="font-semibold">{item.industry}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600">Peer Average</p>
                      <p className="font-semibold">{item.peer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Monitoring and Performance Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Real-time Performance Monitoring</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#156450] rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">Live</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { metric: "Current Revenue Rate", value: "₹15,420/hour", status: "normal", change: "+5.2%" },
                { metric: "Patient Queue Length", value: "12 patients", status: "warning", change: "+2" },
                { metric: "Staff Utilization", value: "87%", status: "normal", change: "+1.5%" },
                { metric: "System Uptime", value: "99.8%", status: "excellent", change: "0%" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'excellent' ? 'bg-[#156450]' :
                      item.status === 'normal' ? 'bg-green-400' :
                      item.status === 'warning' ? 'bg-yellow-400' :
                      'bg-red-400'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{item.metric}</p>
                      <p className="text-xs text-gray-600">{item.change} vs last hour</p>
                    </div>
                  </div>
                  <p className="font-semibold text-[#156450]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Performance Optimization Recommendations</h3>
            <div className="space-y-4">
              {[
                {
                  area: "Laboratory Efficiency",
                  opportunity: "Implement automated sample processing",
                  impact: "25% faster turnaround",
                  effort: "Medium",
                  roi: "High"
                },
                {
                  area: "Patient Experience",
                  opportunity: "Deploy mobile check-in system",
                  impact: "15% reduction in wait time",
                  effort: "Low",
                  roi: "High"
                },
                {
                  area: "Resource Utilization",
                  opportunity: "Optimize doctor scheduling",
                  impact: "12% increase in utilization",
                  effort: "Low",
                  roi: "Medium"
                },
                {
                  area: "Revenue Management",
                  opportunity: "Dynamic pricing for off-peak hours",
                  impact: "8% revenue increase",
                  effort: "Medium",
                  roi: "Medium"
                }
              ].map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{item.area}</h4>
                      <p className="text-xs text-gray-600">{item.opportunity}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.roi === 'High' ? 'bg-[#156450]/20 text-[#156450]' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {item.roi} ROI
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-600">Impact: </span>
                      <span className="font-medium">{item.impact}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Effort: </span>
                      <span className="font-medium">{item.effort}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboardContent = () => {
    switch (selectedDashboard) {
      case "executive":
        return <ExecutiveSummaryDashboard />;
      case "kpi":
        return <KPITrackingDashboard />;
      case "trends":
        return <TrendAnalysisDashboard />;
      case "performance":
        return <PerformanceIndicatorsDashboard />;
      default:
        return <ExecutiveSummaryDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { id: "executive", name: "Executive Summary", description: "High-level overview and key metrics", icon: <Home className="h-6 w-6" /> },
          { id: "kpi", name: "KPI Tracking", description: "Key performance indicators monitoring", icon: <Target className="h-6 w-6" /> },
          { id: "trends", name: "Trend Analysis", description: "Historical trends and forecasting", icon: <TrendingUp className="h-6 w-6" /> },
          { id: "performance", name: "Performance Indicators", description: "Comprehensive performance metrics", icon: <Gauge className="h-6 w-6" /> }
        ].map((dashboard) => (
          <div
            key={dashboard.id}
            onClick={() => setSelectedDashboard(dashboard.id)}
            className={`p-6 rounded-lg border cursor-pointer transition-all ${
              selectedDashboard === dashboard.id
                ? 'border-[#156450] bg-[#156450]/10'
                : 'border-gray-200 hover:border-[#156450]/50 hover:shadow-md'
            }`}
          >
            <div className={`p-3 rounded-lg mb-3 ${
              selectedDashboard === dashboard.id ? 'bg-[#156450] text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {dashboard.icon}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{dashboard.name}</h3>
            <p className="text-sm text-gray-600">{dashboard.description}</p>
          </div>
        ))}
      </div>

      {/* Dashboard Content */}
      {renderDashboardContent()}
    </div>
  );
};

const FinancialReporting = () => {
  const [activeTab, setActiveTab] = useState("standard");

  const TabButton = ({ id, label, icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isActive 
          ? 'bg-[#156450] text-white shadow-md' 
          : 'bg-white text-gray-600 hover:bg-[#156450]/10 border border-gray-200'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <FinanceLayout
      pageTitle="Financial Reporting & Analytics"
      pageSubtitle="Generate, analyse and schedule financial reports"
    >
      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <TabButton
            key={tab.id}
            id={tab.id}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === tab.id}
            onClick={setActiveTab}
          />
        ))}
      </div>

      {/* Global Actions */}
      <GlobalActionsBar />

      {/* Quick Stats */}
      <QuickStats />

      {/* Dynamic Sections */}
      {activeTab === "standard" && <StandardReports />}
      {activeTab === "custom" && <CustomReports />}
      {activeTab === "dashboards" && <FinancialDashboards />}
    </FinanceLayout>
  );
};

export default FinancialReporting;