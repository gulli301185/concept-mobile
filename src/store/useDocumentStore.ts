import { create } from "zustand";

export interface DocumentFormData {
  citizenship: string;
  documentType: string | number;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  gender: string;
  documentNumber: string;
  expiryDate: Date | null;
}

interface DocumentStore {
  isOpenCalendarDoc: boolean;
  calendarField: "birthDate" | "expiryDate" | null;
  formData: DocumentFormData;

  setIsOpenCalendarDoc: (value: boolean) => void;
  setCalendarField: (field: "birthDate" | "expiryDate" | null) => void;
  setField: <K extends keyof DocumentFormData>(
    field: K,
    value: DocumentFormData[K]
  ) => void;
  resetForm: () => void;
}

const initialFormData: DocumentFormData = {
  citizenship: "",
  documentType: "",
  firstName: "",
  lastName: "",
  birthDate: null,
  gender: "",
  documentNumber: "",
  expiryDate: null,
};

export const useDocumentStore = create<DocumentStore>((set) => ({
  isOpenCalendarDoc: false,
  calendarField: null,
  formData: initialFormData,

  setIsOpenCalendarDoc: (value) => set({ isOpenCalendarDoc: value }),
  setCalendarField: (field) => set({ calendarField: field }),

  setField: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  resetForm: () =>
    set({
      formData: initialFormData,
      calendarField: null,
      isOpenCalendarDoc: false,
    }),
}));