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

      {/* Accent bar across top */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[hsl(45,100%,55%)] via-[hsl(45,100%,65%)] to-[hsl(145,50%,45%)] shrink-0" />

      {/* Full-width content */}
      <div className="flex flex-col flex-1 px-8 md:px-14 py-5 md:py-7 relative z-10">

        {/* Header row: photo + name */}
        <div className="flex items-center gap-5 mb-5">
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

        {/* 3-col row: Open to Partners | List Size | Email Cadence */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Open to Partners — hero badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative rounded-xl px-5 py-4 backdrop-blur-sm flex items-center gap-4 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(145,50%,30%) 0%, hsl(145,50%,20%) 60%, hsl(45,80%,25%) 100%)",
              boxShadow: "0 0 25px hsl(45,100%,55%,0.15), 0 0 50px hsl(145,50%,45%,0.1), inset 0 1px 0 hsl(45,100%,65%,0.25)",
            }}
          >
            {/* Gradient border overlay */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                padding: "2px",
                background: "linear-gradient(135deg, hsl(145,50%,55%), hsl(45,100%,55%), hsl(145,50%,55%))",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            {/* Shimmer */}
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[hsl(45,100%,55%)]/10 to-transparent pointer-events-none animate-pulse" />
            <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, hsl(145,50%,45%), hsl(45,90%,45%))" }}>
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div className="relative z-10">
              <span className="text-base font-black uppercase tracking-wider block" style={{ background: "linear-gradient(90deg, hsl(145,50%,60%), hsl(45,100%,60%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Actively Looking for Partners</span>
              <span className="text-white/40 text-[10px]">Wants you to reach out!</span>
            </div>
          </motion.div>

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

          <motion.div
            {...fadeUp(0.6)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Email Cadence</span>
            </div>
            <p className="text-white font-black text-xl md:text-2xl">3x / week</p>
            <p className="text-white/30 text-[10px]">Tue, Thu & Sunday sends</p>
          </motion.div>
        </div>

        {/* 2-col row: What She Does | Why You'd Be a Good Fit */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          <motion.div
            {...fadeUp(0.65)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-3.5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Mail className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">What She Does</span>
            </div>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              Liz helps couples rebuild trust and reignite connection after infidelity or emotional distance. She runs a tight-knit community of women actively investing in personal growth.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.75)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-3.5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Handshake className="w-4 h-4 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Why You'd Be a Good Fit</span>
            </div>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">
              Her audience is full of women doing deep inner work — they're already buyers of coaching and courses. Your offer is a natural next step for them.
            </p>
          </motion.div>
        </div>

        {/* CTA callout — 1 col, pinned bottom */}
        <motion.div
          {...fadeUp(1.0)}
          className="flex items-center gap-3 bg-[hsl(45,100%,55%)]/[0.12] border-2 border-[hsl(45,100%,55%)]/30 rounded-xl px-5 py-3 mt-3"
        >
          <AlertTriangle className="w-5 h-5 text-[hsl(45,100%,55%)] shrink-0" />
          <p className="text-white/80 text-xs md:text-sm leading-relaxed">
            <span className="text-[hsl(45,100%,55%)] font-black">You're not ready to reach out to Liz yet.</span>{" "}
            We need to make sure your resource and pitch are dialed in first.{" "}
            <span className="text-white/40 font-semibold">We'll prep you on Day 3.</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide9;
