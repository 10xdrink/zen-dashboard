import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  LayoutGrid,
  RefreshCcw,
  Shuffle,
  CheckCircle,
  X,
  Users,
  UserCheck,
  Package,
  DollarSign,
  BarChart2,
  Settings,
  HelpCircle,
  MessageSquare,
  Activity,
  FileText,
  Bell,
  ShieldCheck,
  Link2,
  Home,
  Clock,
  List,
  UserPlus,
  FileText as FileTextIcon,
  MessageCircle,
  Database,
  ClipboardCheck,
  CalendarClock,
  CreditCard,
  ShoppingCart,
  Truck,
  Layers,
  PlusCircle,
  PieChart,
  BarChart,
  LineChart,
  AlertTriangle,
  Send,
  Gift,
  Award,
  FileBarChart,
  Sliders,
  UserCog,
  Lock,
  Zap,
  HelpCircle as HelpCircleIcon
} from 'lucide-react';

type MenuItem = {
  title: string;
  icon: React.ReactNode;
  path?: string;
  submenu?: MenuItem[];
  expanded?: boolean;
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      title: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      path: '/dashboard',
    },
    {
      title: 'Appointments',
      icon: <Calendar className="h-5 w-5" />,
      expanded: false,
      submenu: [
        {
          title: 'Booking',
          icon: <PlusCircle className="h-4 w-4" />,
          expanded: false,
          submenu: [
            { title: 'New Appointment', icon: <PlusCircle className="h-3 w-3" />, path: '/appointments/booking/new' },
            { title: 'Modifications', icon: <RefreshCcw className="h-3 w-3" />, path: '/appointments/booking/modifications' },
            { title: 'Bulk Operations', icon: <Layers className="h-3 w-3" />, path: '/appointments/booking/bulk' },
          ],
        },
        {
          title: 'Dashboard',
          icon: <LayoutGrid className="h-4 w-4" />,
          path: '/appointments/dashboard/overview',
        },
        {
          title: 'Waitlist',
          icon: <Shuffle className="h-4 w-4" />,
          path: '/appointments/waitlist',
        },
        {
          title: 'Analytics',
          icon: <PieChart className="h-4 w-4" />,
          path: '/appointments/analytics',
        },
      ],
    },
    {
      title: 'Patients',
      icon: <Users className="h-5 w-5" />,
      expanded: false,
      submenu: [
        {
          title: 'Patient Registration',
          icon: <UserPlus className="h-4 w-4" />,
          expanded: false,
          submenu: [
            { title: 'New Patient Entry', icon: <UserPlus className="h-3 w-3" />, path: '/patients/registration/new' },
            { title: 'Quick Registration', icon: <Zap className="h-3 w-3" />, path: '/patients/registration/quick' },
          ],
        },
        { title: 'Patient Database', icon: <Database className="h-4 w-4" />, path: '/patients/database' },
        { title: 'Communication', icon: <MessageCircle className="h-4 w-4" />, path: '/patients/communication' },
        { title: 'Analytics', icon: <PieChart className="h-4 w-4" />, path: '/patients/analytics' },
      ],
    },
    {
      title: 'Staff Management',
      icon: <UserCheck className="h-5 w-5" />,
      expanded: false,
      submenu: [
        { title: 'Employee List', icon: <Users className="h-4 w-4" />, path: '/staff/employees' },
        { title: 'Attendance', icon: <ClipboardCheck className="h-4 w-4" />, path: '/staff/attendance' },
        { title: 'Scheduling', icon: <CalendarClock className="h-4 w-4" />, path: '/staff/scheduling' },
        { title: 'Leave Management', icon: <FileTextIcon className="h-4 w-4" />, path: '/staff/leave' },
        { title: 'Payroll', icon: <DollarSign className="h-4 w-4" />, path: '/staff/payroll' },
      ],
    },
    {
      title: 'Inventory',
      icon: <Package className="h-5 w-5" />,
      expanded: false,
      submenu: [
        {
          title: 'Product Catalog',
          icon: <Package className="h-4 w-4" />,
          expanded: false,
          submenu: [
            {
              title: 'Categories',
              path: '/inventory/product-catalog/categories',
              icon: <List className="h-4 w-4" />,
              expanded: false,
              submenu: [
                { title: 'Medicines', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/categories/medicines' },
                { title: 'Beauty Products', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/categories/beauty-products' },
                { title: 'Medical Equipment', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/categories/medical-equipment' },
                { title: 'Clinic Supplies', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/categories/clinic-supplies' },
              ],
            },
            { title: 'Add New Product', icon: <PlusCircle className="h-4 w-4" />, path: '/inventory/product-catalog/add-product' },
            {
              title: 'Product Actions',
              path: '/inventory/product-catalog/actions',
              icon: <Settings className="h-4 w-4" />,
              expanded: false,
              submenu: [
                { title: 'Edit Product', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/actions/edit' },
                { title: 'Update Pricing', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/actions/pricing' },
                { title: 'Manage Stock Levels', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/actions/stock' },
                { title: 'Product History', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/actions/history' },
                { title: 'Archive Products', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/product-catalog/actions/archive' },
              ],
            },
          ],
        },
        {
          title: 'Stock Management',
          icon: <Layers className="h-4 w-4" />,
          expanded: false,
          submenu: [
            { title: 'Current Stock', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/stock/current' },
            { title: 'Stock Adjustments', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/stock/adjustments' },
            { title: 'Expiry Management', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/stock/expiry' },
            { title: 'Stock Valuation', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/stock/valuation' },
          ],
        },
        {
          title: 'Procurement',
          icon: <Truck className="h-4 w-4" />,
          expanded: false,
          submenu: [
            { title: 'Vendor Management', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/procurement/vendors' },
            { title: 'Purchase Orders', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/procurement/purchase-orders' },
            { title: 'Goods Receipt', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/procurement/goods-receipt' },
            { title: 'Payments', icon: <ChevronRight className="h-3 w-3" />, path: '/inventory/procurement/payments' },
          ],
        },
      ],
    },
    {
      title: 'Finance',
      icon: <DollarSign className="h-5 w-5" />,
      expanded: false,
      submenu: [
        {
          title: 'Revenue & Collections',
          icon: <DollarSign className="h-4 w-4" />,
          expanded: false,
          submenu: [
            {
              title: 'Daily Collections',
              icon: <CreditCard className="h-3 w-3" />,
              path: '/finance/revenue/daily/dashboard/today',
              expanded: false,
              submenu: [
                {
                  title: 'Collection Dashboard',
                  icon: <LayoutGrid className="h-3 w-3" />,
                  expanded: false,
                  submenu: [
                    { title: "Today's Total", icon: <DollarSign className="h-3 w-3" />, path: '/finance/revenue/daily/dashboard/today' },
                    {
                      title: 'Payment Method Breakdown',
                      icon: <PieChart className="h-3 w-3" />,
                      expanded: false,
                      submenu: [
                        { title: 'Cash Payments', icon: <DollarSign className="h-3 w-3" />, path: '/finance/revenue/daily/payment/cash' },
                        { title: 'Card Payments', icon: <CreditCard className="h-3 w-3" />, path: '/finance/revenue/daily/payment/card' },
                        { title: 'UPI Transactions', icon: <Send className="h-3 w-3" />, path: '/finance/revenue/daily/payment/upi' },
                        { title: 'Bank Transfers', icon: <Layers className="h-3 w-3" />, path: '/finance/revenue/daily/payment/bank' },
                        { title: 'Digital Wallet Payments', icon: <Gift className="h-3 w-3" />, path: '/finance/revenue/daily/payment/wallet' },
                      ],
                    },
                    { title: 'Service-wise Revenue', icon: <BarChart className="h-3 w-3" />, path: '/finance/revenue/daily/service' },
                    { title: 'Doctor-wise Collection', icon: <Users className="h-3 w-3" />, path: '/finance/revenue/daily/doctor' },
                    { title: 'Outstanding Dues', icon: <AlertTriangle className="h-3 w-3" />, path: '/finance/revenue/daily/outstanding' },
                  ],
                },
                { title: 'Payment Processing', icon: <ShoppingCart className="h-3 w-3" />, path: '/finance/revenue/payment-processing' },
                { title: 'Outstanding Management', icon: <AlertTriangle className="h-3 w-3" />, path: '/finance/revenue/outstanding' },
                { title: 'Daily Closing', icon: <Clock className="h-3 w-3" />, path: '/finance/revenue/closing' },
              ],
            },
            { title: 'Revenue Analysis', icon: <BarChart2 className="h-3 w-3" />, path: '/finance/revenue/analysis' },
            { title: 'Financial Reporting', icon: <FileBarChart className="h-3 w-3" />, path: '/finance/revenue/reporting' },
          ],
        },
        {
          title: 'Expense Management',
          icon: <CreditCard className="h-4 w-4" />,
          expanded: false,
          submenu: [
            { title: 'Expense Tracking', icon: <ClipboardCheck className="h-3 w-3" />, path: '/finance/expenses/tracking' },
            { title: 'Budget Management', icon: <PieChart className="h-3 w-3" />, path: '/finance/expenses/budget' },
            { title: 'Cost Analysis', icon: <BarChart2 className="h-3 w-3" />, path: '/finance/expenses/cost-analysis' },
          ],
        },
        { title: 'Financial Dashboards', icon: <LayoutGrid className="h-4 w-4" />, path: '/finance/dashboards' },
      ],
    },
    {
      title: 'Marketing',
      icon: <BarChart2 className="h-5 w-5" />,
      expanded: false,
      submenu: [
        { title: 'Campaigns', icon: <Send className="h-4 w-4" />, path: '/marketing/campaigns' },
        { title: 'Promotions', icon: <Gift className="h-4 w-4" />, path: '/marketing/promotions' },
        { title: 'Loyalty Program', icon: <Award className="h-4 w-4" />, path: '/marketing/loyalty' },
        { title: 'Analytics', icon: <BarChart className="h-4 w-4" />, path: '/marketing/analytics' },
      ],
    },
    {
      title: 'Reports',
      icon: <FileText className="h-5 w-5" />,
      expanded: false,
      submenu: [
        { title: 'Standard Reports', icon: <FileText className="h-4 w-4" />, path: '/reports/standard' },
        { title: 'Custom Reports', icon: <FileText className="h-4 w-4" />, path: '/reports/custom' },
        { title: 'Analytics', icon: <LineChart className="h-4 w-4" />, path: '/reports/analytics' },
        { title: 'Export', icon: <FileBarChart className="h-4 w-4" />, path: '/reports/export' },
      ],
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      expanded: false,
      submenu: [
        { title: 'System Configuration', icon: <Sliders className="h-4 w-4" />, path: '/settings/system' },
        { title: 'User Management', icon: <UserCog className="h-4 w-4" />, path: '/settings/users' },
        { title: 'Compliance', icon: <ShieldCheck className="h-4 w-4" />, path: '/settings/compliance' },
        { title: 'Integration', icon: <Link2 className="h-4 w-4" />, path: '/settings/integration' },
      ],
    },
    {
      title: 'Support',
      icon: <HelpCircle className="h-5 w-5" />,
      expanded: false,
      submenu: [
        { title: 'Help Center', icon: <HelpCircleIcon className="h-4 w-4" />, path: '/support/help' },
        { title: 'Training', icon: <FileText className="h-4 w-4" />, path: '/support/training' },
        { title: 'Contact Support', icon: <MessageSquare className="h-4 w-4" />, path: '/support/contact' },
        { title: 'System Status', icon: <Activity className="h-4 w-4" />, path: '/support/status' },
      ],
    },
  ]);

  const toggleSubmenu = (index: number) => {
    const updated = [...menuItems];
    updated[index].expanded = !updated[index].expanded;
    setMenuItems(updated);
  };

  const toggleNestedSubmenu = (parent: number, sub: number) => {
    const updated = [...menuItems];
    const item = updated[parent];
    if (item.submenu && item.submenu[sub]) {
      item.submenu[sub].expanded = !item.submenu[sub].expanded;
    }
    setMenuItems(updated);
  };

  // Auto-expand submenu when a child route is active
  useEffect(() => {
    const currentPath = location.pathname;
    
    const updatedMenuItems = menuItems.map(item => {
      // Check if this menu item has submenu items
      if (item.submenu) {
        // Check if any submenu item's path matches the current path
        const hasActiveChild = item.submenu.some(subItem => 
          currentPath.startsWith(subItem.path || '#')
        );
        
        // If a child is active, expand the parent menu
        if (hasActiveChild) {
          return { ...item, expanded: true };
        }
      }
      return item;
    });
    
    setMenuItems(updatedMenuItems);
  }, [location.pathname]);
  
  // Check if a menu item is active
  const isActive = (path: string | undefined) => {
    if (!path || path === '#') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen bg-white border-r border-gray-200 w-64 flex flex-col overflow-hidden shadow-sm">
      <a href="/">
      <div className="p-4 border-b border-gray-200 flex items-center justify-center">
        <img 
          src="https://res.cloudinary.com/dgcpuirdo/image/upload/v1749817496/zennara_logo_wtk8lz.png" 
          alt="Zennara Logo" 
          className="h-24 w-auto"
        />
      </div>
      </a>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-2">
          {menuItems.map((item, index) => (
            <div key={index} className="mb-2">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 font-medium ${item.submenu?.some(subItem => isActive(subItem.path)) ? 'bg-[#15645015] text-[#156450]' : 'text-gray-700 hover:bg-[#15645015] hover:text-[#156450]'}`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    {item.expanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {item.expanded && item.submenu && (
                    <div className="ml-6 mt-2 space-y-1 border-l-2 border-[#15645030] pl-2">
                      {item.submenu.map((subItem, subIndex) => (
                        subItem.submenu ? (
                          <div key={subIndex} className="mb-1">
                            <button
                              onClick={() => toggleNestedSubmenu(index, subIndex)}
                              className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-all duration-200 ${subItem.submenu?.some(child => isActive(child.path)) ? 'bg-[#15645015] text-[#156450]' : 'text-gray-600 hover:bg-[#15645015] hover:text-[#156450]'}`}
                            >
                              <span className="flex items-center">
                                {subItem.icon}
                                <span className="ml-2">{subItem.title}</span>
                              </span>
                              {subItem.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </button>
                            {subItem.expanded && (
                              <div className="ml-4 mt-1 space-y-1 border-l border-[#15645020] pl-2">
                                {subItem.submenu.map((child, childIndex) => (
                                  <Link
                                    key={childIndex}
                                    to={child.path || '#'}
                                    className={`flex items-center p-2 text-sm rounded-md transition-colors duration-200 ${isActive(child.path) ? 'bg-[#15645015] text-[#156450] font-medium' : 'text-gray-600 hover:bg-[#15645015] hover:text-[#156450]'}`}
                                  >
                                    {child.icon}
                                    <span className="ml-2">{child.title}</span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link
                            key={subIndex}
                            to={subItem.path || '#'}
                            className={`flex items-center p-2 text-sm transition-colors duration-200 rounded-md ${isActive(subItem.path) ? 'bg-[#15645015] text-[#156450] font-medium' : 'text-gray-600 hover:bg-[#15645015] hover:text-[#156450]'}`}
                          >
                            {subItem.icon}
                            <span className="ml-2">{subItem.title}</span>
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.path || '#'}
                  className={`flex items-center p-3 rounded-lg transition-all duration-200 font-medium ${isActive(item.path) ? 'bg-[#15645015] text-[#156450]' : 'text-gray-700 hover:bg-[#15645015] hover:text-[#156450]'}`}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <div className="bg-[#15645020] text-[#156450] p-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
            <Bell className="h-5 w-5" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Notifications</p>
            <p className="text-xs text-gray-500">3 unread</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
