/* global React, ReactDOM */

// Simple SPA with two routes: Home and Gradients
const { useEffect, useMemo, useState } = React;

// Utility: fetch JSON with local path
async function fetchJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

// Toast system
function useToast() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2000);
    return () => clearTimeout(t);
  }, [msg]);
  return [msg, setMsg];
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      className="toast"
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.8)",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: 6,
        zIndex: 1000,
        fontSize: 14,
        opacity: 1,
      }}
    >
      {message}
    </div>
  );
}

// Router based on hash
function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash.replace(/^#/, "") || "/";
}

function NavBar() {
  return (
    <div className="navBar">
      <a href="#/" className="navTextButton">
        Home
      </a>
      <a href="#/gradients" className="navTextButton">
        Gradients
      </a>
      <a href="#/patterns" className="navTextButton disabled" aria-disabled>
        Patterns
      </a>
    </div>
  );
}

function Home() {
  return (
    <div className="main-container">
      <div className="header-section">
        <h1>Style Portal</h1>
        <p>Your ultimate destination for design inspiration</p>
      </div>
      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Color Gradients</h3>
          <p>
            Explore beautiful gradient combinations from our curated collection
          </p>
          <a href="#/gradients" className="feature-btn">
            Explore Gradients
          </a>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌈</div>
          <h3>Color Patterns</h3>
          <p>Discover color patterns for your design projects (Coming Soon)</p>
          <a className="feature-btn disabled">Coming Soon</a>
        </div>
      </div>
    </div>
  );
}

function GradientCard({ gradient, onCopy, selected }) {
  const bg = useMemo(() => {
    if (!gradient.colors?.length) return "#fff";
    // show stripes like original
    return undefined;
  }, [gradient.colors]);

  return (
    <div
      className={"pattern-card" + (selected ? " selected" : "")}
      onClick={() => onCopy(gradient)}
    >
      <div className="pattern-display" style={{ background: bg }}>
        {gradient.colors.map((c, i) => (
          <div key={i} className="pattern-stripe" style={{ background: c }} />
        ))}
      </div>
      <div className="pattern-info">
        <div className="pattern-title">{gradient.name}</div>
        <div className="pattern-colors">
          {gradient.colors.map((c, i) => (
            <span key={i} className="color-code">
              {c}
            </span>
          ))}
        </div>
        <div className="pattern-type">{gradient.type}</div>
      </div>
    </div>
  );
}

function Gradients() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [copiedName, setCopiedName] = useState(null);
  const [toast, setToast] = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // gradients.json lives alongside index.html
        const data = await fetchJSON("./gradients.json");
        const processed = data
          .filter(
            (g) => g.name && Array.isArray(g.colors) && g.colors.length >= 2
          )
          .map((g) => ({
            ...g,
            type:
              g.colors.length === 2
                ? "2-color"
                : g.colors.length === 3
                ? "3-color"
                : "4-color",
          }));
        if (mounted) setAll(processed);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const counts = useMemo(
    () => ({
      all: all.length,
      "2-color": all.filter((g) => g.type === "2-color").length,
      "3-color": all.filter((g) => g.type === "3-color").length,
      "4-color": all.filter((g) => g.type === "4-color").length,
    }),
    [all]
  );

  const list = useMemo(() => {
    let arr = filter === "all" ? all : all.filter((g) => g.type === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      arr = arr.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.colors.some((c) => c.toLowerCase().includes(q))
      );
    }
    return arr;
  }, [all, filter, search]);

  async function handleCopy(g) {
    try {
      const txt = g.colors.join(", ");
      await navigator.clipboard.writeText(txt);
      setCopiedName(g.name);
      setToast(`Copied: ${txt}`);
      setTimeout(() => setCopiedName(null), 500);
    } catch {
      setToast(`Pattern selected: ${g.name}`);
    }
  }

  return (
    <div className="main-container">
      <div className="header-section">
        <h1>Gradient Gallery</h1>
        <p>Discover beautiful color gradients for your design projects</p>
      </div>

      <div className="filter-section">
        <input
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or color (e.g. #FF, blue, Mango)"
        />
        <div className="filter-buttons">
          {["all", "2-color", "3-color", "4-color"].map((f) => (
            <button
              key={f}
              className={"filter-btn" + (filter === f ? " active" : "")}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All Gradients" : f.replace("-", " ")} (
              {counts[f] || 0})
            </button>
          ))}
        </div>
      </div>

      <div className="patterns-viewport">
        <div className="patterns-grid" id="patternsGrid">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner" />
              <p>Loading gradients...</p>
            </div>
          ) : (
            list.map((g, idx) => (
              <GradientCard
                key={g.name + idx}
                gradient={g}
                onCopy={handleCopy}
                selected={copiedName === g.name}
              />
            ))
          )}
        </div>
      </div>
      <Toast message={toast} />
    </div>
  );
}

function App() {
  const route = useRoute();
  return (
    <>
      <NavBar />
      {route === "/" && <Home />}
      {route === "/gradients" && <Gradients />}
      {route !== "/" && route !== "/gradients" && (
        <div className="main-container">
          <div className="header-section">
            <h1>Not Found</h1>
            <p>The page you requested does not exist.</p>
          </div>
        </div>
      )}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
