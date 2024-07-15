import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Favorite {
  id: string;
  book_id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
}

interface FavoritesContextProps {
  favorites: Set<Favorite>;
  addFavorite: (favorite: Favorite) => void;
  removeFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<Favorite>>(new Set());

  const addFavorite = (favorite: Favorite) => {
    setFavorites((prevFavorites) => new Set(prevFavorites).add(favorite));
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      newFavorites.forEach(fav => {
        if (fav.book_id === id) {
          newFavorites.delete(fav);
        }
      });
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
