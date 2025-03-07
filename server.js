const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { sequelize, connectDB } = require("./config/db");
const diceRoutes = require("./routes/diceRoutes");
const Player = require("./models/Player");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", diceRoutes);

// Sync Database (Creates Table if Not Exists)
sequelize.sync({ alter: true }).then(() => {
    console.log("✅ Database Synced");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
