import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function StockChart() {
   const stockData = [
  { date: "Jun 10", price: 180 },
  { date: "Jun 11", price: 185 },
  { date: "Jun 12", price: 182 },
  { date: "Jun 13", price: 190 },
  { date: "Jun 14", price: 195 },
  { date: "Jun 15", price: 200 },
];
//    const formatStockData = (stockData) => {
//   const timeSeries = stockData["Time Series (Daily)"];

//   return Object.entries(timeSeries)
//     .map(([date, values]) => ({
//       time: date,
//       value: Number(values["4. close"]),
//     }))
//     .sort((a, b) => new Date(a.time) - new Date(b.time));
// };
//     console.log(formatStockData);
const formatStockData = (stockData) => {
  const series = stockData["Time Series (Daily)"];

  return Object.entries(series)
    .map(([date, values]) => ({
      date,
      price: Number(values["4. close"]),
    }))
    .reverse();
};
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">
                Apple Stock Price
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#2563eb"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StockChart;