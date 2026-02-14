import { motion } from "framer-motion";
import coachImg from "@/assets/bryan-harris.jpg";
import gtFavicon from "@/assets/gt-favicon.png";
import { Search, BarChart3, Users, Package, ArrowRight, Sparkles } from "lucide-react";

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

const steps = [
  {
    icon: Search,
    title: "Target Market Analysis",
    desc: "Deep dive into the 12M struggling marriages — who they are, where they are, what they spend",
    color: "hsl(25,100%,55%)",
  },
  {
    icon: BarChart3,
    title: "Target Audience Analysis",
    desc: "Where Nicole's ideal $100K+ clients consume content — newsletters, podcasts, YouTube",
    color: "hsl(145,50%,45%)",
  },
  {
    icon: Package,
    title: "Full Offer Creation",
    desc: "Build out the $10,000 coaching package — Plan, Training, Access — ready to sell",
    color: "hsl(45,100%,55%)",
  },
];

const Slide7 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex"
      style={{
        background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
      }}
    >
      {/* Decorative */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-[40%] h-1 bg-gradient-to-r from-[hsl(145,50%,45%)] via-[hsl(45,100%,55%)] to-[hsl(25,100%,55%)]" />

      {/* Top banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-0 left-[40%] right-0 z-20 bg-[hsl(45,100%,55%)]/15 backdrop-blur-sm border-b border-[hsl(45,100%,55%)]/20 px-6 py-3 flex items-center gap-3"
      >
        <span className="text-xl">🔥</span>
        <span className="text-[hsl(45,100%,55%)] text-sm md:text-base font-bold uppercase tracking-wider">
          Tomorrow's Training Preview
        </span>
        <div className="flex-1 h-px bg-[hsl(45,100%,55%)]/20" />
        <div className="w-6 h-6 rounded-md overflow-hidden shadow-lg shadow-black/30">
          <img src={gtFavicon} alt="Growth Tools" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Left: Photo */}
      <div className="w-[40%] relative overflow-hidden">
        <img
          src={coachImg}
          alt="Coach Bryan strategizing"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[hsl(160,50%,18%)] to-transparent" />
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm border border-white/15 rounded-lg px-3 py-1.5 z-10"
        >
          <p className="text-white text-sm md:text-base font-bold">Coach Bryan</p>
          <GrowthToolsLogo className="text-[7px] text-white/40" />
        </motion.div>
      </div>

      {/* Right: Content */}
      <div className="w-[60%] flex flex-col justify-center px-8 md:px-10 py-6 pt-16 relative z-10">
        {/* Headline */}
        <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl md:text-3xl font-black text-white leading-tight">
            Finding Your <span className="text-[hsl(45,100%,55%)]">12 Clients</span>
          </h2>
          <p className="text-white/50 text-[10px] md:text-xs mt-2 leading-relaxed">
            A step-by-step roadmap we'll build together — from market research to a launch-ready offer.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col gap-3 mt-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.15 }}
              className="flex items-start gap-3 bg-white/[0.05] border border-white/10 rounded-xl p-3 hover:bg-white/[0.08] transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${step.color}15` }}
              >
                <step.icon className="w-5 h-5" style={{ color: step.color }} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-bold" style={{ color: step.color }}>
                  {i + 1}. {step.title}
                </p>
                <p className="text-white/50 text-[10px] md:text-xs leading-relaxed mt-0.5">
                  {step.desc}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 shrink-0 mt-1" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-[hsl(45,100%,55%)]/[0.08] backdrop-blur-md rounded-lg px-4 py-2.5 border border-[hsl(45,100%,55%)]/20 flex items-center justify-center gap-2 mt-4"
        >
          <Sparkles className="w-4 h-4 text-[hsl(45,100%,55%)]" />
          <p className="text-[hsl(45,100%,55%)] text-xs md:text-sm font-bold">
            By the end — Nicole has a complete business blueprint
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide7;
