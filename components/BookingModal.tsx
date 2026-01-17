
import React, { useState, useEffect, useMemo } from 'react';
import { SERVICES, TEAM } from '../constants';
import { Service, Barber, SelectedProduct } from '../types';
import { db } from '../services/db';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServices?: Service[];
  initialProducts?: SelectedProduct[];
  onClearSelection?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ 
  isOpen, 
  onClose, 
  initialServices = [], 
  initialProducts = [],
  onClearSelection
}) => {
  const [step, setStep] = useState(1);
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const [selectedServices, setSelectedServices] = useState<Service[]>(initialServices);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(initialProducts);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (isOpen) {
      setSelectedServices(initialServices);
      setSelectedProducts(initialProducts);
      setStep(1);
      const today = new Date();
      if (today.getDay() === 0) today.setDate(today.getDate() + 1);
      setSelectedDate(`${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`);
    }
  }, [isOpen, initialServices, initialProducts]);

  const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0) + 
                     selectedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  const weekDays = useMemo(() => {
    const days = [];
    const today = new Date();
    let count = 0;
    let offset = 0;
    while (count < 14) {
      const d = new Date();
      d.setDate(today.getDate() + offset);
      if (d.getDay() !== 0) {
        days.push({
          label: d.toLocaleDateString('pt-br', { weekday: 'short' }),
          day: d.getDate(),
          fullDate: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`,
          monthYear: d.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' })
        });
        count++;
      }
      offset++;
    }
    return days;
  }, []);

  const maskPhone = (v: string) => v.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2").replace(/(-\d{4})(\d+?)$/, "$1");

  const handleConfirmBooking = async () => {
    setIsConfirming(true);
    try {
      const msg = `Olá! Gostaria de agendar:\n\n` +
                 `*Cliente:* ${formData.firstName} ${formData.lastName}\n` +
                 `*Barbeiro:* ${selectedBarber?.name}\n` +
                 `*Serviços:* ${selectedServices.map(s => s.name).join(', ')}\n` +
                 `*Data:* ${selectedDate} às ${selectedTime}\n` +
                 `*Total:* R$ ${totalPrice.toFixed(2)}`;
      window.open(`https://wa.me/5531992820181?text=${encodeURIComponent(msg)}`, '_blank');
      onClose();
    } finally {
      setIsConfirming(false);
    }
  };

  const renderFullCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(<div key={`e-${i}`} />);
    for (let d = 1; d <= totalDays; d++) {
      const dateCheck = new Date(year, month, d);
      const isSunday = dateCheck.getDay() === 0;
      const ds = `${String(d).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${year}`;
      days.push(
        <button key={d} disabled={isSunday} onClick={() => { if(!isSunday) { setSelectedDate(ds); setShowFullCalendar(false); } }}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${selectedDate === ds ? 'bg-[#c5a059] text-[#1a0f0a]' : isSunday ? 'text-gray-600 cursor-not-allowed' : 'hover:bg-[#c5a059]/20 text-[#f5f5dc]'}`}>
          {d}
        </button>
      );
    }
    return (
      <div className="absolute inset-0 z-[130] bg-[#1a0f0a] p-6 animate-in slide-in-from-bottom-full duration-300 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => setShowFullCalendar(false)} className="w-10 h-10 rounded-full bg-[#2c1810] flex items-center justify-center text-[#c5a059] font-black">←</button>
          <h3 className="font-black uppercase italic tracking-tighter text-[#f5f5dc]">{currentMonth.toLocaleString('pt-br', { month: 'long', year: 'numeric' })}</h3>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonth(new Date(year, month - 1, 1))} className="w-10 h-10 bg-[#2c1810] rounded-full text-[#c5a059]">‹</button>
            <button onClick={() => setCurrentMonth(new Date(year, month + 1, 1))} className="w-10 h-10 bg-[#2c1810] rounded-full text-[#c5a059]">›</button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center text-[10px] font-black text-gray-500 mb-4 uppercase">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">{days}</div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-hidden">
      <div className="bg-[#1a0f0a] w-full max-w-sm rounded-[2.5rem] border border-[#c5a059]/20 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] relative">
        {showFullCalendar && renderFullCalendar()}
        <div className="p-6 flex items-center justify-between border-b border-[#c5a059]/10 flex-shrink-0">
          <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} className="w-10 h-10 bg-[#2c1810] rounded-full flex items-center justify-center text-[#c5a059] font-black">←</button>
          <div className="text-center">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]/40 mb-0.5">Agendamento</h2>
            <p className="text-sm font-black uppercase italic tracking-tighter text-[#f5f5dc] leading-none">Otni Barber</p>
          </div>
          {step === 3 ? <button onClick={() => setShowFullCalendar(true)} className="w-10 h-10 bg-[#2c1810] rounded-full flex items-center justify-center">📅</button> : <div className="w-10" />}
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <input type="text" placeholder="Nome" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-[#2c1810] border border-[#c5a059]/20 rounded-2xl px-6 py-4 text-sm text-[#f5f5dc] focus:outline-none focus:border-[#c5a059]" />
              <input type="tel" placeholder="WhatsApp" value={formData.phone} onChange={e => setFormData({...formData, phone: maskPhone(e.target.value)})} className="w-full bg-[#2c1810] border border-[#c5a059]/20 rounded-2xl px-6 py-4 text-sm text-[#f5f5dc] focus:outline-none focus:border-[#c5a059]" />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in max-h-[45vh] overflow-y-auto">
              {SERVICES.map(s => {
                const isSelected = selectedServices.some(x => x.id === s.id);
                return (
                  <button key={s.id} onClick={() => setSelectedServices(prev => isSelected ? prev.filter(x => x.id !== s.id) : [...prev, s])} className={`w-full flex justify-between items-center p-4 rounded-2xl border-2 transition-all ${isSelected ? 'border-[#c5a059] bg-[#2c1810]' : 'border-transparent bg-[#2c1810]/50'}`}>
                    <div className="text-left"><p className="text-[10px] font-black uppercase text-[#f5f5dc]">{s.name}</p></div>
                    <p className="text-xs font-black italic text-[#c5a059]">R$ {s.price.toFixed(0)}</p>
                  </button>
                );
              })}
            </div>
          )}
          {step === 3 && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {weekDays.map(d => (
                  <button key={d.fullDate} onClick={() => setSelectedDate(d.fullDate)} className={`flex-shrink-0 flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all ${selectedDate === d.fullDate ? 'bg-[#c5a059] text-[#1a0f0a] scale-110' : 'bg-[#2c1810] text-[#c5a059]/40'}`}>
                    <span className="text-[8px] font-black uppercase">{d.label}</span>
                    <span className="text-lg font-black">{d.day}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(t => (
                  <button key={t} onClick={() => setSelectedTime(t)} className={`py-3 rounded-xl text-[10px] font-black border transition-all ${selectedTime === t ? 'bg-[#c5a059] text-[#1a0f0a] border-[#c5a059]' : 'bg-[#2c1810] border-[#c5a059]/10 text-[#c5a059]/60'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="animate-in fade-in text-[#f5f5dc]">
              <div className="bg-[#2c1810] p-6 rounded-[2.5rem] border border-[#c5a059]/20 space-y-4">
                <div className="pt-4 flex justify-between items-center border-t border-[#c5a059]/10">
                  <span className="text-[10px] font-black uppercase italic text-[#c5a059]/40">Total</span>
                  <span className="text-2xl font-black italic tracking-tighter text-[#c5a059]">R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-[#c5a059]/10 flex-shrink-0">
          <button onClick={() => step < 4 ? setStep(step + 1) : handleConfirmBooking()} className="w-full bg-[#c5a059] text-[#1a0f0a] font-black py-5 rounded-3xl text-[10px] uppercase tracking-[0.3em] transition-all">
            {step === 4 ? 'ENVIAR WHATSAPP ➔' : 'PRÓXIMO ➔'}
          </button>
        </div>
      </div>
    </div>
  );
};
