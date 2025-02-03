export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Reservation {
  id: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  departureDate: string;
  arrivalDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  customers: Customer[];
  createdAt: string;
  aiSuggestions?: string[];
}

export type UserRole = 'admin' | 'staff' | null;

export interface FilterOptions {
  status?: 'confirmed' | 'pending' | 'cancelled';
  departure?: string;
  arrival?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  total: number;
} 