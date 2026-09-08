import React from "react";

/* ---------- Quality Tree visualization ---------- */
export default function QualityTreeViz({ leaves, caption1, caption2, legend }) {
  return (
    <div
      className="relative rounded-[24px] p-8 lg:p-10"
      style={{
        backgroundColor: "rgba(248,244,236,0.06)",
        border: "1px solid rgba(248,244,236,0.16)",
      }}
    >
      <svg viewBox="0 0 640 400" fill="none" className="w-full h-auto">
        {/* central spine */}
        <line
          x1="320"
          y1="40"
          x2="320"
          y2="360"
          stroke="rgba(248,244,236,0.30)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* root */}
        <g>
          <rect
            x="270"
            y="20"
            width="100"
            height="34"
            rx="17"
            fill="var(--amber)"
          />
          <text
            x="320"
            y="42"
            textAnchor="middle"
            fontFamily="Fraunces, serif"
            fontSize="14"
            fill="var(--ink)"
            fontWeight="500"
          >
            Product Master
          </text>
        </g>

        {/* level 1 — branches */}
        {[
          { x: 110, label: "DHF" },
          { x: 250, label: "DMR" },
          { x: 390, label: "Risk" },
          { x: 530, label: "CAPA" },
        ].map((b, i) => (
          <g key={i}>
            <path
              d={`M 320 54 Q ${320} 110 ${b.x} 150`}
              stroke="rgba(248,244,236,0.45)"
              strokeWidth="1.2"
              fill="none"
            />
            <rect
              x={b.x - 50}
              y="150"
              width="100"
              height="32"
              rx="16"
              fill="rgba(248,244,236,0.10)"
              stroke="rgba(248,244,236,0.35)"
            />
            <text
              x={b.x}
              y="170"
              textAnchor="middle"
              fontFamily="Fraunces, serif"
              fontSize="13"
              fill="var(--paper)"
              fontWeight="500"
            >
              {b.label}
            </text>
          </g>
        ))}

        {/* level 2 — leaves */}
        {[
          { px: 110, items: leaves[0] },
          { px: 250, items: leaves[1] },
          { px: 390, items: leaves[2] },
          { px: 530, items: leaves[3] },
        ].map((g, gi) =>
          g.items.map((t, ti) => {
            const ix = g.px - 60 + ti * 60;
            return (
              <g key={`${gi}-${ti}`}>
                <path
                  d={`M ${g.px} 182 L ${ix} 230`}
                  stroke="rgba(248,244,236,0.30)"
                  strokeWidth="1"
                  fill="none"
                />
                <rect
                  x={ix - 24}
                  y="232"
                  width="48"
                  height="22"
                  rx="11"
                  fill="rgba(74,124,89,0.18)"
                  stroke="rgba(74,124,89,0.45)"
                />
                <text
                  x={ix}
                  y="247"
                  textAnchor="middle"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9"
                  fill="var(--paper)"
                  fontWeight="500"
                >
                  {t}
                </text>
              </g>
            );
          })
        )}

        {/* footnote */}
        <text
          x="320"
          y="328"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="rgba(248,244,236,0.55)"
          letterSpacing="2"
        >
          {caption1}
        </text>
        <text
          x="320"
          y="346"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10"
          fill="rgba(248,244,236,0.45)"
          letterSpacing="2"
        >
          {caption2}
        </text>
      </svg>

      {/* legend */}
      <div
        className="mt-4 flex flex-wrap gap-4 font-mono text-[10.5px] tracking-[0.16em] uppercase"
        style={{ color: "rgba(248,244,236,0.66)" }}
      >
        <span className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--amber)" }}
          />
          {legend[0]}
        </span>
        <span className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "rgba(248,244,236,0.6)" }}
          />
          {legend[1]}
        </span>
        <span className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: "var(--leaf)" }}
          />
          {legend[2]}
        </span>
      </div>
    </div>
  );
}

