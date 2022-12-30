const chai = require("chai");
const request = require("supertest");
const { server } = require("../../src/server");
const { baseurl } = require("../base");
const db = require("../../src/models/index");
const jwt = require("jsonwebtoken");

const { expect } = chai;

describe("Create booking", () => {
  after(async () => {
    await db.bookings.destroy({
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
    status: "1",
    doctorid: "1",
    patientid: "1",
    date: "2020-01-01",
    timetype: "1",
  };

  it("should create booking", async () => {
    const { body, status } = await request(baseurl)
      .post("create-booking")
      .set("api-token", api_token)
      .send(params);
    expect(status).to.equal(200);
  });
});

describe("Get all bookings", () => {
  before(async () => {
    await db.bookings.bulkCreate([
      {
        status: "1",
        doctorid: "1",
        patientid: "1",
        date: "2020-01-01",
        timetype: "1",
      },
      {
        status: "1",
        doctorid: "2",
        patientid: "2",
        date: "2020-02-02",
        timetype: "2",
      },
      {
        status: "1",
        doctorid: "3",
        patientid: "3",
        date: "2020-03-03",
        timetype: "3",
      },
    ]);
  });
  after(async () => {
    await db.bookings.destroy({
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

  it("Should get list bookings successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getAll-booking")
      .set("api-token", api_token);
    expect(body.length).equal(3);
    expect(body[0].doctorid).equal(1);
    expect(body[0].patientid).equal(1);
    expect(body[1].doctorid).equal(2);
    expect(body[1].patientid).equal(2);
    expect(body[2].doctorid).equal(3);
    expect(body[2].patientid).equal(3);
    expect(status).equal(200);
  });

  it("Should get booking by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getById-booking")
      .query({ id: 1 })
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.doctorid).equal(1);
    expect(body.patientid).equal(1);
  })

  it("Should update booking by id successfully", async () => {
    const params = {
      status: "1",
      doctorid: "3",
      patientid: "3",
      date: "2020-03-03",
      timetype: "3",
    }
    const { body, status } = await request(baseurl)
      .post("update-booking")
      .set("api-token", api_token)
      .query({ id: 1 })
      .send(params);

    expect(status).equal(200);
  })

  it("Should delete booking by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .delete("remove-booking")
      .query({ id: 1 })
      .set("api-token", api_token);

    expect(status).equal(200);
  })
});
