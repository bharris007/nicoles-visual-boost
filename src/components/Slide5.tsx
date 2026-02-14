import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp, BookOpen, Video, Map, ChevronRight } from "lucide-react";

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

const tapItems = [
  {
    letter: "T",
    word: "Training",
    icon: BookOpen,
    color: "hsl(145,50%,45%)",
    headline: "Marriage Recovery Training",
    bullets: [
      "Core modules on communication, conflict resolution & rebuilding trust",
      "Step-by-step video lessons Nicole delivers from her expertise",
      "Clients learn the foundations before going deeper",
    ],
  },
  {
    letter: "A",
    word: "Access",
    icon: Video,
    color: "hsl(45,95%,52%)",
    headline: "Direct Access to Nicole",
    bullets: [
      "Weekly Zoom coaching calls — proactive, not reactive",
      "Email support between sessions for real-time guidance",
      "6–12 months of hands-on partnership until they're thriving",
    ],
  },
  {
    letter: "P",
    word: "Plan",
    icon: Map,
    color: "hsl(25,100%,55%)",
    headline: "Custom Recovery Plan",
    bullets: [
      "Deep analysis of their unique marriage situation on day one",
      "A clear, simple roadmap: from dysfunction → thriving",
      "Personalized milestones so they see progress every month",
    ],
  },
];

const TapCard = ({
  item,
  index,
  isActive,
  onClick,
}: {
  item: (typeof tapItems)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const delay = 0.45 + index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 80 }}
      onClick={onClick}
      className={`rounded-xl px-4 md:px-5 py-3 md:py-4 cursor-pointer transition-all duration-200 border ${
        isActive
          ? "bg-white/[0.10] border-white/20 shadow-lg"
          : "bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.08] hover:border-white/15"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Letter badge */}
        <div
          className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 font-black text-lg md:text-xl"
          style={{ backgroundColor: `${item.color}20`, color: item.color }}
        >
          {item.letter}
        </div>

        {/* Label + icon */}
        <div className="flex-1 min-w-0">
          <p className={`text-sm md:text-base font-extrabold transition-colors ${isActive ? "text-white" : "text-white/70"}`}>
            {item.word}
          </p>
          <p className="text-white/35 text-[8px] md:text-[10px] font-semibold">{item.headline}</p>
        </div>

        <item.icon
          className="w-5 h-5 md:w-6 md:h-6 shrink-0 transition-colors"
          style={{ color: isActive ? item.color : "rgba(255,255,255,0.25)" }}
        />

        <ChevronRight
          className={`w-4 h-4 shrink-0 transition-all ${
            isActive ? "rotate-90 text-white/40" : "text-white/15"
          }`}
        />
      </div>

      {/* Expandable bullets */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <ul className="mt-3 ml-[52px] md:ml-[56px] space-y-1.5">
              {item.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-[5px] shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-white/55 text-[9px] md:text-[11px] leading-snug">{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Slide5 = () => {
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
          <div className="flex items-baseline gap-3">
            <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">
              Nicole's Offer
            </p>
            <div className="flex items-center gap-0.5">
              {tapItems.map((t) => (
                <span key={t.letter} className="text-lg md:text-2xl font-black" style={{ color: t.color }}>
                  {t.letter}
                </span>
              ))}
            </div>
          </div>
          <p className="text-white/50 text-[9px] md:text-[11px] mt-0.5">
            The <span className="text-[hsl(45,100%,55%)] font-semibold">Training + Access + Plan</span> framework — everything a couple needs to go from crisis to thriving.
          </p>
        </motion.div>

        {/* TAP cards */}
        <div className="flex flex-col gap-2 md:gap-2.5 flex-1 justify-center py-2">
          {tapItems.map((item, i) => (
            <TapCard
              key={item.letter}
              item={item}
              index={i}
              isActive={activeIdx === i}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            />
          ))}
        </div>

        {/* Price callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2.5 md:py-3 border border-[hsl(45,100%,55%)]/20 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[hsl(45,100%,55%)]/20 flex items-center justify-center shrink-0">
              <span className="text-sm">✨</span>
            </div>
            <p className="text-white/80 text-[9px] md:text-[11px] font-semibold leading-snug">
              6–12 months of transformation.<br className="hidden md:block" /> Nicole walks with them until they're thriving.
            </p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <p className="text-[hsl(45,100%,55%)] text-2xl md:text-3xl font-black leading-none">$10,000</p>
            <p className="text-white/30 text-[8px] md:text-[9px] font-semibold mt-0.5">per client</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide5;
