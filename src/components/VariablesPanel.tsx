import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Loader2, Sparkles, ChevronDown } from "lucide-react";

interface FieldDef {
  key: string;
  label: string;
  type: "text" | "textarea";
}

const DAY_FIELDS: Record<number, FieldDef[]> = {
  1: [
    { key: "clientName", label: "Client Name", type: "text" },
    { key: "revenueGoal", label: "Revenue Goal", type: "text" },
    { key: "revenueTimeframe", label: "Timeframe", type: "text" },
    { key: "niche", label: "Niche", type: "text" },
    { key: "targetMarket", label: "Target Market", type: "text" },
    { key: "motivatingForce", label: "Motivating Force", type: "textarea" },
  ],
  2: [
    { key: "clientName", label: "Client Name", type: "text" },
    { key: "niche", label: "Niche", type: "text" },
    { key: "crisis", label: "Crisis", type: "text" },
    { key: "industry", label: "Industry", type: "text" },
    { key: "targetAudience", label: "Target Audience", type: "textarea" },
  ],
  3: [
    { key: "clientName", label: "Client Name", type: "text" },
    { key: "niche", label: "Niche", type: "text" },
    { key: "revenueGoal", label: "Revenue Goal", type: "text" },
  ],
};

interface VariablesPanelProps {
  day: number;
  data: Record<string, any>;
  isRegenerating: boolean;
  onRegenerate: (editedVars: Record<string, string>) => void;
}

const VariablesPanel = ({ day, data, isRegenerating, onRegenerate }: VariablesPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const fields = DAY_FIELDS[day] || [];

  // Initialize editable values from data
  const [editedVars, setEditedVars] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of fields) {
      init[f.key] = String(data[f.key] ?? "");
    }
    return init;
  });

  const handleChange = (key: string, value: string) => {
    setEditedVars((prev) => ({ ...prev, [key]: value }));
  };

  const hasChanges = fields.some((f) => editedVars[f.key] !== String(data[f.key] ?? ""));

  return (
    <div className="w-full max-w-5xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/40 hover:text-white/70 text-xs font-semibold transition-colors"
      >
        <Settings2 className="w-3.5 h-3.5" />
        See Variables
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fields.map((f) => (
                  <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
                    <label className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-1 block">
                      {f.label}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        value={editedVars[f.key]}
                        onChange={(e) => handleChange(f.key, e.target.value)}
                        rows={2}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] text-white text-sm px-3 py-2 focus:outline-none focus:border-[hsl(45,100%,55%)]/50 transition-colors resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={editedVars[f.key]}
                        onChange={(e) => handleChange(f.key, e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/[0.04] text-white text-sm px-3 py-2 focus:outline-none focus:border-[hsl(45,100%,55%)]/50 transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => onRegenerate(editedVars)}
                  disabled={isRegenerating}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[hsl(145,60%,40%)] to-[hsl(155,55%,30%)] hover:from-[hsl(145,60%,45%)] hover:to-[hsl(155,55%,35%)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs py-2.5 px-5 transition-all duration-200 shadow-lg shadow-[hsl(145,60%,40%)]/20"
                >
                  {isRegenerating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Regenerate with Edits
                    </>
                  )}
                </button>
                {hasChanges && (
                  <span className="text-[hsl(45,100%,55%)] text-[10px] font-semibold">
                    • Unsaved changes
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VariablesPanel;
