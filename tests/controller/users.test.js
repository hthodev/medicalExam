const chai = require('chai');
const request = require('supertest');
const { server } = require('../../src/server');
const { baseurl } = require('../base');
const db = require('../../src/models/index');

const { expect } = chai;

describe('Register & Login user', () => {
  before(async() => {
    await db.user.create({
      firstName: "Nguyen",
      lastName: "Dat",
      email: "nvdatdev1@gmail.com",
      phone: "0327618979",
      address: "Da Nang",
      password: '123123',
      gender: '1'
    })
  })
  after(async () => {
    await db.user.destroy({
      truncate: true,
    });
  })

  let fail_params = {
    "firstName": "Nguyen",
    "lastName": "Dat",
    "email": "nvdatdev1@gmail.com",
    "phone": "0327618979",
    "address": "Da Nang",
    "password": "123123",
    "gender": "true",
  }

  let true_params = {
    "firstName": "Nguyen",
    "lastName": "Dat",
    "email": "nvdatdev@gmail.com",
    "phone": "0327618979",
    "address": "Da Nang",
    "password": "123123",
    "gender": "true",
  }

  it('Should error email when login', async () => {
    const { body, status } = await request(baseurl)
                                      .post('register')
                                      .send(fail_params)
    expect(body.result.message).equal("email invaild")
    expect(status).equal(200);
  })

  it('Should register successfully', async () => {
    const { body, status } = await request(baseurl)
                                      .post('register')
                                      .send(true_params)
    expect(body.result.message).equal("registry successfully")
    expect(status).equal(200);
  })

  it('Should error email when login', async () => {
    const { body, status } = await request(baseurl)
                                      .post('login')
                                      .send({ 'email': 'nvdatdev', 'password': '123123' })
    expect(body.message.message).equal("email isn't registered")
    expect(status).equal(200);
  })

  it('Should error no password when login', async () => {
    const { body, status } = await request(baseurl)
                                      .post('login')
                                      .send({ 'email': 'nvdatdev@gmail.com', 'password': '' })
    expect(status).equal(500);
    expect(body.message).equal("Missing inputs parameter!")
  })

  it('Should error password when login', async () => {
    const { body, status } = await request(baseurl)
                                      .post('login')
                                      .send({ 'email': 'nvdatdev@gmail.com', 'password': '123' })
    expect(status).equal(200);
    expect(body.message.message).equal("password wrong")
  })

  it('Should login successfully', async () => {
    const { body, status } = await request(baseurl)
                                      .post('login')
                                      .send({ 'email': 'nvdatdev@gmail.com', 'password': '123123' })
    expect(body.message.message).equal('login successfully')
    expect(status).equal(200);
  })
})

describe('Get all users', () => {
  before(async() => {
    await db.user.bulkCreate([{
      firstName: "Nguyen",
      lastName: "Dat",
      email: "nvdatdev1@gmail.com",
      phone: "0327618979",
      address: "Da Nang",
      password: '123123',
      gender: '1'
    },{
      firstName: "Nguyen",
      lastName: "Dat",
      email: "nvdatdev2@gmail.com",
      phone: "0327618979",
      address: "Da Nang",
      password: '123123',
      gender: '1'
    },{
      firstName: "Nguyen",
      lastName: "Dat",
      email: "nvdatdev3@gmail.com",
      phone: "0327618979",
      address: "Da Nang",
      password: '123123',
      gender: '1'
    },{
      firstName: "Nguyen",
      lastName: "Dat",
      email: "nvdatdev4@gmail.com",
      phone: "0327618979",
      address: "Da Nang",
      password: '123123',
      gender: '1'
    }])
  })
  after(async () => {
    await db.user.destroy({
      truncate: true,
    });
  })

  it('Should get list users successfully', async () => {
    const { body, status } = await request(baseurl)
                                      .get('get-user')
    expect(body.result.length).equal(4);
    expect(body.result[0].email).equal('nvdatdev1@gmail.com');
    expect(body.result[1].email).equal('nvdatdev2@gmail.com');
    expect(body.result[2].email).equal('nvdatdev3@gmail.com');
    expect(body.result[3].email).equal('nvdatdev4@gmail.com');
    expect(status).equal(200);
  })
})