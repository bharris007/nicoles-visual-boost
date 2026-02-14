import { motion } from "framer-motion";
import headshot from "@/assets/headshot.png";
import { TrendingUp } from "lucide-react";

const GrowthToolsLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-[3px] font-extrabold tracking-[0.12em] uppercase text-white ${className}`}>
    <span>GRO</span>
    {/* Bar chart icon inline */}
    <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" className="inline-block -mt-[2px]">
      <rect x="2" y="12" width="4" height="8" rx="1" fill="currentColor" opacity="0.5" />
      <rect x="8" y="7" width="4" height="13" rx="1" fill="currentColor" opacity="0.75" />
      <rect x="14" y="2" width="4" height="18" rx="1" fill="currentColor" />
    </svg>
    <span>TH TOOLS</span>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-[hsl(220,15%,18%)] flex items-center justify-center p-4 md:p-8">
      {/* 16:9 Slide Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex"
        style={{
          background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

        {/* Left sidebar */}
        <div className="w-[30%] flex flex-col items-center pt-8 md:pt-10 pb-6 px-4 relative border-r border-white/10">
          {/* Face with logo badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20">
              <img src={headshot} alt="Coach Bryan" className="w-full h-full object-cover" />
            </div>
            {/* Logo badge */}
            <div className="absolute -bottom-2 -right-2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[hsl(145,65%,38%)] border-2 border-[hsl(45,100%,55%)] flex items-center justify-center shadow-md">
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="12" width="4" height="8" rx="1" fill="white" opacity="0.5" />
                <rect x="8" y="7" width="4" height="13" rx="1" fill="white" opacity="0.75" />
                <rect x="14" y="2" width="4" height="18" rx="1" fill="white" />
              </svg>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-white font-bold text-sm md:text-base mt-4"
          >
            Coach Bryan
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <GrowthToolsLogo className="text-[8px] md:text-[9px] mt-1 text-white/50" />
          </motion.div>

          {/* Big trending icon — absolutely positioned to align with why box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="absolute bottom-[28%] inset-x-0 flex justify-center"
          >
            <TrendingUp className="w-24 h-24 md:w-32 md:h-32 text-white/[0.08]" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Right content */}
        <div className="w-[70%] flex flex-col justify-center px-8 md:px-14 py-8 gap-4 md:gap-6 relative z-10">
          {/* Client name label */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 text-xs md:text-sm font-semibold tracking-normal"
          >
            Nicole's Revenue Goal
          </motion.p>

          {/* Revenue number */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 80 }}
          >
            <h1 className="text-gradient-gold text-5xl md:text-8xl font-extrabold leading-none tracking-tight">
              $120,000
            </h1>
            <span className="block text-[hsl(45,100%,55%)] text-sm md:text-lg font-medium mt-1 opacity-70">
              in next 12 months
            </span>
          </motion.div>

          {/* The Why */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="bg-white/[0.07] backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/10"
          >
            <p className="text-[hsl(45,100%,55%)] text-[9px] md:text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
              Nicole's #1 Motivating Force
            </p>
            <p className="text-white/75 text-[11px] md:text-sm leading-relaxed">
              "Achieving my revenue goal would make it possible for me to improve my quality of life
              by quitting my second job, getting access to better quality healthcare providers,
              getting rid of debt, increasing my spending on whole foods and fresh produce, moving to
              a nicer residence in an even better, quieter zip code, traveling more often and for
              longer periods of time, and spending more time with friends and family."
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="text-white/50 text-[10px] md:text-xs"
          >
            By hitting this goal, you'd be in the <span className="text-[hsl(45,100%,55%)] font-semibold">90th percentile</span> of all businesses in this space.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
