import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area } from "recharts";

const COLORS = {
  bg: "#0a0f1a",
  card: "#111827",
  cardHover: "#1a2332",
  accent: "#22d3ee",
  accent2: "#a78bfa",
  accent3: "#34d399",
  accent4: "#fb923c",
  accent5: "#f472b6",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  border: "#1e293b",
  gradStart: "#0e7490",
  gradEnd: "#7c3aed",
};

const PIE_COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#fb923c", "#f472b6", "#facc15", "#38bdf8", "#e879f9"];

const salesData = [
  { name: "H. James", week1: 9550, week2: 9230, week3: 8500, week4: 8965, total: 36245, metGoal: true },
  { name: "K. Dunn", week1: 5975, week2: 6900, week3: 8500, week4: 10100, total: 31475, metGoal: false },
  { name: "L. Carrie", week1: 7425, week2: 8580, week3: 9910, week4: 7512, total: 33427, metGoal: false },
  { name: "R. Smith", week1: 9560, week2: 10150, week3: 10200, week4: 9795, total: 39705, metGoal: true },
  { name: "D. O'Brian", week1: 7892, week2: 7695, week3: 9520, week4: 10252, total: 35359, metGoal: true },
];

const storeData = [
  { store: "1000", sales: 472388, units: 16871 },
  { store: "1050", sales: 462056, units: 16502 },
  { store: "2000", sales: 495292, units: 17689 },
  { store: "2050", sales: 477064, units: 17038 },
  { store: "3000", sales: 491064, units: 17538 },
  { store: "3050", sales: 529564, units: 18913 },
];

const monthlyByStore = [
  { month: "JAN", s1000: 155904, s1050: 146468, s2000: 175168, s2050: 162484, s3000: 140896, s3050: 189952 },
  { month: "FEB", s1000: 189504, s1050: 133364, s2000: 172340, s2050: 158760, s3000: 173852, s3050: 157500 },
  { month: "MAR", s1000: 126980, s1050: 182224, s2000: 147784, s2050: 155820, s3000: 176316, s3050: 182112 },
];

const ordersByCountry = [
  { country: "Germany", orders: 122 }, { country: "USA", orders: 122 }, { country: "Brazil", orders: 83 },
  { country: "France", orders: 77 }, { country: "UK", orders: 56 }, { country: "Venezuela", orders: 46 },
  { country: "Austria", orders: 40 }, { country: "Sweden", orders: 37 }, { country: "Canada", orders: 30 },
  { country: "Mexico", orders: 28 },
];

const shipperData = [
  { name: "United Package", value: 325 },
  { name: "Federal Shipping", value: 255 },
  { name: "Speedy Express", value: 250 },
];

const categoryData = [
  { category: "Meat/Poultry", avgPrice: 54.01 },
  { category: "Beverages", avgPrice: 37.98 },
  { category: "Produce", avgPrice: 32.37 },
  { category: "Dairy Products", avgPrice: 28.73 },
  { category: "Confections", avgPrice: 25.16 },
  { category: "Condiments", avgPrice: 23.06 },
  { category: "Seafood", avgPrice: 20.68 },
  { category: "Grains/Cereals", avgPrice: 20.25 },
];

const skillsRadar = [
  { skill: "VLOOKUP/XLOOKUP", level: 95 },
  { skill: "INDEX/MATCH", level: 90 },
  { skill: "Pivot Tables", level: 92 },
  { skill: "SUMIF/COUNTIF", level: 95 },
  { skill: "IF/Nested IF", level: 93 },
  { skill: "Data Cleaning", level: 88 },
  { skill: "Text Functions", level: 85 },
  { skill: "Charts/Viz", level: 90 },
];

const freightTrend = [
  { month: "Jul '96", avg: 62.4, max: 380 },
  { month: "Oct '96", avg: 71.2, max: 450 },
  { month: "Jan '97", avg: 88.5, max: 610 },
  { month: "Apr '97", avg: 79.3, max: 520 },
  { month: "Jul '97", avg: 92.1, max: 720 },
  { month: "Oct '97", avg: 101.4, max: 890 },
  { month: "Jan '98", avg: 95.7, max: 1108 },
  { month: "May '98", avg: 83.2, max: 560 },
];

