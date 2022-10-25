import useSearchQuery from '../hooks/useSearchQuery';

const SearchField: React.FC = () => {
  const { query, setQuery } = useSearchQuery();

  return (
    <input
      data-testid="searchfield"
      placeholder="Filter by author name"
      className="w-64 border rounded-lg px-4 py-1 focus:outline-[#00fff6]"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default SearchField;
