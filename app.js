

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
require("./configs/database.config");

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const moment = require("moment"); 
const flash = require("connect-flash");
const session = require("express-session");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi    = require("swagger-ui-express");
const basicAuth    = require('express-basic-auth');

const app = express();
const port = process.env.PORT || 4009;
const secret = process.env.SECRET;
const url = process.env.URL || "http://localhost";
const swgbaseURL   = process.env.SWIGGERBASEURL || "localhost";

const apiRoutes = require("./routers/user.mainRouter");
// const adminRoutes = require("./routers/admin.router");

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.set("port", port);

app.use(cors());
app.use(flash());
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);
app.locals.moment = moment;
app.locals.baseurl = `${url}:${port}`;

app.use(logger("dev"));
app.use(express.json({ limit: "150mb" }));
app.use(express.urlencoded({ extended: true, limit: "150mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/api', apiRoutes)
// app.use('/', adminRoutes)

/*-----------------------------------Swagger Start-----------------------------------*/
const swaggerDefinition = {
  definition:{
    openapi:"3.0.3",
    info:{
      title: "Node JS Api Project",
      version: "1.0.0"
    },
    servers:[
      {
       api: 'http://localhost:4009/'
      }
    ]
  },
  apis:["./routers/api/auth.router.js",]
};
// const options = {
//   swaggerDefinition,
//   apis: [
//     "./routers/api/auth.router.js"
//   ],
// };
const specs = swaggerJsdoc(swaggerDefinition);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
/*-----------------------------------Swagger End-----------------------------------*/

app.listen(port, () => {
    console.log(`Server is running on ${app.locals.baseurl}`);
});
