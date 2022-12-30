const chai = require('chai');
const request = require('supertest');
const { server } = require('../../src/server');
const { baseurl } = require('../base');
const db = require('../../src/models/index');
const jwt = require("jsonwebtoken");

const { expect } = chai;

describe("Create clinic", () => {
  after(async () => {
    await db.clinics.destroy({
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
    address: "da nang1",
    description: "da nang",
    image: "abc",
  };

  it("should create clinic", async () => {
    const { body, status } = await request(baseurl)
      .post("create-clinic")
      .set("api-token", api_token)
      .send(params);

    expect(status).to.equal(200);
  });
});

describe("Get all clinics", () => {
  before(async () => {
    await db.clinics.bulkCreate([
      {
        name: "dat1",
        address: "da nang1",
        description: "da nang",
        image: "abc",
      },
      {
        name: "dat2",
        address: "da nang2",
        description: "da nang",
        image: "abc",
      },
      {
        name: "dat3",
        address: "da nang3",
        description: "da nang",
        image: "abc",
      },
    ]);
  });
  after(async () => {
    await db.clinics.destroy({
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

  it("Should get list clinics successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getAll-clinic")
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.length).equal(3);
    expect(body[0].name).equal('dat1');
    expect(body[0].address).equal('da nang1');
    expect(body[1].name).equal('dat2');
    expect(body[1].address).equal('da nang2');
    expect(body[2].name).equal('dat3');
    expect(body[2].address).equal('da nang3');
  });

  it("Should get clinic by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getById-clinic")
      .query({ id: 1 })
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.name).equal('dat1');
    expect(body.address).equal('da nang1');
  })

  it("Should update clinic by id successfully", async () => {
    const params = {
      name: "dat2",
      address: "da nang2",
      description: "da nang",
      image: "abc",
    }
    const { body, status } = await request(baseurl)
      .post("update-clinic")
      .set("api-token", api_token)
      .query({ id: 1 })
      .send(params);

    expect(status).equal(200);
  })

  it("Should delete clinic by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .delete("remove-clinic")
      .query({ id: 1 })
      .set("api-token", api_token);

    expect(status).equal(200);
  })
});
