import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";
import Slide3 from "@/components/Slide3";
import Slide4 from "@/components/Slide4";
import Slide5 from "@/components/Slide5";

const slides: Record<number, React.ComponentType> = {
  1: Slide1,
  2: Slide2,
  3: Slide3,
  4: Slide4,
  5: Slide5,
};

const days = [
  { label: "Day 1", slides: [1, 2] },
  { label: "Day 2", slides: [3, 4, 5] },
];

const Index = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const SlideComponent = slides[activeSlide];

  return (
    <div className="min-h-screen bg-[hsl(220,15%,18%)] flex flex-col items-center justify-center p-4 md:p-8 gap-6">
      {/* Slide switcher */}
      <div className="flex items-center gap-4">
        {days.map((day, dayIdx) => (
          <div key={day.label} className="flex items-center gap-4">
            {dayIdx > 0 && <div className="w-px h-5 bg-white/10" />}
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest mr-1">{day.label}</span>
            <div className="w-px h-5 bg-white/10" />
            {day.slides.map((num) => (
              <button
                key={num}
                onClick={() => setActiveSlide(num)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  activeSlide === num
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/40 hover:text-white/60"
                }`}
              >
                Slide {num}
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
          <SlideComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