const formulaShowcases = [
  {
    title: "IF + Nested Logic",
    formula: '=IF(F5>=$I$2,"YES","NO")',
    description: "Evaluates salesperson totals against monthly goal ($34,000) — drives bonus eligibility flags",
    context: "Sales Performance Tracker",
    result: "3 of 5 met goal → automated YES/NO + BONUS flags",
  },
  {
    title: "SUMIF Aggregation",
    formula: "=SUMIF(B3:B272,G3,E3:E272)",
    description: "Aggregates 270 rows of multi-store, multi-SKU transactional data by store number",
    context: "Store-Level Reporting",
    result: "6 stores × 15 SKUs × 3 months → instant store totals",
  },
  {
    title: "XLOOKUP (Dynamic)",
    formula: "=XLOOKUP(A2,Orders!A:A,Orders!G:G)",
    description: "Modern replacement for VLOOKUP — searches any direction, handles errors gracefully",
    context: "Cross-Sheet Data Retrieval",
    result: "830 orders linked to customer & shipping data",
  },
  {
    title: "INDEX/MATCH Combo",
    formula: "=INDEX(D:D,MATCH(A2,B:B,0))",
    description: "Two-function lookup that overcomes VLOOKUP's left-column limitation",
    context: "Employee Data Cross-Reference",
    result: "Flexible lookups across 38-row employee master list",
  },
  {
    title: "FILTER (Dynamic Array)",
    formula: '=FILTER(A2:E92,E2:E92="Germany")',
    description: "Spills filtered results dynamically — no helper columns needed",
    context: "Customer Segmentation",
    result: "91 customers filtered by country in real-time",
  },
  {
    title: "TEXTJOIN + TEXTSPLIT",
    formula: '=TEXTJOIN(", ",TRUE,A2:A10)',
    description: "Combines and parses text strings for data transformation workflows",
    context: "Data Reshaping",
    result: "Clean concatenation with delimiter control",
  },
];

