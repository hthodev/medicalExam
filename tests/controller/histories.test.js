const chai = require('chai');
const request = require('supertest');
const { server } = require('../../src/server');
const { baseurl } = require('../base');
const db = require('../../src/models/index');
const jwt = require("jsonwebtoken");

const { expect } = chai;

describe("Create history", () => {
  after(async () => {
    await db.histories.destroy({
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
    patient: "dat1",
    doctorid: 1,
    description: "da nang1",
    files: "abc",
  };

  it("should create history", async () => {
    const { body, status } = await request(baseurl)
      .post("create-history")
      .set("api-token", api_token)
      .send(params);

    expect(status).to.equal(200);
  });
});

describe("Get all histories", () => {
  before(async () => {
    await db.histories.bulkCreate([
      {
        patientid: 1,
        doctorid: 1,
        description: "da nang1",
        files: "abc",
      },
      {
        patientid: 2,
        doctorid: 2,
        description: "da nang2",
        files: "abc",
      },
      {
        patientid: 3,
        doctorid: 3,
        description: "da nang3",
        files: "abc",
      },
    ]);
  });
  after(async () => {
    await db.histories.destroy({
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

  it("Should get list histories successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getAll-history")
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.length).equal(3);
    expect(body[0].patientid).equal('1');
    expect(body[0].doctorid).equal(1);
    expect(body[1].patientid).equal('2');
    expect(body[1].doctorid).equal(2);
    expect(body[2].patientid).equal('3');
    expect(body[2].doctorid).equal(3);
  });

  it("Should get history by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getById-history")
      .query({ id: 1 })
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.id).equal(1);
    expect(body.patientid).equal('1');
    expect(body.doctorid).equal(1);
    expect(body.description).equal('da nang1');
  })

  it("Should delete history by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .delete("remove-history")
      .query({ id: 1 })
      .set("api-token", api_token);

    expect(status).equal(200);
  })
});