import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
  start = 'top 85%',
  once = true,
  className = '',
  ...props
}) {
  const elRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !elRef.current) return;

    const ctx = gsap.context(() => {
      let fromVars = { opacity: 0 };
      let toVars = {
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elRef.current,
          start: start,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      };

      switch (animation) {
        case 'fade-up':
          fromVars.y = 40;
          toVars.y = 0;
          break;
        case 'fade-down':
          fromVars.y = -40;
          toVars.y = 0;
          break;
        case 'slide-left':
          fromVars.x = 50;
          toVars.x = 0;
          break;
        case 'slide-right':
          fromVars.x = -50;
          toVars.x = 0;
          break;
        case 'scale-in':
          fromVars.scale = 0.9;
          fromVars.opacity = 0;
          toVars.scale = 1;
          toVars.opacity = 1;
          break;
        case 'stagger':
          const childrenEls = elRef.current.children;
          if (childrenEls && childrenEls.length > 0) {
            gsap.fromTo(
              childrenEls,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: duration,
                stagger: stagger,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: elRef.current,
                  start: start,
                  toggleActions: once ? 'play none none none' : 'play reverse play reverse',
                },
              }
            );
            return;
          }
          break;
        default:
          fromVars.y = 30;
          toVars.y = 0;
      }

      gsap.fromTo(elRef.current, fromVars, toVars);
    }, elRef);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger, start, once]);

  return (
    <div ref={elRef} className={className} {...props}>
      {children}
    </div>
  );
}
