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
  { date: "Jun 14", price: 160 },
  { date: "Jun 15", price: 100 },
  { date: "Jun 16", price: 120 },
  { date: "Jun 17", price: 145 },
  { date: "Jun 18", price: 178 },
  { date: "Jun 19", price: 190 },
  { date: "Jun 20", price: 187 },
  { date: "Jun 21", price: 211 },
  { date: "Jun 22", price: 178 },
  { date: "Jun 23", price: 67 },
  { date: "Jun 24", price: 87 },
  { date: "Jun 25", price: 105 },
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
// const formatStockData = (stockData) => {
//   const series = stockData["Time Series (Daily)"];

//   return Object.entries(series)
//     .map(([date, values]) => ({
//       date,
//       price: Number(values["4. close"]),
//     }))
//     .reverse();
// };
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-xl font-bold mb-4">
                Apple Stock Price
            </h4>

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