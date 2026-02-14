import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp, Mail, Headphones, Youtube, ArrowRight, X } from "lucide-react";

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
  mail: Mail,
  headphones: Headphones,
  youtube: Youtube,
};

const barColors = [
  "hsl(45,95%,52%)",
  "hsl(145,50%,45%)",
  "hsl(25,100%,55%)",
];

interface ChannelData {
  label: string;
  sublabel: string;
  percent: number;
  stat: string;
  detail: string;
  icon: string;
}

interface SourceItem {
  title: string;
  org: string;
  url: string;
}

interface MediaExample {
  type: string;
  name: string;
  description: string;
}

interface DynamicSlide5Props {
  data: {
    clientName: string;
    crisis: string;
    marketData: {
      incomeSegments: { name: string; count: string }[];
    };
    mediaChannels: {
      totalAudience: string;
      channels: ChannelData[];
      sources?: SourceItem[];
    };
    mediaExamples?: MediaExample[];
  };
}

const BarRow = ({
  item,
  color,
  delay,
  isActive,
  onClick,
  crisis,
}: {
  item: ChannelData;
  color: string;
  delay: number;
  isActive: boolean;
  onClick: () => void;
  crisis: string;
}) => {
  const Icon = iconMap[item.icon] || Mail;

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
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color }} />
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
            style={{ color }}
          >
            {item.percent}%
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-full h-2.5 md:h-3 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${item.percent}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>

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
              <span className="text-lg md:text-xl font-extrabold leading-none" style={{ color }}>{item.stat}</span>
              <span className="text-white/50 text-[10px] md:text-xs font-semibold">$100K+ earners in {crisis}</span>
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

const mediaExampleIcons: Record<string, React.ComponentType<any>> = {
  newsletter: Mail,
  podcast: Headphones,
  youtube: Youtube,
};

const mediaExampleColors: Record<string, string> = {
  newsletter: "hsl(45,95%,52%)",
  podcast: "hsl(145,50%,45%)",
  youtube: "hsl(25,100%,55%)",
};

