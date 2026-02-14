import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const dayLabels = [
  { day: 1, label: "Day 1", desc: "Revenue goals, motivations & target market", slides: "Slides 1–3" },
  { day: 2, label: "Day 2", desc: "Audience channels, offer structure & case study", slides: "Slides 4–7" },
  { day: 3, label: "Day 3", desc: "Revenue projections, partnerships & bonuses", slides: "Slides 8–10" },
];

const Generate = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [answers, setAnswers] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<{ day: number; data: any } | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!answers.trim()) {
      toast({ title: "Please paste the client's answers first", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    setGeneratedData(null);

    try {
      const { data, error } = await supabase.functions.invoke("generate-slides", {
        body: { day: selectedDay, answers: answers.trim() },
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "Generation failed", description: data.error, variant: "destructive" });
      } else {
        setGeneratedData(data);
        toast({ title: "Slides generated!", description: `Day ${selectedDay} content is ready.` });
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      toast({ title: "Something went wrong", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(220,15%,12%)] flex flex-col items-center px-4 py-10 md:py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-black text-white">
          Generate <span className="text-[hsl(45,100%,55%)]">Custom Slides</span>
        </h1>
        <p className="text-white/40 text-sm mt-2">
          Paste your client's assignment answers and generate personalized coaching slides.
        </p>
      </motion.div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Day Selector */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <label className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">
            Select Day
          </label>
          <div className="grid grid-cols-3 gap-3">
            {dayLabels.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`relative rounded-xl border-2 px-4 py-4 text-left transition-all duration-200 ${
                  selectedDay === d.day
                    ? "border-[hsl(45,100%,55%)] bg-[hsl(45,100%,55%)]/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <p className={`text-lg font-black ${selectedDay === d.day ? "text-[hsl(45,100%,55%)]" : "text-white/70"}`}>
                  {d.label}
                </p>
                <p className="text-white/40 text-[10px] mt-1 leading-snug">{d.desc}</p>
                <p className="text-white/25 text-[9px] mt-1 font-semibold">{d.slides}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Textarea */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 block">
            Client's Answers
          </label>
          <textarea
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
            placeholder={`Paste the client's Day ${selectedDay} assignment answers here...`}
            rows={12}
            className="w-full rounded-xl border-2 border-white/10 bg-white/[0.04] text-white placeholder-white/20 px-5 py-4 text-sm leading-relaxed focus:outline-none focus:border-[hsl(45,100%,55%)]/50 focus:bg-white/[0.06] transition-all resize-none"
          />
        </motion.div>

        {/* Generate Button */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !answers.trim()}
            className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[hsl(145,60%,40%)] to-[hsl(155,55%,30%)] hover:from-[hsl(145,60%,45%)] hover:to-[hsl(155,55%,35%)] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-base py-4 px-6 transition-all duration-200 shadow-lg shadow-[hsl(145,60%,40%)]/20"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Day {selectedDay} Slides...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Day {selectedDay} Slides
              </>
            )}
          </button>
        </motion.div>

        {/* Results */}
        {generatedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border-2 border-[hsl(145,60%,40%)]/30 bg-[hsl(145,60%,40%)]/[0.05] p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[hsl(145,60%,40%)]/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[hsl(145,60%,40%)]" />
              </div>
              <h3 className="text-white font-bold text-lg">Day {generatedData.day} — Generated</h3>
            </div>

            <div className="bg-black/30 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-white/70 text-xs leading-relaxed whitespace-pre-wrap font-mono">
                {JSON.stringify(generatedData.data, null, 2)}
              </pre>
            </div>

            <p className="text-white/30 text-xs mt-3 flex items-center gap-1">
              <ChevronRight className="w-3 h-3" />
              This data will be used to render the personalized slides. Slide viewer coming next.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generate;
