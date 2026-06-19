function SearchResults({ filteredSymbol, search }) {
  return (
    <div className="search-results width-1/2 border-red-600">
      {filteredSymbol.map((symbol, idx) => {
        const symbolValue = typeof symbol === 'string'
          ? symbol
          : symbol?.symbol || symbol?.ticker || symbol?.code || symbol?.name || 'Unknown';

        return (
          <div
            key={idx}
            className={`search-result${search ? ' search-result-show' : ''}`}
          >
            <p className="text-lg text-gray-800 p-2">
              Symbol - {symbolValue}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
