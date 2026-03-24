import React, { useState, useMemo } from 'react';
import { Calculator as CalcIcon, TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

export function Calculator() {
  const [monthlyFee, setMonthlyFee] = useState(1000);
  const [clientsPerMonth, setClientsPerMonth] = useState(3);
  const [churnRate, setChurnRate] = useState(15); // % of clients lost per month

  // Calculate 12-month projection
  const projection = useMemo(() => {
    return Array.from({ length: 12 }).reduce<any[]>((acc, _, index) => {
      const previousClients = index === 0 ? 0 : acc[index - 1].clients;
      const lostClients = Math.round(previousClients * (churnRate / 100));
      const netClients = previousClients + clientsPerMonth - lostClients;
      const mrr = netClients * monthlyFee;

      acc.push({
        month: index + 1,
        clients: netClients,
        lost: lostClients,
        mrr: mrr
      });
      return acc;
    }, []);
  }, [monthlyFee, clientsPerMonth, churnRate]);

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      <header>
        <h2 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight">Reality Check Calculator</h2>
        <p className="text-zinc-500 mt-2">Model your actual revenue by accounting for churn (clients canceling).</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inputs */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-6 space-y-6 h-fit">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <CalcIcon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900">Variables</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Monthly Retainer ($)</label>
            <input 
              type="number" 
              className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={monthlyFee}
              onChange={e => setMonthlyFee(Number(e.target.value))}
            />
            <p className="text-xs text-zinc-500 mt-1">Course suggests $1,000. Realistically for just automation, try $297-$497.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">New Clients / Month</label>
            <input 
              type="number" 
              className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={clientsPerMonth}
              onChange={e => setClientsPerMonth(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Monthly Churn Rate (%)</label>
            <input 
              type="number" 
              className="w-full px-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={churnRate}
              onChange={e => setChurnRate(Number(e.target.value))}
            />
            <p className="text-xs text-zinc-500 mt-1">If you only offer a set-and-forget automation, expect 15-30% churn.</p>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 bg-zinc-50/50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-zinc-900">12-Month Projection</h3>
            <div className="text-right">
              <p className="text-sm text-zinc-500">Month 12 MRR</p>
              <p className="text-2xl font-bold text-emerald-600">${projection[11].mrr.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-500 bg-white">
                  <th className="px-6 py-4 font-medium">Month</th>
                  <th className="px-6 py-4 font-medium">Total Clients</th>
                  <th className="px-6 py-4 font-medium text-rose-500">Clients Lost</th>
                  <th className="px-6 py-4 font-medium text-emerald-600">MRR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {projection.map((data) => (
                  <tr key={data.month} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">Month {data.month}</td>
                    <td className="px-6 py-4 text-zinc-600">{data.clients}</td>
                    <td className="px-6 py-4 text-rose-500">{data.lost}</td>
                    <td className="px-6 py-4 font-medium text-emerald-600">${data.mrr.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
