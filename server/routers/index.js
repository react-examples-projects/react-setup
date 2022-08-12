const express = require("express");
const router = express.Router();
const existsToken = require("../middlewares/existsToken");

// sub-routers
const userRouters = require("./user");
const authRouters = require("./auth");
const dashboardRouters = require("./dashboard");
const validationRouters = require("./validation")

router.use("/dashboard", existsToken, dashboardRouters);
router.use("/user", existsToken, userRouters);
router.use("/auth", authRouters);
router.use("/validation", validationRouters);

router.get("/test", existsToken, (req, res) => {
  res.json({
    message: "You're logged!",
    user: req.user,
  });
});

module.exports = router;
