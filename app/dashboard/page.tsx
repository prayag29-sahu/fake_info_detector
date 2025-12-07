

"use client";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
} from "recharts";

import {
    Scan,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
} from "lucide-react";

/* ======================================================
                 DATA (same for desktop + mobile)
======================================================= */
const statCards = [
    { label: "Total Scans", value: "2,500", bg: "from-purple-500 to-pink-500", icon: <Scan className="w-6 h-6 text-white" /> },
    { label: "Tickets Sold", value: "2/40", bg: "from-cyan-400 to-blue-500", icon: <CheckCircle className="w-6 h-6 text-white" /> },
    { label: "Add-ons Sold", value: "0/40", bg: "from-orange-400 to-red-400", icon: <AlertTriangle className="w-6 h-6 text-white" /> },
    { label: "Page Views", value: "200K", bg: "from-purple-400 to-blue-400", icon: <TrendingUp className="w-6 h-6 text-white" /> },
];

const donutData = [
    { name: "October", value: 300, color: "#8b5cf6" },
    { name: "November", value: 200, color: "#facc15" },
    { name: "December", value: 150, color: "#06b6d4" },
];

const eventStats = [
    { month: "Jan", website: 100, ticketmaster: 200, eventbrite: 150 },
    { month: "Feb", website: 140, ticketmaster: 180, eventbrite: 170 },
    { month: "Mar", website: 200, ticketmaster: 250, eventbrite: 210 },
    { month: "Apr", website: 240, ticketmaster: 300, eventbrite: 280 },
    { month: "May", website: 260, ticketmaster: 320, eventbrite: 300 },
    { month: "Jun", website: 300, ticketmaster: 350, eventbrite: 330 },
    { month: "Jul", website: 280, ticketmaster: 310, eventbrite: 290 },
];

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
        <div>

            {/* ===========================================================
                     DESKTOP VERSION (full charts + grid layout)
            =========================================================== */}
            <div className="hidden lg:block space-y-10">
                <h1 className="text-4xl font-bold">Dashboard</h1>

                {/* TOP CARDS */}
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

                {/* DONUT + LINE CHART */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* DONUT */}
                    <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-xl border border-white/5 relative">
                        <h2 className="text-xl text-white font-bold mb-4">Event Statistics</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    dataKey="value"
                                    data={donutData}
                                    innerRadius={60}
                                    outerRadius={110}
                                    paddingAngle={5}
                                >
                                    {donutData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* LINE CHART */}
                    <div className="bg-[#1f1f35] rounded-2xl p-6 shadow-xl border border-white/5 relative">
                        <h2 className="text-xl text-white font-bold mb-4">Traffic Analytics</h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={eventStats}>
                                <XAxis dataKey="month" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip />
                                <Line type="monotone" dataKey="website" stroke="#38bdf8" strokeWidth={3} />
                                <Line type="monotone" dataKey="ticketmaster" stroke="#c084fc" strokeWidth={3} />
                                <Line type="monotone" dataKey="eventbrite" stroke="#facc15" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* BOTTOM SECTION */}
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* PROFIT */}
                    <div className="bg-[#1a1a2e] rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl text-white font-bold mb-4">Profit Statistics</h2>
                        <ResponsiveContainer width="100%" height={260}>
                            <LineChart data={eventStats}>
                                <XAxis dataKey="month" stroke="#ccc" />
                                <YAxis stroke="#ccc" />
                                <Tooltip />
                                <Line type="monotone" dataKey="website" stroke="#60a5fa" strokeWidth={3} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* BAR CHART */}
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


            {/* ===========================================================
                     MOBILE / ANDROID VERSION (simple clean UI)
            =========================================================== */}
            <div className="lg:hidden block space-y-10 px-4 pt-6">

                {/* Heading */}
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                {/* MOBILE STAT CARDS */}
                <div className="grid grid-cols-2 gap-4">
                    {statCards.map((s, i) => (
                        <div key={i} className={`rounded-xl p-4 text-white bg-gradient-to-br ${s.bg} shadow`}>
                            <div className="text-xl font-bold">{s.value}</div>
                            <p className="text-white/90 text-sm">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* MOBILE DONUT CHART */}
                <div className="bg-[#1a1a2e] rounded-xl p-4 shadow">
                    <h2 className="text-lg text-white font-semibold mb-3">Event Stats</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={donutData} innerRadius={40} outerRadius={80} dataKey="value">
                                {donutData.map((d, i) => (
                                    <Cell key={i} fill={d.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* MOBILE LINE CHART */}
                <div className="bg-[#1f1f35] rounded-xl p-4 shadow">
                    <h2 className="text-lg text-white font-semibold mb-3">Traffic</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={eventStats}>
                            <XAxis dataKey="month" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip />
                            <Line type="monotone" dataKey="website" stroke="#38bdf8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* MOBILE BAR CHART */}
                <div className="bg-[#1a1a2e] rounded-xl p-4 shadow">
                    <h2 className="text-lg text-white font-semibold mb-3">Weekly Tickets</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={weeklyData}>
                            <XAxis dataKey="day" stroke="#aaa" />
                            <YAxis stroke="#aaa" />
                            <Tooltip />
                            <Bar dataKey="tickets" fill="#facc15" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>

        </div>
    );
}
