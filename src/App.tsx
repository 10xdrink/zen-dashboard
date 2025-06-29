import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StaffDatabase from "./pages/staff/Database";
import EmployeeList from "./pages/staff/EmployeeList";
import AddEmployee from "./pages/staff/AddEmployee";
import EmployeeProfile from "./pages/staff/EmployeeProfile";
import Attendance from "./pages/staff/Attendance";
import Scheduling from "./pages/staff/Scheduling";
import LeaveManagement from "./pages/staff/LeaveManagement";
import PayrollPage from "./pages/staff/Payroll";

// Inventory pages
import Placeholder from '@/pages/Placeholder';
import FinancialReporting from '@/pages/finance/reporting/FinancialReporting';
import RevenueAnalysis from '@/pages/finance/revenue/RevenueAnalysis';
import ExpenseTracking from '@/pages/finance/expense/ExpenseTracking';
import BudgetManagement from '@/pages/finance/budget/BudgetManagement';
import CategoryManagement from "@/pages/inventory/categories/CategoryManagement";
import CurrentStock from "./pages/inventory/stock/CurrentStock";
import StockAdjustments from "./pages/inventory/stock/StockAdjustments";
import ExpiryManagement from "./pages/inventory/stock/ExpiryManagement";
import StockValuation from "./pages/inventory/stock/StockValuation";
import VendorManagement from "./pages/inventory/procurement/VendorManagement";
import PurchaseOrders from "./pages/inventory/procurement/PurchaseOrders";
import GoodsReceipt from "./pages/inventory/procurement/GoodsReceipt";
// Patient pages
import NewPatient from "@/pages/patients/registration/NewPatient";
import QuickRegistration from "@/pages/patients/registration/QuickRegistration";
import PatientCommunication from "@/pages/patients/communication/PatientCommunication";
import NewAppointment from "@/pages/appointments/booking/NewAppointment";
import ManageAppointments from "@/pages/appointments/manage/ManageAppointments";
import AppointmentModifications from "@/pages/appointments/booking/AppointmentModifications";
import BulkAppointmentOperations from "@/pages/appointments/booking/BulkAppointmentOperations";
import AppointmentDashboard from "@/pages/appointments/dashboard/AppointmentDashboard";
import WaitlistManagement from "@/pages/appointments/waitlist/WaitlistManagement";
import PatientDatabase from "@/pages/patients/PatientDatabase";
import PaymentsPage from "./pages/inventory/procurement/Payments";
import AddProduct from "@/pages/inventory/AddProduct";
import EditProduct from "@/pages/inventory/EditProduct";
import ProductCatalog from "@/pages/inventory/product-catalog/ProductCatalog";
import AppointmentAnalytics from "@/pages/appointments/analytics/AppointmentAnalytics";

