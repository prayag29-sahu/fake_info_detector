// app/history/page.tsx
import React from "react";

const recentScans = [
    { id: 1, type: "Text", title: "News Article Analysis", result: "Fake", score: 87, date: "2 hours ago", status: "danger" },
    { id: 2, type: "Image", title: "Profile Picture Check", result: "Real", score: 95, date: "5 hours ago", status: "success" },
    { id: 3, type: "URL", title: "Website Verification", result: "Suspicious", score: 65, date: "1 day ago", status: "warning" },
];

export default function HistoryPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Scan History</h1>
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
                        {recentScans.map((s) => (
                            <tr key={s.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                <td className="py-4 px-4"><span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">{s.type}</span></td>
                                <td className="py-4 px-4 font-medium">{s.title}</td>
                                <td className="py-4 px-4">
                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${s.status === "success" ? "bg-green-100 text-green-700" : s.status === "danger" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
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
    );
}
