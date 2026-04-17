// SDG data — projected 2030 shortfall based on publicly-reported UN SDG Report trends.
// Numbers are rounded/illustrative for the explainer; not live-sourced.
window.SDG_DATA = [
  { n: 1,  title: "No Poverty",                  color: "#E5243B", status: "off-track",  progress: 42, target: "End poverty in all its forms",                                  shortfall: "575M people still in extreme poverty by 2030", metric: "People in extreme poverty", current: "692M", goal: "0", headline: "7% of the world will remain in extreme poverty on current trend." },
  { n: 2,  title: "Zero Hunger",                 color: "#DDA63A", status: "reversing",  progress: 18, target: "End hunger, achieve food security",                             shortfall: "600M people facing hunger in 2030",              metric: "Undernourished people",         current: "735M", goal: "0", headline: "Hunger is rising, not falling. Trend reversed since 2019." },
  { n: 3,  title: "Good Health & Well-being",    color: "#4C9F38", status: "off-track",  progress: 58, target: "Healthy lives and well-being for all",                         shortfall: "Maternal mortality 4x above target",            metric: "Maternal deaths / 100k",        current: "223",  goal: "70",headline: "Pandemic erased a decade of gains in life expectancy." },
  { n: 4,  title: "Quality Education",           color: "#C5192D", status: "off-track",  progress: 35, target: "Inclusive and equitable quality education",                    shortfall: "84M children out of school by 2030",            metric: "Children out of school",        current: "244M", goal: "0", headline: "Only 1 in 6 countries will meet the universal secondary target." },
  { n: 5,  title: "Gender Equality",             color: "#FF3A21", status: "off-track",  progress: 28, target: "Gender equality and empowerment",                               shortfall: "286 years to close the gender gap at current pace",metric: "Years to full parity",         current: "286",  goal: "0", headline: "At this rate, parity arrives in the 23rd century." },
  { n: 6,  title: "Clean Water & Sanitation",    color: "#26BDE2", status: "off-track",  progress: 46, target: "Water and sanitation for all",                                 shortfall: "2B without safely managed water in 2030",       metric: "Without safe water",            current: "2.2B", goal: "0", headline: "Progress would need to quadruple to hit the 2030 target." },
  { n: 7,  title: "Affordable & Clean Energy",   color: "#FCC30B", status: "on-track-partial", progress: 64, target: "Affordable, reliable, modern energy",                    shortfall: "660M still without electricity in 2030",        metric: "Without electricity",           current: "685M", goal: "0", headline: "Renewables rising fast — but access gap persists in Sub-Saharan Africa." },
  { n: 8,  title: "Decent Work & Economic Growth",color: "#A21942", status: "off-track",  progress: 40, target: "Sustained, inclusive economic growth",                        shortfall: "Global GDP growth below 7% target in LDCs",     metric: "LDC GDP growth",                current: "4.0%", goal: "7.0%", headline: "Least-developed economies falling further behind, not catching up." },
  { n: 9,  title: "Industry, Innovation & Infrastructure", color: "#FD6925", status: "mixed", progress: 52, target: "Resilient infrastructure, innovation",                    shortfall: "Manufacturing share in LDCs half of target",    metric: "Manufacturing % GDP (LDC)",     current: "12%",  goal: "24%", headline: "R&D spending rising globally but concentrated in few economies." },
  { n:10,  title: "Reduced Inequalities",        color: "#DD1367", status: "reversing",  progress: 22, target: "Reduce inequality within and among countries",                 shortfall: "Income gap widened in 2/3 of countries",        metric: "Countries with rising Gini",    current: "68%",  goal: "0%", headline: "Inequality widened in most countries since 2020." },
  { n:11,  title: "Sustainable Cities & Communities", color: "#FD9D24", status: "off-track", progress: 38, target: "Inclusive, safe, resilient cities",                         shortfall: "1.1B in slums by 2030",                          metric: "Urban slum population",         current: "1.0B", goal: "declining", headline: "Slum populations growing as urbanization outpaces housing." },
  { n:12,  title: "Responsible Consumption",     color: "#BF8B2E", status: "off-track",  progress: 30, target: "Sustainable consumption patterns",                              shortfall: "Material footprint up 70% since 2000",          metric: "Material footprint",            current: "95Gt", goal: "declining", headline: "We consume 1.7 Earths worth of resources every year." },
  { n:13,  title: "Climate Action",              color: "#3F7E44", status: "critical",   progress: 15, target: "Combat climate change",                                         shortfall: "+2.5\u00b0C warming on current pledges",           metric: "Projected warming 2100",        current: "2.5\u00b0C", goal: "1.5\u00b0C", headline: "Emissions must peak by 2025 to stay under 1.5\u00b0C. They have not." },
  { n:14,  title: "Life Below Water",            color: "#0A97D9", status: "off-track",  progress: 33, target: "Oceans, seas, marine resources",                                shortfall: "Only 8% of oceans protected (target: 30%)",     metric: "Protected marine area",         current: "8.2%", goal: "30%", headline: "A third of fish stocks overexploited; coral reefs in collapse." },
  { n:15,  title: "Life on Land",                color: "#56C02B", status: "off-track",  progress: 36, target: "Protect terrestrial ecosystems",                                shortfall: "10M hectares of forest lost annually",          metric: "Annual forest loss",            current: "10M ha",goal: "0", headline: "An area the size of Iceland disappears every year." },
  { n:16,  title: "Peace, Justice & Institutions", color: "#00689D", status: "off-track", progress: 44, target: "Peaceful, inclusive societies",                                shortfall: "120M people displaced by conflict — record high", metric: "Forcibly displaced",           current: "120M", goal: "declining", headline: "More people displaced than at any point since WWII." },
  { n:17,  title: "Partnerships for the Goals",  color: "#19486A", status: "mixed",      progress: 48, target: "Global partnership for sustainable development",                shortfall: "ODA 0.37% of GNI (target 0.7%)",                metric: "Aid as % of donor GNI",         current: "0.37%",goal: "0.70%", headline: "Official aid stagnant; debt crisis deepens in developing nations." }
];

