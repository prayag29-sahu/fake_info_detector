// components/Sidebar.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Shield, FileText, Image, Video, Link2, FileCheck, Home, History, User } from "lucide-react";

const navItems = [
    { id: "dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" />, label: "Dashboard" },
    { id: "text", href: "/text", icon: <FileText className="w-5 h-5" />, label: "Text Analysis" },
    { id: "image", href: "/image", icon: <Image className="w-5 h-5" />, label: "Image Detection" },
    { id: "video", href: "/video", icon: <Video className="w-5 h-5" />, label: "Video Analysis" },
    { id: "url", href: "/url", icon: <Link2 className="w-5 h-5" />, label: "URL Scanner" },
    { id: "document", href: "/document", icon: <FileCheck className="w-5 h-5" />, label: "Document Verify" },
    { id: "history", href: "/history", icon: <History className="w-5 h-5" />, label: "Scan History" },
    { id: "profile", href: "/profile", icon: <User className="w-5 h-5" />, label: "Profile" },
];

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <aside className={`border-r w-64 flex-shrink-0 ${sidebarOpen ? "block" : "hidden"} lg:block bg-white dark:bg-gray-800 dark:border-gray-700`}>
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="font-bold">FactChecker AI</div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Detection System</p>
                    </div>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.id} href={item.href} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </aside>
    );
}
