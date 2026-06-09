import { useEffect, useState, useRef } from "react";
import { STATS_ITEMS } from "../data";

export default function Stats() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef<boolean>(false);

  useEffect(() => {
    // Standard IntersectionObserver to only animate counters when they enter viewport!
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          animateCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const duration = 1500; // Total duration in ms
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      
      const nextCounts = STATS_ITEMS.map((item) => {
        const progress = frame / totalFrames;
        // Ease out quad formula: progress * (2 - progress)
        const easedProgress = progress * (2 - progress);
        const currentValue = Math.floor(item.value * easedProgress);
        return Math.min(currentValue, item.value);
      });

      setCounts(nextCounts);

      if (frame >= totalFrames) {
        clearInterval(timer);
        // Make sure exact end values are assigned
        setCounts(STATS_ITEMS.map((item) => item.value));
      }
    }, frameRate);
  };

  return (
    <div 
      ref={sectionRef} 
      className="py-16 bg-brand-blue text-white relative overflow-hidden"
    >
      {/* Decorative maritime map lines in background */}
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="white" strokeWidth="2" strokeDasharray="5" />
          <line x1="10%" y1="80%" x2="90%" y2="20%" stroke="white" strokeWidth="2" strokeDasharray="5" />
          <circle cx="50%" cy="50%" r="30%" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold tracking-tight uppercase leading-tight">
            РефЭкспресс в <span className="text-amber-300">цифрах</span>
          </h2>
          <p className="text-xs text-gray-400 mt-2 uppercase tracking-widest font-semibold">
            Показатели надежности B2B-партнёрства
          </p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS_ITEMS.map((item, index) => (
            <div 
              key={index}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-amber-300/20 transition-all duration-300 transform hover:scale-[1.02]"
            >
              {/* Animated value text */}
              <div className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-amber-400 mb-3 leading-none flex items-center justify-center">
                <span>{counts[index]}</span>
                <span className="text-2xl sm:text-3xl md:text-4xl text-white select-none whitespace-pre">
                  {item.suffix}
                </span>
              </div>

              {/* Stat description details */}
              <div className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed max-w-[200px] mx-auto">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
