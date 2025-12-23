"use client";

import { Card } from "@f/graphs/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { COLORS } from "./constants";

export default function TopicPie({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <Card className="p-6 shadow-xl bg-base-200 w-full min-w-0">
      <h2 className="text-xl font-semibold mb-4">Topic Distribution</h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
