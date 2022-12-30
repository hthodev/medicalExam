const chai = require('chai');
const request = require('supertest');
const { server } = require('../../src/server');
const { baseurl } = require('../base');
const db = require('../../src/models/index');
const jwt = require("jsonwebtoken");

const { expect } = chai;

describe("Create doctor clinic", () => {
  after(async () => {
    await db.doctorClinicSpecialties.destroy({
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
    doctorid: 1,
    clinicid: 1,
    specialtyid: 1,
  };

  it("should create doctor clinic", async () => {
    const { body, status } = await request(baseurl)
      .post("create-doctor-clinic-specialty")
      .set("api-token", api_token)
      .send(params);

    expect(status).to.equal(200);
  });
});

describe("Get all doctor clinics", () => {
  before(async () => {
    await db.doctorClinicSpecialties.bulkCreate([
      {
        doctorid: 1,
        clinicid: 1,
        specialtyid: 1,
      },
      {
        doctorid: 2,
        clinicid: 2,
        specialtyid: 2,
      },
      {
        doctorid: 3,
        clinicid: 3,
        specialtyid: 3,
      },
    ]);
  });
  after(async () => {
    await db.doctorClinicSpecialties.destroy({
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

  it("Should get list doctor clinics successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getAll-doctor-clinic-specialty")
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.length).equal(3);
    expect(body[0].doctorid).equal(1);
    expect(body[0].clinicid).equal(1);
    expect(body[1].doctorid).equal(2);
    expect(body[1].clinicid).equal(2);
    expect(body[2].doctorid).equal(3);
    expect(body[2].clinicid).equal(3);
  });

  it("Should get doctor clinic by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .get("getById-doctor-clinic-specialty")
      .query({ id: 1 })
      .set("api-token", api_token);
    expect(status).equal(200);
    expect(body.id).equal(1);
    expect(body.doctorid).equal(1);
    expect(body.clinicid).equal(1);
    expect(body.specialtyid).equal(1);
  })

  it("Should update doctor clinic by id successfully", async () => {
    const params = {
      doctorid: 3,
      clinicid: 3,
      specialtyid: 3,
    }
    const { body, status } = await request(baseurl)
      .post("update-doctor-clinic-specialty")
      .set("api-token", api_token)
      .query({ id: 1 })
      .send(params);

    expect(status).equal(200);
  })

  it("Should delete doctor clinic by id successfully", async () => {
    const { body, status } = await request(baseurl)
      .delete("remove-doctor-clinic-specialty")
      .query({ id: 1 })
      .set("api-token", api_token);

    expect(status).equal(200);
  })
});