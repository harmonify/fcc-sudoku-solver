"use strict";

const { SudokuSolver } = require("../controllers");
const { ErrorStatus } = require("../utilities");

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res, next) => {
    try {
      const { puzzle, coordinate, value } = req.body;
      console.log(req.body);
      if (!(puzzle && coordinate && value)) {
        throw new ErrorStatus("Required field(s) missing", 200);
      }

      // validate if the inputs are valid
      const rowAndColumn = solver.parseCoordinate(coordinate);
      const validatedPuzzle = solver.validatePuzzle(puzzle);
      const validatedValue = solver.validateValue(value);
      if (rowAndColumn === "Invalid coordinate") {
        throw new ErrorStatus(rowAndColumn, 200);
      }
      if (validatedPuzzle !== true) {
        throw new ErrorStatus(validatedPuzzle, 200);
      }
      if (validatedValue !== true) {
        throw new ErrorStatus(validatedValue, 200);
      }

      // check for placement conflicts
      const [row, column] = rowAndColumn;
      const conflict = [];
      if (!solver.checkRowPlacement(puzzle, row, column, value)) {
        conflict.push("row");
      }
      if (!solver.checkColPlacement(puzzle, row, column, value)) {
        conflict.push("column");
      }
      if (!solver.checkRegionPlacement(puzzle, row, column, value)) {
        conflict.push("region");
      }
      console.log(conflict);
      if (conflict.length > 0) {
        res.status(200).json({ valid: false, conflict });
        return;
      }

      // if no conflict, then the placement is valid
      res.json({ valid: true });
    } catch (error) {
      next(error);
    }
  });

  app.route("/api/solve").post((req, res, next) => {
    try {
      const { puzzle } = req.body;
      if (!puzzle) {
        throw new ErrorStatus("Required field missing", 200);
      }
      const validatedPuzzle = solver.validatePuzzle(puzzle);
      if (validatedPuzzle !== true) {
        throw new ErrorStatus(validatedPuzzle, 200);
      }
      const solution = solver.solve(puzzle);
      if (!solution) {
        throw new ErrorStatus("Puzzle cannot be solved", 200);
      }
      res.json({ solution });
    } catch (error) {
      next(error);
    }
  });
};
