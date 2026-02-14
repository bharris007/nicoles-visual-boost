import { motion } from "framer-motion";
import headshot from "@/assets/headshot.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(200,80%,55%)] via-[hsl(260,60%,55%)] to-[hsl(180,70%,50%)] flex items-center justify-center p-4 md:p-8">
      {/* 16:9 Slide Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl aspect-video bg-card rounded-2xl shadow-2xl overflow-hidden relative flex"
      >
        {/* Left column — coach + branding */}
        <div className="w-[38%] flex flex-col items-center justify-center gap-5 px-6 relative bg-muted/50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-[3px] border-border shadow-lg">
              <img
                src={headshot}
                alt="Coach"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase"
          >
            Growth Tools
          </motion.p>
        </div>

        {/* Right column — goal + why */}
        <div className="w-[62%] flex flex-col justify-center pr-8 md:pr-14 py-8 gap-5 md:gap-7">
          {/* Client name label */}
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-xs md:text-sm font-semibold tracking-[0.2em] uppercase"
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
            <span className="block text-accent text-sm md:text-lg font-medium mt-1">
              per year
            </span>
          </motion.div>

          {/* The Why */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="bg-muted/60 rounded-xl p-4 md:p-6 border border-border"
          >
            <p className="text-accent text-[9px] md:text-[11px] font-bold tracking-[0.25em] uppercase mb-2">
              Why This Matters
            </p>
            <p className="text-card-foreground/80 text-[11px] md:text-sm leading-relaxed">
              "Achieving my revenue goal would make it possible for me to improve my quality of life
              by quitting my second job, getting access to better quality healthcare providers,
              getting rid of debt, increasing my spending on whole foods and fresh produce, moving to
              a nicer residence in an even better, quieter zip code, traveling more often and for
              longer periods of time, and spending more time with friends and family."
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
