// // app/dashboard/page.tsx
// import React from "react";
// import { AlertTriangle, CheckCircle, TrendingUp, Scan } from "lucide-react";

// const stats = [
//     { label: "Total Scans", value: "1,247", change: "+12%", icon: <Scan className="w-5 h-5" /> },
//     { label: "Fake Detected", value: "89", change: "+8%", icon: <AlertTriangle className="w-5 h-5" /> },
//     { label: "Safe Content", value: "1,158", change: "+15%", icon: <CheckCircle className="w-5 h-5" /> },
//     { label: "Accuracy Rate", value: "99.2%", change: "+2%", icon: <TrendingUp className="w-5 h-5" /> },
// ];

// export default function Dashboard() {
//     return (
//         <div>
//             <div className="mb-8">
//                 <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
//                 <p className="text-gray-600 dark:text-gray-400">Overview of your content verification analytics</p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 {stats.map((s, i) => (
//                     <div key={i} className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
//                         <div className="flex items-start justify-between mb-4">
//                             <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
//                                 {s.icon}
//                             </div>
//                             <span className="text-green-500 text-sm font-medium">{s.change}</span>
//                         </div>
//                         <div className="text-3xl font-bold mb-1">{s.value}</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


"use client";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
} from "recharts";

import { Scan, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";

const statCards = [
    {
        label: "Total Scans",
        value: "2,500",
        bg: "from-purple-500 to-pink-500",
        icon: <Scan className="w-6 h-6 text-white" />,
    },
    {
        label: "Tickets Sold",
        value: "2/40",
        bg: "from-cyan-400 to-blue-500",
        icon: <CheckCircle className="w-6 h-6 text-white" />,
    },
    {
        label: "Add-ons Sold",
        value: "0/40",
        bg: "from-orange-400 to-red-400",
        icon: <AlertTriangle className="w-6 h-6 text-white" />,
    },
    {
        label: "Page Views",
        value: "200K",
        bg: "from-purple-400 to-blue-400",
        icon: <TrendingUp className="w-6 h-6 text-white" />,
    },
];

// Donut Chart Data
const donutData = [
    { name: "October", value: 300, color: "#8b5cf6" },
    { name: "November", value: 200, color: "#facc15" },
    { name: "December", value: 150, color: "#06b6d4" },
];

// Line Chart Data
const eventStats = [
    { month: "Jan", website: 100, ticketmaster: 200, eventbrite: 150 },
    { month: "Feb", website: 140, ticketmaster: 180, eventbrite: 170 },
    { month: "Mar", website: 200, ticketmaster: 250, eventbrite: 210 },
    { month: "Apr", website: 240, ticketmaster: 300, eventbrite: 280 },
    { month: "May", website: 260, ticketmaster: 320, eventbrite: 300 },
    { month: "Jun", website: 300, ticketmaster: 350, eventbrite: 330 },
    { month: "Jul", website: 280, ticketmaster: 310, eventbrite: 290 },
];

// Bar Chart Data
const weeklyData = [
    { day: "Sat", tickets: 600 },
    { day: "Sun", tickets: 500 },
    { day: "Mon", tickets: 450 },
    { day: "Tue", tickets: 700 },
    { day: "Wed", tickets: 650 },
    { day: "Thu", tickets: 400 },
    { day: "Fri", tickets: 550 },
];

export default function Dashboard() {
    return (
        <div className="space-y-10">
            <h1 className="text-4xl font-bold">Dashboard</h1>

            {/* === TOP STAT CARDS === */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((s, i) => (
                    <div
                        key={i}
                        className={`rounded-2xl p-6 text-white bg-gradient-to-br ${s.bg} shadow-xl`}
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-3xl font-bold">{s.value}</div>
                            <div className="p-3 rounded-xl bg-white/20 backdrop-blur-md">{s.icon}</div>
                        </div>
                        <p className="mt-3 text-white/80">{s.label}</p>
                        <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-1 bg-white w-1/2 animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* === MIDDLE GRID (DONUT + LINE) === */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* 🔵 DONUT CHART (Enhanced) */}
                <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-xl border border-white/5 relative overflow-hidden">

                    {/* Neon Back Glow */}
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-600 to-blue-600 blur-3xl"></div>

                    <h2 className="text-xl text-white font-bold mb-4 relative z-10">Event Statistics</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={donutData}
                                innerRadius={60}
                                outerRadius={110}
                                paddingAngle={5}
                                stroke="none"
                                animationDuration={800}
                            >
                                {donutData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>

                            {/* INNER TEXT */}
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                fill="#fff"
                                fontSize="22px"
                                fontWeight="700"
                            >
                                {donutData.reduce((a, b) => a + b.value, 0)}
                            </text>

                            <text
                                x="50%"
                                y="60%"
                                textAnchor="middle"
                                fill="#999"
                                fontSize="12px"
                            >
                                Total Events
                            </text>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* LEGENDS - pill style */}
                    <div className="flex gap-6 justify-center mt-4 relative z-10">
                        {donutData.map((d, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                                <span
                                    className="w-3 h-3 rounded-full shadow-lg"
                                    style={{ backgroundColor: d.color }}
                                />
                                <span className="text-white/80 text-sm">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 🟣 LINE CHART (Enhanced Neon Version) */}
                <div className="bg-[#1f1f35] rounded-2xl p-6 shadow-xl border border-white/5 relative overflow-hidden">

                    {/* Neon Glow */}
                    <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-600 to-yellow-400 blur-3xl"></div>

                    <h2 className="text-xl text-white font-bold mb-4 relative z-10">Traffic Analytics</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={eventStats} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>

                            {/* Axis */}
                            <XAxis dataKey="month" stroke="#777" tick={{ fill: "#aaa" }} />
                            <YAxis stroke="#777" tick={{ fill: "#aaa" }} />

                            {/* Custom Tooltip */}
                            <Tooltip
                                contentStyle={{
                                    background: "#202034",
                                    borderRadius: "10px",
                                    border: "1px solid #333",
                                    color: "#fff"
                                }}
                            />

                            {/* Smooth gradient Lines + Glow */}
                            <defs>
                                <linearGradient id="gradWebsite" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.3} />
                                </linearGradient>

                                <linearGradient id="gradTicket" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#c084fc" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#c084fc" stopOpacity={0.3} />
                                </linearGradient>

                                <linearGradient id="gradEvent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#facc15" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#facc15" stopOpacity={0.3} />
                                </linearGradient>
                            </defs>

                            {/* Lines with glow effect */}
                            <Line
                                type="monotone"
                                dataKey="website"
                                stroke="url(#gradWebsite)"
                                strokeWidth={4}
                                dot={{ r: 5, strokeWidth: 2, fill: "#38bdf8" }}
                                activeDot={{ r: 8 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="ticketmaster"
                                stroke="url(#gradTicket)"
                                strokeWidth={4}
                                dot={{ r: 5, strokeWidth: 2, fill: "#c084fc" }}
                                activeDot={{ r: 8 }}
                            />

                            <Line
                                type="monotone"
                                dataKey="eventbrite"
                                stroke="url(#gradEvent)"
                                strokeWidth={4}
                                dot={{ r: 5, strokeWidth: 2, fill: "#facc15" }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>

                    {/* Custom Legend — pill style */}
                    <div className="flex gap-4 justify-center mt-4 relative z-10">
                        <span className="px-3 py-1 bg-white/10 rounded-full flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#38bdf8]" />
                            <span className="text-white/80 text-sm">Website</span>
                        </span>
                        <span className="px-3 py-1 bg-white/10 rounded-full flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#c084fc]" />
                            <span className="text-white/80 text-sm">Ticketmaster</span>
                        </span>
                        <span className="px-3 py-1 bg-white/10 rounded-full flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#facc15]" />
                            <span className="text-white/80 text-sm">Eventbrite</span>
                        </span>
                    </div>
                </div>
            </div>


            {/* === BOTTOM GRID (AREA + BAR CHART) === */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Area / Profit Chart */}
                <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl text-white font-bold mb-4">Profit Statistics</h2>

                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={eventStats}>
                            <XAxis dataKey="month" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Line type="monotone" dataKey="website" stroke="#60a5fa" strokeWidth={4} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl text-white font-bold mb-4">Tickets per Week</h2>

                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={weeklyData}>
                            <XAxis dataKey="day" stroke="#ccc" />
                            <YAxis stroke="#ccc" />
                            <Tooltip />
                            <Bar dataKey="tickets" fill="#facc15" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
