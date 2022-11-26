const chai = require('chai');
const request = require('supertest');
const { server } = require('../../src/server');
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
    const { body, status } = await request('http://localhost:3000/api/')
                                      .post('register')
                                      .send(fail_params)
    expect(body.result.message).to.equal("email invaild")
    expect(status).to.equal(200);
  })

  it('Should register successfully', async () => {
    const { body, status } = await request('http://localhost:3000/api/')
                                      .post('register')
                                      .send(true_params)
    expect(body.result.message).to.equal("registry successfully")
    expect(status).to.equal(200);
  })

  it('Should error email when login', async () => {
    const { body, status } = await request('http://localhost:3000/api/')
                                      .post('login')
                                      .send({ 'email': 'nvdatdev', 'password': '123123' })
    expect(body.message.message).to.equal("email isn't registered")
    expect(status).to.equal(200);
  })

  it('Should when login with no password', async () => {
    const { body, status } = await request('http://localhost:3000/api/')
                                      .post('login')
                                      .send({ 'email': 'nvdatdev@gmail.com', 'password': '' })
    expect(status).to.equal(500);
    expect(body.message).to.equal("Missing inputs parameter!")
  })

  it('Should when login with error password', async () => {
    const { body, status } = await request('http://localhost:3000/api/')
                                      .post('login')
                                      .send({ 'email': 'nvdatdev@gmail.com', 'password': '123' })
    expect(status).to.equal(200);
    expect(body.message.message).to.equal("password wrong")
  })

  it('Should login successfully', async () => {
    const { body, status } = await request('http://localhost:3000/api/')
                                      .post('login')
                                      .send({ 'email': 'nvdatdev@gmail.com', 'password': '123123' })
    expect(body.message.message).to.equal('login successfully')
    expect(status).to.equal(200);
  })
})