const GOAL = 34000;

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "formulas", label: "Formula Showcase" },
  { id: "sales", label: "Sales Analysis" },
  { id: "orders", label: "Order Analytics" },
  { id: "products", label: "Product Intelligence" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
      <p style={{ color: COLORS.text, margin: 0, fontWeight: 600, fontSize: 13 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, margin: "4px 0 0", fontSize: 12 }}>
          {p.name}: {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
};

const StatCard = ({ label, value, sub, color = COLORS.accent }) => (
  <div style={{
    background: `linear-gradient(135deg, ${COLORS.card} 0%, ${COLORS.cardHover} 100%)`,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "20px 24px",
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: color, borderRadius: "12px 0 0 12px" }} />
    <p style={{ color: COLORS.textMuted, fontSize: 12, margin: 0, textTransform: "uppercase", letterSpacing: 1.2, fontWeight: 500 }}>{label}</p>
    <p style={{ color: COLORS.text, fontSize: 28, margin: "6px 0 2px", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{value}</p>
    {sub && <p style={{ color: COLORS.textMuted, fontSize: 12, margin: 0 }}>{sub}</p>}
  </div>
);

export default function ExcelPortfolio() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderOverview = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <StatCard label="Datasets Analyzed" value="3" sub="Workbooks with 44 sheets" color={COLORS.accent} />
        <StatCard label="Data Points" value="2,900+" sub="Rows of transactional data" color={COLORS.accent2} />
        <StatCard label="Functions Mastered" value="20+" sub="From IF to dynamic arrays" color={COLORS.accent3} />
        <StatCard label="Countries Covered" value="21" sub="Global order distribution" color={COLORS.accent4} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.accent, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Skills Proficiency</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={skillsRadar}>
              <PolarGrid stroke={COLORS.border} />
              <PolarAngleAxis dataKey="skill" tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Proficiency" dataKey="level" stroke={COLORS.accent} fill={COLORS.accent} fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.accent2, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Project Scope</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { file: "Advanced Exercises", sheets: 20, focus: "Core functions, auditing, what-if analysis, macros", color: COLORS.accent },
              { file: "Excel Functions", sheets: 10, focus: "FILTER, XLOOKUP, SWITCH, TEXTJOIN, TEXTSPLIT", color: COLORS.accent2 },
              { file: "Pivot & Data Mgmt", sheets: 14, focus: "Sorting, filtering, DSUM, pivot tables, dashboards", color: COLORS.accent3 },
            ].map((item, i) => (
              <div key={i} style={{ background: COLORS.bg, borderRadius: 8, padding: "14px 18px", borderLeft: `3px solid ${item.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: COLORS.text, fontSize: 14, fontWeight: 600 }}>{item.file}</span>
                  <span style={{ color: item.color, fontSize: 12, fontFamily: "'DM Mono', monospace" }}>{item.sheets} sheets</span>
                </div>
                <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "6px 0 0" }}>{item.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFormulas = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p style={{ color: COLORS.textMuted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
        Each formula below was applied to real datasets — from 5-row sales trackers to 830-row order tables. Click to explore the logic.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {formulaShowcases.map((f, i) => (
          <div key={i} style={{
            background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}`,
            transition: "border-color 0.2s, transform 0.2s", cursor: "default",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = PIE_COLORS[i]; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <h4 style={{ color: COLORS.text, fontSize: 15, margin: 0, fontWeight: 700 }}>{f.title}</h4>
              <span style={{ color: PIE_COLORS[i], fontSize: 11, background: `${PIE_COLORS[i]}15`, padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap" }}>{f.context}</span>
            </div>
            <code style={{
              display: "block", background: COLORS.bg, color: COLORS.accent, fontSize: 13,
              padding: "10px 14px", borderRadius: 6, marginBottom: 10, fontFamily: "'DM Mono', monospace",
              border: `1px solid ${COLORS.border}`, overflowX: "auto",
            }}>{f.formula}</code>
            <p style={{ color: COLORS.textMuted, fontSize: 13, margin: "0 0 8px", lineHeight: 1.5 }}>{f.description}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: COLORS.accent3, fontSize: 14 }}>→</span>
              <span style={{ color: COLORS.accent3, fontSize: 12, fontWeight: 500 }}>{f.result}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSales = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <StatCard label="Monthly Goal" value="$34,000" sub="December 2020 target" color={COLORS.accent} />
        <StatCard label="Top Performer" value="R. Smith" sub="$39,705 — 116.8% of goal" color={COLORS.accent3} />
        <StatCard label="Goal Achievement" value="60%" sub="3 of 5 salespeople" color={COLORS.accent4} />
        <StatCard label="Total Revenue" value="$2.93M" sub="Across 6 stores, 3 months" color={COLORS.accent2} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.accent, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Sales vs Goal — IF Function Analysis</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
              <XAxis type="number" tick={{ fill: COLORS.textMuted, fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="name" tick={{ fill: COLORS.text, fontSize: 12 }} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Total Sales" radius={[0, 6, 6, 0]}>
                {salesData.map((entry, i) => (
                  <Cell key={i} fill={entry.metGoal ? COLORS.accent3 : COLORS.accent5} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 20, marginTop: 8, justifyContent: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.textMuted }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.accent3 }} /> Goal Met
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.textMuted }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: COLORS.accent5 }} /> Below Goal
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: COLORS.textMuted }}>
              <span style={{ width: 1, height: 14, borderLeft: `2px dashed ${COLORS.accent4}` }} /> $34K Goal
            </span>
          </div>
        </div>

        <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.accent2, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Store Performance — SUMIF Analysis</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={storeData}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
              <XAxis dataKey="store" tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
              <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="sales" name="Total Sales" fill={COLORS.accent2} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
        <h3 style={{ color: COLORS.accent3, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Monthly Sales by Store — Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={monthlyByStore}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 12 }} />
            <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textMuted }} />
            <Area type="monotone" dataKey="s1000" name="Store 1000" stroke={PIE_COLORS[0]} fill={PIE_COLORS[0]} fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="s1050" name="Store 1050" stroke={PIE_COLORS[1]} fill={PIE_COLORS[1]} fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="s2000" name="Store 2000" stroke={PIE_COLORS[2]} fill={PIE_COLORS[2]} fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="s2050" name="Store 2050" stroke={PIE_COLORS[3]} fill={PIE_COLORS[3]} fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="s3000" name="Store 3000" stroke={PIE_COLORS[4]} fill={PIE_COLORS[4]} fillOpacity={0.1} strokeWidth={2} />
            <Area type="monotone" dataKey="s3050" name="Store 3050" stroke={PIE_COLORS[5]} fill={PIE_COLORS[5]} fillOpacity={0.1} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <StatCard label="Total Orders" value="830" sub="Jul 1996 – May 1998" color={COLORS.accent} />
        <StatCard label="Countries" value="21" sub="Global distribution" color={COLORS.accent2} />
        <StatCard label="Avg Freight" value="$86.07" sub="Per shipment" color={COLORS.accent3} />
        <StatCard label="Max Freight" value="$1,108" sub="Outlier shipment" color={COLORS.accent4} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 20 }}>
        <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.accent, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Orders by Country — Top 10</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersByCountry} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
              <XAxis type="number" tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
              <YAxis type="category" dataKey="country" tick={{ fill: COLORS.text, fontSize: 12 }} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="orders" name="Orders" radius={[0, 6, 6, 0]}>
                {ordersByCountry.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
          <h3 style={{ color: COLORS.accent2, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Shipping Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={shipperData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" nameKey="name" stroke="none">
                {shipperData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
            {shipperData.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, color: COLORS.text, fontSize: 13 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: PIE_COLORS[i] }} />
                  {s.name}
                </span>
                <span style={{ color: COLORS.textMuted, fontSize: 13, fontFamily: "'DM Mono', monospace" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
        <h3 style={{ color: COLORS.accent4, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Freight Cost Trend — Time Series</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={freightTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
            <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
            <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} tickFormatter={v => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="avg" name="Avg Freight" stroke={COLORS.accent} strokeWidth={2.5} dot={{ fill: COLORS.accent, r: 4 }} />
            <Line type="monotone" dataKey="max" name="Max Freight" stroke={COLORS.accent4} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: COLORS.accent4, r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        <StatCard label="Product Catalog" value="77" sub="Active products" color={COLORS.accent} />
        <StatCard label="Categories" value="8" sub="Product segments" color={COLORS.accent2} />
        <StatCard label="Highest Avg Price" value="$54.01" sub="Meat/Poultry" color={COLORS.accent3} />
        <StatCard label="Suppliers" value="29" sub="Unique suppliers" color={COLORS.accent5} />
      </div>

      <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
        <h3 style={{ color: COLORS.accent, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Average Unit Price by Category — Pivot Table Result</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
            <XAxis dataKey="category" tick={{ fill: COLORS.textMuted, fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
            <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} tickFormatter={v => `$${v}`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avgPrice" name="Avg Unit Price" radius={[6, 6, 0, 0]}>
              {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: COLORS.card, borderRadius: 12, padding: 24, border: `1px solid ${COLORS.border}` }}>
        <h3 style={{ color: COLORS.accent3, fontSize: 14, margin: "0 0 16px", textTransform: "uppercase", letterSpacing: 1 }}>Data Management Techniques Applied</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            { title: "Pivot Tables", desc: "Built multi-dimensional summaries from 830+ orders by country, shipper, and time period", icon: "📊" },
            { title: "DSUM & DB Functions", desc: "Criteria-based aggregation on structured datasets with DSUM, DAVERAGE, DCOUNT", icon: "🔢" },
            { title: "Custom Sorting", desc: "Multi-level sorts on product and order data with custom sort orders", icon: "↕️" },
            { title: "Advanced Filtering", desc: "Criteria ranges and AutoFilter on product lists with multiple conditions", icon: "🔍" },
            { title: "SUBTOTAL Function", desc: "Dynamic aggregation that respects filters — SUM, AVG, COUNT across 95 rows", icon: "∑" },
            { title: "Duplicate Removal", desc: "Identified and cleaned duplicate records in 100+ row employee dataset", icon: "🧹" },
          ].map((item, i) => (
            <div key={i} style={{ background: COLORS.bg, borderRadius: 8, padding: 16, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{item.icon}</div>
              <h4 style={{ color: COLORS.text, fontSize: 14, margin: "0 0 6px", fontWeight: 600 }}>{item.title}</h4>
              <p style={{ color: COLORS.textMuted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      background: COLORS.bg, minHeight: "100vh", fontFamily: "'Outfit', sans-serif", color: COLORS.text,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.bg} 0%, #0f172a 50%, #1a1033 100%)`,
        padding: "40px 48px 28px", borderBottom: `1px solid ${COLORS.border}`,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent}08 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: -40, left: "30%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent2}06 0%, transparent 70%)` }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.accent3, boxShadow: `0 0 12px ${COLORS.accent3}` }} />
            <span style={{ color: COLORS.accent3, fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: 2 }}>Portfolio</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 6px", letterSpacing: -0.5 }}>
            <span style={{ background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accent2} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Excel & Data Analytics</span>
          </h1>
          <p style={{ color: COLORS.textMuted, fontSize: 15, margin: 0, maxWidth: 600 }}>
            Interactive showcase of advanced Excel skills — built from 3 workbooks, 44 sheets, and 2,900+ rows of real data
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginTop: 24, position: "relative" }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "10px 20px", borderRadius: "8px 8px 0 0", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: 600, fontFamily: "'Outfit', sans-serif", letterSpacing: 0.3,
              transition: "all 0.2s",
              background: activeTab === tab.id ? COLORS.card : "transparent",
              color: activeTab === tab.id ? COLORS.accent : COLORS.textMuted,
              borderBottom: activeTab === tab.id ? `2px solid ${COLORS.accent}` : "2px solid transparent",
            }}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px 48px 48px", maxWidth: 1200 }}>
        {activeTab === "overview" && renderOverview()}
        {activeTab === "formulas" && renderFormulas()}
        {activeTab === "sales" && renderSales()}
        {activeTab === "orders" && renderOrders()}
        {activeTab === "products" && renderProducts()}
      </div>
    </div>
  );
}
