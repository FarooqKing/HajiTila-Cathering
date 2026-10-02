/**
 * Gold line drawing of a marquee setup, split into layers that the
 * EventExperience section "draws" as you scroll (stroke-dashoffset).
 * Every stroked path uses pathLength=1 so progress maps directly to 0–1.
 */

const W = 1600, H = 900, GY = 760; // canvas + ground line

function peaks() {
  const x0 = 360, x1 = 1240, top = 470, n = 3, pw = (x1 - x0) / n;
  let d = "";
  for (let i = 0; i < n; i++) {
    const px = x0 + pw * (i + 0.5), ph = i === 1 ? 250 : 190;
    d += `M${px - pw / 2},${top} Q${px - pw * 0.16},${top - ph * 0.34} ${px},${top - ph} Q${px + pw * 0.16},${top - ph * 0.34} ${px + pw / 2},${top} `;
    d += `M${px},${top - ph} L${px},${top - ph - 26} `;
  }
  return d;
}

function valance() {
  const x0 = 360, x1 = 1240, top = 470, sc = 18;
  let d = `M${x0},${top}`;
  for (let i = 0; i < sc; i++) {
    const a = x0 + ((x1 - x0) * i) / sc, b = x0 + ((x1 - x0) * (i + 1)) / sc;
    d += ` Q${(a + b) / 2},${top + 26} ${b},${top}`;
  }
  return d;
}

function walls() {
  const x0 = 360, x1 = 1240, top = 470;
  let d = `M${x0},${top} L${x0},${GY} M${x1},${top} L${x1},${GY} `;
  const n = 5, ow = (x1 - x0) / n;
  for (let i = 0; i < n; i++) {
    const ox = x0 + ow * i + ow * 0.16, w = ow * 0.68, oy = top + 90;
    d += `M${ox},${GY} L${ox},${oy + 30} Q${ox + w / 2},${oy - 34} ${ox + w},${oy + 30} L${ox + w},${GY} `;
    // tie-back drapes
    d += `M${ox + 4},${oy + 28} Q${ox + w * 0.22},${oy + 120} ${ox + w * 0.08},${GY} M${ox + w - 4},${oy + 28} Q${ox + w * 0.78},${oy + 120} ${ox + w * 0.92},${GY} `;
  }
  return d;
}

function tables() {
  const rows = [
    { y: 805, r: 54, xs: [190, 470, 1130, 1410] },
    { y: 860, r: 66, xs: [330, 800, 1270] },
  ];
  let d = "";
  for (const row of rows) {
    for (const x of row.xs) {
      const ry = row.r * 0.3;
      d += `M${x - row.r},${row.y} A${row.r},${ry} 0 1 0 ${x + row.r},${row.y} A${row.r},${ry} 0 1 0 ${x - row.r},${row.y} `;
      d += `M${x - row.r},${row.y} L${x - row.r * 1.02},${row.y + row.r * 0.62} Q${x},${row.y + row.r * 0.86} ${x + row.r * 1.02},${row.y + row.r * 0.62} L${x + row.r},${row.y} `;
      // chairs behind the table
      for (const t of [-0.78, -0.3, 0.3, 0.78]) {
        const cx = x + t * row.r * 1.1, cy = row.y - ry * 0.9;
        d += `M${cx - 9},${cy} L${cx - 9},${cy - 30} Q${cx},${cy - 38} ${cx + 9},${cy - 30} L${cx + 9},${cy} `;
      }
      // centrepiece
      d += `M${x},${row.y - 2} L${x},${row.y - 34} `;
    }
  }
  return d;
}

function strings() {
  const lines: string[] = [];
  const dots: { x: number; y: number; r: number }[] = [];
  [
    [0, 80, W, 120, 150],
    [0, 150, W, 175, 120],
    [0, 220, W, 240, 90],
  ].forEach(([x0, y0, x1, y1, sag], k) => {
    const mx = (x0 + x1) / 2, my = Math.max(y0, y1) + sag;
    lines.push(`M${x0},${y0} Q${mx},${my} ${x1},${y1}`);
    const n = 30;
    for (let i = 1; i < n; i++) {
      const t = i / n;
      dots.push({ x: (1 - t) ** 2 * x0 + 2 * (1 - t) * t * mx + t * t * x1, y: (1 - t) ** 2 * y0 + 2 * (1 - t) * t * my + t * t * y1, r: 3.2 - k * 0.6 });
    }
  });
  return { lines, dots };
}

function chandeliers() {
  const out: string[] = [];
  const x0 = 360, x1 = 1240, n = 5, ow = (x1 - x0) / n;
  for (let i = 0; i < n; i++) {
    const cx = x0 + ow * (i + 0.5), cy = 600;
    out.push(`M${cx},${560} L${cx},${cy} M${cx - 30},${cy} Q${cx},${cy + 16} ${cx + 30},${cy} M${cx - 20},${cy + 16} Q${cx},${cy + 28} ${cx + 20},${cy + 16} M${cx},${cy + 28} L${cx},${cy + 42}`);
  }
  return out;
}

const S = { ground: 0, tent: 1, tables: 2, lights: 3, glow: 4 } as const;

export function EventLineArt({ refs }: { refs: React.RefObject<(SVGGElement | null)[]> }) {
  const { lines, dots } = strings();
  const set = (i: number) => (el: SVGGElement | null) => { refs.current[i] = el; };
  const stroke = { fill: "none", stroke: "url(#gold-line)", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1 };
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id="gold-line" x1="0" x2="1">
          <stop offset="0" stopColor="#B8860B" />
          <stop offset=".5" stopColor="#E2C46D" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
        <radialGradient id="warm-fill" cx="50%" cy="70%" r="60%">
          <stop offset="0" stopColor="#f6c45a" stopOpacity=".55" />
          <stop offset=".6" stopColor="#d4af37" stopOpacity=".12" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="dot-glow">
          <stop offset="0" stopColor="#fff1c4" />
          <stop offset=".4" stopColor="#f2cf6d" stopOpacity=".6" />
          <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 5 — warm light filling the marquee */}
      <g ref={set(S.glow)} className="exp-fade">
        <ellipse cx="800" cy="640" rx="620" ry="260" fill="url(#warm-fill)" />
      </g>

      {/* 1 — empty ground */}
      <g ref={set(S.ground)} className="exp-draw">
        <path d={`M40,${GY} L${W - 40},${GY}`} {...stroke} />
        <path d={`M200,${GY + 40} L${W - 200},${GY + 40}`} {...stroke} strokeOpacity={0.35} />
      </g>

      {/* 2 — marquee */}
      <g ref={set(S.tent)} className="exp-draw">
        <path d={peaks()} {...stroke} />
        <path d={valance()} {...stroke} />
        <path d={walls()} {...stroke} strokeWidth={1.2} />
      </g>

      {/* 3 — tables & chairs */}
      <g ref={set(S.tables)} className="exp-draw">
        <path d={tables()} {...stroke} strokeWidth={1.2} />
      </g>

      {/* 4 — lights */}
      <g ref={set(S.lights)} className="exp-draw">
        {lines.map((d) => <path key={d} d={d} {...stroke} strokeOpacity={0.5} strokeWidth={1} />)}
        {chandeliers().map((d) => <path key={d} d={d} {...stroke} />)}
        <g className="exp-dots">
          {dots.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={p.r * 4.5} fill="url(#dot-glow)" opacity={0.7} />
              <circle cx={p.x} cy={p.y} r={p.r} fill="#fff1c4" />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
