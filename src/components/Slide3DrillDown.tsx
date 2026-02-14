import { motion } from "framer-motion";
import { X } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";
import { useState } from "react";

// Country breakdown data per income segment (approximate realistic numbers)
const countryBreakdowns: Record<number, { total: string; countries: { name: string; flag: string; couples: number; couplesLabel: string; color: string }[] }> = {
  0: {
    total: "14,500,000",
    countries: [
      { name: "United States", flag: "🇺🇸", couples: 9600000, couplesLabel: "9.6M", color: "hsl(160,30%,35%)" },
      { name: "United Kingdom", flag: "🇬🇧", couples: 2400000, couplesLabel: "2.4M", color: "hsl(160,30%,45%)" },
      { name: "Canada", flag: "🇨🇦", couples: 1600000, couplesLabel: "1.6M", color: "hsl(160,30%,55%)" },
      { name: "Australia", flag: "🇦🇺", couples: 900000, couplesLabel: "900K", color: "hsl(160,30%,65%)" },
    ],
  },
  1: {
    total: "2,880,000",
    countries: [
      { name: "United States", flag: "🇺🇸", couples: 1800000, couplesLabel: "1.8M", color: "hsl(145,50%,45%)" },
      { name: "United Kingdom", flag: "🇬🇧", couples: 480000, couplesLabel: "480K", color: "hsl(145,50%,55%)" },
      { name: "Canada", flag: "🇨🇦", couples: 360000, couplesLabel: "360K", color: "hsl(145,50%,65%)" },
      { name: "Australia", flag: "🇦🇺", couples: 240000, couplesLabel: "240K", color: "hsl(145,50%,75%)" },
    ],
  },
  2: {
    total: "810,000",
    countries: [
      { name: "United States", flag: "🇺🇸", couples: 540000, couplesLabel: "540K", color: "hsl(45,95%,52%)" },
      { name: "United Kingdom", flag: "🇬🇧", couples: 130000, couplesLabel: "130K", color: "hsl(45,95%,60%)" },
      { name: "Canada", flag: "🇨🇦", couples: 85000, couplesLabel: "85K", color: "hsl(45,95%,68%)" },
      { name: "Australia", flag: "🇦🇺", couples: 55000, couplesLabel: "55K", color: "hsl(45,95%,76%)" },
    ],
  },
  3: {
    total: "92,000",
    countries: [
      { name: "United States", flag: "🇺🇸", couples: 60000, couplesLabel: "60K", color: "hsl(25,100%,55%)" },
      { name: "United Kingdom", flag: "🇬🇧", couples: 16000, couplesLabel: "16K", color: "hsl(25,100%,63%)" },
      { name: "Canada", flag: "🇨🇦", couples: 10000, couplesLabel: "10K", color: "hsl(25,100%,71%)" },
      { name: "Australia", flag: "🇦🇺", couples: 6000, couplesLabel: "6K", color: "hsl(25,100%,79%)" },
    ],
  },
};

const segmentNames = ["Under $100K", "$100K – $200K", "$200K – $500K", "$500K+"];

const renderDrillActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius - 2} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} style={{ filter: `drop-shadow(0 0 10px ${fill}80)` }} />
    </g>
  );
};

const formatTotal = (s: string) => {
  const n = parseInt(s.replace(/,/g, ""), 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return s;
};

interface DrillDownProps {
  segmentIndex: number;
  segmentColor: string;
  onClose: () => void;
}

const Slide3DrillDown = ({ segmentIndex, segmentColor, onClose }: DrillDownProps) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | undefined>(undefined);
  const data = countryBreakdowns[segmentIndex];
  if (!data) return null;

  const pieData = data.countries.map((c) => ({ name: c.name, value: c.couples, color: c.color }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="absolute inset-0 z-30 flex items-center justify-center"
      style={{ perspective: "800px" }}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl"
        onClick={onClose}
      />

      {/* Card with 3D tilt */}
      <motion.div
        initial={{ rotateX: 15, rotateY: -10 }}
        animate={{ rotateX: 0, rotateY: 0 }}
        exit={{ rotateX: 15, rotateY: -10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative z-10 w-[85%] max-w-lg rounded-xl overflow-hidden shadow-2xl border border-white/15"
        style={{
          background: `linear-gradient(145deg, ${segmentColor}22, hsl(160,50%,12%) 60%, hsl(160,50%,8%))`,
          transformStyle: "preserve-3d",
          boxShadow: `0 25px 60px -15px ${segmentColor}40, 0 0 40px ${segmentColor}15`,
        }}
      >
        {/* Glow accent */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-[60px] pointer-events-none" style={{ backgroundColor: segmentColor }} />

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div>
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider">World Wide Market (English Primary Language)</p>
            <p className="text-white text-sm md:text-base font-extrabold mt-0.5">{segmentNames[segmentIndex]} Household Income</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <X className="w-3.5 h-3.5 text-white/70" />
          </button>
        </div>

        {/* Content */}
        <div className="flex items-center gap-4 px-5 py-4">
          {/* Mini pie */}
          <div className="w-[45%] aspect-square relative [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none [&_path]:outline-none [&_.recharts-layer]:outline-none">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="35%"
                  outerRadius="75%"
                  dataKey="value"
                  activeIndex={hoveredIdx}
                  activeShape={renderDrillActiveShape}
                  onMouseEnter={(_, idx) => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(undefined)}
                  stroke="none"
                  animationBegin={100}
                  animationDuration={600}
                >
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} cursor="pointer" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center total */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[hsl(45,100%,55%)] text-base md:text-xl font-extrabold leading-none">{formatTotal(data.total)}</p>
              <p className="text-white/40 text-[7px] md:text-[9px] font-semibold mt-0.5">total couples</p>
            </div>
          </div>

          {/* Country list */}
          <div className="flex-1 flex flex-col gap-2">
            {data.countries.map((country, i) => {
              const pct = ((country.couples / parseInt(data.total.replace(/,/g, ""), 10)) * 100).toFixed(0);
              return (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(undefined)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 cursor-default ${
                    hoveredIdx === i ? "bg-white/[0.1] border border-white/15" : "bg-white/[0.03] border border-transparent"
                  }`}
                >
                  <span className="text-base">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between">
                      <p className={`text-[11px] font-bold transition-colors ${hoveredIdx === i ? "text-white" : "text-white/60"}`}>
                        {country.name}
                      </p>
                      <p className={`text-xs font-extrabold transition-colors ${hoveredIdx === i ? "text-[hsl(45,100%,55%)]" : "text-white/50"}`}>
                        {country.couplesLabel}
                      </p>
                    </div>
                    {/* Bar */}
                    <div className="mt-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: country.color }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer hint */}
        <div className="px-5 pb-3">
          <p className="text-white/25 text-[8px] text-center">Click outside or ✕ to close · Data approximate, pending final research</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Slide3DrillDown;
