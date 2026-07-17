interface PentagonChartProps {
  values: {
    attraction: number;
    trust: number;
    communication: number;
    tension: number;
    hiddenPotential: number;
  };
  centerLabel: string;
}

const axes = [
  { key: "attraction", label: "吸引" },
  { key: "trust", label: "信任" },
  { key: "communication", label: "溝通" },
  { key: "tension", label: "張力" },
  { key: "hiddenPotential", label: "Hidden" },
] as const;

const point = (index: number, radius: number) => {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / axes.length;
  return {
    x: 80 + Math.cos(angle) * radius,
    y: 80 + Math.sin(angle) * radius,
  };
};

const polygon = (radii: number[]) => radii.map((radius, index) => {
  const item = point(index, radius);
  return `${item.x},${item.y}`;
}).join(" ");

export default function PentagonChart({ values, centerLabel }: PentagonChartProps) {
  const valuePoints = axes.map((axis) => (values[axis.key] / 100) * 55);

  return (
    <div className="pentagon-chart" aria-label="五角星攻略雷達圖">
      <svg viewBox="0 0 160 160" role="img">
        {[55, 42, 29, 16].map((radius) => (
          <polygon className="radar-grid" key={radius} points={polygon(new Array(5).fill(radius))} />
        ))}
        {axes.map((axis, index) => {
          const edge = point(index, 63);
          const label = point(index, 72);
          return (
            <g key={axis.key}>
              <line className="radar-axis" x1="80" y1="80" x2={edge.x} y2={edge.y} />
              <text x={label.x} y={label.y} textAnchor="middle" dominantBaseline="middle">
                {axis.label}
              </text>
            </g>
          );
        })}
        <polygon className="radar-value" points={polygon(valuePoints)} />
        <circle cx="80" cy="80" r="21" />
        <text className="radar-center" x="80" y="80" textAnchor="middle" dominantBaseline="middle">{centerLabel}</text>
      </svg>
    </div>
  );
}
