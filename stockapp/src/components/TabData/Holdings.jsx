import React, { useState } from 'react';

export default function Holdings() {
  // Initial state for your stock holdings
  const [holdings, setHoldings] = useState([
    { id: 1, ticker: 'AAPL', name: 'Apple Inc.', quantity: 15, avgCost: 175.50,LTP:201.23,invested:4000, currentValue: 210.25,pl:200.22 },
    { id: 2, ticker: 'RELIANCE', name: 'Reliance Industries', quantity: 150, avgCost: 175.50,LTP:201.23,invested:4000, currentValue: 210.25,pl:200  },
    { id: 3, ticker: 'TCS', name: 'Tata Consultancy Svcs',quantity: 100, avgCost: 175.50,LTP:201.23,invested:4000, currentValue: 210.25,pl:200 }
  ]);

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
            <th className='bg-red-50'>Symbol</th>
            <th>Symbol</th>
            <th>Company</th>
            <th>Qty</th>
            <th>Avg Cost</th>
            <th>LTP</th>
            <th>Invested</th>
            <th>Current Value</th>
            <th>Market Value</th>
            <th>P&amp;L ($/₹)</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map(stock => {
            const { pl, plPercent } = calculateReturn(stock.quantity, stock.avgPrice, stock.currentPrice);
            const isProfit = pl >= 0;

            return (
              <tr key={stock.id}>
                <td><strong>{stock.ticker}</strong></td>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{stock.avgCost}</td>
                <td>{stock.LTP}</td>
                 <td>{stock.invested}</td>
                <td>{stock.currentValue}</td>
                <td>{(stock.quantity * stock.currentPrice).toFixed(2)}</td>
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

