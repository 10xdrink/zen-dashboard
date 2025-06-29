import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// Custom brand styling
const brandColor = '#156450';
const brandStyles = {
  bg: 'bg-[#156450]',
  bgLight: 'bg-[#e6efed]',
  text: 'text-[#156450]',
  border: 'border-[#156450]',
  hoverBg: 'hover:bg-[#0e4e3d]',
  focusRing: 'focus:ring-[#156450]',
  focusBorder: 'focus:border-[#156450]',
  gradient: 'from-[#156450] to-[#0e4e3d]'
};

import Sidebar from '@/components/layout/Sidebar';
import HeaderBar from '@/components/layout/HeaderBar';

import { 
  ChevronDown, ChevronRight, Plus, Search, Filter, Download, 
  Upload, Users, DollarSign, TrendingUp, TrendingDown, AlertTriangle,
  CheckCircle, Clock, Building, Package, FileText, BarChart3,
  Calendar, Phone, Mail, MapPin, CreditCard, Banknote, Smartphone,
  Eye, Edit, Trash2, ArrowUp, ArrowDown, Settings, Bell, Star,
  Paperclip, Camera, Shield, Zap, Wrench, Briefcase, Home,
  Construction, Clipboard, ShoppingCart, Monitor, Leaf, Building2,
  Lock, UserCheck, Activity, PieChart, Target, TrendingDown as TrendingDownIcon
} from 'lucide-react';

