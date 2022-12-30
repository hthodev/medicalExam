const chai = require('chai');
const request = require('supertest');
const { server } = require('../../src/server');
const { baseurl } = require('../base');
const db = require('../../src/models/index');
const jwt = require("jsonwebtoken");

const { expect } = chai;

describe("Create schedule", () => {
  after(async () => {
    await db.schedules.destroy({
      truncate: true,
    });
  });

  const api_token = jwt.sign(
    {
      email: "nvdatdev@gmail.com",
      firstName: "Nguyen",
      lastName: "Dat",
      address: "Da Nang",
      phone: "0327618979",
      image: "abc",
      gender: true,
      roleid: 0,
    },
    process.env.JWT_SECRET
  );

  const params = {
    currentNumber: 1,
    maxNumber: 10,
    timeType: 1,
    doctorid: 1,
  };

  it("should create schedule", async () => {
    const { body, status } = await request(baseurl)
      .post("create-schedule")
      .set("api-token", api_token)
      .send(params);

    expect(status).to.equal(200);
  });
});

describe("Get all schedules", () => {
  before(async () => {
    await db.schedules.bulkCreate([
      {
        currentNumber: 1,
        maxNumber: 10,
        timeType: 1,
        doctorid: 1,
      },
      {
        currentNumber: 2,
        maxNumber: 20,
        timeType: 2,
        doctorid: 2,
      },
      {
        currentNumber: 3,
        maxNumber: 30,
        timeType: 3,
        doctorid: 3,
      },
    ]);
  });
  after(async () => {
    await db.schedules.destroy({
      truncate: true,
    });
  });

  var api_token = jwt.sign(
    {
      email: "nvdatdev@gmail.com",
      firstName: "Nguyen",
      lastName: "Dat",
      address: "Da Nang",
      phone: "0327618979",
      image: "abc",
      gender: true,
      roleid: 0,
    },
    process.env.JWT_SECRET
  );

  it("Should get list schedules successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getAll-schedule")
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.length).equal(3);
    expect(body[0].currentNumber).equal(1);
    expect(body[0].doctorid).equal(1);
    expect(body[1].currentNumber).equal(2);
    expect(body[1].doctorid).equal(2);
    expect(body[2].currentNumber).equal(3);
    expect(body[2].doctorid).equal(3);
  });

  it("Should get schedule by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getById-schedule")
      .query({ id: 1 })
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.currentNumber).equal(1);
    expect(body.maxNumber).equal(10);
    expect(body.doctorid).equal(1);
  })

  it("Should update schedule by id successfully", async () => {
    const params = {
      currentNumber: 2,
      maxNumber: 20,
      timeType: 2,
      doctorid: 2,
    }
    const { body, status } = await request(baseurl)
      .post("update-schedule")
      .set("api-token", api_token)
      .query({ id: 1 })
      .send(params);

    expect(status).equal(200);
  })

  it("Should delete schedule by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .delete("remove-schedule")
      .query({ id: 1 })
      .set("api-token", api_token);

    expect(status).equal(200);
  })
});
