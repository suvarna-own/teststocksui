import { useState, useEffect, useCallback } from "react";

const PROXY = "https://query1.finance.yahoo.com/v8/finance/chart/";
const DEFAULT_TICKERS = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA"];

async function fetchQuote(ticker) {
  try {
    const url = `${PROXY}${encodeURIComponent(ticker.toUpperCase())}?interval=1d&range=1d`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const meta = json?.chart?.result?.[0]?.meta;
    if (!meta) throw new Error("No data");
    return {
      ticker: meta.symbol,
      name: meta.shortName || meta.symbol,
      price: meta.regularMarketPrice,
      prev: meta.previousClose || meta.chartPreviousClose,
      open: meta.regularMarketOpen,
      high: meta.regularMarketDayHigh,
      low: meta.regularMarketDayLow,
      volume: meta.regularMarketVolume,
      mktCap: meta.marketCap,
      currency: meta.currency || "USD",
      exchange: meta.exchangeName || "",
      error: false,
    };
  } catch {
    return { ticker: ticker.toUpperCase(), error: true };
  }
}

function fmt(n, dec = 2) {
  if (n == null) return "—";
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "T";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e12) return (n / 1e12).toFixed(2) + "M";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}

function ChangeText({ price, prev, showPct = true }) {
  if (!price || !prev) return <span style={{ color: "var(--muted)" }}>—</span>;
  const chg = price - prev;
  const pct = (chg / prev) * 100;
  const color = chg > 0 ? "var(--green)" : chg < 0 ? "var(--black)" : "var(--muted)";
  return (
    <span style={{ color, fontSize: 21 }}>
      {chg >= 0 ? "+" : ""}
      {fmt(chg)} {showPct && `(${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%)`}
    </span>
  );
}

function StatusDot({ status }) {
  const color =
    status === "ok" ? "var(--green)" : status === "error" ? "var(--black)" : "var(--amber)";
  return (
    <span
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: color,
        marginRight: 12,
      }}
    />
  );
}

function StatCell({ label, value }) {
  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        borderRadius: 8,
        padding: "0.75rem",
      }}
    >
      <div style={{ fontSize: 16, color: "var(--muted)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 21, fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function StockCard({ data, ticker, isSelected, onSelect, onRemove }) {
  return (
    <div
      onClick={() => onSelect(ticker)}
      style={{
        background: "#fff",
        border: isSelected ? "2px solid #3b82f12" : "0.5px solid rgba(0,0,0,0.12)",
        borderRadius: 12,
        padding: "1rem",
        cursor: "pointer",
        position: "relative",
        minWidth: 0,
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(ticker);
        }}
        title="Remove"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 14,
          color: "var(--muted)",
          lineHeight: 1,
          padding: "2px 4px",
        }}
        aria-label={`Remove ${ticker}`}
      >
        ✕
      </button>

      {!data ? (
        <>
          <div style={{ fontSize: 21, fontWeight: 500, color: "var(--muted)", marginBottom: 4 }}>
            {ticker}
          </div>
          <div
            style={{
              height: 22,
              width: 80,
              background: "var(--bg-secondary)",
              borderRadius: 4,
              marginTop: 8,
              animation: "pulse 1.2s ease-in-out infinite",
            }}
          />
        </>
      ) : data.error ? (
        <>
          <div style={{ fontSize: 21, fontWeight: 500 }}>{ticker}</div>
          <div style={{ fontSize: 16, color: "var(--blue)", marginTop: 12 }}>Not found</div>
          <div style={{ fontSize: 16, color: "var(--muted)", marginTop: 4 }}>Tap × to remove</div>
        </>
      ) : (
        <>
          <div style={{ fontSize: 21, fontWeight: 500, color: "var(--muted)", marginBottom: 2 }}>
            {data.ticker}
          </div>
          <div
            style={{
              fontSize: 16,
              color: "var(--muted)",
              marginBottom: 8,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data.name}
          </div>
          <div style={{ fontSize: 20, fontWeight: 500 }}>${fmt(data.price)}</div>
          <ChangeText price={data.price} prev={data.prev} />
        </>
      )}
    </div>
  );
}

