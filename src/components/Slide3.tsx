import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import { TrendingUp, Users, ChevronRight } from "lucide-react";

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

const segments = [
  {
    label: "All Struggling Marriages",
    income: "All Incomes",
    couples: "12,000,000",
    couplesNum: 12000000,
    percent: 100,
    detail: "Roughly 12 million married couples in the U.S. report significant marital distress each year.",
    color: "hsl(145,50%,45%)",
    highlight: false,
  },
  {
    label: "Household Income $50K+",
    income: "$50,000+/yr",
    couples: "8,400,000",
    couplesNum: 8400000,
    percent: 70,
    detail: "70% of distressed couples earn above $50K — they have disposable income and actively seek solutions.",
    color: "hsl(145,55%,50%)",
    highlight: false,
  },
  {
    label: "Household Income $100K+",
    income: "$100,000+/yr",
    couples: "2,400,000",
    couplesNum: 2400000,
    percent: 20,
    detail: "2.4 million couples earning $100K+ are actively looking for premium help — and can afford it.",
    color: "hsl(45,90%,55%)",
    highlight: false,
  },
  {
    label: "Household Income $250K+",
    income: "$250,000+/yr",
    couples: "600,000",
    couplesNum: 600000,
    percent: 5,
    detail: "600,000 high-earning couples in crisis. These are your ideal premium clients, Nicole.",
    color: "hsl(45,100%,55%)",
    highlight: true,
  },
  {
    label: "Household Income $500K+",
    income: "$500,000+/yr",
    couples: "60,000",
    couplesNum: 60000,
    percent: 0.5,
    detail: "Even at the ultra-high end, 60,000 couples need help — and price is no object for them.",
    color: "hsl(30,100%,55%)",
    highlight: false,
  },
];

const Slide3 = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(3); // default to $250K+ segment

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
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

      {/* Left sidebar */}
      <div className="w-[28%] flex flex-col items-center pt-8 md:pt-10 pb-8 md:pb-10 px-4 relative border-r border-white/10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20">
            <img src={headshot} alt="Coach Bryan" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[hsl(145,65%,38%)] border-2 border-[hsl(45,100%,55%)] flex items-center justify-center shadow-md">
            <Users className="w-4 h-4 text-white" />
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-white font-bold text-xs md:text-sm mt-3">
          Coach Bryan
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <GrowthToolsLogo className="text-[7px] md:text-[8px] mt-1 text-white/50" />
        </motion.div>

        {/* Detail card for selected segment */}
        <AnimatePresence mode="wait">
          {activeIdx !== null && (
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-6 left-3 right-3 bg-white/[0.08] backdrop-blur-md rounded-lg p-3 border border-white/10"
            >
              <p className="text-[hsl(45,100%,55%)] text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                {segments[activeIdx].income}
              </p>
              <p className="text-white/70 text-[9px] md:text-[10px] leading-relaxed">
                {segments[activeIdx].detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute bottom-[38%] inset-x-0 flex justify-center"
        >
          <TrendingUp className="w-24 h-24 md:w-32 md:h-32 text-white/[0.04]" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Right content */}
      <div className="w-[72%] flex flex-col justify-between px-6 md:px-10 py-6 md:py-8 relative z-10">
        {/* Title */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">
            Target Market Analysis
          </p>
          <p className="text-white/25 text-[9px] md:text-[11px] mt-0.5">
            Nicole, your market is <span className="text-[hsl(45,100%,55%)] font-semibold">massive</span> — here's the proof.
          </p>
        </motion.div>

        {/* Interactive bar chart */}
        <div className="flex flex-col gap-[6px] md:gap-2 my-2">
          {segments.map((seg, i) => {
            const isActive = activeIdx === i;
            const barWidth = Math.max(seg.percent * 0.85, 8); // scale to fit, min 8%
            return (
              <motion.div
                key={seg.label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5, type: "spring", stiffness: 80 }}
                onClick={() => setActiveIdx(isActive ? null : i)}
                className="cursor-pointer group"
              >
                <div className="flex items-center gap-2 md:gap-3">
                  {/* Label */}
                  <div className="w-[90px] md:w-[110px] shrink-0 text-right">
                    <p className={`text-[8px] md:text-[10px] font-semibold transition-colors ${
                      isActive ? "text-[hsl(45,100%,55%)]" : "text-white/50 group-hover:text-white/70"
                    }`}>
                      {seg.income}
                    </p>
                  </div>
                  {/* Bar */}
                  <div className="flex-1 relative h-6 md:h-8">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-md flex items-center transition-all duration-300"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: isActive ? seg.color : `${seg.color}`,
                        opacity: isActive ? 1 : 0.6,
                        boxShadow: isActive ? `0 0 20px ${seg.color}40` : "none",
                      }}
                      whileHover={{ opacity: 0.85 }}
                    >
                      <div className="flex items-center justify-between w-full px-2 md:px-3">
                        <span className={`text-[9px] md:text-[11px] font-bold ${
                          seg.highlight ? "text-[hsl(160,50%,15%)]" : "text-white"
                        }`}>
                          {seg.couples}
                        </span>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-[8px] md:text-[9px] font-bold ${
                              seg.highlight ? "text-[hsl(160,50%,15%)]/70" : "text-white/70"
                            }`}
                          >
                            {seg.percent}%
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                    {/* Click indicator */}
                    <div className={`absolute right-0 inset-y-0 flex items-center transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    }`}>
                      <ChevronRight className={`w-3 h-3 ${isActive ? "text-[hsl(45,100%,55%)]" : "text-white/30"}`} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2.5 md:py-3 border border-[hsl(45,100%,55%)]/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[hsl(45,100%,55%)]/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[hsl(45,100%,55%)] text-sm md:text-base">💡</span>
            </div>
            <div>
              <p className="text-white/90 text-[10px] md:text-xs font-semibold leading-snug">
                Even focusing on just the $150K+ segment, over <span className="text-[hsl(45,100%,55%)] font-bold">400,000 couples</span> are
                in crisis and can comfortably afford a premium coaching investment.
              </p>
              <p className="text-white/35 text-[8px] md:text-[9px] mt-1">
                You only need <span className="text-white/60 font-semibold">12 clients</span> to hit your $120K goal.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Source */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-white/20 text-[7px] md:text-[8px] text-right mt-1"
        >
          Source: U.S. Census Bureau, American Community Survey · Click bars to explore segments
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Slide3;
