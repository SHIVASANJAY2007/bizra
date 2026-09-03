import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal({
  children,
  src,
  alt = '',
  className = '',
  imageClassName = '',
  ...props
}) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scale down image inside overflow hidden container while expanding container clip-path
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1.25, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`} {...props}>
      {src ? (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-transform duration-700 will-change-transform ${imageClassName}`}
        />
      ) : (
        <div ref={imgRef} className="w-full h-full will-change-transform">
          {children}
        </div>
      )}
    </div>
  );
}
