import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import FinanceLayout from '@/components/layout/FinanceLayout';

const DoctorCollection: React.FC = () => {
  const rows = [
    { doctor: 'Dr. Smith', revenue: 9000 },
    { doctor: 'Dr. Patel', revenue: 6500 },
    { doctor: 'Dr. Lee', revenue: 4800 },
    { doctor: 'Dr. Garcia', revenue: 3200 },
  ];

  const chartData = {
    labels: rows.map(r => r.doctor),
    datasets: [
      {
        label: 'Collection',
        data: rows.map(r => r.revenue),
        backgroundColor: '#34d399',
        borderRadius: 6,
      },
    ],
  };
  const options = { plugins: { legend: { display: false } }, responsive: true };

  return (
  <FinanceLayout pageTitle="Doctor-wise Collection" pageSubtitle="Daily Collections">
    <div className="grid gap-6 md:grid-cols-2">
      {/* Bar chart */}
      <Card className="bg-gradient-to-br from-slate-50 to-white shadow-sm p-4 flex items-center justify-center h-80">
        <Bar data={chartData} options={options} />
      </Card>
      {/* Table */}
      <Card className="bg-gradient-to-br from-slate-50 to-white shadow-sm p-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium mb-4">Collection Table</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Doctor</th>
                <th className="py-2">Collection (₹)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.doctor} className="border-t border-gray-100">
                  <td className="py-2 pr-4 whitespace-nowrap">{r.doctor}</td>
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

export default DoctorCollection;
