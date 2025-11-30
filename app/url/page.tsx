// // app/url/page.tsx
// "use client";
// import React, { useState } from "react";
// import { ArrowLeft, CheckCircle } from "lucide-react";
// import Link from "next/link";

// export default function URLPage() {
//     const [urlInput, setUrlInput] = useState("");
//     const [scanning, setScanning] = useState(false);
//     const [result, setResult] = useState<null | { status: string; score: number }>(null);

//     function scan() {
//         setScanning(true);
//         setResult(null);
//         setTimeout(() => {
//             setScanning(false);
//             setResult({ status: "Suspicious", score: 65 });
//         }, 1500);
//     }

//     return (
//         <div>
//             <Link href="/dashboard" className="text-blue-600 mb-6 inline-block"><ArrowLeft className="w-4 h-4 inline mr-1" /> Back to Dashboard</Link>

//             <h1 className="text-3xl font-bold mb-2">URL Scanner</h1>
//             <p className="text-gray-600 dark:text-gray-400 mb-8">Detect phishing attempts and malicious websites</p>

//             <div className="grid lg:grid-cols-2 gap-6">
//                 <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
//                     <h2 className="text-xl font-bold mb-4">Enter URL</h2>
//                     <input
//                         type="url"
//                         value={urlInput}
//                         onChange={(e) => setUrlInput(e.target.value)}
//                         placeholder="https://example.com"
//                         className="w-full p-4 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none mb-4 dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <button onClick={scan} disabled={!urlInput || scanning} className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold">
//                         {scanning ? "Scanning..." : "Scan URL"}
//                     </button>
//                 </div>

//                 <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
//                     <h2 className="text-xl font-bold mb-4">Scan Result</h2>
//                     {!result ? (
//                         <div className="flex items-center justify-center h-64 text-gray-400">Enter a URL to start scanning</div>
//                     ) : (
//                         <div>
//                             <div className="flex items-center gap-3 mb-4">
//                                 <CheckCircle className="w-8 h-8 text-yellow-500" />
//                                 <div>
//                                     <div className="font-bold">{result.status}</div>
//                                     <div className="text-sm text-gray-500 dark:text-gray-400">{result.score}% suspicious</div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }



