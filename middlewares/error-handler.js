"use strict";

module.exports = function (err, req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
    // console.error(err.name, {
    //   error: err.message,
    // });
  }
  if (err.statusCode && err.statusCode !== 500) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: "Internal server error" });
};
