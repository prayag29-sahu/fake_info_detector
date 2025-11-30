/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// // app/image/page.tsx
// "use client";
// import React from "react";
// import Link from "next/link";
// import { ArrowLeft, Upload } from "lucide-react";

// export default function ImagePage() {
//     return (
//         <div>
//             <Link href="/dashboard" className="text-blue-600 mb-6 inline-block"><ArrowLeft className="w-4 h-4 inline mr-1" /> Back to Dashboard</Link>

//             <h1 className="text-3xl font-bold mb-2">Image Detection</h1>
//             <p className="text-gray-600 dark:text-gray-400 mb-8">Identify manipulated, edited, or AI-generated images</p>

//             <div className="grid lg:grid-cols-2 gap-6">
//                 <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
//                     <h2 className="text-xl font-bold mb-4">Upload Image</h2>
//                     <div className="border-2 border-dashed rounded-lg p-12 text-center dark:border-gray-600 dark:bg-gray-700">
//                         <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//                         <p className="font-medium mb-2">Drag & Drop Image</p>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>
//                         <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold">Choose File</button>
//                     </div>
//                     <button className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold">Analyze Image</button>
//                 </div>

//                 <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
//                     <h2 className="text-xl font-bold mb-4">Detection Result</h2>
//                     <div className="flex items-center justify-center h-64 text-gray-400">Upload an image to start analysis</div>
//                 </div>
//             </div>
//         </div>
//     );
// }


"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Image as ImageIcon, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";


