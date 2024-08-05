const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', required: true
        },
        recipe: { type: String, default: "" },
        time: { type: Number, required: true },
        description: { type: String },
        category: { type: String, required: true }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Meal", MealSchema);