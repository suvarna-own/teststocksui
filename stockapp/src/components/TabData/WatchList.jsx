import { useEffect, useState } from "react";
import axios from "axios";
//import { useTheme } from "../context/ThemeContext";

function WatchList() {
    const [stocks, setStocks] = useState([]);
    const [watchList, setWatchList] = useState([]);

    // Load stock data
    useEffect(() => {
        loadStocks();
        loadWatchList();
    }, []);

    const loadStocks = async () => {
        try {
            // Replace with your stock API
            const res = await axios.get("http://localhost:8000/api/stocks");
            console.log(res.data.data);
            setStocks(res.data.data);
        } catch (err) {
            console.error("Error loading stocks:", err);
        }
    };

    const loadWatchStocks = async () => {
        try {
            // Replace with your stock API
            const res = await axios.get("http://localhost:5000/watchlist");
            console.log(res.data.data);
            setWatchList(res.data.data);
        } catch (err) {
            console.error("Error loading Watchlist stocks:", err);
        }
    };

    // Add to watchlist
    const handleWatchlist = async (stock) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/watchlist",
                {
                    symbol: stock.symbol,
                    name: stock.name,
                    price: stock.price,
                    change: stock.change,
                    change_percent: stock.change_percent,
                    volume: stock.volume,
                    market_cap: stock.market_cap,
                }
            );
            const payload = {
                symbol: stock.symbol,
                    name: stock.name,
                    price: stock.price,
                    change: stock.change,
                    change_percent: stock.change_percent,
                    volume: stock.volume,
                    market_cap: stock.market_cap,
            };

            console.log(payload);
            console.log("Sending watchlist button:", stock);

            alert(response.data.message);

            loadWatchList();
        } catch (err) {
            console.error("Watchlist Error:", err);

        }
    };

    // Load watched stocks
    const loadWatchList = async () => {
      
        try {
            const res = await axios.get("http://localhost:5000/watchlist");

            console.log("Watchlist Response:", res.data);
            console.log(Array.isArray(res.data));

            setWatchList(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        console.log("Updated watchList:", watchList);
    }, [watchList]);

 return (
        <div >
            <section className="table-wrap">
                <h2>Stock List</h2>

                <table border="1" cellPadding="8" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change</th>
                            <th>Change %</th>
                            <th>Volume</th>
                            <th>Market Cap</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            Array.isArray(stocks) &&
                            stocks.map((stock) => (
                                <tr key={stock.symbol}>
                                    <td>{stock.symbol}</td>
                                    <td>{stock.name}</td>
                                    <td>{stock.price}</td>
                                    <td>{stock.change}</td>
                                    <td>{stock.change_percent}</td>
                                    <td>{stock.volume}</td>
                                    <td>{stock.market_cap}</td>
                                    <td>
                                        <button onClick={() => handleWatchlist(stock)} className="btn btn-primary">
                                           + WatchList
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <br />

                <h2>Stocks WatchList</h2>

                <table border="1" cellPadding="8" className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Symbol</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change</th>
                            <th>Change %</th>
                            <th>Volume</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>

                    <tbody>

                        {Array.isArray(watchList) &&
                            watchList.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.symbol}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.change}</td>
                                    <td>{item.change_percent}</td>
                                    <td>{item.volume}</td>
                                    <td>{item.market_cap}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default WatchList;