window.REGIONS = [
  { id: "world",   label: "World" },
  { id: "africa",  label: "Sub-Saharan Africa" },
  { id: "asia",    label: "Asia & Pacific" },
  { id: "lac",     label: "Latin America & Caribbean" },
  { id: "europe",  label: "Europe & North America" },
  { id: "arab",    label: "Arab States" },
  { id: "ldc",     label: "Least Developed Countries" }
];

// Per-region progress multiplier (illustrative, to show regional variance)
window.REGION_MOD = {
  world:  { 1:1.00,2:1.00,3:1.00,4:1.00,5:1.00,6:1.00,7:1.00,8:1.00,9:1.00,10:1.00,11:1.00,12:1.00,13:1.00,14:1.00,15:1.00,16:1.00,17:1.00 },
  africa: { 1:0.55,2:0.60,3:0.65,4:0.58,5:0.82,6:0.50,7:0.40,8:0.75,9:0.48,10:0.88,11:0.62,12:1.20,13:1.10,14:0.90,15:0.78,16:0.68,17:0.85 },
  asia:   { 1:1.25,2:1.05,3:1.10,4:1.18,5:1.00,6:1.15,7:1.20,8:1.15,9:1.25,10:1.02,11:1.05,12:0.88,13:0.85,14:0.95,15:1.00,16:1.00,17:1.05 },
  lac:    { 1:1.10,2:0.95,3:1.15,4:1.12,5:1.08,6:1.20,7:1.35,8:0.92,9:1.05,10:0.85,11:1.10,12:0.95,13:1.00,14:1.05,15:0.90,16:0.80,17:1.00 },
  europe: { 1:1.60,2:1.70,3:1.45,4:1.55,5:1.35,6:1.55,7:1.40,8:1.30,9:1.50,10:1.15,11:1.40,12:0.75,13:1.10,14:1.25,15:1.20,16:1.35,17:1.50 },
  arab:   { 1:1.05,2:0.80,3:1.10,4:1.00,5:0.85,6:0.95,7:1.25,8:0.90,9:1.00,10:0.95,11:0.95,12:0.90,13:0.95,14:0.98,15:0.92,16:0.70,17:1.00 },
  ldc:    { 1:0.45,2:0.50,3:0.55,4:0.48,5:0.72,6:0.42,7:0.35,8:0.65,9:0.38,10:0.78,11:0.52,12:1.25,13:1.15,14:0.85,15:0.70,16:0.58,17:0.75 }
};
