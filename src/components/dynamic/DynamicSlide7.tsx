import { motion } from "framer-motion";
import justinImg from "@/assets/justin-brooke.png";
import { TrendingUp, Target, Users } from "lucide-react";

const DynamicSlide7 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex"
      style={{
        background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="absolute top-0 left-[40%] right-0 z-20 bg-[hsl(45,100%,55%)]/15 backdrop-blur-sm border-b border-[hsl(45,100%,55%)]/20 px-6 py-3 flex items-center gap-3"
      >
        <span className="text-xl">🔥</span>
        <span className="text-[hsl(45,100%,55%)] text-sm md:text-base font-bold uppercase tracking-wider">
          Tomorrow's Training Preview
        </span>
        <div className="flex-1 h-px bg-[hsl(45,100%,55%)]/20" />
      </motion.div>

      <div className="absolute top-0 left-0 w-[40%] h-1 bg-gradient-to-r from-[hsl(145,50%,45%)] via-[hsl(45,100%,55%)] to-[hsl(25,100%,55%)]" />

      <div className="w-[40%] relative overflow-hidden">
        <img src={justinImg} alt="Justin Brooke" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[hsl(160,50%,18%)] to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm border border-white/15 rounded-lg px-3 py-1.5 z-10"
        >
          <p className="text-white text-sm md:text-base font-bold">Justin Brooke</p>
          <p className="text-white/50 text-[9px] md:text-[10px] font-medium">BOPA Partner</p>
        </motion.div>
      </div>

      <div className="w-[60%] flex flex-col justify-center px-8 md:px-10 py-6 pt-12 relative z-10">
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xl md:text-3xl font-black text-white leading-tight">
            Case Study: How We Borrowed Justin's Audience and Landed a <span className="text-[hsl(45,100%,55%)]">$10,000</span> Client
          </h2>
          <span className="text-[hsl(145,50%,45%)] text-[10px] md:text-xs font-semibold">
            BOPA Partnership Case Study
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.27 }} className="flex gap-3 mt-4">
          <div className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-white/30" />
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-wider">Before BOPA</span>
            </div>
            <p className="text-white/70 text-[10px] md:text-xs leading-relaxed">
              Running ads and content alone with unpredictable lead flow
            </p>
          </div>
          <div className="flex-1 bg-[hsl(145,50%,45%)]/[0.08] border border-[hsl(145,50%,45%)]/20 rounded-xl p-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="w-3 h-3 text-[hsl(145,50%,45%)]" />
              <span className="text-[hsl(145,50%,45%)] text-[9px] font-bold uppercase tracking-wider">After BOPA</span>
            </div>
            <p className="text-white/70 text-[10px] md:text-xs leading-relaxed">
              327 leads and a new high-ticket client from a single partnership
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-[hsl(45,100%,55%)]/[0.08] border border-[hsl(45,100%,55%)]/20 rounded-xl px-5 py-3 flex items-center justify-around mt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[hsl(25,100%,55%)]/15 flex items-center justify-center">
              <Target className="w-4 h-4 text-[hsl(25,100%,55%)]" />
            </div>
            <div>
              <p className="text-[hsl(25,100%,55%)] text-xl md:text-2xl font-black leading-none">327</p>
              <p className="text-white/40 text-[8px] md:text-[10px] font-semibold">Leads Generated</p>
            </div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[hsl(145,50%,45%)]/15 flex items-center justify-center">
              <Users className="w-4 h-4 text-[hsl(145,50%,45%)]" />
            </div>
            <div>
              <p className="text-[hsl(145,50%,45%)] text-xl md:text-2xl font-black leading-none">1 Client</p>
              <p className="text-white/40 text-[8px] md:text-[10px] font-semibold">Landed</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="flex gap-2 items-start mt-4">
          <div className="w-1 self-stretch rounded-full bg-[hsl(45,100%,55%)]/30 shrink-0" />
          <p className="text-white/45 text-xs md:text-sm italic leading-relaxed">
            "One partnership changed everything. We went from grinding for leads to having them come to us. BOPA made it repeatable."
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DynamicSlide7;