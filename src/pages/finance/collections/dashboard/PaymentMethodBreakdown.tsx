import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Banknote, CreditCard, Send, Layers, Gift } from 'lucide-react';
import FinanceLayout from '@/components/layout/FinanceLayout';

const PaymentMethodBreakdown: React.FC = () => {
  const data = {
    cash: 8000,
    card: 10000,
    upi: 4500,
    bank: 800,
    wallet: 1200,
  };

  const chartData = {
    labels: ['Cash', 'Card', 'UPI', 'Bank', 'Wallet'],
    datasets: [
      {
        data: [data.cash, data.card, data.upi, data.bank, data.wallet],
        backgroundColor: ['#4ade80', '#60a5fa', '#facc15', '#a78bfa', '#f87171'],
        hoverOffset: 6,
      },
    ],
  };
  const options = { maintainAspectRatio: true, cutout: '70%', plugins: { legend: { display: false } } };

  const chips = [
    { label: 'Cash', value: data.cash, icon: <Banknote className="h-3 w-3" /> },
    { label: 'Card', value: data.card, icon: <CreditCard className="h-3 w-3" /> },
    { label: 'UPI', value: data.upi, icon: <Send className="h-3 w-3" /> },
    { label: 'Bank', value: data.bank, icon: <Layers className="h-3 w-3" /> },
    { label: 'Wallet', value: data.wallet, icon: <Gift className="h-3 w-3" /> },
  ];

  return (
  <FinanceLayout pageTitle="Payment Method Breakdown" pageSubtitle="Daily Collections">
    <div className="grid gap-6 md:grid-cols-2">
      {/* Donut chart */}
      <Card className="bg-gradient-to-br from-slate-50 to-white shadow-sm flex items-center justify-center py-8">
        <Doughnut data={chartData} options={options} className="w-48 h-48" />
      </Card>
      {/* Chip summary */}
      <Card className="bg-gradient-to-br from-slate-50 to-white shadow-sm p-6 flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-sm font-medium mb-4">Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {chips.map((c) => (
            <div key={c.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-600">{c.icon}{c.label}</span>
              <span className="font-medium">₹{c.value.toLocaleString()}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </FinanceLayout>
  );
};

export default PaymentMethodBreakdown;
