const Meal = require("../models/Meal.js");
const User = require("../models/User.js");

const createMeal = async (req, res, next) => {

    const newMeal = new Meal(req.body);
    try {
        const savedMeal = await newMeal.save();

        try {
            const user = await User.findById(savedMeal.author);
            user.meals.push(savedMeal._id);
            await user.save();
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedMeal);
    } catch (err) {
        next(err);
    }
};

const deleteMeal = async (req, res, next) => {
    try {
        await User.findOneAndUpdate(
            { meals: req.params.id }, 
            { $pull: { meals: req.params.id } },
            { new: true }
        );
        await Meal.findByIdAndDelete(req.params.id);
        res.status(200).json("the Meal has been deleted");
    } catch (err) {
        next(err);
    }
};

const getMeals = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const meals = await Meal.find({ author: userId });
        res.status(200).json(meals);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createMeal,
    deleteMeal,
    getMeals
}