import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/headshot.png";
import { Users, MessageCircle, Handshake, DollarSign, ChevronDown } from "lucide-react";

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

type TimeFrame = "year" | "month";

const funnelData: Record<TimeFrame, { leads: string; conversations: string; clients: string; revenue: string }> = {
  year: { leads: "1,200", conversations: "120", clients: "12", revenue: "$120,000" },
  month: { leads: "100", conversations: "10", clients: "1", revenue: "$10,000" },
};

const FunnelStep = ({
  number,
  label,
  icon: Icon,
  delay,
  widthPercent,
  highlight = false,
  active = false,
  onClick,
}: {
  number: string;
  label: string;
  icon: React.ElementType;
  delay: number;
  widthPercent: number;
  highlight?: boolean;
  active?: boolean;
  onClick?: () => void;
}) => {
  const isLit = highlight || active;
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 80 }}
      className="flex items-center gap-4 md:gap-5"
    >
      <div
        onClick={onClick}
        className={`relative rounded-lg flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-2.5 border transition-all duration-200 cursor-pointer ${
          isLit
            ? "bg-[hsl(45,100%,55%)]/15 border-[hsl(45,100%,55%)]/40 hover:bg-[hsl(45,100%,55%)]/25 hover:border-[hsl(45,100%,55%)]/60 hover:scale-[1.02] hover:shadow-lg hover:shadow-[hsl(45,100%,55%)]/10"
            : "bg-white/[0.06] border-white/10 hover:bg-white/[0.12] hover:border-white/25 hover:scale-[1.02] hover:shadow-lg hover:shadow-white/5"
        }`}
        style={{ width: `${widthPercent}%` }}
      >
        <div
          className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0 ${
            isLit ? "bg-[hsl(45,100%,55%)]/20" : "bg-white/10"
          }`}
        >
          <Icon
            className={`w-4 h-4 md:w-5 md:h-5 ${
              isLit ? "text-[hsl(45,100%,55%)]" : "text-white/60"
            }`}
          />
        </div>
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.p
              key={number}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={`text-xl md:text-2xl font-extrabold leading-none ${
                isLit ? "text-[hsl(45,100%,55%)]" : "text-white"
              }`}
            >
              {number}
            </motion.p>
          </AnimatePresence>
          <p className="text-white/50 text-[8px] md:text-[10px] font-semibold uppercase tracking-wider mt-0.5">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const FunnelArrow = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration: 0.3 }}
    className="flex items-center pl-6 md:pl-10 -my-0.5"
  >
    <ChevronDown className="w-4 h-4 text-[hsl(145,60%,50%)]/40" />
  </motion.div>
);

const timeFrameLabels: { value: TimeFrame; label: string }[] = [
  { value: "year", label: "Year" },
  { value: "month", label: "Month" },
];

const Slide2 = () => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("year");
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const data = funnelData[timeFrame] ?? funnelData.year;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex"
      style={{
        background:
          "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
      }}
    >
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

      {/* Left sidebar — coach */}
      <div className="w-[28%] flex flex-col items-center pt-8 md:pt-10 pb-8 md:pb-10 px-4 relative border-r border-white/10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20">
            <img src={headshot} alt="Coach Bryan" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[hsl(145,65%,38%)] border-2 border-[hsl(45,100%,55%)] flex items-center justify-center shadow-md">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="12" width="4" height="8" rx="1" fill="white" opacity="0.5" />
              <rect x="8" y="7" width="4" height="13" rx="1" fill="white" opacity="0.75" />
              <rect x="14" y="2" width="4" height="18" rx="1" fill="white" />
            </svg>
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-white font-bold text-xs md:text-sm mt-3">
          Coach Bryan
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <GrowthToolsLogo className="text-[7px] md:text-[8px] mt-1 text-white/50" />
        </motion.div>

        {/* Conversion rates visual */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-auto mb-4 w-full px-2">
          <div className="bg-white/[0.05] rounded-lg p-3 border border-white/10 space-y-2">
            <p className="text-[hsl(45,100%,55%)] text-[7px] md:text-[8px] font-bold tracking-[0.2em] uppercase text-center">
              Conversion Rates
            </p>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-[9px] md:text-[10px]">Leads → Calls</span>
                <span className="text-white/70 text-[9px] md:text-[10px] font-bold">10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40 text-[9px] md:text-[10px]">Calls → Clients</span>
                <span className="text-white/70 text-[9px] md:text-[10px] font-bold">10%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right content — the math */}
      <div className="w-[72%] flex flex-col justify-between px-6 md:px-10 py-14 md:py-16 gap-2 relative z-10">
        {/* Title */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="mb-2">
          <p className="text-white text-xl md:text-2xl font-extrabold tracking-normal uppercase">
            Nicole's Path to $120,000
          </p>
          <p className="text-white/25 text-[9px] md:text-[11px] mt-0.5">
            Here's exactly what it takes — and why it's completely doable.
          </p>
        </motion.div>

        {/* Funnel */}
        <div className="flex flex-col gap-1 md:gap-1.5">
          <FunnelStep icon={Users} number={data.leads} label="Leads raise their hand" delay={0.45} widthPercent={100} active={activeStep === "leads"} onClick={() => setActiveStep(activeStep === "leads" ? null : "leads")} />
          <FunnelArrow delay={0.55} />
          <FunnelStep icon={MessageCircle} number={data.conversations} label="Conversations" delay={0.65} widthPercent={80} active={activeStep === "conversations"} onClick={() => setActiveStep(activeStep === "conversations" ? null : "conversations")} />
          <FunnelArrow delay={0.75} />
          <FunnelStep icon={Handshake} number={data.clients} label="Clients" delay={0.85} widthPercent={55} active={activeStep === "clients"} onClick={() => setActiveStep(activeStep === "clients" ? null : "clients")} />
          <FunnelArrow delay={0.95} />
          <FunnelStep icon={DollarSign} number={data.revenue} label="Revenue" delay={1.05} widthPercent={45} highlight active={activeStep === "revenue"} onClick={() => setActiveStep(activeStep === "revenue" ? null : "revenue")} />
        </div>

        {/* Time frame toggle — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex justify-end mt-1"
        >
          <div className="flex items-center bg-white/[0.06] rounded-lg border border-white/10 p-0.5">
            {timeFrameLabels.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTimeFrame(value)}
                className={`px-3 py-1 rounded-md text-[10px] md:text-xs font-semibold transition-all ${
                  timeFrame === value
                    ? "bg-[hsl(45,100%,55%)]/20 text-[hsl(45,100%,55%)] shadow-sm"
                    : "text-white/35 hover:text-white/55"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide2;
