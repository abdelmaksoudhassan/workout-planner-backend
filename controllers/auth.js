const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
    try {

        const em = await User.findOne({ $or:[{ email: req.body.email },{ username: req.body.username }] });
        if (em)
            return res.status(409).send({ message: "User with given email or username already exists" })


        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};


const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).send(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return res.status(400).send(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT
        );

        const { password, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails } });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login
}