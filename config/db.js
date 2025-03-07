const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // Required for Render PostgreSQL
            rejectUnauthorized: false // Bypasses self-signed SSL issue
        }
    },
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL Connected to Render...");
    } catch (error) {
        console.error("❌ PostgreSQL Connection Error:", error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