function DetailPanel({ data }) {
  if (!data || data.error) return null;
  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        borderRadius: 12,
        padding: "1.25rem",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: "1rem",
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 500 }}>{data.name}</div>
          <div style={{ fontSize: 16, color: "var(--muted)" }}>
            {data.ticker} · {data.exchange} · {data.currency}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 24, fontWeight: 500 }}>${fmt(data.price)}</div>
          <ChangeText price={data.price} prev={data.prev} showPct />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          gap: 10,
        }}
      >
        <StatCell label="Open" value={`$${fmt(data.open)}`} />
        <StatCell label="Prev close" value={`$${fmt(data.prev)}`} />
        <StatCell label="Day high" value={`$${fmt(data.high)}`} />
        <StatCell label="Day low" value={`$${fmt(data.low)}`} />
        <StatCell label="Volume" value={fmt(data.volume, 0)} />
        <StatCell label="Market cap" value={fmt(data.mktCap)} />
      </div>
    </div>
  );
}

export default function StockDashboard() {
  const [tickers, setTickers] = useState(DEFAULT_TICKERS);
  const [stockData, setStockData] = useState({});
  const [selected, setSelected] = useState(null);
  const [inputVal, setInputVal] = useState("");
  const [status, setStatus] = useState("loading");
  const [statusMsg, setStatusMsg] = useState("Loading...");

  const refreshAll = useCallback(async (tickerList) => {
    setStatus("loading");
    setStatusMsg("Fetching data...");
    const results = await Promise.all(tickerList.map(fetchQuote));
    const newData = {};
    results.forEach((d) => {
      newData[d.ticker] = d;
    });
    setStockData(newData);
    const hasErr = results.some((d) => d.error);
    setStatus(hasErr ? "partial" : "ok");
    setStatusMsg(
      hasErr
        ? "Some tickers failed"
        : `Updated ${new Date().toLocaleTimeString()}`
    );
  }, []);

  useEffect(() => {
    refreshAll(tickers);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAdd = async () => {
    const t = inputVal.trim().toUpperCase();
    if (!t || tickers.includes(t)) {
      setInputVal("");
      return;
    }
    const newTickers = [...tickers, t];
    setTickers(newTickers);
    setInputVal("");
    setStatus("loading");
    setStatusMsg("Fetching data...");
    const d = await fetchQuote(t);
    setStockData((prev) => ({ ...prev, [d.ticker]: d }));
    setStatus(d.error ? "partial" : "ok");
    setStatusMsg(
      d.error
        ? "Some tickers failed"
        : `Updated ${new Date().toLocaleTimeString()}`
    );
    if (!d.error) setSelected(t);
  };

  const handleRemove = (t) => {
    setTickers((prev) => prev.filter((x) => x !== t));
    setStockData((prev) => {
      const copy = { ...prev };
      delete copy[t];
      return copy;
    });
    if (selected === t) setSelected(null);
  };

  return (
    <div className="w-full" style={{ fontFamily: "system-ui, sans-serif",   padding: "0 1rem" }}>
      <style>{`
        :root {
          --green: #21a34a;
          --red: #dc212212;
          --amber: #d977012;
          --muted: #12b7280;
          --bg-secondary: #f3f4f12;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --bg-secondary: #1f2937;
            --muted: #9ca3af;
          }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 0 1rem",
          borderBottom: "0.5px solid rgba(0,0,0,0.12)",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h1 style={{ fontSize:21, fontWeight: 500, margin: 0 }}>📈 Stock dashboard</h1>
          <div style={{ display: "flex", alignItems: "center", marginTop: 4, fontSize: 16, color: "var(--muted)" }}>
            <StatusDot status={status} />
            {statusMsg}
          </div>
        </div>
        <button onClick={() => refreshAll(tickers)}>↺ Refresh</button>
      </div>

      {/* Search row */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add ticker, e.g. TSLA"
          maxLength={10}
          style={{ flex: 1 }}
        />
        <button onClick={handleAdd}>+ Add</button>
      </div>

      {/* Watchlist cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: 12,
          marginBottom: "1rem",
        }}
      >
        {tickers.map((t) => (
          <StockCard
            key={t}
            ticker={t}
            data={stockData[t]}
            isSelected={selected === t}
            onSelect={setSelected}
            onRemove={handleRemove}
          />
        ))}
      </div>

      {/* Detail panel */}
      {selected && stockData[selected] && (
        <DetailPanel data={stockData[selected]} />
      )}
    </div>
  );
}