export default function ImageDetectionPage() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    // Handle Image Upload
    const handleImageUpload = (e: any) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload a valid image file!");
            return;
        }

        setImageFile(file);
        setPreview(URL.createObjectURL(file));
        setShowResult(false);
    };

    // Mock AI Analysis Function
    const analyzeImage = () => {
        setAnalyzing(true);
        setShowResult(false);

        setTimeout(() => {
            setAnalyzing(false);
            setShowResult(true);
            setScore(generateRandomScore()); // NEW
        }, 2500);
    };

    const generatePdfReport = async () => {
        if (!imageFile) return;

        const pdf = new jsPDF("p", "pt", "a4");
        const margin = 40;

        // ---- Title ----
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(22);
        pdf.text("IMAGE ANALYSIS REPORT", margin, 50);

        // ---- Section Header ----
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("FactChecker AI Detection Summary", margin, 90);

        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);

        // ---- Basic Details ----
        pdf.text(`File Name: ${imageFile.name}`, margin, 130);
        pdf.text(`Result: Manipulated Image`, margin, 150);
        pdf.text(`Manipulation Score: 82%`, margin, 170);
        pdf.text(`Generated At: ${new Date().toLocaleString()}`, margin, 190);

        // ---- Indicators ----
        pdf.setFont("helvetica", "bold");
        pdf.text("Detection Indicators:", margin, 230);

        pdf.setFont("helvetica", "normal");
        const indicators = [
            "Noise inconsistencies detected",
            "Lighting mismatch found",
            "Pixel-level editing detected",
            "AI generative patterns identified",
        ];

        let yPos = 255;
        indicators.forEach((indicator) => {
            pdf.circle(margin - 5, yPos - 3, 2, "F");
            pdf.text(indicator, margin + 5, yPos);
            yPos += 20;
        });

        // ---- Add Uploaded Image Preview ----
        if (preview) {
            const img = new Image();
            img.src = preview;

            await new Promise((resolve) => {
                img.onload = () => {
                    const maxWidth = 450;
                    const ratio = img.height / img.width;
                    const height = maxWidth * ratio;

                    pdf.addImage(img, "JPEG", margin, yPos + 20, maxWidth, height);
                    resolve(true);
                };
            });
        }

        // ---- Download PDF ----
        pdf.save(`Image_Report_${Date.now()}.pdf`);
    };

    const indicatorSets = [
        [
            "Noise inconsistencies detected",
            "Lighting mismatch found",
            "Pixel-level editing detected",
            "AI generative patterns identified",
        ],
        [
            "Depth map inconsistency found",
            "Unnatural edge smoothing detected",
            "Color histogram irregularities",
            "Facial region blending artifacts",
            "GAN fingerprint traces identified",
        ],
        [
            "Metadata manipulation detected",
            "Mismatch between EXIF camera model and pixel signature",
            "Suspicious compression blocks",
            "Unnatural shadow formation detected",
        ],
        [
            "AI-based reconstruction patterns found",
            "Hair strand mismatches",
            "Skin texture inconsistencies",
            "Fractal noise pattern anomaly",
            "Irregular color gradients detected",
        ],
    ];
    const [selectedIndicators] = useState(() => {
        return indicatorSets[Math.floor(Math.random() * indicatorSets.length)];
    });

    const generateRandomScore = () => {
        // You can tweak ranges for realism
        // Fake result range: 60% – 98%
        const min = 60;
        const max = 98;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const getScoreColor = (value: number | null) => {
        if (value === null) return "gray"; // default state before analysis
        if (value >= 80) return "red";
        if (value >= 50) return "yellow";
        return "green";
    };
    const getResultStyle = (value: number | null) => {
        if (value === null) {
            return {
                color: "gray",
                bg: "bg-gray-200 dark:bg-gray-700",
                border: "border-gray-500",
                title: "No Analysis Yet",
                message: "Upload an image and analyze",
                iconColor: "text-gray-500",
                icon: <AlertTriangle className="w-16 h-16 text-gray-500 mx-auto mb-3" />,
            };
        }

        if (value >= 80) {
            return {
                color: "red",
                bg: "bg-red-100 dark:bg-red-900/20",
                border: "border-red-500",
                title: "Manipulated Image",
                message: "This image shows strong signs of editing",
                iconColor: "text-red-500",
                icon: <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-3" />,
            };
        }

        if (value >= 50) {
            return {
                color: "yellow",
                bg: "bg-yellow-100 dark:bg-yellow-900/20",
                border: "border-yellow-500",
                title: "Suspicious Image",
                message: "Some signs of possible manipulation detected",
                iconColor: "text-yellow-500",
                icon: <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-3" />,
            };
        }

        return {
            color: "green",
            bg: "bg-green-100 dark:bg-green-900/20",
            border: "border-green-500",
            title: "Clean / Real Image",
            message: "No significant manipulation detected",
            iconColor: "text-green-500",
            icon: <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />,
        };
    };

    const result = getResultStyle(score);
    const getIndicatorColor = (value: number | null) => {
        if (value === null) return "gray";

        if (value >= 80) return "red";
        if (value >= 50) return "yellow";
        return "green";
    };

    return (
        <div>
            {/* Back button */}
            <Link href="/dashboard" className="text-blue-600 mb-6 inline-flex items-center gap-2 hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>

            <h1 className="text-3xl font-bold mb-2">Image Detection</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Detect edited, manipulated, AI-generated, or fake images.
            </p>

            <div className="grid lg:grid-cols-2 gap-6">

                {/* LEFT SIDE — UPLOAD BOX */}
                <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Upload Image</h2>

                    <label className="cursor-pointer">
                        <div className="border-2 border-dashed rounded-lg p-10 text-center dark:border-gray-600 dark:bg-gray-700">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Uploaded Preview"
                                    className="mx-auto mb-4 rounded-lg shadow-md max-h-60 object-cover"
                                />
                            ) : (
                                <>
                                    <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                    <p className="font-medium mb-2">Drag & Drop Image</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or click to browse</p>
                                </>
                            )}

                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

                            <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                                Choose File
                            </button>
                        </div>
                    </label>

                    <button
                        disabled={!imageFile || analyzing}
                        onClick={analyzeImage}
                        className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold disabled:opacity-50"
                    >
                        {analyzing ? "Analyzing..." : "Analyze Image"}
                    </button>
                </div>

                {/* RIGHT SIDE — RESULTS */}
                <div className="bg-white border rounded-xl p-6 dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Detection Result</h2>

                    {/* No image uploaded */}
                    {!imageFile && !analyzing && !showResult && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                            <ImageIcon className="w-16 h-16 opacity-40 mb-4" />
                            <p>Upload an image to start analysis</p>
                        </div>
                    )}

                    {/* Loader */}
                    {analyzing && (
                        <div className="flex flex-col items-center justify-center h-64">
                            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">Analyzing image…</p>
                        </div>
                    )}

                    {/* Show Result */}
                    {showResult && !analyzing && (
                        <div className="space-y-6">
                            {/* Fake Detected Box */}
                            <div className={`text-center p-6 rounded-lg border-2 ${result.bg} ${result.border}`}>
                                {result.icon}

                                <h3 className={`text-2xl font-bold 
    ${result.color === "red" ? "text-red-600 dark:text-red-400" : ""}
    ${result.color === "yellow" ? "text-yellow-600 dark:text-yellow-400" : ""}
    ${result.color === "green" ? "text-green-600 dark:text-green-400" : ""}
    ${result.color === "gray" ? "text-gray-600 dark:text-gray-400" : ""}
  `}>
                                    {result.title}
                                </h3>

                                <p
                                    className={`
      mt-1 
      ${result.color === "red" ? "text-red-700 dark:text-red-300" : ""}
      ${result.color === "yellow" ? "text-yellow-700 dark:text-yellow-300" : ""}
      ${result.color === "green" ? "text-green-700 dark:text-green-300" : ""}
      ${result.color === "gray" ? "text-gray-500 dark:text-gray-400" : ""}
    `}
                                >
                                    {result.message}
                                </p>
                            </div>

                            {/* Confidence Score */}
                            <div>
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium">Manipulation Score</span>

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


                            </div>

                            {/* Indicators */}
                            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                                <h4 className="font-bold mb-3">Detection Indicators:</h4>
                                <ul className="space-y-2">
                                    {selectedIndicators.map((indicator, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <AlertCircle
                                                className={`w-4 h-4 ${getIndicatorColor(score) === "red"
                                                        ? "text-red-500"
                                                        : getIndicatorColor(score) === "yellow"
                                                            ? "text-yellow-500"
                                                            : getIndicatorColor(score) === "green"
                                                                ? "text-green-500"
                                                                : "text-gray-400"
                                                    }`}
                                            />

                                            <span className="text-sm">{indicator}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            <button
                                onClick={generatePdfReport}
                                className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                Download Detailed Report
                            </button>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
