const chai = require('chai');
const request = require('supertest');
const { server } = require('../../src/server');
const { baseurl } = require('../base');
const db = require('../../src/models/index');
const jwt = require("jsonwebtoken");

const { expect } = chai;

describe("Create specialty", () => {
  after(async () => {
    await db.specialties.destroy({
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
    name: "dat1",
    description: "da nang1",
  };

  it("should create specialty", async () => {
    const { body, status } = await request(baseurl)
      .post("create-specialty")
      .set("api-token", api_token)
      .send(params);

    expect(status).to.equal(200);
  });
});

describe("Get all specialties", () => {
  before(async () => {
    await db.specialties.bulkCreate([
      {
        name: "dat1",
        description: "da nang1",
      },
      {
        name: "dat2",
        description: "da nang2",
      },
      {
        name: "dat3",
        description: "da nang3",
      },
    ]);
  });
  after(async () => {
    await db.specialties.destroy({
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

  it("Should get list specialties successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getAll-specialty")
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.length).equal(3);
    expect(body[0].name).equal('dat1');
    expect(body[0].description).equal('da nang1');
    expect(body[1].name).equal('dat2');
    expect(body[1].description).equal('da nang2');
    expect(body[2].name).equal('dat3');
    expect(body[2].description).equal('da nang3');
  });

  it("Should get specialty by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getById-specialty")
      .query({ id: 1 })
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.name).equal('dat1');
    expect(body.description).equal('da nang1');
  })

  it("Should update specialty by id successfully", async () => {
    const params = {
      name: "dat2",
      description: "da nang2",
    }
    const { body, status } = await request(baseurl)
      .post("update-specialty")
      .set("api-token", api_token)
      .query({ id: 1 })
      .send(params);

    expect(status).equal(200);
  })

  it("Should delete specialty by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .delete("remove-specialty")
      .query({ id: 1 })
      .set("api-token", api_token);

    expect(status).equal(200);
  })
});
