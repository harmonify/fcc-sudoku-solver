"use strict";

const { puzzlesAndSolutions } = require("./puzzle-strings");
const SudokuSolver = require("./controllers/sudoku-solver.js");

module.exports = {
  SudokuSolver,
  puzzlesAndSolutions,
};
