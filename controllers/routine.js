const Routine = require("../models/Routine.js");
const User = require("../models/User.js");

const createRoutine = async (req, res, next) => {

    const newRoutine = new Routine(req.body);
    try {
        const savedRoutine = await newRoutine.save();

        try {
            const user = await User.findById(savedRoutine.author);
            user.routines.push(savedRoutine._id);
            await user.save();
        }
        catch (err) {
            next(err)
        }
        res.status(200).json(savedRoutine);
    } catch (err) {
        next(err);
    }
};

const deleteRoutine = async (req, res, next) => {
    try {
        await User.findOneAndUpdate(
            { routines: req.params.id }, 
            { $pull: { routines: req.params.id } },
            { new: true }
        );
        await Routine.findByIdAndDelete(req.params.id);
        res.status(200).json("the Routine has been deleted");
    } catch (err) {
        next(err);
    }
};

const getRoutines = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const routines = await Routine.find({ author: userId });
        res.status(200).json(routines);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createRoutine,
    deleteRoutine,
    getRoutines
}