const DynamicSlide5 = ({ data }: DynamicSlide5Props) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [showSources, setShowSources] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const { clientName, crisis, mediaChannels, mediaExamples } = data;
  const channels = mediaChannels?.channels || [];
  const totalAudience = mediaChannels?.totalAudience || "";
  const sources = mediaChannels?.sources || [];
  const examples = mediaExamples || [];

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
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <p className="text-white text-lg md:text-2xl font-extrabold tracking-normal uppercase">
            {clientName}'s Target Audience Analysis
          </p>
          <p className="text-white/50 text-[9px] md:text-[11px] mt-0.5">
            <span className="text-[hsl(45,100%,55%)] font-semibold">{totalAudience} $100K+ earners</span> in {crisis} are already consuming content weekly — in someone else's audience.
          </p>
        </motion.div>

        <div className="flex flex-col gap-2 md:gap-3 flex-1 justify-center py-2">
          {channels.map((item, i) => (
            <BarRow
              key={item.label}
              item={item}
              color={barColors[i] || barColors[0]}
              delay={0.45 + i * 0.15}
              isActive={activeIdx === i}
              onClick={() => setActiveIdx(activeIdx === i ? null : i)}
              crisis={crisis}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2 md:py-2.5 border border-[hsl(45,100%,55%)]/20 cursor-pointer hover:bg-[hsl(45,100%,55%)]/[0.12] transition-colors"
          onClick={() => setShowExamples(true)}
        >
          <div className="flex items-center justify-start gap-3">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[hsl(45,100%,55%)]/20 flex items-center justify-center shrink-0">
              <ArrowRight className="w-3.5 h-3.5 text-[hsl(45,100%,55%)]" />
            </div>
            <p className="text-white/90 text-xs md:text-sm font-semibold leading-snug">
              These audiences need expert content. <span className="text-[hsl(45,100%,55%)] font-bold">{clientName}</span>, you are the content!
            </p>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="text-white/35 text-[8px] md:text-[10px] text-left mt-1 cursor-pointer hover:text-white/50 transition-colors" onClick={() => setShowSources(true)}>
          Source: Edison Research, Pew Research Center, HubSpot · $100K+ household earners ↗
        </motion.p>
      </div>

      {/* Media examples overlay */}
      <AnimatePresence>
        {showExamples && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl"
              onClick={() => setShowExamples(false)}
            />
            <motion.div
              initial={{ rotateX: 15 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: 15, opacity: 0 }}
              className="relative z-10 w-[85%] max-w-lg rounded-xl overflow-hidden shadow-2xl border border-white/15"
              style={{ background: "linear-gradient(145deg, hsl(160,50%,14%), hsl(160,50%,10%) 60%, hsl(160,50%,7%))" }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-[60px] pointer-events-none bg-[hsl(45,100%,55%)]" />
              <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <div>
                  <p className="text-white/50 text-[12px] font-semibold uppercase tracking-wider">Where Your Audience Is</p>
                  <p className="text-white text-base font-extrabold mt-0.5">Real Media Examples</p>
                </div>
                <button onClick={() => setShowExamples(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>
              <div className="flex flex-col gap-2.5 px-6 py-4">
                {examples.map((ex, i) => {
                  const ExIcon = mediaExampleIcons[ex.type] || Mail;
                  const exColor = mediaExampleColors[ex.type] || "hsl(45,95%,52%)";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex items-start gap-3 rounded-lg px-4 py-3 bg-white/[0.04] border border-white/[0.06]"
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${exColor}20` }}>
                        <ExIcon className="w-4 h-4" style={{ color: exColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/90 text-sm font-bold leading-snug">{ex.name}</p>
                        <p className="text-white/45 text-[11px] mt-1 leading-relaxed">{ex.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
                {examples.length === 0 && (
                  <p className="text-white/30 text-sm text-center py-4">No media examples available</p>
                )}
              </div>
              <div className="px-6 pb-4">
                <p className="text-white/25 text-[9px] text-center">Click outside or ✕ to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sources overlay */}
      <AnimatePresence>
        {showSources && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute inset-0 z-30 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl"
              onClick={() => setShowSources(false)}
            />
            <motion.div
              initial={{ rotateX: 15 }}
              animate={{ rotateX: 0 }}
              exit={{ rotateX: 15, opacity: 0 }}
              className="relative z-10 w-[85%] max-w-lg rounded-xl overflow-hidden shadow-2xl border border-white/15"
              style={{ background: "linear-gradient(145deg, hsl(160,50%,14%), hsl(160,50%,10%) 60%, hsl(160,50%,7%))" }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-[60px] pointer-events-none bg-[hsl(45,100%,55%)]" />
              <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <div>
                  <p className="text-white/50 text-[12px] font-semibold uppercase tracking-wider">Sources & Citations</p>
                  <p className="text-white text-base font-extrabold mt-0.5">Data References</p>
                </div>
                <button onClick={() => setShowSources(false)} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>
              <div className="flex flex-col gap-2.5 px-6 py-4">
                {sources.map((source, i) => (
                  <motion.a
                    key={i}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-3 rounded-lg px-4 py-3 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.1] hover:border-white/15 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="w-6 h-6 rounded-md bg-[hsl(45,100%,55%)]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[hsl(45,100%,55%)] text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm font-semibold leading-snug group-hover:text-white transition-colors">{source.title}</p>
                      <p className="text-white/35 text-[11px] mt-1 font-medium">{source.org}</p>
                      <p className="text-[hsl(145,50%,45%)] text-[10px] mt-0.5 truncate group-hover:text-[hsl(145,50%,55%)] transition-colors">{source.url} ↗</p>
                    </div>
                  </motion.a>
                ))}
                {sources.length === 0 && (
                  <p className="text-white/30 text-sm text-center py-4">No detailed sources available</p>
                )}
              </div>
              <div className="px-6 pb-4">
                <p className="text-white/25 text-[9px] text-center">Click outside or ✕ to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DynamicSlide5;
