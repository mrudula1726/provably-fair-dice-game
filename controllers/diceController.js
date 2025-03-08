const Player = require("../models/Player");
const crypto = require("crypto-js");

exports.rollDice = async (req, res) => {
    try {
        let player = await Player.findOne();
        if (!player) {
            player = await Player.create({});
        }

        let betAmount = parseFloat(inputValue);  // Ensure input is a valid number
        if (isNaN(betAmount) || betAmount <= 0) {
            console.error("Invalid bet amount:", betAmount);
        }

        // Roll a number between 1 and 6
        const roll = Math.floor(Math.random() * 6) + 1;
        const hash = crypto.SHA256(roll.toString()).toString();

        let payout = 0;
        if (roll >= 4) {
            payout = betAmount * 2; // Win: Get double the bet amount
        }

        player.balance = player.balance - betAmount + payout;
        await player.save();

        res.json({
            roll,
            hash, 
            payout,
            balance: player.balance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "❌ Server error" });
    }
};
