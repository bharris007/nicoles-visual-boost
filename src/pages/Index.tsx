import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";

const Index = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  return (
    <div className="min-h-screen bg-[hsl(220,15%,18%)] flex flex-col items-center justify-center p-4 md:p-8 gap-6">
      {/* Slide switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveSlide(1)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            activeSlide === 1
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/40 hover:text-white/60"
          }`}
        >
          Slide 1
        </button>
        <button
          onClick={() => setActiveSlide(2)}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
            activeSlide === 2
              ? "bg-white/20 text-white"
              : "bg-white/5 text-white/40 hover:text-white/60"
          }`}
        >
          Slide 2
        </button>
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
          {activeSlide === 1 ? <Slide1 /> : <Slide2 />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
