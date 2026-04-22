const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // keep your HTML files in public folder

// ======================
// 🔗 MongoDB Connection
// ======================
mongoose.connect("YOUR_ATLAS_CONNECTION_STRING"),
 {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error ❌", err));


// ======================
// 📦 Schema
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
            return res.status(400).json({ message: "Cart is empty ❌" });
        }

        const newOrder = new Order({
            cart,
            total,
            payment
        });

        const savedOrder = await newOrder.save();

        res.json({
            message: "Order placed successfully ✅",
            orderId: savedOrder._id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error ❌" });
    }

});


// ======================
// 🚚 Track Order API
// ======================
app.get("/track/:id", async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.json({ status: "Order Not Found ❌" });
        }

        res.json({
            status: order.status
        });

    } catch (err) {
        res.json({ status: "Invalid Order ID ❌" });
    }

});


// ======================
// 🚀 Start Server
// ======================
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});