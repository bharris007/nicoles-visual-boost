import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp, Mail, Headphones, Youtube, ArrowRight } from "lucide-react";

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

const mediaData = [
  {
    label: "Read Newsletters",
    sublabel: "Weekly",
    icon: Mail,
    percent: 85,
    stat: "2,040,000",
    color: "hsl(45,95%,52%)",
    detail: "85% of $100K+ earners subscribe to and read at least one email newsletter every week.",
  },
  {
    label: "Listen to Podcasts",
    sublabel: "Weekly",
    icon: Headphones,
    percent: 68,
    stat: "1,632,000",
    color: "hsl(145,50%,45%)",
    detail: "68% are weekly podcast listeners — tuning in during commutes, workouts, and downtime.",
  },
  {
    label: "Watch YouTube",
    sublabel: "Weekly",
    icon: Youtube,
    percent: 79,
    stat: "1,896,000",
    color: "hsl(25,100%,55%)",
    detail: "79% watch YouTube weekly — actively seeking advice, education, and expert content.",
  },
];

const BarRow = ({
  item,
  delay,
  isActive,
  onClick,
}: {
  item: (typeof mediaData)[0];
  delay: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 80 }}
      onClick={onClick}
      className={`rounded-xl px-4 md:px-5 py-3 md:py-4 cursor-pointer transition-all duration-200 border ${
        isActive
          ? "bg-white/[0.10] border-white/20 shadow-lg"
          : "bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.08] hover:border-white/15"
      }`}
    >
      {/* Top row: icon + label + percent */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${item.color}20` }}
        >
          <item.icon
            className="w-4 h-4 md:w-5 md:h-5"
            style={{ color: item.color }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs md:text-sm font-bold transition-colors ${isActive ? "text-white" : "text-white/70"}`}>
            {item.label}
          </p>
          <p className="text-white/30 text-[8px] md:text-[9px] font-semibold uppercase tracking-wider">
            {item.sublabel}
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={item.percent}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl md:text-3xl font-extrabold leading-none"
            style={{ color: item.color }}
          >
            {item.percent}%
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Bar */}
      <div className="w-full h-2.5 md:h-3 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${item.percent}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: item.color }}
        />
      </div>

      {/* Detail line */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
              <span className="text-lg md:text-xl font-extrabold leading-none" style={{ color: item.color }}>{item.stat}</span>
              <span className="text-white/50 text-[10px] md:text-xs font-semibold">couples earning $100K+</span>
            </div>
            <p className="text-white/45 text-[9px] md:text-[11px] leading-relaxed mt-1">
              {item.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Slide4 = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

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
        {/* Title */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">
            Nicole's Target Audience Analysis
          </p>
          <p className="text-white/50 text-[9px] md:text-[11px] mt-0.5">
            <span className="text-[hsl(45,100%,55%)] font-semibold">2.4 million $100K+ couples</span> are already consuming content weekly — in someone else's audience.
          </p>
        </motion.div>

        {/* Bars */}
        <div className="flex flex-col gap-2 md:gap-3 flex-1 justify-center py-2">
          {mediaData.map((item, i) => (
            <BarRow
              key={item.label}
              item={item}
              delay={0.45 + i * 0.15}
              isActive={activeIdx === i}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2 md:py-2.5 border border-[hsl(45,100%,55%)]/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[hsl(45,100%,55%)]/20 flex items-center justify-center shrink-0 mt-0.5">
              <ArrowRight className="w-3.5 h-3.5 text-[hsl(45,100%,55%)]" />
            </div>
            <div>
              <p className="text-white/90 text-xs md:text-sm font-semibold leading-snug">
                These audiences need <span className="text-[hsl(45,100%,55%)] font-bold">expert content</span>. Podcast hosts need guests. Newsletter editors need contributors. YouTube creators need collaborators. <span className="text-[hsl(45,100%,55%)] font-bold">Nicole, you are the content!</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Source */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-white/35 text-[8px] md:text-[10px] text-left mt-1">
          Source: Edison Research, Pew Research Center, HubSpot · $100K+ household earners
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Slide4;
