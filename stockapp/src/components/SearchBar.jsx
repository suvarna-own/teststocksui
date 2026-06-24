import { useEffect, useState, useRef } from "react";
import SearchResults from "./SearchResults";

function SearchBar() {
  const [symbols, setSymbol] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const searchRef = useRef();
  // const filteredSymbol

  // const [debouncedSearch, setDebouncedSearch] = useState("");

  const extractSymbolArray = (raw) => {
    if (Array.isArray(raw)) return raw;
    if (raw?.data && Array.isArray(raw.data)) return raw.data;
    if (raw?.stocks && Array.isArray(raw.stocks)) return raw.stocks;
    if (raw?.results && Array.isArray(raw.results)) return raw.results;
    return [];
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/stocks")
      .then((res) => res.json())
      .then((data) => {
        const stocksData = extractSymbolArray(data);
        setSymbol(stocksData);
      })
      .catch(() => setMsg("Failed to load data"));
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredSymbol = Array.isArray(symbols)
    ? symbols.filter((symbol) => {
      const symbolValue = typeof symbol === 'string'
        ? symbol
        : symbol?.symbol || symbol?.ticker || symbol?.code || symbol?.name || '';
      return symbolValue.toLowerCase().includes(normalizedSearch);
    })
    : [];

  return (

    <div className="search-bar w-1/2 border-blue-700 rounded-lg border-2 px-4 py-1">
      <input
        placeholder="Search month..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        ref={searchRef}
      />

      {search.length > 0 ? (
    <SearchResults filteredSymbol={filteredSymbol} search={search} />)
   : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchBar;