import { create } from "zustand";

// Define el store
export const useContentStore = create((set) => ({
    // Estado inicial
    contentType: 'movie',

    // Método para actualizar el estado
    setContentType: (type) => set({ contentType: type }),
}));


