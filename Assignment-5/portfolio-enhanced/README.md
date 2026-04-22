# 🚀 Janvee Ghadge — Portfolio v2.0

Enhanced portfolio with full MongoDB integration, admin dashboard, real file uploads, visitor analytics, and dynamic project management.

---

## ✨ What's New (vs Assignment 5)

| Feature | Before | Now |
|---|---|---|
| MongoDB Connection | Basic | Robust (reconnect, status checks) |
| Resume Upload | Filename only | **Real file upload** via multer |
| Admin Panel | None | **Full dashboard** with analytics |
| Projects | Static HTML | **Dynamic from MongoDB** |
| Messages | Save only | **Inbox with read/delete** |
| Visitor Tracking | None | **Daily visitor counter** |
| Contact Form | 3 fields | **5 fields + subject selector** |
| DB Status | None | **Live indicator in navbar** |
| Error Handling | Basic | Comprehensive |

---

## 📁 File Structure

```
portfolio/
├── server.js          ← Express server + MongoDB + all API routes
├── index.html         ← Main portfolio page (dynamic projects, live DB status)
├── admin.html         ← Admin dashboard (messages, projects, resume, analytics)
├── upload.html        ← Drag & drop resume uploader
├── package.json
├── README.md
└── uploads/           ← Created automatically for resume files
```

---

## 🛠️ Setup & Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Make Sure MongoDB is Running
```bash
# If using local MongoDB:
mongod

# OR use MongoDB Atlas (cloud) — update MONGO_URI in server.js
```

### 3. Start the Server
```bash
node server.js
# OR for development (auto-restart):
npm run dev
```

### 4. Open in Browser
- **Portfolio:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin
- **Resume Upload:** http://localhost:3000/upload.html

---

## 🗄️ MongoDB Collections

| Collection | Description |
|---|---|
| `resumes` | Stores uploaded resume file info |
| `messages` | Contact form submissions |
| `projects` | Portfolio projects (managed from admin) |
| `visitors` | Daily visitor count |

---

## 🌐 API Endpoints

### Resume
- `GET /resume` — View/download current resume
- `GET /resume-info` — Get resume metadata (JSON)
- `POST /upload-resume` — Upload a resume file (multipart/form-data)

### Messages
- `POST /send-message` — Submit contact form
- `GET /messages` — Get all messages (admin)
- `PATCH /messages/:id/read` — Mark message as read
- `DELETE /messages/:id` — Delete a message

### Projects
- `GET /projects` — Get all projects
- `POST /projects` — Add a project
- `DELETE /projects/:id` — Delete a project

### Analytics & Status
- `GET /analytics` — Dashboard analytics (visitors, counts)
- `GET /db-status` — MongoDB connection status

---

## ⚙️ Environment Variables

You can set these instead of editing server.js:

```bash
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/portfolioDB
```

For MongoDB Atlas:
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolioDB
```

---

## 📸 Features Overview

### Portfolio (index.html)
- Animated hero with typing effect
- Live MongoDB connection status in navbar
- Dynamic projects loaded from MongoDB
- Animated skill bars
- Enhanced contact form with subject
- Scroll reveal animations
- Floating particles background

### Admin Dashboard (admin.html)
- 📊 Stats cards (messages, projects, resume status)
- 📈 Visitor chart (last 7 days)
- 📬 Messages inbox (read/delete/mark as read)
- 🗂️ Projects CRUD (add/delete)
- 📄 Resume management with preview
- 🟢 Live DB connection status

### Upload Page (upload.html)
- Drag & drop file upload
- Progress bar animation
- File type + size validation
- Auto-redirect after upload

---

Built with ❤️ using Node.js, Express, MongoDB & Mongoose
