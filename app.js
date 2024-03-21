require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const connection = require("./configs/database.config");
const router = require("./routes/routes");
// const about = require("./routes/aboutRoute");
const path = require('path')
const PORT = process.env.PORT || 3000;
const cors = require('cors');

const app = express();

// middlewares
app.use(cors());
/*
 *  Connect to MongoDB
 */
connection();


/*
 *  Middleware to parse JSON & URL-encoded data
 */
app.use(express.json({ limit: '700mb' }));
app.use(express.urlencoded({
  extended: true,
  limit: '500mb',
  parameterLimit: 1000000000000
}));

/*
 *  Set the view engine to ejs
 */
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "./public")));
app.locals.baseurl = `http://localhost:${PORT}/`
//! Index Routes
app.get("/", (req, res) => {
  res.render("index");
});

//! Import Routes
app.use("/admin", router);
// app.use("/about", about);

//! Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
