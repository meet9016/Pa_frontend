import React, { useEffect, useRef, useState } from "react";

/** slides: [{ slider_id, image, alt? }] */
const HeroSlider = ({ slides = [], loading = false, intervalMs = 4000 }) => {
  // ----- state -----
  const [index, setIndex] = useState(1);        // start at first "real" slide (after left-clone)
  const [animate, setAnimate] = useState(true); // control CSS transition for seamless wrap
  const timerRef = useRef(null);
  const pausedRef = useRef(false);
  const touchStartX = useRef(null);

  // keep motion even if only 1 slide (duplicate for animation)
  const originalLength = slides.length;
  const baseSlides = originalLength === 1 ? [slides[0], { ...slides[0], _dup: true }] : slides;
  const first = baseSlides[0];
  const last = baseSlides[baseSlides.length - 1];
  const loopSlides = [last, ...baseSlides, first]; // [cloneLast, ...real, cloneFirst]
  const loopLen = loopSlides.length;
  const showControls = originalLength > 1;

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // autoplay (always forward)
  useEffect(() => {
    if (loading || reduceMotion || loopLen <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => i + 1);
      }
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [loading, intervalMs, reduceMotion, loopLen]);

  // when we pass the last (cloneFirst), jump to the first real (index 1) without reverse motion
  const handleTransitionEnd = () => {
    if (index === loopLen - 1) {
      // we are on cloneFirst -> jump to first real
      setAnimate(false);
      setIndex(1);
      // re-enable animation on next paint
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }
  };

  // navigation helpers (only forward allowed)
  const next = () => setIndex((i) => i + 1);
  const prev = () => {}; // disabled to prevent reverse

  if (loading) {
    return <div className="w-full rounded-[22px] bg-gray-300 animate-pulse" />;
  }
  if (!originalLength) return null;

  // current real dot index (0..originalLength-1)
  const currentDot = (index - 1 + originalLength) % originalLength;

  return (
    <div className="w-full" aria-roledescription="carousel" aria-label="Home hero">
      <div
        className="relative bg-white p-3 sm:p-4 rounded-[22px] shadow-sm"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - (touchStartX.current ?? 0);
          touchStartX.current = null;
          if (dx < -30) next();        // swipe left -> forward
          // swipe right ignored (no reverse)
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") next(); // only forward
          // ArrowLeft ignored
        }}
      >
        <div className="overflow-hidden rounded-[18px]">
          <div
            className={`flex ${animate ? "transition-transform duration-700 ease-out" : ""}`}
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopSlides.map((s, i) => (
              <div key={(s.slider_id ?? i) + (s._dup ? "-dup" : "")} className="w-full shrink-0">
                {/* No fixed height: image decides height, fits without crop/stretch */}
                <div className="w-full grid place-items-center bg-white">
                  <img
                    src={s.image}
                    alt={s.alt || `Slide ${i + 1}`}
                    draggable="false"
                    className="max-w-full h-auto object-contain block"
                    {...(i === 1 ? { loading: "eager" } : { loading: "lazy" })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {showControls && (
          <>
            {/* Dots (non-clickable to avoid reverse jumps) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {Array.from({ length: originalLength }).map((_, d) => (
                <span
                  key={d}
                  className={`h-2.5 rounded-full transition-all ${
                    d === currentDot ? "w-6 bg-white shadow" : "w-2.5 bg-white/60"
                  }`}
                  aria-label={`Slide ${d + 1}`}
                  aria-current={d === currentDot}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;