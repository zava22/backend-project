const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// DB ulash
connectDB();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true
}));
app.use(express.json());

// Routers
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});