const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env'),debug: true });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// Middleware
// ===============================

app.use(cors());
app.use(express.json());

// ===============================
// Serve Website Files
// ===============================

// Serve index.html, images, CSS, JS, etc.
app.use(express.static(__dirname));

// Serve pages folder
app.use("/pages", express.static(path.join(__dirname, "pages")));

// ===============================
// Home Page
// ===============================

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ===============================
// MongoDB Connection
// ===============================

    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// ===============================
// Visitor Schema
// ===============================

const visitorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true,
        enum: ["English", "Kannada"]
    },

    registeredAt: {
        type: Date,
        default: Date.now
    }
});

// ===============================
// Visitor Model
// ===============================

const Visitor = mongoose.model("Visitor", visitorSchema);

// ===============================
// Registration API
// ===============================

app.post("/api/register", async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            address,
            language
        } = req.body;

        const visitor = new Visitor({
            name,
            phone,
            email,
            address,
            language
        });

        await visitor.save();

        res.status(201).json({
            success: true,
            message: "Registration successful"
        });

    } catch (error) {
        console.log("Registration error:", error);

        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
});

// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});