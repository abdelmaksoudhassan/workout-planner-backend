const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const entryRoute = require("./routes/entries.js");
const routineRoute = require("./routes/routines.js");
const mealRoute = require("./routes/meals.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
dotenv.config({ path: './config/.env' });

const PORT = process.env.PORT || 5000;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.get('/', (req, res) => { res.send('Hello From Express!!') });

app.use(cookieParser())
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type, Authorization, User-Token, Token']
})
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);
app.use("/api/routines", routineRoute);
app.use("/api/meals", mealRoute);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    connect();
});