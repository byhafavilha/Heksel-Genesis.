import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   COSMOS CANVAS  —  2D Canvas with simulated 3D depth
   Dual-theme: dark mode = deep space purple/cyan on black
               light mode = white & cyan nebula with dark stars

   • Background – auto-filled in light mode; transparent in dark
   • Grid       – subtle perspective grid (both modes)
   • Nebulae    – soft radial gradient clouds
   • Stars      – 3 parallax layers (white on dark / navy on light)
   • Comets     – glowing nucleus + gradient tail
   • Satellites – Nintendo-style cute sats
───────────────────────────────────────────────────────────── */

const TAU = Math.PI * 2;

interface Star {
  x: number; y: number; z: number;
  size: number; speed: number; twinkle: number; phase: number;
}

interface Satellite {
  wx: number; wy: number; wz: number;
  vx: number; vy: number;
  rot: number; rotSpeed: number;
  floatOffset: number;
  bodyColor: string; panelColor: string; antColor: string; glowColor: string;
  baseScale: number;
}

interface Comet {
  progress: number; speed: number;
  sx: number; sy: number; ex: number; ey: number;
  depth: number;
  nucleusColor: string; tailColor: string;
  tailLength: number; glowRadius: number;
  wobble: number; wobbleSpeed: number;
}

// ── Dark mode palette ──────────────────────────────────────
const DARK_SATS = [
  { body: '#00f0ff', panel: '#004455', ant: '#80f8ff', glow: 'rgba(0,240,255,0.6)' },
  { body: '#b45eff', panel: '#2d0f4a', ant: '#d8a0ff', glow: 'rgba(180,94,255,0.6)' },
  { body: '#c9a84c', panel: '#3a2800', ant: '#f5d97f', glow: 'rgba(201,168,76,0.5)' },
  { body: '#00ffc3', panel: '#003322', ant: '#80ffe0', glow: 'rgba(0,255,195,0.5)' },
  { body: '#ff6ec7', panel: '#4a001a', ant: '#ffa8e0', glow: 'rgba(255,110,199,0.5)' },
];

// ── Light mode palette (cyan / navy / sky) ─────────────────
const LIGHT_SATS = [
  { body: '#00b4d8', panel: '#caf0f8', ant: '#0077b6', glow: 'rgba(0,180,216,0.45)' },
  { body: '#0096c7', panel: '#ade8f4', ant: '#023e8a', glow: 'rgba(0,150,199,0.4)'  },
  { body: '#48cae4', panel: '#90e0ef', ant: '#0077b6', glow: 'rgba(72,202,228,0.4)' },
  { body: '#00b4d8', panel: '#caf0f8', ant: '#023e8a', glow: 'rgba(0,180,216,0.35)' },
  { body: '#0096c7', panel: '#ade8f4', ant: '#03045e', glow: 'rgba(0,150,199,0.38)' },
];

function rand(min: number, max: number) { return min + Math.random() * (max - min); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function initStars(w: number, h: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < 380; i++) stars.push({ x: rand(0,w), y: rand(0,h), z: rand(0,0.25), size: rand(0.4,0.9),  speed: rand(0.015,0.04),  twinkle: rand(0.001,0.004), phase: rand(0,TAU) });
  for (let i = 0; i < 180; i++) stars.push({ x: rand(0,w), y: rand(0,h), z: rand(0.3,0.6), size: rand(0.8,1.6),  speed: rand(0.05,0.12),   twinkle: rand(0.002,0.006), phase: rand(0,TAU) });
  for (let i = 0; i < 55;  i++) stars.push({ x: rand(0,w), y: rand(0,h), z: rand(0.7,1.0), size: rand(1.5,2.8),  speed: rand(0.15,0.3),    twinkle: rand(0.005,0.012), phase: rand(0,TAU) });
  return stars;
}

function initSatellites(w: number, h: number, light: boolean): Satellite[] {
  const palette = light ? LIGHT_SATS : DARK_SATS;
  const sats: Satellite[] = [];
  for (let i = 0; i < 5; i++) {
    const pal = palette[i % palette.length];
    sats.push({
      wx: rand(w*0.08, w*0.92), wy: rand(h*0.08, h*0.88), wz: rand(0.35,0.9),
      vx: rand(-0.12,0.12),     vy: rand(-0.06,0.06),
      rot: rand(0,TAU),         rotSpeed: rand(-0.006,0.006),
      floatOffset: rand(0,TAU),
      bodyColor: pal.body, panelColor: pal.panel, antColor: pal.ant, glowColor: pal.glow,
      baseScale: rand(0.75,1.2),
    });
  }
  return sats;
}

