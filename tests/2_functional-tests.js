const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;

const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  this.timeout(5000);

  const apiSolve = "/api/solve";
  const apiCheck = "/api/check";

  test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post(apiSolve)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
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
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post(apiSolve)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post(apiSolve)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
    chai
      .request(server)
      .post(apiSolve)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });

  test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
    chai
      .request(server)
      .post(apiCheck)
      .send({})
      .end(function (err, res) {
        if (err) done(err);
        assert.equal(res.status, 200, "Server should return status code 200");
        assert.fail("NotImplemented");
        done();
      });
  });
});
