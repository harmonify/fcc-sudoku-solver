"use strict";

const { puzzlesAndSolutions } = require("./puzzle-strings");

class SudokuSolver {
  validateLength(value) {
    return value.length === 81;
  }

  validateValue(value) {
    return /^[1-9\.]+$/.test(value);
  }

  validate(puzzleString) {
    if (!this.validateLength(puzzleString)) {
      return "Invalid length";
    }
    if (!this.validateValue(puzzleString)) {
      return "Invalid value";
    }
    return true;
  }

  parseCoordinate(coordinate) {
    const coordinateValidated = this._validateCoordinate(coordinate);
    if (coordinateValidated !== true) {
      return coordinateValidated;
    }
    const [row, column] = coordinateValidated;
    return [row.charCodeAt(0) - 65, column - 1];
  }

  _validateCoordinate(coordinate) {
    const result = /^[A-Z][1-9]$/.exec(coordinate);
    if (!result) {
      return "Invalid coordinate";
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    const valueStr = value.toString();
    const colArr = [];
    for (let i = 0; i < 9; i++) {
      colArr.push(puzzleString[i * 9 + column]);
    }

    // validate if the value is exist in the column and not in the same position as the value
    if (colArr.includes(valueStr) && colArr.indexOf(valueStr) !== row) {
      return false;
    }
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const valueStr = value.toString();
    const rowArr = puzzleString.substring(row * 9, row * 9 + 9).split("");

    // validate if the value is exist in the row and not in the same position as the value
    if (rowArr.includes(valueStr) && rowArr.indexOf(valueStr) !== column) {
      return false;
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const valueStr = value.toString();
    const rowStart = Math.floor(row / 3) * 3;
    const colStart = Math.floor(column / 3) * 3;
    let regionString = "";
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        regionString += puzzleString[i * 9 + j];
      }
    }
    const regionValues = regionString.split("");

    // validate if the value is exist in the region and not in the same position as the value
    // row modulo 3 for the row position in the region
    // column modulo 3 for the column position in the region
    if (
      regionValues.includes(valueStr) &&
      regionValues.indexOf(valueStr) !== (row % 3) * 3 + (column % 3)
    ) {
      return false;
    }
    return true;
  }

  checkPlacements(puzzleString, row, col, value) {
    return (
      this.checkColPlacement(puzzleString, row, col, value) &&
      this.checkRowPlacement(puzzleString, row, col, value) &&
      this.checkRegionPlacement(puzzleString, row, col, value)
    );
  }

  transform(puzzleString) {
    // transform puzzleString to 2d array
    const pzl = puzzleString.split("");
    const result = [];
    // for each row
    for (let i = 0; i < 9; i++) {
      // push 9 cols of the sliced pzl to the row
      result.push(pzl.slice(i * 9, i * 9 + 9));
    }
    return result;
  }

  transformBack(grid) {
    // transform the grid back to the string
    return grid.flat().join("");
  }

  solve(puzzleString) {
    const validated = this.validate(puzzleString);
    if (validated !== true) {
      return validated;
    }
    const grid = this.transform(puzzleString);
    // omitting 2 optional param to solve it from the beginning
    const resultArr = this.solveSudoku(grid);
    if (!resultArr) {
      return false;
    }
    return this.transformBack(resultArr);
  }

  solveSudoku(grid, row = 0, col = 0) {
    // base case
    if (col == 9) {
      if (row == 8) {
        // recursion is completed, return the grid
        return grid;
      }
      // continue to the next row
      row++;
      col = 0;
    }

    // check if the current cell is not empty
    if (grid[row][col] != ".") {
      // next iteration
      return this.solveSudoku(grid, row, col + 1);
    }

    // find candidate numbers from 1 to 9
    for (let candidate = 1; candidate <= 9; candidate++) {
      const puzzleString = this.transformBack(grid);
      const isValid = this.checkPlacements(puzzleString, row, col, candidate);
      // check if the candidate is valid
      if (isValid) {
        // assign it to the grid
        grid[row][col] = candidate;
        // next iteration
        if (this.solveSudoku(grid, row, col + 1)) {
          // sudoku is solved, return the grid
          return grid;
        }
      }
      // if the candidate is not valid, reset the grid
      grid[row][col] = ".";
    }
    return false;
  }
}

module.exports = { SudokuSolver };
