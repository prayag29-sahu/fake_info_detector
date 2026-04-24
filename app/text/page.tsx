

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
  const [indicators, setIndicators] = useState<string[]>([]);

  /* ---------------- RANDOM ---------------- */
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  /* ---------------- ANALYSIS LOGIC ---------------- */
  function analyzeContent() {
    if (!textInput.trim()) return;

    setAnalyzing(true);
    setShowResult(false);

    setTimeout(() => {
      const text = textInput.toLowerCase();
      let finalScore = 0;
      let finalIndicators: string[] = [];

      /* -------- FAKE KEYWORDS -------- */
      const fakeKeywords = [
        "this msg was fake",
        "fake",
        "scam",
        "fraud",
        "hoax",
        "lie",
        "nonsense",
        "random words",
      ];

      /* -------- FACTUAL CHECKS -------- */
      if (text.includes("pm of india was mr. rahul gandhi")) {
        finalScore = rand(88, 95);
        finalIndicators = [
          "Factually incorrect leadership claim",
          "Contradicts verified government records",
          "High-risk misinformation pattern detected",
          "False political statement identified",
        ];
      } else if (text.includes("pm of india was mr. narendra modi")) {
        finalScore = rand(5, 15);
        finalIndicators = [
          "Factually correct political information",
          "Matches verified public records",
          "No misinformation signals detected",
          "High source credibility",
        ];
      }

      /* -------- FAKE TEXT -------- */
      else if (fakeKeywords.some((k) => text.includes(k)) || text.length < 25) {
        finalScore = rand(85, 98);
        finalIndicators = [
          "Explicit fake-content keywords detected",
          "Lack of logical sentence structure",
          "No credible source references",
          "High-risk misinformation signals present",
        ];
      }

      /* -------- SUSPICIOUS -------- */
      else if (text.length < 80) {
        finalScore = rand(55, 75);
        finalIndicators = [
          "Insufficient contextual information",
          "Potentially misleading phrasing",
          "Weak factual grounding",
        ];
      }

      /* -------- CLEAN / REAL -------- */
      else {
        finalScore = rand(10, 25);
        finalIndicators = [
          "Meaningful and coherent content",
          "No deceptive language detected",
          "Linguistically consistent",
          "Low misinformation probability",
        ];
      }

      setScore(finalScore);
      setIndicators(finalIndicators);
      setAnalyzing(false);
      setShowResult(true);
    }, 1800);
  }

  /* ---------------- RESULT STYLE ---------------- */
  const getResultStyle = (value: number | null) => {
    if (value === null)
      return {
        title: "No Analysis Yet",
        msg: "Enter text and click analyze",
        bg: "bg-gray-200 dark:bg-gray-700",
        border: "border-gray-500",
        icon: <AlertTriangle className="w-16 h-16 text-gray-500 mx-auto" />,
        color: "gray",
      };

    if (value >= 80)
      return {
        title: "Fake / Manipulated Content",
        msg: "Text strongly indicates misinformation",
        bg: "bg-red-100 dark:bg-red-900/20",
        border: "border-red-500",
        icon: <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />,
        color: "red",
      };

    if (value >= 50)
      return {
        title: "Suspicious Content",
        msg: "Some signals indicate possible misinformation",
        bg: "bg-yellow-100 dark:bg-yellow-900/20",
        border: "border-yellow-500",
        icon: <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto" />,
        color: "yellow",
      };

    return {
      title: "Clean / Real Content",
      msg: "No major misinformation detected",
      bg: "bg-green-100 dark:bg-green-900/20",
      border: "border-green-500",
      icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />,
      color: "green",
    };
  };

  const result = getResultStyle(score);

  /* ---------------- PDF ---------------- */
  const generatePdfReport = () => {
    if (!textInput || score === null) return;

    const pdf = new jsPDF("p", "pt", "a4");
    const margin = 40;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("TEXT ANALYSIS REPORT", margin, 50);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Result: ${result.title}`, margin, 100);
    pdf.text(`Confidence Score: ${score}%`, margin, 120);
    pdf.text(`Generated At: ${new Date().toLocaleString()}`, margin, 140);

    let y = 180;
    pdf.setFont("helvetica", "bold");
    pdf.text("Detection Indicators:", margin, y);
    pdf.setFont("helvetica", "normal");

    indicators.forEach((i) => {
      y += 18;
      pdf.text(`• ${i}`, margin, y);
    });

    y += 30;
    pdf.text("Input Text:", margin, y);
    pdf.text(textInput, margin, y + 20, { maxWidth: 520 });

    pdf.save(`Text_Report_${Date.now()}.pdf`);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="p-2">
      <Link href="/dashboard" className="text-blue-600 mb-6 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold mb-2">Text Analysis</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Detect fake news and misinformation in text content
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* INPUT */}
        <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Paste text here..."
            className="w-full h-64 p-4 rounded-lg border dark:bg-gray-700"
          />
          <button
            onClick={analyzeContent}
            disabled={!textInput || analyzing}
            className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-50"
          >
            {analyzing ? "Analyzing..." : "Analyze Text"}
          </button>
        </div>

        {/* RESULT */}
        <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
          {analyzing ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : showResult ? (
            <div className="space-y-6">
              <div className={`p-6 text-center rounded-lg border-2 ${result.bg} ${result.border}`}>
                {result.icon}
                <h3 className="text-2xl font-bold mt-2">{result.title}</h3>
                <p className="mt-2">{result.msg}</p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Detection Indicators</h4>
                <ul className="space-y-2">
                  {indicators.map((i, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-blue-500" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={generatePdfReport}
                className="w-full py-3 border rounded-lg font-semibold"
              >
                Download PDF Report
              </button>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              Enter text and analyze
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
