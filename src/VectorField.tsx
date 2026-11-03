import { useEffect, useRef } from "react";

const CLUSTERS: { c: [number, number]; words: string[] }[] = [
  { c: [0.74, 0.28], words: ["RAG", "Embeddings", "Vector Search", "LLMs", "Retrieval"] },
  { c: [0.8, 0.72], words: ["LangChain", "LangGraph", "MCP", "Agents", "Tool Calling"] },
  { c: [0.46, 0.84], words: ["FastAPI", "Flask", "Node.js", "PostgreSQL", "REST APIs"] },
  { c: [0.3, 0.26], words: ["PyTorch", "TensorFlow", "NumPy", "Pandas", "scikit-learn"] },
  { c: [0.12, 0.7], words: ["OpenCV", "Unity", "C#", "React", "Flutter"] },
];
const MONO = '"Geist Mono Variable", ui-monospace, monospace';

/** Hero background: skills live in a 2D "embedding space"; the cursor is the query vector. */
export default function VectorField() {
  const cv = useRef<HTMLCanvasElement>(null);
  const out = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = cv.current!;
    const ctx = canvas.getContext("2d")!;
    const hero = canvas.parentElement!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, frame = 0, visible = true, px = -1, py = -1;
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const pts = CLUSTERS.flatMap(({ c, words }) =>
      words.map((label) => ({
        label, x: 0, y: 0, ph: rnd() * 6.28,
        ox: c[0] + (rnd() - 0.5) * 0.2, oy: c[1] + (rnd() - 0.5) * 0.22,
      }))
    );

    const resize = () => {
      const r = hero.getBoundingClientRect();
      const d = Math.min(devicePixelRatio || 1, 2);
      w = r.width; h = r.height;
      canvas.width = w * d; canvas.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      if (reduce) draw(0);
    };
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      px = e.clientX - r.left; py = e.clientY - r.top;
    };
    const leave = () => { px = -1; };

    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);
      const auto = px < 0;
      const qx = auto ? w * (0.55 + 0.3 * Math.sin(t * 0.0003)) : px;
      const qy = auto ? h * (0.5 + 0.26 * Math.sin(t * 0.0005 + 1)) : py;
      for (const p of pts) {
        p.x = (p.ox + Math.sin(t * 0.0004 + p.ph) * 0.012) * w;
        p.y = (p.oy + Math.cos(t * 0.00035 + p.ph) * 0.012) * h;
      }
      const far = Math.hypot(w, h) * 0.45;
      const ranked = pts.map((p) => ({ p, d: Math.hypot(p.x - qx, p.y - qy) })).sort((a, b) => a.d - b.d);
      const top = ranked.slice(0, 5);
      const hit = new Set(top.map((r) => r.p));

      ctx.fillStyle = "rgba(255,255,255,0.26)";
      for (const p of pts) if (!hit.has(p)) { ctx.beginPath(); ctx.arc(p.x, p.y, 1.7, 0, 6.283); ctx.fill(); }

      top.forEach(({ p, d }, i) => {
        const score = Math.max(0, 1 - d / far);
        ctx.strokeStyle = `rgba(167,139,250,${0.6 - i * 0.09})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(qx, qy); ctx.lineTo(p.x, p.y); ctx.stroke();
        ctx.shadowColor = "#8b5cf6"; ctx.shadowBlur = 14;
        ctx.fillStyle = "#c4b5fd";
        ctx.beginPath(); ctx.arc(p.x, p.y, 3.2, 0, 6.283); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.font = `500 11px ${MONO}`;
        ctx.fillStyle = "#e4e4e7"; ctx.fillText(p.label, p.x + 10, p.y - 4);
        ctx.font = `10px ${MONO}`;
        ctx.fillStyle = "#a78bfa"; ctx.fillText(score.toFixed(2), p.x + 10, p.y + 9);
      });

      ctx.strokeStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath(); ctx.arc(qx, qy, 6, 0, 6.283); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(qx - 12, qy); ctx.lineTo(qx - 8, qy); ctx.moveTo(qx + 8, qy); ctx.lineTo(qx + 12, qy);
      ctx.moveTo(qx, qy - 12); ctx.lineTo(qx, qy - 8); ctx.moveTo(qx, qy + 8); ctx.lineTo(qx, qy + 12); ctx.stroke();

      if (out.current && frame++ % 6 === 0) {
        const s = Math.max(0, 1 - top[0].d / far).toFixed(2);
        out.current.textContent = `q=[${(qx / w).toFixed(2)}, ${(qy / h).toFixed(2)}]  k=5  top1=${top[0].p.label} (${s})${auto ? "  auto" : ""}`;
      }
    }

    const loop = (t: number) => {
      if (visible && !document.hidden) draw(t);
      raf = requestAnimationFrame(loop);
    };
    resize();
    addEventListener("resize", resize);
    if (reduce) return () => removeEventListener("resize", resize);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(hero);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf); io.disconnect();
      removeEventListener("resize", resize);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <canvas ref={cv} className="vector-field" aria-hidden="true" />
      <div ref={out} className="vector-readout" aria-hidden="true" />
    </>
  );
}
