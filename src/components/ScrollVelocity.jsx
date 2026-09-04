import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import './ScrollVelocity.css';

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

function wrap(min, max, v) {
  const range = max - min;
  if (range === 0) return min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

function VelocityText({
  children,
  baseVelocity = 100,
  scrollContainerRef,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle
}) {
  const [xPos, setXPos] = useState(0);
  const baseXRef = useRef(0);
  const copyRef = useRef(null);
  const copyWidth = useElementWidth(copyRef);

  const lastScrollYRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const smoothVelocityRef = useRef(0);
  const directionFactorRef = useRef(1);

  // Track page scroll velocity
  useEffect(() => {
    const getScrollY = () => {
      if (scrollContainerRef && scrollContainerRef.current) {
        return scrollContainerRef.current.scrollTop;
      }
      return window.scrollY || window.pageYOffset || 0;
    };

    lastScrollYRef.current = getScrollY();

    const handleScroll = (e) => {
      const currentY = (e && typeof e.scroll === 'number') ? e.scroll : getScrollY();
      const deltaY = currentY - lastScrollYRef.current;
      scrollVelocityRef.current = deltaY * 8; // Scale sensitivity
      lastScrollYRef.current = currentY;
    };

    const target = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    target.addEventListener('scroll', handleScroll, { passive: true });

    let lenisOff;
    if (!scrollContainerRef?.current && window.__lenis) {
      window.__lenis.on('scroll', handleScroll);
      lenisOff = () => window.__lenis?.off('scroll', handleScroll);
    }

    return () => {
      target.removeEventListener('scroll', handleScroll);
      if (lenisOff) lenisOff();
    };
  }, [scrollContainerRef]);

  // Animation Loop
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const updatePosition = (currentTime) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Spring damping physics for scroll velocity
      const targetVel = scrollVelocityRef.current;
      scrollVelocityRef.current *= 0.92; // Decay
      smoothVelocityRef.current += (targetVel - smoothVelocityRef.current) * (1 / (damping * 0.1));

      const velFactor = smoothVelocityRef.current / 200;

      if (velFactor < -0.1) {
        directionFactorRef.current = -1;
      } else if (velFactor > 0.1) {
        directionFactorRef.current = 1;
      }

      let moveBy = directionFactorRef.current * baseVelocity * delta;
      moveBy += directionFactorRef.current * moveBy * Math.abs(velFactor);

      baseXRef.current += moveBy;

      if (copyWidth > 0) {
        const wrappedX = wrap(-copyWidth, 0, baseXRef.current);
        setXPos(wrappedX);
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [baseVelocity, copyWidth, damping]);

  const spans = [];
  for (let i = 0; i < numCopies; i++) {
    spans.push(
      <span className={className} key={i} ref={i === 0 ? copyRef : null}>
        {children}
      </span>
    );
  }

  return (
    <div className={parallaxClassName} style={parallaxStyle}>
      <div
        className={scrollerClassName}
        style={{
          transform: `translate3d(${xPos}px, 0, 0)`,
          ...scrollerStyle
        }}
      >
        {spans}
      </div>
    </div>
  );
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle
}) => {
  return (
    <section className="scroll-velocity-wrapper py-2">
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
