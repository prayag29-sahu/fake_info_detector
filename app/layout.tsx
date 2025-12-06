// app/layout.tsx
import "./globals.css";
import React from "react";

import Navbar from "../components/Navbar";

export const metadata = {
  title: "FactChecker AI",
  description: "Detect fake content - text, image, video, url, documents",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen flex bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white transition-colors">

          <div className="flex-1 flex flex-col min-h-screen">
            {/* Navbar (client) */}
            <Navbar />

            {/* Page content */}
            <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
