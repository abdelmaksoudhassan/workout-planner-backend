const Entry = require("../models/Entry.js");
const User = require("../models/User.js");
const Meal = require("../models/Meal.js");
const Routine = require("../models/Routine.js");

const createEntry = async (req, res, next) => {

    const newEntry = new Entry(req.body);
    try {
        const savedEntry = await newEntry.save();

        try {
            const user = await User.findById(savedEntry.author);
            user.entries.push(savedEntry._id);
            await user.save();
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedEntry);
    } catch (err) {
        next(err);
    }
};

const deleteEntry = async (req, res, next) => {
    try {
        await Entry.findByIdAndDelete(req.params.id);
        try {
            await User.findOneAndUpdate(
                { entries: req.params.id }, 
                { $pull: { entries: req.params.id } },
                { new: true }
            );
        }

        catch (err) {
            next(err)
        }

        res.status(200).json("the entry has been deleted");
    } catch (err) {
        next(err);
    }
};


const getEntries = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const entries = await Entry.find({ author: userId })
            .populate('meals', 'name')
            .populate('routines', 'name')
        res.status(200).json(entries);
    } catch (err) {
        next(err)
    }
}

const getMealsAndRoutines = async (req, res, next) => {
    const userId = req.params.id
    let userRoutines, userMeals;
    try {
        userRoutines = await Routine.find({ author: userId }).select('name _id').exec();
    }
    catch (err) {
        next(err)
    }
    try {
        userMeals = await Meal.find({ author: userId }).select('name _id').exec();
    }
    catch (error) {
        next(err)
    }
    const result = {
        routines: userRoutines,
        meals: userMeals
    }
    res.status(200).json(result);
}

module.exports = {
    createEntry,
    deleteEntry,
    getEntries,
    getMealsAndRoutines
}