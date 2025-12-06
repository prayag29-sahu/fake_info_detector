// // app/history/page.tsx
// import React from "react";

// const recentScans = [
//     { id: 1, type: "Text", title: "News Article Analysis", result: "Fake", score: 87, date: "2 hours ago", status: "danger" },
//     { id: 2, type: "Image", title: "Profile Picture Check", result: "Real", score: 95, date: "5 hours ago", status: "success" },
//     { id: 3, type: "URL", title: "Website Verification", result: "Suspicious", score: 65, date: "1 day ago", status: "warning" },
// ];

// export default function HistoryPage() {
//     return (
//         <div>
//             <h1 className="text-3xl font-bold mb-4">Scan History</h1>
//             <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
//                 <table className="w-full">
//                     <thead>
//                         <tr className="border-b border-gray-200 dark:border-gray-700">
//                             <th className="text-left py-3 px-4 text-gray-500">Type</th>
//                             <th className="text-left py-3 px-4 text-gray-500">Title</th>
//                             <th className="text-left py-3 px-4 text-gray-500">Result</th>
//                             <th className="text-left py-3 px-4 text-gray-500">Score</th>
//                             <th className="text-left py-3 px-4 text-gray-500">Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {recentScans.map((s) => (
//                             <tr key={s.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
//                                 <td className="py-4 px-4"><span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">{s.type}</span></td>
//                                 <td className="py-4 px-4 font-medium">{s.title}</td>
//                                 <td className="py-4 px-4">
//                                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${s.status === "success" ? "bg-green-100 text-green-700" : s.status === "danger" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
//                                         {s.result}
//                                     </span>
//                                 </td>
//                                 <td className="py-4 px-4">{s.score}%</td>
//                                 <td className="py-4 px-4 text-gray-500">{s.date}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }



"use client";
import React from "react";

const recentScans = [
    { id: 1, type: "Text", title: "News Article Analysis", result: "Fake", score: 87, date: "2 hours ago", status: "danger" },
    { id: 2, type: "Image", title: "Profile Picture Check", result: "Real", score: 95, date: "5 hours ago", status: "success" },
    { id: 3, type: "URL", title: "Website Verification", result: "Suspicious", score: 65, date: "1 day ago", status: "warning" },
];

export default function HistoryPage() {
    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">Scan History</h1>

            {/* ===========================================================
                      DESKTOP VERSION (TABLE VIEW)
      =========================================================== */}
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
                            {recentScans.map((s) => (
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

            {/* ===========================================================
                        MOBILE VERSION (CARD VIEW)
      =========================================================== */}
            <div className="lg:hidden space-y-4">

                {recentScans.map((s) => (
                    <div
                        key={s.id}
                        className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-4 shadow-sm"
                    >
                        {/* Type Badge */}
                        <div className="flex justify-between items-center mb-2">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                                {s.type}
                            </span>

                            {/* Status Badge */}
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

                        {/* Title */}
                        <h3 className="font-semibold text-lg mb-2">{s.title}</h3>

                        {/* Score */}
                        <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Score</span>
                            <span className="text-sm font-semibold">{s.score}%</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                            <div
                                className={`h-full ${s.score > 90
                                        ? "bg-green-500"
                                        : s.score > 70
                                            ? "bg-yellow-500"
                                            : "bg-red-500"
                                    }`}
                                style={{ width: `${s.score}%` }}
                            />
                        </div>

                        {/* Date Row */}
                        <p className="text-sm text-gray-500 mt-1">{s.date}</p>
                    </div>
                ))}

            </div>
        </div>
    );
}
