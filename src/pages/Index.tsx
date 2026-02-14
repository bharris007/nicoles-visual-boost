import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";
import Slide7 from "@/components/Slide7";
import Slide3 from "@/components/Slide3";
import Slide4 from "@/components/Slide4";
import Slide5 from "@/components/Slide5";
import Slide6 from "@/components/Slide6";
import Slide8 from "@/components/Slide8";
import Slide9 from "@/components/Slide9";

const slides: Record<number, React.ComponentType> = {
  1: Slide1,
  2: Slide2,
  3: Slide7,
  4: Slide3,
  5: Slide4,
  6: Slide5,
  7: Slide6,
  8: Slide8,
  9: Slide9,
};

const days = [
  { label: "Day 1", slides: [1, 2, 3] },
  { label: "Day 2", slides: [4, 5, 6, 7] },
  { label: "Day 3", slides: [8, 9] },
];

const Index = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const totalSlides = Object.keys(slides).length;

  // Which day is currently expanded — derived from activeSlide initially
  const activeDayIdx = days.findIndex((d) => d.slides.includes(activeSlide));
  const [expandedDay, setExpandedDay] = useState(activeDayIdx);

  // Keep expanded day in sync when navigating via keyboard
  useEffect(() => {
    const idx = days.findIndex((d) => d.slides.includes(activeSlide));
    if (idx !== -1) setExpandedDay(idx);
  }, [activeSlide]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") setActiveSlide(s => Math.min(s + 1, totalSlides));
    if (e.key === "ArrowLeft") setActiveSlide(s => Math.max(s - 1, 1));
  }, [totalSlides]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const SlideComponent = slides[activeSlide];

  return (
    <div className="min-h-screen bg-[hsl(220,15%,18%)] flex flex-col items-center justify-center p-4 md:p-8 gap-6">
      {/* Slide switcher */}
      <div className="flex items-center gap-2">
        {days.map((day, dayIdx) => {
          const isExpanded = expandedDay === dayIdx;
          const hasActive = day.slides.includes(activeSlide);
          return (
            <div key={day.label} className="flex items-center gap-2">
              {dayIdx > 0 && <div className="w-px h-5 bg-white/10" />}
              <button
                onClick={() => setExpandedDay(isExpanded ? -1 : dayIdx)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  hasActive ? "text-white/70" : "text-white/30 hover:text-white/50"
                }`}
              >
                {day.label}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1 overflow-hidden"
                  >
                    {day.slides.map((num) => (
                      <button
                        key={num}
                        onClick={() => setActiveSlide(num)}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap ${
                          activeSlide === num
                            ? "bg-white/20 text-white"
                            : "bg-white/5 text-white/40 hover:text-white/60"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="w-full flex items-center justify-center"
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
