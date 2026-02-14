import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";
import Slide3 from "@/components/Slide3";
import Slide4 from "@/components/Slide4";

const slides = [
  { id: 1, label: "Slide 1", group: "Day 1" },
  { id: 2, label: "Slide 2", group: "Day 1" },
  { id: 3, label: "Slide 1", group: "Day 2" },
  { id: 4, label: "Slide 2", group: "Day 2" },
];

const slideComponents: Record<number, React.FC> = {
  1: Slide1,
  2: Slide2,
  3: Slide3,
  4: Slide4,
};

const groups = ["Day 1", "Day 2"];

const Index = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const ActiveComponent = slideComponents[activeSlide];

  return (
    <div className="min-h-screen bg-[hsl(220,15%,18%)] flex flex-col items-center justify-center p-4 md:p-8 gap-6">
      {/* Slide switcher */}
      <div className="flex items-center gap-3">
        {groups.map((group, gi) => (
          <div key={group} className="flex items-center gap-3">
            {gi > 0 && <div className="w-px h-5 bg-white/10 mx-1" />}
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mr-1">{group}</span>
            <div className="w-px h-5 bg-white/10" />
            {slides
              .filter((s) => s.group === group)
              .map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(slide.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    activeSlide === slide.id
                      ? "bg-white/20 text-white"
                      : "bg-white/5 text-white/40 hover:text-white/60"
                  }`}
                >
                  {slide.label}
                </button>
              ))}
          </div>
        ))}
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
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
