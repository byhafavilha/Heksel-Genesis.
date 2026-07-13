import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   SPACE BACKGROUND  —  2D Canvas with simulated 3D depth
   
   • Stars      – 3 parallax layers at different speeds & sizes
   • Nebula     – soft radial gradient clouds
   • Satellites – Nintendo-style cute sats drawn with canvas API,
                  scaled by their "z" position for perspective
   • Comets     – realistic glowing nucleus + gradient tail,
                  with depth-based opacity and size
───────────────────────────────────────────────────────────── */

const TAU = Math.PI * 2;

interface Star {
  x: number; y: number; z: number; // z: 0=far, 1=close
  size: number; speed: number; twinkle: number; phase: number;
}

interface Satellite {
  // world position (perspective-projected each frame)
  wx: number; wy: number; wz: number; // z 0-1 (0=far, 1=close)
  vx: number; vy: number; // drift velocity
  rot: number; rotSpeed: number;
  floatOffset: number;
  // Nintendo palette
  bodyColor: string;
  panelColor: string;
  antColor: string;
  glowColor: string;
  baseScale: number;
}

interface Comet {
  // normalized 0-1 along path
  progress: number; speed: number;
  // path start/end in screen-fraction coords
  sx: number; sy: number; ex: number; ey: number;
  depth: number; // 0=far, 1=close
  nucleusColor: string;
  tailColor: string;
  tailLength: number; // px at depth=1
  glowRadius: number;
  wobble: number; // amplitude
  wobbleSpeed: number;
}

// Palette
const NEON_COLORS = [
  { body: '#00f0ff', panel: '#004455', ant: '#80f8ff', glow: 'rgba(0,240,255,0.6)' },
  { body: '#b45eff', panel: '#2d0f4a', ant: '#d8a0ff', glow: 'rgba(180,94,255,0.6)' },
  { body: '#c9a84c', panel: '#3a2800', ant: '#f5d97f', glow: 'rgba(201,168,76,0.5)' },
  { body: '#00ffc3', panel: '#003322', ant: '#80ffe0', glow: 'rgba(0,255,195,0.5)' },
  { body: '#ff6ec7', panel: '#4a001a', ant: '#ffa8e0', glow: 'rgba(255,110,199,0.5)' },
];

