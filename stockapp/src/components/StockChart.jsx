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
//    const stockData = [
//   { date: "Jun 10", price: 180 },
//   { date: "Jun 11", price: 185 },
//   { date: "Jun 12", price: 182 },
//   { date: "Jun 13", price: 190 },
//   { date: "Jun 14", price: 160 },
//   { date: "Jun 15", price: 100 },
//   { date: "Jun 16", price: 120 },
//   { date: "Jun 17", price: 145 },
//   { date: "Jun 18", price: 178 },
//   { date: "Jun 19", price: 190 },
//   { date: "Jun 20", price: 187 },
//   { date: "Jun 21", price: 211 },
//   { date: "Jun 22", price: 178 },
//   { date: "Jun 23", price: 67 },
//   { date: "Jun 24", price: 87 },
//   { date: "Jun 25", price: 105 },
// ];
 const stockData = [{
            "date":"2026-06-18",
            "open":24850,
            "high":25020,
            "low":24760,
            "close":24980
        },
        {
            "date":"2026-06-19",
            "open":24980,
            "high":25140,
            "low":24920,
            "close":16060
        },
        {
            "date":"2026-06-20",
            "open":25060,
            "high":25250,
            "low":24990,
            "close":22180
        },
        {
            "date":"2026-06-23",
            "open":25180,
            "high":25340,
            "low":25120,
            "close":25290
        },
        {
            "date":"2026-06-24",
            "open":25290,
            "high":25450,
            "low":25210,
            "close":21340
        },
        {
            "date":"2026-06-25",
            "open":25340,
            "high":25490,
            "low":25280,
            "close":23410
        },
        {
            "date":"2026-06-26",
            "open":25410,
            "high":25510,
            "low":25350,
            "close":25480
        },
        {
            "date":"2026-06-27",
            "open":25480,
            "high":25580,
            "low":25390,
            "close":19520
        },
        {
            "date":"2026-06-30",
            "open":25520,
            "high":25640,
            "low":25460,
            "close":17590
        },
        {
            "date":"2026-07-01",
            "open":25590,
            "high":25720,
            "low":25510,
            "close":15680
        }];

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
                        dataKey="close"
                        stroke="#2563eb"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StockChart;