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
    { x: new Date(2026, 5, 5), y: [152, 165, 151, 164] }
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
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default CandleChart;
