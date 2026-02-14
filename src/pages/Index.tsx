import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Slide1 from "@/components/Slide1";
import Slide2 from "@/components/Slide2";
import Slide3 from "@/components/Slide3";
import Slide4 from "@/components/Slide4";

type SlideEntry = {
  id: number;
  label: string;
  component: React.FC;
};

type DayGroup = {
  day: string;
  slides: SlideEntry[];
};

const days: DayGroup[] = [
  {
    day: "Day 1",
    slides: [
      { id: 1, label: "Slide 1", component: Slide1 },
      { id: 2, label: "Slide 2", component: Slide2 },
    ],
  },
  {
    day: "Day 2",
    slides: [
      { id: 3, label: "Slide 1", component: Slide3 },
      { id: 4, label: "Slide 2", component: Slide4 },
    ],
  },
  { day: "Day 3", slides: [] },
  { day: "Day 4", slides: [] },
  { day: "Day 5", slides: [] },
  { day: "Day 6", slides: [] },
  { day: "Day 7", slides: [] },
];

const Index = () => {
  const [activeDay, setActiveDay] = useState("Day 1");
  const [activeSlide, setActiveSlide] = useState(1);

  const currentDay = days.find((d) => d.day === activeDay);
  const ActiveComponent = currentDay?.slides.find((s) => s.id === activeSlide)?.component;

  const handleDayClick = (day: string) => {
    setActiveDay(day);
    const group = days.find((d) => d.day === day);
    if (group && group.slides.length > 0) {
      setActiveSlide(group.slides[0].id);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(220,15%,18%)] flex flex-col items-center justify-center p-4 md:p-8 gap-6">
      {/* Navigation */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        {days.map((group) => {
          const isActiveDay = activeDay === group.day;
          return (
            <div key={group.day} className="flex items-center gap-1.5">
              <button
                onClick={() => handleDayClick(group.day)}
                className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                  isActiveDay
                    ? "bg-[hsl(145,60%,40%)]/30 text-[hsl(145,60%,65%)] border border-[hsl(145,60%,50%)]/30"
                    : "bg-white/5 text-white/30 hover:text-white/50 border border-transparent"
                }`}
              >
                {group.day}
              </button>

              {/* Expanded slide buttons */}
              <AnimatePresence>
                {isActiveDay && group.slides.length > 0 && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-1 overflow-hidden"
                  >
                    {group.slides.map((slide) => (
                      <button
                        key={slide.id}
                        onClick={() => setActiveSlide(slide.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-colors whitespace-nowrap ${
                          activeSlide === slide.id
                            ? "bg-white/20 text-white"
                            : "bg-white/5 text-white/40 hover:text-white/60"
                        }`}
                      >
                        {slide.label}
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
        {ActiveComponent ? (
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
        ) : (
          <motion.div
            key={activeDay + "-empty"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-5xl aspect-video rounded-2xl shadow-2xl overflow-hidden relative flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0bbf62 0%, hsl(155,55%,28%) 40%, hsl(160,50%,18%) 100%)",
            }}
          >
            <div className="text-center">
              <p className="text-white/40 text-lg font-semibold uppercase tracking-widest">{activeDay}</p>
              <p className="text-white/25 text-sm mt-2">No slides yet</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
