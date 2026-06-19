// export default function Holdings() {
    
// }
import React, { useState } from 'react';

export default function Holdings() {
  // Initial state for your stock holdings
  const [holdings, setHoldings] = useState([
    { id: 1, ticker: 'AAPL', name: 'Apple Inc.', quantity: 15, avgPrice: 175.50, currentPrice: 210.25 },
    { id: 2, ticker: 'RELIANCE', name: 'Reliance Industries', quantity: 10, avgPrice: 2800.00, currentPrice: 3100.50 },
    { id: 3, ticker: 'TCS', name: 'Tata Consultancy Svcs', quantity: 20, avgPrice: 3800.00, currentPrice: 4200.00 }
  ]);

  // Helper function to calculate total returns
  const calculateReturn = (qty, avg, current) => {
    const totalCost = qty * avg;
    const marketValue = qty * current;
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
            <th>Company</th>
            <th>Qty</th>
            <th>Avg Cost</th>
            <th>Current</th>
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
                <td>{stock.avgPrice}</td>
                <td>{stock.currentPrice}</td>
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

