/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { ArrowLeft, User, Mail, Shield, Edit3, Lock, LogOut, Calendar, Camera } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const [name, setName] = useState("Prayag Sahu");
    const [email, setEmail] = useState("prayagsahu@example.com");
    const [role] = useState("Administrator");
    const [editing, setEditing] = useState(false);

    return (
        <div>
            {/* Back Button */}
            <Link
                href="/dashboard"
                className="text-blue-600 mb-6 inline-flex items-center gap-2 hover:underline"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            {/* Page Title */}
            <h1 className="text-3xl font-bold mb-2">User Profile</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Manage your personal information, account settings, and privacy.
            </p>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* LEFT CARD — User Info */}
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                    <div className="flex flex-col items-center text-center">

                        {/* Profile Picture */}
                        <div className="relative group">
                            <img
                                src="https://ui-avatars.com/api/?name=P+S&background=0D8ABC&color=fff&size=120"
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-md"
                            />
                            <button
                            title="profile picture"    className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md hover:bg-blue-700 transition">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <h2 className="text-2xl font-bold mt-4">{name}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{email}</p>

                        {/* Role */}
                        <span className="mt-3 inline-block px-4 py-1 text-sm rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                            {role}
                        </span>

                        {/* Buttons */}
                        <button
                            onClick={() => setEditing(!editing)}
                            className="mt-4 w-full px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            <Edit3 className="w-4 h-4" /> Edit Profile
                        </button>

                        <button className="mt-2 w-full px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2">
                            <LogOut className="w-4 h-4 text-red-500" /> Logout
                        </button>
                    </div>
                </div>

                {/* MIDDLE CARD — Personal Info Form */}
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6 lg:col-span-2">
                    <h2 className="text-xl font-bold mb-6">Personal Information</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div>
                            <label className="font-medium block mb-2">Full Name</label>
                            <input
                                placeholder="Enter your Full Name"
                                type="text"
                                disabled={!editing}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 ${editing ? "border-blue-500" : "opacity-60 cursor-not-allowed"
                                    }`}
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="font-medium block mb-2">Email Address</label>
                            <input
                                placeholder="Enter your Email Address"
                                type="email"
                                disabled={!editing}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full p-3 rounded-lg border bg-gray-50 dark:bg-gray-700 dark:border-gray-600 ${editing ? "border-blue-500" : "opacity-60 cursor-not-allowed"
                                    }`}
                            />
                        </div>
                    </div>

                    {editing && (
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => setEditing(false)}
                                className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                            >
                                Save Changes
                            </button>

                            <button
                                onClick={() => setEditing(false)}
                                className="px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

            </div>

            {/* BOTTOM SECTION — Security + Activity */}
            <div className="grid lg:grid-cols-2 gap-6 mt-8">

                {/* SECURITY SETTINGS */}
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Security Settings</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-blue-600" />
                                <span className="font-medium">Change Password</span>
                            </div>
                            <button className="text-blue-600 hover:underline">Update</button>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Two-Factor Authentication</span>
                            </div>
                            <button className="text-blue-600 hover:underline">Enable</button>
                        </div>
                    </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6">Recent Activity</h2>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
                            >
                                <Calendar className="w-6 h-6 text-purple-600" />
                                <div>
                                    <p className="font-medium">Logged in from Chrome</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {i} day(s) ago
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </div>
    );
}
