const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// ======================
// Middleware
// ======================
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ======================
// 🔗 MongoDB Connection
// ======================
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB")
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error ❌", err));

// ======================
// 📦 Order Schema
// ======================
const orderSchema = new mongoose.Schema({
    cart: Array,
    total: Number,
    payment: String,
    status: {
        type: String,
        default: "Processing"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model("Order", orderSchema);

// ======================
// 🛒 Place Order API
// ======================
app.post("/place-order", async (req, res) => {

    try {
        const { cart, total, payment } = req.body;

        if (!cart || cart.length === 0) {
            return res.status(400).json({ 
                message: "Cart is empty ❌" 
            });
        }

        const order = new Order({
            cart,
            total,
            payment
        });

        const saved = await order.save();

        res.json({
            success: true,
            orderId: saved._id,
            message: "Order placed successfully ✅"
        });

    } catch (err) {
        console.error("Order Error:", err);
        res.status(500).json({ 
            success: false,
            message: "Error placing order ❌" 
        });
    }

});

// ======================
// 📍 Track Order API
// ======================
app.get("/track/:id", async (req, res) => {

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.json({ 
                status: "Order Not Found ❌" 
            });
        }

        res.json({
            orderId: order._id,
            status: order.status,
            payment: order.payment,
            total: order.total,
            createdAt: order.createdAt
        });

    } catch (err) {
        res.json({ 
            status: "Invalid Order ID ❌" 
        });
    }

});

// ======================
// ✅ Server Start
// ======================
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📁 Public files served from: /public`);
});