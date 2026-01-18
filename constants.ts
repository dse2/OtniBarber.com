
import { Service, Barber } from './types';

export const SERVICES: Service[] = [
  { id: '1', name: "Corte de Cabelo", price: 30.00, time: "50min", category: 'corte' },
  { id: '2', name: "Sobrancelha", price: 12.00, time: "10min", category: 'estetica' },
  { id: '3', name: "Barba", price: 20.00, time: "20min", category: 'barba' },
  { id: '4', name: "Pigmentação", price: 25.00, time: "20min", category: 'estetica' },
  { id: '5', name: "Platinado", price: 110.00, time: "180min", category: 'estetica' },
  { id: '6', name: "Luzes", price: 70.00, time: "130min", category: 'estetica' }
];

export const PROFILE = {
  name: "Alexandre Otni",
  role: "Master Barber & Visagista",
  experience: "4 anos de estrada",
  bio: "Profissionalismo não se define pela idade, mas pela dedicação. Eu sou Alexandre Otni, hoje tenho 17 anos e Iniciei minha carreira aos 14 anos, guiado pelos conselhos do meu pai. Desde então, transformei cada oportunidade em aprendizado: dos atendimentos domiciliares às sessões improvisadas, desde cortes feitos nas ruas de Belo Horizonte à atendimentos feitos na calçada de faculdades, assim conquistei a confiança de centenas de clientes pela qualidade do meu trabalho. Hoje, trago essa experiêcia de campo para um ambiente estruturado. Este espaço é a concretização de um sonho e o primeiro passo de uma marca sólida. Seja bem-vindo à Otni Barber, onde seu visual é tratado com a seriedade que você merece, no conforto de sua residência.",
  image: "https://i.postimg.cc/J4RLpMpD/hjvj.jpg"
};

export const ALL_GALLERY_IMAGES = [
  "https://i.postimg.cc/3R2nbLhV/Whats-App-Image-2026-01-17-at-21-27-14-(1).jpg",
  "https://i.postimg.cc/d3BnJLLR/Whats-App-Image-2026-01-17-at-21-27-14-(3).jpg",
  "https://i.postimg.cc/brTLqssB/Whats-App-Image-2026-01-17-at-21-27-14-(4).jpg",
  "https://i.postimg.cc/jqQMHkZ4/Whats-App-Image-2026-01-17-at-21-27-14.jpg",
  "https://i.postimg.cc/8PpttB0Y/Whats-App-Image-2026-01-17-at-21-27-15.jpg",
  "https://i.postimg.cc/CMHcG6mJ/Whats-App-Image-2026-01-17-at-21-27-15-(1).jpg",
  "https://i.postimg.cc/sxywFpD9/Whats-App-Image-2026-01-17-at-21-27-14-(2).jpg"
];

export const TEAM: Barber[] = [
  {
    id: '1',
    name: PROFILE.name,
    image: PROFILE.image,
    initials: "AO",
    age: 17,
    experience: PROFILE.experience,
    bio: PROFILE.bio
  }
];
