import { createContext, useContext, useState, ReactNode } from 'react';

export type PaginationContextType = {
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

type PaginationProviderProps = {
  children: ReactNode;
};

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const usePagination = (): PaginationContextType => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }
  return context;
};

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ children }: PaginationProviderProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPageValue) => Math.max(prevPageValue - 1, 1));

  const value: PaginationContextType = {
    currentPage,
    nextPage,
    prevPage,
    setCurrentPage
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
