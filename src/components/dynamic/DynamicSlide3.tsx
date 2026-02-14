import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp } from "lucide-react";
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

const COLORS = [
  "hsl(160,30%,35%)",
  "hsl(145,50%,45%)",
  "hsl(45,95%,52%)",
  "hsl(25,100%,55%)",
];

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
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return s;
};

interface DynamicSlide3Props {
  data: {
    clientName: string;
    targetMarket: string;
    targetMarketSize: string;
    targetMarketSegments: Array<{
      name: string;
      percentage: number;
      count: string;
      detail: string;
    }>;
    bottomCallout: string;
    clientsNeeded: number;
  };
}

const DynamicSlide3 = ({ data }: DynamicSlide3Props) => {
  const [activeIdx, setActiveIdx] = useState<"all" | number>("all");

  const pieData = data.targetMarketSegments.map((seg, i) => ({
    name: seg.name,
    value: seg.percentage,
    couples: seg.count,
    color: COLORS[i % COLORS.length],
    detail: seg.detail,
  }));

  const allSegment = {
    name: "Total Market",
    couples: data.targetMarketSize.replace(/\s*households?/i, "").trim(),
    detail: `Total addressable market for ${data.clientName}'s ${data.targetMarket}.`,
  };

  const isAll = activeIdx === "all";
  const activeSeg = isAll ? allSegment : pieData[activeIdx as number];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex"
      style={{ background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)" }}
    >
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
          <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">{data.clientName}'s Target Market Analysis</p>
          <p className="text-white/50 text-[9px] md:text-[11px] mt-0.5">
            <span className="text-[hsl(45,100%,55%)] font-semibold">{data.targetMarketSize}</span> — broken down by segment.
          </p>
        </motion.div>

        {/* Pie chart + legend */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex items-center gap-4 md:gap-6 flex-1 min-h-0 -ml-4">
          <div className="w-[63%] aspect-square max-h-full relative [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none [&_path]:outline-none [&_.recharts-layer]:outline-none">
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
            <div className="absolute inset-y-0 left-0 w-[80%] flex flex-col items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div key={String(activeIdx)} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} className="text-center pointer-events-auto cursor-pointer" onClick={() => setActiveIdx("all")}>
                  <p className="text-[hsl(45,100%,55%)] text-lg md:text-2xl font-extrabold leading-none">{activeSeg ? formatNum(activeSeg.couples) : ""}</p>
                  <p className="text-white/40 text-[8px] md:text-[10px] font-semibold mt-0.5">{isAll ? "total market" : pieData[activeIdx as number]?.name}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 w-[45%]">
            {pieData.map((item, i) => {
              const isActive = activeIdx === i;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.08 }}
                  onClick={() => setActiveIdx(i)}
                  className={`flex flex-col rounded-lg px-3 py-2 md:py-3 cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "bg-white/[0.12] border border-white/20 shadow-lg"
                      : "bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color, opacity: isActive ? 1 : 0.5 }} />
                    <p className={`text-[10px] md:text-xs font-bold transition-colors truncate ${isActive ? "text-white" : "text-white/45"}`}>
                      {item.name}
                    </p>
                  </div>
                  <p className={`text-lg md:text-xl font-extrabold leading-none transition-colors ${isActive ? "text-[hsl(45,100%,55%)]" : "text-white/60"}`}>
                    {formatNum(item.couples)}
                  </p>
                  <p className={`text-[8px] md:text-[10px] font-medium mt-0.5 transition-colors ${isActive ? "text-white/50" : "text-white/25"}`}>
                    {item.value}% of market
                  </p>
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
            <p className="text-white/90 text-xs md:text-sm font-semibold leading-snug">
              {data.bottomCallout}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DynamicSlide3;
