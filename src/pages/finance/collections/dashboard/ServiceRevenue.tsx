import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import FinanceLayout from '@/components/layout/FinanceLayout';

const ServiceRevenue: React.FC = () => {
  const rows = [
    { service: 'Consultation', revenue: 8000 },
    { service: 'Dental Cleaning', revenue: 6000 },
    { service: 'X-Ray', revenue: 3500 },
    { service: 'Blood Test', revenue: 2500 },
    { service: 'Physiotherapy', revenue: 2000 },
  ];

  const chartData = {
    labels: rows.map(r => r.service),
    datasets: [
      {
        label: 'Revenue',
        data: rows.map(r => r.revenue),
        backgroundColor: '#60a5fa',
        borderRadius: 6,
      },
    ],
  };
  const options = { plugins: { legend: { display: false } }, responsive: true };

  return (
  <FinanceLayout pageTitle="Service-wise Revenue" pageSubtitle="Daily Collections">
    <div className="grid gap-6 md:grid-cols-2">
      {/* Bar chart */}
      <Card className="bg-gradient-to-br from-slate-50 to-white shadow-sm p-4 flex items-center justify-center h-80">
        <Bar data={chartData} options={options} />
      </Card>
      {/* Table */}
      <Card className="bg-gradient-to-br from-slate-50 to-white shadow-sm p-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium mb-4">Revenue Table</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Service</th>
                <th className="py-2">Revenue (₹)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.service} className="border-t border-gray-100">
                  <td className="py-2 pr-4 whitespace-nowrap">{r.service}</td>
                  <td className="py-2 font-medium">{r.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  </FinanceLayout>
  );
};

export default ServiceRevenue;
