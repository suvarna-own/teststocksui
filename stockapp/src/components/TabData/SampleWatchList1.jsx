import { useEffect, useState } from "react";

function Samplewatchlist1() {
  const [watchlist1, setwatchlist1] = useState([]);
  const [msg, setMsg] = useState("");

  const stocks = [
    { symbol: "AAPL", name: "Apple" },
    { symbol: "TSLA", name: "Tesla" },
    { symbol: "MSFT", name: "Microsoft" },
    { symbol: "GOOG", name: "Google" },
  ];

  const extractArray = (raw) => {
    if (Array.isArray(raw)) return raw;
    if (raw?.data && Array.isArray(raw.data)) return raw.data;
    if (raw?.watchlist && Array.isArray(raw.watchlist)) return raw.watchlist;
    return [];
  };

  useEffect(() => {
    fetch("/api/watchlist")
      .then((res) => res.json())
      .then((data) => {
        const arr = extractArray(data);
        setwatchlist1(arr);
      })
      .catch((err) => setMsg("Failed to load watchlist"));
  }, []);

  const addTowatchlist1 = (stock) => {
    const exists = watchlist1.find(
      (item) => item.symbol === stock.symbol
    );

    if (!exists) {
      setwatchlist1([...watchlist1, stock]);
    }
  };

  const removeFromwatchlist1 = (symbol) => {
    setwatchlist1(
      watchlist1.filter((item) => item.symbol !== symbol)
    );
  };

  return (
    <div>
      <h1>Stock List</h1>

      <section className="table-wrap">
        <table className="table  table-striped">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company Name</th>

            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td>
                  ({stock.symbol})
                </td>
                <td>
                  {stock.name}
                </td>

                <td><button
                  onClick={() => addTowatchlist1(stock)}
                >
                  Add
                </button></td>
              </tr>
            ))}</tbody></table></section>

      <hr />

      <h2>My watchlist1</h2>
      {msg ? <div className="api-msg">{msg}</div> : null}

      <table className="table  table-striped">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company Name</th>

          </tr>
        </thead>
        <tbody>{watchlist1.map((stock) => (
          <tr key={stock.symbol}>
            <td>{stock.name}</td><td>({stock.symbol})</td>

            <td><button
              onClick={() =>
                removeFromwatchlist1(stock.symbol)
              }
            >
              Remove
            </button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export default Samplewatchlist1;