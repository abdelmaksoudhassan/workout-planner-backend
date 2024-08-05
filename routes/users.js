const express = require("express");
const {
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} = require("../controllers/user");

const router = express.Router();

router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getUsers);

module.exports = router;