const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;

const { puzzlesAndSolutions } = require("../controllers");
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  const apiSolve = "/api/solve";
  const apiCheck = "/api/check";

  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post(apiSolve)
      .send({ puzzle: puzzlesAndSolutions[0][0] })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(
          res.body.solution,
          puzzlesAndSolutions[0][1],
          "Server should return the solution"
        );
        done();
      });
  });

  test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post(apiSolve)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(res.body.error, "Required field missing");
        done();
      });
  });

  test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post(apiSolve)
      .send({
        puzzle:
          "a357629849463812577284596136945178328129367453578241964732985615816734...69145378",
      })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });

  test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post(apiSolve)
      .send({
        puzzle: "....4517832812936745357824196473298561581673429269145378",
      })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long"
        );
        done();
      });
  });

  test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
    // TODO:
    chai
      .request(server)
      .post(apiSolve)
      .send({
        puzzle:
          "5..91372.3...8.5.9.9.25778.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
      })
      .end((err, res) => {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(res.body.error, "Puzzle cannot be solved");
        done();
      });
  });

  test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: "A1", value: "1" })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(
          res.body.valid,
          true,
          "Server should return a valid property of true"
        );
        done();
      });
  });

  test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck) 
      .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: "E1", value: "1" })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(
          res.body.valid,
          false,
          "Server should return a valid property of false"
        );
        assert.equal(
          res.body.conflict.length,
          1,
          "Server should return a conflict array with length 1"
        );
        done();
      });
  });

  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: "A9", value: "1" })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(
          res.body.valid,
          false,
          "Server should return a valid property of false"
        );
        assert.equal(
          res.body.conflict.length,
          2,
          "Server should return a conflict array with length 2"
        );
        done();
      });
  });

  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({ puzzle: puzzlesAndSolutions[0][1], coordinate: "A1", value: "4" })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(
          res.body.valid,
          false,
          "Server should return a valid property of false"
        );
        assert.equal(
          res.body.conflict.length,
          3,
          "Server should return a conflict array with length 3"
        );

        done();
      });
  });

  test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({ puzzle: puzzlesAndSolutions[0][0] })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({
        puzzle:
          "a35762984946381257728459613694517832812936745357824196473298561581673429269145378",
        coordinate: "A1",
        value: "1",
      })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });

  test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({
        puzzle: "....4517832812936745357824196473298561581673429269145378",
        coordinate: "A1",
        value: "1",
      })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(
          res.body.error,
          "Expected puzzle to be 81 characters long"
        );
        done();
      });
  });

  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({
        puzzle: puzzlesAndSolutions[0][0],
        coordinate: "A10",
        value: "1",
      })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(res.body.error, "Invalid coordinate");
        done();
      });
  });

  test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({ puzzle: puzzlesAndSolutions[0][0], coordinate: "A1", value: "0" })
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.equal(res.body.error, "Invalid value");
        done();
      });
  });
});
