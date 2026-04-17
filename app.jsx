const { useState, useEffect, useMemo } = React;

// ---------- Utilities ----------
const statusClass = (s) => ({
  "critical": "status-critical",
  "off-track": "status-off",
  "reversing": "status-reversing",
  "mixed": "status-mixed",
  "on-track-partial": "status-partial"
})[s] || "status-off";

const statusLabel = (s) => ({
  "critical": "Critical — reversal",
  "off-track": "Off track",
  "reversing": "Trend reversing",
  "mixed": "Mixed progress",
  "on-track-partial": "Partial progress"
})[s] || s;

// Lighten hex by mixing with white for chart tones
const hex2rgb = (h) => {
  const v = h.replace('#', '');
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)];
};

// ---------- Goal card ----------
function Goal({ g, active, onClick, progress }) {
  return (
    <div
      className={"goal" + (active ? " active" : "")}
      data-status={g.status}
      onClick={onClick}>
      
      <div className="goal-top">
        <div className="goal-num">{String(g.n).padStart(2, '0')}</div>
        <div className="goal-chip" style={{ background: g.color }}></div>
      </div>
      <div>
        <div className="goal-title">{g.title}</div>
        <div className="goal-bar-wrap">
          <div className="goal-progress-label">
            <span>Progress</span>
            <span className="goal-pct">{Math.round(progress)}%</span>
          </div>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${Math.min(100, progress)}%`, background: g.color }}></div>
            <div className="bar-target"></div>
          </div>
        </div>
        <div className={"goal-status " + statusClass(g.status)}>
          {statusLabel(g.status)}
        </div>
      </div>
    </div>);

}

// ---------- Detail panel ----------
function Detail({ g, regionLabel, progress }) {
  if (!g) return null;
  const pct = Math.min(100, Math.round(progress));
  const gapPct = 100 - pct;

  return (
    <div className="detail" key={g.n}>
      <div className="detail-left" style={{ background: g.color }}>
        <div className="num">Goal {String(g.n).padStart(2, '0')} · {regionLabel}</div>
        <div className="title">{g.title}</div>
        <div className="target">TARGET · {g.target}</div>
      </div>
      <div className="detail-right">
        <div className="pull">"{g.headline}"</div>

        <div className="kpi-row">
          <div className="kpi">
            <div className="k-label">Current</div>
            <div className="k-value">{g.current}</div>
            <div className="k-sub">{g.metric}</div>
          </div>
          <div className="kpi">
            <div className="k-label">2030 Goal</div>
            <div className="k-value">{g.goal}</div>
            <div className="k-sub">Target value</div>
          </div>
          <div className="kpi">
            <div className="k-label">Projected Progress</div>
            <div className="k-value">{pct}%</div>
            <div className="k-sub">of target met by 2030</div>
          </div>
        </div>

        <div className="gap-viz">
          <div className="gap-label">
            <span>PROJECTED 2030 POSITION</span>
            <span>GAP TO TARGET</span>
          </div>
          <div className="gap-bar">
            <div className="gap-bar-fill" style={{ width: `${pct}%`, background: g.color }}></div>
            <div className="gap-bar-gap" style={{ left: `${pct}%`, right: 0 }}></div>
            <div className="gap-bar-target-line"></div>
          </div>
        </div>

        <div className="shortfall-callout">
          <strong>Projected shortfall · 2030</strong>
          {g.shortfall}
        </div>
      </div>
    </div>);

}

// ---------- Tweaks panel ----------
function Tweaks({ open, region, setRegion }) {
  return (
    <div className={"tweaks-panel" + (open ? " on" : "")}>
      <h4>Tweaks</h4>
      <div className="tw-label">Region Filter</div>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        {window.REGIONS.map((r) =>
        <option key={r.id} value={r.id}>{r.label}</option>
        )}
      </select>
      <div className="tw-hint">
        Progress values re-scale to reflect the selected region's trajectory. World is the default aggregate.
      </div>
    </div>);

}

// ---------- App ----------
function App() {
  // Persist state
  const [activeN, setActiveN] = useState(() => {
    const v = localStorage.getItem('sdg-active');return v ? parseInt(v, 10) : 13;
  });
  const [region, setRegion] = useState(() => localStorage.getItem('sdg-region') || 'world');
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {localStorage.setItem('sdg-active', String(activeN));}, [activeN]);
  useEffect(() => {localStorage.setItem('sdg-region', region);}, [region]);

  // Tweaks handshake
  useEffect(() => {
    const handler = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setTweaksOpen(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const goals = window.SDG_DATA;
  const mod = window.REGION_MOD[region] || window.REGION_MOD.world;
  const regionLabel = (window.REGIONS.find((r) => r.id === region) || {}).label || "World";

  const progressFor = (g) => Math.max(2, Math.min(100, g.progress * (mod[g.n] || 1)));

  // Aggregate: weighted average progress
  const avgProgress = useMemo(() => {
    const vals = goals.map((g) => progressFor(g));
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [region]);

  const offTrackCount = goals.filter((g) => {
    const p = progressFor(g);return p < 50;
  }).length;

  const active = goals.find((g) => g.n === activeN) || goals[0];

  return (
    <div className="frame">
      <div className="masthead">
        <div className="slug">The 2030 Ledger · SDG Shortfall Explainer</div>
        <div className="date">Edition 04 · April 2026 · Region: {regionLabel.toUpperCase()}</div>
      </div>

      <div className="hero">
        <div>
          <div className="eyebrow">Projected shortfall · 17 sustainable development goals</div>
          <h1 className="headline">
            At current pace, the world will miss <em>15 of 17</em> goals by 2030.
          </h1>
          <p className="deck">
            The 17 Sustainable Development Goals were adopted in 2015 as a universal plan to end poverty, protect the planet, and ensure prosperity. Nine years in, trajectories show most targets slipping out of reach.
          </p>
          <p className="deck">
            Click any goal to open its 2030 shortfall. Use the Region filter in Tweaks to compare regional trajectories.
          </p>
        </div>
        <div className="hero-stat">
          <div className="big">{offTrackCount}<span style={{ fontSize: '40px', letterSpacing: 0, color: '#8b2f2f' }}>/17</span></div>
          <div className="label">goals projected below 50% of target by 2030 in <strong>{regionLabel}</strong>.</div>
          <div className="sub">Average progress: {avgProgress}%</div>
        </div>
      </div>

      <div className="section-head">
        <h2>
          The 17 goals — live status
          <span className="region-tag">{regionLabel}</span>
        </h2>
        <div className="note" style={{ fontSize: "2px", color: "rgb(30, 36, 212)" }}>Click a tile to drill in · Bars = % of target met by 2030</div>
      </div>

      <div className="legend">
        <span><i className="swatch" style={{ background: '#3a6b3a' }}></i>Partial progress</span>
        <span><i className="swatch" style={{ background: '#8a6b1d' }}></i>Mixed</span>
        <span><i className="swatch" style={{ background: '#8b2f2f' }}></i>Off track / Critical</span>
        <span>▲ Reversal</span>
      </div>

      <div className="grid">
        {goals.map((g) =>
        <Goal
          key={g.n}
          g={g}
          progress={progressFor(g)}
          active={g.n === activeN}
          onClick={() => setActiveN(g.n)} />

        )}
      </div>

      <Detail g={active} regionLabel={regionLabel} progress={progressFor(active)} />

      <div className="footstrip">
        <div>Editorial explainer · illustrative figures rounded from publicly-reported SDG trend data</div>
        <div>Projected to 2030 on current pace · not a forecast of policy change</div>
      </div>

      <Tweaks open={tweaksOpen} region={region} setRegion={setRegion} />
    </div>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);