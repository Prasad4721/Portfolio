"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Skill = { id: string; name: string; color?: string; description?: string; years?: number; percent?: number };

const SAMPLE_SKILLS: Skill[] = [
  { id: "react", name: "React", color: "#61dafb", description: "Component UI with hooks", years: 5, percent: 92 },
  { id: "ts", name: "TypeScript", color: "#3178c6", description: "Typed JavaScript", years: 4, percent: 86 },
  { id: "next", name: "Next.js", color: "#000000", description: "Fullstack React framework", years: 3, percent: 84 },
  { id: "node", name: "Node.js", color: "#8cc84b", description: "Server runtime", years: 5, percent: 80 },
  { id: "tailwind", name: "Tailwind", color: "#06b6d4", description: "Utility CSS", years: 3, percent: 78 },
  { id: "python", name: "Python Programming", color: "#3776ab", description: "Scripting, automation, data analysis", years: 6, percent: 90 },
  { id: "aws", name: "AWS", color: "#ff9900", description: "Cloud architecture & services", years: 4, percent: 82 },
  { id: "data", name: "Data Analysis", color: "#2aa198", description: "Pandas, SQL, ETL", years: 5, percent: 88 },
  { id: "web", name: "Web Development", color: "#e34c26", description: "HTML, CSS, JavaScript", years: 7, percent: 92 },
  { id: "systems", name: "Problem Solving", color: "#9b59b6", description: "Scalable systems & algorithms", years: 8, percent: 94 },
];

function sendAnalytics(event: string, props: Record<string, any> = {}) {
  try {
    const w = typeof window !== "undefined" ? (window as any) : undefined;
    if (w && Array.isArray(w.dataLayer)) w.dataLayer.push({ event, ...props });
    else if (w && typeof w.gtag === "function") w.gtag("event", event, props);
    else if (typeof console !== "undefined") console.debug("analytics", event, props);
  } catch {
    /* noop */
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(Boolean(q.matches));
    onChange();
    q.addEventListener?.("change", onChange);
    return () => q.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function computePositions(count: number, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * 0.36;
  const out: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / Math.max(1, count)) * Math.PI * 2;
    const spiral = 0.4 + 0.6 * (i / Math.max(1, count));
    const r = R * (0.3 + 0.7 * spiral) * (0.8 + 0.4 * Math.sin(i * 0.9));
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * (0.75 + 0.2 * Math.cos(i * 0.7));
    const z = 0.4 + 0.6 * Math.abs(Math.sin(i * 0.6));
    out.push({ x, y, z });
  }
  return out;
}

