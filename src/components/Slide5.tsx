import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp, Video, MessageCircle, Map } from "lucide-react";

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
    letter: "P",
    word: "Plan",
    icon: Map,
    color: "hsl(25,100%,55%)",
    headline: "Custom Recovery Plan",
    description: "Day one: a deep analysis of their marriage. Then a clear, simple roadmap from dysfunction to thriving — with milestones they can see.",
    bullets: [
      "Deep-dive assessment of their unique situation",
      "Clear roadmap: dysfunction → thriving",
      "Monthly milestones to track progress",
    ],
  },
  {
    letter: "T",
    word: "Training",
    icon: Video,
    color: "hsl(145,50%,45%)",
    headline: "Personal Training",
    description: "Nicole teaches them communication, conflict resolution, and trust-building through live video sessions and core training modules.",
    bullets: [
      "Communication & conflict resolution modules",
      "Live video training sessions with Nicole",
      "Trust-rebuilding frameworks & exercises",
    ],
  },
  {
    letter: "A",
    word: "Access",
    icon: MessageCircle,
    color: "hsl(45,95%,52%)",
    headline: "Direct Access",
    description: "Weekly coaching on Zoom. Email support between sessions. Nicole walks alongside them for 6–12 months until they're thriving.",
    bullets: [
      "Weekly Zoom coaching calls",
      "Email support between sessions",
      "6–12 months until they're thriving",
    ],
  },
];

const TapPillar = ({
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
  const delay = 0.5 + index * 0.18;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 80 }}
      onClick={onClick}
      layout
      className={`rounded-xl border cursor-pointer transition-colors duration-300 flex flex-col items-center text-center px-4 md:px-5 py-4 md:py-5 gap-2.5 group ${
        isActive
          ? "bg-white/[0.10] border-white/20 shadow-xl"
          : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
      }`}
      style={{ flex: isActive ? 2.2 : 1 }}
    >
      {/* Large icon area */}
      <motion.div
        layout
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: delay + 0.15, duration: 0.4, type: "spring" }}
        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${item.color}18` }}
      >
        <item.icon
          className="w-6 h-6 md:w-7 md:h-7"
          style={{ color: item.color }}
          strokeWidth={1.8}
        />
      </motion.div>

      {/* Letter + Word */}
      <motion.div layout>
        <p className="text-xl md:text-2xl font-black leading-none" style={{ color: item.color }}>
          {item.letter}
        </p>
        <p className="text-white text-[10px] md:text-xs font-extrabold uppercase tracking-wider mt-0.5">
          {item.word}
        </p>
      </motion.div>

      {/* Divider */}
      <motion.div layout className="w-8 h-px shrink-0" style={{ backgroundColor: `${item.color}40` }} />

      {/* Headline */}
      <motion.p layout className="text-white/80 text-[9px] md:text-[11px] font-bold leading-snug">
        {item.headline}
      </motion.p>

      {/* Expandable bullets */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden w-full"
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.2 }}
              className="space-y-1.5 mt-1"
            >
              {item.bullets.map((b, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className="flex items-start gap-2 text-left"
                >
                  <div className="w-1.5 h-1.5 rounded-full mt-[4px] shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-white/50 text-[8px] md:text-[10px] leading-snug">{b}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Description only when not expanded */}
      {!isActive && (
        <p className="text-white/35 text-[7px] md:text-[9px] leading-relaxed">
          {item.description}
        </p>
      )}
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
      <div className="w-[72%] flex flex-col px-6 md:px-10 py-5 md:py-6 relative z-10">
        {/* Title */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="mb-2">
          <div className="flex items-baseline gap-3">
            <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">
              Nicole's $10,000 Offer
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
            They hire you. You make a <span className="text-[hsl(45,100%,55%)] font-semibold">simple plan</span> for them. You walk alongside them — training and coaching — for several months to get the result.
          </p>
        </motion.div>

        {/* 3 Pillars */}
        <motion.div layout className="flex gap-3 md:gap-4 flex-1 items-stretch min-h-0">
          {tapItems.map((item, i) => (
            <TapPillar
              key={item.letter}
              item={item}
              index={i}
              isActive={activeIdx === i}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
            />
          ))}
        </motion.div>

        {/* Price callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2 md:py-2.5 border border-[hsl(45,100%,55%)]/20 flex items-center justify-between mt-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[hsl(45,100%,55%)]/20 flex items-center justify-center shrink-0">
              <span className="text-sm">✨</span>
            </div>
            <p className="text-white/80 text-[9px] md:text-[11px] font-semibold leading-snug">
              6–12 months of transformation. Nicole walks with them until they're thriving.
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
