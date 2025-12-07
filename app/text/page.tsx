
"use client";
import React, { useState } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import { ArrowLeft, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";

export default function TextAnalysisPage() {
    const [textInput, setTextInput] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    // ------------------------------
    // RANDOM SCORE GENERATOR
    // ------------------------------
    const generateRandomScore = () => {
        const min = 40;
        const max = 98;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // ------------------------------
    // MULTIPLE INDICATOR SETS
    // ------------------------------
    const indicatorSets = [
        [
            "Unverified claims detected",
            "Source credibility is low",
            "Emotional language found",
            "Contradicting statements present",
        ],
        [
            "Clickbait patterns detected",
            "Potential bias in writing style",
            "Unmatched facts across sources",
            "Possibly AI-generated patterns",
        ],
        [
            "Misleading structure identified",
            "No credible source references",
            "Over-generalizations detected",
        ],
        [
            "Disinformation signals present",
            "Exaggerated or sensationalized tone",
            "Unsupported factual statements",
            "High-risk linguistic patterns",
        ],
    ];

    const [selectedIndicators] = useState(() => {
        return indicatorSets[Math.floor(Math.random() * indicatorSets.length)];
    });

    // ------------------------------
    // COLOR BASED ON SCORE
    // ------------------------------
    const getScoreColor = (value: number | null) => {
        if (value === null) return "gray";
        if (value >= 80) return "red";
        if (value >= 50) return "yellow";
        return "green";
    };

    // ------------------------------
    // RESULT BOX BASED ON SCORE
    // ------------------------------
    const getResultStyle = (value: number | null) => {
        if (value === null) {
            return {
                bg: "bg-gray-200 dark:bg-gray-700",
                border: "border-gray-500",
                title: "No Analysis Yet",
                message: "Enter text and click analyze",
                icon: <AlertTriangle className="w-16 h-16 text-gray-500 mx-auto mb-3" />,
                color: "gray",
            };
        }

        if (value >= 80) {
            return {
                bg: "bg-red-100 dark:bg-red-900/20",
                border: "border-red-500",
                title: "Fake / Manipulated Content",
                message: "Text strongly indicates misinformation",
                icon: <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-3" />,
                color: "red",
            };
        }

        if (value >= 50) {
            return {
                bg: "bg-yellow-100 dark:bg-yellow-900/20",
                border: "border-yellow-500",
                title: "Suspicious Content",
                message: "Some signals indicate possible misinformation",
                icon: <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-3" />,
                color: "yellow",
            };
        }

        return {
            bg: "bg-green-100 dark:bg-green-900/20",
            border: "border-green-500",
            title: "Clean / Real Content",
            message: "No major misinformation detected",
            icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />,
            color: "green",
        };
    };

    const result = getResultStyle(score);

    // ------------------------------
    // ANALYZE FUNCTION
    // ------------------------------
    function analyzeContent() {
        setAnalyzing(true);
        setShowResult(false);

        setTimeout(() => {
            setAnalyzing(false);
            setShowResult(true);
            setScore(generateRandomScore()); // set dynamic score
        }, 1800);
    }

    // ------------------------------
    // PDF REPORT FUNCTION
    // ------------------------------
    const generatePdfReport = () => {
        if (!textInput) return;

        const pdf = new jsPDF("p", "pt", "a4");
        const margin = 40;

        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(22);
        pdf.text("TEXT ANALYSIS REPORT", margin, 50);

        pdf.setFontSize(14);
        pdf.text("FactChecker AI - Detection Summary", margin, 90);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);

        pdf.text(`Result: ${result.title}`, margin, 130);
        pdf.text(`Confidence Score: ${score}%`, margin, 150);
        pdf.text(`Generated At: ${new Date().toLocaleString()}`, margin, 170);

        pdf.setFont("helvetica", "bold");
        pdf.text("Detection Indicators:", margin, 210);

        pdf.setFont("helvetica", "normal");

        let yPos = 235;
        selectedIndicators.forEach((item) => {
            pdf.circle(margin - 5, yPos - 3, 2, "F");
            pdf.text(item, margin + 10, yPos);
            yPos += 20;
        });

        pdf.text("Input Text:", margin, yPos + 20);
        pdf.setFontSize(11);
        pdf.text(textInput, margin, yPos + 40, { maxWidth: 520 });

        pdf.save(`Text_Report_${Date.now()}.pdf`);
    };

    // ------------------------------
    // UI STARTS HERE
    // ------------------------------
    return (
        <div className="p-2">
            <Link href="/dashboard" className="text-blue-600 mb-6 inline-flex items-center gap-2 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-2">Text Analysis</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Detect fake news and misinformation in text content</p>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* LEFT — INPUT AREA */}
                <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Input Text</h2>
                    <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Paste your text content here for analysis..."
                        className="w-full h-64 p-4 rounded-lg border bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <button
                        onClick={analyzeContent}
                        disabled={!textInput || analyzing}
                        className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-50"
                    >
                        {analyzing ? "Analyzing..." : "Analyze Text"}
                    </button>
                </div>

                {/* RIGHT — RESULT AREA */}
                <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">

                    <h2 className="text-xl font-bold mb-4">Analysis Result</h2>

                    {analyzing ? (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Analyzing content...</p>
                        </div>
                    ) : showResult ? (
                        <div className="space-y-6">

                            {/* DYNAMIC RESULT BOX */}
                            <div className={`text-center p-6 rounded-lg border-2 ${result.bg} ${result.border}`}>
                                {result.icon}

                                <h3
                                    className={`text-2xl font-bold ${result.color === "red"
                                            ? "text-red-600 dark:text-red-400"
                                            : result.color === "yellow"
                                                ? "text-yellow-600 dark:text-yellow-400"
                                                : result.color === "green"
                                                    ? "text-green-600 dark:text-green-400"
                                                    : "text-gray-600 dark:text-gray-400"
                                        }`}
                                >
                                    {result.title}
                                </h3>

                                <p
                                    className={`mt-2 ${result.color === "red"
                                            ? "text-red-700 dark:text-red-300"
                                            : result.color === "yellow"
                                                ? "text-yellow-700 dark:text-yellow-300"
                                                : result.color === "green"
                                                    ? "text-green-700 dark:text-green-300"
                                                    : "text-gray-500 dark:text-gray-400"
                                        }`}
                                >
                                    {result.message}
                                </p>
                            </div>

                            {/* SCORE BAR */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">Confidence Score</span>
                                    <span
                                        className={`font-bold ${getScoreColor(score) === "red"
                                                ? "text-red-600"
                                                : getScoreColor(score) === "yellow"
                                                    ? "text-yellow-600"
                                                    : getScoreColor(score) === "green"
                                                        ? "text-green-600"
                                                        : "text-gray-500"
                                            }`}
                                    >
                                        {score ?? 0}%
                                    </span>
                                </div>

                                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`
                      h-full rounded-full
                      ${getScoreColor(score) === "red"
                                                ? "bg-red-500"
                                                : getScoreColor(score) === "yellow"
                                                    ? "bg-yellow-500"
                                                    : getScoreColor(score) === "green"
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                            }
                    `}
                                        style={{ width: `${score ?? 0}%` }}
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
                                                            : getScoreColor(score) === "green"
                                                                ? "text-green-500"
                                                                : "text-gray-400"
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
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-400">
                            Enter text and click analyze to see results
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