function initComets(light: boolean): Comet[] {
  if (light) {
    return [
      { progress: rand(0,1), speed: 0.00048, sx: 1.15, sy: 0.08, ex: -0.15, ey: 0.88, depth: 0.75, nucleusColor: '#00b4d8', tailColor: '#48cae4', tailLength: 160, glowRadius: 22, wobble: 18, wobbleSpeed: 1.4 },
      { progress: rand(0,1), speed: 0.00034, sx: -0.12, sy: 0.15, ex: 1.12, ey: 0.82, depth: 0.55, nucleusColor: '#0096c7', tailColor: '#00b4d8', tailLength: 200, glowRadius: 18, wobble: 14, wobbleSpeed: 1.1 },
      { progress: rand(0.2,0.8), speed: 0.00062, sx: 1.1, sy: 0.5, ex: -0.1, ey: 0.22, depth: 0.38, nucleusColor: '#023e8a', tailColor: '#48cae4', tailLength: 110, glowRadius: 13, wobble: 10, wobbleSpeed: 1.8 },
    ];
  }
  return [
    { progress: rand(0,1), speed: 0.00048, sx: 1.15, sy: 0.08, ex: -0.15, ey: 0.88, depth: 0.75, nucleusColor: '#b45eff', tailColor: '#00f0ff', tailLength: 160, glowRadius: 22, wobble: 18, wobbleSpeed: 1.4 },
    { progress: rand(0,1), speed: 0.00034, sx: -0.12, sy: 0.15, ex: 1.12, ey: 0.82, depth: 0.55, nucleusColor: '#00f0ff', tailColor: '#b45eff', tailLength: 200, glowRadius: 18, wobble: 14, wobbleSpeed: 1.1 },
    { progress: rand(0.2,0.8), speed: 0.00062, sx: 1.1, sy: 0.5, ex: -0.1, ey: 0.22, depth: 0.38, nucleusColor: '#c9a84c', tailColor: '#ff6ec7', tailLength: 110, glowRadius: 13, wobble: 10, wobbleSpeed: 1.8 },
  ];
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r); ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r); ctx.quadraticCurveTo(x,y,x+r,y);
  ctx.closePath();
}

function drawSatellite(ctx: CanvasRenderingContext2D, sat: Satellite, cx: number, cy: number, scale: number, elapsed: number) {
  const s = scale * sat.baseScale;
  if (s < 0.4) return;
  ctx.save(); ctx.translate(cx,cy); ctx.rotate(sat.rot);

  const glowR = 38*s;
  const grd = ctx.createRadialGradient(0,0,0,0,0,glowR);
  const glowOpacity = 0.15 + 0.08 * Math.sin(elapsed*1.2+sat.floatOffset);
  grd.addColorStop(0, sat.glowColor.replace(/[\d.]+\)$/, `${glowOpacity})`));
  grd.addColorStop(1,'transparent');
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(0,0,glowR,0,TAU); ctx.fill();

  const pw=52*s, ph=12*s, pb=18*s;
  ctx.fillStyle=sat.panelColor; ctx.strokeStyle=sat.bodyColor; ctx.lineWidth=0.8*s;
  for (const [px] of [[-pb-pw/2,0],[pb+pw/2,0]]) {
    ctx.save(); ctx.translate(px,0);
    roundRect(ctx,-pw/2,-ph/2,pw,ph,3*s); ctx.fill(); ctx.stroke();
    ctx.strokeStyle=sat.bodyColor+'55'; ctx.lineWidth=0.5*s;
    for (let g=-pw/2+pw/3; g<pw/2; g+=pw/3) { ctx.beginPath(); ctx.moveTo(g,-ph/2); ctx.lineTo(g,ph/2); ctx.stroke(); }
    ctx.restore();
  }

  const bw=28*s, bh=20*s;
  ctx.fillStyle=sat.bodyColor; ctx.strokeStyle='#00000011'; ctx.lineWidth=1.5*s;
  roundRect(ctx,-bw/2,-bh/2,bw,bh,4*s); ctx.fill(); ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,0.18)';
  roundRect(ctx,-bw/2+3*s,-bh/2+3*s,bw-6*s,4*s,2*s); ctx.fill();

  ctx.strokeStyle=sat.antColor; ctx.lineWidth=1.8*s;
  ctx.beginPath(); ctx.moveTo(0,-bh/2); ctx.lineTo(0,-bh/2-14*s); ctx.stroke();
  ctx.fillStyle=sat.antColor; ctx.shadowColor=sat.antColor; ctx.shadowBlur=6*s;
  ctx.beginPath(); ctx.arc(0,-bh/2-16*s,3*s,0,TAU); ctx.fill();
  ctx.shadowBlur=0; ctx.restore();
}

