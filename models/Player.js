const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Player = sequelize.define("Player", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1000,
    },
});

module.exports = Player;
