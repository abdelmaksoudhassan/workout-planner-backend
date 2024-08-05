const User = require("../models/User.js");

const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).send(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (err) {
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
                                .populate('meals')
                                .populate('routines')
                                .populate({
                                    path: 'entries',
                                    populate:[
                                        { path: 'meals', select: 'name' },
                                        { path: 'routines', select: 'name' }
                                    ]
                                }).exec()
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers
}