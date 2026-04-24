"use client";
import React, { useEffect, useState } from "react";
import { historyApi, HistoryItem } from "@/lib/api";
import { useAuth } from "@/lib/useAuth";

function getStatus(verdict?: string): "success" | "danger" | "warning" {
  const label = (verdict || "").toLowerCase();

  if (label.includes("fake")) return "danger";
  if (label.includes("uncertain")) return "warning";
  return "success";
}

function formatDate(ts: string): string {
  if (!ts) return "Unknown";

  const date = new Date(ts);
  const diff = Date.now() - date.getTime();

  const hours = Math.floor(diff / 3_600_000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString();
}

export default function HistoryPage() {
  useAuth();

  const [scans, setScans] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await historyApi.getAll();

        console.log("NEW DATA:", data);

        if (!isMounted) return;

        setScans(prev => {
          if (JSON.stringify(prev) !== JSON.stringify(data)) {
            return [...data];
          }
          return prev;
        });

        setError("");
      } catch (err) {
        console.error("FETCH ERROR:", err);

        if (!isMounted) return;

        setError("Failed to load scan history.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Scan History</h1>
        <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300">
          {error}
        </div>
      </div>
    );
  }

  const displayScans = scans.map((s) => {
    const score =
      s.confidence != null
        ? s.confidence <= 1
          ? Math.round(s.confidence * 100)
          : Math.round(s.confidence)
        : 0;

    const verdict = s.overall_verdict || "fake";

    return {
      id: s.id,
      type: s.scan_type || "Unknown",
      title: s.input_summary || `${s.scan_type} Scan`,
      result: verdict,
      score,
      date: formatDate(s.created_at),
      status: getStatus(verdict),
    };
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Scan History</h1>

      {displayScans.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No scans yet.</p>
          <p className="text-sm mt-1">
            Start analyzing content to see results here.
          </p>
        </div>
      )}

      {/* DESKTOP TABLE */}
      {displayScans.length > 0 && (
        <div className="hidden lg:block">
          <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500">Type</th>
                  <th className="text-left py-3 px-4 text-gray-500">Title</th>
                  <th className="text-left py-3 px-4 text-gray-500">Result</th>
                  <th className="text-left py-3 px-4 text-gray-500">Score</th>
                  <th className="text-left py-3 px-4 text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {displayScans.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="py-4 px-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                        {s.type}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-medium">{s.title}</td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${s.status === "success"
                            ? "bg-green-100 text-green-700"
                            : s.status === "danger"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {s.result}
                      </span>
                    </td>

                    <td className="py-4 px-4">{s.score}%</td>

                    <td className="py-4 px-4 text-gray-500">{s.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MOBILE CARDS */}
      {displayScans.length > 0 && (
        <div className="lg:hidden space-y-4">
          {displayScans.map((s) => (
            <div
              key={s.id}
              className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                  {s.type}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${s.status === "success"
                      ? "bg-green-100 text-green-700"
                      : s.status === "danger"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {s.result}
                </span>
              </div>

              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>

              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500">Score</span>
                <span className="text-sm font-semibold">{s.score}%</span>
              </div>

              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full ${s.score > 80
                      ? "bg-red-500"
                      : s.score > 50
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  style={{ width: `${s.score}%` }}
                />
              </div>

              <p className="text-sm text-gray-500 mt-1">{s.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}