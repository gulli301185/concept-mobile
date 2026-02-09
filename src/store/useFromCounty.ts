// store/useRouteStore.ts
import { create } from "zustand";

interface City {
  id: number;
  city: string;
  country: string;
  city_code: string;
}

interface RouteStore {
  from: City | null;
  to: City | null;

  setFrom: (city: City) => void;
  setTo: (city: City) => void;
  clear: () => void;
}

export const useFromCountry = create<RouteStore>((set) => ({
  from: null,
  to: null,

  setFrom: (city) => set({ from: city }),
  setTo: (city) => set({ to: city }),

  clear: () => set({ from: null, to: null }),
}));
