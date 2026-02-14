import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp, X } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

const GrowthToolsLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-[3px] font-extrabold tracking-[0.12em] uppercase text-white ${className}`}>
    <span>GRO</span>
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" className="inline-block -mt-[2px]">
      <rect x="2" y="12" width="4" height="8" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="8" y="7" width="4" height="13" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="14" y="2" width="4" height="18" rx="1" fill="currentColor" />
    </svg>
    <span>TH TOOLS</span>
  </div>
);

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 2} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} style={{ filter: `drop-shadow(0 0 12px ${fill}60)` }} />
    </g>
  );
};

const formatNum = (s: string) => {
  const n = parseInt(s.replace(/,/g, ""), 10);
  if (isNaN(n)) return s;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return s;
};

const segmentKeys = ["all", "100k", "200k", "500k"] as const;
const segmentLabels = ["All", "$100K+", "$200K+", "$500K+"];
const countryFlags: Record<string, string> = { US: "🇺🇸", UK: "🇬🇧", CA: "🇨🇦", AU: "🇦🇺" };
const countryNames: Record<string, string> = { US: "United States", UK: "United Kingdom", CA: "Canada", AU: "Australia" };

interface MarketData {
  totalUS: string;
  incomeSegments: { name: string; percentage: number; color: string }[];
  countries: Record<string, Record<string, string>>;
  subtitle: string;
  bottomCallout: string;
}

interface DynamicSlide4Props {
  data: {
    clientName: string;
    crisis: string;
    industry: string;
    marketData: MarketData;
  };
}

// Drill-down overlay
const DrillDown = ({
  segmentIdx,
  segmentColor,
  segmentLabel,
  countryData,
  onClose,
}: {
  segmentIdx: number;
  segmentColor: string;
  segmentLabel: string;
  countryData: Record<string, string>;
  onClose: () => void;
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | undefined>(undefined);
  const countries = ["US", "UK", "CA", "AU"];
  const totalVal = parseInt((countryData.total || "0").replace(/,/g, ""), 10);
  const pieData = countries.map((c) => ({
    name: countryNames[c],
    value: parseInt((countryData[c] || "0").replace(/,/g, ""), 10),
    color: segmentColor,
  }));
  // Vary the color brightness per country
  const colors = [segmentColor, `${segmentColor.slice(0, -1)},55%)`, `${segmentColor.slice(0, -1)},65%)`, `${segmentColor.slice(0, -1)},75%)`];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute inset-0 z-30 flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl" onClick={onClose} />
      <motion.div initial={{ rotateX: 15 }} animate={{ rotateX: 0 }} exit={{ rotateX: 15, opacity: 0 }} className="relative z-10 w-[92%] max-w-xl rounded-xl overflow-hidden shadow-2xl border border-white/15" style={{ background: `linear-gradient(145deg, hsl(160,50%,14%), hsl(160,50%,10%) 60%, hsl(160,50%,7%))` }}>
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-[60px] pointer-events-none" style={{ backgroundColor: segmentColor }} />
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div>
            <p className="text-white/50 text-[12px] font-semibold uppercase tracking-wider">World Wide Market (English Primary Language)</p>
            <p className="text-white text-base md:text-lg font-extrabold mt-0.5">{segmentLabel} Household Income</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white/70" />
          </button>
        </div>
        <div className="flex items-center gap-5 px-6 py-5">
          <div className="w-[45%] aspect-square relative [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none [&_path]:outline-none [&_.recharts-layer]:outline-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData.map((d, i) => ({ ...d, color: colors[i] }))} cx="50%" cy="50%" innerRadius="35%" outerRadius="75%" dataKey="value" activeIndex={hoveredIdx} activeShape={renderActiveShape} onMouseEnter={(_, idx) => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(undefined)} stroke="none" animationBegin={100} animationDuration={600}>
                  {pieData.map((_, i) => (<Cell key={i} fill={colors[i]} cursor="pointer" />))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[hsl(45,100%,55%)] text-lg md:text-2xl font-extrabold leading-none">{formatNum(countryData.total || "0")}</p>
              <p className="text-white/40 text-[8px] md:text-[10px] font-semibold mt-0.5">total</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2.5">
            {countries.map((c, i) => {
              const val = parseInt((countryData[c] || "0").replace(/,/g, ""), 10);
              const pct = totalVal > 0 ? ((val / totalVal) * 100).toFixed(0) : "0";
              return (
                <motion.div key={c} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(undefined)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 cursor-default ${hoveredIdx === i ? "bg-white/[0.1] border border-white/15" : "bg-white/[0.03] border border-transparent"}`}>
                  <span className="text-lg">{countryFlags[c]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <p className={`text-[13px] font-bold transition-colors ${hoveredIdx === i ? "text-white" : "text-white/60"}`}>{countryNames[c]}</p>
                      <p className={`text-sm font-extrabold transition-colors ${hoveredIdx === i ? "text-[hsl(45,100%,55%)]" : "text-white/50"}`}>{formatNum(countryData[c] || "0")}</p>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }} className="h-full rounded-full" style={{ backgroundColor: colors[i] }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="px-6 pb-4">
          <p className="text-white/25 text-[9px] text-center">Click outside or ✕ to close · Data approximate</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DynamicSlide4 = ({ data }: DynamicSlide4Props) => {
  const { clientName, industry, marketData } = data;
  const [activeIdx, setActiveIdx] = useState<"all" | number>("all");
  const [drillDownIdx, setDrillDownIdx] = useState<number | null>(null);
  const lastClickRef = useRef<{ idx: number; time: number } | null>(null);

  // Build pie data from incomeSegments (skip "All" at index 0)
  const segments = marketData.incomeSegments || [];
  const pieSegments = segments.slice(1); // $100K+, $200K+, $500K+
  const pieData = pieSegments.map((seg) => ({
    name: seg.name,
    value: seg.percentage,
    color: seg.color,
  }));
  // Add the remainder as "Under $100K"
  const usedPct = pieSegments.reduce((s, seg) => s + seg.percentage, 0);
  const underPct = Math.max(0, 100 - usedPct);
  const fullPieData = [
    { name: "Under $100K", value: underPct, color: "hsl(160,30%,35%)" },
    ...pieData,
  ];

  const isAll = activeIdx === "all";
  const allTotal = marketData.totalUS || "0";

  // Calculate count for active segment
  const getSegmentCount = (idx: number) => {
    const totalNum = parseInt(allTotal.replace(/,/g, ""), 10);
    const pct = fullPieData[idx]?.value || 0;
    const count = Math.round((pct / 100) * totalNum);
    return count.toLocaleString();
  };

  const activeCouples = isAll ? allTotal : getSegmentCount(activeIdx as number);

  const handlePieClick = useCallback((_: any, idx: number) => {
    const now = Date.now();
    const last = lastClickRef.current;
    if (last && last.idx === idx && now - last.time < 400) {
      setDrillDownIdx(idx);
      lastClickRef.current = null;
    } else {
      setActiveIdx(idx);
      lastClickRef.current = { idx, time: now };
    }
  }, []);

  // Map pie index to country data key
  const idxToKey = (idx: number): string => segmentKeys[idx] || "all";

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex" style={{ background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)" }}>
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

      {/* Left sidebar */}
      <div className="w-[28%] flex flex-col items-center pt-8 md:pt-10 pb-6 px-4 relative border-r border-white/10">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="relative">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20">
            <img src={headshot} alt="Coach Bryan" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-0 w-6 h-6 md:w-7 md:h-7 rounded-lg overflow-hidden shadow-lg shadow-black/30">
            <img src={gtFavicon} alt="Growth Tools" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-white font-bold text-sm md:text-base mt-4">Coach Bryan</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <GrowthToolsLogo className="text-[8px] md:text-[9px] mt-1 text-white/50" />
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.5 }} className="absolute bottom-[28%] inset-x-0 flex justify-center">
          <TrendingUp className="w-24 h-24 md:w-32 md:h-32 text-white/[0.08]" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Right content */}
      <div className="w-[72%] flex flex-col justify-between px-6 md:px-10 py-6 md:py-8 relative z-10">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">
            {clientName}'s Target Market Analysis
          </p>
          <p className="text-white/50 text-[9px] md:text-[11px] mt-0.5">
            <span className="text-[hsl(45,100%,55%)] font-semibold">{marketData.subtitle}</span>
          </p>
        </motion.div>

        {/* Pie chart + legend */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex items-center gap-4 md:gap-6 flex-1 min-h-0 -ml-4">
          <div className="w-[63%] aspect-square max-h-full relative [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none [&_path]:outline-none [&_.recharts-layer]:outline-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={fullPieData} cx="40%" cy="50%" innerRadius="38%" outerRadius="72%" dataKey="value" activeIndex={typeof activeIdx === "number" ? activeIdx : undefined} activeShape={renderActiveShape} onMouseEnter={(_, idx) => setActiveIdx(idx)} onClick={handlePieClick} stroke="none" animationBegin={400} animationDuration={800}>
                  {fullPieData.map((entry, i) => (<Cell key={entry.name} fill={entry.color} opacity={isAll || activeIdx === i ? 1 : 0.7} cursor="pointer" />))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-y-0 left-0 w-[80%] flex flex-col items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div key={String(activeIdx)} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} className="text-center pointer-events-auto cursor-pointer" onClick={() => setActiveIdx("all")}>
                  <p className="text-[hsl(45,100%,55%)] text-lg md:text-2xl font-extrabold leading-none">{formatNum(activeCouples)}</p>
                  <p className="text-white/40 text-[8px] md:text-[10px] font-semibold mt-0.5">people</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 w-[45%]">
            {segmentLabels.map((label, i) => {
              const isActive = (i === 0 && activeIdx === "all") || activeIdx === i;
              const count = i === 0 ? formatNum(allTotal) : formatNum(getSegmentCount(i));
              const pct = i === 0 ? "100%" : `${fullPieData[i]?.value || 0}%`;
              return (
                <motion.div key={label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 + i * 0.08 }} onClick={() => setActiveIdx(i === 0 ? "all" : i)} onDoubleClick={() => { if (i > 0) setDrillDownIdx(i); }} className={`flex flex-col rounded-lg px-3 py-2 md:py-3 cursor-pointer transition-all duration-200 ${isActive ? "bg-white/[0.12] border border-white/20 shadow-lg" : "bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/15"}`}>
                  <div className="flex items-center gap-1.5 mb-1">
                    {i === 0 ? (
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-white/40 shrink-0" style={{ opacity: isActive ? 1 : 0.5 }} />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: fullPieData[i]?.color, opacity: isActive ? 1 : 0.5 }} />
                    )}
                    <p className={`text-xs md:text-sm font-bold transition-colors ${isActive ? "text-white" : "text-white/45"}`}>{label}</p>
                  </div>
                  <p className={`text-xl md:text-2xl font-extrabold leading-none transition-colors ${isActive ? "text-[hsl(45,100%,55%)]" : "text-white/60"}`}>{count}</p>
                  <p className={`text-[8px] md:text-[10px] font-medium mt-0.5 transition-colors ${isActive ? "text-white/50" : "text-white/25"}`}>{pct} of market</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }} className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2 md:py-2.5 border border-[hsl(45,100%,55%)]/20">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[hsl(45,100%,55%)]/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-sm">💡</span>
            </div>
            <p className="text-white/90 text-xs md:text-sm font-semibold leading-snug">{marketData.bottomCallout}</p>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-white/35 text-[8px] md:text-[10px] text-left mt-1">
          Source: U.S. Census Bureau, American Community Survey · Double-click a segment to drill down
        </motion.p>
      </div>

      {/* Drill-down overlay */}
      <AnimatePresence>
        {drillDownIdx !== null && drillDownIdx > 0 && (
          <DrillDown
            segmentIdx={drillDownIdx}
            segmentColor={fullPieData[drillDownIdx]?.color || "hsl(145,50%,45%)"}
            segmentLabel={segmentLabels[drillDownIdx] || ""}
            countryData={marketData.countries[segmentKeys[drillDownIdx]] || {}}
            onClose={() => setDrillDownIdx(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DynamicSlide4;
