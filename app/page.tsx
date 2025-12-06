/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// "use client"

// import React, { useState } from 'react';
// import { Shield, FileText, Image, Video, Link, FileCheck, CheckCircle, Zap, Lock, AlertTriangle, Menu, X, Moon, Sun, ChevronRight, Upload, Scan, Database, BarChart3, Download, Play, Eye, Search, Activity, Home, History, Settings, User, LogOut, TrendingUp, AlertCircle, Clock, FileImage, FileVideo, Link2, File, Plus, ArrowLeft } from 'lucide-react';

// const FactCheckerPlatform = () => {
//   const [isDark, setIsDark] = useState(false);
//   const [currentPage, setCurrentPage] = useState('home');
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Analysis states
//   const [textInput, setTextInput] = useState('');
//   const [urlInput, setUrlInput] = useState('');
//   const [analyzing, setAnalyzing] = useState(false);
//   const [showResult, setShowResult] = useState(false);

//   const toggleTheme = () => setIsDark(!isDark);
//   const navigateTo = (page: React.SetStateAction<string>) => {
//     setCurrentPage(page);
//     setMobileMenuOpen(false);
//     setShowResult(false);
//   };

//   // Mock analysis function
//   const analyzeContent = () => {
//     setAnalyzing(true);
//     setTimeout(() => {
//       setAnalyzing(false);
//       setShowResult(true);
//     }, 3000);
//   };

//   const dashboardStats = [
//     { label: 'Total Scans', value: '1,247', change: '+12%', icon: <Scan className="w-5 h-5" />, color: 'blue' },
//     { label: 'Fake Detected', value: '89', change: '+8%', icon: <AlertTriangle className="w-5 h-5" />, color: 'red' },
//     { label: 'Safe Content', value: '1,158', change: '+15%', icon: <CheckCircle className="w-5 h-5" />, color: 'green' },
//     { label: 'Accuracy Rate', value: '99.2%', change: '+2%', icon: <TrendingUp className="w-5 h-5" />, color: 'purple' }
//   ];

//   const recentScans = [
//     { id: 1, type: 'Text', title: 'News Article Analysis', result: 'Fake', score: 87, date: '2 hours ago', status: 'danger' },
//     { id: 2, type: 'Image', title: 'Profile Picture Check', result: 'Real', score: 95, date: '5 hours ago', status: 'success' },
//     { id: 3, type: 'URL', title: 'Website Verification', result: 'Suspicious', score: 65, date: '1 day ago', status: 'warning' },
//     { id: 4, type: 'Video', title: 'Deepfake Detection', result: 'Real', score: 92, date: '2 days ago', status: 'success' },
//     { id: 5, type: 'Document', title: 'ID Card Verification', result: 'Forged', score: 78, date: '3 days ago', status: 'danger' }
//   ];

//   const detectionTypes = [
//     { type: 'Text Analysis', count: 542, percentage: 43, icon: <FileText className="w-5 h-5" /> },
//     { type: 'Image Detection', count: 318, percentage: 26, icon: <Image className="w-5 h-5" /> },
//     { type: 'Video Analysis', count: 189, percentage: 15, icon: <Video className="w-5 h-5" /> },
//     { type: 'URL Scanning', count: 145, percentage: 12, icon: <Link2 className="w-5 h-5" /> },
//     { type: 'Document Verify', count: 53, percentage: 4, icon: <File className="w-5 h-5" /> }
//   ];

//   const baseClass = isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
//   const cardClass = isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
//   const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';

//   // Sidebar Component
//   const Sidebar = () => (
//     <aside className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r w-64 flex-shrink-0 ${sidebarOpen ? 'block' : 'hidden'} lg:block`}>
//       <div className="p-6">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//             <Shield className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <span className="font-bold">FactChecker AI</span>
//             <p className="text-xs text-gray-500">Detection System</p>
//           </div>
//         </div>

