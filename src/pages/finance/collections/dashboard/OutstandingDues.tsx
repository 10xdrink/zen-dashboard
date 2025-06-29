import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import FinanceLayout from '@/components/layout/FinanceLayout';

const OutstandingDues: React.FC = () => {
  const rows = [
    { patient: 'John Doe', due: 1500, age: '0-30 days' },
    { patient: 'Jane Smith', due: 2500, age: '31-60 days' },
    { patient: 'Rahul Verma', due: 1000, age: '61-90 days' },
    { patient: 'Emily Johnson', due: 3000, age: '>90 days' },
  ];

  const buckets = {
    '0-30 days': rows.filter(r => r.age === '0-30 days').reduce((a, b) => a + b.due, 0),
    '31-60 days': rows.filter(r => r.age === '31-60 days').reduce((a, b) => a + b.due, 0),
    '61-90 days': rows.filter(r => r.age === '61-90 days').reduce((a, b) => a + b.due, 0),
    '>90 days': rows.filter(r => r.age === '>90 days').reduce((a, b) => a + b.due, 0),
  };

  return (
  <FinanceLayout pageTitle="Outstanding Dues" pageSubtitle="Daily Collections">
    <div className="grid gap-6 md:grid-cols-2">
      {/* Bucket summary */}
      <Card className="bg-gradient-to-br from-slate-50 to-white shadow-sm p-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium mb-4">Age Bucket Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          {Object.entries(buckets).map(([bucket, val]) => (
            <div key={bucket} className="flex flex-col items-start">
              <span className="text-xs text-gray-500">{bucket}</span>
              <span className="text-lg font-semibold">₹{val.toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      {/* Table */}
      <Card className="bg-gradient-to-br from-slate-50 to-white shadow-sm p-6">
        <CardHeader>
          <CardTitle className="text-sm font-medium mb-4">Outstanding Patients</CardTitle>
        </CardHeader>
        <CardContent className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-4">Patient</th>
                <th className="py-2 pr-4">Age Bucket</th>
                <th className="py-2">Due (₹)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.patient} className="border-t border-gray-100">
                  <td className="py-2 pr-4 whitespace-nowrap">{r.patient}</td>
                  <td className="py-2 pr-4">{r.age}</td>
                  <td className="py-2 font-medium">{r.due.toLocaleString()}</td>
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

export default OutstandingDues;
