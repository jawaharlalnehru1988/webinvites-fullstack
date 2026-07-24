import { useEffect, useRef, useState } from 'react';
import * as images from './templateImages';

export function HeroAnimation() {
  const stageRef = useRef<HTMLDivElement>(null);
  const zoomWrapRef = useRef<HTMLDivElement>(null);
  const doorPerspectiveRef = useRef<HTMLDivElement>(null);
  const panelLeftRef = useRef<HTMLDivElement>(null);
  const panelRightRef = useRef<HTMLDivElement>(null);
  const lightCrackRef = useRef<HTMLDivElement>(null);
  const frameTopRef = useRef<HTMLDivElement>(null);
  const frameBottomRef = useRef<HTMLDivElement>(null);
  const frameLeftRef = useRef<HTMLDivElement>(null);
  const frameRightRef = useRef<HTMLDivElement>(null);
  const imgEndRef = useRef<HTMLImageElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    const IMG_W = 2200, IMG_H = 1368;
    const DOOR = { x0: 0.443, x1: 0.553, y0: 0.596, y1: 0.788 };
    const ZOOM_SCALE = 6.4;
    const DOOR_ANGLE = 63;

    document.documentElement.style.setProperty('--zoom-scale', ZOOM_SCALE.toString());
    document.documentElement.style.setProperty('--door-angle', DOOR_ANGLE + 'deg');

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setIsReduced(true);
    }

    // Petals generation
    const petalCount = 22;
    const petalColors = ['#e8879e', '#e0637f', '#f2a7b8', '#c94a68'];
    const petalsHtml: string[] = [];
    for (let i = 0; i < petalCount; i++) {
      const size = (14 + Math.random() * 20).toFixed(1);
      const dur = (7 + Math.random() * 7).toFixed(2);
      const delay = (-Math.random() * parseFloat(dur)).toFixed(2);
      const xpos = (Math.random() * 100).toFixed(1);
      const sway = (30 + Math.random() * 70) * (Math.random() < 0.5 ? -1 : 1);
      const rot = (180 + Math.random() * 360) * (Math.random() < 0.5 ? -1 : 1);
      const op = (0.55 + Math.random() * 0.4).toFixed(2);
      const color = petalColors[i % petalColors.length];
      
      petalsHtml.push(`<div class="petal" style="--s: ${size}px; --dur: ${dur}s; --delay: ${delay}s; --x: ${xpos}%; --sway: ${sway.toFixed(0)}px; --rot: ${rot.toFixed(0)}deg; --op: ${op}"><svg viewBox="0 0 32 32"><path d="M16 3 C25 10 26 21 16 29 C6 21 7 10 16 3 Z" fill="${color}"/></svg></div>`);
    }
    
    if (petalsRef.current) {
      petalsRef.current.innerHTML = petalsHtml.join('');
    }

    function computeLayout() {
      const vw = window.innerWidth, vh = window.innerHeight;
      const scale = Math.max(vw / IMG_W, vh / IMG_H);
      const rw = IMG_W * scale, rh = IMG_H * scale;
      const ox = (vw - rw) / 2, oy = (vh - rh) / 2;
      const doorLeft = ox + DOOR.x0 * IMG_W * scale;
      const doorRight = ox + DOOR.x1 * IMG_W * scale;
      const doorTop = oy + DOOR.y0 * IMG_H * scale;
      const doorBottom = oy + DOOR.y1 * IMG_H * scale;
      return { vw, vh, scale, rw, rh, ox, oy, doorLeft, doorRight, doorTop, doorBottom };
    }

    function setFrag(el: HTMLElement, fragLeft: number, fragTop: number, fragW: number, fragH: number, ox: number, oy: number, rw: number, rh: number) {
      el.style.left = fragLeft + 'px';
      el.style.top = fragTop + 'px';
      el.style.width = Math.max(0, fragW) + 'px';
      el.style.height = Math.max(0, fragH) + 'px';
      const img = el.querySelector('img');
      if (img) {
        img.style.left = (ox - fragLeft) + 'px';
        img.style.top = (oy - fragTop) + 'px';
        img.style.width = rw + 'px';
        img.style.height = rh + 'px';
      }
    }

    function setFragImgOnly(holderEl: HTMLElement, fragLeft: number, fragTop: number, ox: number, oy: number, rw: number, rh: number) {
      const img = holderEl.querySelector('img');
      if (img) {
        img.style.position = 'absolute';
        img.style.left = (ox - fragLeft) + 'px';
        img.style.top = (oy - fragTop) + 'px';
        img.style.width = rw + 'px';
        img.style.height = rh + 'px';
      }
    }

    function applyLayout() {
      if (!frameTopRef.current || !frameBottomRef.current || !frameLeftRef.current || !frameRightRef.current || 
          !doorPerspectiveRef.current || !panelLeftRef.current || !panelRightRef.current || !lightCrackRef.current || 
          !imgEndRef.current || !zoomWrapRef.current) return;

      const L = computeLayout();

      setFrag(frameTopRef.current, 0, 0, L.vw, L.doorTop, L.ox, L.oy, L.rw, L.rh);
      setFrag(frameBottomRef.current, 0, L.doorBottom, L.vw, L.vh - L.doorBottom, L.ox, L.oy, L.rw, L.rh);
      setFrag(frameLeftRef.current, 0, L.doorTop, L.doorLeft, L.doorBottom - L.doorTop, L.ox, L.oy, L.rw, L.rh);
      setFrag(frameRightRef.current, L.doorRight, L.doorTop, L.vw - L.doorRight, L.doorBottom - L.doorTop, L.ox, L.oy, L.rw, L.rh);

      const dpLeft = L.doorLeft, dpTop = L.doorTop;
      const dpW = L.doorRight - L.doorLeft, dpH = L.doorBottom - L.doorTop;
      
      doorPerspectiveRef.current.style.left = dpLeft + 'px';
      doorPerspectiveRef.current.style.top = dpTop + 'px';
      doorPerspectiveRef.current.style.width = dpW + 'px';
      doorPerspectiveRef.current.style.height = dpH + 'px';
      doorPerspectiveRef.current.style.perspective = Math.max(dpW, dpH) * 2.1 + 'px';
      doorPerspectiveRef.current.style.perspectiveOrigin = '50% 50%';

      const innerOx = L.ox - dpLeft, innerOy = L.oy - dpTop;
      panelLeftRef.current.style.width = (dpW / 2) + 'px';
      setFragImgOnly(panelLeftRef.current.querySelector('.frag-inner-holder') as HTMLElement, 0, 0, innerOx, innerOy, L.rw, L.rh);

      panelRightRef.current.style.left = (dpW / 2) + 'px';
      panelRightRef.current.style.width = (dpW / 2) + 'px';
      setFragImgOnly(panelRightRef.current.querySelector('.frag-inner-holder') as HTMLElement, dpW / 2, 0, innerOx, innerOy, L.rw, L.rh);

      lightCrackRef.current.style.left = (dpW / 2 - Math.max(5, dpW * 0.018)) + 'px';
      lightCrackRef.current.style.width = Math.max(10, dpW * 0.036) + 'px';

      imgEndRef.current.style.left = L.ox + 'px';
      imgEndRef.current.style.top = L.oy + 'px';
      imgEndRef.current.style.width = L.rw + 'px';
      imgEndRef.current.style.height = L.rh + 'px';

      const cx = (L.doorLeft + L.doorRight) / 2, cy = (L.doorTop + L.doorBottom) / 2;
      zoomWrapRef.current.style.transformOrigin = cx + 'px ' + cy + 'px';
    }

    applyLayout();

    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(applyLayout, 120);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const handleStartSequence = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    const petalDelay = isReduced ? 700 : 3600;
    setTimeout(() => {
      if (petalsRef.current) {
        petalsRef.current.classList.add('active');
      }
    }, petalDelay);
  };

  useEffect(() => {
    if (isPlaying) return;

    const onUserInteraction = () => {
      handleStartSequence();
    };

    // Use wheel and touchmove instead of 'scroll' to avoid false positives on page load
    window.addEventListener('wheel', onUserInteraction, { capture: true, passive: true, once: true });
    window.addEventListener('touchmove', onUserInteraction, { capture: true, passive: true, once: true });

    return () => {
      window.removeEventListener('wheel', onUserInteraction, { capture: true } as any);
      window.removeEventListener('touchmove', onUserInteraction, { capture: true } as any);
    };
  }, [isPlaying, isReduced]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStartSequence();
    }
  };

  return (
    <div 
      className={`stage ${isPlaying ? 'playing' : ''} ${isReduced ? 'reduced' : ''}`} 
      ref={stageRef} 
      role="button" 
      tabIndex={0} 
      aria-label="Open the wedding invitation"
      onClick={handleStartSequence}
      onKeyDown={handleKeyDown}
    >
      <span className="sr-only">Tap, click, or press Enter to open the invitation for Hari weds Rukmini.</span>

      <div className="layer-end" id="layerEnd">
        <img ref={imgEndRef} src={images.imgEnd} alt="Hari and Rukmini together" />
      </div>

      <div className="zoom-wrap" ref={zoomWrapRef}>
        <div className="frag" ref={frameTopRef}><img src={images.frameTop} alt="" /></div>
        <div className="frag" ref={frameBottomRef}><img src={images.frameBottom} alt="" /></div>
        <div className="frag" ref={frameLeftRef}><img src={images.frameLeft} alt="" /></div>
        <div className="frag" ref={frameRightRef}><img src={images.frameRight} alt="" /></div>

        <div className="door-perspective" ref={doorPerspectiveRef}>
          <div className="light-crack" ref={lightCrackRef}></div>
          <div className="door-panel left" ref={panelLeftRef}>
            <div className="frag-inner-holder"><img src={images.panelLeftInner} alt="" /></div>
            <div className="shade"></div>
          </div>
          <div className="door-panel right" ref={panelRightRef}>
            <div className="frag-inner-holder"><img src={images.panelRightInner} alt="" /></div>
            <div className="shade"></div>
          </div>
        </div>
      </div>

      <div className="cover-title" id="coverTitle">
        <h1 className="title-names">Hari<span className="title-weds">weds</span>Rukmini</h1>
        <div className="cover-hint">tap or scroll to open</div>
      </div>

      <div className="final-title" id="finalTitle">
        <h1 className="title-names">Hari<span className="title-weds">weds</span>Rukmini</h1>
      </div>

      <div className="petals" ref={petalsRef}></div>
      <div className="vignette"></div>
      <div className="hero-fade-bottom"></div>
    </div>
  );
}
