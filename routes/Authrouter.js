const { register } = require("../Controllers/AuthControllers");

const router = require("express").Router();

router.post("/register", register);

module.exports = router;
