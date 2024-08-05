const express = require("express");
const {
    createRoutine,
    deleteRoutine,
    getRoutines,
} = require("../controllers/routine.js");

const router = express.Router();

router.post("/", createRoutine);
router.delete("/:id", deleteRoutine);
router.get("/:userId", getRoutines);

module.exports = router;