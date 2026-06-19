import { useEffect, useState } from 'react'

export default function Buy() {
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
            <div class="relative font-inter antialiased">

                <main class="relative min-h-screen flex flex-col  bg-slate-50 overflow-hidden">
                    <div class="w-full max-w mx-auto px-4 md:px-5 py-24">
                        <div class="flex justify-center">

                            <div class="w-full max-w bg-white shadow-xl rounded-2xl">
                                <header class="px-4 py-3 border-b border-slate-200">
                                    <h2 class="font-semibold text-slate-900">My Wallet</h2>
                                </header>
                                <div class="p-3">

                                    <div class="overflow-x-auto">
                                        <table class=" table table-auto w-full table-striped">
                                            <thead class="text-[13px] text-slate-500/70">
                                                <tr>
                                                    <th class="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Symbol</th>
                                                    </th>
                                                    <th class="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Name</th>
                                                    </th>
                                                    <th class="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Price</th>
                                                    </th>
                                                    <th class="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Change</th>
                                                    </th>
                                                    <th class="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Change%</th>                                                    </th>
                                                    <th class="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Volume</th>                                                    </th>
                                                    <th class="px-5 py-2 first:pl-3 last:pr-3 bg-slate-100 first:rounded-l last:rounded-r last:pl-5 last:sticky last:right-0">
                                                        <th>Market Cap</th>                                                    </th>

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
                                                            <td className="px-5 py-3  border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                                <button className="bg-blue-500  hover:bg-blue-700 text-white py-2 px-4 rounded-5">
                                                                    Sell / Buy
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>

                                            {/* <tbody class="text-sm font-medium">

                                                <tr>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <div class="text-slate-500">1</div>
                                                    </td>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <div class="flex items-center">
                                                            <svg class="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                                                                <circle cx="18" cy="18" r="18" fill="#FFA037" />
                                                                <path fill="#fff" d="M24.563 16.236c.282-1.891-1.157-2.908-3.127-3.586l.64-2.562-1.56-.389-.622 2.495c-.41-.103-.831-.199-1.25-.294l.627-2.511L17.71 9l-.638 2.561c-.34-.077-.673-.153-.996-.234l.002-.008-2.15-.537-.416 1.666s1.157.265 1.133.281c.631.158.746.576.727.907l-.728 2.92c.044.01.1.026.162.051-.052-.013-.107-.027-.165-.04l-1.02 4.088c-.077.192-.273.48-.714.37.016.023-1.134-.282-1.134-.282L11 22.528l2.03.506c.377.095.747.194 1.112.287l-.646 2.591 1.558.389.639-2.564c.426.116.839.222 1.243.323l-.637 2.551 1.56.389.645-2.587c2.66.504 4.659.3 5.5-2.105.679-1.936-.033-3.053-1.432-3.782 1.019-.235 1.787-.905 1.991-2.29Zm-3.564 4.997c-.482 1.936-3.742.89-4.8.627l.857-3.433c1.057.264 4.447.786 3.943 2.806Zm.483-5.025c-.44 1.762-3.154.867-4.034.647l.776-3.113c.88.219 3.716.629 3.258 2.466Z" />
                                                            </svg>
                                                            <div class="text-slate-900">Bitcoin</div>
                                                        </div>
                                                    </td>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <div class="text-slate-500">BTC</div>
                                                    </td>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <div class="text-slate-900">$67,177.77</div>
                                                    </td>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <div class="text-slate-900">19,672,925</div>
                                                    </td>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <div class="text-emerald-500">0.7%</div>
                                                    </td>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <div class="text-emerald-500">1.34%</div>
                                                    </td>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <div class="text-red-500">-5.42%</div>
                                                    </td>
                                                    <td class="px-5 py-3 border-b border-slate-200 last:border-none first:pl-3 last:pr-3 last:bg-gradient-to-r last:from-transparent last:to-white last:to-[12px] last:pl-5 last:sticky last:right-0">
                                                        <button class="h-8 whitespace-nowrap justify-center rounded-full px-3 py-1 text-sm font-medium text-indigo-500 hover:text-white border border-slate-200 shadow-sm hover:bg-indigo-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors group">
                                                            Sell <span class="text-slate-200 group-hover:text-indigo-400 transition-colors">/</span> Buy
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody> */}
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


