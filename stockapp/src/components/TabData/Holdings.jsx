import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Holdings() {
  // Initial state for your stock holdings
  // const [holdings, setHoldings] = useState([
  //   { id: 1, ticker: 'AAPL', name: 'Apple Inc.', quantity: 15, avgCost: 175.50,LTP:201.23,invested:4000, currentValue: 210.25,pl:200.22 },
  //   { id: 2, ticker: 'RELIANCE', name: 'Reliance Industries', quantity: 150, avgCost: 175.50,LTP:201.23,invested:4000, currentValue: 210.25,pl:200  },
  //   { id: 3, ticker: 'TCS', name: 'Tata Consultancy Svcs',quantity: 100, avgCost: 175.50,LTP:201.23,invested:4000, currentValue: 210.25,pl:200 }
  // ]);
  const [holdStocks, setHoldStocks] = useState([]);

  useEffect(() => {
    HoldStocks();
  }, []);

  const HoldStocks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/sell");
      // console.log(res.data);
      setHoldStocks(res.data);
    } catch (err) {
      if (err.response?.status === 409) {
        alert("This stock is already in your watchlist.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className='py-2'>
      <h2 className='py-2'>My Portfolio Holdings</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>LTP</th>
            <th>Change</th>
            <th>Change %</th>
            <th>Volume</th>
            <th>Market Cap</th>
            <th>PL (₹)</th>
          </tr>
        </thead>
        <tbody>
          {holdStocks.map(stock => {
            const pl = (stock.change) * (stock.qty - stock.sell_qty);
            const isProfit = pl > 0;
            const avail_qty = stock.qty - stock.sell_qty;

            return (
              <tr key={stock.id}>
                <td><strong>{stock.symbol}</strong></td>
                <td>{stock.name}</td>
                <td>{avail_qty}</td>
                <td>{stock.price}</td>
                <td>{stock.change}</td>
                <td>{stock.change_percent}</td>
                <td>{stock.volume}</td>
                <td>{stock.market_cap}</td>
                <td style={{ color: isProfit ? 'green' : 'red' }}>
                  {pl}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

