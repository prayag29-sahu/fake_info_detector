// components/Navbar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Shield, Sun, Moon, Play, ChevronRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <Link href="/" className="text-lg font-bold">FactChecker AI</Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Fake Content Detection</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="/dashboard" className="px-5 py-2.5 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center gap-2">
                        Start Verification <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
