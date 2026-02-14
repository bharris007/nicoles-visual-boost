import { motion } from "framer-motion";
import { Mail, Globe, Users, Calendar, CheckCircle2, AlertTriangle, Handshake } from "lucide-react";
import lizPhoto from "@/assets/liz-wilcox.png";

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
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex flex-col"
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

      {/* Full-width content */}
      <div className="flex flex-col flex-1 px-8 md:px-14 py-6 md:py-8 relative z-10">

        {/* Top: "Said Yes" banner + header row */}
        <div className="flex items-start justify-between mb-5">
          {/* Left: subtitle + name */}
          <div className="flex items-center gap-5">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20 shrink-0"
            >
              <img src={lizPhoto} alt="Liz Wilcox" className="w-full h-full object-cover" />
            </motion.div>
            <div>
              <motion.span {...fadeUp(0.25)} className="text-white/30 text-xs font-bold uppercase tracking-widest block mb-1">
                Nicole's First Partner
              </motion.span>
              <motion.h2 {...fadeUp(0.35)} className="text-2xl md:text-4xl font-black text-white leading-tight">
                <span className="text-[hsl(45,100%,55%)]">Liz Wilcox</span>
              </motion.h2>
              <motion.p {...fadeUp(0.4)} className="text-white/40 text-xs mt-0.5 flex items-center gap-1.5">
                <Globe className="w-3 h-3" />
                marriagesrestored.com
              </motion.p>
            </div>
          </div>

          {/* Right: Said Yes badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-[hsl(145,50%,45%)]/20 border border-[hsl(145,50%,45%)]/40 rounded-xl px-5 py-3 backdrop-blur-sm flex items-center gap-3"
          >
            <CheckCircle2 className="w-6 h-6 text-[hsl(145,50%,55%)]" />
            <div>
              <span className="text-[hsl(145,50%,55%)] text-sm font-black uppercase tracking-wider block">She Said Yes</span>
              <span className="text-white/30 text-[10px]">Ready to promote you</span>
            </div>
          </motion.div>
        </div>

        {/* Info grid — 3 columns */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* List Size */}
          <motion.div
            {...fadeUp(0.5)}
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
            {...fadeUp(0.55)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Email Cadence</span>
            </div>
            <p className="text-white font-black text-xl md:text-2xl">3x / week</p>
            <p className="text-white/30 text-[10px]">Tue, Thu & Sunday sends</p>
          </motion.div>

          {/* What she does */}
          <motion.div
            {...fadeUp(0.6)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Mail className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">What She Does</span>
            </div>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              Liz helps couples rebuild trust and reignite connection after infidelity or emotional distance.
            </p>
          </motion.div>
        </div>

        {/* Why you'd be a good fit */}
        <motion.div
          {...fadeUp(0.7)}
          className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-3.5 backdrop-blur-sm mb-4"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Handshake className="w-4 h-4 text-[hsl(145,50%,55%)]" />
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Why You'd Be a Good Fit Together</span>
          </div>
          <p className="text-white/80 text-xs md:text-sm leading-relaxed">
            Her audience is full of women doing deep inner work — they're already buyers of coaching and courses. Your offer is a natural next step for them, and Liz gets to deliver even more value to her community without creating anything new.
          </p>
        </motion.div>

        {/* Spacer pushes CTA to bottom */}
        <div className="flex-1" />

        {/* CTA callout — matching padding */}
        <motion.div
          {...fadeUp(1.0)}
          className="flex items-center gap-3 bg-[hsl(45,100%,55%)]/[0.12] border-2 border-[hsl(45,100%,55%)]/30 rounded-xl px-5 py-3"
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
