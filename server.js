const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/healthcare")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error ❌", err));

// Schema
const orderSchema = new mongoose.Schema({
    cart: Array,
    total: Number,
    payment: String,
    status: {
        type: String,
        default: "Processing"
    }
});

const Order = mongoose.model("Order", orderSchema);

// Place Order
app.post("/place-order", async (req, res) => {

    try {
        const { cart, total, payment } = req.body;

        const order = new Order({
            cart,
            total,
            payment
        });

        const saved = await order.save();

        res.json({
            orderId: saved._id
        });

    } catch (err) {
        res.status(500).json({ message: "Error ❌" });
    }

});

// Track Order
app.get("/track/:id", (req, res) => {
    const id = req.params.id;

    // dummy response
    res.json({
        status: "Out for delivery 🚚"
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});