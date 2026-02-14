import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import { TrendingUp, Users } from "lucide-react";
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

const pieData = [
  { name: "Under $50K", value: 30, couples: "3,600,000", color: "hsl(160,30%,35%)", detail: "3.6M couples earning under $50K — not your ideal market, but they still represent the scale of this crisis." },
  { name: "$50K – $100K", value: 50, couples: "6,000,000", color: "hsl(145,45%,42%)", detail: "6 million couples in the $50–100K range. Many can afford coaching but may need payment plans." },
  { name: "$100K – $250K", value: 15, couples: "1,800,000", color: "hsl(45,90%,50%)", detail: "1.8M couples earning $100–250K. They have real budgets and actively invest in solutions." },
  { name: "$250K – $500K", value: 4.5, couples: "540,000", color: "hsl(40,100%,55%)", detail: "540,000 high-income couples in crisis. Premium clients who value expertise and won't flinch at your pricing." },
  { name: "$500K+", value: 0.5, couples: "60,000", color: "hsl(25,100%,55%)", detail: "60,000 ultra-high earners. Price is no object — they want the best help available, fast." },
];

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

const Slide3 = () => {
  const [activeIdx, setActiveIdx] = useState<number>(3);

  const activeSeg = pieData[activeIdx];

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

        {/* Detail card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-6 left-3 right-3 bg-white/[0.08] backdrop-blur-md rounded-lg p-3 border border-white/10"
          >
            <p className="text-[hsl(45,100%,55%)] text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
              {activeSeg.name}
            </p>
            <p className="text-white/70 text-[9px] md:text-[10px] leading-relaxed">
              {activeSeg.detail}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.5 }} className="absolute bottom-[38%] inset-x-0 flex justify-center">
          <TrendingUp className="w-24 h-24 md:w-32 md:h-32 text-white/[0.04]" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Right content */}
      <div className="w-[72%] flex flex-col justify-between px-6 md:px-10 py-6 md:py-8 relative z-10">
        {/* Title */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">Target Market Analysis</p>
          <p className="text-white/25 text-[9px] md:text-[11px] mt-0.5">
            <span className="text-[hsl(45,100%,55%)] font-semibold">12 million</span> struggling marriages in the U.S. — broken down by household income.
          </p>
        </motion.div>

        {/* Pie chart + legend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-4 md:gap-6 flex-1 min-h-0"
        >
          {/* Chart */}
          <div className="w-[55%] aspect-square max-h-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius="38%"
                  outerRadius="72%"
                  dataKey="value"
                  activeIndex={activeIdx}
                  activeShape={renderActiveShape}
                  onMouseEnter={(_, idx) => setActiveIdx(idx)}
                  onClick={(_, idx) => setActiveIdx(idx)}
                  stroke="none"
                  animationBegin={400}
                  animationDuration={800}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={entry.name} fill={entry.color} opacity={activeIdx === i ? 1 : 0.7} cursor="pointer" />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="text-center"
                >
                  <p className="text-[hsl(45,100%,55%)] text-lg md:text-2xl font-extrabold leading-none">{activeSeg.couples}</p>
                  <p className="text-white/40 text-[7px] md:text-[9px] font-semibold mt-0.5">couples</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col gap-1.5 md:gap-2 w-[45%]">
            {pieData.map((seg, i) => (
              <motion.div
                key={seg.name}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2 px-2 py-1 md:py-1.5 rounded-md cursor-pointer transition-all duration-200 ${
                  activeIdx === i
                    ? "bg-white/10 border border-white/15"
                    : "hover:bg-white/[0.05] border border-transparent"
                }`}
              >
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm shrink-0" style={{ backgroundColor: seg.color, opacity: activeIdx === i ? 1 : 0.6 }} />
                <div className="min-w-0">
                  <p className={`text-[8px] md:text-[10px] font-semibold leading-tight transition-colors ${
                    activeIdx === i ? "text-white" : "text-white/50"
                  }`}>
                    {seg.name}
                  </p>
                  <p className={`text-[7px] md:text-[8px] transition-colors ${
                    activeIdx === i ? "text-[hsl(45,100%,55%)]" : "text-white/30"
                  }`}>
                    {seg.value}% · {seg.couples}
                  </p>
                </div>
              </motion.div>
            ))}
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
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-white/20 text-[7px] md:text-[8px] text-right mt-1">
          Source: U.S. Census Bureau, American Community Survey · Click segments to explore
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Slide3;
