import React, { useContext, useState } from 'react';

const SearchContext = React.createContext({
  query: '',
  setQuery: (q: string) => console.log(q),
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState('');

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export default function useSearchQuery() {
  return useContext(SearchContext);
}
