const express = require("express");
const {
    createEntry,
    deleteEntry,
    getEntries,
    getMealsAndRoutines
} = require("../controllers/entry.js");

const router = express.Router();

router.post("/", createEntry);
router.delete("/:id", deleteEntry);
router.get("/:userId", getEntries);
router.get("/fetchMealsAndRoutines/:id", getMealsAndRoutines)

module.exports = router;