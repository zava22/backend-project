const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// DB ulash
connectDB();

// Middleware
app.use(express.json());

// Routers
app.use("/users", require("./routes/users"));

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT}-portda ishlayapti`);
});
