
export interface Service {
  id: string;
  name: string;
  price: number;
  time: string;
  category: 'corte' | 'barba' | 'estetica';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Added Barber interface
export interface Barber {
  id: string;
  name: string;
  image?: string;
  initials?: string;
  age?: number;
  experience?: string;
  bio?: string;
}

// Added Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  brand?: string;
}

// Added SelectedProduct interface
export interface SelectedProduct extends Product {
  quantity: number;
}

// Added Appointment interface
export interface Appointment {
  id: string;
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  clientName: string;
  clientPhone: string;
}
