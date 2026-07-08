import { useEffect, useRef } from 'react';
import * as images from './templateImages';

export function LetterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollOpenRef = useRef<HTMLImageElement>(null);
  const letterTextRef = useRef<HTMLDivElement>(null);
  const isInteractedRef = useRef(false);

  // Expose updateLetter so event handlers can call it
  const updateLetterRef = useRef<() => void>();

  useEffect(() => {
    const REVEAL_MIN = 0.185; 
    const TEXT_START = 0.5, TEXT_END = 0.75;

    function updateLetter() {
      if (!sectionRef.current || !scrollOpenRef.current || !letterTextRef.current) return;

      const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
      let progress = 0;
      if (scrollableDistance > 0) {
        const rect = sectionRef.current.getBoundingClientRect();
        progress = -rect.top / scrollableDistance;
      }
      progress = Math.max(0, Math.min(1, progress));
      
      if (isInteractedRef.current) {
        progress = 1;
      }

      const reveal = REVEAL_MIN + progress * (1 - REVEAL_MIN);
      scrollOpenRef.current.style.clipPath = `inset(0 0 ${((1 - reveal) * 100).toFixed(2)}% 0)`;

      let textT = (progress - TEXT_START) / (TEXT_END - TEXT_START);
      textT = Math.max(0, Math.min(1, textT));
      letterTextRef.current.style.opacity = textT.toString();
    }
    
    updateLetterRef.current = updateLetter;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateLetter();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    window.addEventListener('resize', onScroll);
    updateLetter();

    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true } as any);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleInteractStart = () => {
    isInteractedRef.current = true;
    if (scrollOpenRef.current && letterTextRef.current) {
      scrollOpenRef.current.style.transition = 'clip-path 0.4s ease';
      letterTextRef.current.style.transition = 'opacity 0.4s ease';
    }
    updateLetterRef.current?.();
  };

  const handleInteractEnd = () => {
    isInteractedRef.current = false;
    updateLetterRef.current?.();
    setTimeout(() => {
      if (!isInteractedRef.current && scrollOpenRef.current && letterTextRef.current) {
        scrollOpenRef.current.style.transition = 'none';
        letterTextRef.current.style.transition = 'none';
      }
    }, 400);
  };

  return (
    <section className="letter-section" ref={sectionRef}>
      <div className="letter-pin">
        <div 
          className="scroll-stage" 
          id="scrollStage"
          onMouseEnter={handleInteractStart}
          onMouseLeave={handleInteractEnd}
          onClick={handleInteractStart}
        >
          <img className="scroll-open" ref={scrollOpenRef} src={images.scrollOpen} alt="" />
          <div className="letter-text" ref={letterTextRef}>
            <div className="save-the-date">Save the date</div>
            <div className="letter-date">10 July 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
