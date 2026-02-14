import { motion } from "framer-motion";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp, Users, DollarSign, Target } from "lucide-react";

const CLIENTS_PER_1000 = 2;
const PRICE = 10000;
const GOAL = 120000;

const weeks = Array.from({ length: 6 }, (_, i) => {
  const week = i + 1;
  const totalClients = week * CLIENTS_PER_1000;
  const totalRevenue = totalClients * PRICE;
  const progress = Math.min((totalRevenue / GOAL) * 100, 100);
  const hitGoal = totalRevenue >= GOAL;
  return { week, totalClients, totalRevenue, progress, hitGoal };
});

const Slide8 = () => {
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
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(145,50%,45%)] via-[hsl(45,100%,55%)] to-[hsl(25,100%,55%)]" />

      {/* Header */}
      <div className="px-8 pt-5 pb-1 relative z-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-md overflow-hidden shadow-lg shadow-black/30">
            <img src={gtFavicon} alt="Growth Tools" className="w-full h-full object-cover" />
          </div>
          <span className="text-white/30 text-sm font-bold uppercase tracking-widest">Your Revenue Roadmap</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            You said <span className="text-[hsl(45,100%,55%)]">2 clients</span> from every 1,000 people.
          </h2>
          <p className="text-white/50 text-sm mt-1">
            Here's what that looks like when you do it once a week.
          </p>
        </motion.div>
      </div>


      {/* Weekly progression */}
      <div className="flex-1 px-8 py-4 relative z-10 flex flex-col justify-evenly min-h-0">
        <div className="grid grid-cols-6 gap-2.5">
          {weeks.map((w, i) => (
            <motion.div
              key={w.week}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className={`rounded-xl p-3 border flex flex-col items-center gap-2 ${
                w.hitGoal
                  ? "bg-[hsl(45,100%,55%)]/[0.12] border-[hsl(45,100%,55%)]/30"
                  : "bg-white/[0.05] border-white/10"
              }`}
            >
              <span className="text-white/40 text-xs font-bold uppercase tracking-wider">
                Week {w.week}
              </span>

              {/* Clients */}
              <div className="text-center">
                <p className={`text-3xl md:text-4xl font-black leading-none ${w.hitGoal ? "text-[hsl(45,100%,55%)]" : "text-white"}`}>
                  {w.totalClients}
                </p>
                <p className="text-white/40 text-xs font-semibold mt-1">clients total</p>
              </div>

              {/* Revenue */}
              <div className={`text-center rounded-lg px-2 py-1.5 w-full ${
                w.hitGoal ? "bg-[hsl(45,100%,55%)]/20" : "bg-white/[0.04]"
              }`}>
                <p className={`text-xl md:text-2xl font-black ${w.hitGoal ? "text-[hsl(45,100%,55%)]" : "text-[hsl(145,50%,45%)]"}`}>
                  ${(w.totalRevenue / 1000).toFixed(0)}K
                </p>
                <p className="text-white/30 text-[10px] font-semibold">revenue</p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${w.progress}%` }}
                  transition={{ delay: 0.9 + i * 0.1, duration: 0.6 }}
                  className={`h-full rounded-full ${w.hitGoal ? "bg-[hsl(45,100%,55%)]" : "bg-[hsl(145,50%,45%)]"}`}
                />
              </div>

              {w.hitGoal && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, type: "spring" }}
                  className="text-[hsl(45,100%,55%)] text-xs font-black uppercase tracking-wider"
                >
                  🎯 Goal Hit!
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-3 flex items-center gap-3 bg-[hsl(45,100%,55%)]/[0.08] border border-[hsl(45,100%,55%)]/20 rounded-xl px-5 py-2.5"
        >
          <TrendingUp className="w-6 h-6 text-[hsl(45,100%,55%)] shrink-0" />
          <p className="text-white/70 text-sm md:text-base leading-relaxed">
            At just <span className="text-[hsl(45,100%,55%)] font-bold">2 clients per 1,000 people</span>, you hit your
            <span className="text-[hsl(45,100%,55%)] font-bold"> $120K goal in 6 weeks</span>.
            The only question is — where do those 1,000 people come from? <span className="text-white font-bold">We already have an answer for you.</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide8;
