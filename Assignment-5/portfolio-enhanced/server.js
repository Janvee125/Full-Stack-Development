const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";

// ========================
// MIDDLEWARE
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ========================
// FILE UPLOAD CONFIG (multer)
// ========================
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
        const safeName = Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        cb(null, safeName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    fileFilter: (req, file, cb) => {
        const allowed = [".pdf", ".doc", ".docx"];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) cb(null, true);
        else cb(new Error("Only PDF, DOC, DOCX files are allowed"));
    }
});

// ========================
// MONGODB CONNECTION
// ========================
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log("✅ MongoDB Connected! DB:", MONGO_URI);
})
.catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("⚠️  Server will still run, but DB features won't work.");
});

mongoose.connection.on("disconnected", () => console.warn("⚠️  MongoDB disconnected."));
mongoose.connection.on("reconnected", () => console.log("✅ MongoDB reconnected."));

// ========================
// SCHEMAS & MODELS
// ========================

// Resume Schema
const resumeSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    originalName: { type: String },
    filePath: { type: String },
    uploadedAt: { type: Date, default: Date.now }
});
const Resume = mongoose.model("Resume", resumeSchema);

// Contact Message Schema
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email"]
    },
    subject: { type: String, trim: true, default: "General Enquiry" },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.model("Message", messageSchema);

// Project Schema (dynamic projects from DB)
const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [String],
    link: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
});
const Project = mongoose.model("Project", projectSchema);

// Visitor Counter Schema
const visitorSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true }, // YYYY-MM-DD
    count: { type: Number, default: 0 }
});
const Visitor = mongoose.model("Visitor", visitorSchema);

// ========================
// HELPER: Track Visitor
// ========================
async function trackVisit() {
    try {
        const today = new Date().toISOString().split("T")[0];
        await Visitor.findOneAndUpdate(
            { date: today },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        );
    } catch {}
}

// ========================
// ROUTES
// ========================

// Root - track visit
app.get("/", (req, res) => {
    trackVisit();
    res.sendFile(path.join(__dirname, "index.html"));
});

// Admin Dashboard
app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "admin.html"));
});

// Upload page
app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "upload.html"));
});

// ========================
// RESUME ENDPOINTS
// ========================

/** GET /resume - view the current resume */
app.get("/resume", async (req, res) => {
    try {
        const data = await Resume.findOne().sort({ uploadedAt: -1 });
        if (data) {
            const filePath = path.join(__dirname, "uploads", data.fileName);
            if (fs.existsSync(filePath)) {
                return res.sendFile(filePath);
            }
        }
        res.status(404).send(`
            <html><body style="text-align:center;margin-top:100px;font-family:Arial;">
            <h1>❌ No Resume Found</h1>
            <p>Please upload a resume first.</p>
            <a href="/upload.html" style="padding:10px 20px;background:#6d28d9;color:white;text-decoration:none;border-radius:5px;">Upload Resume</a>
            </body></html>
        `);
    } catch (err) {
        console.error("❌ Resume fetch error:", err);
        res.status(500).send("Server error");
    }
});

/** GET /resume-info - JSON info about latest resume */
app.get("/resume-info", async (req, res) => {
    try {
        const data = await Resume.findOne().sort({ uploadedAt: -1 });
        res.json({ success: true, resume: data });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching resume info" });
    }
});

/** POST /upload-resume - real file upload via multer */
app.post("/upload-resume", upload.single("resumeFile"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded ❌" });
        }
        // Replace old resumes
        await Resume.deleteMany();
        const newResume = new Resume({
            fileName: req.file.filename,
            originalName: req.file.originalname,
            filePath: req.file.path
        });
        await newResume.save();
        console.log("✅ Resume uploaded:", req.file.originalname);
        res.json({ success: true, message: "Resume uploaded successfully ✅", fileName: req.file.originalname });
    } catch (err) {
        console.error("❌ Upload error:", err);
        res.status(500).json({ success: false, message: err.message || "Upload failed ❌" });
    }
});

// ========================
// MESSAGE ENDPOINTS
// ========================

/** POST /send-message - save contact message */
app.post("/send-message", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "All fields are required ❌" });
        }
        const newMsg = new Message({ name, email, subject, message });
        await newMsg.save();
        console.log("✅ Message saved from:", name);
        res.json({ success: true, message: "Message sent successfully ✅" });
    } catch (err) {
        console.error("❌ Message save error:", err);
        const mongoErr = err.code === 11000 ? "Duplicate entry" : err.message;
        res.status(500).json({ success: false, message: mongoErr || "Error sending message ❌" });
    }
});

/** GET /messages - get all messages (admin) */
app.get("/messages", async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json({ success: true, count: messages.length, messages });
    } catch (err) {
        res.status(500).json({ success: false, message: "Error fetching messages ❌" });
    }
});

/** PATCH /messages/:id/read - mark a message as read */
app.patch("/messages/:id/read", async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ success: true });
    } catch {
        res.status(500).json({ success: false });
    }
});

/** DELETE /messages/:id - delete a message */
app.delete("/messages/:id", async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Message deleted ✅" });
    } catch {
        res.status(500).json({ success: false });
    }
});

// ========================
// PROJECT ENDPOINTS
// ========================

/** GET /projects - all projects */
app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json({ success: true, projects });
    } catch {
        res.status(500).json({ success: false, message: "Error fetching projects" });
    }
});

/** POST /projects - add a project (admin) */
app.post("/projects", async (req, res) => {
    try {
        const { title, description, techStack, link } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description required" });
        }
        const project = new Project({
            title,
            description,
            techStack: Array.isArray(techStack) ? techStack : (techStack ? techStack.split(",").map(t => t.trim()) : []),
            link
        });
        await project.save();
        res.json({ success: true, message: "Project added ✅", project });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

/** DELETE /projects/:id */
app.delete("/projects/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Project deleted ✅" });
    } catch {
        res.status(500).json({ success: false });
    }
});

// ========================
// ANALYTICS ENDPOINT
// ========================
app.get("/analytics", async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ date: -1 }).limit(7);
        const totalMessages = await Message.countDocuments();
        const unreadMessages = await Message.countDocuments({ read: false });
        const totalProjects = await Project.countDocuments();
        const resumeInfo = await Resume.findOne().sort({ uploadedAt: -1 });
        res.json({
            success: true,
            visitors,
            totalMessages,
            unreadMessages,
            totalProjects,
            hasResume: !!resumeInfo,
            resumeName: resumeInfo?.originalName || null
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ========================
// DB STATUS ENDPOINT
// ========================
app.get("/db-status", (req, res) => {
    const states = { 0: "disconnected", 1: "connected", 2: "connecting", 3: "disconnecting" };
    res.json({
        status: states[mongoose.connection.readyState] || "unknown",
        readyState: mongoose.connection.readyState,
        dbName: mongoose.connection.name || "N/A"
    });
});

// ========================
// SERVER START
// ========================
app.listen(PORT, () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 MongoDB URI: ${MONGO_URI}`);
    console.log(`📁 Collections: Resumes, Messages, Projects, Visitors`);
    console.log(`🛠️  Admin Dashboard: http://localhost:${PORT}/admin\n`);
});
