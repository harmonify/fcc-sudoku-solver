"use strict";

module.exports = function (err, req, res, next) {
  if (process.env.NODE_ENV !== "production") {
    console.error(err.name, {
      error: err.message,
    });
  }
  if (error.statusCode && error.statusCode !== 500) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  }
  res.status(500).json({ error: "Internal server error" });
};
