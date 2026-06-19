import { useState, useEffect, useRef } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Constants ───────────────────────────────────────────────────────────────

const BASE_URL = "https://finnhub.io/api/v1";

// FIX: Only use resolutions supported on free tier.
// Intraday (1,5,15,30,60) often returns no_data on free accounts.
// Use "D" for all ranges — reliable on every free-tier key.
const RANGES = [
  { label: "1W", days: 10, resolution: "D" }, // extra buffer for weekends
  { label: "1M", days: 35, resolution: "D" },
  { label: "3M", days: 100, resolution: "D" },
  { label: "1Y", days: 370, resolution: "W" },
];

const POPULAR = ["AAPL", "TSLA", "GOOGL", "MSFT", "NVDA", "AMZN"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeLocalGet(key) {
  try { return localStorage.getItem(key) || ""; } catch { return ""; }
}
function safeLocalSet(key, val) {
  try { localStorage.setItem(key, val); } catch { /* noop */ }
}
function safeLocalRemove(key) {
  try { localStorage.removeItem(key); } catch { /* noop */ }
}

function formatDate(ts, rangeLabel) {
  const d = new Date(ts * 1000);
  if (rangeLabel === "1Y") {
    return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function MetricCard({ label, value, color }) {
  return (
    <div style={styles.metricCard}>
      <p style={styles.metricLabel}>{label}</p>
      <p style={{ ...styles.metricValue, ...(color ? { color } : {}) }}>{value}</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={styles.tooltip}>
      <p style={styles.tooltipDate}>{label}</p>
      <p style={styles.tooltipPrice}>${Number(payload[0].value).toFixed(2)}</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function StockChart() {
  // const [apiKey, setApiKey]         = useState(() => safeLocalGet("finnhub_key"));
  const apiKey = "d8psnghr01qtgb4j3k5gd8psnghr01qtgb4j3k60";
  const [keyInput, setKeyInput] = useState("");
  const [symbol, setSymbol] = useState("AAPL");
  const [symbolInput, setSymbolInput] = useState("AAPL");
  const [rangeIdx, setRangeIdx] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [quote, setQuote] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Use a ref so fetchData can always read latest apiKey/symbol/range
  // without being a dependency that causes infinite re-renders (FIX #3)
  const stateRef = useRef({});
  stateRef.current = { apiKey, symbol, rangeIdx };

  // ── Fetch ──────────────────────────────────────────────────────────────────

  async function fetchData(key, sym, rIdx) {
    if (!key || !sym) return;

    const range = RANGES[rIdx];
    const now = Math.floor(Date.now() / 1000);
    // FIX #4: Add extra buffer days to handle weekends/holidays at boundaries
    const from = now - range.days * 86400;

    setLoading(true);
    setError("");
    setChartData([]);

    try {
      // FIX: Use X-Finnhub-Token header as backup + token query param
      const headers = { "X-Finnhub-Token": key };

      const [candleRes, quoteRes, profileRes] = await Promise.all([
        fetch(
          `${BASE_URL}/stock/candle?symbol=${sym}&resolution=${range.resolution}&from=${from}&to=${now}&token=${key}`,
          { headers }
        ),
        fetch(`${BASE_URL}/quote?symbol=${sym}&token=${key}`, { headers }),
        fetch(`${BASE_URL}/stock/profile2?symbol=${sym}&token=${key}`, { headers }),
      ]);

      // FIX: Check HTTP status before parsing JSON
      if (!candleRes.ok) {
        setError(`API error ${candleRes.status}: Check your API key.`);
        setLoading(false);
        return;
      }

      const candle = await candleRes.json();
      const quoteData = await quoteRes.json();
      const profileData = await profileRes.json();

      // FIX: Detailed no_data handling with helpful message
      if (candle.s === "no_data" || !Array.isArray(candle.c) || candle.c.length === 0) {
        setError(
          `No candle data for "${sym}" in range "${range.label}". ` +
          `This can happen if markets were closed or the symbol is invalid. ` +
          `Try a different range or symbol.`
        );
        setLoading(false);
        return;
      }

      // FIX: Check for rate-limit / auth error object from Finnhub
      if (quoteData.error) {
        setError(`Finnhub error: ${quoteData.error}`);
        setLoading(false);
        return;
      }

      // Build chart points
      const points = candle.t.map((ts, i) => ({
        date: formatDate(ts, range.label),
        price: candle.c[i],
        open: candle.o[i],
        high: candle.h[i],
        low: candle.l[i],
      }));

      setChartData(points);
      setQuote(quoteData);
      setProfile(profileData?.name ? profileData : null);
    } catch (e) {
      setError("Network error: " + e.message + ". Check your internet connection.");
    } finally {
      setLoading(false);
    }
  }

  // FIX #3: Explicit primitive deps — no unstable function reference
  useEffect(() => {
    if (apiKey) fetchData(apiKey, symbol, rangeIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, symbol, rangeIdx]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  function handleSaveKey() {
    const k = keyInput.trim();
    if (!k) return;
    safeLocalSet("finnhub_key", k);
    setApiKey(k);
    setKeyInput("");
  }

  function handleLoad() {
    const s = symbolInput.trim().toUpperCase();
    if (s && s !== symbol) setSymbol(s);
    else if (s === symbol) fetchData(apiKey, s, rangeIdx); // force refresh
  }

  function handleQuickPick(s) {
    setSymbolInput(s);
    setSymbol(s);
  }

  function handleChangeKey() {
    safeLocalRemove("finnhub_key");
    setApiKey("");
    setChartData([]);
    setQuote(null);
    setProfile(null);
    setError("");
  }

  // ── Derived values ─────────────────────────────────────────────────────────

  const change = quote ? quote.c - quote.pc : 0;
  const changePct = quote && quote.pc ? (change / quote.pc) * 100 : 0;
  const isUp = change >= 0;
  const chartColor = isUp ? "#1d9e75" : "#e24b4a";

  // ── Render ─────────────────────────────────────────────────────────────────

  // Step 1 — No API key yet
  if (!apiKey) {
    return (
      <div style={styles.root}>
        <div style={styles.apiBox}>
          <h2 style={styles.apiTitle}>Connect Finnhub</h2>
          <p style={styles.apiHint}>
            Get a free key at{" "}
            <a href="https://finnhub.io/register" target="_blank" rel="noreferrer" style={styles.link}>
              finnhub.io/register
            </a>{" "}
            — no credit card, 60 calls/min on the free tier.
          </p>
          <div style={styles.apiRow}>
            <input
              type="password"
              placeholder="Paste API key here…"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveKey()}
              style={styles.textInput}
              autoFocus
            />
            <button onClick={handleSaveKey} style={styles.btnPrimary} disabled={!keyInput.trim()}>
              Save & Load
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2 — Main chart UI
  return (
    <div className="w-full" style={styles.root}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.symbolHeading}>{symbol}</h1>
          {profile?.name && <p style={styles.companyName}>{profile.name}</p>}
        </div>
        <button onClick={handleChangeKey} style={styles.btnGhost}>Change key</button>
      </div>

      {/* Quick symbol pills */}
      <div style={styles.pillRow}>
        {POPULAR.map((s) => (
          <button
            key={s}
            onClick={() => handleQuickPick(s)}
            style={{ ...styles.pill, ...(symbol === s ? styles.pillActive : {}) }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={styles.controlRow}>
        <input
          type="text"
          value={symbolInput}
          onChange={(e) => setSymbolInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && handleLoad()}
          maxLength={8}
          placeholder="Symbol…"
          style={{ ...styles.textInput, width: 110 }}
        />
        <button onClick={handleLoad} style={styles.btnPrimary}>Load ↗</button>

        <span style={{ flex: 1 }} />

        {RANGES.map((r, i) => (
          <button
            key={r.label}
            onClick={() => setRangeIdx(i)}
            style={{ ...styles.rangeBtn, ...(rangeIdx === i ? styles.rangeBtnActive : {}) }}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Metric cards */}
      {quote && !loading && (
        <div style={styles.metricsGrid}>
          <MetricCard label="Price" value={`$${quote.c.toFixed(2)}`} />
          <MetricCard
            label="Change"
            value={`${isUp ? "+" : ""}${change.toFixed(2)} (${isUp ? "+" : ""}${changePct.toFixed(2)}%)`}
            color={chartColor}
          />
          <MetricCard label="Open" value={`$${quote.o.toFixed(2)}`} />
          <MetricCard label="Prev Close" value={`$${quote.pc.toFixed(2)}`} />
          <MetricCard label="Day High" value={`$${quote.h.toFixed(2)}`} />
          <MetricCard label="Day Low" value={`$${quote.l.toFixed(2)}`} />
        </div>
      )}

      {/* Chart area */}
      <div style={styles.chartBox}>
        {loading && (
          <div style={styles.centerOverlay}>
            <div style={styles.spinner} />
            <p style={styles.overlayText}>Fetching {symbol}…</p>
          </div>
        )}

        {!loading && error && (
          <div style={styles.centerOverlay}>
            <p style={styles.errorText}>{error}</p>
            <button onClick={() => fetchData(apiKey, symbol, rangeIdx)} style={styles.btnPrimary}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.12)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#999" }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                orientation="right"
                tick={{ fontSize: 11, fill: "#999" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v.toFixed(0)}`}
                width={58}
                domain={["auto", "auto"]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke={chartColor}
                strokeWidth={1.8}
                fill="url(#grad)"
                dot={false}
                activeDot={{ r: 4, fill: chartColor, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <p style={styles.footer}>
        Data via Finnhub · Daily close prices · Free tier: 60 calls/min
      </p>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  root: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    
    margin: "0 auto",
    padding: "24px 20px",
    color: "#111",
    boxSizing: "border-box",
  },
  apiBox: {
    border: "1px solid #e4e4e4",
    borderRadius: 14,
    padding: "24px",
    background: "#fafafa",
  },
  apiTitle: { fontSize: 18, fontWeight: 600, margin: "0 0 6px" },
  apiHint: { fontSize: 13, color: "#666", margin: "0 0 16px" },
  apiRow: { display: "flex", gap: 8 },
  link: { color: "#185fa5" },
  header: {
    display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", marginBottom: 16,
  },
  symbolHeading: { fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.5px" },
  companyName: { fontSize: 13, color: "#777", margin: "3px 0 0" },
  pillRow: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 },
  pill: {
    fontSize: 12, padding: "4px 11px", cursor: "pointer",
    borderRadius: 20, border: "1px solid #e0e0e0",
    background: "transparent", color: "#555",
    transition: "all .15s",
  },
  pillActive: { background: "#111", color: "#fff", borderColor: "#111" },
  controlRow: {
    display: "flex", flexWrap: "wrap", gap: 8,
    alignItems: "center", marginBottom: 20,
  },
  textInput: {
    padding: "8px 12px", fontSize: 14,
    border: "1px solid #ddd", borderRadius: 9,
    outline: "none", background: "#fff",
    transition: "border-color .15s",
  },
  btnPrimary: {
    padding: "8px 18px", fontSize: 13, fontWeight: 500,
    background: "#111", color: "#fff", border: "none",
    borderRadius: 9, cursor: "pointer",
    opacity: 1, transition: "opacity .15s",
  },
  btnGhost: {
    padding: "6px 12px", fontSize: 12,
    background: "transparent", color: "#777",
    border: "1px solid #e0e0e0", borderRadius: 8, cursor: "pointer",
  },
  rangeBtn: {
    fontSize: 12, padding: "5px 13px", cursor: "pointer",
    borderRadius: 7, border: "1px solid #e0e0e0",
    background: "transparent", color: "#666",
    transition: "all .15s",
  },
  rangeBtnActive: {
    background: "#f2f2f2", color: "#111",
    borderColor: "#bbb", fontWeight: 500,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(115px, 1fr))",
    gap: 10, marginBottom: 18,
  },
  metricCard: {
    background: "#f6f6f6", borderRadius: 10, padding: "10px 14px",
  },
  metricLabel: {
    fontSize: 10, color: "#999", textTransform: "uppercase",
    letterSpacing: ".06em", margin: "0 0 3px",
  },
  metricValue: { fontSize: 15, fontWeight: 600, margin: 0, color: "#111" },
  chartBox: {
    position: "relative", minHeight: 300,
    border: "1px solid #ececec", borderRadius: 14,
    padding: "16px 4px 8px",
    background: "#fff",
  },
  centerOverlay: {
    position: "absolute", inset: 0,
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: 12,
  },
  overlayText: { fontSize: 13, color: "#999", margin: 0 },
  errorText: { fontSize: 13, color: "#c0392b", textAlign: "center", padding: "0 20px", margin: 0 },
  spinner: {
    width: 24, height: 24,
    border: "2px solid #e0e0e0",
    borderTopColor: "#555",
    borderRadius: "50%",
    animation: "spin 0.7s linear infinite",
  },
  tooltip: {
    background: "#fff", border: "1px solid #e8e8e8",
    borderRadius: 9, padding: "8px 13px",
    boxShadow: "0 2px 8px rgba(0,0,0,.06)",
  },
  tooltipDate: { fontSize: 11, color: "#999", margin: "0 0 2px" },
  tooltipPrice: { fontSize: 15, fontWeight: 600, margin: 0, color: "#111" },
  footer: { fontSize: 11, color: "#bbb", textAlign: "center", marginTop: 14 },
};