import { useEffect, useRef, useState, useCallback } from "react";

interface TrailDot {
  id: number;
  x: number;
  y: number;
  born: number;
  size: number;
  color: string;
}

const TRAIL_COLORS = ["#c084fc", "#818cf8", "#67e8f9", "#f472b6", "#a78bfa"];
const TRAIL_LIFE = 900; // ms

let dotId = 0;

export default function SpaceCursor() {
  const targetRef = useRef({ x: -200, y: -200 });
  const smoothRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const lastTrailRef = useRef(0);
  const timeRef = useRef(0);

  const [smoothPos, setSmoothPos] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [angle, setAngle] = useState(0);
  const [visible, setVisible] = useState(false);

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [visible]);

  // Animation loop
  useEffect(() => {
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      timeRef.current += dt;

      // Smooth follow (lag gives floating feel)
      const lerpSpeed = 0.10;
      smoothRef.current.x += (targetRef.current.x - smoothRef.current.x) * lerpSpeed;
      smoothRef.current.y += (targetRef.current.y - smoothRef.current.y) * lerpSpeed;

      // Floating bob offset
      const bobX = Math.sin(timeRef.current * 0.0013) * 4;
      const bobY = Math.cos(timeRef.current * 0.0019) * 5;

      setSmoothPos({
        x: smoothRef.current.x + bobX,
        y: smoothRef.current.y + bobY,
      });

      // Angle rotation
      setAngle(a => a + 0.25);

      // Spawn trail dots every ~60ms
      if (now - lastTrailRef.current > 55) {
        lastTrailRef.current = now;
        const speed = Math.hypot(
          targetRef.current.x - smoothRef.current.x,
          targetRef.current.y - smoothRef.current.y
        );
        if (speed > 1.5) {
          const newDot: TrailDot = {
            id: dotId++,
            x: smoothRef.current.x + bobX,
            y: smoothRef.current.y + bobY,
            born: now,
            size: 3 + Math.random() * 5,
            color: TRAIL_COLORS[Math.floor(Math.random() * TRAIL_COLORS.length)],
          };
          setTrail(prev => [...prev.slice(-22), newDot]);
        }
      }

      // Expire old trail dots
      setTrail(prev => prev.filter(d => now - d.born < TRAIL_LIFE));

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (!visible) return null;

  const now = performance.now();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      {/* Star trail */}
      {trail.map(dot => {
        const age = now - dot.born;
        const life = 1 - age / TRAIL_LIFE;
        const scale = 0.3 + life * 0.7;
        return (
          <div
            key={dot.id}
            style={{
              position: "absolute",
              left: dot.x,
              top: dot.y,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: dot.color,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: life * 0.85,
              boxShadow: `0 0 ${dot.size * 2}px ${dot.color}`,
              transition: "none",
            }}
          />
        );
      })}

      {/* Neon triangle (rotating) */}
      <svg
        style={{
          position: "absolute",
          left: smoothPos.x,
          top: smoothPos.y,
          transform: `translate(-50%, -50%) rotate(${angle * 0.6}deg)`,
          width: 90,
          height: 90,
          overflow: "visible",
        }}
        viewBox="-45 -45 90 90"
      >
        <defs>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Outer triangle */}
        <polygon
          points="0,-38 33,19 -33,19"
          fill="none"
          stroke="#c084fc"
          strokeWidth="1.5"
          filter="url(#neon-glow)"
          opacity={0.55}
        />
        {/* Inner triangle (inverted, offset) */}
        <polygon
          points="0,30 -26,-15 26,-15"
          fill="none"
          stroke="#67e8f9"
          strokeWidth="1"
          filter="url(#neon-glow)"
          opacity={0.45}
        />
      </svg>

      {/* Astronaut */}
      <div
        style={{
          position: "absolute",
          left: smoothPos.x,
          top: smoothPos.y,
          width: 68,
          height: 68,
          transform: `translate(-50%, -50%) rotate(${Math.sin(timeRef.current * 0.0008) * 8}deg)`,
          filter:
            "drop-shadow(0 0 6px rgba(192,132,252,0.9)) drop-shadow(0 0 18px rgba(129,140,248,0.6)) drop-shadow(0 0 32px rgba(103,232,249,0.3))",
        }}
      >
        <img
          src="/astronaut.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            userSelect: "none",
            WebkitUserDrag: "none" as any,
          }}
          draggable={false}
        />
      </div>

      {/* Pulse ring that expands from astronaut */}
      <PulseRing x={smoothPos.x} y={smoothPos.y} />
    </div>
  );
}

// Subtle expanding ring from cursor position
function PulseRing({ x, y }: { x: number; y: number }) {
  const [rings, setRings] = useState<{ id: number; born: number }[]>([]);
  const lastRing = useRef(0);

  useEffect(() => {
    const now = performance.now();
    if (now - lastRing.current > 1800) {
      lastRing.current = now;
      setRings(prev => [...prev.slice(-3), { id: Date.now(), born: now }]);
    }
  });

  const now = performance.now();

  return (
    <>
      {rings.map(r => {
        const age = now - r.born;
        const life = 1 - Math.min(age / 1600, 1);
        const scale = 1 + (1 - life) * 3;
        return (
          <div
            key={r.id}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "1px solid rgba(192,132,252,0.6)",
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: life * 0.5,
              boxShadow: "0 0 8px rgba(192,132,252,0.4)",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </>
  );
}
