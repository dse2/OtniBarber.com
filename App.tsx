
import React, { useState } from 'react';
import { SERVICES, PROFILE, ALL_GALLERY_IMAGES } from './constants';
import { AssistantChat } from './components/AssistantChat';

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=5531971353010&text&type=phone_number&app_absent=0";
const INSTAGRAM_LINK = "https://www.instagram.com/otni_barber/";
const LOGO_URL = "https://i.postimg.cc/NGdxyx2c/otni.jpg";

const App: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2c1810] selection:bg-[#c5a059] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#fdfbf7]/95 backdrop-blur-md border-b border-[#2c1810]/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img 
              src={LOGO_URL} 
              alt="Logo Otni Barber" 
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-[#c5a059]/30 shadow-lg" 
            />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase italic text-[#2c1810] leading-none">Otni Barber</span>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#c5a059] mt-1">Alexandre Otni</span>
            </div>
          </div>
          <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-widest text-[#2c1810]">
            <button onClick={() => scrollTo('sobre')} className="hover:text-[#c5a059] transition-colors">Quem sou eu?</button>
            <button onClick={() => scrollTo('servicos')} className="hover:text-[#c5a059] transition-colors">Serviços</button>
            <button onClick={() => scrollTo('galeria')} className="hover:text-[#c5a059] transition-colors">Portfólio</button>
            <a href={WHATSAPP_LINK} target="_blank" className="bg-[#2c1810] text-[#f5f5dc] px-8 py-3 rounded-2xl hover:bg-black transition-all shadow-lg">Contato</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-20 px-6 container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <div className="flex gap-2">
              <div className="w-12 h-1 bg-[#2c1810] -skew-x-[25deg]"></div>
              <div className="w-12 h-1 bg-[#c5a059] -skew-x-[25deg]"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.95] text-[#2c1810]">
              A arte do <br />
              <span className="text-[#c5a059]">bom gosto,</span> <br />
              no fio da <br />
              navalha.
            </h1>
            <p className="text-xl text-[#2c1810]/60 font-light italic leading-relaxed max-w-lg">
              De atendimentos nas ruas à excelência no seu lar. Redefinindo o conceito de barbearia clássica.
            </p>
            <div className="flex gap-4">
              <a href={WHATSAPP_LINK} target="_blank" className="bg-[#2c1810] text-[#f5f5dc] px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#2c1810]/20">
                Agendar Horário
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl bg-[#2c1810]/5 border-8 border-white">
              <img src={PROFILE.image} alt={PROFILE.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-[#c5a059] p-8 rounded-3xl shadow-2xl hidden md:block">
              <div className="text-4xl font-black italic text-[#1a0f0a]">17</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#1a0f0a]/60">Anos de Idade</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quem sou eu Section */}
      <section id="sobre" className="py-24 bg-[#2c1810] text-[#f5f5dc]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/3">
              <div className="aspect-square rounded-[2rem] overflow-hidden border-4 border-[#c5a059]">
                <img src="https://i.postimg.cc/dtFqg8V3/yfutd.jpg" alt="Alexandre Otni" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:w-2/3 space-y-8">
              <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#c5a059]">Quem sou eu?</h2>
              <div className="w-20 h-1 bg-[#c5a059]"></div>
              <p className="text-lg md:text-xl font-light italic leading-relaxed text-[#f5f5dc]/90">
                {PROFILE.bio}
              </p>
              <div className="flex gap-4">
                <div className="px-6 py-3 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
                  Início aos 14 anos
                </div>
                <div className="px-6 py-3 bg-[#c5a059]/10 border border-[#c5a059]/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#c5a059]">
                  Centenas de Clientes
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-24 px-6 container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-[#2c1810]">Especialidades</h2>
          <div className="w-20 h-1 bg-[#c5a059] mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SERVICES.map(s => (
            <div key={s.id} className="group bg-white border border-[#2c1810]/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:shadow-2xl transition-all hover:border-[#c5a059]/30">
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-[#2c1810]">{s.name}</h3>
                <p className="text-[10px] text-[#2c1810]/40 font-bold uppercase">{s.time} • Atendimento VIP</p>
              </div>
              <div className="text-3xl font-black italic text-[#c5a059]">R$ {s.price.toFixed(0)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-24 bg-[#1a0f0a] text-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              Portfólio <br />
              <span className="text-[#c5a059]">Real</span>
            </h2>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hidden md:block">Trabalho de Campo</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-4">
            {ALL_GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden bg-black group border-2 border-[#2c1810]">
                <img src={img} alt="Trabalho Otni Barber" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-[#2c1810]/5 bg-white">
        <div className="container mx-auto px-6 flex flex-col items-center gap-12">
          <div className="flex flex-col items-center">
            <img 
              src={LOGO_URL} 
              alt="Logo Otni Barber" 
              className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] object-cover border-2 border-[#c5a059] mb-6 shadow-2xl" 
            />
            <span className="text-4xl font-black italic uppercase tracking-tighter text-[#2c1810]">Otni Barber</span>
            <span className="text-[12px] font-bold tracking-[0.6em] uppercase text-[#c5a059] mt-2">Alexandre Otni</span>
          </div>
          <div className="flex gap-12 text-[12px] font-black uppercase tracking-[0.2em] text-[#2c1810]">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a059] transition-colors">Instagram</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-[#c5a059] transition-colors">WhatsApp</a>
          </div>
          <div className="text-[10px] text-[#2c1810]/30 font-bold uppercase tracking-[0.5em] text-center mt-8">
            © 2024 Alexandre Otni • Otni Barber <br /> BH / Vale do Jatobá
          </div>
        </div>
      </footer>

      <AssistantChat />
    </div>
  );
};

export default App;
