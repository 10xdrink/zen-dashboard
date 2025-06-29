import HeaderBar from "@/components/layout/HeaderBar";
import Sidebar from "@/components/layout/Sidebar";
import React from "react";

type Props = { title: string };

const Placeholder: React.FC<Props> = ({ title }) => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <HeaderBar pageTitle={title} />
      <main className="flex-1 flex items-center justify-center p-10 text-gray-500 text-xl">
        {title} – Coming Soon
      </main>
    </div>
  </div>
);

export default Placeholder;
