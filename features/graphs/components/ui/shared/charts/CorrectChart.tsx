"use client";

import { Card } from "@f/graphs/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { COLORS } from "./constants";

export default function CorrectChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <Card className="p-6 shadow-xl bg-base-200 w-full min-w-0">
      <h2 className="text-xl font-semibold mb-4">Correct vs Incorrect</h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
