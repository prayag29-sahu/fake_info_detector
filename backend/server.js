require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// ─── SECURITY MIDDLEWARE ─────────────────────────────────────

// Helmet (basic security headers)
app.use(helmet());

// Logger
app.use(morgan("dev"));

// cors
app.use(
    cors({
        origin: "http://localhost:3000", // frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── ROUTES ────────────────────────────────────────────────

const authRoutes = require("./routes/authRoutes");
const textRoutes = require("./routes/textRoutes");
const imageRoutes = require("./routes/imageRoutes");
const urlRoutes = require("./routes/urlRoutes");
const documentRoutes = require("./routes/documentRoutes");
const historyRoutes = require("./routes/historyRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");
const videoRoutes = require("./routes/videoRoutes");

// Mount routes
app.use("/api", authRoutes);
app.use("/api", textRoutes);
app.use("/api", imageRoutes);
app.use("/api", urlRoutes);
app.use("/api", documentRoutes);
app.use("/api", historyRoutes);
app.use("/api", profileRoutes);
app.use("/api", adminRoutes);
app.use("/api", videoRoutes);

app.use((req, res, next) => {
    console.log("Incoming:", req.method, req.url);
    next();
});

// ─── HEALTH CHECK ─────────────────────────────────────────

app.get("/api/test", (req, res) => {
    res.json({ success: true, message: "API working" });
});

app.get("/", (req, res) => {
    res.send("Backend running");
});

// ─── ERROR HANDLER (IMPORTANT) ─────────────────────────────

app.use((err, req, res, next) => {
    console.error("ERROR:", err);

    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Internal Server Error",
    });
});

// ─── 404 HANDLER ──────────────────────────────────────────

app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found",
    });
});

// ─── SERVER START ─────────────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});