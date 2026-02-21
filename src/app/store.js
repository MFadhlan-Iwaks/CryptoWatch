import { create } from 'zustand';

export const useStore = create((set) => ({
  favorites: [],
  toggleFavorite: (id) => set((state) => ({
    favorites: state.favorites.includes(id)
      ? state.favorites.filter((coinId) => coinId !== id)
      : [...state.favorites, id]
  }))
}));