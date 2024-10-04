import chai from "chai";
import request from "supertest";
import app from "../src/index";

const expect = chai.expect;

describe("Financial Records API", function () {
  let recordId;

  // Test POST /financial-records
  describe("POST /financial-records", function () {
    it("should create a new financial record", function (done) {
      const newRecord = {
        description: "Test Record",
        amount: 100,
        date: "2024-10-05",
        userId: "example-user-id",
      };

      request(app)
        .post("/financial-records")
        .send(newRecord)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property("_id");
          expect(res.body.description).to.equal("Test Record");
          recordId = res.body._id; // Save record ID for further tests
          done();
        });
    });
  });

  // Test GET /financial-records/getAllByUserID/:userId
  describe("GET /financial-records/getAllByUserID/:userId", function () {
    it("should return all records for a specific user", function (done) {
      const userId = "example-user-id";
      request(app)
        .get(`/financial-records/getAllByUserID/${userId}`)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.greaterThan(0);
          done();
        });
    });

    it("should return 404 if no records are found for the user", function (done) {
      const nonExistentUserId = "non-existent-user-id";
      request(app)
        .get(`/financial-records/getAllByUserID/${nonExistentUserId}`)
        .expect(404)
        .end(done);
    });
  });

  // Test PUT /financial-records/:id
  describe("PUT /financial-records/:id", function () {
    it("should update a financial record", function (done) {
      const updatedRecord = {
        description: "Updated Test Record",
        amount: 200,
        date: "2024-11-01",
      };

      request(app)
        .put(`/financial-records/${recordId}`)
        .send(updatedRecord)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body.description).to.equal("Updated Test Record");
          expect(res.body.amount).to.equal(200);
          done();
        });
    });

    it("should return 404 if the record does not exist", function (done) {
      const fakeId = "nonexistentid1234567890abcdef";
      const updatedRecord = {
        description: "Non-existent Record",
        amount: 200,
        date: "2024-11-01",
      };

      request(app)
        .put(`/financial-records/${fakeId}`)
        .send(updatedRecord)
        .expect(404)
        .end(done);
    });
  });

  // Test DELETE /financial-records/:id
  describe("DELETE /financial-records/:id", function () {
    it("should delete a financial record", function (done) {
      request(app)
        .delete(`/financial-records/${recordId}`)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property("_id");
          done();
        });
    });

    it("should return 404 if the record does not exist", function (done) {
      const fakeId = "nonexistentid1234567890abcdef";
      request(app).delete(`/financial-records/${fakeId}`).expect(404).end(done);
    });
  });
});
