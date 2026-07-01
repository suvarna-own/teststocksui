import { useEffect, useState } from 'react'
import axios from "axios";

export default function Buy() {
    const [watchlist, setWatchlist] = useState([])
    const [buyList, setBuyList] = useState([])
    const [addwatchlist, setAddWatchlist] = useState([])
    const [status, setStatus] = useState('Connecting...')
    const [error, setError] = useState(null)
    const [lastUpdateAt, setLastUpdateAt] = useState(null)
    const addToWatchlist = (stock) => {
        setAddWatchlist((prev) => {
            const exists = prev.find((item) => item.symbol === stock.symbol);
            if (exists) return prev;
            return [...prev, stock];
        });
    };

    const removeFromwatchlist = (symbol) => {
        setAddWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
    };
    //  console.log(watchlist);
    // const handleBuy = async (stock) => {
    //     try {
    //         const response = await fetch("http://localhost:5000/buy", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(stock)
    //         });

    //         const result = await response.json();

    //         alert(result.message);

    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    // const handleBuy = async (stock) => {
    //     // e.preventDefault();

    //     await axios.post(
    //         "http://localhost:5000/buy",
    //         stock
    //  
    //    );
    //    const handleBuy = async (stock) => {
    //     try {
    //         // Replace with '/api/buy' if using Vite proxy, 
    //         // or 'http://localhost:5000/buy' if CORS is fixed on backend
    //         const response = await axios.post('http://localhost:5000/buy', {
    //            stock, // Sending the array of objects in the request body
    //         });

    //         alert('Data saved successfully!');
    //         console.log('Server Response:', response.data);
    //     } catch (error) {
    //         console.error('Error saving data:', error);
    //         alert('Failed to save data. Check console for CORS or network errors.');
    //     }


    // };
    const handleBuy = async (stock) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/buy",
                stock
            );
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };


    useEffect(() => {
        const defaultWs = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/api/stocks`
        const defaultHttp = `${window.location.protocol}//${window.location.host}/api/stocks`
        const HTTP_URL = import.meta.env.VITE_STOCK_HTTP_URL ?? defaultHttp
        const WS_URL = import.meta.env.VITE_STOCK_WS_URL ?? defaultWs
        let socket = null
        let pollInterval = null
        let hasFallenBack = false
        let isUnmounted = false


        const fetchWatchlist = async () => {
            try {
                const response = await fetch(HTTP_URL)
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`)
                }
                const contentType = response.headers.get('content-type') ?? ''
                let payload

                if (contentType.includes('application/json')) {
                    payload = await response.json()
                } else {
                    const text = await response.text()
                    throw new Error(`Expected JSON but received: ${text.slice(0, 120)}`)
                }

                if (payload?.success && Array.isArray(payload.data)) {
                    setWatchlist(payload.data)
                    setLastUpdateAt(payload.timestamp || new Date().toISOString())
                    setStatus(hasFallenBack ? 'Polling' : 'Connected')
                    setError(null)
                } else {
                    throw new Error('Invalid stock payload')
                }
            } catch (fetchError) {
                setError(`HTTP fallback failed: ${fetchError.message}`)
            }
        }


        const startPolling = () => {
            if (pollInterval) return
            hasFallenBack = true
            setStatus('Polling')
            fetchWatchlist()
            pollInterval = window.setInterval(fetchWatchlist, 5000)
        }

        const createWebSocket = () => {
            try {
                socket = new WebSocket(WS_URL)
            } catch (openError) {
                setError(`WebSocket init failed: ${openError.message}`)
                startPolling()
                return
            }

            socket.addEventListener('open', () => {
                if (isUnmounted) return
                setStatus('Connected')
                setError(null)
            })

            socket.addEventListener('message', (event) => {
                if (isUnmounted) return
                try {
                    const payload = JSON.parse(event.data)
                    if (payload?.success && Array.isArray(payload.data)) {
                        setWatchlist(payload.data)
                        setLastUpdateAt(payload.timestamp || new Date().toISOString())
                    }
                } catch (parseError) {
                    setError('Failed to parse stock feed')
                }
            })

            socket.addEventListener('error', (event) => {
                if (isUnmounted) return
                console.error('WebSocket error', event)
                if (!hasFallenBack) {
                    setStatus('Error')
                    setError('WebSocket connection failed')
                    startPolling()
                }
            })

            socket.addEventListener('close', (event) => {
                if (isUnmounted) return
                const reason = event.reason || 'No reason provided'
                setStatus('Disconnected')
                if (!event.wasClean || event.code === 1006) {
                    setError(`WebSocket disconnected abnormally (${event.code}): ${reason}`)
                    if (!hasFallenBack) {
                        startPolling()
                    }
                }
            })
        }

        createWebSocket()

        return () => {
            isUnmounted = true
            if (socket) {
                socket.close()
            }
            if (pollInterval) {
                clearInterval(pollInterval)
            }
        }
    }, [])


    return (
        <>
            <div className="relative font-inter antialiased">

                <main className="relative min-h-screen flex flex-col  bg-slate-50 overflow-hidden">
                    <div className="w-full max-w mx-auto px-2 py-3">
                        <div className="flex justify-center">

                            <div className="w-full max-w bg-white shadow-xl rounded-2xl">
                                <header className="px-4 py-3 border-b border-slate-200">
                                    <h3 className="font-semibold text-slate-900">My Wallet</h3>
                                </header>
                                <div className="p-3">

                                    <div className="overflow-x-auto">
                                        <table className=" table table-auto w-full table-striped">
                                            <thead className="text-[13px] text-slate-500/70">
                                                <tr>
                                                    <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Symbol</th>
                                                    </th>
                                                    <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Name</th>
                                                    </th>
                                                    <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Price</th>
                                                    </th>
                                                    <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Change</th>
                                                    </th>
                                                    <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Change%</th>                                                    </th>
                                                    <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Volume</th>                                                    </th>
                                                    <th className="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Market Cap</th>                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {watchlist.map((stock) => {
                                                    return (
                                                        <tr key={stock.symbol}>
                                                            <td>{stock.symbol}</td>
                                                            <td>{stock.name}</td>
                                                            <td>${stock.price?.toFixed(2)}</td>
                                                            <td>{stock.change?.toFixed(2)}</td>
                                                            <td>{stock.change_per?.toFixed(2)}%</td>
                                                            <td>{stock.volume != null ? stock.volume.toLocaleString() : '-'}</td>
                                                            <td>{stock.market_cap != null ? `${stock.market_cap.toFixed(2)}B` : '-'}</td>
                                                            <td className="px-5 py-2  border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                                <button className="bg-blue-500  hover:bg-blue-700 text-white py-2 px-4 rounded-5" onClick={() => handleBuy(stock)}>
                                                                    Sell / Buy
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>

                                        </table>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>



            </div>


        </>

    );
}


