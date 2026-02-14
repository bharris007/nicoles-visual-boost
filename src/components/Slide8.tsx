import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import headshot from "@/assets/headshot.png";
import gtFavicon from "@/assets/gt-favicon.png";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

const CLIENTS_PER_1000: number = 1;
const PRICE: number = 10000;
const GOAL: number = 500000;

// Derive timeline
const revenuePerWeek = CLIENTS_PER_1000 * PRICE;
const weeksToGoal = Math.ceil(GOAL / revenuePerWeek);

// Build data points — show a few weeks past the goal for visual breathing room
const totalPoints = Math.max(weeksToGoal + 2, 6);

// Decide label strategy: if many weeks, show monthly labels
const useMonthlLabels = totalPoints > 12;

const goalWeekIndex = weeksToGoal - 1;

const chartData = Array.from({ length: totalPoints }, (_, i) => {
  const week = i + 1;
  const revenue = Math.min(week * revenuePerWeek, GOAL * 1.15);
  return {
    week,
    revenue,
    label: useMonthlLabels
      ? week % 4 === 0
        ? `M${week / 4}`
        : ""
      : `W${week}`,
  };
});

// Format currency for axis / tooltip
const fmtCurrency = (v: number) => {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-black/80 border border-white/10 rounded-lg px-3 py-2 text-xs">
      <p className="text-white/50 font-semibold">Week {d.week}</p>
      <p className="text-white font-bold text-sm">{fmtCurrency(d.revenue)}</p>
      <p className="text-white/40">{Math.min(d.week * CLIENTS_PER_1000, Math.ceil(GOAL / PRICE))} clients</p>
    </div>
  );
};

const Slide8 = () => {
  const weeksLabel = useMonthlLabels
    ? `~${Math.ceil(weeksToGoal / 4)} months`
    : `${weeksToGoal} weeks`;

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
      {/* Decorative */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-[hsl(145,60%,50%)] opacity-[0.1] blur-[100px] pointer-events-none" />

      {/* Left sidebar — coach */}
      <div className="w-[28%] flex flex-col items-center pt-8 md:pt-10 pb-6 px-4 relative border-r border-white/10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-[3px] border-[hsl(45,100%,55%)] shadow-lg shadow-black/20">
            <img src={headshot} alt="Coach Bryan" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1 right-0 w-6 h-6 md:w-7 md:h-7 rounded-lg overflow-hidden shadow-lg shadow-black/30">
            <img src={gtFavicon} alt="Growth Tools" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-white font-bold text-sm md:text-base mt-4">
          Coach Bryan
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <GrowthToolsLogo className="text-[8px] md:text-[9px] mt-1 text-white/50" />
        </motion.div>

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
      <div className="w-[72%] flex flex-col px-6 md:px-10 py-6 md:py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-1"
        >
          <span className="text-white/30 text-sm font-bold uppercase tracking-widest">
            Nicole's Revenue Roadmap
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
            You said{" "}
            <span className="text-[hsl(45,100%,55%)]">
              {CLIENTS_PER_1000} client{CLIENTS_PER_1000 !== 1 ? "s" : ""}
            </span>{" "}
            from every 1,000 people.
          </h2>
          <p className="text-white/50 text-xs md:text-sm mt-1 max-w-xl">
            The BOPA cadence is simple: each week you give one resource to one
            audience owner. That puts you in front of ~1,000 people. You said
            you'd close at least {CLIENTS_PER_1000}. Here's what that compounds
            to.
          </p>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex-1 min-h-0 rounded-xl border border-white/10 bg-white/[0.03] p-3"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="hsl(145,50%,45%)"
                    stopOpacity={0.5}
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(145,50%,45%)"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval={useMonthlLabels ? 3 : 0}
              />
              <YAxis
                tickFormatter={fmtCurrency}
                tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} defaultIndex={goalWeekIndex} trigger="click" />
              <ReferenceLine
                y={GOAL}
                stroke="hsl(45,100%,55%)"
                strokeDasharray="6 4"
                strokeWidth={2}
                label={{
                  value: `🎯 ${fmtCurrency(GOAL)} Goal`,
                  position: "right",
                  fill: "hsl(45,100%,55%)",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(145,50%,45%)"
                strokeWidth={3}
                fill="url(#revenueGrad)"
                animationDuration={1500}
                animationBegin={700}
              />
              <ReferenceDot
                x={chartData[goalWeekIndex]?.label}
                y={GOAL}
                r={6}
                fill="hsl(45,100%,55%)"
                stroke="white"
                strokeWidth={2}
                label={{
                  value: `Week ${weeksToGoal}: ${fmtCurrency(GOAL)}`,
                  position: "top",
                  fill: "hsl(45,100%,55%)",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-4 flex items-center gap-3 bg-[hsl(45,100%,55%)]/[0.08] border border-[hsl(45,100%,55%)]/20 rounded-xl px-4 py-2 relative z-10"
        >
          <TrendingUp className="w-5 h-5 text-[hsl(45,100%,55%)] shrink-0" />
          <p className="text-white/70 text-xs md:text-sm leading-relaxed">
            At just{" "}
            <span className="text-[hsl(45,100%,55%)] font-bold">
              {CLIENTS_PER_1000} client{CLIENTS_PER_1000 !== 1 ? "s" : ""} per
              1,000 people
            </span>
            , you hit your
            <span className="text-[hsl(45,100%,55%)] font-bold">
              {" "}
              {fmtCurrency(GOAL)} goal in {weeksLabel}
            </span>
            . The only question is: where do those 1,000 people come from?{" "}
            <span className="text-white font-bold">
              We already have an answer for you.
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Slide8;
