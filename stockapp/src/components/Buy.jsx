import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

function Buy() {

    const { theme } = useTheme();
    const [stocks, setStocks] = useState([]);
    const [buyList, setBuyList] = useState([]);
    const [sellList, setSellList] = useState([]);

    // Load stock data
    useEffect(() => {
        loadStocks();
        loadBuyList();
        loadSellList();
    }, []);



    const loadStocks = async () => {
        debugger
        try {
            // Replace with your stock API
            const res = await axios.get("http://localhost:8000/api/stocks");
            console.log(res.data.data);
            setStocks(res.data.data);
        } catch (err) {
            console.error("Error loading stocks:", err);
        }
    };

    // Buy selected stock
    const handleBuy = async (stock) => {
        debugger
        try {
            console.log("Sending buy button:", stock);

            const response = await axios.post(
                "http://localhost:5000/buy",
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

            alert(response.data.message);

            loadBuyList();
        } catch (err) {
            console.error("Buy Error:", err);

            if (err.response) {
                console.log("Status:", err.response.status);
                console.log("Data:", err.response.data);
            }
        }
    };

    // Load purchased stocks
    const loadBuyList = async () => {
        debugger
        try {
            const res = await axios.get("http://localhost:5000/buy");

            console.log("Buy Response:", res.data);
            console.log(Array.isArray(res.data));

            setBuyList(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        console.log("Updated buyList:", buyList);
    }, [buyList]);





    // Load need to sell stocks
    const loadSellList = async () => {
        try {
            const res = await axios.get("http://localhost:5000/sell");
            setSellList(res.data);
        } catch (err) {
            console.error("Error loading sell list:", err);
        }
    };
    useEffect(() => {
        console.log("Updated buyList:", buyList);
    }, [sellList]);


    // Sell selected stock
    const handleSell = async (item) => {
        debugger
        try {
            console.log("Sending sell btn:", item);

            const response = await axios.post(
                "http://localhost:5000/sell",
                {
                    symbol: item.symbol,
                    name: item.name,
                    price: item.price,
                    change: item.change,
                    change_percent: item.change_percent,
                    volume: item.volume,
                    market_cap: item.market_cap,
                }
            );

            alert(response.data.message);

        } catch (err) {
            console.error("Sell Error:", err);

            if (err.response) {
                console.log("Status:", err.response.status);
                console.log("Data:", err.response.data);
            }
        }
    };


    return (
        <div className={`buy-page ${theme}`}>
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
                                        <button onClick={() => handleBuy(stock)} className="btn btn-primary">
                                            Buy
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                <br />

                <h2>Purchased Stocks</h2>

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

                        {Array.isArray(buyList) &&
                            buyList.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.symbol}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.change}</td>
                                    <td>{item.change_percent}</td>
                                    <td>{item.volume}</td>
                                    <td>{item.market_cap}</td>
                                    <td>
                                        <button onClick={() => handleSell(item)} className="btn btn-primary">
                                            Sell
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Buy;