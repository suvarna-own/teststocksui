import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [stocks, setStocks] = useState([])
  const [status, setStatus] = useState('Connecting...')
  const [error, setError] = useState(null)
  const [lastUpdateAt, setLastUpdateAt] = useState(null)

  useEffect(() => {
    const defaultWs = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/api/stocks`
    const defaultHttp = `${window.location.protocol}//${window.location.host}/api/stocks`
    const WS_URL = import.meta.env.VITE_STOCK_WS_URL ?? defaultWs
    const HTTP_URL = import.meta.env.VITE_STOCK_HTTP_URL ?? defaultHttp
    let socket = null
    let pollInterval = null
    let hasFallenBack = false

    const fetchStocks = async () => {
      try {
        const response = await fetch(HTTP_URL)
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }
        const payload = await response.json()
        if (payload?.success && Array.isArray(payload.data)) {
          setStocks(payload.data)
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
      fetchStocks()
      pollInterval = window.setInterval(fetchStocks, 5000)
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
        setStatus('Connected')
        setError(null)
      })

      socket.addEventListener('message', (event) => {
        try {
          const payload = JSON.parse(event.data)
          if (payload?.success && Array.isArray(payload.data)) {
            setStocks(payload.data)
            setLastUpdateAt(payload.timestamp || new Date().toISOString())
          }
        } catch (parseError) {
          setError('Failed to parse stock feed')
        }
      })

      socket.addEventListener('error', (event) => {
        console.error('WebSocket error', event)
        if (!hasFallenBack) {
          setStatus('Error')
          setError('WebSocket connection failed')
          startPolling()
        }
      })

      socket.addEventListener('close', (event) => {
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
      if (socket) {
        socket.close()
      }
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, [])

  return (
    <main className="stock-dashboard">
      <header className="stock-header">
        <div>
          <h1>Live Stock Feed</h1>
          <p>Streaming data from <code>http://localhost:8000/api/stocks</code></p>
        </div>
        <div className="status-row">
          <span className={`status-chip ${status.toLowerCase()}`}>{status}</span>
          <span>{stocks.length} symbols</span>
          {lastUpdateAt ? <span>Updated {new Date(lastUpdateAt).toLocaleTimeString()}</span> : null}
        </div>
      </header>

      {error ? <div className="error-message">{error}</div> : null}

      <section className="table-wrap">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Price</th>
              <th>Change</th>
              <th>Change %</th>
              <th>Volume</th>
              <th>Market Cap</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => {
              const changeClass = stock.change > 0 ? 'positive' : stock.change < 0 ? 'negative' : ''
              const percentClass = stock.change_percent > 0 ? 'positive' : stock.change_percent < 0 ? 'negative' : ''
              return (
                <tr key={stock.symbol}>
                  <td>{stock.symbol}</td>
                  <td>{stock.name}</td>
                  <td>${stock.price?.toFixed(2)}</td>
                  <td className={changeClass}>{stock.change?.toFixed(2)}</td>
                  <td className={percentClass}>{stock.change_percent?.toFixed(2)}%</td>
                  <td>{stock.volume?.toLocaleString()}</td>
                  <td>{stock.market_cap?.toFixed(2)}B</td>
                  <td>{new Date(stock.timestamp).toLocaleTimeString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </main>
  )
}

export default App
