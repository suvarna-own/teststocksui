import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const CandleChart = () => {
  // Sample Stock Data: [Date, Open, High, Low, Close]
  const stockData = [
    { x: new Date(2026, 5, 1), y: [150, 155, 148, 153] },
    { x: new Date(2026, 5, 2), y: [153, 160, 152, 158] },
    { x: new Date(2026, 5, 3), y: [158, 162, 155, 156] },
    { x: new Date(2026, 5, 4), y: [156, 157, 150, 152] },
    { x: new Date(2026, 5, 5), y: [138, 165, 151, 164] },
    { x: new Date(2026, 5, 6), y: [140, 155, 148, 150] },
    { x: new Date(2026, 5, 7), y: [158, 160, 152, 153] },
    { x: new Date(2026, 5, 8), y: [138, 162, 155, 153] },
    { x: new Date(2026, 5, 9), y: [126, 157, 150, 153] },
    { x: new Date(2026, 5, 10), y: [152, 165, 151, 163] }
  ];

  const options = {
    theme: "light2",
    title: {
      text: "Stock Price Analysis"
    },
    axisY: {
      includeZero: false,
      prefix: "$"
    },
    data: [{
      type: "candlestick",
      risingColor: "#26A69A", // Green for bullish (Close > Open)
      fallingColor: "#EF5350", // Red for bearish (Open > Close)
      dataPoints: stockData
    }]
  };

  return (
    <div className='mt-4 px-2 border ' style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <CanvasJSChart className="w-1/2 border rounded-2xl'" options={options} />
    </div>
  );
};

export default CandleChart;
