import { motion } from "framer-motion";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp, Users, Target, Zap, ArrowRight, Quote } from "lucide-react";

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

const statCards = [
  {
    icon: Target,
    value: "327",
    label: "Leads Generated",
    color: "hsl(25,100%,55%)",
  },
  {
    icon: Users,
    value: "1",
    label: "New Client Landed",
    color: "hsl(145,50%,45%)",
  },
];

const Slide6 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(145,50%,45%)] via-[hsl(45,100%,55%)] to-[hsl(25,100%,55%)]" />

      <div className="relative z-10 w-full h-full flex flex-col px-8 md:px-12 py-6 md:py-8">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg overflow-hidden shadow-lg shadow-black/30">
              <img src={gtFavicon} alt="Growth Tools" className="w-full h-full object-cover" />
            </div>
            <GrowthToolsLogo className="text-[9px] text-white/50" />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[hsl(45,100%,55%)]/15 border border-[hsl(45,100%,55%)]/30 rounded-full px-4 py-1"
          >
            <span className="text-[hsl(45,100%,55%)] text-[10px] md:text-xs font-bold uppercase tracking-wider">
              🔥 Tomorrow's Training Preview
            </span>
          </motion.div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 flex gap-6 md:gap-8 min-h-0">
          {/* Left: Case study info */}
          <div className="flex-1 flex flex-col justify-center gap-4">
            {/* Name & title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-widest mb-1">Case Study</p>
              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight">
                Justin Brooke
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <div className="h-px flex-1 max-w-[60px] bg-[hsl(45,100%,55%)]/40" />
                <span className="text-[hsl(45,100%,55%)] text-[10px] md:text-xs font-semibold">
                  BOPA Partnership
                </span>
              </div>
            </motion.div>

            {/* Before / After cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <div className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <span className="text-white/40 text-[9px] md:text-[11px] font-bold uppercase tracking-wider">Before BOPA</span>
                </div>
                <p className="text-white/70 text-[10px] md:text-xs leading-relaxed">
                  Running ads and content alone with unpredictable lead flow and high acquisition costs
                </p>
              </div>
              <div className="flex-1 bg-[hsl(145,50%,45%)]/[0.08] border border-[hsl(145,50%,45%)]/20 rounded-xl p-3 md:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-[hsl(145,50%,45%)]" />
                  <span className="text-[hsl(145,50%,45%)] text-[9px] md:text-[11px] font-bold uppercase tracking-wider">After BOPA</span>
                </div>
                <p className="text-white/70 text-[10px] md:text-xs leading-relaxed">
                  327 leads and a new high-ticket client from a single strategic partnership
                </p>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 items-start"
            >
              <div className="w-1 self-stretch rounded-full bg-[hsl(45,100%,55%)]/40 shrink-0" />
              <div>
                <Quote className="w-4 h-4 text-[hsl(45,100%,55%)]/40 mb-1" />
                <p className="text-white/50 text-[10px] md:text-xs italic leading-relaxed">
                  "One partnership changed everything. We went from grinding for leads to having them come to us. BOPA gave us the framework to make it repeatable."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Stats & teaser */}
          <div className="w-[38%] flex flex-col justify-center gap-4">
            {/* Stat cards */}
            <div className="flex gap-3">
              {statCards.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 100 }}
                  className="flex-1 rounded-xl border p-3 md:p-4 text-center"
                  style={{
                    backgroundColor: `${stat.color}10`,
                    borderColor: `${stat.color}25`,
                  }}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${stat.color}18` }}>
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: stat.color }} strokeWidth={2} />
                  </div>
                  <p className="text-2xl md:text-3xl font-black leading-none" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-white/40 text-[8px] md:text-[10px] font-semibold mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* What we'll cover teaser */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/[0.06] border border-white/10 rounded-xl p-4 md:p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[hsl(45,100%,55%)]" />
                <p className="text-white text-xs md:text-sm font-bold">Tomorrow You'll Learn:</p>
              </div>
              <ul className="space-y-2">
                {[
                  "How we identified the perfect partner",
                  "The exact BOPA strategy we ran",
                  "How 327 leads turned into revenue",
                  "How to replicate this for your niche",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-[hsl(145,50%,45%)] shrink-0" />
                    <span className="text-white/60 text-[10px] md:text-xs leading-snug">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2.5 border border-[hsl(45,100%,55%)]/20 flex items-center justify-center gap-2"
            >
              <span className="text-lg">🎯</span>
              <p className="text-[hsl(45,100%,55%)] text-xs md:text-sm font-bold">
                Full breakdown tomorrow — don't miss it!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Slide6;