"use client";
import React, { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import {
    ArrowLeft,
    AlertTriangle,
    AlertCircle,
    CheckCircle,
    Link2,
} from "lucide-react";

export default function URLPage() {
    const [urlInput, setUrlInput] = useState("");
    const [scanning, setScanning] = useState(false);
    const [score, setScore] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    // --------------------------
    // RANDOM SCORE GENERATOR
    // --------------------------
    const generateRandomScore = () => {
        const min = 30;
        const max = 95;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // --------------------------
    // INDICATOR SETS
    // --------------------------
    const indicatorSets = [
        [
            "Untrusted domain registrar",
            "SSL certificate mismatch",
            "Suspicious redirect patterns",
            "Phishing-like URL structure",
        ],
        [
            "Unsafe external scripts detected",
            "Low website reputation score",
            "IP-based domain usage found",
        ],
        [
            "Multiple pop-up redirects",
            "Hidden malicious iframe detected",
            "URL contains encoded payload",
            "Domain flagged by threat list",
        ],
        [
            "Fake login pattern detected",
            "High-risk phishing signature",
            "Malware-associated domain history",
            "Unusual traffic fingerprint",
        ],
    ];

    const [selectedIndicators] = useState(() => {
        return indicatorSets[Math.floor(Math.random() * indicatorSets.length)];
    });

    // --------------------------
    // COLOR BASED ON SCORE
    // --------------------------
    const getScoreColor = (value: number | null) => {
        if (value === null) return "gray";
        if (value >= 80) return "red";
        if (value >= 50) return "yellow";
        return "green";
    };

    // --------------------------
    // RESULT BOX STYLE
    // --------------------------
    const getResult = (value: number | null) => {
        if (value === null) {
            return {
                bg: "bg-gray-200 dark:bg-gray-700",
                border: "border-gray-500",
                title: "No Scan Performed",
                message: "Enter a URL and scan",
                icon: (
                    <AlertTriangle className="w-16 h-16 text-gray-500 mx-auto mb-3" />
                ),
                color: "gray",
            };
        }

        if (value >= 80) {
            return {
                bg: "bg-red-100 dark:bg-red-900/20",
                border: "border-red-500",
                title: "Dangerous URL",
                message: "This website is highly suspicious or malicious",
                icon: <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-3" />,
                color: "red",
            };
        }

        if (value >= 50) {
            return {
                bg: "bg-yellow-100 dark:bg-yellow-900/20",
                border: "border-yellow-500",
                title: "Suspicious URL",
                message: "This URL shows signs of phishing activity",
                icon: (
                    <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                ),
                color: "yellow",
            };
        }

        return {
            bg: "bg-green-100 dark:bg-green-900/20",
            border: "border-green-500",
            title: "Safe URL",
            message: "No major threat or phishing detected",
            icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />,
            color: "green",
        };
    };

    const result = getResult(score);

    // --------------------------
    // SCAN FUNCTION
    // --------------------------
    const scan = () => {
        setScanning(true);
        setShowResult(false);

        setTimeout(() => {
            setScanning(false);
            setScore(generateRandomScore());
            setShowResult(true);
        }, 1800);
    };

    // --------------------------
    // PDF DOWNLOAD
    // --------------------------
    const generatePdfReport = () => {
        if (!urlInput) return;

        const pdf = new jsPDF();
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(20);
        pdf.text("URL ANALYSIS REPORT", 20, 30);

        pdf.setFontSize(12);
        pdf.text(`URL Scanned: ${urlInput}`, 20, 60);
        pdf.text(`Status: ${result.title}`, 20, 80);
        pdf.text(`Risk Score: ${score}%`, 20, 100);
        pdf.text(`Generated At: ${new Date().toLocaleString()}`, 20, 120);

        pdf.text("Indicators Detected:", 20, 150);
        let yPos = 170;
        selectedIndicators.forEach((item) => {
            pdf.circle(15, yPos - 3, 2, "F");
            pdf.text(item, 25, yPos);
            yPos += 20;
        });

        pdf.save(`URL_Report_${Date.now()}.pdf`);
    };

    // --------------------------
    // UI STARTS HERE
    // --------------------------
    return (
        <div>
            <Link href="/dashboard" className="text-blue-600 mb-6 inline-flex items-center gap-2 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-2">URL Scanner</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Detect phishing attempts and malicious websites
            </p>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* LEFT — INPUT */}
                <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Enter URL</h2>

                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full p-4 rounded-lg border bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                    />

                    <button
                        onClick={scan}
                        disabled={!urlInput || scanning}
                        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold disabled:opacity-50"
                    >
                        {scanning ? "Scanning..." : "Scan URL"}
                    </button>
                </div>

                {/* RIGHT — RESULTS */}
                <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Scan Result</h2>

                    {/* LOADER */}
                    {scanning && (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Scanning URL...</p>
                        </div>
                    )}

                    {/* RESULT */}
                    {!scanning && showResult && score !== null && (
                        <div className="space-y-6">

                            {/* DYNAMIC RESULT BOX */}
                            <div className={`text-center p-6 rounded-lg border-2 ${result.bg} ${result.border}`}>
                                {result.icon}
                                <h3 className={`text-2xl font-bold ${result.color === "red"
                                        ? "text-red-600 dark:text-red-400"
                                        : result.color === "yellow"
                                            ? "text-yellow-600 dark:text-yellow-400"
                                            : result.color === "green"
                                                ? "text-green-600 dark:text-green-400"
                                                : "text-gray-600 dark:text-gray-400"
                                    }`}>
                                    {result.title}
                                </h3>
                                <p className={`mt-2 ${result.color === "red"
                                        ? "text-red-700 dark:text-red-300"
                                        : result.color === "yellow"
                                            ? "text-yellow-700 dark:text-yellow-300"
                                            : result.color === "green"
                                                ? "text-green-700 dark:text-green-300"
                                                : "text-gray-500 dark:text-gray-400"
                                    }`}>
                                    {result.message}
                                </p>
                            </div>

                            {/* SCORE */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">Risk Score</span>
                                    <span className={`font-bold ${getScoreColor(score) === "red"
                                            ? "text-red-600"
                                            : getScoreColor(score) === "yellow"
                                                ? "text-yellow-600"
                                                : "text-green-600"
                                        }`}>
                                        {score}%
                                    </span>
                                </div>

                                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full ${getScoreColor(score) === "red"
                                                ? "bg-red-500"
                                                : getScoreColor(score) === "yellow"
                                                    ? "bg-yellow-500"
                                                    : "bg-green-500"
                                            }`}
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                            </div>

                            {/* INDICATORS */}
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-bold mb-3">Detection Indicators:</h4>
                                <ul className="space-y-2">
                                    {selectedIndicators.map((indicator, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <AlertCircle
                                                className={`w-4 h-4 ${getScoreColor(score) === "red"
                                                        ? "text-red-500"
                                                        : getScoreColor(score) === "yellow"
                                                            ? "text-yellow-500"
                                                            : "text-green-500"
                                                    }`}
                                            />
                                            <span className="text-sm">{indicator}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* PDF DOWNLOAD */}
                            <button
                                onClick={generatePdfReport}
                                className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Download Detailed Report (PDF)
                            </button>
                        </div>
                    )}

                    {/* DEFAULT MESSAGE */}
                    {!scanning && !showResult && (
                        <div className="flex items-center justify-center h-64 text-gray-400">
                            Enter a URL to start scanning
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