function rand(min: number, max: number) { return min + Math.random() * (max - min); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function initStars(w: number, h: number): Star[] {
  const stars: Star[] = [];
  // Far layer: many tiny slow stars
  for (let i = 0; i < 380; i++) stars.push({ x: rand(0,w), y: rand(0,h), z: rand(0,0.25), size: rand(0.4,0.9), speed: rand(0.015,0.04), twinkle: rand(0.001,0.004), phase: rand(0,TAU) });
  // Mid layer
  for (let i = 0; i < 180; i++) stars.push({ x: rand(0,w), y: rand(0,h), z: rand(0.3,0.6), size: rand(0.8,1.6), speed: rand(0.05,0.12), twinkle: rand(0.002,0.006), phase: rand(0,TAU) });
  // Near layer: few bright big stars
  for (let i = 0; i < 55; i++) stars.push({ x: rand(0,w), y: rand(0,h), z: rand(0.7,1.0), size: rand(1.5,2.8), speed: rand(0.15,0.3), twinkle: rand(0.005,0.012), phase: rand(0,TAU) });
  return stars;
}

function initSatellites(w: number, h: number): Satellite[] {
  const sats: Satellite[] = [];
  for (let i = 0; i < 5; i++) {
    const pal = NEON_COLORS[i % NEON_COLORS.length];
    sats.push({
      wx: rand(w * 0.08, w * 0.92),
      wy: rand(h * 0.08, h * 0.88),
      wz: rand(0.35, 0.9),
      vx: rand(-0.12, 0.12),
      vy: rand(-0.06, 0.06),
      rot: rand(0, TAU),
      rotSpeed: rand(-0.006, 0.006),
      floatOffset: rand(0, TAU),
      bodyColor: pal.body,
      panelColor: pal.panel,
      antColor: pal.ant,
      glowColor: pal.glow,
      baseScale: rand(0.75, 1.2),
    });
  }
  return sats;
}

function initComets(): Comet[] {
  return [
    {
      progress: rand(0, 1), speed: 0.00048,
      sx: 1.15, sy: 0.08, ex: -0.15, ey: 0.88,
      depth: 0.75, nucleusColor: '#b45eff', tailColor: '#00f0ff',
      tailLength: 160, glowRadius: 22, wobble: 18, wobbleSpeed: 1.4,
    },
    {
      progress: rand(0, 1), speed: 0.00034,
      sx: -0.12, sy: 0.15, ex: 1.12, ey: 0.82,
      depth: 0.55, nucleusColor: '#00f0ff', tailColor: '#b45eff',
      tailLength: 200, glowRadius: 18, wobble: 14, wobbleSpeed: 1.1,
    },
    {
      progress: rand(0.2, 0.8), speed: 0.00062,
      sx: 1.1, sy: 0.5, ex: -0.1, ey: 0.22,
      depth: 0.38, nucleusColor: '#c9a84c', tailColor: '#ff6ec7',
      tailLength: 110, glowRadius: 13, wobble: 10, wobbleSpeed: 1.8,
    },
  ];
}

// Draw a Nintendo-style satellite centered at (cx,cy) with given scale & rotation
function drawSatellite(ctx: CanvasRenderingContext2D, sat: Satellite, cx: number, cy: number, scale: number, elapsed: number) {
  const s = scale * sat.baseScale;
  if (s < 0.4) return; // too small, skip

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(sat.rot);

  // Glow halo
  const glowR = 38 * s;
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
  grd.addColorStop(0, sat.glowColor.replace('0.6)', `${0.15 + 0.08 * Math.sin(elapsed * 1.2 + sat.floatOffset)})`));
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(0, 0, glowR, 0, TAU); ctx.fill();

  // Solar panels (left & right)
  const pw = 52 * s, ph = 12 * s, pb = 18 * s; // panel width, height, body half-width
  ctx.fillStyle = sat.panelColor;
  ctx.strokeStyle = sat.bodyColor;
  ctx.lineWidth = 0.8 * s;
  // Panel grid lines for detail
  const panelPositions = [[-pb - pw / 2, 0], [pb + pw / 2, 0]];
  for (const [px] of panelPositions) {
    ctx.save();
    ctx.translate(px, 0);
    roundRect(ctx, -pw / 2, -ph / 2, pw, ph, 3 * s);
    ctx.fill();
    ctx.stroke();
    // Grid lines on panel
    ctx.strokeStyle = sat.bodyColor + '55';
    ctx.lineWidth = 0.5 * s;
    for (let g = -pw / 2 + pw / 3; g < pw / 2; g += pw / 3) {
      ctx.beginPath(); ctx.moveTo(g, -ph / 2); ctx.lineTo(g, ph / 2); ctx.stroke();
    }
    ctx.restore();
  }

  // Body box
  const bw = 28 * s, bh = 20 * s;
  ctx.fillStyle = sat.bodyColor;
  ctx.strokeStyle = '#ffffff22';
  ctx.lineWidth = 1.5 * s;
  roundRect(ctx, -bw / 2, -bh / 2, bw, bh, 4 * s);
  ctx.fill(); ctx.stroke();

  // Body highlight stripe
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  roundRect(ctx, -bw / 2 + 3 * s, -bh / 2 + 3 * s, bw - 6 * s, 4 * s, 2 * s);
  ctx.fill();

  // Antenna
  ctx.strokeStyle = sat.antColor;
  ctx.lineWidth = 1.8 * s;
  ctx.beginPath();
  ctx.moveTo(0, -bh / 2);
  ctx.lineTo(0, -bh / 2 - 14 * s);
  ctx.stroke();

  // Antenna tip
  ctx.fillStyle = sat.antColor;
  ctx.shadowColor = sat.antColor;
  ctx.shadowBlur = 6 * s;
  ctx.beginPath();
  ctx.arc(0, -bh / 2 - 16 * s, 3 * s, 0, TAU);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();
}

// Helper: canvas roundRect polyfill
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawComet(ctx: CanvasRenderingContext2D, comet: Comet, w: number, h: number, elapsed: number, fade: number) {
  const t = comet.progress;
  const cx = lerp(comet.sx * w, comet.ex * w, t);
  const cy = lerp(comet.sy * h, comet.ey * h, t) + Math.sin(elapsed * comet.wobbleSpeed + t * TAU * 1.5) * comet.wobble * comet.depth;

  const tLen = comet.tailLength * comet.depth;
  const gRadius = comet.glowRadius * comet.depth;

  // Direction angle
  const dx = comet.ex - comet.sx;
  const dy = comet.ey - comet.sy;
  const angle = Math.atan2(dy * h, dx * w);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle + Math.PI); // tail trails behind

  // Tail (gradient quad)
  const tailGrd = ctx.createLinearGradient(0, 0, tLen, 0);
  tailGrd.addColorStop(0, 'transparent');
  tailGrd.addColorStop(0.55, comet.tailColor + '18');
  tailGrd.addColorStop(0.82, comet.nucleusColor + '55');
  tailGrd.addColorStop(1, comet.nucleusColor + '00');
  const tw = tLen * 0.055; // tail half-width

  ctx.globalAlpha = fade * 0.85;
  ctx.fillStyle = tailGrd;
  ctx.beginPath();
  ctx.moveTo(0, -tw * 1.8);
  ctx.lineTo(tLen, 0);
  ctx.lineTo(0, tw * 1.8);
  ctx.closePath();
  ctx.fill();

  // Brighter core streak
  const coreGrd = ctx.createLinearGradient(0, 0, tLen * 0.6, 0);
  coreGrd.addColorStop(0, comet.nucleusColor + '00');
  coreGrd.addColorStop(0.7, comet.nucleusColor + '66');
  coreGrd.addColorStop(1, '#ffffff99');
  ctx.fillStyle = coreGrd;
  ctx.beginPath();
  ctx.moveTo(0, -tw * 0.4);
  ctx.lineTo(tLen * 0.6, 0);
  ctx.lineTo(0, tw * 0.4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // Nucleus glow
  ctx.save();
  ctx.translate(cx, cy);
  ctx.globalAlpha = fade;
  const glowGrd = ctx.createRadialGradient(0, 0, 0, 0, 0, gRadius);
  glowGrd.addColorStop(0, '#ffffff');
  glowGrd.addColorStop(0.15, comet.nucleusColor);
  glowGrd.addColorStop(0.5, comet.nucleusColor + '66');
  glowGrd.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrd;
  ctx.beginPath(); ctx.arc(0, 0, gRadius, 0, TAU); ctx.fill();
  ctx.restore();
}

// Draw soft nebula cloud
function drawNebula(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, opacity: number) {
  const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
  grd.addColorStop(0, color.replace(')', `,${opacity})`).replace('rgb(', 'rgba('));
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
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

    let stars = initStars(W, H);
    let satellites = initSatellites(W, H);
    let comets = initComets();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      stars = initStars(W, H);
      satellites = initSatellites(W, H);
    };
    window.addEventListener('resize', onResize);

    let raf: number;
    let t0: number | null = null;

    function frame(ts: number) {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) / 1000;

      ctx.clearRect(0, 0, W, H);

      // ── Nebulae ──
      drawNebula(ctx, W * 0.18, H * 0.28, Math.min(W, H) * 0.55, 'rgb(180,94,255)', 0.055);
      drawNebula(ctx, W * 0.78, H * 0.72, Math.min(W, H) * 0.48, 'rgb(0,240,255)', 0.045);
      drawNebula(ctx, W * 0.5,  H * 0.15, Math.min(W, H) * 0.35, 'rgb(201,168,76)', 0.025);

      // ── Stars ──
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(elapsed * star.twinkle * 1000 + star.phase);
        const alpha = 0.3 + 0.7 * star.z + twinkle * 0.3 * star.z;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fillStyle = '#ffffff';

        // Shimmer halo for closer stars
        if (star.z > 0.7 && twinkle > 0.7) {
          const halo = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3.5);
          halo.addColorStop(0, 'rgba(255,255,255,0.6)');
          halo.addColorStop(1, 'transparent');
          ctx.globalAlpha = 0.4 * twinkle;
          ctx.fillStyle = halo as unknown as string;
          ctx.beginPath(); ctx.arc(star.x, star.y, star.size * 3.5, 0, TAU); ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = Math.min(1, alpha);
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, TAU);
        ctx.fill();

        // Drift
        star.x -= star.speed * 0.3;
        star.y += Math.sin(elapsed * 0.5 + star.phase) * 0.025 * star.z;
        if (star.x < -4) { star.x = W + 4; star.y = rand(0, H); }
      }
      ctx.globalAlpha = 1;

      // ── Comets ──
      for (const comet of comets) {
        comet.progress += comet.speed;
        if (comet.progress > 1) comet.progress = 0;
        const fade = Math.min(comet.progress * 12, 1) * Math.min((1 - comet.progress) * 12, 1);
        drawComet(ctx, comet, W, H, elapsed, fade * comet.depth);
        ctx.globalAlpha = 1;
      }

      // ── Satellites ──
      for (const sat of satellites) {
        sat.rot += sat.rotSpeed;

        // Gentle float
        sat.wx += sat.vx * 0.4;
        sat.wy += sat.vy * 0.25 + Math.sin(elapsed * 0.35 + sat.floatOffset) * 0.035;

        // Wrap around screen edges
        if (sat.wx < -80) sat.wx = W + 80;
        if (sat.wx > W + 80) sat.wx = -80;
        if (sat.wy < -80) sat.wy = H + 80;
        if (sat.wy > H + 80) sat.wy = -80;

        // Perspective scale: closer sats are bigger
        const scale = 0.25 + sat.wz * 0.75;
        drawSatellite(ctx, sat, sat.wx, sat.wy, scale, elapsed);
        ctx.globalAlpha = 1;
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', onResize);
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
        zIndex: 0,
      }}
    />
  );
}
