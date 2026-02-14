import { motion } from "framer-motion";
import gtFavicon from "@/assets/gt-favicon.png";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CLIENTS_PER_1000: number = 2;
const PRICE: number = 10000;
const GOAL: number = 120000;

// Derive timeline
const revenuePerWeek = CLIENTS_PER_1000 * PRICE;
const weeksToGoal = Math.ceil(GOAL / revenuePerWeek);

// Build data points — show a few weeks past the goal for visual breathing room
const totalPoints = Math.max(weeksToGoal + 2, 6);

// Decide label strategy: if many weeks, show monthly labels
const useMonthlLabels = totalPoints > 12;

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
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[hsl(45,100%,55%)] opacity-[0.08] blur-[80px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(145,50%,45%)] via-[hsl(45,100%,55%)] to-[hsl(25,100%,55%)]" />

      {/* Header */}
      <div className="px-8 pt-5 pb-1 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-2"
        >
          <div className="w-7 h-7 rounded-md overflow-hidden shadow-lg shadow-black/30">
            <img
              src={gtFavicon}
              alt="Growth Tools"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white/30 text-sm font-bold uppercase tracking-widest">
            Your Revenue Roadmap
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            You said{" "}
            <span className="text-[hsl(45,100%,55%)]">
              {CLIENTS_PER_1000} client{CLIENTS_PER_1000 !== 1 ? "s" : ""}
            </span>{" "}
            from every 1,000 people.
          </h2>
          <p className="text-white/50 text-sm mt-1 max-w-2xl">
            The BOPA cadence is simple: each week you give one resource to one
            audience owner. That puts you in front of ~1,000 people. You said
            you'd close at least {CLIENTS_PER_1000}. Here's what that compounds
            to.
          </p>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="flex-1 px-4 pr-8 pb-2 relative z-10 min-h-0"
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
            <Tooltip content={<CustomTooltip />} />
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
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom callout */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mx-8 mb-4 flex items-center gap-3 bg-[hsl(45,100%,55%)]/[0.08] border border-[hsl(45,100%,55%)]/20 rounded-xl px-5 py-2.5 relative z-10"
      >
        <TrendingUp className="w-6 h-6 text-[hsl(45,100%,55%)] shrink-0" />
        <p className="text-white/70 text-sm md:text-base leading-relaxed">
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
    </motion.div>
  );
};

export default Slide8;
