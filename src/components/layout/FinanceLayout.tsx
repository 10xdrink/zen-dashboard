import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import HeaderBar from "@/components/layout/HeaderBar";

interface FinanceLayoutProps {
  pageTitle: string;
  pageSubtitle?: string;
  children: React.ReactNode;
}

const FinanceLayout: React.FC<FinanceLayoutProps> = ({ pageTitle, pageSubtitle, children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderBar pageTitle={pageTitle} pageSubtitle={pageSubtitle || ""} />
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default FinanceLayout;