// Finance - Collections phase 1
import CollectionDashboard from "@/pages/finance/collections/dashboard/CollectionDashboard";
import PaymentMethodBreakdown from "@/pages/finance/collections/dashboard/PaymentMethodBreakdown";
import ServiceRevenue from "@/pages/finance/collections/dashboard/ServiceRevenue";
import DoctorCollection from "@/pages/finance/collections/dashboard/DoctorCollection";
import OutstandingDues from "@/pages/finance/collections/dashboard/OutstandingDues";
import ServicePaymentEntry from "@/pages/finance/collections/payment/ServicePaymentEntry";
import PackagePayment from "@/pages/finance/collections/payment/PackagePayment";
import AdvancePayment from "@/pages/finance/collections/payment/AdvancePayment";
import RefundProcessing from "@/pages/finance/collections/payment/RefundProcessing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Staff Management Routes */}
              <Route path="/staff/employees" element={<EmployeeList />} />
              <Route path="/staff/employees/add" element={<AddEmployee />} />
              <Route path="/staff/employees/:id" element={<EmployeeProfile />} />
              <Route path="/staff/attendance" element={<Attendance />} />
              <Route path="/staff/scheduling" element={<Scheduling />} />
              <Route path="/staff/leave" element={<LeaveManagement />} />
              <Route path="/staff/payroll" element={<PayrollPage />} />
              
              {/* Inventory - Product Catalog */}
              <Route path="/inventory/product-catalog" element={<ProductCatalog />} />
              <Route path="/inventory/product-catalog/add-product" element={<AddProduct />} />
              <Route path="/inventory/product-catalog/edit/:id" element={<EditProduct />} />
              <Route path="/inventory/product-catalog/add-product/*" element={<AddProduct />} />

              {/* Product Actions root */}
              <Route path="/inventory/product-catalog/actions" element={<ProductCatalog />} />
              {/* Product actions placeholders */}
              <Route path="/inventory/product-catalog/actions/edit" element={<Placeholder title="Edit Product" />} />
              <Route path="/inventory/product-catalog/actions/pricing" element={<Placeholder title="Update Pricing" />} />
              <Route path="/inventory/product-catalog/actions/stock" element={<Placeholder title="Manage Stock Levels" />} />
              <Route path="/inventory/product-catalog/actions/history" element={<Placeholder title="Product History" />} />
              <Route path="/inventory/product-catalog/actions/archive" element={<Placeholder title="Archive Products" />} />

              {/* Stock management placeholders */}
              <Route path="/inventory/stock/current" element={<CurrentStock />} />
              <Route path="/inventory/stock/adjustments" element={<StockAdjustments />} />
              <Route path="/inventory/stock/expiry" element={<ExpiryManagement />} />
              <Route path="/inventory/stock/valuation" element={<StockValuation />} />

              {/* Procurement placeholders */}
              <Route path="/inventory/procurement/vendors" element={<VendorManagement />} />
              <Route path="/inventory/procurement/purchase-orders" element={<PurchaseOrders />} />
              <Route path="/inventory/procurement/goods-receipt" element={<GoodsReceipt />} />
              <Route path="/inventory/procurement/payments" element={<PaymentsPage />} />

              {/* Categories root */}
              <Route path="/inventory/product-catalog/categories" element={<CategoryManagement />} />
              {/* Categories placeholders */}
              <Route path="/appointments/booking/new" element={<NewAppointment />} />
              <Route path="/appointments/booking/modifications" element={<AppointmentModifications />} />
              <Route path="/appointments/booking/bulk" element={<BulkAppointmentOperations />} />
              <Route path="/appointments/manage" element={<ManageAppointments />} />
              <Route path="/appointments/dashboard/overview" element={<AppointmentDashboard />} />
              <Route path="/appointments/dashboard/daily" element={<AppointmentDashboard />} />
              <Route path="/appointments/dashboard/status" element={<AppointmentDashboard />} />
              <Route path="/appointments/dashboard/live" element={<AppointmentDashboard />} />
              <Route path="/appointments/waitlist" element={<WaitlistManagement />} />
              <Route path="/appointments/waitlist/registration" element={<WaitlistManagement />} />
              <Route path="/appointments/waitlist/auto" element={<WaitlistManagement />} />
              <Route path="/appointments/waitlist/admin" element={<WaitlistManagement />} />
              <Route path="/appointments/analytics" element={<AppointmentAnalytics />} />
              <Route path="/appointments/analytics/bookings" element={<AppointmentAnalytics />} />
              <Route path="/appointments/analytics/noshow" element={<AppointmentAnalytics />} />
              <Route path="/appointments/analytics/capacity" element={<AppointmentAnalytics />} />
              <Route path="/inventory/product-catalog/categories/beauty-products" element={<Placeholder title="Beauty Products" />} />
              <Route path="/inventory/product-catalog/categories/medical-equipment" element={<Placeholder title="Medical Equipment" />} />
              <Route path="/inventory/product-catalog/categories/clinic-supplies" element={<Placeholder title="Clinic Supplies" />} />

              {/* Finance - Collections */}
              <Route path="/finance/revenue/daily/dashboard/today" element={<CollectionDashboard />} />
              <Route path="/finance/revenue/daily/payment/cash" element={<PaymentMethodBreakdown />} />
              <Route path="/finance/revenue/daily/payment/card" element={<PaymentMethodBreakdown />} />
              <Route path="/finance/revenue/daily/payment/upi" element={<PaymentMethodBreakdown />} />
              <Route path="/finance/revenue/daily/service" element={<ServiceRevenue />} />
              <Route path="/finance/revenue/daily/doctor" element={<DoctorCollection />} />
              <Route path="/finance/revenue/daily/outstanding" element={<OutstandingDues />} />
              <Route path="/finance/revenue/payment-processing/service" element={<ServicePaymentEntry />} />
              <Route path="/finance/revenue/payment-processing/package" element={<PackagePayment />} />
              <Route path="/finance/revenue/payment-processing/advance" element={<AdvancePayment />} />
              <Route path="/finance/revenue/payment-processing/refund" element={<RefundProcessing />} />

              {/* Finance - Additional placeholders */}
              <Route path="/finance/revenue/analysis" element={<RevenueAnalysis />} />
              <Route path="/finance/revenue/reporting" element={<FinancialReporting />} />
              <Route path="/finance/expenses/tracking" element={<ExpenseTracking />} />
              <Route path="/finance/expenses/budget" element={<BudgetManagement />} />
              <Route path="/finance/expenses/cost-analysis" element={<Placeholder title="Cost Analysis" />} />
              <Route path="/finance/dashboards" element={<Placeholder title="Financial Dashboards" />} />

              {/* Patients */}
               <Route path="/patients/registration/new" element={<NewPatient />} />
               <Route path="/patients/registration/quick" element={<QuickRegistration />} />
               <Route path="/patients/database" element={<PatientDatabase />} />
               <Route path="/patients/communication" element={<PatientCommunication />} />
               {/* Add more protected routes here */}
            </Route>
            
            {/* Redirect from index to dashboard if authenticated, otherwise to login */}
            <Route path="/" element={<Index />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
