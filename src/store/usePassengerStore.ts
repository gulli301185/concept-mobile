// store/usePassengerStore.ts
import { create } from "zustand";

export type PassengerType = "adult" | "child" | "infant";

interface Passenger {
  label: string;
  age: string;
  count: number;
}

interface CabinClass {
  label: string;
  value: string;
}

interface PassengerStore {
  passengers: Record<PassengerType, Passenger>;
  cabinClass: { label: string; value: string };

  increment: (type: PassengerType) => void;
  decrement: (type: PassengerType) => void;
  setCabinClass: (cls: CabinClass) => void;
}

export const usePassengerStore = create<PassengerStore>((set) => ({
  passengers: {
    adult: { label: "Взрослый", age: "(15+)", count: 1 },
    child: { label: "Ребенок", age: "(2–12 лет)", count: 0 },
    infant: { label: "Младенец", age: "(0–2 лет)", count: 0 },
  },

  cabinClass: { label: "Эконом", value: "E" },

  increment: (type) =>
    set((state) => ({
      passengers: {
        ...state.passengers,
        [type]: {
          ...state.passengers[type],
          count: state.passengers[type].count + 1,
        },
      },
    })),

  decrement: (type) =>
    set((state) => {
      const current = state.passengers[type].count;
      if (type === "adult" && current === 1) return state;
      if (current === 0) return state;

      return {
        passengers: {
          ...state.passengers,
          [type]: {
            ...state.passengers[type],
            count: current - 1,
          },
        },
      };
    }),

  setCabinClass: (cls) => set({ cabinClass: cls }),
}));