export function SkillsGalaxy({ skills = SAMPLE_SKILLS }: { skills?: Skill[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 1000, h: 420 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 }); // small tilt values
  const [scale, setScale] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [compare, setCompare] = useState<string[]>([]);

  const reduced = usePrefersReducedMotion();

  // resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(300, Math.round(r.width)), h: Math.max(200, Math.round(r.height)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const positions = useMemo(() => computePositions(skills.length, size.w, size.h), [skills.length, size.w, size.h]);

  // pointer drag
  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    function onPointerDown(e: PointerEvent) {
      if (e.button !== 0) return;
      dragging.current = true;
      last.current = { x: e.clientX, y: e.clientY };
      try { (e.target as Element).setPointerCapture?.((e as any).pointerId); } catch {}
      sendAnalytics("nebula_drag_start");
    }
    function onPointerMove(e: PointerEvent) {
      if (!dragging.current || !last.current) return;
      const dx = e.clientX - last.current.x;
      const dy = e.clientY - last.current.y;
      last.current = { x: e.clientX, y: e.clientY };
      setRotation((r) => ({ x: r.x + dy * 0.0025, y: r.y + dx * 0.0025 }));
    }
    function onPointerUp(e: PointerEvent) {
      dragging.current = false;
      last.current = null;
      try { (e.target as Element).releasePointerCapture?.((e as any).pointerId); } catch {}
      sendAnalytics("nebula_drag_end");
    }
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  // wheel zoom (throttle minimal)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let lastT = 0;
    function onWheel(e: WheelEvent) {
      const now = Date.now();
      if (now - lastT < 30) return; // throttle
      lastT = now;
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setScale((s) => Math.min(2, Math.max(0.6, s + delta)));
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, []);

  // keyboard support
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setSelected(null); setCompare([]); }
      else if (e.key === "+" || e.key === "=") setScale((s) => Math.min(2, s + 0.1));
      else if (e.key === "-") setScale((s) => Math.max(0.6, s - 0.1));
      else if (e.key === "ArrowLeft") setRotation((r) => ({ x: r.x, y: r.y - 0.12 }));
      else if (e.key === "ArrowRight") setRotation((r) => ({ x: r.x, y: r.y + 0.12 }));
      else if (e.key === "ArrowUp") setRotation((r) => ({ x: r.x - 0.12, y: r.y }));
      else if (e.key === "ArrowDown") setRotation((r) => ({ x: r.x + 0.12, y: r.y }));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // auto-rotate loop
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let prev = performance.now();
    const loop = (t: number) => {
      const dt = t - prev;
      prev = t;
      if (!dragging.current) setRotation((r) => ({ x: r.x + dt * 0.0004, y: r.y + dt * 0.00025 }));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const onOrbClick = useCallback((id: string) => {
    setSelected((s) => (s === id ? null : id));
    sendAnalytics("nebula_orb_click", { id });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setCompare((c) => (c.includes(id) ? c.filter((x) => x !== id) : c.length >= 2 ? [c[1], id] : [...c, id]));
    sendAnalytics("nebula_compare_toggle", { id });
  }, []);

  const liveLabel = selected ? `Selected ${selected}` : compare.length ? `Comparing ${compare.join(" and ")}` : "Skills overview";

  return (
    <section id="skills" aria-labelledby="skills-title" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="skills-title" className="text-2xl font-semibold text-white mb-4">Skill Nebula</h2>

        <div ref={containerRef} role="region" aria-label="Skill nebula" tabIndex={0} className="relative w-full h-[420px] bg-[#050608] rounded-2xl overflow-hidden">
          {/* subtle SVG background for depth */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden>
            <defs>
              <radialGradient id="g" cx="50%" cy="40%">
                <stop offset="0%" stopColor="#ffffff08" />
                <stop offset="100%" stopColor="#00000000" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>

          {/* orbs rendered as absolutely-positioned buttons for accessibility */}
          {positions.map((p, i) => {
            const s = skills[i];
            const zScale = 0.6 + 0.8 * p.z;
            const diameter = Math.max(20, 18 + (s.percent ?? 60) * 0.18 * zScale);
            // apply rotation/parallax
            const rx = (p.x - size.w / 2) + rotation.y * 30;
            const ry = (p.y - size.h / 2) + rotation.x * 18;
            const left = size.w / 2 + rx;
            const top = size.h / 2 + ry;
            const isSel = selected === s.id;
            const inComp = compare.includes(s.id);

            return (
              <button
                key={s.id}
                onClick={() => onOrbClick(s.id)}
                onDoubleClick={(e) => { e.stopPropagation(); toggleCompare(s.id); }}
                className="absolute rounded-full flex items-center justify-center focus:outline-none"
                aria-pressed={isSel}
                aria-label={`${s.name}. ${s.years ?? "-"} years. Proficiency ${s.percent ?? "-"} percent.`}
                style={{
                  left: 0,
                  top: 0,
                  transform: `translate(-50%,-50%) translate3d(${left}px, ${top}px, 0) scale(${(scale * zScale).toFixed(3)})`,
                  width: diameter,
                  height: diameter,
                  // stronger, brighter gradient and glow so orbs are visible on dark background
                  background: `radial-gradient(circle at 30% 30%, ${s.color ?? "#fff"} 0%, ${s.color ?? "#fff"}66 25%, rgba(5,8,12,0.6) 60%)`,
                  border: inComp ? "2px solid #ffffffaa" : "1px solid rgba(255,255,255,0.12)",
                  boxShadow: isSel ? "0 14px 40px rgba(0,0,0,0.7), 0 0 20px 6px rgba(255,255,255,0.04)" : "0 8px 22px rgba(0,0,0,0.55), 0 0 12px 2px rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  zIndex: 10,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") onOrbClick(s.id);
                  if (e.key.toLowerCase() === "c") toggleCompare(s.id);
                }}
              >
                <span className="sr-only">{s.name}</span>
                <span aria-hidden style={{ color: '#f8fafc', fontWeight: 700, fontSize: Math.max(10, Math.round(diameter / 4)), textShadow: '0 2px 6px rgba(0,0,0,0.6)' }}>{s.name}</span>
              </button>
            );
          })}

          {/* subtle connecting lines using SVG overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
            <g stroke="#0ea5a066" strokeWidth={1} strokeLinecap="round">
              {positions.map((p, i) => {
                // connect to next few neighbours to create nebula network
                const neighbors = [i + 1, i + 2].filter((n) => n < positions.length);
                return neighbors.map((n) => {
                  const a = positions[i];
                  const b = positions[n];
                  const ax = (a.x - size.w / 2) + rotation.y * 30 + size.w / 2;
                  const ay = (a.y - size.h / 2) + rotation.x * 18 + size.h / 2;
                  const bx = (b.x - size.w / 2) + rotation.y * 30 + size.w / 2;
                  const by = (b.y - size.h / 2) + rotation.x * 18 + size.h / 2;
                  return <line key={`${i}-${n}`} x1={ax} y1={ay} x2={bx} y2={by} opacity={0.5 - Math.abs(a.z - b.z) * 0.4} />;
                });
              })}
            </g>
          </svg>

        </div>

        {/* overlay details / compare panel */}
        <div className="mt-4 rounded p-3 bg-white/5 text-sm text-white/90">
          {selected ? (
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{skills.find((x) => x.id === selected)?.name}</div>
                <div className="text-xs text-gray-300">{skills.find((x) => x.id === selected)?.description}</div>
                <div className="text-xs text-gray-400 mt-1">Proficiency: {skills.find((x) => x.id === selected)?.percent}%</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-white/6 text-sm" onClick={() => setSelected(null)}>Close</button>
                <button className="px-3 py-1 rounded bg-indigo-600 text-sm" onClick={() => selected && toggleCompare(selected)}>Toggle Compare</button>
              </div>
            </div>
          ) : compare.length === 2 ? (
            <div className="grid grid-cols-2 gap-4">
              {compare.map((id) => {
                const s = skills.find((x) => x.id === id)!;
                return (
                  <div key={id} className="p-2 bg-white/3 rounded">
                    <div className="font-medium">{s.name}</div>
                    <div className="text-xs text-gray-300">{s.description}</div>
                    <div className="text-xs mt-1">Proficiency: {s.percent}% • {s.years}y</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-300">Click an orb to view details. Double-click orb to toggle compare. Keyboard: arrows rotate · +/- zoom · Esc clear.</div>
          )}
        </div>

        <div className="sr-only" role="status" aria-live="polite">{liveLabel}</div>
      </div>
    </section>
  );
}

export default SkillsGalaxy;

