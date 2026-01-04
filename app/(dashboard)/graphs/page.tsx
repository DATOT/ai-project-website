"use client";

import { useEffect, useState } from "react";
import { createApi } from "@/shared/lib/api";
import { Card } from "@f/graphs/components/ui/card";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const api = createApi();

const COLORS = ["#3b82f6", "#ef4444", "#22c55e", "#f59e0b", "#a855f7"];

const GraphPage = () => {
  const [loading, setLoading] = useState(true);
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  // Fix Recharts hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const u = await api.currentUser();
        const res = await api.getAIAnalysis({ user_id: u.id });

        setAnalyses(res.analyses || []);
      } catch (err) {
        console.error("Failed loading graph data:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (!mounted) return null; // prevents 0px charts on first paint

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading graphs...
      </div>
    );

  if (analyses.length === 0)
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500">No analysis data yet.</p>
      </div>
    );

  // ================================
  // Data transforms
  // ================================

  // 1️⃣ Correct vs Incorrect
  const correctCount = analyses.filter((a) => a.is_correct === 1).length;
  const incorrectCount = analyses.length - correctCount;
  const correctData = [
    { name: "Correct", value: correctCount },
    { name: "Incorrect", value: incorrectCount },
  ];

  // 2️⃣ Topic Distribution
  const topicMap: Record<string, number> = {};
  analyses.forEach((a) => {
    if (!a.topic) return;
    topicMap[a.topic] = (topicMap[a.topic] || 0) + 1;
  });
  const topicData = Object.entries(topicMap).map(([name, value]) => ({
    name,
    value,
  }));

  // 3️⃣ Score Over Time — FIXED date parsing
  const scoreData = analyses.map((a) => ({
    date: new Date(Number(a.created_at)).toLocaleDateString(),
    score: a.score ?? 0,
  }));

  // 4️⃣ Error Frequency
  const errorMap: Record<string, number> = {};
  analyses.forEach((a) => {
    const errs = JSON.parse(a.errors_json || "[]");
    errs.forEach((err: any) => {
      errorMap[err.type] = (errorMap[err.type] || 0) + 1;
    });
  });
  const errorData = Object.entries(errorMap).map(([name, count]) => ({
    name,
    count,
  }));
  console.log("correctData:", correctData);
  console.log("topicData:", topicData);
  console.log("scoreData:", scoreData);
  console.log("errorData:", errorData);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10 min-w-0">
      <a href="/homepage" className="absolute m-2 z-50 btn btn-rounded btn-ghost"> {"<"} </a>
      <h1 className="text-3xl font-bold mb-4">Your Learning Analytics</h1>

      {/* Correct vs Incorrect */}
      <Card className="p-6 shadow-xl bg-base-200 w-full min-w-0 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Correct vs Incorrect</h2>

        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={correctData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {correctData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Topic Distribution Pie */}
      <Card className="p-6 shadow-xl bg-base-200 w-full min-w-0 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Topic Distribution</h2>

        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topicData}
                outerRadius={90}
                cx="50%"
                cy="50%"
                dataKey="value"
              >
                {topicData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Score Over Time */}
      <Card className="p-6 shadow-xl bg-base-200 w-full min-w-0 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Score Over Time</h2>

        <div className="w-full" style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreData}>
              <XAxis dataKey="date" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Most Common Errors */}
      <Card className="p-6 shadow-xl bg-base-200 w-full min-w-0 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Most Common Errors</h2>

        <div className="w-full" style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={errorData}>
              <XAxis
                dataKey="name"
                interval={0}
                angle={-30}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count">
                {errorData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default GraphPage;
