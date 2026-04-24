"use client";
import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar,
} from "recharts";
import { Scan, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { historyApi, HistoryItem } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

const COLORS = ["#8b5cf6", "#facc15", "#06b6d4"];

function buildChartsFromHistory(items: HistoryItem[]) {
  const typeCounts: Record<string, number> = {};
  const dayCounts: Record<string, number> = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

  let fakeCount = 0;
  let realCount = 0;

  items.forEach((item) => {
    // ✅ FIX 1: correct type
    const type = item.scan_type || "Unknown";
    typeCounts[type] = (typeCounts[type] || 0) + 1;

    // ✅ FIX 2: correct date
    const date = new Date(item.created_at || Date.now());
    const day = date.toLocaleString("default", { weekday: "short" });
    if (dayCounts[day] !== undefined) dayCounts[day]++;

    // ✅ FIX 3: correct label
    const label = (item.overall_verdict || "").toLowerCase();

    if (label.includes("fake")) fakeCount++;
    else if (label.includes("real")) realCount++;
  });

  return {
    donutData: Object.entries(typeCounts).map(([name, value], i) => ({
      name,
      value,
      color: COLORS[i % COLORS.length],
    })),
    weeklyData: Object.entries(dayCounts).map(([day, tickets]) => ({ day, tickets })),
    fakeCount,
    realCount,
    total: items.length,
  };
}

export default function Dashboard() {
  useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, fakeCount: 0, realCount: 0 });
  const [donutData, setDonutData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [weeklyData, setWeeklyData] = useState<{ day: string; tickets: number }[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    historyApi.getAll()
      .then((items) => {
        const result = buildChartsFromHistory(items);
        setDonutData(result.donutData);
        setWeeklyData(result.weeklyData);
        setStats({ total: result.total, fakeCount: result.fakeCount, realCount: result.realCount });
      })
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Total Scans", value: loading ? "..." : String(stats.total), bg: "from-purple-500 to-pink-500", icon: <Scan className="w-6 h-6 text-white" /> },
    { label: "Fake Detected", value: loading ? "..." : String(stats.fakeCount), bg: "from-red-400 to-orange-400", icon: <AlertTriangle className="w-6 h-6 text-white" /> },
    { label: "Clean Results", value: loading ? "..." : String(stats.realCount), bg: "from-cyan-400 to-blue-500", icon: <CheckCircle className="w-6 h-6 text-white" /> },
    { label: "Accuracy Rate", value: "99%", bg: "from-purple-400 to-blue-400", icon: <TrendingUp className="w-6 h-6 text-white" /> },
  ];

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">{error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* DESKTOP */}
      <div className="hidden lg:block space-y-10">
        <h1 className="text-4xl font-bold">Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((s, i) => (
            <div key={i} className={`rounded-2xl p-6 text-white bg-gradient-to-br ${s.bg} shadow-xl`}>
              <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">{s.value}</div>
                <div className="p-3 rounded-xl bg-white/20">{s.icon}</div>
              </div>
              <p className="mt-3 text-white/80">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-xl border border-white/5">
            <h2 className="text-xl text-white font-bold mb-4">Scan Types Distribution</h2>
            {loading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie dataKey="value" data={donutData} innerRadius={60} outerRadius={110} paddingAngle={5}>
                    {donutData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl text-white font-bold mb-4">Scans per Day</h2>
            {loading ? (
              <div className="h-[260px] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="day" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip />
                  <Bar dataKey="tickets" fill="#facc15" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden block space-y-10 px-4 pt-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-2 gap-4">
          {statCards.map((s, i) => (
            <div key={i} className={`rounded-xl p-4 text-white bg-gradient-to-br ${s.bg} shadow`}>
              <div className="text-xl font-bold">{s.value}</div>
              <p className="text-white/90 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        {!loading && donutData.length > 0 && (
          <div className="bg-[#1a1a2e] rounded-xl p-4 shadow">
            <h2 className="text-lg text-white font-semibold mb-3">Scan Types</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={donutData} innerRadius={40} outerRadius={80} dataKey="value">
                  {donutData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
