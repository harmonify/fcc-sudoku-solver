const chai = require("chai");
const assert = chai.assert;

const { SudokuSolver, puzzlesAndSolutions } = require("../controllers");
const solver = new SudokuSolver();

suite("UnitTests", () => {
  test("Logic handles a valid puzzle string of 81 characters", () => {
    const puzzle1 =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    const puzzle2 =
      "...762984946381257728459613694517832812936745357824..647329856158167342926914..78";
    assert.equal(solver.validate(puzzle1), true);
    assert.equal(solver.validate(puzzle2), true);
  });

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", () => {
    const puzzle1 =
      "a357629849463812577284596136945178328129367453578241964732985615816734...69145378";
    const puzzle2 =
      "1p5762984946381257728459613694517832812936745g57824196473298561581673429269145378";
    assert.equal(solver.validate(puzzle1), "Invalid value");
    assert.equal(solver.validate(puzzle2), "Invalid value");
  });

  test("Logic handles a puzzle string that is not 81 characters in length", () => {
    const puzzle1 = "1357.....";
    const puzzle2 =
      "....abc4517832812936745357824196473298561581673429269145378";
    assert.equal(solver.validate(puzzle1), "Invalid length");
    assert.equal(solver.validate(puzzle2), "Invalid length");
  });

  test("Logic handles a valid row placement", () => {
    const puzzle =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.checkRowPlacement(puzzle, 0, 0, "1"), true);
    assert.equal(solver.checkRowPlacement(puzzle, 1, 0, "9"), true);
    assert.equal(solver.checkRowPlacement(puzzle, 2, 0, "7"), true);
  });

  test("Logic handles an invalid row placement", () => {
    const puzzle =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.checkRowPlacement(puzzle, 0, 1, "1"), false);
    assert.equal(solver.checkRowPlacement(puzzle, 1, 1, "9"), false);
    assert.equal(solver.checkRowPlacement(puzzle, 2, 1, "7"), false);
  });

  test("Logic handles a valid column placement", () => {
    const puzzle =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.checkColPlacement(puzzle, 0, 0, "1"), true);
    assert.equal(solver.checkColPlacement(puzzle, 0, 1, "3"), true);
    assert.equal(solver.checkColPlacement(puzzle, 0, 2, "5"), true);
  });

  test("Logic handles an invalid column placement", () => {
    const puzzle =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.checkColPlacement(puzzle, 1, 0, "1"), false);
    assert.equal(solver.checkColPlacement(puzzle, 1, 1, "3"), false);
    assert.equal(solver.checkColPlacement(puzzle, 1, 2, "5"), false);
  });

  test("Logic handles a valid region (3x3 grid) placement", () => {
    const puzzle =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.checkRegionPlacement(puzzle, 0, 0, "1"), true);
    assert.equal(solver.checkRegionPlacement(puzzle, 0, 1, "3"), true);
    assert.equal(solver.checkRegionPlacement(puzzle, 0, 2, "5"), true);
    assert.equal(solver.checkRegionPlacement(puzzle, 1, 0, "9"), true);
    assert.equal(solver.checkRegionPlacement(puzzle, 1, 1, "4"), true);
    assert.equal(solver.checkRegionPlacement(puzzle, 1, 2, "6"), true);
    assert.equal(solver.checkRegionPlacement(puzzle, 2, 0, "7"), true);
    assert.equal(solver.checkRegionPlacement(puzzle, 2, 1, "2"), true);
    assert.equal(solver.checkRegionPlacement(puzzle, 2, 2, "8"), true);
  });

  test("Logic handles an invalid region (3x3 grid) placement", () => {
    const puzzle =
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.checkRegionPlacement(puzzle, 0, 0, "3"), false);
    assert.equal(solver.checkRegionPlacement(puzzle, 0, 1, "1"), false);
    assert.equal(solver.checkRegionPlacement(puzzle, 0, 2, "7"), false);
    assert.equal(solver.checkRegionPlacement(puzzle, 1, 0, "5"), false);
    assert.equal(solver.checkRegionPlacement(puzzle, 1, 1, "8"), false);
    assert.equal(solver.checkRegionPlacement(puzzle, 1, 2, "9"), false);
    assert.equal(solver.checkRegionPlacement(puzzle, 2, 0, "2"), false);
    assert.equal(solver.checkRegionPlacement(puzzle, 2, 1, "4"), false);
    assert.equal(solver.checkRegionPlacement(puzzle, 2, 2, "6"), false);
  });

  test("Valid puzzle strings pass the solver", () => {
    const puzzle1 =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    const puzzle2 =
      "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
    const puzzle3 =
      "1................................................................................";
    assert.notEqual(solver.solve(puzzle1), "Invalid length");
    assert.notEqual(solver.solve(puzzle2), "Invalid value");
    assert.notEqual(solver.solve(puzzle3), "Invalid length");
  });

  test("Invalid puzzle strings fail the solver", () => {
    const puzzle1 =
      "1357629849463812577284596136945178328153578241964732985615818";
    const puzzle2 =
      "asd762984946381257728459613694517832812936745357824196473298561581673429269145378";
    const puzzle3 = "1.......asdf............234234234234234..";
    assert.equal(solver.solve(puzzle1), "Invalid length");
    assert.equal(solver.solve(puzzle2), "Invalid value");
    assert.equal(solver.solve(puzzle3), "Invalid length");
  });

  test("Solver returns the expected solution for an incomplete puzzle", () => {
    assert.equal(
      solver.solve(puzzlesAndSolutions[0][0]),
      puzzlesAndSolutions[0][1]
    );
    assert.equal(
      solver.solve(puzzlesAndSolutions[1][0]),
      puzzlesAndSolutions[1][1]
    );
    assert.equal(
      solver.solve(puzzlesAndSolutions[2][0]),
      puzzlesAndSolutions[2][1]
    );
    assert.equal(
      solver.solve(puzzlesAndSolutions[3][0]),
      puzzlesAndSolutions[3][1]
    );
    assert.equal(
      solver.solve(puzzlesAndSolutions[4][0]),
      puzzlesAndSolutions[4][1]
    );
  });
});