//         <nav className="space-y-2">
//           {[
//             { id: 'dashboard', icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
//             { id: 'text', icon: <FileText className="w-5 h-5" />, label: 'Text Analysis' },
//             { id: 'image', icon: <Image className="w-5 h-5" />, label: 'Image Detection' },
//             { id: 'video', icon: <Video className="w-5 h-5" />, label: 'Video Analysis' },
//             { id: 'url', icon: <Link2 className="w-5 h-5" />, label: 'URL Scanner' },
//             { id: 'document', icon: <FileCheck className="w-5 h-5" />, label: 'Document Verify' },
//             { id: 'history', icon: <History className="w-5 h-5" />, label: 'Scan History' },
//             { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile' }
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => navigateTo(item.id)}
//               className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentPage === item.id
//                 ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
//                 : `${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${textSecondary}`
//                 }`}
//             >
//               {item.icon}
//               <span className="font-medium">{item.label}</span>
//             </button>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );

//   // Home Page Component
//   const HomePage = () => (
//     <div className={`min-h-screen ${baseClass}`}>
//       {/* Navigation */}
//       <nav className={`sticky top-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//                 <Shield className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <span className="text-lg font-bold">FactChecker AI</span>
//                 <p className="text-xs text-gray-500">Fake Content Detection</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <button onClick={toggleTheme} className={`p-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
//                 {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>
//               <button onClick={() => navigateTo('dashboard')} className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
//                 Go to Dashboard
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5" />
//         <div className="max-w-7xl mx-auto px-6 py-20 relative text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-6">
//             Detect Fake Content &
//             <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
//               Prevent Document Fraud
//             </span>
//           </h1>
//           <p className={`text-xl ${textSecondary} mb-10 max-w-3xl mx-auto`}>
//             AI-powered platform for real-time verification of text, images, videos, URLs, and documents
//           </p>
//           <div className="flex gap-4 justify-center">
//             <button onClick={() => navigateTo('dashboard')} className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center gap-2">
//               Start Verification <ChevronRight className="w-5 h-5" />
//             </button>
//             <button onClick={() => navigateTo('dashboard')} className={`px-8 py-4 rounded-xl ${cardClass} border font-semibold flex items-center gap-2`}>
//               <Play className="w-5 h-5" /> Watch Demo
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Quick Features */}
//       <section className="max-w-7xl mx-auto px-6 py-20">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             { icon: <FileText />, title: 'Text Analysis', page: 'text', color: 'blue' },
//             { icon: <Image />, title: 'Image Detection', page: 'image', color: 'purple' },
//             { icon: <Video />, title: 'Video Analysis', page: 'video', color: 'teal' },
//             { icon: <Link2 />, title: 'URL Scanner', page: 'url', color: 'red' },
//             { icon: <FileCheck />, title: 'Document Verify', page: 'document', color: 'green' }
//           ].map((item, idx) => (
//             <button
//               key={idx}
//               onClick={() => navigateTo(item.page)}
//               className={`${cardClass} border rounded-2xl p-8 hover:shadow-xl transition-all text-left group`}
//             >
//               <div className={`w-14 h-14 rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                 {React.cloneElement(item.icon, { className: `w-8 h-8 text-${item.color}-500` })}
//               </div>
//               <h3 className="text-xl font-bold mb-2">{item.title}</h3>
//               <span className="text-blue-600 flex items-center gap-2">Try Now <ChevronRight className="w-4 h-4" /></span>
//             </button>
//           ))}
//         </div>
//       </section>
//     </div>
//   );

//   // Dashboard Page
//   const DashboardPage = () => (
//     <div className="p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
//         <p className={textSecondary}>Overview of your content verification analytics</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {dashboardStats.map((stat, idx) => (
//           <div key={idx} className={`${cardClass} border rounded-xl p-6`}>
//             <div className="flex items-start justify-between mb-4">
//               <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-500`}>
//                 {stat.icon}
//               </div>
//               <span className="text-green-500 text-sm font-medium">{stat.change}</span>
//             </div>
//             <div className="text-3xl font-bold mb-1">{stat.value}</div>
//             <div className={`text-sm ${textSecondary}`}>{stat.label}</div>
//           </div>
//         ))}
//       </div>

