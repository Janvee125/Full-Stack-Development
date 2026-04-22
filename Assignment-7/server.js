const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(()=>console.log("MongoDB Connected ✅"))
.catch(err=>console.log(err));

// ================= MODELS =================

// Student
const Student = mongoose.model("Student", {
    name: String,
    email: String,
    course: String
});

// User (Login)
const User = mongoose.model("User", {
    username: String,
    password: String
});

// Profile
const Profile = mongoose.model("Profile", {
    name: String,
    email: String
});

// ================= ROUTES =================

// LOGIN
app.post("/login", async (req,res)=>{
    const {username,password} = req.body;

    const user = await User.findOne({username,password});
    if(user) res.json({success:true});
    else res.json({success:false});
});

// ADD STUDENT
app.post("/add", async (req,res)=>{
    const student = new Student(req.body);
    await student.save();
    res.json({msg:"Added"});
});

// GET STUDENTS (with search)
app.get("/students", async (req,res)=>{
    const search = req.query.search || "";
    const data = await Student.find({
        name: { $regex: search, $options: "i" }
    });
    res.json(data);
});

// UPDATE STUDENT
app.put("/update/:id", async (req,res)=>{
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({msg:"Updated"});
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student Deleted ✅" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting ❌" });
    }
});

// PROFILE SAVE
app.post("/profile", async (req,res)=>{
    await Profile.deleteMany();
    const p = new Profile(req.body);
    await p.save();
    res.json({msg:"Saved"});
});

// GET PROFILE
app.get("/profile", async (req,res)=>{
    const p = await Profile.findOne();
    res.json(p || {});
});

app.listen(PORT, ()=>console.log("Server running 🚀"));