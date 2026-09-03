import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Parallax({
  children,
  speed = 0.2, // Movement multiplier: positive moves up faster, negative moves down
  direction = 'vertical',
  className = '',
  ...props
}) {
  const targetRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !targetRef.current) return;

    const ctx = gsap.context(() => {
      const yOffset = speed * 100;
      const xOffset = speed * 80;

      if (direction === 'vertical') {
        gsap.to(targetRef.current, {
          y: -yOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: targetRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      } else {
        gsap.to(targetRef.current, {
          x: -xOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: targetRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, targetRef);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div ref={targetRef} className={`will-change-transform ${className}`} {...props}>
      {children}
    </div>
  );
}
