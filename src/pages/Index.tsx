import { motion } from "framer-motion";
import headshot from "@/assets/headshot.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center p-6 overflow-hidden relative">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsla(0,0%,100%,1) 1px, transparent 1px), linear-gradient(90deg, hsla(0,0%,100%,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center gap-10">
        {/* Coach intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-foreground/20 shadow-2xl">
            <img
              src={headshot}
              alt="Coach headshot"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
            Growth Tools
          </p>
        </motion.div>

        {/* Client name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-foreground/80 text-xl md:text-2xl font-medium mb-2">
            Nicole's Revenue Goal
          </h2>
        </motion.div>

        {/* Revenue number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
          className="text-center"
        >
          <h1 className="font-display text-7xl md:text-9xl text-gradient-gold leading-none tracking-tight">
            $120,000
          </h1>
          <p className="text-foreground/60 text-lg mt-3 font-medium">per year</p>
        </motion.div>

        {/* The Why */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="w-full"
        >
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <p className="text-accent text-xs font-bold tracking-[0.25em] uppercase mb-4">
              Why This Matters
            </p>
            <p className="text-foreground/90 text-lg md:text-xl leading-relaxed font-light">
              "Achieving my revenue goal would make it possible for me to improve my quality of life
              by quitting my second job, getting access to better quality healthcare providers,
              getting rid of debt, increasing my spending on whole foods and fresh produce, moving to
              a nicer residence in an even better, quieter zip code, traveling more often and for
              longer periods of time, and spending more time with friends and family."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
