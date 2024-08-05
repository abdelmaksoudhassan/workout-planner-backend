const mongoose = require("mongoose");

const RoutineSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', required: true
        },
        workout_type: { type: String, required: true },
        body_part: { type: String, required: true },
        link: { type: String }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Routine", RoutineSchema);