function drawComet(ctx: CanvasRenderingContext2D, comet: Comet, w: number, h: number, elapsed: number, fade: number) {
  const t = comet.progress;
  const cx = lerp(comet.sx*w, comet.ex*w, t);
  const cy = lerp(comet.sy*h, comet.ey*h, t) + Math.sin(elapsed*comet.wobbleSpeed+t*TAU*1.5)*comet.wobble*comet.depth;
  const tLen = comet.tailLength * comet.depth;
  const gRadius = comet.glowRadius * comet.depth;
  const angle = Math.atan2((comet.ey-comet.sy)*h, (comet.ex-comet.sx)*w);

  ctx.save(); ctx.translate(cx,cy); ctx.rotate(angle+Math.PI);
  const tw = tLen*0.055;
  const tailGrd = ctx.createLinearGradient(0,0,tLen,0);
  tailGrd.addColorStop(0,'transparent');
  tailGrd.addColorStop(0.55,comet.tailColor+'18');
  tailGrd.addColorStop(0.82,comet.nucleusColor+'55');
  tailGrd.addColorStop(1,comet.nucleusColor+'00');
  ctx.globalAlpha = fade*0.85; ctx.fillStyle=tailGrd;
  ctx.beginPath(); ctx.moveTo(0,-tw*1.8); ctx.lineTo(tLen,0); ctx.lineTo(0,tw*1.8); ctx.closePath(); ctx.fill();

  const coreGrd = ctx.createLinearGradient(0,0,tLen*0.6,0);
  coreGrd.addColorStop(0,comet.nucleusColor+'00');
  coreGrd.addColorStop(0.7,comet.nucleusColor+'66');
  coreGrd.addColorStop(1,'#ffffff99');
  ctx.fillStyle=coreGrd;
  ctx.beginPath(); ctx.moveTo(0,-tw*0.4); ctx.lineTo(tLen*0.6,0); ctx.lineTo(0,tw*0.4); ctx.closePath(); ctx.fill();
  ctx.restore();

  ctx.save(); ctx.translate(cx,cy); ctx.globalAlpha=fade;
  const glowGrd = ctx.createRadialGradient(0,0,0,0,0,gRadius);
  glowGrd.addColorStop(0,'#ffffff');
  glowGrd.addColorStop(0.15,comet.nucleusColor);
  glowGrd.addColorStop(0.5,comet.nucleusColor+'66');
  glowGrd.addColorStop(1,'transparent');
  ctx.fillStyle=glowGrd;
  ctx.beginPath(); ctx.arc(0,0,gRadius,0,TAU); ctx.fill();
  ctx.restore();
}

function drawNebula(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, opacity: number) {
  const grd = ctx.createRadialGradient(x,y,0,x,y,r);
  grd.addColorStop(0, color.replace(')', `,${opacity})`).replace('rgb(','rgba('));
  grd.addColorStop(1,'transparent');
  ctx.fillStyle=grd;
  ctx.beginPath(); ctx.arc(x,y,r,0,TAU); ctx.fill();
}

function drawGrid(ctx: CanvasRenderingContext2D, W: number, H: number, elapsed: number, light: boolean) {
  const offset = (elapsed * (light ? 18 : 22)) % 80;
  const color = light ? 'rgba(0,180,216,0.06)' : 'rgba(80,40,255,0.018)';
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = -offset; x < W; x += 80) { ctx.moveTo(x,0); ctx.lineTo(x,H); }
  for (let y = -offset; y < H; y += 80) { ctx.moveTo(0,y); ctx.lineTo(W,y); }
  ctx.stroke();
}

