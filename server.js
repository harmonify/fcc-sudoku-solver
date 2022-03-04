"use strict";

const path = require("path");

const dotenv = require("dotenv");
dotenv.config();
if (process.env.NODE_ENV === "test") {
  dotenv.config({
    path: path.join(__dirname, ".env.test"),
    override: true,
  });
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const runner = require("./test-runner");
const database = require("./database");
const { apiRoutes, fccTestingRoutes } = require("./routes");
const { errorHandler, loggerDev, notFoundHandler } = require("./middlewares");

const app = express();

app.use("/public", express.static(process.cwd() + "/public"));
app.use(cors({ origin: "*" })); //For FCC testing purposes only
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loggerDev);

//Index page (static HTML)
app.route("/").get(function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

database(process.env.MONGO_URI)
  .then(async (db) => {
    console.log("Database connected");
    //For FCC testing purposes
    fccTestingRoutes(app);

    // User routes
    apiRoutes(app);

    //Error Handler Middleware
    app.use(errorHandler);

    //404 Not Found Middleware
    app.use(notFoundHandler);

    //Start our server and tests!
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, function () {
      console.log("Listening on port " + PORT);
      // process.env.NODE_ENV='test'
      if (process.env.NODE_ENV === "test") {
        console.log("Running Tests...");
        setTimeout(function () {
          try {
            runner.run();
          } catch (error) {
            console.log("Tests are not valid:");
            console.error(error);
          }
        }, 1500);
      }
    });
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app; // for testing
