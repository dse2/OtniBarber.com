
import React, { useEffect, useState } from 'react';
import { db, SavedAppointment } from '../services/db';

export const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [appointments, setAppointments] = useState<SavedAppointment[]>([]);
  const [metrics, setMetrics] = useState({ revenue: 0, count: 0, topBarber: '' });

  useEffect(() => {
    const loadData = async () => {
      const data = await db.getAppointments();
      const mets = await db.getMetrics();
      setAppointments(data.reverse());
      setMetrics(mets);
    };
    loadData();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-[#1a0f0a] overflow-y-auto text-[#f5f5dc]">
      <div className="bg-black text-[#c5a059] p-6 sticky top-0 z-10 flex justify-between items-center shadow-xl border-b border-[#c5a059]/20">
        <div>
          <h2 className="text-xl font-black italic uppercase tracking-tighter">Otni Barber</h2>
          <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold">Painel Administrativo</span>
        </div>
        <button onClick={onClose} className="bg-[#c5a059] text-[#1a0f0a] px-4 py-2 rounded-lg text-xs font-bold uppercase">Sair</button>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#2c1810] p-6 rounded-3xl border border-[#c5a059]/20">
            <span className="text-[10px] text-gray-400 uppercase font-black">Faturamento</span>
            <div className="text-4xl font-black text-[#c5a059] mt-2 italic">R$ {metrics.revenue.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="bg-[#2c1810] rounded-[2rem] border border-[#c5a059]/20 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-black text-[9px] uppercase text-[#c5a059] font-black">
              <tr>
                <th className="p-4">Data/Hora</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Barbeiro</th>
                <th className="p-4">Valor</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              {appointments.map(app => (
                <tr key={app.id} className="border-b border-[#c5a059]/10">
                  <td className="p-4">{app.date} {app.time}</td>
                  <td className="p-4">{app.clientName}</td>
                  <td className="p-4 uppercase text-[#c5a059]">{app.barberName}</td>
                  <td className="p-4 font-bold">R$ {app.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
