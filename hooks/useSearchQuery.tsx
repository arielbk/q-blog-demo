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

/**
 * somewhat contrived example of a React HOC
 * this makes it easier to test the filtered PostList
 */
type QueryProp = {
  query: string;
};
export function withSearchQuery<T extends QueryProp>(Component: React.FC<T>) {
  // spread any other props to the component along with the search query
  return function ComponentWithQuery(props: Omit<T, keyof QueryProp>) {
    const { query } = useSearchQuery();

    return <Component {...(props as T)} query={query} />;
  };
}

export default function useSearchQuery() {
  return useContext(SearchContext);
}
