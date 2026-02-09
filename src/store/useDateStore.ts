import { create } from "zustand";

interface DateStore {
  departDate: Date | null;
  returnDate: Date | null;

  setDepartDate: (date: Date | null) => void;
  setReturnDate: (date: Date | null) => void;
  clearDates: () => void;
}

export const useDateStore = create<DateStore>((set) => ({
  departDate: null,
  returnDate: null,

  setDepartDate: (date) => set({ departDate: date }),
  setReturnDate: (date) => set({ returnDate: date }),

  clearDates: () => set({ departDate: null, returnDate: null }),
}));
