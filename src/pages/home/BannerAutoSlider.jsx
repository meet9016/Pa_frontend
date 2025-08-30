import React, { useEffect, useRef, useState, useCallback } from "react";

/** items: [{ banner_id, image }] */
const BannerAutoSlider = ({ items = [], loading = false, intervalMs = 3000 }) => {
  const trackRef = useRef(null);
  const firstItemRef = useRef(null);

  // allow motion even with 1 card
  const n = items.length;
  const base = n === 1 ? [items[0], { ...items[0], _dup: true }] : items;

  // [cloneLast, ...real, cloneFirst] like HeroSlider
  const first = base[0];
  const last = base[base.length - 1];
  const loopSlides = [last, ...base, first];

  const [index, setIndex] = useState(1);   // start at first real
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const timerRef = useRef(null);
  const isTransitioningRef = useRef(false);

  // reset to start when count changes
  useEffect(() => setIndex(1), [n]);

  // measure one-card step (width + gap) using first two children
  const measureStep = useCallback(() => {
    const firstEl = firstItemRef.current;
    const secondEl = firstEl?.nextElementSibling;
    if (!firstEl || !secondEl) return;
    const d = secondEl.getBoundingClientRect().left - firstEl.getBoundingClientRect().left;
    if (d > 0) {
      setStep(d);
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${index * d}px)`;
      }
    }
  }, [index]);

  useEffect(() => {
    measureStep();
    window.addEventListener("resize", measureStep);
    return () => window.removeEventListener("resize", measureStep);
  }, [measureStep, items]);

  // autoplay (always forward)
  useEffect(() => {
    if (loopSlides.length <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!isTransitioningRef.current) {
        setIndex((i) => i + 1);
      }
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [intervalMs, loopSlides.length]);

  // apply transform on index/step changes
  useEffect(() => {
    if (!trackRef.current || !step) return;
    if (animate) trackRef.current.style.transform = `translateX(-${index * step}px)`;
  }, [index, step, animate]);

  // seamless wrap for infinite scroll
  const onTransitionEnd = () => {
    isTransitioningRef.current = true;

    // Forward wrap: when we reach the cloneFirst (last position)
    if (index === loopSlides.length - 1) {
      setAnimate(false);
      const target = 1;

      requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${target * step}px)`;
        }
        setIndex(target);

        requestAnimationFrame(() => {
          setAnimate(true);
          isTransitioningRef.current = false;
        });
      });
    }
    // Backward wrap: when we reach the cloneLast (position 0)
    else if (index === 0) {
      setAnimate(false);
      const target = loopSlides.length - 2;

      requestAnimationFrame(() => {
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${target * step}px)`;
        }
        setIndex(target);

        requestAnimationFrame(() => {
          setAnimate(true);
          isTransitioningRef.current = false;
        });
      });
    } else {
      isTransitioningRef.current = false;
    }
  };

  // skeleton (unchanged)
  if (loading) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-full h-60 rounded-2xl bg-gray-300 animate-pulse" />
        ))}
      </div>
    );
  }
  if (!n) return null;

  return (
    <div className="w-full mt-5">
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className={`flex ${animate ? "transition-transform duration-700 ease-out" : ""} gap-10 will-change-transform`}
          onTransitionEnd={onTransitionEnd}
          style={{ transform: step ? `translateX(-${index * step}px)` : undefined }}
        >
          {loopSlides.map((slide, i) => (
            <div
              key={(slide.banner_id ?? i) + "-" + i}
              // fit exactly 3 cards on md+ (accounts for gap-10)
              className="flex-none w-full sm:basis-[calc(50%-1.25rem)] md:basis-[calc(33.333%-1.666rem)]"
              ref={i === 0 ? firstItemRef : null} // measure step on first+second
            >
              <img
                src={slide.image}
                alt="Banner"
                className="w-full h-auto rounded-2xl object-contain"
                loading={i === 1 ? "eager" : "lazy"}
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerAutoSlider;