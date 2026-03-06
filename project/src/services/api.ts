const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface SummaryData {
  total_flights: number;
  most_popular_route: string;
  peak_demand_date: string;
}

export interface MetricData {
  total_flights: number;
  unique_airlines: number;
  countries_served: number;
}

export interface RouteData {
  route: string;
  passengers: number;
  growth: number;
  departure_code: string;
  arrival_code: string;
}

export interface Airport {
  code: string;
  name: string;
}

export interface Filters {
  departure?: string;
  arrival?: string;
  start?: string;
  end?: string;
}

export const apiService = {
  fetchSummary: async (filters?: Filters): Promise<SummaryData> => {
    const params = filters ? new URLSearchParams(filters as any).toString() : '';
    const url = `${API_BASE_URL}/summary?${params}`;
    console.log(`[API] Fetching summary: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch summary: ${response.statusText}`);
    return response.json();
  },

  fetchMetrics: async (filters?: Filters): Promise<MetricData> => {
    const params = filters ? new URLSearchParams(filters as any).toString() : '';
    const url = `${API_BASE_URL}/metrics?${params}`;
    console.log(`[API] Fetching metrics: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch metrics: ${response.statusText}`);
    return response.json();
  },

  fetchTopRoutes: async (filters?: Filters): Promise<{ routes: RouteData[] }> => {
    const params = filters ? new URLSearchParams(filters as any).toString() : '';
    const url = `${API_BASE_URL}/routes?${params}`;
    console.log(`[API] Fetching top routes: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch routes: ${response.statusText}`);
    return response.json();
  },

  fetchAirports: async (): Promise<Airport[]> => {
    const response = await fetch(`${API_BASE_URL}/airports`);
    if (!response.ok) throw new Error('Failed to fetch airports');
    return response.json();
  },

  filterRoutes: async (filters: Filters): Promise<{ routes: RouteData[] }> => {
    const params = new URLSearchParams(filters as any).toString();
    const response = await fetch(`${API_BASE_URL}/routes/filter?${params}`);
    if (!response.ok) throw new Error('Failed to filter routes');
    return response.json();
  }
};
