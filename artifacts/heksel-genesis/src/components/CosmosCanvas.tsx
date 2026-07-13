import { useEffect, useRef } from 'react';

export function CosmosCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Stars
    const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2,
        speed: (Math.random() * 0.5) + 0.1,
        opacity: Math.random()
      });
    }

    // Comets
    const comets = [
      { x: -100, y: Math.random() * height, speed: 4, length: 100, color: '#00f0ff', angle: Math.PI / 6 },
      { x: width + 100, y: Math.random() * height, speed: 5, length: 150, color: '#b45eff', angle: Math.PI - Math.PI / 8 }
    ];

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      });

      // Draw comets
      comets.forEach(comet => {
        ctx.save();
        ctx.translate(comet.x, comet.y);
        ctx.rotate(comet.angle);
        
        const gradient = ctx.createLinearGradient(0, 0, -comet.length, 0);
        gradient.addColorStop(0, comet.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-comet.length, -1, comet.length, 2);
        ctx.restore();

        comet.x += Math.cos(comet.angle) * comet.speed;
        comet.y += Math.sin(comet.angle) * comet.speed;

        if (comet.x > width + 200 || comet.x < -200 || comet.y > height + 200 || comet.y < -200) {
          if (comet.color === '#00f0ff') {
            comet.x = -100;
            comet.y = Math.random() * height;
          } else {
            comet.x = width + 100;
            comet.y = Math.random() * height;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}
