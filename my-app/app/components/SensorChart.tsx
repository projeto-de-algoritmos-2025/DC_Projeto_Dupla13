"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

type SensorChartProps = {
  data: { timestamp: string; value: number }[];
};

function getAQIColor(value: number) {
  if (value <= 50) return "#22c55e";        // verde - Bom
  if (value <= 100) return "#eab308";       // amarelo - Moderado
  if (value <= 150) return "#f97316";       // laranja - Ruim
  return "#ef4444";                         // vermelho - Péssimo
}

export default function SensorChart({ data }: SensorChartProps) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-2">Qualidade do ar (AQI)</h3>

      <LineChart width={800} height={320} data={data}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={getAQIColor(data[data.length - 1].value)}
          strokeWidth={3}
          dot={false}
          animationDuration={900}
          animationEasing="ease-in-out"
        />
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  );
}
