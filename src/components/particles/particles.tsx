import { useEffect, useRef } from "react";

export const Particles = () => {
  const PARTICLE_COUNT = 150;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<
    { x: number; y: number; size: number; opacity: number; speed: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize function (called on load and resize)
    const resizeCanvas = () => {
      const oldWidth = canvas.width || window.innerWidth;
      const oldHeight = canvas.height || window.innerHeight;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (particlesRef.current.length === 0) {
        // If empty, initialize particles
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 10,
          opacity: 1,
          speed: Math.random(),
        }));
      } else {
        // If particles exist, reposition them proportionally
        particlesRef.current.forEach((p) => {
          p.x = (p.x / oldWidth) * canvas.width;
          p.y = (p.y / oldHeight) * canvas.height;
        });
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.y -= p.speed;

        if (p.y < 0) {
          p.y = canvas.height; // Reset to bottom when out of view
          p.opacity = 1;
        }

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.23)";
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    />
  );
};
