import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DynamicSlide1 from "@/components/dynamic/DynamicSlide1";
import DynamicSlide2 from "@/components/dynamic/DynamicSlide2";
import DynamicSlide3 from "@/components/dynamic/DynamicSlide3";
import DynamicSlide4 from "@/components/dynamic/DynamicSlide4";
import DynamicSlide5 from "@/components/dynamic/DynamicSlide5";
import DynamicSlide6 from "@/components/dynamic/DynamicSlide6";
import VariablesPanel from "@/components/VariablesPanel";

const dayLabels = [
  { day: 1, label: "Day 1", desc: "Revenue goals, motivations & target market", slides: "Slides 1–3" },
  { day: 2, label: "Day 2", desc: "Audience channels, offer structure & case study", slides: "Slides 4–7" },
  { day: 3, label: "Day 3", desc: "Revenue projections, partnerships & bonuses", slides: "Slides 8–10" },
];

const Generate = () => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [answers, setAnswers] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<{ day: number; data: any } | null>(null);
  const [activeSlide, setActiveSlide] = useState(1);
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
        setActiveSlide(1);
        toast({ title: "Slides generated!", description: `Day ${selectedDay} slides are ready.` });
      }
    } catch (err: any) {
      console.error("Generation error:", err);
      toast({ title: "Something went wrong", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async (overrides: Record<string, string>) => {
    if (!generatedData) return;
    setIsRegenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-slides", {
        body: { day: generatedData.day, answers: answers.trim(), overrides },
      });

      if (error) throw error;

      if (data?.error) {
        toast({ title: "Regeneration failed", description: data.error, variant: "destructive" });
      } else {
        setGeneratedData(data);
        setActiveSlide(1);
        toast({ title: "Slides regenerated!", description: "Updated with your edits." });
      }
    } catch (err: any) {
      console.error("Regeneration error:", err);
      toast({ title: "Something went wrong", description: err.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsRegenerating(false);
    }
  };

  // Determine how many slides for the generated day
  const slideCount = generatedData?.day === 1 ? 3 : generatedData?.day === 2 ? 4 : 3;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!generatedData) return;
      if (e.key === "ArrowRight") setActiveSlide((s) => Math.min(s + 1, slideCount));
      if (e.key === "ArrowLeft") setActiveSlide((s) => Math.max(s - 1, 1));
    },
    [generatedData, slideCount]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const renderSlide = () => {
    if (!generatedData) return null;
    const d = generatedData.data;

    if (generatedData.day === 1) {
      switch (activeSlide) {
        case 1:
          return <DynamicSlide1 data={d} />;
        case 2:
          return <DynamicSlide2 data={d} />;
        case 3:
          return <DynamicSlide3 data={d} />;
      }
    }

    if (generatedData.day === 2) {
      switch (activeSlide) {
        case 1:
          return <DynamicSlide4 data={d} />;
        case 2:
          return <DynamicSlide5 data={d} />;
        case 3:
          return <DynamicSlide6 data={d} />;
        // Day 2 slide 4 coming soon
      }
    }

    // Day 3 coming soon placeholder
    return (
      <div className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)" }}>
        <div className="text-center">
          <p className="text-white/60 text-lg font-bold">Day {generatedData.day} — Slide {activeSlide}</p>
          <p className="text-white/30 text-sm mt-1">Dynamic slides coming soon</p>
        </div>
      </div>
    );
  };

  // Show slide viewer if we have generated data
  if (generatedData) {
    return (
      <div className="min-h-screen bg-[hsl(220,15%,18%)] flex flex-col items-center justify-center p-4 md:p-8 gap-6">
        {/* Top bar */}
        <div className="flex items-center gap-4 w-full max-w-5xl">
          <button
            onClick={() => setGeneratedData(null)}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Generator
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1 bg-white/[0.06] rounded-lg border border-white/10 px-1 py-0.5">
            {Array.from({ length: slideCount }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setActiveSlide(num)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  activeSlide === num
                    ? "bg-white/20 text-white"
                    : "text-white/40 hover:text-white/60"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="text-white/30 text-xs">
            Day {generatedData.day} • {generatedData.data.clientName}
          </p>
        </div>

        {/* Variables Panel */}
        <VariablesPanel
          day={generatedData.day}
          data={generatedData.data}
          isRegenerating={isRegenerating}
          onRegenerate={handleRegenerate}
        />

        {/* Slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full flex items-center justify-center"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveSlide((s) => Math.max(s - 1, 1))}
            disabled={activeSlide === 1}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-white/30 text-xs font-semibold">
            {activeSlide} / {slideCount}
          </span>
          <button
            onClick={() => setActiveSlide((s) => Math.min(s + 1, slideCount))}
            disabled={activeSlide === slideCount}
            className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Generator form
  return (
    <div className="min-h-screen bg-[hsl(220,15%,12%)] flex flex-col items-center px-4 py-10 md:py-16">
      <div className="w-full max-w-2xl space-y-4">
        {/* Day Selector */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-3 gap-2">
            {dayLabels.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`rounded-lg border-2 px-3 py-2 text-left transition-all duration-200 ${
                  selectedDay === d.day
                    ? "border-[hsl(45,100%,55%)] bg-[hsl(45,100%,55%)]/[0.08]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <p className={`text-sm font-black ${selectedDay === d.day ? "text-[hsl(45,100%,55%)]" : "text-white/70"}`}>{d.label}</p>
                <p className="text-white/25 text-[9px] font-semibold">{d.slides}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Textarea */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2 block">Client's Answers</label>
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
      </div>
    </div>
  );
};

export default Generate;