const ExpenseTracking = () => {
  const [activeTab, setActiveTab] = useState('categories');
  const [expandedCategories, setExpandedCategories] = useState(new Set(['operational']));
  const [selectedPeriod, setSelectedPeriod] = useState('June 2025');
  const [showNewExpenseModal, setShowNewExpenseModal] = useState(false);
  const [showNewVendorModal, setShowNewVendorModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpenseType, setSelectedExpenseType] = useState('operational');

  // Mock data for the expense tracking system
  const budgetData = {
    totalMonthlyBudget: 2500000,
    budgetUtilization: 68,
    remainingBudget: 800000,
    daysRemaining: 8,
    burnRate: 85000,
    todayExpenses: 125000,
    pendingApprovals: 15,
    overduePayments: 3
  };

  const expenseCategories = {
    operational: {
      name: 'Operational Expenses',
      icon: Building,
      totalBudget: 1800000,
      spent: 1224000,
      utilization: 68,
      trend: 'up',
      subcategories: {
        staffSalaries: {
          name: 'Staff Salaries',
          budgetAllocated: 1200000,
          actualSpent: 1180000,
          utilization: 98,
          employeeCount: 85,
          averageSalary: 14000,
          overtimeCosts: 45000,
          benefitsAllowances: 120000,
          pendingPayments: 0
        },
        utilityBills: {
          name: 'Utility Bills',
          budgetAllocated: 180000,
          currentMonth: 165000,
          utilization: 92,
          bills: {
            electricity: { amount: 85000, units: 12500 },
            water: { amount: 25000, liters: 50000 },
            gas: { amount: 15000, kg: 850 },
            internet: { amount: 35000 },
            waste: { amount: 5000 }
          },
          duePayments: 25000,
          dueBillsCount: 2
        },
        rentMaintenance: {
          name: 'Rent & Maintenance',
          monthlyRent: 150000,
          maintenanceCosts: 45000,
          facilities: {
            buildingRent: 150000,
            equipmentMaintenance: 25000,
            cleaningServices: 12000,
            securityServices: 8000,
            landscaping: 3000
          },
          scheduledMaintenance: 3,
          emergencyRepairs: 8000
        },
        insurance: {
          name: 'Insurance Premiums',
          annualPremium: 480000,
          monthlyAllocation: 40000,
          policies: {
            medical: { amount: 240000, employees: 85 },
            property: { amount: 120000 },
            equipment: { amount: 80000 },
            professional: { amount: 40000 },
            workers: { amount: 60000 }
          },
          renewalsDue: 2,
          claimsThisYear: 25000,
          claimsCount: 3
        },
        marketing: {
          name: 'Marketing Expenses',
          monthlyBudget: 200000,
          campaignSpending: 185000,
          utilization: 93,
          channels: {
            digital: 95000,
            print: 30000,
            events: 45000,
            branding: 15000,
            seo: 25000
          },
          activeCampaigns: 5,
          roi: 3.2
        }
      }
    },
    inventory: {
      name: 'Inventory Costs',
      icon: Package,
      totalBudget: 800000,
      spent: 542000,
      utilization: 68,
      trend: 'down',
      inventoryValue: 1200000,
      monthlyProcurement: 542000,
      stockTurnover: 2.3,
      lowStockAlerts: 25,
      expiryAlerts: 8,
      subcategories: {
        medicines: {
          name: 'Medicine Purchases',
          monthlyBudget: 400000,
          purchasesThisMonth: 385000,
          utilization: 96,
          categories: {
            emergency: { amount: 120000, items: 145 },
            general: { amount: 180000, items: 320 },
            specialized: { amount: 65000, items: 85 },
            vaccines: { amount: 20000, items: 25 }
          },
          stock: {
            inStock: 485,
            lowStock: 25,
            outOfStock: 8,
            expired: 3,
            expiredValue: 2500
          },
          topSupplier: 'MedPharma Ltd',
          deliveryTime: 3,
          qualityRating: 4.5
        },
        equipment: {
          name: 'Equipment Costs',
          equipmentValue: 2500000,
          monthlyDepreciation: 45000,
          newPurchases: 125000,
          categories: {
            medical: { amount: 1800000, items: 45 },
            it: { amount: 350000, items: 85 },
            office: { amount: 200000, items: 120 },
            facility: { amount: 150000, items: 35 }
          },
          maintenanceDue: 12,
          underWarranty: 28
        },
        consumables: {
          name: 'Consumable Supplies',
          monthlyBudget: 80000,
          consumptionRate: 2500,
          categories: {
            medical: 35000,
            office: 15000,
            cleaning: 12000,
            it: 8000,
            safety: 5000
          },
          belowMinimum: 15
        },
        contracts: {
          name: 'Maintenance Contracts',
          annualValue: 360000,
          monthlyAmortization: 30000,
          activeContracts: 15,
          categories: {
            equipmentAMC: { amount: 180000, contracts: 8 },
            software: { amount: 120000, licenses: 25 },
            service: { amount: 60000, contracts: 4 },
            support: { amount: 40000, agreements: 6 }
          },
          renewalsIn90Days: 3,
          slaCompliance: 95
        }
      }
    },
    administrative: {
      name: 'Administrative Expenses',
      icon: Clipboard,
      totalBudget: 300000,
      spent: 225000,
      utilization: 75,
      trend: 'stable',
      costPerEmployee: 2647,
      subcategories: {
        officeSupplies: {
          name: 'Office Supplies',
          monthlyAllocation: 50000,
          currentSpending: 48000,
          utilization: 96,
          categories: {
            stationery: 18000,
            computerAccessories: 12000,
            printing: 8000,
            furniture: 6000,
            breakRoom: 4000
          }
        },
        communication: {
          name: 'Communication Costs',
          monthlyBudget: 85000,
          breakdown: {
            internet: 35000,
            phone: 25000,
            mobile: 15000,
            videoConferencing: 8000,
            postal: 2000
          },
          mobileConnections: 95,
          uptime: 99.5
        },
        legalProfessional: {
          name: 'Legal & Professional Fees',
          annualBudget: 600000,
          ytdSpending: 450000,
          services: {
            legal: 180000,
            audit: 120000,
            compliance: 90000,
            tax: 60000,
            hr: 45000
          },
          activeCases: 5,
          retainerFees: 25000
        },
        bankCharges: {
          name: 'Bank Charges',
          monthlyCharges: 15000,
          breakdown: {
            transaction: 8000,
            maintenance: 3000,
            cardProcessing: 2500,
            loanInterest: 1200,
            forex: 300
          }
        }
      }
    },
    capital: {
      name: 'Capital Expenditure',
      icon: Construction,
      totalBudget: 5000000,
      spent: 2850000,
      utilization: 57,
      trend: 'up',
      approvedProjects: 8,
      pipelineValue: 1200000,
      subcategories: {
        equipmentPurchase: {
          name: 'Equipment Purchase',
          budgetAllocation: 2500000,
          purchasesYTD: 1800000,
          categories: {
            medical: 1200000,
            it: 350000,
            facility: 180000,
            vehicles: 120000
          }
        },
        facilityUpgrades: {
          name: 'Facility Upgrades',
          annualBudget: 1500000,
          currentProjects: 4,
          projects: {
            renovation: 800000,
            hvac: 350000,
            safety: 200000,
            accessibility: 150000
          }
        },
        technologyInvestments: {
          name: 'Technology Investments',
          itBudget: 800000,
          investments: {
            software: 320000,
            hardware: 280000,
            cloud: 120000,
            security: 80000,
            digital: 150000
          }
        },
        infrastructure: {
          name: 'Infrastructure Development',
          developmentBudget: 1200000,
          projects: {
            expansion: 600000,
            utilities: 300000,
            parking: 200000,
            landscaping: 100000
          }
        }
      }
    }
  };

  const recentInvoices = [
    { id: 'INV-2025-001', vendor: 'MedPharma Ltd', date: '2025-06-20', amount: 125000, category: 'Medicine Purchases', status: 'Pending Approval', approver: 'Dr. Sarah Johnson' },
    { id: 'INV-2025-002', vendor: 'TechSolutions Inc', date: '2025-06-19', amount: 85000, category: 'IT Equipment', status: 'Approved', approver: 'John Smith' },
    { id: 'INV-2025-003', vendor: 'City Electric Co', date: '2025-06-18', amount: 45000, category: 'Utility Bills', status: 'Paid', approver: 'Finance Team' },
    { id: 'INV-2025-004', vendor: 'Office Depot', date: '2025-06-17', amount: 12000, category: 'Office Supplies', status: 'Processing', approver: 'Admin Team' },
    { id: 'INV-2025-005', vendor: 'Legal Associates', date: '2025-06-16', amount: 35000, category: 'Legal Fees', status: 'Approved', approver: 'CEO' }
  ];

  const recentReceipts = [
    { id: 'RCP-001', date: '2025-06-22', amount: 2500, vendor: 'Local Pharmacy', category: 'Medical Supplies', status: 'Linked', thumbnail: FileText },
    { id: 'RCP-002', date: '2025-06-21', amount: 8500, vendor: 'Fuel Station', category: 'Vehicle Expenses', status: 'Unlinked', thumbnail: FileText },
    { id: 'RCP-003', date: '2025-06-20', amount: 1200, vendor: 'Coffee Shop', category: 'Meeting Expenses', status: 'Linked', thumbnail: FileText },
    { id: 'RCP-004', date: '2025-06-19', amount: 15000, vendor: 'Equipment Rental', category: 'Facility Maintenance', status: 'Processing', thumbnail: FileText }
  ];

  const toggleCategoryExpansion = useCallback((categoryKey) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryKey)) {
        newSet.delete(categoryKey);
      } else {
        newSet.add(categoryKey);
      }
      return newSet;
    });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending approval': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'linked': return 'bg-green-100 text-green-800';
      case 'unlinked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 75) return 'bg-yellow-500';
    return 'bg-[#156450]';
  };

  const renderHeader = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span>Financial Management</span>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900 font-medium">Expense Tracking</span>
      </div>

      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expense Tracking</h1>
            <p className="text-gray-600">Current Period: {selectedPeriod}</p>
          </div>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option>June 2025</option>
            <option>May 2025</option>
            <option>April 2025</option>
          </select>
        </div>

        {/* Budget Status Bar */}
        <div className="bg-gray-50 rounded-lg p-4 min-w-96">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Monthly Budget Utilization</span>
            <span className="text-sm font-bold text-gray-900">{budgetData.budgetUtilization}% used</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full ${getUtilizationColor(budgetData.budgetUtilization)}`}
              style={{ width: `${budgetData.budgetUtilization}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{formatCurrency(budgetData.remainingBudget)} remaining</span>
            <span>{budgetData.daysRemaining} days left</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Ticker */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-[#e6efed] rounded-lg p-3">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-[#156450] mr-2" />
            <div>
              <p className="text-xs text-[#156450] font-medium">Today's Expenses</p>
              <p className="text-lg font-bold text-[#156450] font-semibold">{formatCurrency(budgetData.todayExpenses)}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-xs text-yellow-600 font-medium">Pending Approvals</p>
              <p className="text-lg font-bold text-yellow-900">{budgetData.pendingApprovals}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-3">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <p className="text-xs text-red-600 font-medium">Overdue Payments</p>
              <p className="text-lg font-bold text-red-900">{budgetData.overduePayments}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#e6efed] rounded-lg p-3">
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-[#156450] mr-2" />
            <div>
              <p className="text-xs text-[#156450] font-medium">Daily Burn Rate</p>
              <p className="text-lg font-bold text-[#156450] font-semibold">{formatCurrency(budgetData.burnRate)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabNavigation = () => (
    <div className="bg-white border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {[
          { id: 'categories', name: 'Expense Categories', icon: BarChart3 },
          { id: 'entry', name: 'Expense Entry & Approval', icon: Plus },
          { id: 'documentation', name: 'Expense Documentation', icon: FileText },
          { id: 'analytics', name: 'Analytics & Reports', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab.id
                ? 'border-[#156450] text-[#156450]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <tab.icon className="h-5 w-5 mr-2" />
            {tab.name}
          </button>
        ))}
      </nav>
    </div>
  );

  const renderCategoryCard = (categoryKey, category) => {
    const isExpanded = expandedCategories.has(categoryKey);
    const IconComponent = category.icon;
    
    return (
      <div key={categoryKey} className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div 
          className="p-6 cursor-pointer hover:bg-gray-50"
          onClick={() => toggleCategoryExpansion(categoryKey)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IconComponent className="h-8 w-8 text-[#156450] mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">
                  {formatCurrency(category.spent)} of {formatCurrency(category.totalBudget)} used
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center">
                  {category.trend === 'up' ? (
                    <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
                  ) : category.trend === 'down' ? (
                    <TrendingDown className="h-6 w-6 text-green-500 mr-2" />
                  ) : (
                    <Activity className="h-6 w-6 text-gray-500 mr-2" />
                  )}
                  <span className="text-xl font-bold text-gray-900">{category.utilization}%</span>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className={`h-2 rounded-full ${getUtilizationColor(category.utilization)}`}
                    style={{ width: `${category.utilization}%` }}
                  ></div>
                </div>
              </div>
              {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t border-gray-200 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {Object.entries(category.subcategories).map(([subKey, subcategory]) => (
                <div key={subKey} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{subcategory.name}</h4>
                  
                  {/* Subcategory specific content based on type */}
                  {subKey === 'staffSalaries' && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium">{formatCurrency(subcategory.budgetAllocated)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Spent:</span>
                        <span className="font-medium">{formatCurrency(subcategory.actualSpent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employees:</span>
                        <span className="font-medium">{subcategory.employeeCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Salary:</span>
                        <span className="font-medium">{formatCurrency(subcategory.averageSalary)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overtime:</span>
                        <span className="font-medium">{formatCurrency(subcategory.overtimeCosts)}</span>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          Employees
                        </button>
                        <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                          <DollarSign className="h-3 w-3 mr-1" />
                          Payroll
                        </button>
                      </div>
                    </div>
                  )}

                  {subKey === 'utilityBills' && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Budget:</span>
                        <span className="font-medium">{formatCurrency(subcategory.budgetAllocated)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Month:</span>
                        <span className="font-medium">{formatCurrency(subcategory.currentMonth)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        {Object.entries(subcategory.bills).map(([billType, bill]) => (
                          <div key={billType} className="flex justify-between">
                            <span className="text-gray-600 capitalize">{billType}:</span>
                            <span className="font-medium">{formatCurrency(bill.amount)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                          <FileText className="h-3 w-3 mr-1" />
                          Bills
                        </button>
                        <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                          <CreditCard className="h-3 w-3 mr-1" />
                          Pay
                        </button>
                      </div>
                    </div>
                  )}

                  {subKey === 'medicines' && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium">{formatCurrency(subcategory.monthlyBudget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchases:</span>
                        <span className="font-medium">{formatCurrency(subcategory.purchasesThisMonth)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">In Stock:</span>
                          <span className="font-medium">{subcategory.stock.inStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Low Stock:</span>
                          <span className="font-medium text-yellow-600">{subcategory.stock.lowStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Out of Stock:</span>
                          <span className="font-medium text-red-600">{subcategory.stock.outOfStock}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded flex items-center">
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Order
                        </button>
                        <button className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Alerts
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Default subcategory display for others */}
                  {!['staffSalaries', 'utilityBills', 'medicines'].includes(subKey) && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium">
                          {formatCurrency(subcategory.budgetAllocated || subcategory.monthlyBudget || subcategory.annualBudget || 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Utilization:</span>
                        <span className="font-medium">{subcategory.utilization || 0}%</span>
                      </div>
                      {subcategory.utilization && (
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full ${getUtilizationColor(subcategory.utilization)}`}
                            style={{ width: `${subcategory.utilization}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderExpenseEntryForm = () => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">New Expense Entry</h3>
      
      {/* Quick Entry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expense Type</label>
          <div className="space-y-2">
            {[
              { id: 'operational', label: 'Operational Expense', icon: Building },
              { id: 'inventory', label: 'Inventory Purchase', icon: Package },
              { id: 'administrative', label: 'Administrative Expense', icon: Clipboard },
              { id: 'capital', label: 'Capital Expenditure', icon: Construction }
            ].map((type) => (
              <label key={type.id} className="flex items-center">
                <input
                  type="radio"
                  name="expenseType"
                  value={type.id}
                  checked={selectedExpenseType === type.id}
                  onChange={(e) => setSelectedExpenseType(e.target.value)}
                  className="mr-2"
                />
                <type.icon className="h-4 w-4 mr-2 text-[#156450]" />
                <span className="text-sm">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
            <input
              type="number"
              className="pl-8 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
          <div className="flex">
            <select className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-[#156450] focus:border-[#156450]">
              <option>Select vendor...</option>
              <option>MedPharma Ltd</option>
              <option>TechSolutions Inc</option>
              <option>City Electric Co</option>
              <option>Office Depot</option>
            </select>
            <button 
              onClick={() => setShowNewVendorModal(true)}
              className="px-3 py-2 bg-[#156450] text-white rounded-r-md hover:bg-[#0e4e3d]"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]">
            <option>Select category...</option>
            <option>Staff Salaries</option>
            <option>Utility Bills</option>
            <option>Medicine Purchases</option>
            <option>Office Supplies</option>
          </select>
        </div>
      </div>

      {/* Detailed Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expense Date</label>
          <input
            type="date"
            defaultValue="2025-06-22"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reference Number</label>
          <input
            type="text"
            placeholder="Invoice/Receipt number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="Expense description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]">
            <option>Operations</option>
            <option>Finance</option>
            <option>Admin</option>
            <option>IT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]">
            <option>Normal</option>
            <option>High</option>
            <option>Emergency</option>
          </select>
        </div>
      </div>

      {/* Document Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <button className="text-[#156450] hover:text-[#0e4e3d]">
              <span className="font-medium">Click to upload</span> or drag and drop
            </button>
            <p className="text-sm text-gray-500">PDF, PNG, JPG up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]">
            <option>Bank Transfer</option>
            <option>Cash Payment</option>
            <option>Credit Card</option>
            <option>Digital Payment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]">
            <option>Immediate</option>
            <option>Net 30 days</option>
            <option>Net 60 days</option>
            <option>Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Save as Draft
        </button>
        <button className="px-4 py-2 bg-[#156450] text-white rounded-md hover:bg-[#0e4e3d]">
          Submit for Approval
        </button>
      </div>
    </div>
  );

  const renderInvoiceManagement = () => (
    <div className="space-y-6">
      {/* Invoice Dashboard */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Management</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-[#e6efed] rounded-lg p-4">
            <div className="text-2xl font-bold text-[#156450] font-semibold">245</div>
            <div className="text-sm text-[#156450]">Total Invoices</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-900">12</div>
            <div className="text-sm text-yellow-600">Pending Processing</div>
          </div>
          <div className="bg-[#e6efed] rounded-lg p-4">
            <div className="text-2xl font-bold text-[#156450] font-semibold">185</div>
            <div className="text-sm text-[#156450]">Processed This Month</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-900">3.2</div>
            <div className="text-sm text-purple-600">Avg Processing Days</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-900">₹12.5L</div>
            <div className="text-sm text-red-600">Outstanding Payments</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentInvoices.filter(invoice => 
                searchTerm === '' || 
                invoice.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                      <div className="text-sm text-gray-500">{invoice.date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.vendor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.amount)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-[#156450] hover:text-[#156450] font-semibold">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-[#156450] hover:text-[#156450] font-semibold">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Storage */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Receipt Storage</h3>
          <button className="flex items-center px-3 py-2 bg-[#156450] text-white rounded-md hover:bg-[#0e4e3d]">
            <Camera className="h-4 w-4 mr-2" />
            Quick Capture
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {recentReceipts.map((receipt) => {
            const ThumbnailIcon = receipt.thumbnail;
            return (
              <div key={receipt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md">
                <div className="text-center mb-3">
                  <ThumbnailIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <div className="text-sm font-medium text-gray-900">{receipt.id}</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{receipt.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">{formatCurrency(receipt.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vendor:</span>
                    <span className="truncate">{receipt.vendor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-1 py-0.5 text-xs rounded ${getStatusColor(receipt.status)}`}>
                      {receipt.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">View</button>
                  <button className="flex-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Link</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Analytics & Reports</h3>
        
        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#156450] to-[#0e4e3d] rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Total Expenses YTD</p>
                <p className="text-3xl font-bold">₹1.85Cr</p>
                <p className="text-white text-sm">+12% vs last year</p>
              </div>
              <TrendingUp className="h-12 w-12 text-white opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#156450] to-[#0e4e3d] rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Cost Savings</p>
                <p className="text-3xl font-bold">₹12.5L</p>
                <p className="text-white text-sm">8% reduction achieved</p>
              </div>
              <TrendingDown className="h-12 w-12 text-white opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Avg Processing Time</p>
                <p className="text-3xl font-bold">2.8 days</p>
                <p className="text-purple-100 text-sm">-1.2 days improved</p>
              </div>
              <Clock className="h-12 w-12 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Charts and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4">Monthly Expense Trend</h4>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Interactive Chart Component</p>
                <p className="text-sm">Monthly expense trending data</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4">Category Breakdown</h4>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center text-gray-500">
                <PieChart className="h-12 w-12 mx-auto mb-2" />
                <p>Pie Chart Component</p>
                <p className="text-sm">Expense category distribution</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4">Budget vs Actual</h4>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Bar Chart Component</p>
                <p className="text-sm">Budget variance analysis</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-4">Vendor Performance</h4>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-2" />
                <p>Vendor Metrics</p>
                <p className="text-sm">Delivery time, quality, cost analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Generation */}
        <div className="mt-8 border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Generate Reports</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <FileText className="h-6 w-6 mr-2 text-[#156450]" />
              <span>Monthly Report</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <BarChart3 className="h-6 w-6 mr-2 text-[#156450]" />
              <span>Budget Analysis</span>
            </button>
            <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
              <TrendingUp className="h-6 w-6 mr-2 text-purple-600" />
              <span>Trend Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // New Vendor Modal
  const NewVendorModal = () => {
    if (!showNewVendorModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Add New Vendor</h3>
            <button 
              onClick={() => setShowNewVendorModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
                placeholder="Enter business name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
                placeholder="Contact person name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
                placeholder="vendor@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
                placeholder="+91 12345 67890"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
                placeholder="Complete business address"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]"
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#156450] focus:border-[#156450]">
                <option>Net 30 days</option>
                <option>Net 60 days</option>
                <option>Immediate</option>
                <option>Custom</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button 
              onClick={() => setShowNewVendorModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#156450] text-white rounded-md hover:bg-[#0e4e3d]">
              Add Vendor
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      {/* Main column */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <HeaderBar pageTitle="Finance Management" pageSubtitle="Expense Tracking" />
        {renderTabNavigation()}
        <div className="flex-1 overflow-auto p-6">
      {/* Main content area rendered below */}
      
      <div className="p-6">
        {activeTab === 'categories' && (
          <div className="space-y-6">
            {/* Budget Overview */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Budget Allocation Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(budgetData.totalMonthlyBudget)}</div>
                  <div className="text-sm text-gray-600">Total Monthly Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#156450]">{budgetData.budgetUtilization}%</div>
                  <div className="text-sm text-gray-600">Budget Utilization</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#156450]">{formatCurrency(budgetData.remainingBudget)}</div>
                  <div className="text-sm text-gray-600">Remaining Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{budgetData.daysRemaining}</div>
                  <div className="text-sm text-gray-600">Days Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{formatCurrency(budgetData.burnRate)}</div>
                  <div className="text-sm text-gray-600">Daily Burn Rate</div>
                </div>
              </div>
            </div>

            {/* Expense Categories */}
            <div className="space-y-4">
              {Object.entries(expenseCategories).map(([key, category]) => 
                renderCategoryCard(key, category)
              )}
            </div>
          </div>
        )}

        {activeTab === 'entry' && (
          <div className="space-y-6">
            {renderExpenseEntryForm()}
            
            {/* Recent Submissions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Submissions</h3>
              <div className="space-y-3">
                {recentInvoices.slice(0, 3).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#156450] rounded-full"></div>
                      <div>
                        <div className="font-medium text-gray-900">{invoice.id}</div>
                        <div className="text-sm text-gray-600">{invoice.vendor} • {formatCurrency(invoice.amount)}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documentation' && renderInvoiceManagement()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>

      {/* Modal */}
      <NewVendorModal />
    </div>
  </div>
</div>
  );
};

export default ExpenseTracking;