const Player = require("../models/Player");
const crypto = require("crypto-js");

exports.rollDice = async (req, res) => {
    try {
        let player = await Player.findOne();
        if (!player) {
            player = await Player.create({ balance: 1000 }); // Default balance
        }

        const { betAmount } = req.body;  // ✅ Extract from request body

        if (!betAmount || isNaN(betAmount) || betAmount <= 0) {
            return res.status(400).json({ message: "❌ Invalid bet amount" });
        }

        // 🛑 Check if the player has enough balance
        if (betAmount > player.balance) {
            return res.status(400).json({ message: "❌ Insufficient balance" });
        }

        console.log("Bet Amount Received:", betAmount);
        
        // 🎲 Roll a number between 1 and 6
        const roll = Math.floor(Math.random() * 6) + 1;
        const hash = crypto.SHA256(roll.toString()).toString();

        let payout = 0;
        if (roll >= 4) {
            payout = betAmount * 2; // Win: Get double the bet amount
        }

        // ✅ Deduct bet amount and add payout
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
