import { useEffect, useRef } from 'react';
import * as images from './templateImages';

export function CardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function clamp(v: number, a: number, b: number) {
      return Math.max(a, Math.min(b, v));
    }

    function stackTransform(depth: number) {
      depth = Math.max(0, depth);
      const ty = depth * 16;
      const tx = depth * 12;
      const rot = depth * 5;
      const scale = 1 - depth * 0.045;
      return { transform: `translate(${tx}px,${ty}px) rotate(${rot}deg) scale(${scale})`, opacity: 1 };
    }

    function dismissTransform(t: number) {
      const te = t * t; // ease-in: accelerate away
      const ty = te * -130;
      const tx = te * -14;
      const rot = te * -22;
      const op = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
      return { transform: `translate(${tx}%,${ty}%) rotate(${rot}deg)`, opacity: op };
    }

    function updateCards() {
      if (!sectionRef.current || !card0Ref.current || !card1Ref.current || !card2Ref.current) return;
      
      const cards = [card0Ref.current, card1Ref.current, card2Ref.current];
      const N = cards.length;
      const windows = N - 1;

      const scrollableDistance = sectionRef.current.offsetHeight - window.innerHeight;
      let progress = 0;
      if (scrollableDistance > 0) {
        const rect = sectionRef.current.getBoundingClientRect();
        progress = -rect.top / scrollableDistance;
      }
      progress = clamp(progress, 0, 1);

      const raw = progress * windows;
      let currentWindow = clamp(Math.floor(raw), 0, windows - 1);
      let localT = raw - currentWindow;
      
      if (progress >= 1) { currentWindow = windows - 1; localT = 1; }
      if (progress <= 0) { currentWindow = 0; localT = 0; }

      const depthEase = 1 - (1 - localT) * (1 - localT); // ease-out: settle into place

      for (let c = 0; c < N; c++) {
        const el = cards[c];
        let state;
        if (c < currentWindow) {
          state = dismissTransform(1);
        } else if (c === currentWindow) {
          state = dismissTransform(localT);
        } else {
          const depth = (c - currentWindow) - depthEase;
          state = stackTransform(depth);
        }
        el.style.transform = state.transform;
        el.style.opacity = state.opacity.toString();
      }
    }

    let ticking2 = false;
    const onCardsScroll = () => {
      if (!ticking2) {
        requestAnimationFrame(() => {
          updateCards();
          ticking2 = false;
        });
        ticking2 = true;
      }
    };

    window.addEventListener('scroll', onCardsScroll, { capture: true, passive: true });
    window.addEventListener('resize', onCardsScroll);
    updateCards();

    return () => {
      window.removeEventListener('scroll', onCardsScroll, { capture: true } as any);
      window.removeEventListener('resize', onCardsScroll);
    };
  }, []);

  return (
    <section className="cards-section" ref={sectionRef}>
      <div className="cards-pin">
        <div className="card-stack" id="cardStack">
          <div className="card pink" ref={card0Ref} data-z="3" style={{ zIndex: 3 }}>
            <img src={images.card0} alt="" />
            <div className="card-content"><div className="card-title">Haldi</div></div>
          </div>
          <div className="card gold" ref={card1Ref} data-z="2" style={{ zIndex: 2 }}>
            <img src={images.card1} alt="" />
            <div className="card-content"><div className="card-title">Wedding</div></div>
          </div>
          <div className="card purple" ref={card2Ref} data-z="1" style={{ zIndex: 1 }}>
            <img src={images.card2} alt="" />
            <div className="card-content"><div className="card-title">Reception</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}
