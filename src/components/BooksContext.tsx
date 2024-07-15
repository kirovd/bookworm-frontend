import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BooksContextProps {
  books: any[];
  setBooks: React.Dispatch<React.SetStateAction<any[]>>;
}

const BooksContext = createContext<BooksContextProps | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};

interface BooksProviderProps {
  children: ReactNode;
}

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<any[]>([]);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
