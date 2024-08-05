const express = require("express");
const {
    createMeal,
    deleteMeal,
    getMeals
} = require("../controllers/meal.js");

const router = express.Router();

router.post("/", createMeal);
router.delete("/:id", deleteMeal);
router.get("/:userId", getMeals);

module.exports = router;