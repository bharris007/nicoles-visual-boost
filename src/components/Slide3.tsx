import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import { TrendingUp, Users } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import Slide3DrillDown from "./Slide3DrillDown";

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

const pieData = [
  { name: "Under $100K", value: 80, couples: "9,600,000", color: "hsl(160,30%,35%)", detail: "9.6M couples earning under $100K. They represent the vast scale of this marriage crisis nationwide." },
  { name: "$100K – $200K", value: 15, couples: "1,800,000", color: "hsl(145,50%,45%)", detail: "1.8M couples earning $100–200K. They have real budgets and actively invest in premium solutions." },
  { name: "$200K – $500K", value: 4.5, couples: "540,000", color: "hsl(45,95%,52%)", detail: "540,000 high-income couples in crisis. Premium clients who value expertise and won't hesitate at your pricing." },
  { name: "$500K+", value: 0.5, couples: "60,000", color: "hsl(25,100%,55%)", detail: "60,000 ultra-high earners. Price is no object — they want the best help available, fast." },
];

const allSegment = { name: "All Struggling Marriages", couples: "12,000,000", detail: "12 million married couples in the U.S. report significant marital distress each year. This is your total addressable market." };

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{ filter: `drop-shadow(0 0 12px ${fill}60)` }}
      />
    </g>
  );
};

const formatNum = (s: string) => {
  const n = parseInt(s.replace(/,/g, ""), 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 0)}K`;
  return s;
};

const Slide3 = () => {
  const [activeIdx, setActiveIdx] = useState<"all" | number>("all");
  const [drillDownIdx, setDrillDownIdx] = useState<number | null>(null);
  const lastClickRef = useRef<{ idx: number; time: number } | null>(null);

  const handlePieClick = useCallback((_: any, idx: number) => {
    const now = Date.now();
    const last = lastClickRef.current;
    if (last && last.idx === idx && now - last.time < 400) {
      // Double click — drill down
      setDrillDownIdx(idx);
      lastClickRef.current = null;
    } else {
      setActiveIdx(idx);
      lastClickRef.current = { idx, time: now };
    }
  }, []);

  const isAll = activeIdx === "all";
  const activeSeg = isAll ? allSegment : pieData[activeIdx as number];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex"
      style={{
        background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

      {/* Left sidebar */}
      <div className="w-[28%] flex flex-col items-center pt-8 md:pt-10 pb-8 md:pb-10 px-4 relative border-r border-white/10">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20">
            <img src={headshot} alt="Coach Bryan" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[hsl(145,65%,38%)] border-2 border-[hsl(45,100%,55%)] flex items-center justify-center shadow-md">
            <Users className="w-4 h-4 text-white" />
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-white font-bold text-xs md:text-sm mt-3">Coach Bryan</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <GrowthToolsLogo className="text-[7px] md:text-[8px] mt-1 text-white/50" />
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.5 }} className="absolute bottom-[28%] inset-x-0 flex justify-center">
          <TrendingUp className="w-24 h-24 md:w-32 md:h-32 text-white/[0.04]" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Right content */}
      <div className="w-[72%] flex flex-col justify-between px-6 md:px-10 py-6 md:py-8 relative z-10">
        {/* Title */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">Target Market Analysis</p>
          <p className="text-white/50 text-[9px] md:text-[11px] mt-0.5">
            <span className="text-[hsl(45,100%,55%)] font-semibold">12 million struggling marriages</span> in the U.S. — broken down by household income.
          </p>
        </motion.div>

        {/* Pie chart + legend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-4 md:gap-6 flex-1 min-h-0 -ml-4"
        >
          {/* Chart */}
          <div className="w-[55%] aspect-square max-h-full relative [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none [&_path]:outline-none [&_.recharts-layer]:outline-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="40%"
                  cy="50%"
                  innerRadius="38%"
                  outerRadius="72%"
                  dataKey="value"
                  activeIndex={typeof activeIdx === "number" ? activeIdx : undefined}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, idx) => setActiveIdx(idx)}
                  onClick={handlePieClick}
                  stroke="none"
                  animationBegin={400}
                  animationDuration={800}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={entry.name} fill={entry.color} opacity={isAll || activeIdx === i ? 1 : 0.7} cursor="pointer" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label — click to select ALL */}
            <div
              className="absolute inset-y-0 left-0 w-[80%] flex flex-col items-center justify-center pointer-events-none"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="text-center pointer-events-auto cursor-pointer"
                  onClick={() => setActiveIdx("all")}
                >
                  <p className="text-[hsl(45,100%,55%)] text-lg md:text-2xl font-extrabold leading-none">{formatNum(activeSeg.couples)}</p>
                  <p className="text-white/40 text-[8px] md:text-[10px] font-semibold mt-0.5">couples</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 w-[45%]">
            {[
              { label: "All", couples: "12M", percent: "100%", color: undefined, border: true, idx: "all" as const },
              { label: "$100K+", couples: "2.4M", percent: "20%", color: "hsl(145,50%,45%)", border: false, idx: 1 },
              { label: "$200K+", couples: "600K", percent: "5%", color: "hsl(45,95%,52%)", border: false, idx: 2 },
              { label: "$500K+", couples: "60K", percent: "0.5%", color: "hsl(25,100%,55%)", border: false, idx: 3 },
            ].map((item, i) => {
              const isActive = activeIdx === item.idx;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  onClick={() => setActiveIdx(item.idx)}
                  className={`flex flex-col rounded-lg px-3 py-2 md:py-3 cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-white/[0.12] border border-white/20 shadow-lg"
                      : "bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {item.border ? (
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-white/40 shrink-0" style={{ opacity: isActive ? 1 : 0.5 }} />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color, opacity: isActive ? 1 : 0.5 }} />
                    )}
                    <p className={`text-xs md:text-sm font-bold transition-colors ${isActive ? "text-white" : "text-white/45"}`}>
                      {item.label}
                    </p>
                  </div>
                  <p className={`text-xl md:text-2xl font-extrabold leading-none transition-colors ${
                    isActive ? "text-[hsl(45,100%,55%)]" : "text-white/60"
                  }`}>
                    {item.couples}
                  </p>
                  <p className={`text-[8px] md:text-[10px] font-medium mt-0.5 transition-colors ${isActive ? "text-white/50" : "text-white/25"}`}>
                    {item.percent} of market
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2 md:py-2.5 border border-[hsl(45,100%,55%)]/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[hsl(45,100%,55%)]/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-sm">💡</span>
            </div>
            <div>
              <p className="text-white/90 text-[9px] md:text-[11px] font-semibold leading-snug">
                Over <span className="text-[hsl(45,100%,55%)] font-bold">400,000 couples</span> earning $150K+ are in crisis and can afford premium coaching. You only need <span className="text-[hsl(45,100%,55%)] font-bold">12 clients</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Source */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-white/35 text-[8px] md:text-[10px] text-left mt-1">
          Source: U.S. Census Bureau, American Community Survey · Double-click a segment to drill down
        </motion.p>
      </div>

      {/* Drill-down overlay */}
      <AnimatePresence>
        {drillDownIdx !== null && (
          <Slide3DrillDown
            segmentIndex={drillDownIdx}
            segmentColor={pieData[drillDownIdx].color}
            onClose={() => setDrillDownIdx(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Slide3;
