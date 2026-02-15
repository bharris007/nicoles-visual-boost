import { motion } from "framer-motion";
import { Mail, Globe, Users, CheckCircle2, AlertTriangle, Handshake } from "lucide-react";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45 },
});

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

interface DynamicSlide9Props {
  data: {
    clientName: string;
    selectedPartner: {
      name: string;
      business: string;
      website: string;
      audience: string;
      problemSolved: string;
      listSize: string;
      whyGoodFit: string;
      criteriaChecks: {
        hasAudience: string;
        sendsContent: string;
        mightHaveClient: string;
      };
    };
  };
}

const DynamicSlide9 = ({ data }: DynamicSlide9Props) => {
  const clientName = data?.clientName ?? "Client";
  const p = data?.selectedPartner;

  if (!p) {
    return (
      <div className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)" }}>
        <p className="text-white/60 text-lg">Partner data not available. Please regenerate.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex flex-col"
      style={{
        background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
      }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

      {/* Accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[hsl(45,100%,55%)] via-[hsl(45,100%,65%)] to-[hsl(145,50%,45%)] shrink-0" />

      <div className="flex flex-col flex-1 px-8 md:px-14 py-5 md:py-7 relative z-10">
        {/* Header row */}
        <div className="flex items-center gap-5 mb-5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20 shrink-0">
              <img src={headshot} alt="Coach Bryan" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 md:w-6 md:h-6 rounded-lg overflow-hidden shadow-lg shadow-black/30">
              <img src={gtFavicon} alt="Growth Tools" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <div>
            <motion.span {...fadeUp(0.25)} className="text-white/30 text-xs font-bold uppercase tracking-widest block mb-1">
              {clientName}'s First Partner
            </motion.span>
            <motion.h2 {...fadeUp(0.35)} className="text-2xl md:text-4xl font-black text-white leading-tight">
              <span className="text-[hsl(45,100%,55%)]">{p.name}</span>
            </motion.h2>
            <motion.p {...fadeUp(0.4)} className="text-white/40 text-xs mt-0.5 flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              {p.website.replace(/^https?:\/\//, "")}
            </motion.p>
          </div>
        </div>

        {/* Top row: Matched badge + Business + List Size */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Matched badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative rounded-xl px-5 py-4 backdrop-blur-sm flex flex-col gap-1 overflow-hidden transition-all duration-200 hover:shadow-[0_0_35px_hsl(45,100%,55%,0.25)]"
            style={{
              background: "linear-gradient(135deg, hsl(145,50%,30%) 0%, hsl(145,50%,20%) 60%, hsl(45,80%,25%) 100%)",
              boxShadow: "0 0 25px hsl(45,100%,55%,0.15), 0 0 50px hsl(145,50%,45%,0.1), inset 0 1px 0 hsl(45,100%,65%,0.25)",
            }}
          >
            <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ padding: "2px", background: "linear-gradient(135deg, hsl(145,50%,55%), hsl(45,100%,55%), hsl(145,50%,55%))", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-[hsl(45,100%,55%)]/10 to-transparent pointer-events-none animate-pulse" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, hsl(145,50%,45%), hsl(45,90%,45%))" }}>
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-base font-black uppercase tracking-wider" style={{ background: "linear-gradient(90deg, hsl(145,50%,60%), hsl(45,100%,60%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>You're Matched!</span>
            </div>
            <span className="text-white/40 text-[10px] leading-tight relative z-10 pl-14">{p.name} is actively looking for people like you to promote!</span>
          </motion.div>

          <motion.div
            {...fadeUp(0.55)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.10] hover:border-white/20 hover:shadow-lg"
          >
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Business</span>
            </div>
            <p className="text-white font-black text-lg md:text-xl">{p.business}</p>
            <p className="text-white/30 text-[10px]">{p.audience}</p>
          </motion.div>

          <motion.div
            {...fadeUp(0.6)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.10] hover:border-white/20 hover:shadow-lg"
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-3.5 h-3.5 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">List Size</span>
            </div>
            <p className="text-white font-black text-xl md:text-2xl">{p.listSize}</p>
            <p className="text-white/30 text-[10px]">engaged subscribers</p>
          </motion.div>
        </div>

        {/* What they do + Why good fit */}
        <div className="grid grid-cols-2 gap-3 mb-3 flex-1">
          <motion.div
            {...fadeUp(0.65)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-3.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.10] hover:border-white/20 hover:shadow-lg"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Mail className="w-4 h-4 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">What {p.name.split(" ")[0]} Does</span>
            </div>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">{p.problemSolved}</p>
          </motion.div>

          <motion.div
            {...fadeUp(0.7)}
            className="bg-white/[0.06] border border-white/10 rounded-xl px-5 py-3.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/[0.10] hover:border-white/20 hover:shadow-lg"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Handshake className="w-4 h-4 text-[hsl(145,50%,55%)]" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Why You'd Be a Good Fit</span>
            </div>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed">{p.whyGoodFit}</p>
          </motion.div>
        </div>

        {/* CTA callout */}
        <motion.div
          {...fadeUp(1.0)}
          className="flex items-center gap-3 bg-[hsl(45,100%,55%)]/[0.12] border-2 border-[hsl(45,100%,55%)]/30 rounded-xl px-5 py-3 mt-3 transition-all duration-200 hover:bg-[hsl(45,100%,55%)]/[0.18] hover:shadow-lg"
        >
          <AlertTriangle className="w-5 h-5 text-[hsl(45,100%,55%)] shrink-0" />
          <p className="text-white/80 text-xs md:text-sm leading-relaxed">
            <span className="text-[hsl(45,100%,55%)] font-black">You're not ready to reach out to {p.name} yet.</span>{" "}
            We need to make sure your resource and pitch are dialed in first.{" "}
            <span className="text-white/40 font-semibold">That's what we'll prep next.</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DynamicSlide9;
