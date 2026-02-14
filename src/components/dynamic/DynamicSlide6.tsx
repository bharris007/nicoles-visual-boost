import { useState } from "react";
import { motion } from "framer-motion";
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

const iconMap: Record<string, React.ComponentType<any>> = {
  plan: Map,
  training: Video,
  access: MessageCircle,
};

const pillarColors = [
  "hsl(25,100%,55%)",
  "hsl(145,50%,45%)",
  "hsl(45,95%,52%)",
];

const pillarWords = ["Plan", "Training", "Access"];

interface DynamicSlide6Props {
  data: {
    clientName?: string;
    niche?: string;
    crisis?: string;
    offerNarrative?: string;
    offerStructure?: {
      plan?: { headline?: string; bullets?: string[] };
      training?: { headline?: string; bullets?: string[] };
      access?: { headline?: string; bullets?: string[] };
    };
    offerPrice?: string;
    offerDuration?: string;
    offerFooter?: string;
  };
}

const DynamicSlide6 = ({ data }: DynamicSlide6Props) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const clientName = data.clientName || "Client";
  const offer = data.offerStructure || {};
  const price = data.offerPrice || "$10,000";
  const duration = data.offerDuration || "6–12 months";
  const footer = data.offerFooter || `${duration} of transformation. ${clientName} walks with them until they're thriving.`;
  const narrative = data.offerNarrative || "";

  // Parse **bold** markers into highlighted spans
  const renderNarrative = (text: string) => {
    if (!text) return null;
    const parts = text.split(/\*\*(.*?)\*\*/g);
    let boldIndex = 0;
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        boldIndex++;
        // First bold phrase = white bold ("Imagine this:"), rest = yellow highlight
        return boldIndex === 1 ? (
          <span key={i} className="font-bold text-white">{part}</span>
        ) : (
          <span key={i} className="text-[hsl(45,100%,55%)] font-semibold">{part}</span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const pillars = [
    { key: "plan", ...offer.plan },
    { key: "training", ...offer.training },
    { key: "access", ...offer.access },
  ];

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
          <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">
            {clientName}'s {price} Offer
          </p>
          <p className="text-white/60 text-[8px] md:text-xs mt-1 leading-snug">
            {narrative ? renderNarrative(narrative) : (
              <><span className="font-bold text-white">Imagine this:</span> You are hired. And you do an intake and turn that into a <span className="text-[hsl(45,100%,55%)] font-semibold">simple plan</span> for them. Then you <span className="text-[hsl(45,100%,55%)] font-semibold">train them</span> and walk alongside them. <span className="text-[hsl(45,100%,55%)] font-semibold">Coaching and advising</span> them for several months until they're thriving.</>
            )}
          </p>
        </motion.div>

        {/* 3 Pillars */}
        <motion.div layout className="flex gap-3 md:gap-4 flex-1 items-stretch min-h-0">
          {pillars.map((pillar, i) => {
            const color = pillarColors[i];
            const Icon = iconMap[pillar.key] || Map;
            const delay = 0.5 + i * 0.18;
            const isActive = activeIdx === i;

            return (
              <motion.div
                key={pillar.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay, duration: 0.5, type: "spring", stiffness: 80 }}
                onClick={() => setActiveIdx(isActive ? null : i)}
                layout
                className={`flex-1 rounded-xl border cursor-pointer transition-colors duration-300 flex flex-col items-center text-center px-3 md:px-4 py-2 md:py-3 gap-1 group relative ${
                  isActive
                    ? "bg-white/[0.10] border-white/20 shadow-xl"
                    : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20"
                }`}
              >
                {/* Step number */}
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center">
                  <span className="text-white/30 text-[9px] font-bold">{i + 1}</span>
                </div>
                <motion.div
                  layout
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: delay + 0.15, duration: 0.4, type: "spring" }}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8" style={{ color }} strokeWidth={1.8} />
                </motion.div>

                <motion.p layout className="text-sm md:text-base font-extrabold uppercase tracking-wider whitespace-nowrap" style={{ color }}>
                  {pillarWords[i]}
                </motion.p>

                <motion.div layout className="w-8 h-px shrink-0" style={{ backgroundColor: `${color}40` }} />

                <motion.p layout className="text-white/80 text-[9px] md:text-[11px] font-bold leading-snug">
                  {["Personal Roadmap", "Professional Training", "Direct Coaching"][i]}
                </motion.p>

                <ul className="space-y-1.5 w-full mt-2">
                  {(pillar.bullets || []).map((b, bi) => (
                    <motion.li
                      key={bi}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: delay + 0.2 + bi * 0.07 }}
                      className="flex items-start gap-2 text-left"
                    >
                      <div className="w-1.5 h-1.5 rounded-full mt-[4px] shrink-0" style={{ backgroundColor: color }} />
                      <span className="text-[10px] md:text-xs leading-snug text-white/60">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
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
            <p className="text-white/80 text-xs md:text-sm font-semibold leading-snug">
              {footer}
            </p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <p className="text-[hsl(45,100%,55%)] text-2xl md:text-3xl font-black leading-none">{price}</p>
            <p className="text-white/30 text-[8px] md:text-[9px] font-semibold mt-0.5">per client</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DynamicSlide6;