//       <div className="grid lg:grid-cols-3 gap-6 mb-8">
//         {/* Analysis Type Breakdown */}
//         <div className={`${cardClass} border rounded-xl p-6 lg:col-span-2`}>
//           <h2 className="text-xl font-bold mb-6">Analysis Type Distribution</h2>
//           <div className="space-y-4">
//             {detectionTypes.map((type, idx) => (
//               <div key={idx}>
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-3">
//                     <div className="text-blue-600">{type.icon}</div>
//                     <span className="font-medium">{type.type}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className={textSecondary}>{type.count} scans</span>
//                     <span className="font-bold">{type.percentage}%</span>
//                   </div>
//                 </div>
//                 <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
//                     style={{ width: `${type.percentage}%` }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className={`${cardClass} border rounded-xl p-6`}>
//           <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
//           <div className="space-y-3">
//             {[
//               { icon: <FileText />, label: 'Analyze Text', page: 'text' },
//               { icon: <Image />, label: 'Check Image', page: 'image' },
//               { icon: <Video />, label: 'Scan Video', page: 'video' },
//               { icon: <Link2 />, label: 'Verify URL', page: 'url' },
//               { icon: <FileCheck />, label: 'Check Document', page: 'document' }
//             ].map((action, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => navigateTo(action.page)}
//                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-all`}
//               >
//                 {React.cloneElement(action.icon, { className: 'w-5 h-5' })}
//                 <span className="font-medium">{action.label}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Recent Scans */}
//       <div className={`${cardClass} border rounded-xl p-6`}>
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-xl font-bold">Recent Scans</h2>
//           <button onClick={() => navigateTo('history')} className="text-blue-600 font-medium hover:underline">
//             View All
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Type</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Title</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Result</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Score</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentScans.map((scan) => (
//                 <tr key={scan.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} hover:bg-gray-50 dark:hover:bg-gray-700/50`}>
//                   <td className="py-4 px-4">
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700' : 'bg-gray-100'
//                       }`}>
//                       {scan.type}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 font-medium">{scan.title}</td>
//                   <td className="py-4 px-4">
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${scan.status === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
//                       scan.status === 'danger' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
//                         'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
//                       }`}>
//                       {scan.result}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-2">
//                       <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                         <div
//                           className={`h-full rounded-full ${scan.score >= 90 ? 'bg-green-500' :
//                             scan.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
//                             }`}
//                           style={{ width: `${scan.score}%` }}
//                         />
//                       </div>
//                       <span className="font-medium">{scan.score}%</span>
//                     </div>
//                   </td>
//                   <td className={`py-4 px-4 ${textSecondary}`}>{scan.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );

//   // Text Analysis Page
//   const TextAnalysisPage = () => (
//     <div className="p-8">
//       <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
//         <ArrowLeft className="w-4 h-4" /> Back to Dashboard
//       </button>

//       <h1 className="text-3xl font-bold mb-2">Text Analysis</h1>
//       <p className={`${textSecondary} mb-8`}>Detect fake news and misinformation in text content</p>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className={`${cardClass} border rounded-xl p-6`}>
//           <h2 className="text-xl font-bold mb-4">Input Text</h2>
//           <textarea
//             value={textInput}
//             onChange={(e) => setTextInput(e.target.value)}
//             placeholder="Paste your text content here for analysis..."
//             className={`w-full h-64 p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none`}
//           />
//           <button
//             onClick={analyzeContent}
//             disabled={!textInput || analyzing}
//             className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
//           >
//             {analyzing ? 'Analyzing...' : 'Analyze Text'}
//           </button>
//         </div>

//         <div className={`${cardClass} border rounded-xl p-6`}>
//           <h2 className="text-xl font-bold mb-4">Analysis Result</h2>
//           {analyzing ? (
//             <div className="flex flex-col items-center justify-center h-64">
//               <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
//               <p className={textSecondary}>Analyzing content...</p>
//             </div>
//           ) : showResult ? (
//             <div className="space-y-6">
//               <div className="text-center p-6 rounded-lg bg-red-100 dark:bg-red-900/20 border-2 border-red-500">
//                 <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-3" />
//                 <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">Fake Content Detected</h3>
//                 <p className="text-red-700 dark:text-red-300 mt-2">Content shows signs of misinformation</p>
//               </div>

//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-medium">Confidence Score</span>
//                   <span className="font-bold text-red-600">87%</span>
//                 </div>
//                 <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                   <div className="h-full bg-red-500 rounded-full" style={{ width: '87%' }} />
//                 </div>
//               </div>

//               <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
//                 <h4 className="font-bold mb-3">Detection Indicators:</h4>
//                 <ul className="space-y-2">
//                   {['Unverified Claims Found', 'Source Credibility Issues', 'Emotional Language Detected', 'Factual Inconsistencies'].map((item, idx) => (
//                     <li key={idx} className="flex items-center gap-2">
//                       <AlertCircle className="w-4 h-4 text-red-500" />
//                       <span className="text-sm">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <button className="w-full px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700">
//                 Download Detailed Report
//               </button>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-64 text-gray-400">
//               <p>Enter text and click analyze to see results</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   // Image Detection Page
//   const ImageDetectionPage = () => (
//     <div className="p-8">
//       <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
//         <ArrowLeft className="w-4 h-4" /> Back to Dashboard
//       </button>

//       <h1 className="text-3xl font-bold mb-2">Image Detection</h1>
//       <p className={`${textSecondary} mb-8`}>Identify manipulated, edited, or AI-generated images</p>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className={`${cardClass} border rounded-xl p-6`}>
//           <h2 className="text-xl font-bold mb-4">Upload Image</h2>
//           <div className={`border-2 border-dashed ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'} rounded-lg p-12 text-center`}>
//             <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
//             <p className="font-medium mb-2">Drag & Drop Image</p>
//             <p className={`text-sm ${textSecondary} mb-4`}>or click to browse</p>
//             <button className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold">
//               Choose File
//             </button>
//           </div>
//           <button
//             onClick={analyzeContent}
//             className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transition-all"
//           >
//             Analyze Image
//           </button>
//         </div>

//         <div className={`${cardClass} border rounded-xl p-6`}>
//           <h2 className="text-xl font-bold mb-4">Detection Result</h2>
//           <div className="flex items-center justify-center h-full text-gray-400">
//             <p>Upload an image to start analysis</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // URL Scanner Page
//   const URLScannerPage = () => (
//     <div className="p-8">
//       <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
//         <ArrowLeft className="w-4 h-4" /> Back to Dashboard
//       </button>

//       <h1 className="text-3xl font-bold mb-2">URL Scanner</h1>
//       <p className={`${textSecondary} mb-8`}>Detect phishing attempts and malicious websites</p>

//       <div className="grid lg:grid-cols-2 gap-6">
//         <div className={`${cardClass} border rounded-xl p-6`}>
//           <h2 className="text-xl font-bold mb-4">Enter URL</h2>
//           <input
//             type="url"
//             value={urlInput}
//             onChange={(e) => setUrlInput(e.target.value)}
//             placeholder="https://example.com"
//             className={`w-full p-4 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-blue-500 outline-none mb-4`}
//           />
//           <button
//             onClick={analyzeContent}
//             disabled={!urlInput || analyzing}
//             className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold disabled:opacity-50 hover:shadow-lg transition-all"
//           >
//             {analyzing ? 'Scanning...' : 'Scan URL'}
//           </button>

//           <div className={`mt-6 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4`}>
//             <h3 className="font-bold mb-3">What We Check:</h3>
//             <ul className="space-y-2">
//               {['Domain Reputation', 'SSL Certificate', 'Blacklist Status', 'Redirect Analysis'].map((item, idx) => (
//                 <li key={idx} className="flex items-center gap-2">
//                   <CheckCircle className="w-4 h-4 text-green-500" />
//                   <span className="text-sm">{item}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className={`${cardClass} border rounded-xl p-6`}>
//           <h2 className="text-xl font-bold mb-4">Scan Result</h2>
//           <div className="flex items-center justify-center h-full text-gray-400">
//             <p>Enter a URL to start scanning</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Video Analysis Page (similar structure)
//   const VideoAnalysisPage = () => (
//     <div className="p-8">
//       <button onClick={() => navigateTo('dashboard')} className="flex items-center gap-2 text-blue-600 mb-6 hover:underline">
//         <ArrowLeft className="w-4 h-4" /> Back to Dashboard
//       </button>

//       <h1 className="text-3xl font-bold mb-2">Video Analysis</h1>
//       <p className={`${textSecondary} mb-8`}>Detect deepfakes and manipulated videos</p>

//       <div className={`${cardClass} border rounded-xl p-6`}>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Type</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Title</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Result</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Score</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Date</th>
//                 <th className={`text-left py-3 px-4 font-semibold ${textSecondary}`}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentScans.map((scan) => (
//                 <tr key={scan.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
//                   <td className="py-4 px-4">
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                       {scan.type}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">{scan.title}</td>
//                   <td className="py-4 px-4">
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${scan.status === 'success' ? 'bg-green-100 text-green-700' :
//                       scan.status === 'danger' ? 'bg-red-100 text-red-700' :
//                         'bg-yellow-100 text-yellow-700'
//                       }`}>
//                       {scan.result}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4">{scan.score}%</td>
//                   <td className={`py-4 px-4 ${textSecondary}`}>{scan.date}</td>
//                   <td className="py-4 px-4">
//                     <button className="text-blue-600 hover:underline text-sm">View Report</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );


// }


// // app/page.tsx
// import React from "react";
// import Link from "next/link";
// import { FileText, Image as ImgIcon, Video, Link2, FileCheck, ChevronRight, Play } from "lucide-react";

// export default function Home() {
//   const cardClass = "bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all dark:bg-gray-800 dark:border-gray-700";

//   const quick = [
//     { icon: <FileText />, title: "Text Analysis", href: "/text" },
//     { icon: <ImgIcon />, title: "Image Detection", href: "/image" },
//     { icon: <Video />, title: "Video Analysis", href: "/video" },
//     { icon: <Link2 />, title: "URL Scanner", href: "/url" },
//     { icon: <FileCheck />, title: "Document Verify", href: "/document" },
//   ];

//   return (
//     <div className="min-h-screen">
//       <section className="py-20 text-center relative">
//         <div className="max-w-4xl mx-auto px-6">
//           <h1 className="text-5xl font-bold mb-6">
//             Detect Fake Content & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">Prevent Document Fraud</span>
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
//             AI-powered platform for real-time verification of text, images, videos, URLs, and documents
//           </p>

//           <div className="flex gap-4 justify-center">
//             <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center gap-2">
//               Start Verification <ChevronRight className="w-5 h-5" />
//             </Link>
//             <button className="px-8 py-4 rounded-xl bg-white border font-semibold flex items-center gap-2 dark:bg-gray-800 dark:border-gray-700">
//               <Play className="w-5 h-5" /> Watch Demo
//             </button>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 max-w-7xl mx-auto px-6">
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {quick.map((q, i) => (
//             <Link key={i} href={q.href} className={cardClass}>
//               <div className="w-14 h-14 rounded-xl bg-blue-50 flex text-black items-center justify-center mb-4">
//                 {q.icon}
//               </div>
//               <h3 className="text-xl font-bold mb-2">{q.title}</h3>
//               <span className="text-blue-600 flex items-center gap-2">Try Now <ChevronRight className="w-4 h-4" /></span>
//             </Link>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";
import React from "react";
import Link from "next/link";
import {
  FileText,
  Image as ImgIcon,
  Video,
  Link2,
  FileCheck,
  ChevronRight,
  Play,
  ShieldCheck,
  ScanSearch,
  Bot,
  Fingerprint,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  const cardClass =
    "bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all dark:bg-gray-800 dark:border-gray-700";

  const quick = [
    { icon: <FileText />, title: "Text Analysis", href: "/text" },
    { icon: <ImgIcon />, title: "Image Detection", href: "/image" },
    { icon: <Video />, title: "Video Analysis", href: "/video" },
    { icon: <Link2 />, title: "URL Scanner", href: "/url" },
    { icon: <FileCheck />, title: "Document Verify", href: "/document" },
  ];

  return (
    <div className="min-h-screen">
      <div className="hidden lg:block">
        {/* HERO SECTION */}
        <section className="py-24 text-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">

          {/* SAFE OVERLAY – NO ERROR */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-300 via-purple-300 to-teal-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              AI-Powered Fake Content &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">
                Document Fraud Detection
              </span>
            </h1>

            <p className="text-xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
              A next-generation verification platform that detects manipulated images,
              deepfake videos, fake documents, phishing URLs, and AI-generated text
              using advanced Machine Learning and Forensic Analysis.
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center gap-2 shadow-lg"
              >
                Start Verification <ChevronRight className="w-5 h-5" />
              </Link>

              <button className="px-8 py-4 rounded-xl bg-white border font-semibold flex items-center gap-2 dark:bg-gray-800 dark:border-gray-700">
                <Play className="w-5 h-5" /> Watch Demo
              </button>
            </div>
          </div>
        </section>

        {/* WHAT WE DETECT */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">What Our AI Can Detect</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <ScanSearch className="w-12 h-12 text-blue-600 mb-3" />
              <h3 className="text-xl font-bold mb-2">Fake Images</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Detect AI-generated, photoshopped, and manipulated images with pixel-level forensics.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <Video className="w-12 h-12 text-purple-600 mb-3" />
              <h3 className="text-xl font-bold mb-2">Deepfake Videos</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Identify face swapping, lip-sync issues, motion inconsistencies, and AI video artifacts.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FileCheck className="w-12 h-12 text-green-600 mb-3" />
              <h3 className="text-xl font-bold mb-2">Fraud Documents</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Verify documents like ID cards, PAN/Aadhaar, invoices, certificates, and legal papers.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <Bot className="w-12 h-12 text-teal-600 mb-3" />
              <h3 className="text-xl font-bold mb-2">AI Text Detection</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Detect fake news, misinformation, AI-generated articles, and biased statements.
              </p>
            </div>

          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center mb-14">How Our AI Verification Works</h2>

            <div className="grid lg:grid-cols-3 gap-10">

              <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <ShieldCheck className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">1. Upload Content</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload text, image, video, document or URL to start the verification process.
                </p>
              </div>

              <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <Fingerprint className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">2. AI Forensic Analysis</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our system extracts metadata, pixel patterns, anomalies, deepfake signals & fraud traces.
                </p>
              </div>

              <div className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
                <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">3. Authenticity Report</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get a detailed confidence score, manipulation indicators, threat level & downloadable report.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* QUICK ACCESS MODULES */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Start Detecting Fake Content
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quick.map((q, i) => (
              <Link key={i} href={q.href} className={cardClass}>
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4 text-black">
                  {q.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{q.title}</h3>
                <span className="text-blue-600 flex items-center gap-2">
                  Try Now <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* TRUSTED BY */}
        {/* <section className="py-20 bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-6">Trusted By</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Leading companies rely on our fraud detection & deepfake detection solutions.
        </p>

        <div className="flex justify-center flex-wrap gap-10 opacity-80">
          <img src="https://i.imgur.com/fK5DSuV.png" className="h-12" />
          <img src="https://i.imgur.com/c0iW3nT.png" className="h-12" />
          <img src="https://i.imgur.com/7rFDz1X.png" className="h-12" />
          <img src="https://i.imgur.com/6mPZGO0.png" className="h-12" />
        </div>
      </section> */}

        {/* DEEPFAKE HIGHLIGHT */}
        <section className="py-20 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-14">Deepfake Detection Made Simple</h2>

          <div className="grid lg:grid-cols-2 gap-10">
            <img
              alt="Deepfake detection example"
              src="/2.png"
              width={500}
              className="rounded-2xl shadow-lg"
            />

            <div>
              <h3 className="font-bold text-2xl mb-4">Detect Deepfake Videos with 99% Accuracy</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Our AI analyzes facial movements, lip synchronization, lighting consistency,
                audio alignment, and GAN artifacts to detect deepfake videos with high accuracy.
              </p>

              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" /> Face-Swap Detection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" /> Lip-Sync Verification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-600" /> AI Artifact Analysis
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* DOCUMENT FRAUD SECTION */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-6">

            <h2 className="text-4xl font-bold text-center mb-14">Document Fraud Detection</h2>

            <div className="grid lg:grid-cols-2 gap-10">
              <img
                alt="img"
                src="1.jpg"
                width={400}
                className="rounded-2xl shadow-lg"
              />

              <div>
                <h3 className="font-bold text-2xl mb-4">Verify Certificates, IDs, Licenses & More</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Our document forensics engine scans metadata, signatures, tampering regions,
                  font inconsistencies, stamp forgery and layout mismatches to detect fake documents.
                </p>

                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="text-red-600" /> Signature Forgery Detection
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="text-red-600" /> Metadata Tampering Checks
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="text-red-600" /> Seal / Stamp Validation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              "How does your AI detect deepfake videos?",
              "Can your platform detect AI-generated text?",
              "What types of documents can be verified?",
              "Is my uploaded data kept private?",
              "How accurate is the fraud detection?",
            ].map((q, i) => (
              <details
                key={i}
                className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 cursor-pointer"
              >
                <summary className="font-semibold">{q}</summary>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Our system uses advanced ML, metadata analysis, neural forensics and GAN detection
                  models to ensure reliable results.
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-gray-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

            <div>
              <h3 className="font-bold text-xl mb-3">FactChecker AI</h3>
              <p className="text-gray-400">
                AI-powered fake content and fraud detection platform.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/text">Text Analysis</Link></li>
                <li><Link href="/image">Image Detection</Link></li>
                <li><Link href="/video">Video Analysis</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <p className="text-gray-300">support@factchecker.ai</p>
              <p className="text-gray-300">+91 98765 43210</p>
            </div>

          </div>

          <p className="text-center text-gray-500 mt-10">
            © 2025 FactChecker AI. All rights reserved.
          </p>
        </footer>
      </div>

      <div className="lg:hidden block">

        {/* ---------------- MOBILE HERO SECTION ---------------- */}
        <section className="py-14 px-4 text-center bg-gradient-to-b from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-800">
          <h1 className="text-3xl font-extrabold leading-snug">
            AI-Powered Fake Content
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              & Document Detection
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm">
            Scan images, videos, text, URLs & documents instantly.
          </p>

          <div className="flex flex-col gap-3 mt-6 max-w-xs mx-auto">
            <Link
              href="/dashboard"
              className="py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
            >
              Start Verification
            </Link>

            <button className="py-3 rounded-xl bg-white border dark:bg-gray-800 dark:border-gray-700">
              <Play className="w-4 h-4 inline-block mr-1" /> Watch Demo
            </button>
          </div>
        </section>

        {/* ---------------- MOBILE WHAT WE DETECT ---------------- */}
        <section className="mt-10 px-4">
          <h2 className="text-xl font-bold mb-4">What We Detect</h2>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex gap-3">
              <ScanSearch className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="font-semibold">Fake Images</h3>
                <p className="text-xs text-gray-500">AI-generated & edited images detection.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex gap-3">
              <Video className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold">Deepfake Detection</h3>
                <p className="text-xs text-gray-500">Face-swap, lip-sync & motion analysis.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex gap-3">
              <FileCheck className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold">Document Fraud</h3>
                <p className="text-xs text-gray-500">Forgery, stamp & metadata checks.</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex gap-3">
              <Bot className="w-8 h-8 text-teal-600" />
              <div>
                <h3 className="font-semibold">AI Text Detection</h3>
                <p className="text-xs text-gray-500">Fake news & AI-generated content.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- MOBILE HOW IT WORKS ---------------- */}
        <section className="mt-14 px-4">
          <h2 className="text-xl font-bold mb-4">How It Works</h2>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold">1. Upload Content</h3>
              <p className="text-xs text-gray-500">Upload any image, video, URL, or document.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <Fingerprint className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold">2. AI Analysis</h3>
              <p className="text-xs text-gray-500">Our AI checks deepfake signals & inconsistencies.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold">3. Get Report</h3>
              <p className="text-xs text-gray-500">Download PDF with confidence score.</p>
            </div>
          </div>
        </section>

        {/* ---------------- MOBILE QUICK ACCESS ---------------- */}
        <section className="mt-14 px-4">
          <h2 className="text-xl font-bold mb-4">Start Scanning</h2>

          <div className="grid grid-cols-2 gap-4">
            {quick.map((q, i) => (
              <Link
                key={i}
                href={q.href}
                className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-gray-700 flex items-center justify-center mb-2">
                  {q.icon}
                </div>
                <p className="text-sm font-semibold">{q.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ---------------- MOBILE DEEPFAKE SECTION ---------------- */}
        <section className="mt-14 px-4">
          <h2 className="text-xl font-bold mb-4">Deepfake Detection</h2>

          <img src="/2.png" className="rounded-xl shadow mb-3" />

          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
            AI analyzes face movement, lip-sync & lighting mismatches.
          </p>

          <ul className="text-xs space-y-1">
            <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Face-Swap Detection</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> Lip-Sync Verification</li>
            <li className="flex items-center gap-2"><CheckCircle className="text-green-600" /> AI Artifact Analysis</li>
          </ul>
        </section>

        {/* ---------------- MOBILE DOCUMENT SECTION ---------------- */}
        <section className="mt-14 px-4">
          <h2 className="text-xl font-bold mb-4">Document Verification</h2>

          <img src="/1.jpg" className="rounded-xl shadow mb-3" />

          <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
            Detect signature forgery, metadata tampering & fake stamps.
          </p>

          <ul className="text-xs space-y-1">
            <li className="flex items-center gap-2"><AlertTriangle className="text-red-600" /> Signature Forgery</li>
            <li className="flex items-center gap-2"><AlertTriangle className="text-red-600" /> Metadata Issues</li>
            <li className="flex items-center gap-2"><AlertTriangle className="text-red-600" /> Stamp Validation</li>
          </ul>
        </section>

        {/* ---------------- MOBILE FAQ ---------------- */}
        <section className="mt-14 px-4">
          <h2 className="text-xl font-bold mb-4">FAQ</h2>

          <div className="space-y-3">
            {[
              "How does your AI detect deepfake videos?",
              "Can the system detect AI text?",
              "What documents can be verified?",
              "Is uploaded data private?",
            ].map((q, i) => (
              <details key={i} className="p-3 rounded-xl bg-white dark:bg-gray-800 border dark:border-gray-700">
                <summary className="font-semibold text-sm">{q}</summary>
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                  Our machine learning engine performs multi-layer analysis for accuracy.
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------- MOBILE FOOTER ---------------- */}
        <footer className="mt-16 py-6 bg-gray-900 text-white text-center text-xs">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">

            <div>
              <h3 className="font-bold text-xl mb-3">FactChecker AI</h3>
              <p className="text-gray-400">
                AI-powered fake content and fraud detection platform.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/text">Text Analysis</Link></li>
                <li><Link href="/image">Image Detection</Link></li>
                <li><Link href="/video">Video Analysis</Link></li>
                <li><Link href="/decument">Document Analysis</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <p className="text-gray-300">support@factchecker.ai</p>
              <p className="text-gray-300">+91 98765 43210</p>
            </div>

          </div>

          <p className="text-center text-gray-500 mt-10">
            © 2025 FactChecker AI. All rights reserved.
          </p>
        </footer>

      </div>


    </div>

  );
}
