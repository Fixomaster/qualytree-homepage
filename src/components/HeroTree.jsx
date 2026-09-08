import React from "react";

/* ---------- Hero Tree ---------- */
export default function HeroTree() {
  return (
    <div className="relative w-full max-w-[520px] ml-auto">
      <svg
        viewBox="0 0 520 560"
        fill="none"
        className="w-full h-auto"
        style={{ display: "block" }}
      >
        {/* ground line */}
        <line
          x1="40"
          y1="510"
          x2="480"
          y2="510"
          stroke="rgba(20,58,44,0.25)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {/* trunk */}
        <path
          d="M260 510 C 256 460, 256 410, 260 360 S 264 240, 260 130"
          stroke="var(--moss)"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="draw-line"
        />

        {/* branches L */}
        <path
          d="M260 380 C 220 372, 180 362, 140 340"
          stroke="var(--moss)"
          strokeWidth="1.7"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.2s" }}
        />
        <path
          d="M260 310 C 215 304, 170 296, 130 280"
          stroke="var(--moss)"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.4s" }}
        />
        <path
          d="M260 240 C 220 232, 180 220, 145 198"
          stroke="var(--moss)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.6s" }}
        />
        <path
          d="M260 175 C 230 165, 200 155, 175 140"
          stroke="var(--moss)"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.8s" }}
        />

        {/* branches R */}
        <path
          d="M260 360 C 305 352, 350 340, 390 318"
          stroke="var(--moss)"
          strokeWidth="1.7"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.3s" }}
        />
        <path
          d="M260 285 C 305 280, 350 270, 395 252"
          stroke="var(--moss)"
          strokeWidth="1.6"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.5s" }}
        />
        <path
          d="M260 215 C 300 205, 345 192, 380 170"
          stroke="var(--moss)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.7s" }}
        />
        <path
          d="M260 150 C 295 140, 330 132, 360 122"
          stroke="var(--moss)"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="draw-line"
          style={{ animationDelay: "0.9s" }}
        />

        {/* nodes (leaves) */}
        {[
          { x: 140, y: 340, label: "DHF", c: "var(--leaf)", d: 1.0 },
          { x: 130, y: 280, label: "DMR", c: "var(--moss-mid)", d: 1.1 },
          { x: 145, y: 198, label: "CAPA", c: "var(--amber)", d: 1.2 },
          { x: 175, y: 140, label: "510(k)", c: "var(--leaf)", d: 1.3 },
          { x: 390, y: 318, label: "SOP", c: "var(--moss-mid)", d: 1.05 },
          { x: 395, y: 252, label: "Risk", c: "var(--amber)", d: 1.15 },
          { x: 380, y: 170, label: "MDR", c: "var(--leaf)", d: 1.25 },
          { x: 360, y: 122, label: "KGMP", c: "var(--moss-mid)", d: 1.35 },
          { x: 260, y: 130, label: "QMS", c: "var(--amber)", d: 0.9 },
        ].map((n, i) => (
          <g key={i} className="leaf-in" style={{ animationDelay: `${n.d}s` }}>
            <circle cx={n.x} cy={n.y} r="14" fill="var(--paper)" />
            <circle
              cx={n.x}
              cy={n.y}
              r="13"
              fill="none"
              stroke={n.c}
              strokeWidth="1.4"
            />
            <text
              x={n.x}
              y={n.y + 3.5}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="9"
              fill="var(--ink)"
              fontWeight="500"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* root hint */}
        <path
          d="M260 510 C 240 530, 215 542, 195 548"
          stroke="rgba(20,58,44,0.35)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="2 3"
        />
        <path
          d="M260 510 C 280 530, 305 542, 325 548"
          stroke="rgba(20,58,44,0.35)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="2 3"
        />

        {/* annotation */}
        <g
          className="leaf-in"
          style={{ animationDelay: "1.5s", transformOrigin: "center" }}
        >
          <line
            x1="416"
            y1="252"
            x2="478"
            y2="252"
            stroke="rgba(20,58,44,0.4)"
            strokeWidth="1"
          />
          <text
            x="482"
            y="248"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="1"
          >
            ISO 14971
          </text>
          <text
            x="482"
            y="260"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="1"
          >
            risk node
          </text>
        </g>

        <g className="leaf-in" style={{ animationDelay: "1.7s" }}>
          <line
            x1="42"
            y1="340"
            x2="125"
            y2="340"
            stroke="rgba(20,58,44,0.4)"
            strokeWidth="1"
          />
          <text
            x="42"
            y="334"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="1"
          >
            DESIGN HISTORY
          </text>
          <text
            x="42"
            y="346"
            fontFamily="JetBrains Mono, monospace"
            fontSize="9"
            fill="var(--ink-soft)"
            letterSpacing="1"
          >
            21 CFR 820.30
          </text>
        </g>
      </svg>
    </div>
  );
}

