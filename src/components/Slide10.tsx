import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Send, Users, Zap, Clock } from "lucide-react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45 },
});

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  return { hours, minutes, seconds };
};

const TimerDigit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="bg-black/40 border border-[hsl(45,100%,55%)]/30 rounded-lg px-4 py-2 min-w-[60px] text-center">
      <span className="text-3xl md:text-4xl font-black text-[hsl(45,100%,55%)] tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="text-white/30 text-[9px] font-bold uppercase tracking-widest mt-1">{label}</span>
  </div>
);

const bonuses = [
  {
    number: 1,
    icon: Send,
    title: "Promotion to 100,000 Subscribers",
    highlight: "Next Week",
    worth: "$5,000",
    description:
      "We promote you to the entire Growth Tools email list of 100,000 subscribers next week. You get instant credibility and instant leads to make jumpstarting your high-ticket offer easy.",
  },
  {
    number: 2,
    icon: Users,
    title: "Promotion to 500+ Audience Owners",
    highlight: "Next Week",
    worth: "$5,000",
    description:
      "We email our entire database of partner audiences introducing you to them. This gets you instant inbound requests for BOPA partnerships.",
  },
];

const Slide10 = () => {
  const { hours, minutes, seconds } = useCountdown();

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

      {/* Accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[hsl(45,100%,55%)] via-[hsl(45,100%,65%)] to-[hsl(145,50%,45%)] shrink-0" />

      <div className="flex flex-col flex-1 px-8 md:px-14 py-5 md:py-7 relative z-10">
        {/* Badge */}
        <motion.div {...fadeUp(0.2)} className="flex justify-center mb-2">
          <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[hsl(45,100%,55%)]/40 bg-[hsl(45,100%,55%)]/[0.08]">
            <Gift className="w-4 h-4 text-[hsl(45,100%,55%)]" />
            <span className="text-[hsl(45,100%,55%)] text-xs font-bold uppercase tracking-widest">
              24-Hour Fast Action Bonuses
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2 {...fadeUp(0.3)} className="text-center text-2xl md:text-4xl font-black text-white leading-tight mb-1">
          Hire Us Today &{" "}
          <span className="italic text-[hsl(45,100%,55%)]">Get These Bonuses</span>
        </motion.h2>
        <motion.p {...fadeUp(0.35)} className="text-center text-white/50 text-xs md:text-sm mb-6">
          Over <span className="text-[hsl(45,100%,55%)] font-bold">$10,000 in value</span> — included free when you start coaching with us within 24 hours.
        </motion.p>

        {/* Bonus cards */}
        <div className="grid grid-cols-2 gap-5 flex-1">
          {bonuses.map((bonus, i) => (
            <motion.div
              key={bonus.number}
              {...fadeUp(0.5 + i * 0.15)}
              className="relative rounded-xl border-2 border-[hsl(45,100%,55%)]/30 bg-white/[0.04] backdrop-blur-sm px-5 py-4 flex flex-col transition-all duration-200 hover:bg-white/[0.08] hover:border-[hsl(45,100%,55%)]/50"
            >
              {/* Number badge */}
              <div className="absolute -top-4 -left-3 w-8 h-8 rounded-full bg-[hsl(45,100%,55%)] flex items-center justify-center shadow-lg shadow-[hsl(45,100%,55%)]/20">
                <span className="text-sm font-black text-[hsl(160,50%,18%)]">{bonus.number}</span>
              </div>

              {/* Expires badge */}
              <div className="absolute -top-3 right-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(145,50%,25%)] border border-[hsl(45,100%,55%)]/40">
                  <Zap className="w-3 h-3 text-[hsl(45,100%,55%)]" />
                  <span className="text-[hsl(45,100%,55%)] text-[10px] font-bold">
                    Expires in {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m
                  </span>
                </div>
              </div>

              {/* Icon + Title */}
              <div className="flex items-start gap-4 mt-2 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[hsl(45,100%,55%)]/[0.1] border border-[hsl(45,100%,55%)]/20 flex items-center justify-center shrink-0">
                  <bonus.icon className="w-6 h-6 text-[hsl(45,100%,55%)]" />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-lg md:text-xl leading-tight">
                    {bonus.title}{" "}
                    <span className="text-[hsl(45,100%,55%)] underline underline-offset-2">{bonus.highlight}</span>
                  </h3>
                </div>
              </div>

              {/* Worth badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 rounded-md bg-[hsl(45,100%,55%)]/[0.12] border border-[hsl(45,100%,55%)]/30 text-[hsl(45,100%,55%)] text-sm font-bold">
                  {bonus.worth}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/55 text-xs md:text-sm leading-relaxed">
                {bonus.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timer + CTA */}
        <motion.div
          {...fadeUp(0.9)}
          className="flex items-center justify-between mt-4 bg-black/20 border border-white/10 rounded-xl px-6 py-3"
        >
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[hsl(45,100%,55%)]" />
            <div>
              <p className="text-white font-bold text-sm">Ready to get coached by us?</p>
              <p className="text-white/40 text-[10px]">These bonuses disappear when the timer hits zero.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TimerDigit value={hours} label="Hrs" />
            <span className="text-[hsl(45,100%,55%)] text-2xl font-bold pb-4">:</span>
            <TimerDigit value={minutes} label="Min" />
            <span className="text-[hsl(45,100%,55%)] text-2xl font-bold pb-4">:</span>
            <TimerDigit value={seconds} label="Sec" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide10;
