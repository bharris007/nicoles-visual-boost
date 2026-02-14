import { motion } from "framer-motion";
import { Mail, Globe, Users, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";
import lizPhoto from "@/assets/liz-wilcox.png";

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

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45 },
});

const Slide9 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex"
      style={{
        background:
          "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
      }}
    >
      {/* Decorative */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

      {/* Left sidebar — coach */}
      <div className="w-[28%] flex flex-col items-center pt-8 md:pt-10 pb-6 px-4 relative border-r border-white/10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20">
            <img src={headshot} alt="Coach Bryan" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-0 w-6 h-6 md:w-7 md:h-7 rounded-lg overflow-hidden shadow-lg shadow-black/30">
            <img src={gtFavicon} alt="Growth Tools" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p {...fadeUp(0.45)} className="text-white font-bold text-sm md:text-base mt-4">
          Coach Bryan
        </motion.p>
        <motion.div {...fadeUp(0.5)}>
          <GrowthToolsLogo className="text-[8px] md:text-[9px] mt-1 text-white/50" />
        </motion.div>

        {/* Big decorative icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute bottom-[28%] inset-x-0 flex justify-center"
        >
          <Users className="w-24 h-24 md:w-32 md:h-32 text-white/[0.08]" strokeWidth={1.5} />
        </motion.div>
      </div>

      {/* Right content */}
      <div className="w-[72%] flex flex-col px-6 md:px-10 py-5 md:py-7 relative z-10">
        {/* Header */}
        <motion.div {...fadeUp(0.3)} className="mb-1">
          <span className="text-white/30 text-sm font-bold uppercase tracking-widest">
            Your First Audience Partner
          </span>
        </motion.div>

        <motion.div {...fadeUp(0.4)} className="mb-4 flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[hsl(45,100%,55%)] shadow-lg shadow-black/20 shrink-0">
            <img src={lizPhoto} alt="Liz Wilcox" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Meet{" "}
              <span className="text-[hsl(45,100%,55%)]">Liz Wilcox</span>
            </h2>
            <p className="text-white/40 text-xs mt-0.5 flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              marriagesrestored.com
            </p>
          </div>
        </motion.div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* List Size */}
          <motion.div
            {...fadeUp(0.55)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">List Size</span>
            </div>
            <p className="text-white font-black text-xl md:text-2xl">1,480</p>
            <p className="text-white/30 text-[10px]">engaged email subscribers</p>
          </motion.div>

          {/* Emailing Cadence */}
          <motion.div
            {...fadeUp(0.6)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Email Cadence</span>
            </div>
            <p className="text-white font-black text-xl md:text-2xl">3x / week</p>
            <p className="text-white/30 text-[10px]">Tue, Thu &amp; Sunday sends</p>
          </motion.div>

          {/* What she does */}
          <motion.div
            {...fadeUp(0.65)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm col-span-2"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Mail className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">What She Does</span>
            </div>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              Liz helps couples rebuild trust and reignite connection after infidelity or emotional distance. She runs a tight-knit community of women who are actively investing in personal growth and their relationships.
            </p>
          </motion.div>
        </div>

        {/* Why she'd promote + Status */}
        <div className="grid grid-cols-[1fr,auto] gap-3 mb-3">
          <motion.div
            {...fadeUp(0.75)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
          >
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Why She'd Promote You</span>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed mt-1.5">
              Her audience is full of women doing deep inner work — they're already buyers of coaching and courses. Your offer is a natural next step for them.
            </p>
          </motion.div>

          {/* Handshake status */}
          <motion.div
            {...fadeUp(0.8)}
            className="bg-[hsl(145,50%,45%)]/20 border border-[hsl(145,50%,45%)]/30 rounded-xl px-5 py-3 backdrop-blur-sm flex flex-col items-center justify-center min-w-[100px]"
          >
            <CheckCircle2 className="w-7 h-7 text-[hsl(145,50%,55%)] mb-1" />
            <span className="text-[hsl(145,50%,55%)] text-[10px] font-black uppercase tracking-wider">Said Yes</span>
            <span className="text-white/30 text-[9px] mt-0.5">Ready to go</span>
          </motion.div>
        </div>

        {/* CTA callout */}
        <motion.div
          {...fadeUp(1.0)}
          className="flex items-center gap-3 bg-[hsl(45,100%,55%)]/[0.12] border-2 border-[hsl(45,100%,55%)]/30 rounded-xl px-4 py-2.5"
        >
          <AlertTriangle className="w-5 h-5 text-[hsl(45,100%,55%)] shrink-0" />
          <p className="text-white/80 text-xs md:text-sm leading-relaxed">
            <span className="text-[hsl(45,100%,55%)] font-black">You should reach out to Liz</span>{" "}
            — but don't do it yet. We need to make sure your resource and pitch are
            dialed in first.{" "}
            <span className="text-white/40 font-semibold">We'll prep you on Day 3.</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide9;
