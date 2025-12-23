"use client";

import { Card } from "@f/graphs/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ScoreLine({
  data,
}: {
  data: { date: string; score: number }[];
}) {
  return (
    <Card className="p-6 shadow-xl bg-base-200 w-full min-w-0">
      <h2 className="text-xl font-semibold mb-4">Score Over Time</h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis domain={[0, 1]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
