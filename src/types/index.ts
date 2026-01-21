// TypeScript type definitions
// Definições de tipos TypeScript

/**
 * Informações de contato
 */
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  whatsapp?: string;
}

/**
 * Serviço oferecido
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

/**
 * Depoimento de cliente
 */
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
}

/**
 * Seção da página
 */
export interface Section {
  id: string;
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
}