export function CosmosCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    // ── Theme detection ──
    const isLight = () => document.documentElement.classList.contains('light');

    let currentLight = isLight();
    let stars    = initStars(W, H);
    let satellites = initSatellites(W, H, currentLight);
    let comets   = initComets(currentLight);

    // Re-init particles on theme change
    const themeObs = new MutationObserver(() => {
      const light = isLight();
      if (light !== currentLight) {
        currentLight = light;
        satellites = initSatellites(W, H, currentLight);
        comets = initComets(currentLight);
      }
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      stars = initStars(W, H);
      satellites = initSatellites(W, H, currentLight);
    };
    window.addEventListener('resize', onResize);

    let raf: number;
    let t0: number | null = null;

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000;
      const light = currentLight;

      // ── Background ────────────────────────────────────────
      if (light) {
        // White Radiant + Cyan Nebula background
        const bgGrd = ctx.createRadialGradient(W*0.5, H*0.35, 0, W*0.5, H*0.5, Math.max(W,H)*0.85);
        bgGrd.addColorStop(0, '#ffffff');
        bgGrd.addColorStop(0.45, '#f0faff');
        bgGrd.addColorStop(0.75, '#e0f5fc');
        bgGrd.addColorStop(1, '#cceffa');
        ctx.fillStyle = bgGrd;
        ctx.fillRect(0, 0, W, H);

        // Cyan nebula clouds (visible on white)
        drawNebula(ctx, W*0.12, H*0.22, Math.min(W,H)*0.55, 'rgb(0,180,216)',   0.14);
        drawNebula(ctx, W*0.82, H*0.68, Math.min(W,H)*0.50, 'rgb(0,150,210)',   0.11);
        drawNebula(ctx, W*0.5,  H*0.1,  Math.min(W,H)*0.38, 'rgb(72,202,228)',  0.09);
        drawNebula(ctx, W*0.3,  H*0.75, Math.min(W,H)*0.32, 'rgb(2,62,138)',    0.05);
        drawNebula(ctx, W*0.7,  H*0.35, Math.min(W,H)*0.28, 'rgb(0,119,182)',   0.06);
      } else {
        ctx.clearRect(0, 0, W, H);
        // Dark nebulae
        drawNebula(ctx, W*0.18, H*0.28, Math.min(W,H)*0.55, 'rgb(180,94,255)',  0.055);
        drawNebula(ctx, W*0.78, H*0.72, Math.min(W,H)*0.48, 'rgb(0,240,255)',   0.045);
        drawNebula(ctx, W*0.5,  H*0.15, Math.min(W,H)*0.35, 'rgb(201,168,76)',  0.025);
      }

      // ── Grid ──────────────────────────────────────────────
      drawGrid(ctx, W, H, elapsed, light);

      // ── Stars ─────────────────────────────────────────────
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(elapsed * star.twinkle * 1000 + star.phase);
        const alpha   = 0.3 + 0.7 * star.z + twinkle * 0.3 * star.z;
        ctx.globalAlpha = Math.min(1, alpha);

        if (light) {
          // Dark navy dots on white background
          const depth = 0.35 + 0.65 * star.z;
          ctx.fillStyle = `rgba(2, 48, 90, ${depth})`;

          if (star.z > 0.7 && twinkle > 0.7) {
            const halo = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size*4);
            halo.addColorStop(0, 'rgba(0,150,210,0.35)');
            halo.addColorStop(1, 'transparent');
            ctx.globalAlpha = 0.35 * twinkle;
            ctx.fillStyle = halo as unknown as string;
            ctx.beginPath(); ctx.arc(star.x, star.y, star.size*4, 0, TAU); ctx.fill();
            ctx.fillStyle = `rgba(2,48,90,${depth})`;
            ctx.globalAlpha = Math.min(1, alpha);
          }
        } else {
          // White dots on dark background
          ctx.fillStyle = '#ffffff';
          if (star.z > 0.7 && twinkle > 0.7) {
            const halo = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size*3.5);
            halo.addColorStop(0, 'rgba(255,255,255,0.6)');
            halo.addColorStop(1, 'transparent');
            ctx.globalAlpha = 0.4 * twinkle;
            ctx.fillStyle = halo as unknown as string;
            ctx.beginPath(); ctx.arc(star.x, star.y, star.size*3.5, 0, TAU); ctx.fill();
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = Math.min(1, alpha);
          }
        }

        ctx.beginPath(); ctx.arc(star.x, star.y, star.size, 0, TAU); ctx.fill();
        star.x -= star.speed * 0.3;
        star.y += Math.sin(elapsed*0.5+star.phase)*0.025*star.z;
        if (star.x < -4) { star.x = W+4; star.y = rand(0,H); }
      }
      ctx.globalAlpha = 1;

      // ── Comets ────────────────────────────────────────────
      for (const comet of comets) {
        comet.progress += comet.speed;
        if (comet.progress > 1) comet.progress = 0;
        const fade = Math.min(comet.progress*12,1) * Math.min((1-comet.progress)*12,1);
        drawComet(ctx, comet, W, H, elapsed, fade * comet.depth);
        ctx.globalAlpha = 1;
      }

      // ── Satellites ────────────────────────────────────────
      for (const sat of satellites) {
        sat.rot += sat.rotSpeed;
        sat.wx += sat.vx*0.4;
        sat.wy += sat.vy*0.25 + Math.sin(elapsed*0.35+sat.floatOffset)*0.035;
        if (sat.wx < -80) sat.wx = W+80;
        if (sat.wx > W+80) sat.wx = -80;
        if (sat.wy < -80) sat.wy = H+80;
        if (sat.wy > H+80) sat.wy = -80;
        const scale = 0.25 + sat.wz*0.75;
        drawSatellite(ctx, sat, sat.wx, sat.wy, scale, elapsed);
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    return () => {
      window.removeEventListener('resize', onResize);
      themeObs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
      }}
    />
  );
}
