"use client";
import { useEffect, useRef } from "react";

export default function StarField() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf;

    // Estrelas fixas com twinkling
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.6 + 0.15,
      min: Math.random() * 0.08 + 0.04,
      max: Math.random() * 0.55 + 0.3,
    }));

    // Estrelas cadentes
    const shooting = [];
    let nextShoot = 2 + Math.random() * 4; // primeira em 2–6 s

    function spawn() {
      // Nasce no topo ou lateral esquerda, cai em diagonal para baixo-direita
      const fromTop = Math.random() > 0.3;
      const angle = (Math.random() * 25 + 20) * (Math.PI / 180); // 20–45°
      const speed = 0.18 + Math.random() * 0.18; // fração da largura por segundo
      const len = 0.08 + Math.random() * 0.10;   // comprimento da cauda

      shooting.push({
        x: fromTop ? Math.random() * 0.85 : 0,
        y: fromTop ? 0 : Math.random() * 0.5,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        len,
        life: 0,
        maxLife: len / speed * 2.2, // tempo para percorrer ~2× a cauda
        alpha: 0,
      });
    }

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    let prev = performance.now();

    function draw(now) {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;
      const t = now / 1000;

      // ── Estrelas fixas ──
      for (const s of stars) {
        const a = s.min + (s.max - s.min) * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Spawn nova estrela cadente ──
      nextShoot -= dt;
      if (nextShoot <= 0) {
        spawn();
        nextShoot = 3.5 + Math.random() * 5; // próxima em 3.5–8.5 s
      }

      // ── Desenha e avança estrelas cadentes ──
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i];
        s.life += dt;
        if (s.life >= s.maxLife) { shooting.splice(i, 1); continue; }

        const p = s.life / s.maxLife;
        // Fade: sobe rapidamente, fica firme e depois dissolve
        const alpha = p < 0.15 ? p / 0.15 : p > 0.65 ? 1 - (p - 0.65) / 0.35 : 1;

        const hx = s.x * W;
        const hy = s.y * H;
        const tx = hx - s.vx * s.len * W; // ponta da cauda
        const ty = hy - s.vy * s.len * H;

        // Gradiente: transparente na cauda → brilhante na ponta
        const grad = ctx.createLinearGradient(tx, ty, hx, hy);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(200,220,255,${(alpha * 0.4).toFixed(3)})`);
        grad.addColorStop(1, `rgba(255,255,255,${(alpha * 0.95).toFixed(3)})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        // Brilho na ponta
        const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 6);
        glow.addColorStop(0, `rgba(255,255,255,${(alpha * 0.7).toFixed(3)})`);
        glow.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(hx, hy, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Avança posição
        s.x += s.vx * dt;
        s.y += s.vy * dt;
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}
