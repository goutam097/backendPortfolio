const router = require("express").Router();
const empDashboardRouter = require("../routers/api/employee.router");
const userDashboardRouter = require("../routers/api/user.router");
const dashboardDashboardRouter = require("../routers/api/dashboard.router");
const postListRouter = require("../routers/api/postList.router");
const testimonialsRouter = require("../routers/api/testimonials.router");
const authRouter = require("../routers/api/auth.router");

router.use("/employee", empDashboardRouter);
router.use("/user", userDashboardRouter);
router.use("/dashboard", dashboardDashboardRouter);
router.use("/postList", postListRouter);
router.use("/postT", testimonialsRouter);
router.use("/auth", authRouter);

module.exports = router;
