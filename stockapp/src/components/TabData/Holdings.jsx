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
            // Replace with your stock API
            const res = await axios.get("http://localhost:5000/buy");
            console.log(res.data);
            setHoldStocks(res.data);
        } catch (err) {
            console.error("Error loading stocks:", err);
        }
    };

  // Helper function to calculate total returns
  const calculateReturn = (quantity, avgCost, currentValue) => {
    const totalCost = quantity * avgCost;
    const marketValue = quantity * currentValue;
    const pl = marketValue - totalCost;
    const plPercent = (pl / totalCost) * 100;
    return {
      pl: pl.toFixed(2),
      plPercent: plPercent.toFixed(2)
    };
  };

  return (
    <div className='py-2'>
      <h2 className='py-2'>My Portfolio Holdings</h2>
      <table className='table table-striped'>
        <thead>
          <tr>
           
            <th>Symbol</th>
            <th>Company</th>
            <th>Price</th>
            <th>Change</th>
            <th>LTP</th>
            <th>Change %</th>
            <th>Volume</th>
            <th>Market Cap</th>
            <th>PL ($/₹)</th>
          </tr>
        </thead>
        <tbody>
          {holdStocks.map(stock => {
            const { pl, plPercent } = calculateReturn(stock.qty, stock.avgCost, stock.currentValue);
            const isProfit = pl >= 0;

            return (
              <tr key={stock.id}>
                <td><strong>{stock.symbol}</strong></td>
                <td>{stock.name}</td>
                <td>{stock.price}</td>
                <td>{stock.change}</td>
                <td>{stock.change_percent}</td>
                 <td>{stock.volume}</td>
                <td>{stock.market_cap}</td>
                <td>{stock.qty}</td>
                <td style={{ color: isProfit ? 'green' : 'red' }}>
                  {pl} ({plPercent}%)
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

