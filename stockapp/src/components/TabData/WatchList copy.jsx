import { useEffect, useState } from 'react'
import MyPagination from '../MyPagination'
import Samplewatchlist1 from './SampleWatchList1'

function WatchList() {
    const [watchlist, setWatchlist] = useState([])
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
            <main className="stock-dashboard">

                <header className="stock-header">
                    <div>
                        <h1>WatchList Data</h1>
                        {/* <p>Streaming data from <code>http://localhost:8000/watchlist</code></p> */}
                    </div>


                    <div className="status-row">
                        <span className={`status-chip ${status.toLowerCase()}`}>{status}</span>
                        <span>{watchlist.length} symbols</span>
                        {lastUpdateAt ? <span>Updated {new Date(lastUpdateAt).toLocaleTimeString()}</span> : null}
                    </div>
                </header>

                {error ? <div className="error-message">{error}</div> : null}

                <section className="table-wrap">
                    <table className="table  table-striped">
                        <thead >
                            <tr>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>Change %</th>
                                <th>Volume</th>
                                <th>Market Cap</th>
                                <th>Timestamp</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {watchlist.map((stock) => {
                                const changeClass = stock.change > 0 ? 'positive' : stock.change < 0 ? 'negative' : ''
                                const percentClass = stock.change_percent > 0 ? 'positive' : stock.change_percent < 0 ? 'negative' : ''
                                return (
                                    <tr key={stock.symbol}>
                                        <td>{stock.symbol}</td>
                                        <td>{stock.name}</td>
                                        <td>${stock.price?.toFixed(2)}</td>
                                        <td className={changeClass}>{stock.change?.toFixed(2)}</td>
                                        <td className={percentClass}>{stock.change_percent?.toFixed(2)}%</td>
                                        <td>{stock.volume != null ? stock.volume.toLocaleString() : '-'}</td>
                                        <td>{stock.market_cap != null ? `${stock.market_cap.toFixed(2)}B` : '-'}</td>
                                        <td>{stock.timestamp ? new Date(stock.timestamp).toLocaleTimeString() : '-'}</td>
                                        <td><button className='btn btn-primary'
                                            onClick={() => addToWatchlist(stock)}
                                        >
                                            Add To WatchList
                                        </button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>

                <h2>My New Watchlist from API</h2>
                <section className="table-wrap">
                    <table className="table  table-striped">
                        <thead >
                            <tr>
                                <th>Symbol</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Change</th>
                                <th>Change %</th>
                                <th>Volume</th>
                                <th>Market Cap</th>
                                <th>Timestamp</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addwatchlist.map((stock) => {
                                const changeClass = stock.change > 0 ? 'positive' : stock.change < 0 ? 'negative' : ''
                                const percentClass = stock.change_percent > 0 ? 'positive' : stock.change_percent < 0 ? 'negative' : ''
                                return (
                                    <tr key={stock.symbol}>
                                        <td>{stock.symbol}</td>
                                        <td>{stock.name}</td>
                                        <td>${stock.price?.toFixed(2)}</td>
                                        <td className={changeClass}>{stock.change?.toFixed(2)}</td>
                                        <td className={percentClass}>{stock.change_percent?.toFixed(2)}%</td>
                                        <td>{stock.volume != null ? stock.volume.toLocaleString() : '-'}</td>
                                        <td>{stock.market_cap != null ? `${stock.market_cap.toFixed(2)}B` : '-'}</td>
                                        <td>{stock.timestamp ? new Date(stock.timestamp).toLocaleTimeString() : '-'}</td>
                                        <td><button className='btn btn-primary'
                                            onClick={() => removeFromwatchlist(stock.symbol)}
                                        >
                                            Remove From WatchList
                                        </button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </section>
                <MyPagination />
            </main>


        </>
    )
}

export default WatchList
